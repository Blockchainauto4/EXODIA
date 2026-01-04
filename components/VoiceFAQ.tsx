
import React from 'react';
import { UserLocation } from '../types';

const VoiceFAQ: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city;
  
  // FAQs Dinâmicas baseadas na especialidade atual do cluster
  const faqs = [
    {
      q: `Onde encontrar um ${spec.toLowerCase()} em ${city} perto de mim agora?`,
      a: `O IA HOSPITAL localiza o atendimento de ${spec.toLowerCase()} mais próximo de sua localização atual em ${city}. Nossa triagem orienta sobre clínicas abertas e profissionais disponíveis para agendamento imediato na região.`
    },
    {
      q: `Como funciona a triagem para ${spec.toLowerCase()} em ${city}?`,
      a: `Nossa inteligência artificial analisa seus sintomas e histórico de saúde para fornecer uma orientação preliminar. Em ${city}, direcionamos você para o nível de cuidado adequado, seja uma consulta eletiva ou pronto-atendimento.`
    },
    {
      q: `Qual o valor médio de uma consulta com ${spec.toLowerCase()} em ${city}?`,
      a: `Os valores em ${city} variam conforme a experiência do profissional e a localização do consultório. Pelo IA HOSPITAL, você pode receber orientações sobre atendimentos particulares e por convênios disponíveis na sua área.`
    },
    {
      q: `Existe atendimento de ${spec.toLowerCase()} por telemedicina em ${city}?`,
      a: `Sim, muitos profissionais de ${city} integrados à nossa rede oferecem a modalidade de teleconsulta após a triagem inicial pela nossa plataforma, garantindo conforto e rapidez.`
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Busca por Voz e Perguntas Frequentes</h2>
          <p className="text-slate-500 font-bold italic text-sm tracking-tight">"Ok Google, onde tem {spec.toLowerCase()} aqui perto em {city}?"</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
              <h3 className="text-lg font-black text-slate-800 mb-5 flex items-start gap-5 leading-tight group-hover:text-blue-600 transition-colors">
                <span className="shrink-0 bg-blue-600 text-white rounded-2xl w-12 h-12 flex items-center justify-center text-lg font-black shadow-lg shadow-blue-600/20">?</span>
                {faq.q}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed ml-16 font-medium border-l-2 border-slate-100 pl-6 group-hover:border-blue-200 transition-colors">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Explore em {city}:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              `${spec} ${city} agendar`,
              `Clínica de ${spec.toLowerCase()} perto de mim`, 
              `${spec} em ${city} particular`,
              `IA Hospital ${city} ${spec.toLowerCase()}`
            ].map(tag => (
              <span key={tag} className="text-[10px] font-bold text-blue-600/80 uppercase border border-blue-200 px-4 py-2 rounded-xl bg-white shadow-sm hover:bg-blue-50 transition-colors cursor-default">
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
