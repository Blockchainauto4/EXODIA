
import React, { useRef, useEffect, useState } from 'react';
import { UserLocation, JobOpportunity } from '../types';

interface JobsBoardProps {
  location: UserLocation;
}

// Base de dados completa de vagas (JobPosting Schema compatível)
const MOCK_JOBS: JobOpportunity[] = [
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
  },
  {
    id: 'job-024',
    title: 'Ginecologista - Atendimento UBS',
    description: '📍 Barra do Turvo/SP. Atendimento em Unidade Básica de Saúde. 8h diárias, 1x ao mês. Início em Janeiro.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-31',
    employmentType: 'PART_TIME',
    hiringOrganization: 'UBS Barra do Turvo',
    city: 'Barra do Turvo',
    state: 'SP',
    specialty: 'Ginecologia',
    salary: 'R$ 300,00 / hora',
    contactWhatsapp: '5544998711112',
    dates: ['Janeiro/2025']
  },
  {
    id: 'job-025',
    title: 'Ortopedista - Atendimento UBS',
    description: '📍 Barra do Turvo/SP. Atendimento em Unidade Básica de Saúde. 8h diárias, 1x ao mês. Início em Janeiro.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-31',
    employmentType: 'PART_TIME',
    hiringOrganization: 'UBS Barra do Turvo',
    city: 'Barra do Turvo',
    state: 'SP',
    specialty: 'Ortopedia',
    salary: 'R$ 300,00 / hora',
    contactWhatsapp: '5544998711112',
    dates: ['Janeiro/2025']
  },
  {
    id: 'job-026',
    title: 'Neurologista / Neuropediatra - Atendimento UBS',
    description: '📍 Barra do Turvo/SP. Atendimento em Unidade Básica de Saúde. 8h diárias, 1x ao mês. Valor diferenciado. Início em Janeiro.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-31',
    employmentType: 'PART_TIME',
    hiringOrganization: 'UBS Barra do Turvo',
    city: 'Barra do Turvo',
    state: 'SP',
    specialty: 'Neurologia',
    salary: 'R$ 500,00 / hora',
    contactWhatsapp: '5544998711112',
    dates: ['Janeiro/2025']
  },
  {
    id: 'job-022',
    title: 'Clínica Médica - PSM Balneário São José',
    description: '🩺 COBERTURA ZONA SUL: Atendimento em Clínica Médica. Necessário ACLS e 6 meses de experiência mínima. Importante: Médicos CLT da ASF não podem realizar este plantão.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-26',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'PSM Balneário São José',
    city: 'São Paulo',
    state: 'SP',
    specialty: 'Clínica Geral',
    salary: 'R$ 1.300,00 / 12h',
    contactWhatsapp: '5511947633807',
    dates: ['07/01 19h', '09/01 19h', '21/01 19h', '22/01 19h', '23/01 19h', '26/01 19h']
  },
  {
    id: 'job-021',
    title: 'Clínica Médica - UPA Parelheiros',
    description: '🩺 COBERTURA ZONA SUL: Atendimento em Clínica Médica. Necessário ACLS e 6 meses de experiência mínima. Importante: Médicos CLT da ASF não podem realizar este plantão.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-25',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'UPA Parelheiros',
    city: 'São Paulo',
    state: 'SP',
    specialty: 'Clínica Geral',
    salary: 'R$ 1.300,00 / 12h',
    contactWhatsapp: '5511947633807',
    dates: ['07/01 19h', '10/01 19h', '11/01 19h', '18/01 19h', '24/01 19h', '25/01 19h']
  },
  {
    id: 'job-001',
    title: 'Pediatra - Plantão Hospitalar',
    description: 'Vaga para médico Pediatra em José Bonifácio/SP. Aceita residente. Pagamento à vista.',
    datePosted: '2024-12-30',
    validThrough: '2025-01-20',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'IA HOSPITAL Parceiros',
    city: 'José Bonifácio',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'A combinar - Pagamento à vista',
    contactWhatsapp: '5541984950530',
    dates: ['06/01', '07/01', '09/01']
  },
  {
    id: 'job-020',
    title: 'Ginecologia e Obstetrícia - Plantão Noturno',
    description: '🚨 COBERTURA IMEDIATA: Plantão no Hospital Maternidade Theresa Sacchi de Moura. Local: Barra Mansa/RJ. Pagamento à vista.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-06',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Maternidade Theresa Sacchi de Moura',
    city: 'Barra Mansa',
    state: 'RJ',
    specialty: 'Ginecologia',
    salary: 'Valor Líquido - Pagamento à Vista',
    contactWhatsapp: '5521994165405',
    dates: ['05/01 (19h às 07h)']
  }
];

