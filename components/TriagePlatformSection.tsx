
import React, { useState } from 'react';

interface TriagePlatformSectionProps {
  onStartTrial: () => void;
  onRegisterUnit: () => void;
}

const TriagePlatformSection: React.FC<TriagePlatformSectionProps> = ({ onRegisterUnit }) => {
  const [playVideo, setPlayVideo] = useState(false);

  const steps = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      title: "1. Chamada Segura",
      desc: "Paciente inicia uma chamada de áudio ou vídeo diretamente pela plataforma."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.757 16.243a6 6 0 108.486-8.486 6 6 0 00-8.486 8.486z" /></svg>,
      title: "2. Análise por IA",
      desc: "Nossa IA transcreve e analisa a conversa em tempo real, identificando sintomas e urgência."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: "3. Distribuição Inteligente",
      desc: "O sistema encaminha a chamada para o profissional qualificado e disponível mais próximo."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      title: "4. Contexto Imediato",
      desc: "Você recebe um resumo da IA antes de atender, otimizando o tempo da consulta."
    }
  ];

  return (
    <section className="bg-slate-950 text-white pt-48 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-slate-950 to-slate-950"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-48 -left-24 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="text-teal-400 font-semibold uppercase tracking-widest text-sm">IA HOSPITAL PARA PROFISSIONAIS</span>
        <h1 className="text-5xl md:text-7xl font-thin text-white leading-tight mt-4 tracking-tight">
          O futuro da triagem <span className="font-normal">começa com confiança.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mt-6 max-w-3xl mx-auto">
          Combinando inteligência artificial e análise de áudio e vídeo, nossa plataforma eleva a segurança e a precisão nos processos de triagem e encaminhamento de pacientes.
        </p>

        <div className="mt-12 aspect-video w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-teal-900/40 border-2 border-white/10 relative bg-black">
          {!playVideo ? (
            <button
              onClick={() => setPlayVideo(true)}
              className="w-full h-full flex items-center justify-center group"
              aria-label="Assistir vídeo sobre o IA Hospital"
            >
              <img
                src="https://img.youtube.com/vi/MtYsUdfZPMA/maxresdefault.jpg"
                alt="Pré-visualização do vídeo sobre o IA Hospital"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
              <div className="relative w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/30 transition-all shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          ) : (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/MtYsUdfZPMA?autoplay=1&mute=0&loop=0&playlist=MtYsUdfZPMA&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
              title="Vídeo de Apresentação IA Hospital"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div className="mt-16 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {steps.map((step, index) => (
              <div key={index} className="p-4 rounded-2xl bg-black/20">
                <div className="w-12 h-12 bg-slate-800 text-teal-400 rounded-xl flex items-center justify-center mb-4">{step.icon}</div>
                <h3 className="font-bold text-white text-sm">{step.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-black/20 rounded-2xl">
              <p className="font-bold text-white text-center">Pronto para integrar sua unidade?</p>
              <button onClick={onRegisterUnit} className="px-6 py-3 bg-white text-slate-900 font-bold uppercase text-xs tracking-widest rounded-lg transition-transform hover:scale-105 shrink-0">
                Cadastrar Unidade
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriagePlatformSection;
