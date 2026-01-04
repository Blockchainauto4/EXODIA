
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
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<any>(null);
  const videoIntervalRef = useRef<number | null>(null);
  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const startSession = async () => {
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
          systemInstruction: `Você é um médico especialista do IA HOSPITAL em ${location.city}. 
          Você está realizando uma consulta de teleorientação por vídeo e áudio em tempo real.
          INSTRUÇÕES:
          1. Analise o vídeo do paciente (expressão, sinais visíveis) e o áudio.
          2. Seja extremamente profissional, calmo e empático.
          3. REGRAS DE SEGURANÇA: Se detectar sinais de emergência, interrompa e diga para ligar 192.
          4. Não forneça diagnóstico final, apenas orientação e triagem.
          5. Mencione que você está analisando a saúde dele em ${location.city} agora.`,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            // Iniciar fluxo de áudio
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);

            // Iniciar fluxo de vídeo (frames)
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
            // Processar áudio de saída
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextOutRef.current) {
              const ctx = audioContextOutRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            // Transcrições
            if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscription(prev => [...prev, { role: 'user', text }]);
            }
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscription(prev => [...prev, { role: 'model', text }]);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => setIsActive(false),
          onerror: (e) => console.error("Live API Error:", e),
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Start Session Failed:", err);
      alert("Erro ao acessar câmera/microfone. Verifique as permissões.");
    }
  };

  const stopSession = () => {
    if (videoIntervalRef.current !== null) {
      clearInterval(videoIntervalRef.current);
      videoIntervalRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
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
      {/* Área de Vídeo Principal */}
      <div className="relative flex-grow bg-black flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-80"
        />
        <canvas ref={canvasRef} className="hidden" />
        
        {/* UI Overlay no Vídeo */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start pointer-events-auto">
            <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-white text-xs font-black uppercase tracking-tighter">Análise em Tempo Real</p>
                  <p className="text-slate-400 text-[10px] font-bold">Unidade IA: {location.city}</p>
                </div>
              </div>
            </div>
            <button onClick={stopSession} className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all shadow-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="flex justify-center">
             <div className="bg-slate-900/60 backdrop-blur-xl p-4 rounded-3xl border border-white/10 flex items-center gap-6">
                <div className="flex gap-1 items-center">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1 bg-blue-500 rounded-full animate-wave" style={{ height: `${Math.random() * 40 + 10}px`, animationDelay: `${i * 0.05}s` }}></div>
                  ))}
                </div>
                <div className="text-white">
                  <p className="text-[10px] font-bold uppercase text-blue-400">IA HOSPITAL Voice</p>
                  <p className="text-sm font-medium">Ouvindo e Analisando...</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Painel de Transcrição e Diagnóstico Lateral */}
      <div className="w-full md:w-96 bg-slate-900 border-l border-white/5 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-slate-950">
          <h3 className="text-white font-black uppercase text-sm tracking-widest flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            Painel de Triagem
          </h3>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-900/50">
          {transcription.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.827-1.213L3 20l1.391-3.917A8.947 8.947 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Aguardando Interação...</p>
              <p className="text-slate-600 text-[10px] mt-2 px-6">Descreva seus sintomas ou mostre sinais visíveis para a câmera.</p>
            </div>
          )}
          {transcription.map((t, i) => (
            <div key={i} className={`flex ${t.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-3 rounded-2xl text-[13px] leading-relaxed shadow-lg ${
                t.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'
              }`}>
                {t.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-slate-950 border-t border-white/5">
           <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
              <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Aviso Médico
              </p>
              <p className="text-slate-400 text-[11px] leading-tight">Esta análise por IA em {location.city} é uma triagem informativa. Em caso de falta de ar ou dor no peito, ligue 192 imediatamente.</p>
           </div>
        </div>
      </div>
      
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.2); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LiveAnalysis;
