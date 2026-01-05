
import React from 'react';
import { UserLocation } from '../types';

const VoiceFAQ: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city === 'sua região' ? 'na minha região' : location.city;
  
  const faqs = [
    {
      q: `Ok Google, onde encontrar um ${spec.toLowerCase()} em ${city} perto de mim agora?`,
      a: `O IA HOSPITAL localiza instantaneamente o atendimento de ${spec.toLowerCase()} mais próximo de você em ${city}. Nossa triagem informa sobre clínicas abertas, consultórios locais e pronto atendimentos 24h na sua área.`
    },
    {
      q: `Tem algum médico de ${spec.toLowerCase()} atendendo hoje aqui perto?`,
      a: `Sim, nossa base mapeia especialistas em ${city} com disponibilidade imediata. Você pode realizar a triagem online agora e ser direcionado para o melhor profissional ou unidade médica na sua vizinhança.`
    },
    {
      q: `Qual o valor de uma consulta de ${spec.toLowerCase()} na minha cidade?`,
      a: `Os valores variam entre atendimento particular e convênio. No IA HOSPITAL em ${city}, orientamos você sobre as melhores opções de custo-benefício e clínicas com preços acessíveis na sua região.`
    },
    {
      q: `Onde tem um hospital 24 horas aberto agora em ${city}?`,
      a: `Para casos de emergência e urgência em ${city}, nossa IA identifica os hospitais e pronto atendimentos com funcionamento 24h mais próximos da sua localização atual.`
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-blue-100 rounded-2xl text-blue-600 mb-4 animate-bounce">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Busca por Voz e Ajuda Local</h2>
          <p className="text-slate-600 font-bold italic text-base tracking-tight">"Onde tem atendimento médico perto daqui agora?"</p>
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
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Tags de Localidade em {city}:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              `Especialista ${city}`,
              `Clínica no meu bairro`, 
              `Médico 24h aqui perto`,
              `Plantão médico agora`,
              `Atendimento rápido ${location.state}`,
              `Consulta particular ${city}`
            ].map(tag => (
              <span key={tag} className="text-[10px] font-black text-blue-800 uppercase border-2 border-blue-50 px-4 py-2 rounded-xl bg-white shadow-sm hover:bg-blue-600 hover:text-white transition-all cursor-default">
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
