
import React, { useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onAdminSuccess: () => void;
  onProfessionalRegister: () => void;
  initialTab?: 'professional' | 'admin';
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAdminSuccess, onProfessionalRegister, initialTab = 'professional' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [password, setPassword] = useState('');
  const [crm, setCrm] = useState('');
  const [error, setError] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'IAHOSPITAL#2024') {
      onAdminSuccess();
    } else {
      setError('Senha Administrativa Incorreta');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleProfessionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login profissional (simulada)
    setError('CRM ou senha inválidos (funcionalidade em desenvolvimento).');
    setTimeout(() => setError(''), 3000);
  };
  
  const TabButton: React.FC<{ tabId: string; children: React.ReactNode }> = ({ tabId, children }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all rounded-t-2xl ${
        activeTab === tabId
          ? 'bg-slate-900 text-white'
          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl animate-fade-in overflow-hidden">
        <div className="flex">
          <TabButton tabId="professional">Profissional</TabButton>
          <TabButton tabId="admin">Admin</TabButton>
        </div>

        {activeTab === 'professional' && (
          <div className="p-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-600/20 text-teal-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h2 className="text-white font-bold uppercase tracking-tighter text-xl">Acesso Médico</h2>
              <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-2">Plataforma de Gestão e Triagem</p>
            </div>
            <form onSubmit={handleProfessionalSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-200 uppercase tracking-widest ml-1">CRM</label>
                <input type="text" value={crm} onChange={e => setCrm(e.target.value)} className="w-full mt-1 p-4 bg-slate-950 border-2 rounded-2xl text-white outline-none border-white/10 focus:border-teal-500" placeholder="000000-UF" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-200 uppercase tracking-widest ml-1">Senha</label>
                <input type="password" className="w-full mt-1 p-4 bg-slate-950 border-2 rounded-2xl text-white outline-none border-white/10 focus:border-teal-500" placeholder="••••••••" />
              </div>
              {error && activeTab === 'professional' && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center pt-2">{error}</p>}
              <div className="pt-4 space-y-3">
                <button type="submit" className="w-full py-5 bg-teal-700 hover:bg-teal-600 text-white font-bold uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-teal-950/40 border-b-4 border-teal-900">
                  Entrar
                </button>
                <button type="button" onClick={onProfessionalRegister} className="w-full text-center text-xs text-slate-400 hover:text-white font-bold uppercase tracking-widest">
                  Não tem uma conta? Cadastre sua unidade
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="p-8 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-600/20 text-orange-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A5 5 0 0014.142 11.858" /></svg>
              </div>
              <h2 className="text-white font-bold uppercase tracking-tighter text-xl">Acesso Restrito</h2>
              <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-2">Flame Work SEO Engine</p>
            </div>
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-200 uppercase tracking-widest ml-1">Senha Administrativa</label>
                <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full mt-1 p-4 bg-slate-950 border-2 rounded-2xl text-white outline-none transition-all ${error && activeTab === 'admin' ? 'border-red-600' : 'border-white/10 focus:border-orange-600'}`} placeholder="••••••••" />
              </div>
              {error && activeTab === 'admin' && <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center pt-2 animate-bounce">{error}</p>}
              <div className="pt-4 space-y-3">
                <button type="submit" className="w-full py-5 bg-orange-700 hover:bg-orange-600 text-white font-bold uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-orange-950/40 border-b-4 border-orange-900">
                  Autenticar
                </button>
                <button type="button" onClick={onClose} className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-bold uppercase tracking-widest rounded-2xl transition-all">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
