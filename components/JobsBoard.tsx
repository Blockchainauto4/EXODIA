import React, { useRef, useEffect, useState } from 'react';
import { UserLocation, JobOpportunity } from '../types';
// FIX: Correcting the import name from 'initCheckoutPro' to 'initCheckoutProMP' as suggested by the error message.
import { initCheckoutProMP } from '../services/paymentService';

interface JobsBoardProps {
  location: UserLocation;
  jobs: JobOpportunity[];
  onNavigate: (path: string, e: React.MouseEvent) => void;
}

const JobsBoard: React.FC<JobsBoardProps> = ({ location, jobs, onNavigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  const normalize = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  const filteredJobs = jobs.filter(job => {
    const isBrazilScope = location.state === 'Brasil';
    const stateMatch = isBrazilScope || job.state.toLowerCase() === location.state.toLowerCase();
    
    const cityMatch = location.city === 'sua região' || 
                      normalize(job.city).includes(normalize(location.city)) ||
                      normalize(location.city).includes(normalize(job.city));
                      
    const currentSpec = normalize(location.specialty || '');
    const jobSpec = normalize(job.specialty);
    const jobTitle = normalize(job.title);
    const jobDesc = normalize(job.description);
    
    const specialtyMatch = !location.specialty || 
                           currentSpec === 'atendimento medico' ||
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
      // FIX: Correcting the function call to match the imported name 'initCheckoutProMP'.
      await initCheckoutProMP({
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
            <a 
              href="/carreiras"
              className="px-6 py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-slate-700 transition-all flex items-center gap-2 border border-white/10"
            >
              Ver Todas as Vagas
            </a>

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
                  href={`/vagas/${job.slug}`}
                  onClick={(e) => onNavigate(`/vagas/${job.slug}`, e)}
                  className="w-full py-4 bg-slate-800 hover:bg-slate-950 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all text-xs shadow-lg shadow-slate-500/20"
                >
                  Ver Detalhes da Vaga
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