
import React from 'react';

const AIToolsPage: React.FC = () => {
  const faqs = [
    {
      question: "Qual a melhor ferramenta de IA para analisar exames de imagem?",
      answer: "Ferramentas baseadas em 'Computer Vision', como as que analisam raios-X e tomografias, estão entre as mais avançadas. Elas não substituem o radiologista, mas atuam como um poderoso suporte à decisão, identificando padrões que podem passar despercebidos."
    },
    {
      question: "Como a IA pode ajudar na gestão de uma clínica ou hospital?",
      answer: "A IA otimiza a gestão através de sistemas de Prontuário Eletrônico Inteligente (EHR), que organizam dados de pacientes, e de ferramentas de agendamento que preveem 'no-shows' e otimizam a alocação de recursos, reduzindo custos e melhorando o fluxo de atendimento."
    },
    {
      question: "Usar IA para triagem de pacientes é seguro?",
      answer: "Sim, quando implementado corretamente. Sistemas como o do IA HOSPITAL usam IA para uma pré-triagem baseada em protocolos clínicos, direcionando o paciente ao nível de cuidado correto (UPA, UBS, especialista). A decisão final é sempre de um profissional de saúde, mas a IA agiliza o processo com segurança."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const tools = [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>, title: 'Diagnóstico e Análise de Imagens', desc: 'IAs que leem raios-X, tomografias e ressonâncias, auxiliando na detecção precoce de doenças.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002-2h2a2 2 0 002 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>, title: 'Gestão de Prontuários e Operações', desc: 'Sistemas que organizam dados de pacientes, preveem demandas e otimizam o fluxo de trabalho hospitalar.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.757 16.243a6 6 0 108.486-8.486 6 6 0 00-8.486 8.486z" /></svg>, title: 'Triagem Inteligente e Atendimento', desc: 'Chatbots e assistentes virtuais que realizam a primeira triagem e guiam os pacientes ao cuidado certo.' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-6 0H3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6" /></svg>, title: 'Suporte à Decisão Clínica', desc: 'Plataformas que analisam o histórico do paciente e a literatura médica para sugerir opções de tratamento.' },
  ];

  return (
    <div className="animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative bg-slate-900 pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <p className="text-teal-400 text-sm font-bold uppercase tracking-[0.2em]">Conteúdo Estratégico</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mt-2 tracking-tighter">Guia Definitivo de Ferramentas de IA para Saúde</h1>
          <p className="text-slate-200 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
            Explore como a Inteligência Artificial está revolucionando o diagnóstico, a gestão hospitalar e o atendimento ao paciente. Um guia para médicos, gestores e profissionais que buscam inovação.
          </p>
        </div>
      </div>
      
      <div className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 prose prose-slate max-w-none text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-800">Categorias de Ferramentas de IA na Medicina</h2>
          <p>A Inteligência Artificial na saúde não é uma única tecnologia, mas um ecossistema de ferramentas especializadas. Cada uma resolve um desafio específico, desde a análise de um exame até a otimização da agenda de uma clínica inteira. Compreender essas categorias é o primeiro passo para uma implementação bem-sucedida.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            {tools.map(item => (
              <div key={item.title} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-teal-300 transition-colors">
                <div className="text-teal-600">{item.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-800">Como o IA HOSPITAL Integra a Tecnologia</h2>
          <p>Muitas dessas ferramentas operam de forma isolada. O diferencial do IA HOSPITAL é nossa <strong>Arquitetura de Unidade</strong>, que integra os módulos essenciais em uma única plataforma coesa. Ao se credenciar, um profissional ou clínica ganha acesso a um sistema que já inclui:</p>
          <ul>
            <li><strong>Módulo de Triagem IA Local:</strong> Para direcionamento de pacientes na sua região.</li>
            <li><strong>Dashboard Flame Work SEO:</strong> Para garantir que pacientes "perto de mim" encontrem sua unidade.</li>
            <li><strong>Prontuário Inteligente e Prescrição Digital:</strong> Para uma gestão clínica eficiente e segura.</li>
          </ul>
          <p>Nossa abordagem transforma a complexidade de múltiplas ferramentas em uma solução única, pronta para operar e otimizada para o mercado de saúde brasileiro.</p>

          <div className="bg-white my-16 p-10 rounded-[2.5rem] border border-slate-200 shadow-xl">
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-800 mt-0">Perguntas Frequentes (Busca por Voz)</h2>
            <div className="space-y-6 mt-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;
