
import React, { memo } from 'react';
import { UserLocation, BRAZIL_STATES, LegalModalType } from '../types';

interface FooterProps {
  onAdminOpen?: () => void;
  onOpenLegal?: (type: LegalModalType, title: string) => void;
  location?: UserLocation;
  onNavigate: (path: string, e: React.MouseEvent) => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen, onOpenLegal, location, onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20 bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-[3rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/5 blur-[120px] -z-0"></div>
          <div className="text-center lg:text-left relative z-10 max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-teal-600/20 text-teal-300 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-teal-500/20">Para Unidades de Saúde</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4 text-white leading-none">Integre sua Unidade à Nossa Rede</h2>
            <p className="text-slate-300 text-base font-medium leading-relaxed">
              Expanda sua operação médica em <span className="text-white font-bold">{location?.city || 'sua região'}</span> integrando-se à governança do IA HOSPITAL. Oferecemos assentos profissionais limitados para especialistas e clínicas de alta performance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
            <a
              href="https://painel.iahospital.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solicitar assento profissional na rede IA Hospital"
              className="px-12 py-6 bg-white text-slate-950 font-bold uppercase tracking-widest rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap flex items-center justify-center"
            >
              Sou Médico
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8 text-white">
              <div className="w-10 h-10 bg-teal-700 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-teal-600/20">IA</div>
              <p className="font-bold text-2xl uppercase tracking-tighter">IA HOSPITAL</p>
            </div>
            <p className="text-slate-300 max-w-sm mb-8 font-medium leading-relaxed italic">
              "Governança, Tecnologia e Segurança em Saúde. Uma visão de inovação, liderada por <span className="text-white font-bold">Bruno Audric Bittencourt Rizk</span> e dedicada a todo o Brasil."
            </p>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group hover:border-teal-500 transition-all shadow-xl" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300 group-hover:text-teal-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-6 0H3" /></svg>
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-slate-200 uppercase tracking-widest leading-tight mb-1">
                  Governança e Segurança
                </h3>
                <p className="text-[8px] text-teal-400 font-semibold uppercase tracking-[0.2em]">Certificação de Segurança Rizk</p>
              </div>
            </div>
          </div>
          
          <nav aria-label="Links estratégicos">
            <h3 className="font-bold mb-8 text-white text-xs uppercase tracking-[0.2em]">Links Estratégicos</h3>
            <ul className="space-y-4 text-slate-300 text-sm font-semibold uppercase tracking-widest">
              <li><button onClick={() => onOpenLegal?.('about', 'Nossa Visão')} className="hover:text-teal-400 transition-colors">Nossa Visão</button></li>
              <li><a href="/ferramentas-ia" onClick={(e) => onNavigate('/ferramentas-ia', e)} className="hover:text-teal-400 transition-colors">Guia de Ferramentas IA</a></li>
              <li><a href="/carreiras" onClick={(e) => onNavigate('/carreiras', e)} className="hover:text-teal-400 transition-colors">Trabalhe Conosco</a></li>
              <li><a href="https://painel.iahospital.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors text-left text-teal-500">Para Médicos</a></li>
            </ul>
          </nav>

          <nav aria-label="Segurança e Compliance">
            <h3 className="font-bold mb-8 text-white text-xs uppercase tracking-[0.2em]">Segurança & Compliance</h3>
            <ul className="space-y-4 text-slate-300 text-sm font-semibold uppercase tracking-widest">
              <li><button onClick={() => onOpenLegal?.('privacy', 'Política de Privacidade')} className="hover:text-teal-400 transition-colors text-left">Privacidade</button></li>
              <li><button onClick={() => onOpenLegal?.('terms', 'Termos de Uso')} className="hover:text-teal-400 transition-colors text-left">Termos de Uso</button></li>
              <li><a href="/status" onClick={(e) => onNavigate('/status', e)} className="hover:text-teal-400 transition-colors">Status do Sistema</a></li>
              <li><button onClick={onAdminOpen} aria-label="Abrir painel administrativo" className="hover:text-white transition-colors text-left text-slate-500 text-[9px]">Flame Engine 3.1</button></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-[0.3em]">
            © 2024 IA HOSPITAL • FLAME WORK ENGINE
          </p>
          <div className="flex gap-8 text-[10px] uppercase font-semibold tracking-[0.2em] text-slate-400">
            <button onClick={() => onOpenLegal?.('privacy', 'Privacidade')} className="hover:text-white transition-colors">LGPD</button>
            <button onClick={() => onOpenLegal?.('terms', 'Termos')} className="hover:text-white transition-colors">HIPAA</button>
            <span className="cursor-default text-emerald-400">SOC2 COMPLIANT</span>
          </div>
        </div>
        
        <div className="mt-12 p-8 bg-slate-900/50 rounded-3xl border border-white/5 backdrop-blur-sm">
          <p className="text-[10px] text-slate-300 leading-relaxed text-center uppercase tracking-widest font-semibold">
            AVISO LEGAL: A triagem fornecida é de natureza educativa. Protocolos de emergência devem ser acionados via 192 em {location?.city}. Transmissão criptografada sob padrão Rizk-256.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
