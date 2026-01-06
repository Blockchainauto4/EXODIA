
import React, { useRef, useEffect, useState } from 'react';
import { UserLocation, JobOpportunity } from '../types';
import { initCheckoutPro } from '../services/paymentService';

const MOCK_JOBS: JobOpportunity[] = [
  {
    id: 'job-go-001',
    title: 'Ginecologia e Obstetrícia - Amparo/SP',
    description: '🤰 Oportunidade para Ginecologia e Obstetrícia em Amparo. Atendimento em Maternidade e Ambulatório. Rede de alta complexidade com suporte completo.',
    datePosted: '2025-01-26',
    validThrough: '2025-06-30',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Hospital Regional Amparo',
    city: 'Amparo',
    state: 'SP',
    specialty: 'Ginecologia',
    salary: 'Tabela Hospitalar',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-ped-001',
    title: 'Pediatria (Sala de Parto) - Amparo/SP',
    description: '👶 Pediatra para acompanhamento de Sala de Parto e Recepção de Recém-nascido. Unidade em Amparo/SP com infraestrutura moderna.',
    datePosted: '2025-01-26',
    validThrough: '2025-05-15',
    employmentType: 'FULL_TIME',
    hiringOrganization: 'Maternidade Amparo',
    city: 'Amparo',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'A combinar',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-eped-001',
    title: 'Emergência Pediatria (RQE) - Sorocaba/SP',
    description: '🚨 Plantões de Emergência Pediátrica em Sorocaba/SP. Obrigatório RQE na especialidade. Unidade de pronto atendimento 24h.',
    datePosted: '2025-01-26',
    validThrough: '2025-04-01',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Pronto Socorro Infantil Sorocaba',
    city: 'Sorocaba',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'Valor por Plantão',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-uti-001',
    title: 'UTI Neonatal - Taipas/SP',
    description: '🩺 Médico Intensivista para UTI Neonatal na região de Taipas (São Paulo). Equipe multidisciplinar e suporte tecnológico avançado.',
    datePosted: '2025-01-26',
    validThrough: '2025-07-20',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Hospital Geral Taipas',
    city: 'São Paulo',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'Valor Hora UTI',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-orto-jundiai',
    title: 'Ortopedia Especializada - Jundiaí/SP',
    description: '🦴 Vaga para Ortopedia em Jundiaí. Atendimento ambulatorial e retaguarda hospitalar. Oportunidade fixa para especialistas.',
    datePosted: '2025-01-26',
    validThrough: '2025-08-15',
    employmentType: 'FULL_TIME',
    hiringOrganization: 'Hospital Jundiaí',
    city: 'Jundiaí',
    state: 'SP',
    specialty: 'Ortopedia',
    salary: 'Rendimento Expressivo',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-vasc-001',
    title: 'Vascular - Jundiaí/SP e Cacoal/RO',
    description: '🩸 Oportunidade para Angiologia e Cirurgia Vascular em Jundiaí/SP e Cacoal/RO. Vagas para ambulatório e procedimentos cirúrgicos.',
    datePosted: '2025-01-26',
    validThrough: '2025-09-01',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Rede Vascular Integrada',
    city: 'Jundiaí',
    state: 'SP',
    specialty: 'Clínica Geral',
    salary: 'Comissão por Procedimento',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-card-001',
    title: 'Cardiologia - Jundiaí/SP',
    description: '🫀 Cardiologista para corpo clínico em Jundiaí. Exames de imagem (Eco/Holter) e consultas ambulatoriais. Vaga estável.',
    datePosted: '2025-01-26',
    validThrough: '2025-10-10',
    employmentType: 'PART_TIME',
    hiringOrganization: 'Centro Cardiológico Jundiaí',
    city: 'Jundiaí',
    state: 'SP',
    specialty: 'Cardiologia',
    salary: 'Valor por Consulta/Exame',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-neuro-001',
    title: 'Neurologia e Neuropediatria - Jundiaí/SP',
    description: '🧠 Atendimento especializado em Neurologia Clínica e Neuropediatria em Jundiaí. Foco em neurodesenvolvimento e distúrbios cognitivos.',
    datePosted: '2025-01-26',
    validThrough: '2025-12-31',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'NeuroCenter Jundiaí',
    city: 'Jundiaí',
    state: 'SP',
    specialty: 'Saúde Mental',
    salary: 'Remuneração Diferenciada',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-psiq-001',
    title: 'Psiquiatria - Jundiaí/SP',
    description: '🧠 Médico Psiquiatra para acompanhamento ambulatorial e suporte em saúde mental na região de Jundiaí. Agenda flexível.',
    datePosted: '2025-01-26',
    validThrough: '2025-11-05',
    employmentType: 'PART_TIME',
    hiringOrganization: 'Saúde Mental Regional',
    city: 'Jundiaí',
    state: 'SP',
    specialty: 'Psiquiatria',
    salary: 'Valor por Atendimento',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-orto-fortaleza',
    title: 'Ortopedia - Fortaleza/CE',
    description: '🦴 Oportunidade na Ortopedia em Fortaleza. Atendimento ambulatorial e plantões em hospital de grande porte.',
    datePosted: '2025-01-26',
    validThrough: '2025-06-15',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Hospital Fortaleza Unidade I',
    city: 'Fortaleza',
    state: 'CE',
    specialty: 'Ortopedia',
    salary: 'A consultar',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-clin-fortaleza',
    title: 'Clínica Médica - Fortaleza/CE',
    description: '🏛️ Médico Clínico para atendimento em unidade hospitalar de Fortaleza. Carga horária flexível e excelente ambiente de trabalho.',
    datePosted: '2025-01-26',
    validThrough: '2025-09-30',
    employmentType: 'FULL_TIME',
    hiringOrganization: 'Rede Saúde Fortaleza',
    city: 'Fortaleza',
    state: 'CE',
    specialty: 'Clínica Geral',
    salary: 'Salário Fixo + Benefícios',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  },
  {
    id: 'job-gastro-001',
    title: 'Gastroenterologia - Valinhos/SP',
    description: '🧪 Médico Gastroenterologista para Valinhos e Jundiaí. Foco em exames endoscópicos e consultas. Unidade com alto fluxo.',
    datePosted: '2025-01-26',
    validThrough: '2025-08-01',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Clínica Digestiva Valinhos',
    city: 'Valinhos',
    state: 'SP',
    specialty: 'Clínica Geral',
    salary: 'Fixo + Comissão',
    contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1'
  }
];

