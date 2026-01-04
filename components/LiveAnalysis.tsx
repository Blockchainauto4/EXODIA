
import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { decode, decodeAudioData, createBlob } from '../services/audioUtils';
import { UserLocation } from '../types';

interface LiveAnalysisProps {
  onClose: () => void;
  location: UserLocation;
}

const LiveAnalysis: React.FC<LiveAnalysisProps> = ({ onClose, location }) => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [status, setStatus] = useState<'conectando' | 'analisando' | 'erro'>('conectando');
  const [errorMessage, setErrorMessage] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<any>(null);
  const videoIntervalRef = useRef<number | null>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const transcriptionEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    transcriptionEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcription]);

  const handleAPIError = async (error: any) => {
    console.error("Live API Error:", error);
    setStatus('erro');
    
    if (error?.message?.includes("Requested entity was not found")) {
      setErrorMessage("Esta chave de API não tem permissão para usar o modelo de áudio nativo. Por favor, selecione uma chave de um projeto com faturamento ativado.");
      
      if (window.aistudio?.openSelectKey) {
        const retry = confirm("O recurso de vídeo/áudio requer uma chave de um projeto com faturamento ativado (Paid Project). Deseja selecionar outra chave agora?");
        if (retry) {
          onClose();
          window.aistudio.openSelectKey();
        }
      }
    } else if (error?.message?.includes("billing") || error?.message?.includes("403")) {
      setErrorMessage("Acesso negado: Faturamento (Billing) necessário para esta funcionalidade.");
    } else {
      setErrorMessage("Ocorreu um erro na conexão com o servidor médico via IA.");
    }
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
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
          },
          systemInstruction: `Você é um médico especialista de elite do IA HOSPITAL em ${location.city}. 
          Esta é uma sessão de vídeo PRO para usuários com faturamento ativado. 
          Forneça triagem avançada em tempo real para o paciente em ${location.city}. 
          Responda de forma concisa e técnica.`,
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
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);

            const ctx = canvasRef.current?.getContext('2d');
            videoIntervalRef.current = window.setInterval(() => {
              if (videoRef.current && canvasRef.current && ctx) {
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

            if (message.serverContent?.inputTranscription) {
              setTranscription(prev => [...prev, { role: 'user', text: message.serverContent!.inputTranscription!.text }]);
            }
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => [...prev, { role: 'model', text: message.serverContent!.outputTranscription!.text }]);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e){} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
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
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col md:flex-row overflow-hidden animate-fade-in">
      <div className="relative flex-grow bg-black flex items-center justify-center">
        {status === 'erro' ? (
          <div className="max-w-md p-8 bg-slate-900 border border-red-500/30 rounded-3xl text-center space-y-6">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🔒</span>
            </div>
            <h2 className="text-white font-black uppercase tracking-tighter text-2xl">Acesso PRO Necessário</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{errorMessage}</p>
            <div className="pt-4 flex flex-col gap-3">
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="py-4 bg-white text-slate-900 font-black uppercase tracking-widest rounded-2xl text-xs">Ver Documentação de Faturamento</a>
              <button onClick={onClose} className="py-4 bg-slate-800 text-white font-black uppercase tracking-widest rounded-2xl text-xs">Voltar ao Modo Básico</button>
            </div>
          </div>
        ) : (
          <>
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover opacity-80" />
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-1 bg-blue-500/50 absolute top-0 animate-scanner"></div>
              <div className="absolute top-10 left-10 border-l-2 border-t-2 border-blue-500/30 w-12 h-12"></div>
              <div className="absolute top-10 right-10 border-r-2 border-t-2 border-blue-500/30 w-12 h-12"></div>
              <div className="absolute bottom-10 left-10 border-l-2 border-b-2 border-blue-500/30 w-12 h-12"></div>
              <div className="absolute bottom-10 right-10 border-r-2 border-b-2 border-blue-500/30 w-12 h-12"></div>
            </div>

            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start pointer-events-auto">
                <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${status === 'analisando' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    <div>
                      <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none mb-1">Status do Sistema</p>
                      <p className="text-slate-400 text-[9px] font-bold uppercase tracking-tighter leading-none">{status === 'conectando' ? 'Sincronizando...' : 'Médico IA Ativo'}</p>
                    </div>
                  </div>
                </div>
                <button onClick={stopSession} className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all shadow-2xl hover:scale-110 active:scale-95">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full md:w-[400px] bg-slate-900 border-l border-white/5 flex flex-col shadow-2xl relative">
        <div className="p-6 border-b border-white/5 bg-slate-950 flex justify-between items-center shrink-0">
          <div>
            <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">Triagem Clínica</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Análise Multiparamétrica</p>
          </div>
          <span className="text-[9px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-blue-500/20">Pro Tier</span>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-900/50">
          {transcription.map((t, i) => (
            <div key={i} className={`flex flex-col ${t.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up`}>
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] mb-1.5 px-1 ${
                t.role === 'user' ? 'text-blue-400' : 'text-slate-400'
              }`}>
                {t.role === 'user' ? 'Paciente' : 'Médico IA'}
              </span>
              <div className={`max-w-[90%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-xl transition-all border ${
                t.role === 'user' 
                  ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' 
                  : 'bg-slate-800 text-slate-100 border-white/5 rounded-tl-none'
              }`}>
                {t.text}
              </div>
            </div>
          ))}
          <div ref={transcriptionEndRef} />
        </div>

        <div className="p-6 bg-slate-950 border-t border-white/5 shrink-0">
          <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="text-orange-500 text-[9px] font-black uppercase tracking-widest mb-1">Aviso Protocolar</p>
              <p className="text-slate-400 text-[10px] leading-tight font-medium">Esta triagem por IA não substitui exames clínicos presenciais. Em emergências, ligue 192.</p>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scanner { 0% { top: 0; opacity: 0.2; } 50% { opacity: 1; } 100% { top: 100%; opacity: 0.2; } }
        .animate-scanner { animation: scanner 3s linear infinite; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-slide-up { animation: slideUp 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default LiveAnalysis;
