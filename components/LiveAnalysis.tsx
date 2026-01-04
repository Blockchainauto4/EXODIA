
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
  const [volumeLevel, setVolumeLevel] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<any>(null);
  const videoIntervalRef = useRef<number | null>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const transcriptionEndRef = useRef<HTMLDivElement>(null);

  // Acumuladores de texto para evitar problemas de sincronia
  const accumulatedInput = useRef('');
  const accumulatedOutput = useRef('');

  useEffect(() => {
    if (transcriptionEndRef.current) {
      transcriptionEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, currentInput, currentOutput]);

  const stopSession = () => {
    setIsActive(false);
    if (videoIntervalRef.current) window.clearInterval(videoIntervalRef.current);
    
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e){}
      sessionRef.current = null;
    }
    
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    
    if (audioContextInRef.current) audioContextInRef.current.close();
    if (audioContextOutRef.current) audioContextOutRef.current.close();
    
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const startSession = async () => {
    try {
      setStatus('conectando');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const outputNode = audioContextOutRef.current.createGain();
      outputNode.connect(audioContextOutRef.current.destination);

      // Instanciação imediata antes de conectar
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setStatus('analisando');
            setIsActive(true);
            
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolumeLevel(Math.sqrt(sum / inputData.length));

              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);

            videoIntervalRef.current = window.setInterval(() => {
              if (isVideoOff || !canvasRef.current || !videoRef.current) return;
              const ctx = canvasRef.current.getContext('2d');
              if (!ctx) return;
              
              canvasRef.current.width = 320; // Reduzir resolução de envio para melhorar latência
              canvasRef.current.height = 240;
              ctx.drawImage(videoRef.current, 0, 0, 320, 240);
              
              canvasRef.current.toBlob(async (blob) => {
                if (blob) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64Data = (reader.result as string).split(',')[1];
                    sessionPromise.then(session => {
                      session.sendRealtimeInput({
                        media: { data: base64Data, mimeType: 'image/jpeg' }
                      });
                    });
                  };
                  reader.readAsDataURL(blob);
                }
              }, 'image/jpeg', 0.5);
            }, 1000);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Transcrições de saída (IA)
            if (message.serverContent?.outputTranscription) {
              accumulatedOutput.current += message.serverContent.outputTranscription.text;
              setCurrentOutput(accumulatedOutput.current);
            } 
            // Transcrições de entrada (Usuário)
            else if (message.serverContent?.inputTranscription) {
              accumulatedInput.current += message.serverContent.inputTranscription.text;
              setCurrentInput(accumulatedInput.current);
            }

            // Fechamento de turno
            if (message.serverContent?.turnComplete) {
              const uText = accumulatedInput.current.trim();
              const mText = accumulatedOutput.current.trim();
              
              if (uText || mText) {
                setHistory(prev => {
                  const newEntries: ChatTurn[] = [];
                  if (uText) newEntries.push({ role: 'user', text: uText });
                  if (mText) newEntries.push({ role: 'model', text: mText });
                  return [...prev, ...newEntries];
                });
              }
              
              accumulatedInput.current = '';
              accumulatedOutput.current = '';
              setCurrentInput('');
              setCurrentOutput('');
            }

            // Áudio
            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData && audioContextOutRef.current) {
              const ctx = audioContextOutRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              source.onended = () => sourcesRef.current.delete(source);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Interrupção
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              // Se foi interrompido, limpar o que a IA estava transcrevendo
              accumulatedOutput.current = '';
              setCurrentOutput('(Interrompido)');
            }
          },
          onerror: (e) => {
            setStatus('erro');
            setErrorMessage('A conexão com o servidor médico PRO falhou. Verifique sua internet ou chave API.');
          },
          onclose: () => setIsActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          },
          systemInstruction: `Você é um Médico Especialista Sênior do IA HOSPITAL em ${location.city}.
          Analise o paciente via vídeo e áudio. Seja empático, clínico e direto. 
          Triagem educacional - não forneça diagnóstico final.`,
          outputAudioTranscription: {},
          inputAudioTranscription: {}
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      setStatus('erro');
      setErrorMessage(err.message || 'Erro ao inicializar hardware de mídia.');
    }
  };

  useEffect(() => {
    startSession();
    return () => stopSession();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-0 sm:p-4">
      <div className="w-full max-w-7xl h-full sm:h-[92vh] flex flex-col bg-white rounded-none sm:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/10">
        
        {/* Header Profissional */}
        <div className="bg-slate-900 px-8 py-6 flex justify-between items-center shrink-0 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-500 animate-ping' : 'bg-red-500'} absolute inset-0 opacity-40`}></div>
              <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-500' : 'bg-red-500'} relative z-10`}></div>
            </div>
            <div>
              <h2 className="text-white font-black uppercase tracking-[0.2em] text-xs">Consulta Pro: Análise Multimodal</h2>
              <p className="text-slate-500 text-[10px] font-bold uppercase mt-1 tracking-widest">{location.city} • Sala de Triagem Virtual</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Workspace */}
        <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
          
          {/* Video Feed & Stats */}
          <div className="lg:w-[60%] relative bg-black flex items-center justify-center overflow-hidden border-r border-slate-100">
            <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transition-all duration-1000 ${isVideoOff ? 'opacity-0 scale-110 blur-2xl' : 'opacity-80'}`} />
            
            {isVideoOff && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-slate-600 bg-slate-900">
                <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                  <span className="text-4xl">📹</span>
                </div>
                <span className="font-black uppercase tracking-[0.3em] text-[10px]">Câmera Desativada pelo Paciente</span>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            {/* HUD Elements */}
            <div className="absolute top-8 left-8 flex flex-col gap-4">
              <div className="bg-slate-950/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="flex gap-0.5 items-end h-4 w-6">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-blue-500 rounded-full transition-all duration-150" 
                      style={{ height: `${isActive && !isMuted ? Math.random() * volumeLevel * 150 + 20 : 20}%` }}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Audio Flux</span>
              </div>
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-slate-950/40 backdrop-blur-2xl p-3 rounded-3xl border border-white/5">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${isMuted ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <span className="text-xl">{isMuted ? '🔇' : '🎤'}</span>
              </button>
              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${isVideoOff ? 'bg-red-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <span className="text-xl">{isVideoOff ? '🚫' : '📹'}</span>
              </button>
              <div className="w-[1px] bg-white/10 mx-2"></div>
              <button 
                onClick={onClose}
                className="w-14 h-14 bg-red-600/20 hover:bg-red-600 text-white rounded-2xl flex items-center justify-center transition-all shadow-2xl"
              >
                <span className="text-xl">📞</span>
              </button>
            </div>
          </div>

          {/* Clinical Records & Chat */}
          <div className="lg:w-[40%] flex flex-col bg-slate-50 overflow-hidden">
            <div className="p-8 bg-white border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest">Transcrição em Tempo Real</h3>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Sessão Segura • {location.city}</p>
              </div>
              <div className="px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Live</span>
              </div>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar bg-slate-50/50">
              {history.map((turn, i) => (
                <div key={i} className={`flex flex-col ${turn.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
                  <p className="text-[9px] font-black mb-2 uppercase text-slate-400 tracking-widest px-2">
                    {turn.role === 'user' ? 'Você' : 'Médico Especialista IA'}
                  </p>
                  <div className={`max-w-[90%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm border ${
                    turn.role === 'user' 
                      ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' 
                      : 'bg-white text-slate-700 border-slate-200 rounded-tl-none'
                  }`}>
                    {turn.text}
                  </div>
                </div>
              ))}
              
              {/* Buffers de fala atual */}
              {(currentInput || currentOutput) && (
                <div className="space-y-6">
                  {currentInput && (
                    <div className="flex flex-col items-end opacity-60">
                      <p className="text-[9px] font-black mb-2 uppercase text-blue-500 tracking-widest px-2">Captando Voz...</p>
                      <div className="max-w-[90%] p-5 rounded-3xl text-sm leading-relaxed bg-blue-600/10 text-blue-700 border border-blue-200 rounded-tr-none italic">
                        {currentInput}
                      </div>
                    </div>
                  )}
                  {currentOutput && (
                    <div className="flex flex-col items-start">
                      <p className="text-[9px] font-black mb-2 uppercase text-slate-500 tracking-widest px-2">Analisando...</p>
                      <div className="max-w-[90%] p-5 rounded-3xl text-sm leading-relaxed bg-white text-slate-700 shadow-lg border-2 border-blue-100 rounded-tl-none ring-4 ring-blue-50/50">
                        {currentOutput}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {status === 'conectando' && (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-6 opacity-40">
                  <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Habilitando Protocolos Médicos...</p>
                </div>
              )}

              {status === 'erro' && (
                <div className="p-8 bg-red-50 border-2 border-red-100 rounded-[2rem] text-center space-y-4">
                  <div className="text-3xl">⚠️</div>
                  <p className="text-red-600 text-xs font-black uppercase tracking-widest">Falha Técnica de Triagem</p>
                  <p className="text-red-500 text-xs leading-relaxed font-medium">{errorMessage}</p>
                  <button onClick={() => window.location.reload()} className="w-full py-4 bg-red-600 text-white text-[10px] font-black uppercase rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-200">Reconectar Canal</button>
                </div>
              )}
              
              <div ref={transcriptionEndRef} />
            </div>

            <div className="p-8 bg-white border-t border-slate-200">
              <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 text-xl">💡</div>
                <p className="text-[10px] leading-relaxed text-blue-800 font-bold uppercase tracking-tight">
                  Mostre sua garganta, lesões na pele ou exames para a câmera para uma análise assistida por computador em {location.city}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;