interface JobsBoardProps {
  location: UserLocation;
}

const JobsBoard: React.FC<JobsBoardProps> = ({ location }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const normalize = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const filteredJobs = MOCK_JOBS.filter(job => {
    const isBrazilScope = location.state === 'Brasil';
    
    // Se estiver no escopo Brasil, mostra tudo. Senão filtra por estado.
    const stateMatch = isBrazilScope || job.state.toLowerCase() === location.state.toLowerCase();
    
    // Filtro de cidade opcional - se o usuário estiver em uma cidade específica, prioriza ela
    // mas não esconde outras do mesmo estado se a busca for estadual.
    const cityMatch = location.city === 'sua região' || 
                      normalize(job.city).includes(normalize(location.city)) ||
                      normalize(location.city).includes(normalize(job.city));
                      
    const currentSpec = normalize(location.specialty || '');
    const jobSpec = normalize(job.specialty);
    const jobTitle = normalize(job.title);
    const jobDesc = normalize(job.description);
    
    const specialtyMatch = !location.specialty || 
                           jobSpec.includes(currentSpec) || 
                           jobTitle.includes(currentSpec) ||
                           jobDesc.includes(currentSpec);

    return stateMatch && specialtyMatch;
  }).slice(0, 15);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
      if (direction === 'right') {
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 50;
        scrollContainerRef.current.scrollTo({ left: isAtEnd ? 0 : scrollLeft + clientWidth, behavior: 'smooth' });
      } else {
        const isAtStart = scrollLeft <= 0;
        scrollContainerRef.current.scrollTo({ left: isAtStart ? scrollWidth : scrollLeft - clientWidth, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isPaused || filteredJobs.length <= 1) return;
    const interval = setInterval(() => scroll('right'), 6000);
    return () => clearInterval(interval);
  }, [isPaused, filteredJobs.length]);

  const handlePremiumPurchase = async () => {
    setPaymentStatus('Aguarde...');
    try {
      await initCheckoutPro({
        title: `Anúncio Vaga Premium em ${location.city}`,
        price: 99.00,
        quantity: 1
      });
      setTimeout(() => setPaymentStatus(null), 2000);
    } catch (e) {
      setPaymentStatus('Erro');
    }
  };

  if (filteredJobs.length === 0) return null;

  return (
    <section className="py-20 bg-slate-900 overflow-hidden" id="vagas">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white animate-pulse shadow-lg shadow-blue-900/40">
              <span className="text-2xl" aria-hidden="true">👨‍⚕️</span>
            </div>
            <div>
              <h2 className="text-white font-black uppercase tracking-tighter text-3xl leading-none">Vagas Médicas em Destaque</h2>
              <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Oportunidades em {location.state === 'Brasil' ? 'Todo o Brasil' : location.state}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <button 
              onClick={handlePremiumPurchase}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border border-white/10"
            >
              <span className="text-lg">💎</span> {paymentStatus || 'Anunciar Vaga Regional'}
            </button>

            <div className="flex items-center gap-2">
              <button onClick={() => scroll('left')} aria-label="Anterior" className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={() => scroll('right')} aria-label="Próximo" className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 -mx-4 px-4 mask-fade-edges"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredJobs.map(job => (
            <div key={job.id} className="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-[400px] relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-slate-900 animate-fade-in flex flex-col h-[540px] overflow-hidden group">
              <div className="absolute top-10 right-[-30px] opacity-[0.03] rotate-45 pointer-events-none select-none">
                <span className="text-8xl font-black uppercase">DOCTOR</span>
              </div>
              
              <div className="mb-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 text-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">{job.city}/{job.state}</span>
                  {job.employmentType === 'TEMPORARY' && <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase shadow-lg shadow-red-500/20">URGENTE</span>}
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight h-14 overflow-hidden">{job.title}</h3>
                <p className="text-[10px] font-bold text-blue-700 uppercase mt-1 tracking-widest truncate">{job.hiringOrganization}</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow relative z-10 overflow-hidden">
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">💰</span>
                  <div>
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Remuneração</h4>
                    <p className="text-sm font-black text-emerald-700">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">ℹ️</span>
                  <div className="text-[11px] text-slate-700 leading-relaxed font-medium line-clamp-6 italic">"{job.description}"</div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-auto relative z-10">
                <a 
                  href={job.contactUrl ? job.contactUrl : `https://wa.me/${job.contactWhatsapp}?text=Olá,%20vi%20a%20vaga%20de%20${job.title}%20em%20${job.city}%20no%20IA%20HOSPITAL.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all text-xs shadow-lg shadow-emerald-500/20"
                >
                  Candidatar-se Agora
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .mask-fade-edges { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
      `}</style>
    </section>
  );
};

export default JobsBoard;
