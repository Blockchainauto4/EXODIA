import React from 'react';
import { UserLocation } from '../types';

interface HeaderProps {
  isScrolled: boolean;
  location: UserLocation;
  onAdminOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, location, onAdminOpen }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">IA</div>
          <span className={`font-black text-xl tracking-tighter text-blue-900`}>IA HOSPITAL</span>
        </div>
        
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#inicio" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">Início</a>
          <a href="#orientacao" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">Especialidades</a>
          <a href="#faq" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">FAQ</a>
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={onAdminOpen}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
            title="Acessar Configurações Flame Work SEO"
            aria-label="Painel Administrativo SEO"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-bold text-blue-700 uppercase tracking-wider whitespace-nowrap">
              {location.city}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;