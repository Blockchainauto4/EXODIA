import React from 'react';
import { UserLocation } from '../types';

const SEOContent: React.FC<{ location: UserLocation }> = ({ location }) => {
  const spec = location.specialty || 'Atendimento Médico';
  const city = location.city;
  
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              Encontre o melhor <span className={`${context.color} italic`}>{spec} perto de mim</span> em {city}
            </h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed text-base">
              Se você busca por <span className={`font-semibold ${context.color} underline decoration-slate-200`}>{spec} em {city}</span> ou na região de {location.state}, o IA HOSPITAL utiliza algoritmos de geolocalização para conectar sua necessidade ao suporte adequado. Nossa plataforma garante que você encontre orientação para {spec.toLowerCase()} exatamente onde está agora.
            </p>

            <div className={`mt-12 p-8 ${context.bgColor} rounded-[2.5rem] border ${context.borderColor} shadow-sm`}>
              <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter uppercase flex items-center gap-3">
                <span className={context.color}>{context.icon}</span>
                IA Hospital {city} {spec}
              </h3>
              
              <div className="prose prose-slate text-slate-700 text-sm leading-relaxed mb-8">
                <p>Necessita de <span className="font-bold text-slate-900">{spec.toLowerCase()} próximo de mim</span>? Nossa IA mapeia o ecossistema de saúde em {city} para oferecer a triagem mais precisa do Brasil.</p>
                <p className="mt-4">Acesse agora orientações educativas sobre prevenção e tratamentos específicos para sua necessidade local em {city}.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <p className={`text-xs font-black ${context.color} uppercase mb-2 tracking-widest`}>Disponibilidade Local</p>
                  <p className="text-xs font-bold text-slate-900">{spec} {city} atendimento agora</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <p className={`text-xs font-black ${context.color} uppercase mb-2 tracking-widest`}>Agendamento Próximo</p>
                  <p className="text-xs font-bold text-slate-900">Consultório em {city}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Termos de Busca Relevantes:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    `${spec} particular ${city}`,
                    `${spec} convênio perto de mim`,
                    `Melhor ${spec.toLowerCase()} em ${city}`
                  ].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 uppercase tracking-tight shadow-sm">{tag}</span>
                  ))}
                </div>
              </div>

              <p className="text-slate-500 text-xs leading-relaxed italic border-t border-slate-200 pt-6">
                A triagem do IA Hospital em {city} não substitui a consulta presencial. Em caso de emergência, ligue 192.
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3 relative z-10">
                <span className="text-2xl">{context.icon}</span>
                Especialistas em {city}
              </h3>
              <div className="space-y-4 relative z-10">
                {[
                  { t: `${spec} em ${city} perto de mim`, d: 'Mapeamento instantâneo.' },
                  { t: `Agendar ${spec.toLowerCase()} ${city}`, d: 'Conexão com profissionais locais.' }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500 transition-all">
                    <p className="font-bold text-sm mb-1">{item.t}</p>
                    <p className="text-xs text-slate-400 font-medium">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${isDerma ? 'bg-rose-700' : isNutricao ? 'bg-emerald-700' : 'bg-blue-700'} p-8 rounded-[2.5rem] text-white shadow-xl`}>
              <p className="text-xs font-black uppercase tracking-widest mb-4 opacity-90">Satisfação Regional</p>
              <p className="text-lg leading-relaxed font-bold italic mb-6">
                "Precisava de um {spec.toLowerCase()} em {city} perto de mim e a IA foi fundamental."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${city}/100/100`} alt={`Usuário em ${city}`} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">Paciente de {city}</p>
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