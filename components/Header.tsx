
import React, { useState } from 'react';
import { UserLocation } from '../types';

interface HeaderProps {
  isScrolled: boolean;
  location: UserLocation;
  onAdminOpen: () => void;
  onPatientOpen: () => void;
  onDoctorOpen: () => void;
  onLiveOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, location, onAdminOpen, onPatientOpen, onDoctorOpen, onLiveOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">IA</div>
          <span className={`font-black text-xl tracking-tighter text-slate-900 uppercase`}>IA HOSPITAL</span>
        </div>
        
        <nav className="hidden lg:flex gap-8 items-center">
          <div className="flex items-center gap-6">
            <a href="#orientacao" className="text-[10px] font-black text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">Triagem IA</a>
            <a href="#vagas" className="text-[10px] font-black text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">Vagas Médicas</a>
            <button onClick={onLiveOpen} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center gap-2 shadow-xl shadow-blue-500/10 border border-white/10">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              Consulta Pro (Grátis)
            </button>
          </div>
          
          <div className="w-[1px] h-6 bg-slate-200 mx-2"></div>
          
          <div className="flex gap-4">
            <button onClick={onPatientOpen} className="text-[10px] font-black text-blue-600 hover:bg-blue-50 transition-colors uppercase tracking-widest px-4 py-2 border-2 border-blue-600 rounded-xl">Acesso Paciente</button>
            <button onClick={onDoctorOpen} className="text-[10px] font-black text-white bg-slate-900 hover:bg-black transition-colors uppercase tracking-widest px-4 py-2 rounded-xl border border-white/10 shadow-lg">Médico: Grátis</button>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100 mr-2">
            <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest leading-none">Custo Zero</span>
          </div>

          <button 
            onClick={onAdminOpen}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors hidden sm:block"
            title="Acessar Configurações Flame Work SEO"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 shadow-sm">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest whitespace-nowrap">
              {location.city}
            </span>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 space-y-4 animate-fade-in shadow-2xl">
          <button onClick={() => { onLiveOpen(); setIsMobileMenuOpen(false); }} className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Consulta Pro (Gratuita)
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => { onPatientOpen(); setIsMobileMenuOpen(false); }} className="py-4 border-2 border-blue-600 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest">Paciente: Free</button>
            <button onClick={() => { onDoctorOpen(); setIsMobileMenuOpen(false); }} className="py-4 bg-slate-100 text-slate-700 rounded-2xl text-[10px] font-black uppercase tracking-widest">Médico: Free</button>
          </div>
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 gap-4">
            <a href="#orientacao" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] font-black text-slate-500 uppercase tracking-widest block text-center">Triagem Inteligente Grátis</a>
            <a href="#vagas" onClick={() => setIsMobileMenuOpen(false)} className="text-[10px] font-black text-slate-500 uppercase tracking-widest block text-center">Vagas na Região</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
