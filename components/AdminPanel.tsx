
import React, { useState, useEffect } from 'react';
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
  
  const [form, setForm] = useState<UserLocation>({
    city: currentLocation.city === 'sua região' ? (CITIES_BY_STATE['SP'][0]) : currentLocation.city,
    state: (currentLocation.state === 'Brasil' || currentLocation.state === 'Brasil (Todos)') ? 'SP' : currentLocation.state,
    specialty: currentLocation.specialty || 'Atendimento Médico'
  });

  // Atualiza a cidade quando o estado muda se não estiver em modo customizado ou massivo
  useEffect(() => {
    if (!allCities && !useCustomCity) {
      const cities = CITIES_BY_STATE[form.state] || [];
      if (!cities.includes(form.city)) {
        setForm(prev => ({ ...prev, city: cities[0] || '' }));
      }
    }
  }, [form.state, allCities, useCustomCity]);

  const generateSlug = (text: string) => 
    text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w ]+/g, '').replace(/ +/g, '-');

  const getCanonicalUrl = () => {
    const statePart = allStates ? 'brasil' : form.state.toLowerCase();
    const cityPart = allCities ? 'todas-as-cidades' : generateSlug(useCustomCity ? customCity : form.city);
    const specPart = generateSlug(form.specialty || 'atendimento');
    return `https://iahospital.com.br/atendimento/${statePart}/${cityPart}/${specPart}`;
  };

  const handleApply = () => {
    const finalLocation: UserLocation = {
      ...form,
      city: allCities ? 'Todas as Cidades' : (useCustomCity ? customCity : form.city),
      state: allStates ? 'Brasil (Todos)' : form.state,
    };
    onApply(finalLocation);
    onClose();
  };

  const availableCities = CITIES_BY_STATE[form.state] || [];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-slate-900 h-full shadow-2xl flex flex-col animate-slide-left overflow-hidden">
        
        {/* Header de Gestão Flame Work */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-slate-950 to-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-orange-500 text-2xl font-bold">🔥</span>
              <h2 className="text-xl font-black text-white tracking-tighter uppercase">Flame Work <span className="text-orange-500">Aliança</span></h2>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global SEO Engine & Hyper-Local Coverage</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white bg-white/5 p-2 rounded-full transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Formulário de Estratégia Local */}
        <div className="flex-grow overflow-y-auto p-6 space-y-8">
          
          {/* Toggles de Abrangência Massiva */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Configurações de Aliança</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${allStates ? 'bg-orange-600/10 border-orange-500' : 'bg-slate-800/30 border-slate-700 hover:border-slate-500'}`}
                onClick={() => setAllStates(!allStates)}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-white uppercase">Todos os Estados</p>
                  <div className={`w-8 h-4 rounded-full transition-all relative ${allStates ? 'bg-orange-500' : 'bg-slate-700'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${allStates ? 'left-4.5' : 'left-0.5'}`}></div>
                  </div>
                </div>
                <p className="text-[9px] text-slate-500 leading-tight">Geração massiva para todas as 27 UFs do Brasil.</p>
              </div>

              <div 
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${allCities ? 'bg-orange-600/10 border-orange-500' : 'bg-slate-800/30 border-slate-700 hover:border-slate-500'}`}
                onClick={() => setAllCities(!allCities)}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-white uppercase">Todas as Cidades</p>
                  <div className={`w-8 h-4 rounded-full transition-all relative ${allCities ? 'bg-orange-500' : 'bg-slate-700'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${allCities ? 'left-4.5' : 'left-0.5'}`}></div>
                  </div>
                </div>
                <p className="text-[9px] text-slate-500 leading-tight">Expansão canônica para +5.000 municípios.</p>
              </div>
            </div>
          </div>

          {/* Seletores Geográficos e Técnicos */}
          <div className="space-y-6 bg-slate-800/20 p-6 rounded-3xl border border-slate-800">
            <div className={allStates ? 'opacity-20 pointer-events-none' : ''}>
              <label className="block mb-2">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Estado Alvo</span>
                <select 
                  value={form.state}
                  onChange={e => setForm({...form, state: e.target.value})}
                  className="mt-1 block w-full bg-slate-950 border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm appearance-none"
                >
                  {BRAZIL_STATES.map(st => <option key={st} value={st}>{st}</option>)}
                </select>
              </label>
            </div>

            <div className={allCities ? 'opacity-20 pointer-events-none' : ''}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Cidades do Estado</span>
                <button 
                  onClick={() => setUseCustomCity(!useCustomCity)}
                  className="text-[9px] text-orange-400 font-bold uppercase underline"
                >
                  {useCustomCity ? 'Ver Lista' : 'Manual'}
                </button>
              </div>
              
              {useCustomCity ? (
                <input 
                  type="text"
                  value={customCity}
                  onChange={e => setCustomCity(e.target.value)}
                  placeholder="Nome da cidade..."
                  className="block w-full bg-slate-950 border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                />
              ) : (
                <select 
                  value={form.city}
                  onChange={e => setForm({...form, city: e.target.value})}
                  className="block w-full bg-slate-950 border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm appearance-none"
                >
                  {availableCities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
              )}
            </div>

            <label className="block">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Especialidade do Cluster</span>
              <select 
                value={form.specialty}
                onChange={e => setForm({...form, specialty: e.target.value})}
                className="mt-1 block w-full bg-slate-950 border-slate-700 text-white rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none text-sm appearance-none"
              >
                {SPECIALTIES.map(sp => <option key={sp} value={sp}>{sp}</option>)}
              </select>
            </label>
          </div>

          {/* Preview de Estrutura SEO */}
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Flame Work Intelligence Preview
            </h3>
            
            <div className="space-y-3">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <p className="text-[9px] text-slate-500 mb-1 font-bold uppercase">Título Dinâmico (H1):</p>
                <p className="text-xs text-blue-400 font-bold">
                  {form.specialty} em {allCities ? 'Todas as Cidades' : (useCustomCity ? customCity : form.city)} - {allStates ? 'Brasil' : form.state} | IA HOSPITAL
                </p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <p className="text-[9px] text-slate-500 mb-1 font-bold uppercase">URL Canônica Estimada:</p>
                <p className="text-[10px] text-orange-300 font-mono break-all italic">{getCanonicalUrl()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ação de Publicação */}
        <div className="p-6 bg-slate-950 border-t border-slate-800">
          <button 
            onClick={handleApply}
            className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-orange-900/40 active:scale-95 flex items-center justify-center gap-3"
          >
            Publicar Cluster de Páginas
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
          </button>
          <p className="text-[9px] text-slate-600 text-center mt-4 font-bold uppercase tracking-tighter">
            Estratégia SEO Local: 100% Google Search Compliance
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
