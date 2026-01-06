
import React, { useRef, useEffect, useState } from 'react';
import { UserLocation, JobOpportunity } from '../types';
import { initCheckoutPro } from '../services/paymentService';

const MOCK_JOBS: JobOpportunity[] = [
  {
    id: 'job-037',
    title: 'Médico Ortopedista - Jaçanã/SP',
    description: '🚨 VAGA FIXA PARA ORTOPEDISTA - JAÇANÃ/SP (ZONA NORTE). 🏥 Unidade Jaçanã. 🩺 Vagas fixas e coberturas. 🗓️ Baixo volume de atendimento. ⏰ Plantões de 12hrs ou 24hrs. ✅ Estacionamento, Refeitório e Conforto Médico. 🎓 ACEITAMOS RESIDENTES E PÓS GRADUADOS.',
    datePosted: '2025-01-25',
    validThrough: '2025-08-30',
    employmentType: 'CONTRACTOR',
    hiringOrganization: 'Unidade Jaçanã (ZN)',
    city: 'São Paulo',
    state: 'SP',
    specialty: 'Ortopedia',
    salary: 'Valor por Plantão (A consultar)',
    contactWhatsapp: '5511966007274',
    dates: ['12h ou 24h']
  },
  {
    id: 'job-036',
    title: 'Médico Pediatra - Altinópolis/SP',
    description: '🚨 VAGA FIXA PARA PEDIATRIA - Altinópolis/SP. 🏥 Secretaria de Saúde de Altinópolis. 🗓️ Agenda flexível - segunda à sexta, 20hrs semanais. ✅ Pacientes agendados. 📚 Necessário PÓS completa. 🚗 Próximo a Ribeirão Preto.',
    datePosted: '2025-01-24',
    validThrough: '2025-07-30',
    employmentType: 'FULL_TIME',
    hiringOrganization: 'Secretaria de Saúde de Altinópolis',
    city: 'Altinópolis',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'Fixo (A consultar)',
    contactWhatsapp: '5543988110408',
    dates: ['Segunda a Sexta (20h)']
  },
  {
    id: 'job-035',
    title: 'Emergencista / Enfermaria - Hosp. Alexandre Zaio',
    description: '🏥 HOSPITAL ALEXANDRE ZAIO - ZONA LESTE SP. 🩺 Emergencista (R E T A) 💰 R$1.800,00 (Líquido) | Enfermaria 💰 R$1650,00 (Líquido). Necessário residência médica ou RQE. Vínculo SCP. Unidade com estacionamento, refeição e conforto com Ar condicionado.',
    datePosted: '2025-01-24',
    validThrough: '2025-06-30',
    employmentType: 'PART_TIME',
    hiringOrganization: 'Hosp. Alexandre Zaio',
    city: 'São Paulo',
    state: 'SP',
    specialty: 'Emergência',
    salary: 'R$ 1.800,00 (Líquido)',
    contactWhatsapp: '5511966007274',
    dates: ['Plantões a combinar']
  },
  {
    id: 'job-034',
    title: 'Ortopedia / Anestesiologia - Lapa/PR',
    description: '🆘 PLANTÕES DISPONÍVEIS LAPA/PR. 🏥 Hospital Regional da Lapa São Sebastião. ✳️ ORTOPEDIA: Quarta 08h-20h. ✳️ ANESTESIOLOGIA: Terças 08h-20h (Fixo). Localizado a 60km de Curitiba.',
    datePosted: '2025-01-22',
    validThrough: '2025-05-30',
    employmentType: 'PART_TIME',
    hiringOrganization: 'Hospital Regional da Lapa São Sebastião',
    city: 'Lapa',
    state: 'PR',
    specialty: 'Ortopedia',
    salary: 'Valor do Plantão (Tabela Regional)',
    contactWhatsapp: '5541997002421',
    dates: ['Terças', 'Quartas']
  },
  {
    id: 'job-033',
    title: 'Médico Psiquiatra - Icém/SP',
    description: '🏥 VAGA PARA MÉDICO PSIQUIATRA MUNICÍPIO DE ICÉM/SP. ⚠️ Vaga Fixa. 🩺 Tipo de atendimento: Ambulatoriais e Caps. 📆 Carga horária: de 3X a 5X na semana. 💰 Pagamento: Mensal, fixo, sem desconto e sem precisar emitir NF.',
    datePosted: '2025-01-20',
    validThrough: '2025-04-30',
    employmentType: 'FULL_TIME',
    hiringOrganization: 'Município de Icém/SP',
    city: 'Icém',
    state: 'SP',
    specialty: 'Psiquiatria',
    salary: 'Mensal Fixo (Sem NF)',
    contactWhatsapp: '5521983433895',
    dates: ['3x a 5x na semana']
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
    const cityMatch = location.city === 'sua região' || normalize(job.city) === normalize(location.city) || (normalize(location.city).includes('sao paulo') && normalize(job.description).includes('zona norte'));
    const stateMatch = isBrazilScope || job.state.toLowerCase() === location.state.toLowerCase();
    
    const currentSpec = normalize(location.specialty || '');
    const jobSpec = normalize(job.specialty);
    const jobDesc = normalize(job.description);
    
    const specialtyMatch = !location.specialty || 
                           jobSpec.includes(currentSpec) || 
                           jobDesc.includes(currentSpec) ||
                           (currentSpec.includes('emergencia') && (jobDesc.includes('emergencista') || jobDesc.includes('pronto socorro'))) ||
                           (currentSpec.includes('ortopedia') && jobDesc.includes('ortopedia')) ||
                           (currentSpec.includes('anestesia') && jobDesc.includes('anestesia')) ||
                           (currentSpec.includes('caps') && jobDesc.includes('caps')) ||
                           (currentSpec.includes('upa') && jobDesc.includes('upa'));

    return (cityMatch && stateMatch) && specialtyMatch;
  }).slice(0, 10);

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
        title: `Vaga Premium em ${location.city}`,
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
              <h2 className="text-white font-black uppercase tracking-tighter text-3xl leading-none">Oportunidades Locais</h2>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Vagas em {location.city}</p>
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
            <div key={job.id} className="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-[400px] relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-slate-900 animate-fade-in flex flex-col h-[520px] overflow-hidden group">
              <div className="absolute top-10 right-[-30px] opacity-[0.03] rotate-45 pointer-events-none select-none">
                <span className="text-8xl font-black uppercase">MEDICAL</span>
              </div>
              
              <div className="mb-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-200">{job.city}/{job.state}</span>
                  {(job.id === 'job-033' || job.id === 'job-035' || job.id === 'job-036' || job.id === 'job-037') && <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase shadow-lg shadow-blue-500/20">ATENÇÃO</span>}
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight h-14 overflow-hidden">{job.title}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase mt-1 tracking-widest truncate">{job.hiringOrganization}</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow relative z-10 overflow-hidden">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💰</span>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Remuneração</p>
                    <p className="text-sm font-black text-emerald-600">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">ℹ️</span>
                  <div className="text-[11px] text-slate-600 leading-relaxed font-medium line-clamp-5 italic">{job.description}</div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-auto relative z-10">
                <a 
                  href={`https://wa.me/${job.contactWhatsapp}?text=Olá,%20vi%20a%20vaga%20de%20${job.title}%20em%20${job.city}%20no%20IA%20HOSPITAL.`}
                  target="_blank"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all text-xs shadow-lg shadow-emerald-500/20"
                >
                  Falar com Contratante
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
