
import React from 'react';
import { JobOpportunity } from '../types';

interface CareersPageProps {
  jobs: JobOpportunity[];
  onNavigate: (path: string, e: React.MouseEvent) => void;
}

const CareersPage: React.FC<CareersPageProps> = ({ jobs, onNavigate }) => {
  return (
    <div className="animate-fade-in">
      <div className="relative bg-slate-900 pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <p className="text-teal-400 text-sm font-bold uppercase tracking-[0.2em]">Trabalhe Conosco</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mt-2 tracking-tighter">Faça Parte da Inovação em Saúde</h1>
          <p className="text-slate-200 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            No IA HOSPITAL, estamos construindo o futuro da triagem e do atendimento médico local. Buscamos profissionais que compartilham nossa paixão por tecnologia, precisão e cuidado humano.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-800">Vagas Abertas</h2>
            <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">{jobs.length}</span>
          </div>

          <div className="space-y-6">
            {jobs.length > 0 ? (
              jobs.map(job => (
                <a 
                  key={job.id}
                  href={`/vagas/${job.slug}`}
                  onClick={(e) => onNavigate(`/vagas/${job.slug}`, e)}
                  className="block bg-white p-8 rounded-3xl border border-slate-200 hover:border-teal-500 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{job.title}</h3>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {job.city}, {job.state}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0">{job.employmentType.replace('_', '-')}</span>
                      <span className="hidden sm:block text-teal-600 font-bold uppercase text-xs tracking-widest">
                        Ver Vaga &rarr;
                      </span>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                <div className="text-4xl mb-4 text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-6 0H3" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Nenhuma vaga aberta no momento.</h3>
                <p className="text-slate-500 mt-2">Por favor, verifique novamente em breve.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
