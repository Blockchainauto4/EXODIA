
import React from 'react';
import { UserLocation } from '../types';

const VoiceFAQ: React.FC<{ location: UserLocation }> = ({ location }) => {
  const cityLower = location.city.toLowerCase();
  const isCuiaba = cityLower.includes('cuiabá');
  const isLucasRioVerde = cityLower.includes('lucas do rio verde');
  
  const faqs = [
    {
      q: `Onde encontrar um nutricionista em ${location.city} perto de mim agora?`,
      a: `Pelo IA HOSPITAL, você recebe orientação imediata. Se você está em ${location.city}, nossa triagem localiza especialistas próximos, seja para nutrição clínica ou funcional, facilitando que você encontre atendimento onde está agora.`
    },
    {
      q: `Como agendar nutricionista em ${location.city} pelo convênio ou particular?`,
      a: `O IA HOSPITAL informa sobre as opções em ${location.city}. Através da nossa IA, você descobre consultórios que atendem seu convênio ou oferecem consultas particulares, agilizando sua jornada de saúde.`
    },
    {
      q: `Qual o melhor nutricionista em ${location.city} para emagrecimento?`,
      a: `O melhor nutricionista é aquele que atende seu perfil metabólico. Em ${location.city}, nossa tecnologia avalia sua necessidade para indicar clínicas renomadas, inclusive com suporte a exames de bioimpedância.`
    },
    {
      q: `Tem nutricionista hospitalar em ${location.city}?`,
      a: `Sim, o IA Hospital mapeia o atendimento em ${location.city}, incluindo suporte em nutrição hospitalar e clínica para casos complexos, disponível 24h para orientação inicial.`
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Busca por Voz e Perguntas Frequentes</h2>
          <p className="text-slate-500 font-bold italic text-sm tracking-tight">"Ok Google, tem nutricionista em {location.city} aqui perto?"</p>
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
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Explore Categorias em {location.city}:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              `Nutricionista ${location.city} MT`,
              `Bioimpedância ${location.city} perto de mim`, 
              `Consultório de nutrição em ${location.city}`,
              isLucasRioVerde ? 'IA Hospital Lucas do Rio Verde nutrição' : `IA Hospital ${location.city} nutrição`
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
