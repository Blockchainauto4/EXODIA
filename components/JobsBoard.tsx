
import React from 'react';
import { UserLocation, JobOpportunity } from '../types';

interface JobsBoardProps {
  location: UserLocation;
}

// Base de dados expandida conforme solicitações recentes
const MOCK_JOBS: JobOpportunity[] = [
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
    id: 'job-002',
    title: 'Hospitalista - Enfermaria',
    description: 'Enfermaria - visitador/hospitalista no Hospital Santa Clara. Requisitos: 6 meses de graduação e ACLS.',
    datePosted: '2025-01-02',
    validThrough: '2025-01-10',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Santa Clara',
    city: 'Vila Matilde',
    state: 'SP',
    specialty: 'Clínica Geral',
    salary: 'À combinar',
    contactWhatsapp: '5511972038222',
    dates: ['05/01 (7h-13h)', '05/01 (13h-19h)', '06/01 (7h-13h)', '08/01 (19-07h)', '09/01 (7-13h)']
  },
  {
    id: 'job-003',
    title: 'Clínico - Pronto Socorro (PS)',
    description: 'Plantão em Pronto Socorro no Hospital das Acácias. Requisitos: 6 meses de graduação e ACLS.',
    datePosted: '2025-01-02',
    validThrough: '2025-01-30',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital das Acácias',
    city: 'Santo André',
    state: 'SP',
    specialty: 'Clínica Geral',
    salary: 'A consultar',
    contactWhatsapp: '5511972038222'
  },
  {
    id: 'job-004',
    title: 'Clínico - PS e Enfermaria',
    description: 'Plantão em Pronto Socorro e Enfermaria no Hospital Santa Ana.',
    datePosted: '2025-01-02',
    validThrough: '2025-01-30',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Santa Ana',
    city: 'São Caetano do Sul',
    state: 'SP',
    specialty: 'Clínica Geral',
    salary: 'A consultar',
    contactWhatsapp: '5511972038222'
  }
];

const JobsBoard: React.FC<JobsBoardProps> = ({ location }) => {
  const normalize = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  // Se a especialidade não for definida, permitimos mostrar todas as de Clínica Geral como padrão
  const filteredJobs = MOCK_JOBS.filter(job => {
    const cityMatch = location.city === 'sua região' || normalize(job.city) === normalize(location.city);
    const specialtyMatch = !location.specialty || 
                          location.specialty === 'Atendimento Médica' || 
                          normalize(job.specialty) === normalize(location.specialty);
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
            <div key={job.id} className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-red-600 animate-fade-in group hover:scale-[1.02] transition-all flex flex-col h-full">
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
                  }
                })}
              </script>

              <div className="mb-6">
                <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                  {job.hiringOrganization} • {job.city}/{job.state}
                </span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight">{job.title}</h3>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {job.dates && job.dates.length > 0 && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl" aria-hidden="true">📅</span>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Datas do Plantão</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.dates.map(d => (
                          <span key={d} className="bg-slate-100 px-3 py-1 rounded-lg text-[10px] font-bold text-slate-700">{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <span className="text-xl" aria-hidden="true">💰</span>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Condição</p>
                    <p className="text-sm font-bold text-emerald-600">{job.salary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl" aria-hidden="true">ℹ️</span>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    {job.description}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-auto">
                <a 
                  href={`https://wa.me/${job.contactWhatsapp}?text=Ol%C3%A1,%20tenho%20interesse%20no%20plant%C3%A3o%20de%20${job.title}%20em%20${job.city}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20 transition-all text-xs"
                >
                  Falar com Recrutamento
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
