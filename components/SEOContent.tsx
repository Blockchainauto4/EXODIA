
import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city === 'sua região' ? 'sua cidade' : location.city;
  const state = location.state;
  
  const lowerSpec = spec.toLowerCase();
  const isUrgencia = lowerSpec.includes('upa') || lowerSpec.includes('pronto') || lowerSpec.includes('emergencia');
  const isPublico = lowerSpec.includes('posto') || lowerSpec.includes('ubs') || lowerSpec.includes('ama') || lowerSpec.includes('caps');
  const isNutricao = lowerSpec.includes('nutri');
  const isDerma = lowerSpec.includes('derma');

  const getContext = () => {
    if (isUrgencia) return { icon: '🚨', color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', tag: 'Emergência 24h' };
    if (isPublico) return { icon: '🏛️', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', tag: 'Rede Pública/Local' };
    if (isNutricao) return { icon: '🥗', color: 'text-emerald-700', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', tag: 'Saúde & Dieta' };
    if (isDerma) return { icon: '🔬', color: 'text-rose-700', bgColor: 'bg-rose-50', borderColor: 'border-rose-200', tag: 'Clínica Dermatológica' };
    return { icon: '🏥', color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', tag: 'Unidade de Saúde' };
  };

  const context = getContext();

  return (
    <section id="orientacao" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="animate-fade-in">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${context.bgColor} ${context.color} text-[10px] font-black uppercase tracking-widest mb-6 border ${context.borderColor}`}>
              {context.icon} {context.tag} em {city}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">
              {spec} <span className={`${context.color} italic underline decoration-slate-200`}>Próximo a Mim</span> em {city}
            </h2>
            
            <div className="prose prose-slate text-slate-600 mb-8 leading-relaxed space-y-6">
              <p className="text-base font-medium">
                Está buscando por <span className="font-black text-slate-900">{spec.toLowerCase()} em {city} aqui perto</span>? O IA HOSPITAL ajuda você a localizar a unidade de atendimento mais eficiente <span className="font-bold underline">onde você está agora</span>. Seja para uma consulta de rotina no <span className="font-bold">Posto de Saúde (UBS)</span>, assistência imediata na <span className="font-bold">UPA 24h</span> ou atendimento especializado em uma <span className="font-bold">AMA</span> da sua região, nossa triagem inteligente direciona você para o local correto no estado de {state}.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className={`p-5 ${context.bgColor} border-l-4 border-slate-900 rounded-xl`}>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Localização Imediata</h4>
                  <p className="text-xs font-bold text-slate-700 italic">Unidades de {spec} mapeadas no seu bairro hoje.</p>
                </div>
                <div className="p-5 bg-slate-50 border-l-4 border-emerald-600 rounded-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Acesso Gratuito</h4>
                  <p className="text-xs font-bold text-slate-700 italic">Orientação digital sem custos para pacientes em {city}.</p>
                </div>
              </div>

              <p className="text-sm">
                Encontrar um <span className="font-bold">{spec.toLowerCase()} próximo de mim</span> agora é mais simples. Mapeamos desde grandes complexos hospitalares até <span className="italic">Postos de Saúde de bairro</span>, garantindo que você tenha a informação necessária sobre <span className="font-bold">pronto atendimento, UBS e AMAs</span> em {city} de forma rápida e segura.
              </p>

              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">{context.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="text-blue-400">⚡</span> Guia Local {city}
                </h3>
                <ul className="space-y-4">
                  {[
                    `Qual a ${spec.toLowerCase()} mais próxima da minha localização?`,
                    `Horário de funcionamento do Posto de Saúde em ${city}.`,
                    `Como chegar na UPA ou AMA mais perto daqui?`,
                    `Triagem inteligente para casos de urgência em ${city}.`
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
                Mapa de <span className={context.color}>Atendimento</span> Local
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-8">
                Informações atualizadas sobre <span className="font-black text-slate-900 underline decoration-blue-500">{spec}</span> na sua área. Conectamos você ao ecossistema de saúde de <span className="font-bold">{city}</span>.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">🗺️</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Raio de Busca</p>
                    <p className="text-xs font-bold text-slate-900 uppercase">Até 5km de {city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">🚑</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Unidade</p>
                    <p className="text-xs font-bold text-emerald-600 uppercase">Pública e Privada • {spec}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Buscas relacionadas em {city}:</p>
                <div className="flex flex-wrap gap-2">
                  {['UPA 24h', 'UBS Posto', 'AMA Local', 'Pronto Socorro', 'Médico do Bairro'].map(s => (
                    <span key={s} className="px-3 py-1 bg-white border border-slate-200 text-[9px] font-black text-slate-600 rounded-lg uppercase tracking-widest">{s}</span>
                  ))}
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
