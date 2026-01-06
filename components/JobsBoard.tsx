
import React, { useRef, useEffect, useState } from 'react';
import { UserLocation, JobOpportunity } from '../types';
import { initCheckoutPro } from '../services/paymentService';

interface JobsBoardProps {
  location: UserLocation;
}

const MOCK_JOBS: JobOpportunity[] = [
  {
    id: 'job-030',
    title: 'Ginecologista - UBS Ivaí',
    description: '📍 Ivaí/PR. Atuação em Unidades Básicas de Saúde (UBS). Demanda ambulatorial, média de 3 pacientes/hora. Carga horária de 20 horas semanais via PJ. Empresa: Medprime.',
    datePosted: '2025-01-16',
    validThrough: '2025-02-28',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Medprime',
    city: 'Ivaí',
    state: 'PR',
    specialty: 'Ginecologia',
    salary: 'R$ 18.000,00 / mês (PJ)',
    contactWhatsapp: '554191462236',
    dates: ['20h Semanais']
  },
  {
    id: 'job-027',
    title: 'Pediatra - Atendimento Municipal',
    description: '📍 José Bonifácio/SP. Atendimento em Pediatria. Aceita residentes. Pagamento À VISTA. Falar com Ellen.',
    datePosted: '2025-01-15',
    validThrough: '2025-01-09',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Prefeitura de José Bonifácio',
    city: 'José Bonifácio',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'À combinar (Vista)',
    contactWhatsapp: '5541984950530',
    dates: ['07/01', '09/01']
  },
  {
    id: 'job-028',
    title: 'Corpo Clínico Multi - Segmedic RJ',
    description: '🚀 Expansão Segmedic no Rio de Janeiro. Vagas para Cardiologia, Ortopedia, Ginecologia e outras 20 especialidades. Atendimento ambulatorial e exames.',
    datePosted: '2025-01-15',
    validThrough: '2025-12-31',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Segmedic Saúde',
    city: 'Nova Iguaçu',
    state: 'RJ',
    specialty: 'Multidisciplinar',
    salary: 'PJ / A combinar',
    contactUrl: 'mailto:relacionamentomedico@segmedic.com.br',
    dates: ['Fluxo Contínuo']
  },
  {
    id: 'job-029',
    title: 'Médicos Diversos - Segmedic RJ',
    description: '📍 Rio de Janeiro/RJ. Atuação em rede referência. Especialidades: Psiquiatria (RQE), Nutrologia (RQE), Dermatologia e mais. Vagas PJ.',
    datePosted: '2025-01-15',
    validThrough: '2025-12-31',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Segmedic Saúde',
    city: 'Rio de Janeiro',
    state: 'RJ',
    specialty: 'Multidisciplinar',
    salary: 'A combinar',
    contactUrl: 'https://segmedic.com.br/',
    dates: ['Fluxo Contínuo']
  },
  {
    id: 'job-026',
    title: 'Ortopedista - Hospital de Clínicas',
    description: '📍 Campo Limpo Paulista/SP. Atendimento Ortopédico. Requisitos: Residência, Pós, RQE ou 1 ano exp. Sem centro cirúrgico no local. Inclui Refeitório e Estacionamento.',
    datePosted: '2025-01-15',
    validThrough: '2025-01-22',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital de Clínicas de Campo Limpo Paulista',
    city: 'Campo Limpo Paulista',
    state: 'SP',
    specialty: 'Ortopedia',
    salary: 'R$ 1.350,00 / 9h',
    contactWhatsapp: '5511993727491',
    dates: ['19/01', '20/01', '21/01', '22/01']
  },
  {
    id: 'job-023',
    title: 'Pediatra - Atendimento UBS',
    description: '📍 Barra do Turvo/SP. Atendimento em Unidade Básica de Saúde. 8h diárias, 1x ao mês. Início em Janeiro.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-31',
    employmentType: 'PART_TIME',
    hiringOrganization: 'UBS Barra do Turvo',
    city: 'Barra do Turvo',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'R$ 300,00 / hora',
    contactWhatsapp: '5544998711112',
    dates: ['Janeiro/2025']
  }
];

const JobsBoard: React.FC<JobsBoardProps> = ({ location }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const normalize = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const filteredJobs = MOCK_JOBS.filter(job => {
    const cityMatch = location.city === 'sua região' || normalize(job.city) === normalize(location.city);
    const stateMatch = location.state === 'Brasil' || job.state.toLowerCase() === location.state.toLowerCase();
    return cityMatch && stateMatch;
  });

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
    setPaymentStatus('Iniciando ambiente seguro...');
    try {
      await initCheckoutPro({
        title: `Assento Premium - IA Hospital - ${location.city}`,
        price: 99.00,
        quantity: 1
      });
      setTimeout(() => {
        setPaymentStatus(null);
        alert('Redirecionando para o Mercado Pago (Checkout Pro)...');
      }, 1000);
    } catch (e) {
      setPaymentStatus('Erro ao iniciar pagamento.');
    }
  };

  if (filteredJobs.length === 0) return null;

  return (
    <section className="py-20 bg-slate-900 overflow-hidden" id="vagas">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white animate-pulse shadow-lg shadow-red-900/40">
              <span className="text-2xl" aria-hidden="true">🚨</span>
            </div>
            <div>
              <h2 className="text-white font-black uppercase tracking-tighter text-3xl leading-none">Enterprise Registry</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Oportunidades em {location.city}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <button 
              onClick={handlePremiumPurchase}
              className="px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:scale-105 transition-all flex items-center gap-2 border border-white/10"
            >
              <span className="text-lg">💎</span> {paymentStatus || 'Destaque sua Unidade (R$ 99)'}
            </button>

            <div className="flex items-center gap-2">
              <button onClick={() => scroll('left')} className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button onClick={() => scroll('right')} className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-all">
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
            <div key={job.id} className="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-[400px] relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-red-600 animate-fade-in flex flex-col h-[520px] overflow-hidden group">
              <div className="absolute top-10 right-[-30px] opacity-[0.03] rotate-45 pointer-events-none select-none">
                <span className="text-8xl font-black uppercase">ENTERPRISE</span>
              </div>
              
              <div className="mb-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">ID: {job.id.split('-')[1]}</span>
                  {job.employmentType === 'TEMPORARY' && <span className="bg-orange-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase animate-bounce">Urgente</span>}
                  {job.hiringOrganization.includes('Segmedic') && <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase">Recrutamento</span>}
                  {job.hiringOrganization.includes('Medprime') && <span className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase">Premium</span>}
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight h-14 overflow-hidden">{job.title}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase mt-1 tracking-widest truncate">{job.hiringOrganization}</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💰</span>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Remuneração</p>
                    <p className="text-sm font-black text-emerald-600">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">ℹ️</span>
                  <div className="text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-4">{job.description}</div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-auto relative z-10">
                {job.contactUrl ? (
                  <a 
                    href={job.contactUrl}
                    target="_blank"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all text-xs"
                  >
                    Ver Edital / Contato
                  </a>
                ) : (
                  <a 
                    href={`https://wa.me/${job.contactWhatsapp}?text=Ol%C3%A1,%20vi%20a%20vaga%20de%20${job.title}%20em%20${job.city}%20no%20IA%20HOSPITAL.`}
                    target="_blank"
                    className="w-full py-4 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all text-xs"
                  >
                    Credenciar-se
                  </a>
                )}
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
