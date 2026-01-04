
import React from 'react';
import { UserLocation, BRAZIL_STATES } from '../types';

interface FooterProps {
  onAdminOpen?: () => void;
  onProfOpen?: () => void;
  location?: UserLocation;
  isAuthorized?: boolean;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen, onProfOpen, location, isAuthorized }) => {
  const whatsappUrl = "https://wa.me/5511932046970?text=Sou%20profissional%20e%20quero%20me%20cadastrar%20no%20IA%20Hospital";

  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner para Profissionais de Saúde */}
        <div className="mb-16 bg-blue-600/10 border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl -z-0"></div>
          <div className="text-center md:text-left relative z-10">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Para Profissionais de Saúde</h3>
            <p className="text-slate-400 text-sm max-w-md">
              Deseja receber indicações de pacientes triados pela nossa IA em <span className="text-blue-400 font-bold">{location?.city || 'sua região'}</span>? Cadastre sua clínica ou consultório agora.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <button 
              onClick={onProfOpen}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 whitespace-nowrap"
            >
              Cadastrar Consultório
            </button>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-500/20 whitespace-nowrap flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Cadastro Profissional
            </a>
          </div>
        </div>

        {/* SEO Directory - Oculto do público, visível apenas para admin logado ou bots via HTML puro */}
        {isAuthorized && (
          <div className="mb-16 pb-12 border-b border-white/5 animate-fade-in">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Diretório de Atendimento Regional (Admin Mode)</h4>
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
        )}

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
                <button onClick={onProfOpen} className="hover:text-white transition-colors text-left font-bold text-blue-400">
                  Área do Profissional
                </button>
              </li>
              <li>
                <button onClick={onAdminOpen} className="hover:text-white transition-colors text-left uppercase text-[10px] font-black tracking-widest opacity-30">
                  {isAuthorized ? 'Flame SEO Dashboard' : 'Admin Login'}
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
