
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

  return (
    <div className="animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative bg-slate-900 pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <p className="text-blue-400 text-sm font-black uppercase tracking-[0.2em]">Conteúdo Estratégico</p>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mt-2 tracking-tighter">Guia Definitivo de Ferramentas de IA para Saúde</h1>
          <p className="text-slate-200 max-w-3xl mx-auto mt-6 text-lg leading-relaxed">
            Explore como a Inteligência Artificial está revolucionando o diagnóstico, a gestão hospitalar e o atendimento ao paciente. Um guia para médicos, gestores e profissionais que buscam inovação.
          </p>
        </div>
      </div>
      
      <div className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 prose prose-slate max-w-none text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800">Categorias de Ferramentas de IA na Medicina</h2>
          <p>A Inteligência Artificial na saúde não é uma única tecnologia, mas um ecossistema de ferramentas especializadas. Cada uma resolve um desafio específico, desde a análise de um exame até a otimização da agenda de uma clínica inteira. Compreender essas categorias é o primeiro passo para uma implementação bem-sucedida.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            {[
              { icon: '🩺', title: 'Diagnóstico e Análise de Imagens', desc: 'IAs que leem raios-X, tomografias e ressonâncias, auxiliando na detecção precoce de doenças.' },
              { icon: '🗂️', title: 'Gestão de Prontuários e Operações', desc: 'Sistemas que organizam dados de pacientes, preveem demandas e otimizam o fluxo de trabalho hospitalar.' },
              { icon: '🤖', title: 'Triagem Inteligente e Atendimento', desc: 'Chatbots e assistentes virtuais que realizam a primeira triagem e guiam os pacientes ao cuidado certo.' },
              { icon: '💊', title: 'Suporte à Decisão Clínica', desc: 'Plataformas que analisam o histórico do paciente e a literatura médica para sugerir opções de tratamento.' },
            ].map(item => (
              <div key={item.title} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="text-lg font-black text-slate-900 mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800">Como o IA HOSPITAL Integra a Tecnologia</h2>
          <p>Muitas dessas ferramentas operam de forma isolada. O diferencial do IA HOSPITAL é nossa <strong>Arquitetura de Unidade</strong>, que integra os módulos essenciais em uma única plataforma coesa. Ao se credenciar, um profissional ou clínica ganha acesso a um sistema que já inclui:</p>
          <ul>
            <li><strong>Módulo de Triagem IA Local:</strong> Para direcionamento de pacientes na sua região.</li>
            <li><strong>Dashboard Flame Work SEO:</strong> Para garantir que pacientes "perto de mim" encontrem sua unidade.</li>
            <li><strong>Prontuário Inteligente e Prescrição Digital:</strong> Para uma gestão clínica eficiente e segura.</li>
          </ul>
          <p>Nossa abordagem transforma a complexidade de múltiplas ferramentas em uma solução única, pronta para operar e otimizada para o mercado de saúde brasileiro.</p>

          <div className="bg-white my-16 p-10 rounded-[2.5rem] border border-slate-200 shadow-xl">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-800 mt-0">Perguntas Frequentes (Busca por Voz)</h2>
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
