
import React from 'react';
import { UserLocation, JobOpportunity } from '../types';

interface JobsBoardProps {
  location: UserLocation;
}

// Base de dados de vagas (JobPosting Schema compatível)
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
    id: 'job-014',
    title: 'Pediatra Sala de Parto - Plantão Noturno',
    description: 'Vaga urgente para Pediatra em Sala de Parto no Hospital da Região Metropolitana de Porto Alegre. Necessário RQE.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-06',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Região Metropolitana POA',
    city: 'Porto Alegre',
    state: 'RS',
    specialty: 'Pediatria',
    salary: 'A consultar',
    contactWhatsapp: '5551995785365',
    dates: ['05/01 (19h às 07h)']
  },
  {
    id: 'job-015',
    title: 'Ortopedista - Plantão 12h',
    description: 'Plantão de Ortopedia no Hospital Regional da Lapa São Sebastião. Localizado a aproximadamente 60km de Curitiba.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-08',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Regional da Lapa São Sebastião',
    city: 'Lapa',
    state: 'PR',
    specialty: 'Ortopedia',
    salary: 'A consultar',
    contactWhatsapp: '5541997002421',
    dates: ['07/01 (08h-20h)']
  },
  {
    id: 'job-016',
    title: 'Anestesiologista - Plantão 12h',
    description: 'Plantão de Anestesiologia no Hospital Regional da Lapa São Sebastião. Localizado na Lapa, região metropolitana de Curitiba.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-28',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Regional da Lapa São Sebastião',
    city: 'Lapa',
    state: 'PR',
    specialty: 'Anestesiologia',
    salary: 'A consultar',
    contactWhatsapp: '5541997002421',
    dates: ['27/01 (08h-20h)']
  },
  {
    id: 'job-017',
    title: 'Emergencista - Plantão Imediato',
    description: '🚨 VAGA URGENTE: Emergencista para o Hospital Regional em Paranaguá. Necessário RQE. Falar com Julio.',
    datePosted: '2025-01-05',
    validThrough: '2025-01-30',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Regional em Paranaguá (Litoral)',
    city: 'Paranaguá',
    state: 'PR',
    specialty: 'Emergencista',
    salary: 'A consultar',
    contactWhatsapp: '5541991462236',
    dates: ['Plantões no Litoral / PR']
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
    id: 'job-013',
    title: 'Cirurgião Geral - Plantão Litoral',
    description: 'Hospital Regional do Litoral em Paranaguá/PR. Necessário RQE ou título de especialista. Vagas para plantões diurnos e 24h.',
    datePosted: '2025-01-04',
    validThrough: '2025-01-30',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Regional do Litoral',
    city: 'Paranaguá',
    state: 'PR',
    specialty: 'Cirurgia Geral',
    salary: 'R$ 1.800,00 / 12h',
    contactWhatsapp: '554191039218',
    dates: ['14/01 Diurno', '16/01 24h', '23/01 24h']
  }
];

const JobsBoard: React.FC<JobsBoardProps> = ({ location }) => {
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

  if (filteredJobs.length === 0) return null;

  return (
    <section className="py-16 bg-slate-900 overflow-hidden" id="vagas">
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

          {/* Institutional Seats Badge */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredJobs.map(job => (
            <div key={job.id} className="relative bg-white rounded-[2.5rem] p-8 shadow-2xl border-t-8 border-red-600 animate-fade-in group hover:scale-[1.02] transition-all flex flex-col h-full overflow-hidden">
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
                  {job.id === 'job-017' && (
                    <span className="bg-orange-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter animate-bounce shadow-lg shadow-orange-500/20">Urgente</span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight">{job.title}</h3>
                <p className="text-[10px] font-bold text-blue-600 uppercase mt-1 tracking-widest">{job.hiringOrganization}</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow relative z-10">
                {job.dates && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📅</span>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Enterprise Schedule</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {job.dates.map(d => (
                          <span key={d} className="bg-slate-100 px-2 py-1 rounded text-[10px] font-black text-slate-700">{d}</span>
                        ))}
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
                  <div className="text-[11px] text-slate-600 leading-relaxed font-medium">
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
    </section>
  );
};

export default JobsBoard;