const JobsBoard: React.FC<JobsBoardProps> = ({ location }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const normalize = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const filteredJobs = MOCK_JOBS.filter(job => {
    const cityMatch = location.city === 'sua região' || normalize(job.city) === normalize(location.city);
    const isGenericSpecialty = !location.specialty || 
                               ['Atendimento Médica', 'Atendimento Médico', 'Atendimento'].some(s => location.specialty?.includes(s));
    const specialtyMatch = isGenericSpecialty || normalize(job.specialty) === normalize(location.specialty || '');
    const stateMatch = location.state === 'Brasil' || job.state.toLowerCase() === location.state.toLowerCase();
    
    return cityMatch && specialtyMatch && stateMatch;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
      
      if (direction === 'right') {
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 50;
        if (isAtEnd) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollTo({ left: scrollLeft + clientWidth, behavior: 'smooth' });
        }
      } else {
        const isAtStart = scrollLeft <= 0;
        if (isAtStart) {
          scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollTo({ left: scrollLeft - clientWidth, behavior: 'smooth' });
        }
      }
    }
  };

  useEffect(() => {
    if (isPaused || filteredJobs.length <= 1) return;

    const interval = setInterval(() => {
      scroll('right');
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, filteredJobs.length]);

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
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Oportunidades Estratégicas em {location.city}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation Controls */}
            <div className="hidden md:flex items-center gap-2 mr-4">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 text-white flex items-center justify-center hover:bg-slate-700 transition-all active:scale-95"
                aria-label="Anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 text-white flex items-center justify-center hover:bg-slate-700 transition-all active:scale-95"
                aria-label="Próximo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 flex items-center gap-6 shadow-2xl">
              <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {i}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Seats Available</p>
                <p className="text-white font-black text-sm uppercase tracking-tighter">
                  {filteredJobs.length} Assentos Profissionais <span className="text-emerald-500">• {location.city}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 -mx-4 px-4 mask-fade-edges"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredJobs.map(job => (
            <div 
              key={job.id} 
              className="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-[400px] relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-red-600 animate-fade-in group hover:scale-[1.01] transition-all flex flex-col h-[520px] overflow-hidden"
            >
              {/* Institutional Watermark */}
              <div className="absolute top-10 right-[-30px] opacity-[0.03] rotate-45 pointer-events-none select-none">
                <span className="text-8xl font-black uppercase">ENTERPRISE</span>
              </div>

              {/* Schema JSON-LD para Google Jobs e SEO Local */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org/",
                  "@type": "JobPosting",
                  "title": job.title,
                  "description": job.description,
                  "datePosted": job.datePosted,
                  "validThrough": job.validThrough,
                  "employmentType": job.employmentType,
                  "hiringOrganization": {
                    "@type": "Organization",
                    "name": job.hiringOrganization,
                    "logo": "https://iahospital.com.br/logo.png"
                  },
                  "jobLocation": {
                    "@type": "Place",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": job.city,
                      "addressRegion": job.state,
                      "addressCountry": "BR"
                    }
                  },
                  "baseSalary": {
                    "@type": "MonetaryAmount",
                    "currency": "BRL",
                    "value": {
                      "@type": "QuantitativeValue",
                      "unitText": "HOUR"
                    }
                  }
                })}
              </script>

              <div className="mb-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-block border border-slate-200">
                    ID: {job.id.split('-')[1]} • {job.city}
                  </span>
                  {(job.id.includes('017') || job.id.includes('018') || job.id.includes('019') || job.id.includes('020') || job.id.includes('021') || job.id.includes('022') || job.id.includes('023') || job.id.includes('024') || job.id.includes('025') || job.id.includes('026')) && (
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter animate-bounce shadow-lg shadow-orange-500/20">Urgente</span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight h-14 overflow-hidden">{job.title}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase mt-1 tracking-widest truncate">{job.hiringOrganization}</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow relative z-10">
                {job.dates && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Enterprise Schedule</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {job.dates.slice(0, 3).map(d => (
                          <span key={d} className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black text-slate-700">{d}</span>
                        ))}
                        {job.dates.length > 3 && <span className="text-[9px] font-bold text-slate-400 self-center">+{job.dates.length - 3} mais</span>}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <span className="text-xl">💰</span>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Assento Remunerado</p>
                    <p className="text-sm font-black text-emerald-600">{job.salary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">ℹ️</span>
                  <div className="text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-4">
                    {job.description}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-auto relative z-10">
                <a 
                  href={`https://wa.me/${job.contactWhatsapp}?text=Ol%C3%A1,%20vi%20o%20assento%20profissional%20de%20${job.title}%20em%20${job.city}%20no%20IA%20HOSPITAL%20e%20quero%20me%20credenciar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all text-xs"
                >
                  Solicitar Credenciamento
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </section>
  );
};

export default JobsBoard;
