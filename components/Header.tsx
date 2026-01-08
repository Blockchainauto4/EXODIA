
import React, { useState, memo } from 'react';

interface HeaderProps {
  isScrolled: boolean;
  onAdminOpen: () => void;
  onPatientOpen: () => void;
  onNavigate: (path: string, e: React.MouseEvent) => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, onAdminOpen, onPatientOpen, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavAndCloseMenu = (path: string, e: React.MouseEvent, isFaq: boolean = false) => {
    e.preventDefault();
    onNavigate(path, e);
    setIsMobileMenuOpen(false);
    if (isFaq) {
      setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };
  
  const handleFaqClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/', e);
    setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 text-white ${
      isScrolled ? 'bg-slate-950/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href="/" onClick={(e) => onNavigate('/', e)} className="flex items-center gap-3" aria-label="Página inicial do IA HOSPITAL">
          <div className="w-9 h-9 bg-teal-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md shadow-teal-600/20">IA</div>
          <span className="font-bold text-lg text-white">IA Hospital</span>
        </a>
        
        <nav className="hidden lg:flex gap-6 items-center">
          <a href="/" onClick={handleFaqClick} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Perguntas</a>
          <a href="/carreiras" onClick={(e) => onNavigate('/carreiras', e)} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Vagas Médicas</a>
          <a href="/medicos" onClick={(e) => onNavigate('/medicos', e)} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Para Médicos</a>
          <a href="/ferramentas-ia" onClick={(e) => onNavigate('/ferramentas-ia', e)} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Ferramentas IA</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={onPatientOpen} 
              aria-label="Acessar portal do paciente"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Portal do Paciente
            </button>
            <a 
              href="/medicos"
              onClick={(e) => onNavigate('/medicos', e)}
              aria-label="Acessar portal para médicos e profissionais de saúde"
              className="px-4 py-2 bg-white hover:bg-slate-200 text-slate-900 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
            >
              Área Médica
            </a>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:bg-white/10 rounded-lg transition-colors"
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900 border-b border-white/10 p-4 space-y-2 animate-fade-in shadow-lg">
          <a href="/" onClick={(e) => handleNavAndCloseMenu('/', e, true)} className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-200 hover:bg-white/10">Perguntas</a>
          <a href="/carreiras" onClick={(e) => handleNavAndCloseMenu('/carreiras', e)} className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-200 hover:bg-white/10">Vagas Médicas</a>
          <a href="/medicos" onClick={(e) => handleNavAndCloseMenu('/medicos', e)} className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-200 hover:bg-white/10">Para Médicos</a>
          <a href="/ferramentas-ia" onClick={(e) => handleNavAndCloseMenu('/ferramentas-ia', e)} className="block px-4 py-3 rounded-lg text-base font-semibold text-slate-200 hover:bg-white/10">Ferramentas IA</a>
          <div className="pt-2 mt-2 border-t border-white/10 space-y-2">
             <a href="/medicos" onClick={(e) => handleNavAndCloseMenu('/medicos', e)} className="block w-full text-center px-4 py-3 rounded-lg text-base font-semibold text-slate-900 bg-white hover:bg-slate-200">Área Médica</a>
             <button onClick={() => { onPatientOpen(); setIsMobileMenuOpen(false); }} className="block w-full px-4 py-3 rounded-lg text-base font-semibold text-white bg-white/10 hover:bg-white/20">Portal do Paciente</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
