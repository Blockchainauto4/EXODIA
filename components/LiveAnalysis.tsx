
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { decode, decodeAudioData, createBlob } from '../services/audioUtils';
import { UserLocation } from '../types';

interface LiveAnalysisProps {
  onClose: () => void;
  location: UserLocation;
}

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

const LiveAnalysis: React.FC<LiveAnalysisProps> = ({ onClose, location }) => {
  const [isActive, setIsActive] = useState(false);
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentOutput, setCurrentOutput] = useState('');
  const [status, setStatus] = useState<'conectando' | 'analisando' | 'erro'>('conectando');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<any>(null);
  const videoIntervalRef = useRef<number | null>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const transcriptionEndRef = useRef<HTMLDivElement>(null);

  // Refs para acumular transcrição sem causar re-renders excessivos
  const accumulatedInput = useRef('');
  const accumulatedOutput = useRef('');

  useEffect(() => {
    transcriptionEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, currentInput, currentOutput]);

  const handleAPIError = async (error: any) => {
    console.error("Live API Error:", error);
    setStatus('erro');
    setErrorMessage(error?.message || "Erro de conexão com o servidor médico.");
  };

  const startSession = async () => {
    setStatus('conectando');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }, // Voz mais profissional
          },
          systemInstruction: `Você é um Médico Especialista do IA HOSPITAL atendendo em ${location.city}. 
          O usuário está em uma sessão de VÍDEO PRO.
          Analise visualmente e auditivamente o paciente. 
          Mantenha respostas curtas e focadas em triagem. 
          Use termos clínicos e demonstre autoridade (EEAT).`,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setStatus('analisando');
            
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);

            const ctx = canvasRef.current?.getContext('2d');
            videoIntervalRef.current = window.setInterval(() => {
              if (videoRef.current && canvasRef.current && ctx && !isVideoOff) {
                canvasRef.current.width = 320;
                canvasRef.current.height = 240;
                ctx.drawImage(videoRef.current, 0, 0, 320, 240);
                canvasRef.current.toBlob(async (blob) => {
                  if (blob) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64 = (reader.result as string).split(',')[1];
                      sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'image/jpeg' } }));
                    };
                    reader.readAsDataURL(blob);
                  }
                }, 'image/jpeg', 0.5);
              }
            }, 1000);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Processamento de Áudio
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextOutRef.current) {
              const ctx = audioContextOutRef.current;
              const scheduleTime = Math.max(nextStartTimeRef.current, ctx.currentTime + 0.05);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.start(scheduleTime);
              nextStartTimeRef.current = scheduleTime + audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            // Processamento de Transcrição
            if (message.serverContent?.inputTranscription) {
              accumulatedInput.current += message.serverContent.inputTranscription.text;
              setCurrentInput(accumulatedInput.current);
            }
            if (message.serverContent?.outputTranscription) {
              accumulatedOutput.current += message.serverContent.outputTranscription.text;
              setCurrentOutput(accumulatedOutput.current);
            }

            // Finalização de Turno
            if (message.serverContent?.turnComplete) {
              if (accumulatedInput.current || accumulatedOutput.current) {
                setHistory(prev => [
                  ...prev, 
                  { role: 'user', text: accumulatedInput.current },
                  { role: 'model', text: accumulatedOutput.current }
                ].filter(t => t.text.trim() !== ''));
                
                accumulatedInput.current = '';
                accumulatedOutput.current = '';
                setCurrentInput('');
                setCurrentOutput('');
              }
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              accumulatedOutput.current = '';
              setCurrentOutput('(Médico interrompido pelo paciente)');
            }
          },
          onclose: () => setIsActive(false),
          onerror: (e) => handleAPIError(e),
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      handleAPIError(err);
    }
  };

  const stopSession = () => {
    if (videoIntervalRef.current !== null) clearInterval(videoIntervalRef.current);
    if (sessionRef.current) sessionRef.current.close();
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(t => t.stop());
    setIsActive(false);
    onClose();
  };

  useEffect(() => {
    startSession();
    return () => stopSession();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col lg:flex-row overflow-hidden animate-fade-in font-sans">
      
      {/* Área do Vídeo / Dashboard */}
      <div className="relative flex-grow bg-black flex items-center justify-center overflow-hidden">
        {status === 'erro' ? (
          <div className="max-w-md p-10 bg-slate-900 border border-red-500/20 rounded-[2.5rem] text-center space-y-8 shadow-[0_0_50px_rgba(239,68,68,0.1)]">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <span className="text-5xl">🚫</span>
            </div>
            <div>
              <h2 className="text-white font-black uppercase tracking-tighter text-3xl mb-2">Conexão Falhou</h2>
              <p className="text-slate-400 text-sm leading-relaxed">{errorMessage}</p>
            </div>
            <button onClick={onClose} className="w-full py-5 bg-slate-800 hover:bg-slate-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl text-[10px] transition-all">Voltar ao Início</button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              muted 
              playsInline 
              className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoOff ? 'opacity-0' : 'opacity-60'}`} 
            />
            {isVideoOff && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <div className="text-center">
                  <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                    <span className="text-4xl text-slate-600">🎥</span>
                  </div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Câmera Desativada</p>
                </div>
              </div>
            )}
            
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Efeitos de Scan e Interface Biométrica */}
            {!isVideoOff && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-[2px] bg-blue-500/40 absolute top-0 animate-scanner shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                <div className="absolute top-12 left-12 border-l-2 border-t-2 border-blue-500/20 w-16 h-16"></div>
                <div className="absolute top-12 right-12 border-r-2 border-t-2 border-blue-500/20 w-16 h-16"></div>
                <div className="absolute bottom-12 left-12 border-l-2 border-b-2 border-blue-500/20 w-16 h-16"></div>
                <div className="absolute bottom-12 right-12 border-r-2 border-b-2 border-blue-500/20 w-16 h-16"></div>
                
                {/* Elementos HUD Fictícios para Estética */}
                <div className="absolute top-12 left-32 hidden md:block">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5,6].map(i => <div key={i} className="w-1 h-3 bg-blue-500/40 animate-pulse" style={{animationDelay: `${i*100}ms`}}></div>)}
                  </div>
                  <p className="text-[8px] font-mono text-blue-400 uppercase">Signal Stability: 98.4%</p>
                </div>
              </div>
            )}

            {/* Controles de Overlay */}
            <div className="absolute bottom-10 left-0 right-0 px-10 flex justify-between items-end">
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all border ${isMuted ? 'bg-red-600 border-red-400' : 'bg-slate-900/80 backdrop-blur-xl border-white/10 text-white'}`}
                >
                  <span className="text-xl">{isMuted ? '🔇' : '🎤'}</span>
                </button>
                <button 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all border ${isVideoOff ? 'bg-red-600 border-red-400' : 'bg-slate-900/80 backdrop-blur-xl border-white/10 text-white'}`}
                >
                  <span className="text-xl">{isVideoOff ? '🚫' : '📹'}</span>
                </button>
              </div>
              
              <div className="hidden md:flex flex-col items-end">
                <div className="bg-slate-900/80 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 mb-4">
                  <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] mb-1">Localização em Tempo Real</p>
                  <p className="text-blue-400 text-xs font-bold uppercase">{location.city}, {location.state}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={stopSession} 
              className="absolute top-10 right-10 bg-red-600 hover:bg-red-700 text-white p-4 rounded-2xl transition-all shadow-2xl hover:scale-105 active:scale-95 group flex items-center gap-3"
            >
              <span className="text-[10px] font-black uppercase tracking-widest hidden group-hover:block">Encerrar Sessão</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </>
        )}
      </div>

      {/* Painel Lateral: Transcrição e Dados Médicos */}
      <div className="w-full lg:w-[450px] bg-slate-900 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-10 border-l border-white/5">
        
        {/* Header do Painel */}
        <div className="p-8 border-b border-white/5 bg-slate-950/50 flex justify-between items-center">
          <div>
            <h3 className="text-white font-black uppercase text-base tracking-tighter flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
              Análise Multimodal
            </h3>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">IA HOSPITAL PRO v3.2</p>
          </div>
          <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Sincronizado</span>
          </div>
        </div>

        {/* Histórico de Transcrição */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar bg-gradient-to-b from-slate-900 to-slate-950">
          
          {history.length === 0 && !currentInput && !currentOutput && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <div className="w-16 h-16 bg-slate-800 rounded-3xl flex items-center justify-center mb-4">
                <span className="text-3xl">🩺</span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Aguardando entrada de áudio do paciente...<br/>Inicie descrevendo seus sintomas.
              </p>
            </div>
          )}

          {history.map((t, i) => (
            <div key={i} className={`flex flex-col ${t.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up`}>
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-2 px-1 ${
                t.role === 'user' ? 'text-blue-500' : 'text-slate-500'
              }`}>
                {t.role === 'user' ? 'Paciente' : 'Especialista IA'}
              </span>
              <div className={`max-w-[95%] p-5 rounded-3xl text-[13px] leading-relaxed shadow-lg border transition-all ${
                t.role === 'user' 
                  ? 'bg-blue-600 text-white border-blue-500/50 rounded-tr-none' 
                  : 'bg-slate-800/80 text-slate-200 border-white/5 rounded-tl-none backdrop-blur-sm'
              }`}>
                {t.text}
              </div>
            </div>
          ))}

          {/* Transcrição em Tempo Real (Live) */}
          {currentInput && (
            <div className="flex flex-col items-end animate-pulse">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] mb-2 text-blue-400">Captando Voz...</span>
              <div className="max-w-[95%] p-5 rounded-3xl text-[13px] leading-relaxed bg-blue-600/30 text-blue-100 border border-blue-500/30 rounded-tr-none italic">
                {currentInput}
              </div>
            </div>
          )}

          {currentOutput && (
            <div className="flex flex-col items-start">
              <span className="text-[8px] font-black uppercase tracking-[0.2em] mb-2 text-slate-500">Médico Falando...</span>
              <div className="max-w-[95%] p-5 rounded-3xl text-[13px] leading-relaxed bg-slate-800 text-slate-100 border border-white/10 rounded-tl-none">
                {currentOutput}
              </div>
            </div>
          )}
          
          <div ref={transcriptionEndRef} />
        </div>

        {/* Footer do Painel com Avisos Clínicos */}
        <div className="p-8 bg-slate-950 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
            <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-xl shrink-0">⚠️</div>
            <div>
              <p className="text-orange-500 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Diretriz de Segurança</p>
              <p className="text-slate-500 text-[10px] leading-tight font-medium">Esta triagem não substitui atendimento hospitalar presencial em {location.city}.</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scanner { 0% { top: 0; opacity: 0.1; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0.1; } }
        .animate-scanner { animation: scanner 4s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1); }
        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.2); }
      `}</style>
    </div>
  );
};

export default LiveAnalysis;
