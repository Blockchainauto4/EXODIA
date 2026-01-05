
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
  },
  {
    id: 'job-005',
    title: 'Médicos Especialistas (Ambulatorial)',
    description: 'Vagas para diversas especialidades (Cardio, Ginecologia, Ortopedia, Pediatria, Psiquiatria, etc.) e exames (Ecocardiograma, Teste Ergométrico, USG) na rede Segmedic RJ.',
    datePosted: '2025-01-02',
    validThrough: '2025-02-28',
    employmentType: 'FULL_TIME',
    hiringOrganization: 'Segmedic – RJ',
    city: 'Rio de Janeiro',
    state: 'RJ',
    specialty: 'Cardiologia',
    salary: 'A combinar (PJ)',
    contactUrl: 'mailto:relacionamentomedico@segmedic.com.br',
    dates: ['Fluxo Contínuo']
  },
  {
    id: 'job-006',
    title: 'Pediatra UTI (Hospitalista)',
    description: 'Atuação em UTI Pediátrica em Itapecerica da Serra. Sistema Tasy. Requisito: Residência completa ou subespecialidade (Nefro, Cardio, etc) com experiência em UTI.',
    datePosted: '2025-01-02',
    validThrough: '2025-02-15',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Hospital Itapecerica da Serra / IMED',
    city: 'Itapecerica da Serra',
    state: 'SP',
    specialty: 'Pediatria',
    salary: 'R$ 1.800 (12h sem) / R$ 2.000 (FDS)',
    contactUrl: 'https://wa.me/message/TU4JWNEIFRD3J1',
    dates: ['Escala 12h Semanal e FDS']
  },
  {
    id: 'job-007',
    title: 'Ginecologista (ESF)',
    description: 'Vaga Fixa no Município de Icém/SP. Atendimento 4x na semana, 4h diárias. Exige especialização ou residência.',
    datePosted: '2025-01-02',
    validThrough: '2025-03-01',
    employmentType: 'PART_TIME',
    hiringOrganization: 'Município de Icém / Saúde',
    city: 'Icém',
    state: 'SP',
    specialty: 'Ginecologia',
    salary: 'Valor fixo/mensal (Sem descontos/NF)',
    contactWhatsapp: '21983433895',
    dates: ['4x na semana (4h/dia)']
  },
  {
    id: 'job-008',
    title: 'Médico Neonatologista',
    description: 'Cobertura de vacâncias e vagas fixas na Santa Casa de Barra Mansa (SCBM). Rua Pinto Ribeiro, 205.',
    datePosted: '2025-01-02',
    validThrough: '2025-02-28',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'Santa Casa de Barra Mansa | SCBM',
    city: 'Barra Mansa',
    state: 'RJ',
    specialty: 'Neonatologia',
    salary: 'A combinar',
    contactWhatsapp: '5521994062776',
    dates: ['08/01', '10/01', '11/01', '22/01', '31/01', 'Vagas Fixas Disp.']
  },
  {
    id: 'job-009',
    title: 'Pediatra (UBS)',
    description: 'Atendimento em Unidade Básica de Saúde (UBS). Necessário RQE. Oportunidade na Região Central do RS.',
    datePosted: '2025-01-02',
    validThrough: '2025-04-01',
    employmentType: 'FULL_TIME',
    hiringOrganization: 'Rapimed - Gestão em Saúde',
    city: 'Região Central',
    state: 'RS',
    specialty: 'Pediatria',
    salary: 'A consultar',
    contactWhatsapp: '5551992269297',
    contactUrl: 'https://mkt.rapimed.com.br/medicos'
  },
  {
    id: 'job-010',
    title: 'Cirurgião Geral - Plantão',
    description: 'Vaga para médico Cirurgião Geral no município de São Vicente/SP. Aceita residente. Pagamento à vista.',
    datePosted: '2025-01-04',
    validThrough: '2025-01-10',
    employmentType: 'TEMPORARY',
    hiringOrganization: 'IA HOSPITAL Parceiros',
    city: 'São Vicente',
    state: 'SP',
    specialty: 'Cirurgia Geral',
    salary: 'Pagamento à vista',
    contactWhatsapp: '5541984950530',
    dates: ['03/01 Noturno', '04/01 Noturno', '06/01 Noturno', '08/01 Diurno']
  },
  {
    id: 'job-011',
    title: 'Pediatra (UBS) - Noroeste RS',
    description: 'Necessário RQE. Atendimento 1x na semana em UBS. Demanda média de 12 a 20 consultas. Rapimed - Gestão em Saúde.',
    datePosted: '2025-01-04',
    validThrough: '2025-05-01',
    employmentType: 'PART_TIME',
    hiringOrganization: 'Rapimed - Gestão em Saúde',
    city: 'Região Noroeste',
    state: 'RS',
    specialty: 'Pediatria',
    salary: 'A consultar',
    contactWhatsapp: '5551992269297',
    contactUrl: 'https://mkt.rapimed.com.br/medicos'
  },
  {
    id: 'job-012',
    title: 'Psiquiatra (UBS) - Noroeste RS',
    description: 'Necessário RQE. Atendimento 1x na semana em UBS. Demanda média de 12 a 15 consultas. Rapimed - Gestão em Saúde.',
    datePosted: '2025-01-04',
    validThrough: '2025-05-01',
    employmentType: 'PART_TIME',
    hiringOrganization: 'Rapimed - Gestão em Saúde',
    city: 'Região Noroeste',
    state: 'RS',
    specialty: 'Psiquiatria',
    salary: 'A consultar',
    contactWhatsapp: '5551992269297',
    contactUrl: 'https://mkt.rapimed.com.br/medicos'
  }
];

