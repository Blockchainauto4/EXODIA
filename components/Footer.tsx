
import React from 'react';
import { UserLocation, BRAZIL_STATES, LegalModalType } from '../types';

interface FooterProps {
  onAdminOpen?: () => void;
  onProfOpen?: () => void;
  onOpenLegal?: (type: LegalModalType, title: string) => void;
  location?: UserLocation;
  isAuthorized?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen, onProfOpen, onOpenLegal, location, isAuthorized }) => {
  return (
    <footer className="bg-slate-950 text-white py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        {/* Enterprise Credential Banner */}
        <div className="mb-20 bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-[3rem] p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] -z-0"></div>
          <div className="text-center lg:text-left relative z-10 max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-300 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-500/20">Enterprise Division</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white leading-none">Credenciamento de Unidades</h2>
            <p className="text-slate-300 text-base font-medium leading-relaxed">
              Expanda sua operação médica em <span className="text-white font-bold">{location?.city || 'sua região'}</span> integrando-se à governança do IA HOSPITAL. Oferecemos assentos profissionais limitados para especialistas e clínicas de alta performance.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
            <button 
              onClick={onProfOpen} 
              aria-label="Solicitar assento profissional na rede IA Hospital"
              className="px-12 py-6 bg-white text-slate-950 font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Solicitar Assento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8 text-white">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-lg shadow-lg shadow-blue-500/20">IA</div>
              <p className="font-black text-2xl uppercase tracking-tighter">IA HOSPITAL</p>
            </div>
            <p className="text-slate-300 max-w-sm mb-8 font-medium leading-relaxed italic">
              "Governança, Tecnologia e Segurança em Saúde. Uma visão enterprise transmitida por <span className="text-white font-bold">Bruno Audric Bittencourt Rizk</span> para todo o Brasil."
            </p>
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group hover:border-blue-500 transition-all shadow-xl" aria-hidden="true">
                <span className="text-2xl group-hover:scale-110 transition-transform">🏢</span>
              </div>
              <div>
                <h3 className="text-[10px] font-black text-slate-200 uppercase tracking-widest leading-tight mb-1">
                  Institutional Governance
                </h3>
                <p className="text-[8px] text-blue-400 font-black uppercase tracking-[0.2em]">Rizk Certified Enterprise</p>
              </div>
            </div>
          </div>
          
          <nav aria-label="Links estratégicos">
            <h3 className="font-black mb-8 text-white text-xs uppercase tracking-[0.2em]">Strategic Links</h3>
            <ul className="space-y-4 text-slate-300 text-sm font-bold uppercase tracking-widest">
              <li><button onClick={() => onOpenLegal?.('about', 'Visão Institucional')} className="hover:text-blue-400 transition-colors">Enterprise Vision</button></li>
              <li><button onClick={() => onOpenLegal?.('about', 'Board of Directors')} className="hover:text-blue-400 transition-colors">The Board</button></li>
              <li><a href="/carreiras" className="hover:text-blue-400 transition-colors">Trabalhe Conosco</a></li>
              <li><button onClick={onProfOpen} className="hover:text-blue-400 transition-colors text-left text-blue-500">Professional Seats</button></li>
            </ul>
          </nav>

          <nav aria-label="Segurança e Compliance">
            <h3 className="font-black mb-8 text-white text-xs uppercase tracking-[0.2em]">Security & Compliance</h3>
            <ul className="space-y-4 text-slate-300 text-sm font-bold uppercase tracking-widest">
              <li><button onClick={() => onOpenLegal?.('privacy', 'Data Privacy Protocol')} className="hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegal?.('terms', 'Governance Terms')} className="hover:text-blue-400 transition-colors text-left">Usage Terms</button></li>
              <li><button onClick={() => onOpenLegal?.('data', 'Cyber Resilience')} className="hover:text-blue-400 transition-colors text-left">Data Security</button></li>
              <li><button onClick={onAdminOpen} aria-label="Abrir painel administrativo" className="hover:text-white transition-colors text-left opacity-30 text-[9px]">Flame Engine 3.1</button></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
            © 2024 IA HOSPITAL ENTERPRISE • FLAME WORK ENGINE
          </p>
          <div className="flex gap-8 text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">
            <button onClick={() => onOpenLegal?.('privacy', 'Privacy')} className="hover:text-white transition-colors">GDPR</button>
            <button onClick={() => onOpenLegal?.('terms', 'Terms')} className="hover:text-white transition-colors">HIPAA</button>
            <span className="cursor-default text-emerald-400">SOC2 COMPLIANT</span>
          </div>
        </div>
        
        <div className="mt-12 p-8 bg-slate-900/50 rounded-3xl border border-white/5 backdrop-blur-sm">
          <p className="text-[10px] text-slate-300 leading-relaxed text-center uppercase tracking-widest font-black">
            AVISO INSTITUCIONAL: A triagem fornecida é de natureza educativa. Protocolos de emergência devem ser acionados via 192 em {location?.city}. Transmissão criptografada sob padrão Rizk Enterprise-256.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;