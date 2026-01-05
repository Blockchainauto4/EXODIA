import React from 'react';
import { UserLocation, BRAZIL_STATES } from '../types';

interface FooterProps {
  onAdminOpen?: () => void;
  onProfOpen?: () => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'data', title: string) => void;
  location?: UserLocation;
  isAuthorized?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen, onProfOpen, onOpenLegal, location, isAuthorized }) => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner para Profissionais */}
        <div className="mb-16 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl -z-0"></div>
          <div className="text-center md:text-left relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white">Para Profissionais de Saúde</h3>
            <p className="text-slate-400 text-sm max-w-md">
              Deseja receber indicações de pacientes triados pela nossa IA em <span className="text-blue-400 font-bold">{location?.city || 'sua região'}</span>? Cadastre sua unidade.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <button onClick={onProfOpen} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 whitespace-nowrap">
              Cadastrar Unidade
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">IA</div>
              <span className="font-bold text-xl uppercase tracking-tighter">IA HOSPITAL</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Plataforma brasileira pioneira em triagem médica por IA em {location?.city || 'todo o Brasil'}. Orientação educativa centrada no paciente.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-blue-400 text-sm uppercase tracking-widest">Acesso Rápido</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#inicio" className="hover:text-white transition-colors">Orientação Médica</a></li>
              <li><a href="#orientacao" className="hover:text-white transition-colors">Especialidades</a></li>
              <li><button onClick={onProfOpen} className="hover:text-white transition-colors text-left font-bold text-blue-400">Área do Profissional</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-blue-400 text-sm uppercase tracking-widest">Jurídico & Dados</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><button onClick={() => onOpenLegal?.('privacy', 'Política de Privacidade')} className="hover:text-white transition-colors text-left">Privacidade</button></li>
              <li><button onClick={() => onOpenLegal?.('terms', 'Termos de Uso')} className="hover:text-white transition-colors text-left">Termos de Uso</button></li>
              <li><button onClick={() => onOpenLegal?.('data', 'Captura de Dados')} className="hover:text-white transition-colors text-left">Tratamento de Dados</button></li>
              <li><button onClick={onAdminOpen} className="hover:text-white transition-colors text-left uppercase text-xs font-black tracking-widest opacity-40">Admin Dashboard</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
            © 2024 IA HOSPITAL • Flame Work Local SEO Engine
          </p>
          <div className="flex gap-6 text-xs uppercase font-black tracking-[0.2em] text-slate-500">
            <button onClick={() => onOpenLegal?.('privacy', 'Política de Privacidade')} className="hover:text-white transition-colors">Privacidade</button>
            <button onClick={() => onOpenLegal?.('terms', 'Termos de Uso')} className="hover:text-white transition-colors">Termos</button>
            <span className="cursor-default">EEAT Compliance</span>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-xs text-slate-400 leading-relaxed text-center uppercase tracking-tighter font-medium">
            IMPORTANTE: Este serviço fornece apenas orientação médica educativa. Em caso de emergência, ligue imediatamente para o SAMU (192) em {location?.city}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;