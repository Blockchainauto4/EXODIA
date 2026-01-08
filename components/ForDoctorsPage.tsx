
import React from 'react';

interface ForDoctorsPageProps {
  onStartTrial: () => void;
  onRegisterUnit: () => void;
}

const ForDoctorsPage: React.FC<ForDoctorsPageProps> = ({ onStartTrial, onRegisterUnit }) => {
  const features = [
    { 
      icon: '🤖', 
      title: 'Triagem com IA em Tempo Real', 
      desc: 'Qualifique pacientes antes da consulta. Nossa IA realiza uma pré-triagem por vídeo, com transcrição e análise, otimizando seu tempo e focando nos casos relevantes.' 
    },
    { 
      icon: '🔥', 
      title: 'Visibilidade Local (SEO)', 
      desc: 'Seja encontrado. Nossa engine Flame Work posiciona sua unidade para pacientes que buscam ativamente por "atendimento médico perto de mim" na sua região.' 
    },
    { 
      icon: '🗂️', 
      title: 'Prontuário Inteligente (EHR)', 
      desc: 'Acesse um EHR completo e intuitivo, com sugestões de IA baseadas em CID-11 e no histórico consolidado do paciente para um diagnóstico mais rápido e preciso.' 
    },
    { 
      icon: '💊', 
      title: 'Prescrição Digital Segura', 
      desc: 'Emita receitas digitais com validade nacional, 100% integradas ao prontuário do paciente. Agilidade para você, segurança e conveniência para o paciente.' 
    },
     { 
      icon: '📅', 
      title: 'Gestão de Agendamentos', 
      desc: 'Uma agenda inteligente que otimiza seus horários e envia lembretes automáticos, reduzindo drasticamente as taxas de "no-show".' 
    },
     { 
      icon: '📹', 
      title: 'Módulo de Teleconsulta', 
      desc: 'Expanda seu alcance com um sistema de telemedicina seguro, criptografado e integrado, com sala de espera virtual e compartilhamento de tela.' 
    },
  ];

  const howItWorksSteps = [
    { number: 1, title: 'Credenciamento da Unidade', desc: 'Realize o cadastro rápido da sua clínica ou consultório em nossa plataforma segura.'},
    { number: 2, title: 'Ativação do SEO Local', desc: 'Nossa engine Flame Work começa a posicionar sua unidade para buscas locais relevantes.'},
    { number: 3, title: 'Recebimento de Pacientes', desc: 'Pacientes da sua região são direcionados para você através da nossa triagem inteligente.'},
    { number: 4, title: 'Gestão Simplificada', desc: 'Utilize nosso sistema para gerenciar consultas, prontuários e o relacionamento com o paciente.'},
  ];
  
  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-900 pt-40 pb-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-slate-900 opacity-60"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
            Eleve Sua Prática Médica.<br/> Conecte-se aos Pacientes <span className="text-blue-400 underline decoration-blue-500">da Sua Região</span>.
          </h1>
          <p className="text-slate-200 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            Descubra como nossa plataforma de IA e SEO local pode aumentar seu fluxo de pacientes, otimizar sua gestão e posicionar sua clínica como referência em tecnologia e cuidado.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRegisterUnit}
              className="px-10 py-5 bg-white text-slate-900 font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95"
            >
              Cadastrar Minha Unidade
            </button>
            <button
              onClick={onStartTrial}
              className="px-10 py-5 bg-blue-600/30 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg transition-all hover:bg-blue-600/50 border border-white/20"
            >
              Testar Triagem IA (15 Min)
            </button>
          </div>
        </div>
      </div>
      
      {/* How it Works Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-800">Como Funciona a Plataforma</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">Um fluxo de trabalho de 4 passos, projetado para integrar sua unidade à nossa rede e gerar resultados rapidamente.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map(step => (
              <div key={step.number} className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6">{step.number}</div>
                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-sm">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-800">Uma Arquitetura Completa Para Sua Prática</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Nossa plataforma não é apenas uma ferramenta, é um ecossistema integrado. Oferecemos todos os módulos necessários para digitalizar e otimizar sua operação.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(feature => (
              <div key={feature.title} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all group">
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="text-lg font-black text-slate-900 mt-4 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits / Why Join Section */}
      <div className="py-24 bg-blue-700">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Vantagens Diretas Para Sua Unidade</h2>
              <p className="mt-4 max-w-2xl mx-auto text-blue-100">Ao se juntar ao IA HOSPITAL, você não apenas adota tecnologia, você investe em crescimento e eficiência.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
                  <div className="bg-blue-800/50 p-8 rounded-3xl border border-white/10"><h3 className="text-xl font-bold">Aumento do Fluxo de Pacientes Qualificados</h3></div>
                  <div className="bg-blue-800/50 p-8 rounded-3xl border border-white/10"><h3 className="text-xl font-bold">Redução de Custos Operacionais</h3></div>
                  <div className="bg-blue-800/50 p-8 rounded-3xl border border-white/10"><h3 className="text-xl font-bold">Otimização do Tempo Clínico</h3></div>
                  <div className="bg-blue-800/50 p-8 rounded-3xl border border-white/10"><h3 className="text-xl font-bold">Fortalecimento da Marca e Reputação</h3></div>
              </div>
          </div>
      </div>

      {/* Final CTA */}
      <div className="bg-slate-900 py-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white leading-tight tracking-tighter">Pronto para Digitalizar e Expandir seu Atendimento?</h2>
          <p className="text-slate-300 mt-4 mb-10">Junte-se a uma rede de profissionais de vanguarda. O cadastro é rápido e nossa equipe está pronta para auxiliar na integração.</p>
          <button
            onClick={onRegisterUnit}
            className="px-12 py-6 bg-white text-slate-900 font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-blue-900/40 transition-all hover:scale-105 active:scale-95"
          >
            Cadastre Sua Unidade Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForDoctorsPage;
