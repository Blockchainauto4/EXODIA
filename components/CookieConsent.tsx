
import React, { useState, useEffect, memo } from 'react';

const CookieConsent: React.FC<{ onOpenPrivacy: () => void }> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ia-hospital-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ia-hospital-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[1000] animate-slide-up">
      <div className="max-w-5xl mx-auto bg-slate-950 border-4 border-slate-700 rounded-[2.5rem] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-center justify-between gap-8 ring-2 ring-white/10 opacity-100">
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-teal-800 rounded-3xl flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-teal-700/40 border border-teal-600/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div className="text-left">
            <h4 className="text-teal-400 font-bold uppercase tracking-[0.2em] text-xs mb-2">Conformidade LGPD & Segurança</h4>
            <h3 className="text-white font-bold text-xl mb-2 tracking-tight">Experiência Médica Personalizada</h3>
            <p className="text-slate-100 text-sm leading-relaxed font-bold">
              Utilizamos cookies técnicos e geolocalização para processar seu atendimento <span className="text-white font-bold underline decoration-teal-500 underline-offset-4">onde você está agora</span>. Isso é essencial para triagens precisas e seguras. Ao continuar, você aceita nossa <button onClick={onOpenPrivacy} className="text-teal-400 font-bold underline hover:text-teal-300 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded">Política de Privacidade</button>.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
          <button 
            onClick={handleAccept}
            aria-label="Aceitar todos os cookies e continuar"
            className="flex-grow lg:flex-none px-12 py-5 bg-teal-800 hover:bg-teal-700 text-white font-bold uppercase tracking-widest text-xs rounded-2xl transition-all shadow-2xl shadow-teal-800/40 hover:scale-[1.02] active:scale-95 border-b-4 border-teal-950"
          >
            Aceitar e Continuar
          </button>
          <button 
            onClick={onOpenPrivacy}
            aria-label="Ver configurações de privacidade"
            className="flex-grow lg:flex-none px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-2xl transition-all border-2 border-white/20 hover:scale-[1.02]"
          >
            Configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CookieConsent);
