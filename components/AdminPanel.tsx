
import React, { useState, useEffect, useCallback } from 'react';
import { UserLocation, BRAZIL_STATES, SPECIALTIES, CITIES_BY_STATE } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  onApply: (loc: UserLocation) => void;
  currentLocation: UserLocation;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onApply, currentLocation }) => {
  const [allStates, setAllStates] = useState(false);
  const [allCities, setAllCities] = useState(false);
  const [customCity, setCustomCity] = useState('');
  const [useCustomCity, setUseCustomCity] = useState(false);
  const [liveSync, setLiveSync] = useState(true);
  
  const [form, setForm] = useState<UserLocation>(() => {
    const initialState = (currentLocation.state === 'Brasil' || currentLocation.state === 'Brasil (Todos)') ? 'SP' : currentLocation.state;
    const initialCity = currentLocation.city === 'sua região' || currentLocation.city === 'sua cidade atual' ? (CITIES_BY_STATE[initialState]?.[0] || '') : currentLocation.city;
    
    return {
      city: initialCity,
      state: initialState,
      specialty: currentLocation.specialty || 'Atendimento Médico'
    };
  });

  const generateSlug = (text: string) => 
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  const getRelativePath = useCallback((state: string, city: string, specialty: string) => {
    const sPart = allStates ? 'brasil' : state.toLowerCase();
    const cPart = allCities ? 'todas-as-cidades' : generateSlug(city);
    const spPart = generateSlug(specialty || 'atendimento');
    return `/atendimento/${sPart}/${cPart}/${spPart}`;
  }, [allStates, allCities]);

  // Efeito para sincronização em tempo real (Live Sync)
  useEffect(() => {
    if (liveSync) {
      const cityVal = allCities ? 'Todas as Cidades' : (useCustomCity ? customCity : form.city);
      const stateVal = allStates ? 'Brasil (Todos)' : form.state;
      
      const path = getRelativePath(form.state, cityVal, form.specialty || '');
      
      // Apenas altera a URL se ela for diferente da atual para evitar poluição do histórico
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      
      onApply({
        city: cityVal,
        state: stateVal,
        specialty: form.specialty
      });
    }
  }, [form.state, form.city, form.specialty, allStates, allCities, customCity, liveSync, getRelativePath, onApply]);

  useEffect(() => {
    if (!allCities && !useCustomCity) {
      const cities = CITIES_BY_STATE[form.state] || [];
      if (!cities.includes(form.city)) {
        setForm(prev => ({ ...prev, city: cities[0] || '' }));
      }
    }
  }, [form.state, allCities, useCustomCity]);

  const handleCopySitemap = () => {
    const cities = allCities ? (CITIES_BY_STATE[form.state] || []) : [form.city];
    const urls = cities.map(c => `https://iahospital.com.br${getRelativePath(form.state, c, form.specialty || '')}`).join('\n');
    navigator.clipboard.writeText(urls);
    alert('Lista de URLs copiada para o Search Console!');
  };

  const availableCities = CITIES_BY_STATE[form.state] || [];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-slate-900/95 backdrop-blur-xl h-full shadow-2xl flex flex-col animate-slide-left overflow-hidden border-l border-white/10">
        
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-orange-600/20 to-transparent">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-orange-500 text-2xl animate-pulse">🔥</span>
              <h2 className="text-xl font-black text-white tracking-tighter uppercase">Flame Work <span className="text-orange-500">Live SEO</span></h2>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sincronização Instantânea de Clusters</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-white/5 p-2 rounded-full transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <div className="flex items-center justify-between p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
            <div>
              <p className="text-xs font-bold text-orange-500 uppercase">Modo Autopilot SEO</p>
              <p className="text-[10px] text-slate-400 leading-tight">URL muda automaticamente ao selecionar filtros.</p>
            </div>
            <button 
              onClick={() => setLiveSync(!liveSync)}
              className={`w-12 h-6 rounded-full transition-all relative ${liveSync ? 'bg-orange-500' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${liveSync ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Configurações de Cobertura</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                className={`p-4 rounded-2xl border text-left transition-all ${allStates ? 'bg-white/10 border-orange-500' : 'bg-slate-800/30 border-white/5 hover:border-white/20'}`}
                onClick={() => setAllStates(!allStates)}
              >
                <p className="text-xs font-bold text-white uppercase mb-1">Brasil Inteiro</p>
                <p className="text-[9px] text-slate-500 leading-tight">Indexa as 27 capitais e estados.</p>
              </button>

              <button 
                className={`p-4 rounded-2xl border text-left transition-all ${allCities ? 'bg-white/10 border-orange-500' : 'bg-slate-800/30 border-white/5 hover:border-white/20'}`}
                onClick={() => setAllCities(!allCities)}
              >
                <p className="text-xs font-bold text-white uppercase mb-1">Toda a UF</p>
                <p className="text-[9px] text-slate-500 leading-tight">Gera URLs para cada cidade da lista.</p>
              </button>
            </div>
          </div>

          <div className="space-y-6 bg-white/5 p-6 rounded-3xl border border-white/5">
            <div className={allStates ? 'opacity-20 pointer-events-none' : ''}>
              <label className="block mb-2">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Estado de Foco</span>
                <select 
                  value={form.state}
                  onChange={e => setForm({...form, state: e.target.value})}
                  className="mt-1 block w-full bg-slate-950 border-white/10 text-white rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm appearance-none"
                >
                  {BRAZIL_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
              </label>
            </div>

            <div className={allCities ? 'opacity-20 pointer-events-none' : ''}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Município</span>
                <button 
                  onClick={() => setUseCustomCity(!useCustomCity)}
                  className="text-[9px] text-orange-400 font-bold uppercase underline"
                >
                  {useCustomCity ? 'Lista' : 'Manual'}
                </button>
              </div>
              
              {useCustomCity ? (
                <input 
                  type="text"
                  value={customCity}
                  onChange={e => setCustomCity(e.target.value)}
                  placeholder="Nome da cidade..."
                  className="block w-full bg-slate-950 border-white/10 text-white rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                />
              ) : (
                <select 
                  value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                  className="block w-full bg-slate-950 border-white/10 text-white rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm appearance-none"
                >
                  {availableCities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              )}
            </div>

            <label className="block">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Especialidade (Cluster)</span>
              <select 
                value={form.specialty}
                onChange={e => setForm({...form, specialty: e.target.value})}
                className="mt-1 block w-full bg-slate-950 border-white/10 text-white rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm appearance-none"
              >
                {SPECIALTIES.map(sp => <option key={sp} value={sp}>{sp}</option>)}
              </select>
            </label>
          </div>

          <div className="bg-black/60 p-6 rounded-3xl border border-white/5 space-y-4 shadow-inner">
            <div className="flex justify-between items-center">
              <h3 className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Indexador de Clusters
              </h3>
              <button 
                onClick={handleCopySitemap}
                className="text-[9px] bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg font-bold uppercase transition-all"
              >
                Copiar p/ Search Console
              </button>
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-2 custom-scrollbar pr-2 text-left">
              {(allCities ? availableCities : [customCity || form.city]).map((c, i) => (
                <div key={i} className="bg-white/5 p-2 rounded-lg border border-white/5 font-mono text-[9px] text-slate-400 truncate">
                  <span className="text-orange-500/50">https://iahospital.com.br</span>{getRelativePath(form.state, c, form.specialty || '')}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-950/80 border-t border-white/5">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-orange-900/40 flex items-center justify-center gap-3"
          >
            Fechar & Manter Filtros
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
