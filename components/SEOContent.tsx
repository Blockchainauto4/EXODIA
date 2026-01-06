
import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city === 'sua região' ? 'sua cidade' : location.city;
  const state = location.state;
  
  const lowerSpec = spec.toLowerCase();
  const isUrgencia = lowerSpec.includes('upa') || lowerSpec.includes('pronto') || lowerSpec.includes('socorro');
  const isPublico = lowerSpec.includes('posto') || lowerSpec.includes('ubs') || lowerSpec.includes('ama') || lowerSpec.includes('caps');

  const getContext = () => {
    if (isUrgencia) return { icon: '🚨', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', tag: 'Urgência 24h Perto de Você' };
    if (isPublico) return { icon: '🏛️', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', tag: 'Unidade de Saúde na Sua Região' };
    return { icon: '🏥', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', tag: 'Atendimento Aqui Perto' };
  };

  const context = getContext();

  return (
    <section id="orientacao" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="animate-fade-in">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${context.bgColor} ${context.color} text-[10px] font-black uppercase tracking-widest mb-6 border ${context.borderColor}`}>
              {context.icon} {context.tag}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">
              {spec} <span className={`${context.color} italic underline decoration-slate-200`}>Perto de Mim</span> em {city}
            </h2>
            
            <div className="prose prose-slate text-slate-600 mb-8 leading-relaxed space-y-6">
              <p className="text-base font-medium">
                Precisa de <span className="font-black text-slate-900">{spec.toLowerCase()} em {city} perto de mim</span> agora? Se você busca por um <span className="font-bold">Posto de Saúde</span>, <span className="font-bold">UPA 24h</span> ou atendimento especializado em um <span className="font-bold">CAPS</span> ou <span className="font-bold">AMA</span> na sua região, o IA HOSPITAL localiza a unidade ideal <span className="font-bold underline">onde você está agora</span>. Mapeamos o ecossistema de saúde de {city} para oferecer orientação imediata em {state}.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className={`p-5 ${context.bgColor} border-l-4 border-slate-900 rounded-xl`}>
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-1">Localização Imediata</h3>
                  <p className="text-xs font-bold text-slate-700 italic">Unidades de {spec} mapeadas no seu bairro.</p>
                </div>
                <div className="p-5 bg-slate-50 border-l-4 border-blue-600 rounded-xl">
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-1">Busca Por Proximidade</h3>
                  <p className="text-xs font-bold text-slate-700 italic">Triagem inteligente para o atendimento mais perto daqui.</p>
                </div>
              </div>

              <p className="text-sm">
                Facilitar o acesso à saúde <span className="font-bold">próximo de você</span> é nossa prioridade. Seja para atendimento ambulatorial em uma <span className="font-bold">AMA</span>, suporte em saúde mental no <span className="font-bold">CAPS</span>, ou rotina em um <span className="font-bold">Posto de Saúde (UBS)</span> em {city}, nossa tecnologia de IA direciona seu caso com precisão, garantindo socorro onde você mais precisa.
              </p>

              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700" aria-hidden="true">{context.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="text-blue-400">📍</span> Raio de Atendimento {city}
                </h3>
                <ul className="space-y-4">
                  {[
                    `Qual a ${spec.toLowerCase()} mais perto de mim em ${city}?`,
                    `Endereço de Posto de Saúde e CAPS em ${city} aqui perto.`,
                    `UPA 24 horas e Prontos-Socorros próximos daqui.`,
                    `Atendimento em AMAs e Unidades Básicas na sua região.`
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs font-bold uppercase tracking-tight text-slate-300 border-b border-white/5 pb-2">
                      <span className="text-blue-500">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-32">
            <div className={`${context.bgColor} p-10 rounded-[3rem] border-2 ${context.borderColor} shadow-xl relative`}>
              <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                Unidade <span className={context.color}>Mais Próxima</span>
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-8">
                Localizamos unidades de <span className="font-black text-slate-900 underline decoration-blue-500">{spec} perto daqui</span> para agilizar seu socorro imediato em <span className="font-bold">{city}</span>.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl" aria-hidden="true">📍</div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sua Localização</h4>
                    <p className="text-xs font-bold text-slate-900 uppercase">{city}, {state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl" aria-hidden="true">🏥</div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unidade Local</h4>
                    <p className="text-xs font-bold text-blue-600 uppercase">{spec} Perto de Mim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
