
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
    if (isUrgencia) return { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>, color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', tag: 'Urgência 24h Perto de Você' };
    if (isPublico) return { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-6 0H3" /></svg>, color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-200', tag: 'Unidade de Saúde na Sua Região' };
    return { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-6 0H3" /></svg>, color: 'text-teal-700', bgColor: 'bg-teal-50', borderColor: 'border-teal-200', tag: 'Atendimento Aqui Perto' };
  };

  const context = getContext();

  return (
    <section id="orientacao" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="animate-fade-in">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${context.bgColor} ${context.color} text-xs font-bold mb-6 border ${context.borderColor}`}>
              {context.icon} {context.tag}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              {spec} <span className={`${context.color}`}>Perto de Mim</span> em {city}
            </h2>
            
            <div className="prose prose-slate text-slate-600 mb-8 leading-relaxed space-y-6">
              <p className="text-base">
                Precisa de <span className="font-bold text-slate-900">{spec.toLowerCase()} em {city} perto de mim</span> agora? Se você busca por um <span className="font-semibold">Posto de Saúde</span>, <span className="font-semibold">UPA 24h</span> ou atendimento especializado em um <span className="font-semibold">CAPS</span> ou <span className="font-semibold">AMA</span> na sua região, o IA HOSPITAL localiza a unidade ideal <span className="font-bold">onde você está agora</span>. Mapeamos o ecossistema de saúde de {city} para oferecer orientação imediata em {state}.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
                <div className={`p-5 ${context.bgColor} border-l-4 ${context.borderColor.replace('200', '600')} rounded-xl`}>
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-1">Localização Imediata</h3>
                  <p className="text-xs font-semibold text-slate-700">Unidades de {spec} mapeadas no seu bairro.</p>
                </div>
                <div className="p-5 bg-slate-50 border-l-4 border-slate-600 rounded-xl">
                  <h3 className="text-xs font-bold uppercase tracking-wider mb-1">Busca Por Proximidade</h3>
                  <p className="text-xs font-semibold text-slate-700">Triagem para o atendimento mais perto daqui.</p>
                </div>
              </div>

              <p className="text-sm">
                Facilitar o acesso à saúde <span className="font-semibold">próximo de você</span> é nossa prioridade. Seja para atendimento ambulatorial em uma <span className="font-semibold">AMA</span>, suporte em saúde mental no <span className="font-semibold">CAPS</span>, ou rotina em um <span className="font-semibold">Posto de Saúde (UBS)</span> em {city}, nossa tecnologia de IA direciona seu caso com precisão.
              </p>

            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-32">
            <div className={`${context.bgColor} p-10 rounded-[3rem] border-2 ${context.borderColor} shadow-xl relative`}>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Unidade <span className={context.color}>Mais Próxima</span>
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-8">
                Localizamos unidades de <span className="font-bold text-slate-900">{spec} perto daqui</span> para agilizar seu socorro imediato em <span className="font-semibold">{city}</span>.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl text-slate-500" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sua Localização</h4>
                    <p className="text-sm font-semibold text-slate-900">{city}, {state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className={`w-12 h-12 ${context.bgColor} rounded-xl flex items-center justify-center text-xl ${context.color}`} aria-hidden="true">
                    {context.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Unidade Local</h4>
                    <p className={`text-sm font-semibold ${context.color}`}>{spec} Perto de Mim</p>
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
