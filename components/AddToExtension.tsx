
import React, { useState, useEffect } from 'react';

const AddToExtension: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('extension-prompt-dismissed');
    if (isDismissed !== 'true') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('extension-prompt-dismissed', 'true');
    setIsVisible(false);
  };

  const handleAdd = () => {
    alert("Redirecionando para a loja de extensões... (Simulação)");
    handleDismiss();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[160] w-[90%] max-w-2xl animate-fade-in">
      <div className="bg-slate-950 rounded-2xl shadow-2xl p-6 flex flex-col sm:flex-row items-center gap-6 border-2 border-white/10">
        <div className="w-12 h-12 bg-teal-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
          IA
        </div>
        <div className="text-center sm:text-left flex-grow">
          <h3 className="text-white font-bold">Adicione o IA HOSPITAL à sua barra de ferramentas</h3>
          <p className="text-slate-300 text-sm mt-1">Acesso rápido à triagem de IA com um clique. Instale nossa extensão para uma experiência integrada.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleAdd}
            className="px-5 py-2 bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors"
          >
            Adicionar
          </button>
          <button 
            onClick={handleDismiss}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Dispensar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToExtension;
