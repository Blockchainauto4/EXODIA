
import React, { memo } from 'react';
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
    <section id="inicio" className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 -z-0 w-1/3 h-full bg-teal-50/50 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-6 border border-teal-200">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            Triagem Local Ativa em {location.city}
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            {location.specialty || 'Atendimento Médico'} <span className="text-teal-700">Perto de Mim</span> em {city}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Utilize nossa tecnologia de IA para localizar o atendimento de saúde ideal <span className="font-semibold text-slate-800">onde você está agora</span>. Orientação profissional e triagem rápida para a unidade de saúde mais próxima em seu bairro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onStartChat}
              className="px-8 py-4 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.839 8.839 0 01-4.082-.978L1 19l1.978-4.082A6.974 6.974 0 0110 3c4.418 0 8 3.134 8 7zm-2 0c0-2.76-2.686-5-6-5s-6 2.24-6 5 2.686 5 6 5 6-2.24 6-5zm-6-3a1 1 0 100 2 1 1 0 000-2zm-3 1a1 1 0 112 0 1 1 0 01-2 0zm7 0a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd" /></svg>
              Iniciar Triagem Inteligente
            </button>
            <button 
              onClick={onLiveOpen}
              className="px-8 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" /></svg>
              Consulta Pro por Vídeo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
