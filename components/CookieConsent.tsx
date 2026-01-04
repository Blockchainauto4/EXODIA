
import React, { useState, useEffect } from 'react';

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
          <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-3xl shrink-0 shadow-lg shadow-blue-500/40 border border-blue-400/30">🍪</div>
          <div className="text-left">
            <h4 className="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Conformidade LGPD & Segurança</h4>
            <h3 className="text-white font-bold text-xl mb-2 tracking-tight">Experiência Médica Personalizada</h3>
            <p className="text-slate-100 text-sm leading-relaxed max-w-2xl font-bold">
              Utilizamos cookies técnicos e geolocalização para processar seu atendimento <span className="text-white font-black underline decoration-blue-500 underline-offset-4">onde você está agora</span>. Isso é essencial para triagens precisas e seguras. Ao continuar, você aceita nossa <button onClick={onOpenPrivacy} className="text-blue-400 font-black underline hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Política de Privacidade</button>.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full lg:w-auto">
          <button 
            onClick={handleAccept}
            aria-label="Aceitar todos os cookies e continuar"
            className="flex-grow lg:flex-none px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-2xl shadow-blue-900/40 hover:scale-[1.02] active:scale-95 border-b-4 border-blue-800"
          >
            Aceitar e Continuar
          </button>
          <button 
            onClick={onOpenPrivacy}
            aria-label="Ver configurações de privacidade"
            className="flex-grow lg:flex-none px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all border-2 border-white/20 hover:scale-[1.02]"
          >
            Configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
