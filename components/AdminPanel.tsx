
import React, { useState, useEffect } from 'react';
import { UserLocation, BRAZIL_STATES, SPECIALTIES, CITIES_BY_STATE } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  onApply: (loc: UserLocation) => void;
  currentLocation: UserLocation;
  onOpenProcessing?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onApply, currentLocation, onOpenProcessing }) => {
  // Inicialização segura do formulário com fallback para especialidades válidas
  const [form, setForm] = useState<UserLocation>({
    state: currentLocation.state === 'Brasil' ? 'SP' : currentLocation.state,
    city: currentLocation.city === 'sua região' ? 'São Paulo' : currentLocation.city,
    specialty: SPECIALTIES.includes(currentLocation.specialty || '') ? currentLocation.specialty : SPECIALTIES[0]
  });

  // Garante que a cidade seja válida ao trocar o estado
  useEffect(() => {
    const stateCities = CITIES_BY_STATE[form.state] || [];
    if (!stateCities.includes(form.city)) {
      setForm(prev => ({ ...prev, city: stateCities[0] || '' }));
    }
  }, [form.state]);

  const handleApply = () => {
    const slugCity = (form.city || 'geral').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-');
    const slugSpec = (form.specialty || 'atendimento-medico').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-');
    const newPath = `/atendimento/${form.state.toLowerCase()}/${slugCity}/${slugSpec}`;
    
    window.history.pushState({}, '', newPath);
    onApply(form);
    onClose();
  };

  const cities = CITIES_BY_STATE[form.state] || [];

  return (
    <div className="fixed inset-0 z-[500] flex justify-end">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-900 h-full border-l border-white/10 p-8 flex flex-col animate-slide-left shadow-2xl">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-white font-black uppercase tracking-tighter text-2xl flex items-center gap-2">
              <span className="text-orange-500">🔥</span> Flame Work
            </h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">SEO Engine v3.1</p>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Fechar painel administrativo"
            className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow space-y-8 overflow-y-auto custom-scrollbar pr-2">
          
          <button 
            onClick={onOpenProcessing}
            aria-label="Abrir painel de processamento de indexação"
            className="w-full p-6 bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-[2rem] border border-orange-400/20 shadow-xl shadow-orange-950/20 flex items-center justify-between group hover:scale-[1.02] transition-all"
          >
            <div className="text-left">
              <p className="text-sm font-black uppercase tracking-widest">Instant Indexing</p>
              <p className="text-[10px] opacity-70 mt-1">Processar URLs & Auditoria Gemini</p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20">
              <span className="text-xl" aria-hidden="true">⚡</span>
            </div>
          </button>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-white/5 pb-2">Configurações de Localidade</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="select-state" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Estado (UF)</label>
                <select 
                  id="select-state"
                  className="w-full p-3 bg-slate-950 border border-white/5 rounded-xl text-white text-xs font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                  value={form.state}
                  onChange={e => setForm({...form, state: e.target.value})}
                >
                  {BRAZIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="select-city" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cidade</label>
                <select 
                  id="select-city"
                  className="w-full p-3 bg-slate-950 border border-white/5 rounded-xl text-white text-xs font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                  value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="select-specialty" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidade Médica</label>
              <select 
                id="select-specialty"
                className="w-full p-3 bg-slate-950 border border-white/5 rounded-xl text-white text-xs font-bold focus:ring-2 focus:ring-orange-500 outline-none"
                value={form.specialty}
                onChange={e => setForm({...form, specialty: e.target.value})}
              >
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Preview de URL Canônica</h4>
            <div className="bg-slate-950 p-3 rounded-lg border border-white/5 overflow-x-auto">
              <code className="text-[10px] text-emerald-400 whitespace-nowrap">
                iahospital.com.br/atendimento/{form.state.toLowerCase()}/{(form.city || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-')}/{(form.specialty || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-')}
              </code>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex gap-4">
          <button 
            onClick={handleApply}
            aria-label="Aplicar e salvar novas configurações de SEO"
            className="flex-grow py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-900/40 active:scale-95"
          >
            Aplicar & Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
