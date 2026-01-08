
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
      q: `Siri, qual o CAPS ou Posto de Saúde mais próximo aqui em ${city}?`,
      a: `Existem diversas Unidades Básicas de Saúde (UBS), Postos de Saúde e centros de suporte (CAPS) em ${city}. Nós ajudamos você a encontrar o local mais perto daqui para consultas e acompanhamento.`
    },
    {
      q: `Ei Google, tem alguma AMA ou UBS perto de mim aberta em ${city}?`,
      a: `Sim, as AMAs e UBS em ${city} oferecem pronto atendimento e consultas. O IA HOSPITAL localiza a unidade mais próxima de onde você está agora para agilizar seu cuidado.`
    },
    {
      q: `Onde encontrar atendimento médico aqui perto em ${city} agora?`,
      a: `Para qualquer necessidade de ${spec.toLowerCase()} em ${city}, o IA HOSPITAL oferece orientação em tempo real sobre hospitais, prontos-socorros e unidades de saúde próximas à sua posição atual.`
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-teal-100 rounded-2xl text-teal-600 mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Perguntas Frequentes por Voz</h2>
          <p className="text-slate-600 text-lg">Respostas rápidas para as buscas de saúde mais comuns na sua região.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group" name="faq">
              <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <div className="ml-4 text-slate-400 group-open:rotate-180 transition-transform">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </summary>
              <p className="text-slate-600 text-sm leading-relaxed mt-4 pt-4 border-t border-slate-100">{faq.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Estratégia Local em {city}:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              `UPA perto de mim ${city}`,
              `Posto de Saúde aqui perto`, 
              `AMA mais próxima em ${city}`,
              `CAPS perto daqui agora`,
              `Pronto Socorro próximo em ${city}`
            ].map(tag => (
              <span key={tag} className="text-xs font-semibold text-teal-800 border border-teal-100 px-3 py-1.5 rounded-lg bg-teal-50">
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
