
import React from 'react';
import { UserLocation } from '../types';

interface HeroProps {
  location: UserLocation;
  onStartChat?: () => void;
  onPatientOpen?: () => void;
  onLiveOpen?: () => void;
}

const Hero: React.FC<HeroProps> = ({ location, onStartChat, onPatientOpen, onLiveOpen }) => {
  const city = location.city === 'sua região' ? 'na sua cidade' : location.city;

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
        <div className="max-w-4xl mx-auto md:mx-0">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black tracking-[0.2em] uppercase">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              Aberto Agora em {location.city}
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black tracking-[0.2em] uppercase">
              Triagem Local Ativa
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tighter">
            {location.specialty || 'Atendimento Médico'} <span className="text-blue-600 font-black italic underline decoration-blue-200">Perto de Mim</span> em {city}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
            Tecnologia avançada para localização de saúde <span className="font-bold text-slate-900 underline decoration-blue-500">onde você está agora</span>. Receba orientação profissional e triagem rápida por IA no seu bairro. O IA HOSPITAL conecta você ao atendimento ideal na região de {location.city}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10">
            <button 
              onClick={onStartChat}
              className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
              Iniciar Triagem Local
            </button>
            <button 
              onClick={onLiveOpen}
              className="px-10 py-5 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-3 text-xs"
            >
              <span className="text-lg">📹</span> Consulta Pro na Região
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center md:justify-start gap-4 text-[10px] text-slate-500 font-black uppercase tracking-widest">
            <span className="bg-slate-100 px-3 py-1 rounded-lg">Próximo de Você</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg">Triagem Imediata</span>
            <span className="bg-slate-100 px-3 py-1 rounded-lg">Unidades 24h</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
