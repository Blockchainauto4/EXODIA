
import React from 'react';
import { UserLocation } from '../types';

const VoiceFAQ: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  
  const faqs = [
    {
      q: `Onde tem ${spec.toLowerCase()} perto de mim em ${location.city} aberto agora?`,
      a: `Você pode receber atendimento próximo em ${spec.toLowerCase()} agora mesmo através do IA HOSPITAL. Atendemos toda a minha região de ${location.city} - ${location.state}, identificando necessidades onde estou agora.`
    },
    {
      q: `Qual o melhor ${spec.toLowerCase()} aqui perto na minha área de ${location.city}?`,
      a: `O IA HOSPITAL oferece o melhor atendimento local em ${location.city}. Nossa tecnologia identifica sua localização para prover triagem qualificada perto daqui.`
    },
    {
      q: `Tem atendimento para ${spec.toLowerCase()} perto daqui em ${location.state} agora?`,
      a: `Sim! O IA HOSPITAL está aberto agora em todo o estado de ${location.state}. Oferecemos orientação médica na minha região 24 horas por dia.`
    },
    {
      q: `Como recebo atendimento próximo de ${spec.toLowerCase()} onde estou agora?`,
      a: `É simples: acesse o IA HOSPITAL, confirme sua localização em ${location.city} e fale com nossa IA para um atendimento local rápido na minha área.`
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Busca por Voz: Atendimento Perto de Mim</h2>
          <p className="text-slate-500 italic">"Ok Google, onde tem {spec.toLowerCase()} aqui perto?"</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
              <h3 className="text-lg font-bold text-blue-600 mb-3 flex items-start gap-3 leading-tight">
                <span className="shrink-0 bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-black">?</span>
                {faq.q}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed ml-9">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceFAQ;
