
import React from 'react';
import { UserLocation, BRAZIL_STATES } from '../types';

interface FooterProps {
  onAdminOpen?: () => void;
  location?: UserLocation;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen, location }) => {
  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* SEO Directory - Crucial for Bot Indexing */}
        <div className="mb-16 pb-12 border-b border-white/5">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Diretório de Atendimento Regional</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {BRAZIL_STATES.slice(0, 15).map(state => (
              <a 
                key={state} 
                href={`/atendimento/${state.toLowerCase()}/capital`}
                className="text-[11px] font-bold text-slate-400 hover:text-blue-500 transition-colors uppercase"
              >
                Médicos em {state}
              </a>
            ))}
            <span className="text-[11px] font-bold text-slate-600">... e mais 12 estados</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">IA</div>
              <span className="font-bold text-xl uppercase tracking-tighter">IA HOSPITAL</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Plataforma brasileira pioneira em triagem médica por Inteligência Artificial em {location?.city || 'todo o Brasil'}. Orientação educativa centrada no paciente.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-blue-400 text-sm uppercase tracking-widest">Acesso Rápido</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#assistente" className="hover:text-white transition-colors">Orientação Médica</a></li>
              <li><a href="#orientacao" className="hover:text-white transition-colors">Especialidades</a></li>
              <li>
                <button onClick={onAdminOpen} className="hover:text-white transition-colors text-left uppercase text-[10px] font-black tracking-widest">
                  Flame SEO Admin
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-blue-400 text-sm uppercase tracking-widest">Contato</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li>contato@iahospital.com.br</li>
              <li>São Paulo, SP - Brasil</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © 2024 IA HOSPITAL • Flame Work Local SEO Engine
          </p>
          <div className="flex gap-6 text-[9px] uppercase font-black tracking-[0.2em] text-slate-600">
            <span>Privacidade</span>
            <span>Termos</span>
            <span>EEAT Compliance</span>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-[9px] text-slate-500 leading-relaxed text-center uppercase tracking-tighter">
            IMPORTANTE: Este serviço fornece apenas orientação médica educativa. Em caso de dor súbita ou emergência, ligue imediatamente para o SAMU (192) ou procure o hospital mais próximo em {location?.city}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
