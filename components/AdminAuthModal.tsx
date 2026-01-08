
import React, { useState } from 'react';

interface AdminAuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'IAHOSPITAL#2024') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-600/20 text-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A5 5 0 0014.142 11.858" /></svg>
          </div>
          <h2 className="text-white font-black uppercase tracking-tighter text-xl">Acesso Restrito</h2>
          <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-2">Flame Work Local SEO Engine</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-200 uppercase tracking-widest ml-1">Senha Administrativa</label>
            <input 
              type="password"
              autoFocus
              className={`w-full p-4 bg-slate-950 border-2 rounded-2xl text-white outline-none transition-all ${error ? 'border-red-600' : 'border-white/10 focus:border-orange-600'}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center mt-2 animate-bounce">Senha Incorreta</p>}
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button 
              type="submit"
              className="w-full py-5 bg-orange-700 hover:bg-orange-600 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-orange-950/40 border-b-4 border-orange-900"
            >
              Autenticar
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-bold uppercase tracking-widest rounded-2xl transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>

        <p className="text-xs text-slate-400 text-center mt-8 uppercase font-bold tracking-tight">
          Sua conexão é criptografada e protegida.
        </p>
      </div>
    </div>
  );
};

export default AdminAuthModal;