const JobsBoard: React.FC<JobsBoardProps> = ({ location }) => {
  const normalize = (str: string) => 
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  // Filtro dinâmico: mostra vagas se a cidade bater ou se o usuário estiver em "sua região"
  const filteredJobs = MOCK_JOBS.filter(job => {
    const cityMatch = location.city === 'sua região' || normalize(job.city) === normalize(location.city);
    
    const isGenericSpecialty = !location.specialty || 
                               location.specialty === 'Atendimento Médica' || 
                               location.specialty === 'Atendimento Médica' || 
                               location.specialty === 'Atendimento Médico' ||
                               location.specialty === 'Atendimento';

    const specialtyMatch = isGenericSpecialty || 
                          normalize(job.specialty) === normalize(location.specialty || '') ||
                          (job.hiringOrganization.includes('Segmedic') && location.specialty && [
                            'Cardiologia', 'Pediatria', 'Ginecologia', 'Ortopedia', 'Psiquiatria', 'Nutrologia',
                            'Alergologia', 'Angiologia', 'Cirurgia Geral', 'Endocrinologia', 'Gastroenterologia',
                            'Geriatria', 'Hematologia', 'Infectologia', 'Mastologia', 'Nefrologia', 'Neuropediatria',
                            'Otorrinolaringologia', 'Pneumologia', 'Proctologia', 'Reumatologia', 'Urologia'
                          ].some(s => normalize(s) === normalize(location.specialty || '')));

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
            <h2 className="text-white font-black uppercase tracking-tighter text-2xl leading-none">Vagas & Plantões Disponíveis</h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Oportunidades em {location.city}</p>
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
                    "sameAs": job.contactUrl || "https://iahospital.com.br"
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
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Escala / Disponibilidade</p>
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
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Condição / Valor</p>
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
                  href={job.contactWhatsapp ? `https://wa.me/${job.contactWhatsapp}?text=Ol%C3%A1,%20tenho%20interesse%20na%20vaga%20de%20${job.title}%20em%20${job.city}` : job.contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20 transition-all text-xs"
                >
                  Candidatar-se / Contato
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
