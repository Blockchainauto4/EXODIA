
import React from 'react';
import { UserLocation } from '../types';

const Hero: React.FC<{ location: UserLocation }> = ({ location }) => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-wide">
            IA HOSPITAL: ABERTO AGORA
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            {location.specialty || 'Atendimento Médico'} <span className="text-blue-600 font-black italic">Perto de Mim</span> em {location.city} - {location.state}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Precisa de um {location.specialty ? location.specialty.toLowerCase() : 'atendimento'} qualificado <span className="font-bold text-slate-900 underline decoration-blue-500">onde estou agora</span>? O IA HOSPITAL oferece <span className="font-bold">atendimento local</span> na minha área em {location.state}, com triagem inteligente aqui perto para sua segurança.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#assistente" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all text-center">
              Atendimento Próximo de Mim
            </a>
            <a href="#orientacao" className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-700 font-bold rounded-xl transition-all text-center">
              Saúde na Minha Região
            </a>
          </div>
          
          <div className="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://picsum.photos/seed/${i+20}/100/100`} alt="Usuário" />
              ))}
            </div>
            <span>Atendimento próximo aberto agora na minha área</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
