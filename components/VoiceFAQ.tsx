import React from 'react';
import { UserLocation } from '../types';

const VoiceFAQ: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city;
  
  const faqs = [
    {
      q: `Onde encontrar um ${spec.toLowerCase()} em ${city} perto de mim agora?`,
      a: `O IA HOSPITAL localiza o atendimento mais próximo em ${city}. Nossa triagem orienta sobre clínicas abertas e profissionais disponíveis na região.`
    },
    {
      q: `Como funciona a triagem para ${spec.toLowerCase()} em ${city}?`,
      a: `Nossa IA analisa seus sintomas para fornecer orientação preliminar em ${city}, direcionando você para o nível de cuidado adequado.`
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Busca por Voz e Perguntas Frequentes</h2>
          <p className="text-slate-600 font-bold italic text-base tracking-tight">"Ok Google, onde tem {spec.toLowerCase()} aqui perto em {city}?"</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-blue-400 transition-all duration-300 group">
              <h3 className="text-lg font-black text-slate-800 mb-5 flex items-start gap-5 leading-tight group-hover:text-blue-700">
                <span className="shrink-0 bg-blue-700 text-white rounded-2xl w-12 h-12 flex items-center justify-center text-lg font-black shadow-lg">?</span>
                {faq.q}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed ml-16 font-medium border-l-2 border-slate-100 pl-6 group-hover:border-blue-200">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Explore em {city}:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              `${spec} ${city} agendar`,
              `Clínica perto de mim`, 
              `IA Hospital ${city}`
            ].map(tag => (
              <span key={tag} className="text-xs font-bold text-blue-700 uppercase border border-blue-200 px-4 py-2 rounded-xl bg-white shadow-sm hover:bg-blue-50 transition-colors cursor-default">
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