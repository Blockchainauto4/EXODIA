
import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city === 'sua região' ? 'sua cidade' : location.city;
  const state = location.state;
  
  const isNutricao = spec.toLowerCase().includes('nutri');
  const isDerma = spec.toLowerCase().includes('derma');
  const isCardio = spec.toLowerCase().includes('cardio');

  const context = {
    icon: isNutricao ? '🥗' : isDerma ? '🔬' : isCardio ? '🫀' : '🏥',
    color: isNutricao ? 'text-emerald-700' : isDerma ? 'text-rose-700' : 'text-blue-700',
    bgColor: isNutricao ? 'bg-emerald-50' : isDerma ? 'bg-rose-50' : 'bg-blue-50',
    borderColor: isNutricao ? 'border-emerald-200' : isDerma ? 'border-rose-200' : 'border-blue-200'
  };

  return (
    <section id="orientacao" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Bloco de SEO Local & Variações Semânticas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-tight uppercase tracking-tighter">
              {spec} <span className={`${context.color} italic underline decoration-slate-200`}>Perto de Mim</span> em {city}
            </h2>
            
            <div className="prose prose-slate text-slate-600 mb-8 leading-relaxed space-y-6">
              <p className="text-base font-medium">
                Precisa de um <span className="font-black text-slate-900">{spec.toLowerCase()} aqui perto agora</span>? O IA HOSPITAL é a solução definitiva para quem busca <span className="font-bold underline">atendimento médico imediato</span> na região de {city}. Nossa plataforma integra inteligência artificial para triagem de <span className="font-bold text-red-600">urgência e emergência 24h</span>, conectando você ao <span className="font-bold text-slate-900">hospital, clínica ou pronto atendimento mais próximo</span> da sua localização atual.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                <div className="p-5 bg-slate-50 border-l-4 border-blue-600 rounded-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Aberto Agora</h4>
                  <p className="text-xs font-bold text-slate-700 italic">Encontre médicos atendendo hoje no seu bairro.</p>
                </div>
                <div className="p-5 bg-slate-50 border-l-4 border-emerald-600 rounded-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Preço Acessível</h4>
                  <p className="text-xs font-bold text-slate-700 italic">Consultas particulares ou convênios em {city}.</p>
                </div>
              </div>

              <p className="text-sm">
                Se você está em busca de um <span className="font-bold">{spec.toLowerCase()} na sua cidade</span> para uma consulta eletiva ou precisa de um <span className="font-bold">especialista local hoje</span>, oferecemos um mapeamento completo. Atendemos desde <span className="italic">clínicas especializadas</span> a <span className="italic">centros médicos e ambulatórios</span> em todo o estado de {state}.
              </p>

              <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-700">{context.icon}</div>
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="text-blue-400">⚡</span> Triagem Rápida {city}
                </h3>
                <ul className="space-y-4">
                  {[
                    `Onde encontrar ${spec.toLowerCase()} próximo de mim?`,
                    `Qual o consultório mais rápido em ${city}?`,
                    `Tem atendimento médico aberto agora no meu bairro?`,
                    `Valor de consulta e convênios aceitos na região.`
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
                Unidade Médica <span className={context.color}>Local</span>
              </h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed mb-8">
                Nossa rede em <span className="font-black text-slate-900 underline decoration-blue-500">{city}</span> inclui <span className="font-bold">hospitais 24 horas</span>, <span className="font-bold">clínicas de plantão</span> e <span className="font-bold">profissionais de saúde</span> de alta confiança (EEAT).
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">📍</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localização Atual</p>
                    <p className="text-xs font-bold text-slate-900 uppercase">Detectado: {city} • {state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">✅</div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status de Atendimento</p>
                    <p className="text-xs font-bold text-emerald-600 uppercase">Médicos Disponíveis Imediato</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Especialidades Atendidas Hoje:</p>
                <div className="flex flex-wrap gap-2">
                  {['Clínico', 'Pediatra', 'Cardio', 'Geral', 'Plantão 24h'].map(s => (
                    <span key={s} className="px-3 py-1 bg-slate-100 text-[9px] font-black text-slate-600 rounded-lg uppercase tracking-widest">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
               <p className="text-sm font-black uppercase tracking-[0.2em] mb-4 opacity-80">Triagem Digital Segura</p>
               <h4 className="text-2xl font-bold leading-tight mb-6">
                 "A melhor forma de encontrar um <span className="italic underline underline-offset-4">especialista no meu bairro</span> com rapidez e confiança."
               </h4>
               <button className="px-8 py-4 bg-white text-blue-600 font-black uppercase tracking-widest text-xs rounded-xl shadow-xl group-hover:scale-105 transition-transform">
                 Agendar Agora
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
