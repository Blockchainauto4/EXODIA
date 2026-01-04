
import React from 'react';
import { UserLocation } from '../types';

interface HeroProps {
  location: UserLocation;
  onStartLive?: () => void;
}

const Hero: React.FC<HeroProps> = ({ location, onStartLive }) => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
        <div className="max-w-4xl mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-wide animate-bounce">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            IA HOSPITAL: ANÁLISE POR VÍDEO DISPONÍVEL
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tighter">
            {location.specialty || 'Atendimento Médico'} <span className="text-blue-600 font-black italic">Perto de Mim</span> em {location.city}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
            Atendimento médico de alta tecnologia <span className="font-bold text-slate-900 underline decoration-blue-500">onde estou agora</span>. Inicie uma análise inteligente por vídeo, áudio e chat para triagem médica na sua área em {location.state}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={onStartLive}
              className="group relative px-8 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              Iniciar Consulta por Vídeo
            </button>
            <a href="#assistente" className="px-8 py-5 bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-700 font-bold rounded-2xl transition-all text-center flex items-center justify-center gap-2">
              Conversar via Chat
            </a>
          </div>
          
          <div className="mt-12 flex items-center justify-center md:justify-start gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
            <div className="flex -space-x-2">
              {[1,2,3,4,5].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" src={`https://picsum.photos/seed/${i+50}/100/100`} alt="Paciente Atendido" />
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">+10k</div>
            </div>
            <span className="max-w-[150px] leading-tight">Análises realizadas hoje na sua região</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
