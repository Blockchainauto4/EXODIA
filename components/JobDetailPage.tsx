
import React from 'react';
import { JobOpportunity } from '../types';

interface JobDetailPageProps {
  job: JobOpportunity;
  onNavigate: (path: string, e: React.MouseEvent) => void;
}

const JobDetailPage: React.FC<JobDetailPageProps> = ({ job, onNavigate }) => {
  const jobSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": `<p>${job.description}</p><p><b>Remuneração:</b> ${job.salary || 'Não informado'}</p>`,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.hiringOrganization,
      "sameAs": "https://iahospital.com.br/"
    },
    "datePosted": job.datePosted,
    "validThrough": job.validThrough,
    "employmentType": job.employmentType,
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.city,
        "addressRegion": job.state,
        "addressCountry": "BR"
      }
    }
    // baseSalary é omitido intencionalmente quando o valor é textual (ex: "A combinar")
    // para evitar erros de validação de schema, conforme as melhores práticas.
    // A informação sobre salário está incluída na descrição.
  };

  const contactLink = job.contactUrl 
    ? job.contactUrl 
    : job.contactWhatsapp 
      ? `https://wa.me/${job.contactWhatsapp}?text=Olá,%20tenho%20interesse%20na%20vaga%20de%20${encodeURIComponent(job.title)}%20divulgada%20no%20IA%20HOSPITAL.`
      : '#';

  const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <li className="flex items-center gap-4">
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
        {icon}
      </div>
      <div>
        <strong className="block text-xs uppercase tracking-widest text-slate-500">{label}</strong>
        <span className="font-bold text-slate-800">{value}</span>
      </div>
    </li>
  );

  return (
    <div className="animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      <div className="relative bg-slate-900 pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <a href="/carreiras" onClick={(e) => onNavigate('/carreiras', e)} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 hover:bg-white/20 transition-colors">
            &larr; Voltar para Vagas
          </a>
          <p className="text-teal-400 text-sm font-bold uppercase tracking-[0.2em]">{job.hiringOrganization}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mt-2 tracking-tighter">{job.title}</h1>
        </div>
      </div>
      
      <div className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 prose prose-slate max-w-none text-slate-700 leading-relaxed">
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-800">Descrição da Oportunidade</h2>
            <p className="text-lg italic text-slate-600">"{job.description}"</p>
            
            <div className="my-10 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tighter mb-4">Detalhes da Posição</h3>
                <ul className="space-y-4 not-prose list-none p-0">
                    <DetailItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} label="Localização" value={`${job.city}, ${job.state}`} />
                    <DetailItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2m-3 2h16M5 12h14M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>} label="Remuneração" value={job.salary || 'Não informado'} />
                    <DetailItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} label="Publicada em" value={new Date(job.datePosted).toLocaleDateString('pt-BR')} />
                    <DetailItem icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} label="Válida até" value={new Date(job.validThrough).toLocaleDateString('pt-BR')} />
                </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-200 text-center">
              <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tighter mb-6">Pronto para se candidatar?</h3>
              <p className="text-xs text-slate-600 mb-8">
                Envie sua candidatura diretamente para a equipe de recrutamento responsável por esta vaga em <strong>{job.city}</strong>.
              </p>
              <a 
                href={contactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-200"
              >
                Candidatura Imediata
              </a>
              <p className="text-[10px] text-slate-400 mt-6 uppercase font-bold tracking-wider">Processo Seletivo Externo</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
