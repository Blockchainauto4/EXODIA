
import React from 'react';

interface ForDoctorsPageProps {
  onStartTrial: () => void;
  onRegisterUnit: () => void;
}

const ForDoctorsPage: React.FC<ForDoctorsPageProps> = ({ onStartTrial, onRegisterUnit }) => {
  const features = [
    { icon: '🤖', title: 'Triagem com IA em Tempo Real', desc: 'Conduza pré-consultas por vídeo com transcrição e análise de IA para otimizar seu tempo.' },
    { icon: '🔥', title: 'Visibilidade Local (SEO)', desc: 'Nossa engine Flame Work posiciona sua unidade para pacientes que buscam "médico perto de mim".' },
    { icon: '🗂️', title: 'Prontuário Inteligente', desc: 'Acesse um EHR completo, com sugestões de IA baseadas em CID-11 e no histórico do paciente.' },
    { icon: '💊', title: 'Prescrição Digital Segura', desc: 'Emita receitas digitais com validade nacional, integradas ao prontuário e com um clique.' },
  ];
  
  return (
    <div className="animate-fade-in">
      <div className="relative bg-slate-900 pt-40 pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-slate-900 opacity-60"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
            Olá, Doutor(a).<br/>
            Gostaria de testar nosso sistema de triagem por <span className="text-blue-400 underline decoration-blue-500">15 minutos</span>?
          </h1>
          <p className="text-slate-200 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            Veja em tempo real como nossa Inteligência Artificial pode otimizar seu atendimento, aumentar sua visibilidade local e modernizar a gestão da sua clínica ou consultório.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartTrial}
              className="px-10 py-5 bg-white text-slate-900 font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95"
            >
              Iniciar Teste Gratuito
            </button>
            <button
              onClick={onRegisterUnit}
              className="px-10 py-5 bg-blue-600/30 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg transition-all hover:bg-blue-600/50 border border-white/20"
            >
              Cadastrar Minha Unidade
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-800">Uma Plataforma, Múltiplas Vantagens</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Desenvolvido para médicos que valorizam eficiência, tecnologia de ponta e visibilidade no mercado digital.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map(feature => (
              <div key={feature.title} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all group">
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-lg font-black text-slate-900 mt-4 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForDoctorsPage;
