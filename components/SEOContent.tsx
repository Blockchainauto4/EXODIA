
import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city === 'sua região' ? 'sua cidade' : location.city;
  const state = location.state;
  
  const lowerSpec = spec.toLowerCase();
  const isUrgencia = lowerSpec.includes('upa') || lowerSpec.includes('pronto') || lowerSpec.includes('socorro');
  const isPublico = lowerSpec.includes('posto') || lowerSpec.includes('ubs') || lowerSpec.includes('ama');

  const getContext = () => {
    if (isUrgencia) return { icon: '🚨', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', tag: 'Urgência 24h Perto de Você' };
    if (isPublico) return { icon: '🏛️', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', tag: 'Saúde Pública Perto de Mim' };
    return { icon: '🏥', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', tag: 'Atendimento Próximo' };
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
                Procurando por <span className="font-black text-slate-900">{spec.toLowerCase()} perto de mim</span> agora? Se você está em {city} e precisa de atendimento imediato, o IA HOSPITAL mapeia as melhores opções <span className="font-bold underline">aqui perto</span>. Seja uma <span className="font-bold">UPA Perto de Mim</span> para emergências 24h, um <span className="font-bold">Posto de Saúde Próximo</span> para consultas de rotina ou uma <span className="font-bold">AMA na sua região</span>, nossa triagem inteligente ajuda você a encontrar o local ideal <span className="font-bold">onde você está agora</span> em {state}.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className={`p-5 ${context.bgColor} border-l-4 border-slate-900 rounded-xl`}>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Localização Direta</h4>
                  <p className="text-xs font-bold text-slate-700 italic">Unidades de {spec} mais próximas do seu bairro.</p>
                </div>
                <div className="p-5 bg-slate-50 border-l-4 border-emerald-600 rounded-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Busca Rápida</h4>
                  <p className="text-xs font-bold text-slate-700 italic">Triagem inteligente para o atendimento médico mais perto daqui.</p>
                </div>
              </div>

              <p className="text-sm">
                Nossa missão é facilitar o acesso à saúde <span className="font-bold">próximo a você</span>. Muitas vezes, um <span className="font-bold">Posto de Saúde (UBS)</span> ou uma <span className="font-bold">AMA</span> pode resolver seu problema sem a necessidade de grandes deslocamentos. O IA HOSPITAL organiza as informações de <span className="font-bold">upa perto de mim, postos de saúde e prontos-socorros</span> em {city} para que você tenha socorro rápido no momento que mais precisa.
              </p>

              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">{context.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="text-blue-400">📍</span> Raio de Atendimento {city}
                </h3>
                <ul className="space-y-4">
                  {[
                    `Qual a ${spec.toLowerCase()} mais perto de mim agora?`,
                    `Endereço de Posto de Saúde e UBS próximo daqui.`,
                    `UPA 24 horas em ${city} perto de você.`,
                    `Atendimento em AMAs na sua região de ${city}.`
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
                Detectamos automaticamente unidades de <span className="font-black text-slate-900 underline decoration-blue-500">{spec} perto de mim</span> para agilizar seu socorro em <span className="font-bold">{city}</span>.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">📍</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sua Localização</p>
                    <p className="text-xs font-bold text-slate-900 uppercase">{city}, {state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">🏥</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Foco de Busca</p>
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
