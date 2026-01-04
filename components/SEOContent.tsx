
import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  
  return (
    <section id="orientacao" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Onde tem {spec.toLowerCase()} <span className="text-blue-600 italic">perto de mim</span> em {location.city}?
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Se você está buscando por <span className="font-semibold text-blue-700 underline decoration-blue-100">{spec.toLowerCase()} próximo de mim</span> na minha região de {location.city} ({location.state}), o IA HOSPITAL é a solução definitiva. Nossa plataforma foi otimizada para identificar as necessidades de saúde <span className="font-bold">onde estou agora</span>, oferecendo um atendimento local que respeita as particularidades da minha área.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Atuamos fortemente com o sistema <span className="text-blue-600 font-bold italic">Helpful Content</span> do Google, garantindo que as informações sobre <span className="font-semibold">{spec.toLowerCase()} aqui perto</span> em {location.city} sejam precisas, autoritativas e centradas no bem-estar do paciente. Atendemos todos os bairros da região, facilitando o acesso ao <span className="font-bold">atendimento próximo</span> de qualidade.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800">Por que escolher o IA HOSPITAL na minha área em {location.city}?</h3>
              <ul className="space-y-3">
                {[
                  `Especialistas virtuais em ${spec} abertos agora 24/7.`,
                  `Orientação focada na realidade de ${location.city} - perto daqui.`,
                  `Atendimento local que identifica urgências onde estou agora.`,
                  `Conteúdo com alto EEAT focado na minha região e bem-estar local.`
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 text-sm">
                    <svg className="w-5 h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Atendimento Próximo em {location.city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Clínica Geral', 'Pediatria', 'Cardiologia', 'Saúde Mental', 'Ginecologia', 'Ortopedia'].map((s) => (
                <div key={s} className={`p-4 rounded-2xl border transition-all ${s === spec ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-slate-600 border-slate-200'}`}>
                  <p className="font-bold text-sm">{s}</p>
                  <p className={`text-[10px] ${s === spec ? 'text-blue-100' : 'text-slate-400'}`}>Aberto agora na minha área</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-xs text-blue-800 leading-relaxed font-medium italic">
                "Nossa missão é democratizar o acesso à saúde em {location.state}, garantindo um atendimento local imediato onde estou agora através da tecnologia do IA HOSPITAL."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
