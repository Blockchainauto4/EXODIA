
import React from 'react';

interface ForDoctorsPageProps {
  onStartTrial: () => void;
  onRegisterUnit: () => void;
}

const ForDoctorsPage: React.FC<ForDoctorsPageProps> = ({ onStartTrial, onRegisterUnit }) => {
  const features = [
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.757 16.243a6 6 0 108.486-8.486 6 6 0 00-8.486 8.486z" /></svg>, 
      title: 'Triagem com IA em Tempo Real', 
      desc: 'Qualifique pacientes antes da consulta. Nossa IA realiza uma pré-triagem por vídeo, com transcrição e análise, otimizando seu tempo e focando nos casos relevantes.' 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A5 5 0 0014.142 11.858" /></svg>, 
      title: 'Visibilidade Local (SEO)', 
      desc: 'Seja encontrado. Nossa engine Flame Work posiciona sua unidade para pacientes que buscam ativamente por "atendimento médico perto de mim" na sua região.' 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002-2h2a2 2 0 002 2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>, 
      title: 'Prontuário Inteligente (EHR)', 
      desc: 'Acesse um EHR completo e intuitivo, com sugestões de IA baseadas em CID-11 e no histórico consolidado do paciente para um diagnóstico mais rápido e preciso.' 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-6 0H3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6" /></svg>, 
      title: 'Prescrição Digital Segura', 
      desc: 'Emita receitas digitais com validade nacional, 100% integradas ao prontuário do paciente. Agilidade para você, segurança e conveniência para o paciente.' 
    },
     { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, 
      title: 'Gestão de Agendamentos', 
      desc: 'Uma agenda inteligente que otimiza seus horários e envia lembretes automáticos, reduzindo drasticamente as taxas de "no-show".' 
    },
     { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>, 
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
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900 to-slate-900 opacity-60"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter">
            Eleve Sua Prática Médica.<br/> Conecte-se aos Pacientes <span className="text-teal-400 underline decoration-teal-500">da Sua Região</span>.
          </h1>
          <p className="text-slate-200 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            Descubra como nossa plataforma de IA e SEO local pode aumentar seu fluxo de pacientes, otimizar sua gestão e posicionar sua clínica como referência em tecnologia e cuidado.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRegisterUnit}
              className="px-10 py-5 bg-white text-slate-900 font-bold uppercase tracking-widest rounded-2xl shadow-2xl shadow-teal-900/40 transition-all hover:scale-105 active:scale-95"
            >
              Cadastrar Minha Unidade
            </button>
            <button
              onClick={onStartTrial}
              className="px-10 py-5 bg-teal-600/30 text-white font-bold uppercase tracking-widest rounded-2xl shadow-lg transition-all hover:bg-teal-600/50 border border-white/20"
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
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-slate-800">Como Funciona a Plataforma</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">Um fluxo de trabalho de 4 passos, projetado para integrar sua unidade à nossa rede e gerar resultados rapidamente.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map(step => (
              <div key={step.number} className="bg-white p-8 rounded-3xl border border-slate-200 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">{step.number}</div>
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
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-slate-800">Uma Plataforma Completa Para Sua Prática</h2>
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              Nossa plataforma não é apenas uma ferramenta, é um ecossistema integrado. Oferecemos todos os módulos necessários para digitalizar e otimizar sua operação.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(feature => (
              <div key={feature.title} className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all group">
                <div className="text-teal-600">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2 group-hover:text-teal-600 transition-colors">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits / Why Join Section */}
      <div className="py-24 bg-teal-700">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <h2 className="text-3xl font-bold uppercase tracking-tighter">Vantagens Diretas Para Sua Unidade</h2>
              <p className="mt-4 max-w-2xl mx-auto text-teal-100">Ao se juntar ao IA HOSPITAL, você não apenas adota tecnologia, você investe em crescimento e eficiência.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
                  <div className="bg-teal-800/50 p-8 rounded-3xl border border-white/10"><h3 className="text-xl font-bold">Aumento do Fluxo de Pacientes Qualificados</h3></div>
                  <div className="bg-teal-800/50 p-8 rounded-3xl border border-white/10"><h3 className="text-xl font-bold">Redução de Custos Operacionais</h3></div>
                  <div className="bg-teal-800/50 p-8 rounded-3xl border border-white/10"><h3 className="text-xl font-bold">Otimização do Tempo Clínico</h3></div>
                  <div className="bg-teal-800/50 p-8 rounded-3xl border border-white/10"><h3 className="text-xl font-bold">Fortalecimento da Marca e Reputação</h3></div>
              </div>
          </div>
      </div>

      {/* Final CTA */}
      <div className="bg-slate-900 py-24 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white leading-tight tracking-tighter">Pronto para Digitalizar e Expandir seu Atendimento?</h2>
          <p className="text-slate-300 mt-4 mb-10">Junte-se a uma rede de profissionais de vanguarda. O cadastro é rápido e nossa equipe está pronta para auxiliar na integração.</p>
          <button
            onClick={onRegisterUnit}
            className="px-12 py-6 bg-white text-slate-900 font-bold uppercase tracking-widest rounded-2xl shadow-2xl shadow-teal-900/40 transition-all hover:scale-105 active:scale-95"
          >
            Cadastre Sua Unidade Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForDoctorsPage;
