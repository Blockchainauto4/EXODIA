
import React from 'react';
import { UserLocation } from '../types';

const VoiceFAQ: React.FC<{ location: UserLocation }> = ({ location }) => {
  const isCuiaba = location.city.toLowerCase().includes('cuiabá');
  
  const faqs = [
    {
      q: `Onde encontrar um nutricionista em Cuiabá perto de mim agora?`,
      a: `No IA HOSPITAL, você recebe orientação imediata sobre atendimento nutricional na capital. Se você está em Cuiabá, nossa triagem aponta para o nutricionista ideal na sua região, seja no Jardim Cuiabá, Santa Rosa ou Goiabeiras, facilitando seu agendamento.`
    },
    {
      q: `Como agendar nutricionista em Cuiabá pelo convênio ou particular?`,
      a: `O IA HOSPITAL orienta você sobre as modalidades de atendimento. Se você busca nutricionista particular em Cuiabá para um acompanhamento VIP ou prefere usar seu convênio, nossa plataforma organiza as informações para que sua saúde não espere.`
    },
    {
      q: `Qual o melhor nutricionista Cuiabá para emagrecimento e bioimpedância?`,
      a: `A busca pelo melhor nutricionista em Cuiabá deve considerar a especialidade em emagrecimento e a disponibilidade de exames de bioimpedância. Nossa IA avalia seus sintomas e objetivos para sugerir consultórios de nutrição renomados no Mato Grosso.`
    },
    {
      q: `Existe atendimento nutricional no IA HOSPITAL em Cuiabá?`,
      a: `Sim, o IA Hospital atendimento nutricional está disponível 24h. Oferecemos suporte educativo em nutrição clínica e hospitalar, ajudando você a entender sua necessidade nutricional antes mesmo de chegar ao consultório em Cuiabá.`
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase leading-none">Busca por Voz e Perguntas Frequentes</h2>
          <p className="text-slate-500 font-bold italic text-sm tracking-tight">"Ok Google, tem nutricionista em Cuiabá aqui perto?"</p>
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

        {isCuiaba && (
          <div className="mt-16 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Explore Categorias Relacionadas:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Nutricionista Mato Grosso', 
                'Bioimpedância Cuiabá perto de mim', 
                'Consultório de nutrição em Cuiabá',
                'Nutricionista hospitalar Cuiabá'
              ].map(tag => (
                <span key={tag} className="text-[10px] font-bold text-blue-600/80 uppercase border border-blue-200 px-4 py-2 rounded-xl bg-white shadow-sm hover:bg-blue-50 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VoiceFAQ;
