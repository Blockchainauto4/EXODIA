
import React from 'react';
import { UserLocation } from '../types';

const VoiceFAQ: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city === 'sua região' ? 'na minha região' : location.city;
  
  const faqs = [
    {
      q: `Ok Google, onde tem uma UPA perto de mim em ${city}?`,
      a: `O IA HOSPITAL identifica a UPA 24h mais próxima da sua localização em ${city}. Basta iniciar a triagem para saber qual unidade de urgência está com atendimento disponível agora perto de você.`
    },
    {
      q: `Siri, qual o Posto de Saúde mais próximo aqui em ${city}?`,
      a: `Existem diversas Unidades Básicas de Saúde (UBS) e Postos de Saúde em ${city}. Nós ajudamos você a encontrar o posto mais perto daqui para consultas, vacinas e exames de rotina.`
    },
    {
      q: `Ei Google, tem alguma AMA perto de mim aberta em ${city}?`,
      a: `Sim, as AMAs em ${city} oferecem pronto atendimento para casos leves. O IA HOSPITAL localiza a AMA mais próxima de onde você está agora para agilizar seu cuidado.`
    },
    {
      q: `Onde encontrar atendimento médico perto de mim em ${city} agora?`,
      a: `Para qualquer necessidade de ${spec.toLowerCase()} em ${city}, o IA HOSPITAL oferece orientação em tempo real sobre hospitais, prontos-socorros e unidades de saúde próximas à sua posição atual.`
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-blue-100 rounded-2xl text-blue-600 mb-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Busca por Voz: Perto de Mim</h2>
          <p className="text-slate-600 font-bold italic text-base tracking-tight">"Onde tem atendimento médico aqui perto?"</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200 hover:border-blue-400 transition-all duration-300 group">
              <h3 className="text-sm font-black text-slate-800 mb-5 flex items-start gap-5 leading-tight group-hover:text-blue-700 uppercase tracking-tight">
                <span className="shrink-0 bg-blue-700 text-white rounded-2xl w-10 h-10 flex items-center justify-center text-xs font-black shadow-lg">?</span>
                {faq.q}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed ml-15 font-medium border-l-2 border-slate-100 pl-6 group-hover:border-blue-200 transition-colors">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Estratégia Local em {city}:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              `UPA perto de mim ${city}`,
              `Posto de Saúde aqui perto`, 
              `AMA mais próxima em ${city}`,
              `UBS perto daqui agora`,
              `Pronto Socorro próximo em ${city}`
            ].map(tag => (
              <span key={tag} className="text-[10px] font-black text-blue-800 uppercase border-2 border-blue-50 px-4 py-2 rounded-xl bg-white shadow-sm hover:bg-blue-600 hover:text-white transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceFAQ;
