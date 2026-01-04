
import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const isCuiaba = location.city.toLowerCase().includes('cuiabá');
  const isNutricao = spec.toLowerCase().includes('nutri') || spec.toLowerCase().includes('nutricionista');
  
  return (
    <section id="orientacao" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {isNutricao ? (
                <>Encontre o melhor <span className="text-blue-600 italic">Nutricionista perto de mim</span> em {location.city}</>
              ) : (
                <>Onde tem {spec.toLowerCase()} <span className="text-blue-600 italic">perto de mim</span> em {location.city}?</>
              )}
            </h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Se você busca por <span className="font-semibold text-blue-700 underline decoration-blue-100">{isNutricao ? 'Nutricionista em Cuiabá' : `${spec.toLowerCase()} próximo de mim`}</span> na região de {location.city} ({location.state}), o IA HOSPITAL é sua porta de entrada para a saúde inteligente. Nossa plataforma foi desenhada para quem precisa de <span className="font-bold">atendimento médico onde estou agora</span>, unindo tecnologia e autoridade clínica.
            </p>

            {/* Cluster Principal de Nutrição */}
            <div className="mt-12 p-8 bg-blue-50/40 rounded-[2.5rem] border border-blue-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase flex items-center gap-3">
                <span className="text-blue-600">🥗</span>
                IA Hospital Cuiabá Nutrição
              </h3>
              
              <div className="prose prose-slate text-slate-600 text-sm leading-relaxed mb-8">
                <p>
                  Procurando uma <span className="font-bold text-blue-800">clínica de nutrição perto de mim</span>? O IA HOSPITAL oferece suporte especializado para <span className="font-bold">nutricionista para emagrecimento em {location.city}</span> e acompanhamento em <span className="font-bold text-blue-800">nutrição clínica Cuiabá</span>. 
                </p>
                <p className="mt-4">
                  Seja para uma <span className="font-bold">consulta nutricionista perto de mim</span> ou para localizar um <span className="font-bold text-blue-800">consultório de nutrição em Cuiabá</span>, nossa inteligência artificial mapeia as melhores opções para sua saúde metabólica e longevidade.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Tecnologia Avançada</p>
                  <p className="text-xs font-bold text-slate-800">Bioimpedância {location.city} perto de mim</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">Modalidade de Acesso</p>
                  <p className="text-xs font-bold text-slate-800">Nutricionista particular e convênio {location.city}</p>
                </div>
              </div>

              {isCuiaba && (
                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Especialistas nos principais bairros:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Nutricionista Jardim Cuiabá', 
                      'Nutricionista Santa Rosa Cuiabá', 
                      'Nutricionista Bairro Goiabeiras', 
                      'Nutricionista Duque de Caxias'
                    ].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-tight shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-slate-500 text-[11px] leading-relaxed italic border-t border-blue-100 pt-6">
                Precisa <span className="font-bold text-slate-700">agendar nutricionista em Cuiabá</span>? Nossa triagem orienta você sobre <span className="font-bold text-slate-700">nutricionista hospitalar Cuiabá</span> e especialistas em <span className="font-bold text-slate-700">nutricionista Mato Grosso</span> com foco em resultados reais.
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl -z-0"></div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 relative z-10">
                <span className="text-blue-500 text-2xl">🏥</span>
                IA Hospital Atendimento Nutricional
              </h3>
              <div className="space-y-4 relative z-10">
                {[
                  { t: 'Nutricionista particular Cuiabá', d: 'Foco em atendimento personalizado e VIP.' },
                  { t: 'Nutricionista convênio Cuiabá', d: 'Orientação sobre redes credenciadas na capital.' },
                  { t: 'Melhor nutricionista Cuiabá', d: 'Rankeamento baseado em triagem e EEAT.' },
                  { t: 'Nutrição clínica Cuiabá', d: 'Suporte para patologias e dietoterapia.' }
                ].map((item, i) => (
                  <div key={i} className="group p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-blue-600/20 hover:border-blue-500 transition-all cursor-default">
                    <p className="font-bold text-sm mb-1 group-hover:text-blue-400">{item.t}</p>
                    <p className="text-[10px] text-slate-400 font-medium group-hover:text-white">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl">
              <p className="text-sm font-black uppercase tracking-widest mb-4 opacity-80">Feedback da Comunidade</p>
              <p className="text-lg leading-relaxed font-bold italic mb-6">
                "O IA HOSPITAL é incrível! Eu buscava um <span className="underline decoration-white/30">nutricionista Jardim Cuiabá</span> para emagrecimento e a triagem me deu a segurança necessária para agendar minha consulta particular."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden shadow-lg">
                  <img src="https://picsum.photos/seed/cuiaba-user/100/100" alt="Usuário em Cuiabá" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Maria S. Albuquerque</p>
                  <p className="text-[10px] font-bold text-blue-200">Cuiabá, MT</p>
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
