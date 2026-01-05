
import React from 'react';
import { UserLocation, JobOpportunity } from '../types';

interface JobsBoardProps {
  location: UserLocation;
}

// Mock de dados para demonstração baseado no exemplo enviado
const MOCK_JOBS: JobOpportunity[] = [
  {
    id: 'job-001',
    title: 'Pediatra - Plantão Hospitalar',
    description: 'Vaga para médico Pediatra em José Bonifácio/SP. Aceita residente. Pagamento à vista.',
    datePosted: '2024-12-30',
    validThrough: '2025-01-10',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'IA HOSPITAL Parceiros',
    city: 'José Bonifácio',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'A combinar - Pagamento à vista',
    contactWhatsapp: '5541984950530',
    dates: ['06/01', '07/01', '09/01']
  }
];

const JobsBoard: React.FC<JobsBoardProps> = ({ location }) => {
  // Função auxiliar para normalizar strings (remover acentos e colocar em minúsculas)
  const normalize = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  // Filtro dinâmico robusto: Ignora acentos e espaços extras
  const filteredJobs = MOCK_JOBS.filter(job => {
    const cityMatch = location.city === 'sua região' || normalize(job.city) === normalize(location.city);
    const specialtyMatch = !location.specialty || normalize(job.specialty) === normalize(location.specialty);
    const stateMatch = location.state === 'Brasil' || job.state.toLowerCase() === location.state.toLowerCase();
    
    return cityMatch && specialtyMatch && stateMatch;
  });

  if (filteredJobs.length === 0) return null;

  return (
    <section className="py-16 bg-slate-900 overflow-hidden" id="vagas">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white animate-pulse shadow-lg shadow-red-900/40">
            <span className="text-2xl" aria-hidden="true">🚨</span>
          </div>
          <div>
            <h2 className="text-white font-black uppercase tracking-tighter text-2xl leading-none">Plantões Disponíveis</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Oportunidades Urgentes em {location.city}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map(job => (
            <div key={job.id} className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-red-600 animate-fade-in group hover:scale-[1.02] transition-all">
              {/* Google Job Posting Schema Injection */}
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
                    "sameAs": "https://iahospital.com.br"
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
                      "value": 0,
                      "unitText": "HOUR"
                    }
                  }
                })}
              </script>

              <div className="mb-6">
                <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                  Vaga no Município de {job.city}/{job.state}
                </span>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{job.specialty}</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">📅</span>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Datas Disponíveis</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.dates?.map(d => (
                        <span key={d} className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-700">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">💰</span>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pagamento</p>
                    <p className="text-sm font-bold text-emerald-600 underline decoration-emerald-200">À VISTA</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">🔹</span>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Observação</p>
                    <p className="text-sm font-bold text-slate-700">Aceita residente</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">Interessados falar com Ellen</p>
                <a 
                  href={`https://wa.me/${job.contactWhatsapp}?text=Ol%C3%A1%20Ellen,%20tenho%20interesse%20no%20plant%C3%A3o%20de%20${job.specialty}%20em%20${job.city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20 transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Contatar Ellen
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsBoard;
