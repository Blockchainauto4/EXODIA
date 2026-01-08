
import React, { useState, memo } from 'react';
import { UserLocation } from '../types';

interface HeaderProps {
  isScrolled: boolean;
  location: UserLocation;
  onAdminOpen: () => void;
  onPatientOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, location, onAdminOpen, onPatientOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3" aria-label="Página inicial do IA HOSPITAL">
          <div className="w-9 h-9 bg-teal-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-600/20">IA</div>
          <span className={`font-bold text-lg text-slate-900`}>IA Hospital</span>
        </a>
        
        <nav className="hidden lg:flex gap-6 items-center">
          <a href="/#orientacao" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Triagem IA</a>
          <a href="/carreiras" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Vagas Médicas</a>
          <a href="/medicos" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Para Médicos</a>
          <a href="/ferramentas-ia" className="text-sm font-semibold text-slate-600 hover:text-teal-600 transition-colors">Ferramentas IA</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={onPatientOpen} 
              aria-label="Acessar portal do paciente"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-bold transition-colors"
            >
              Portal do Paciente
            </button>
            <a 
              href="/medicos"
              aria-label="Acessar portal para médicos e profissionais de saúde"
              className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
            >
              Área Médica
            </a>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-4 space-y-2 animate-fade-in shadow-lg">
          <a href="/#orientacao" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100">Triagem IA</a>
          <a href="/carreiras" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100">Vagas Médicas</a>
          <a href="/medicos" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100">Para Médicos</a>
          <a href="/ferramentas-ia" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100">Ferramentas IA</a>
          <div className="pt-2 mt-2 border-t border-slate-200 space-y-2">
             <a href="/medicos" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center px-4 py-3 rounded-lg text-base font-bold text-white bg-slate-900 hover:bg-black">Área Médica</a>
             <button onClick={() => { onPatientOpen(); setIsMobileMenuOpen(false); }} className="block w-full px-4 py-3 rounded-lg text-base font-bold text-slate-800 bg-slate-100 hover:bg-slate-200">Portal do Paciente</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
