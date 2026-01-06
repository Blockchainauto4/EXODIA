
import React, { useState, useEffect } from 'react';
import { UserLocation, BRAZIL_STATES, SPECIALTIES, CITIES_BY_STATE } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  onApply: (loc: UserLocation) => void;
  currentLocation: UserLocation;
  onOpenProcessing?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onApply, currentLocation, onOpenProcessing }) => {
  const [form, setForm] = useState<UserLocation>({
    state: currentLocation.state === 'Brasil' ? 'SP' : currentLocation.state,
    city: currentLocation.city === 'sua região' ? 'São Paulo' : currentLocation.city,
    specialty: SPECIALTIES.includes(currentLocation.specialty || '') ? currentLocation.specialty : SPECIALTIES[0]
  });

  useEffect(() => {
    const stateCities = CITIES_BY_STATE[form.state] || [];
    if (!stateCities.includes(form.city)) {
      setForm(prev => ({ ...prev, city: stateCities[0] || '' }));
    }
  }, [form.state]);

  const handleApply = () => {
    const slugCity = (form.city || 'geral').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-');
    const slugSpec = (form.specialty || 'atendimento-medico').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-');
    // Forçamos a estrutura de URL para SEO local 'perto-de-mim'
    const finalSlugSpec = slugSpec.includes('perto') || slugSpec.includes('proximo') ? slugSpec : `${slugSpec}-perto-de-mim`;
    const newPath = `/atendimento/${form.state.toLowerCase()}/${slugCity}/${finalSlugSpec}`;
    
    window.history.pushState({}, '', newPath);
    onApply({ ...form, specialty: form.specialty });
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
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">SEO Engine Perto de Mim</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow space-y-8 overflow-y-auto custom-scrollbar pr-2">
          <button onClick={onOpenProcessing} className="w-full p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-[2rem] border border-blue-400/20 shadow-xl flex items-center justify-between group hover:scale-[1.02] transition-all">
            <div className="text-left">
              <p className="text-sm font-black uppercase tracking-widest">Geração Local</p>
              <p className="text-xs opacity-70 mt-1">Indexar {form.specialty} em {form.city}</p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">⚡</div>
          </button>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-white/10 pb-2">Parâmetros Geográficos</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-widest">Estado</label>
                <select 
                  className="w-full p-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-bold"
                  value={form.state}
                  onChange={e => setForm({...form, state: e.target.value})}
                >
                  {BRAZIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 uppercase tracking-widest">Cidade</label>
                <select 
                  className="w-full p-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-bold"
                  value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                >
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-300 uppercase tracking-widest">Unidade / Categoria</label>
              <select 
                className="w-full p-3 bg-slate-950 border border-white/10 rounded-xl text-white text-xs font-bold"
                value={form.specialty}
                onChange={e => setForm({...form, specialty: e.target.value})}
              >
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-2xl">
            <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Meta Title Preview</h4>
            <p className="text-xs text-white font-bold italic">
              "{form.specialty} Perto de Mim em {form.city} | Aberto Agora 24h"
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex gap-4">
          <button 
            onClick={handleApply}
            className="flex-grow py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl active:scale-95"
          >
            Gerar Página Local
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
