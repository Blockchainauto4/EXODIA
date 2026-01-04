
import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city;
  
  // Lógica de Contexto por Especialidade
  const isNutricao = spec.toLowerCase().includes('nutri');
  const isDerma = spec.toLowerCase().includes('derma');
  const isCardio = spec.toLowerCase().includes('cardio');

  // Definição de Ícones e Cores de Contexto
  const context = {
    icon: isNutricao ? '🥗' : isDerma ? '🔬' : isCardio ? '🫀' : '🏥',
    color: isNutricao ? 'text-emerald-600' : isDerma ? 'text-rose-600' : 'text-blue-600',
    bgColor: isNutricao ? 'bg-emerald-50/40' : isDerma ? 'bg-rose-50/40' : 'bg-blue-50/40',
    borderColor: isNutricao ? 'border-emerald-100' : isDerma ? 'border-rose-100' : 'border-blue-100'
  };

  return (
    <section id="orientacao" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              Encontre o melhor <span className={`${context.color} italic`}>{spec} perto de mim</span> em {city}
            </h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Se você busca por <span className={`font-semibold ${context.color} underline decoration-slate-100`}>{spec} em {city}</span> ou na região de {location.state}, o IA HOSPITAL utiliza algoritmos de geolocalização para conectar sua necessidade ao suporte adequado. Nossa plataforma foca em <span className="font-bold">autoridade médica e confiança (EEAT)</span>, garantindo que você encontre orientação para {spec.toLowerCase()} exatamente onde está agora.
            </p>

            {/* Cluster Dinâmico Flame Work */}
            <div className={`mt-12 p-8 ${context.bgColor} rounded-[2.5rem] border ${context.borderColor} shadow-sm`}>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase flex items-center gap-3">
                <span className={context.color}>{context.icon}</span>
                IA Hospital {city} {spec}
              </h3>
              
              <div className="prose prose-slate text-slate-600 text-sm leading-relaxed mb-8">
                {isDerma ? (
                  <>
                    <p>Procurando um <span className="font-bold text-rose-800">dermatologista perto de mim</span>? O IA HOSPITAL oferece triagem para cuidados com a pele, detecção precoce de lesões e suporte em <span className="font-bold">dermatologia clínica em {city}</span>.</p>
                    <p className="mt-4">Embora a saúde da pele possa ter influências metabólicas, focamos nossa triagem na patologia cutânea específica de {city}, conectando você a clínicas de referência em estética e saúde da pele.</p>
                  </>
                ) : isNutricao ? (
                  <>
                    <p>Buscando uma <span className="font-bold text-emerald-800">clínica de nutrição em {city}</span>? Auxiliamos na localização de especialistas para emagrecimento, hipertrofia e acompanhamento em <span className="font-bold">nutrição funcional {city}</span>.</p>
                    <p className="mt-4">Sua dieta reflete em todo o corpo, inclusive na pele, mas nossa triagem de nutrição em {city} é focada no seu equilíbrio nutricional e longevidade.</p>
                  </>
                ) : (
                  <>
                    <p>Necessita de <span className="font-bold text-blue-800">{spec.toLowerCase()} próximo de mim</span>? Nossa IA mapeia o ecossistema de saúde em {city} para oferecer a triagem mais precisa do Brasil.</p>
                    <p className="mt-4">Acesse agora orientações educativas sobre prevenção e tratamentos específicos para sua necessidade local.</p>
                  </>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <p className={`text-[10px] font-black ${context.color} uppercase mb-2 tracking-widest`}>Disponibilidade Local</p>
                  <p className="text-xs font-bold text-slate-800">{spec} {city} atendimento agora</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <p className={`text-[10px] font-black ${context.color} uppercase mb-2 tracking-widest`}>Agendamento Próximo</p>
                  <p className="text-xs font-bold text-slate-800">Consultório de {spec.toLowerCase()} em {city}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Termos de Busca Relevantes:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    `${spec} particular ${city}`,
                    `${spec} convênio perto de mim`,
                    `Melhor ${spec.toLowerCase()} em ${city}`,
                    `Clínica de ${spec.toLowerCase()} ${city} centro`
                  ].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-tight shadow-sm">{tag}</span>
                  ))}
                </div>
              </div>

              <p className="text-slate-500 text-[11px] leading-relaxed italic border-t border-slate-100 pt-6">
                Informação educativa: A triagem do IA Hospital em {city} não substitui a consulta presencial. Em caso de sintomas graves, procure uma emergência em {location.state} imediatamente.
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 ${isDerma ? 'bg-rose-600/10' : 'bg-blue-600/10'} blur-3xl -z-0`}></div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 relative z-10">
                <span className="text-2xl">{context.icon}</span>
                Especialistas em {city}
              </h3>
              <div className="space-y-4 relative z-10">
                {[
                  { t: `${spec} em ${city} perto de mim`, d: 'Mapeamento instantâneo por geolocalização.' },
                  { t: `Agendar ${spec.toLowerCase()} ${city}`, d: 'Conexão com profissionais parceiros da região.' },
                  { t: `Valor consulta ${spec.toLowerCase()} ${city}`, d: 'Orientações sobre custos e modalidades de atendimento.' }
                ].map((item, i) => (
                  <div key={i} className={`group p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500 transition-all cursor-default`}>
                    <p className="font-bold text-sm mb-1 group-hover:text-blue-400">{item.t}</p>
                    <p className="text-[10px] text-slate-400 font-medium group-hover:text-white">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${isDerma ? 'bg-rose-600' : isNutricao ? 'bg-emerald-600' : 'bg-blue-600'} p-8 rounded-[2.5rem] text-white shadow-xl`}>
              <p className="text-sm font-black uppercase tracking-widest mb-4 opacity-80">Satisfação Regional</p>
              <p className="text-lg leading-relaxed font-bold italic mb-6">
                "Precisava de um <span className="underline decoration-white/30">{spec.toLowerCase()} em {city} perto de mim</span> e a orientação da IA foi fundamental para eu saber qual especialista procurar no bairro."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden shadow-lg">
                  <img src={`https://picsum.photos/seed/${city}/100/100`} alt={`Usuário em ${city}`} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Paciente de {city}</p>
                  <p className="text-[10px] font-bold opacity-70">{city}, {location.state}</p>
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
