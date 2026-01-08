
import React, { useState } from 'react';
import { BRAZIL_STATES } from '../types';
import { fetchCRMData, CrmData } from '../services/consultarApi';

const DoctorSearchPage: React.FC = () => {
  const [crm, setCrm] = useState('');
  const [uf, setUf] = useState('SP');
  const [result, setResult] = useState<CrmData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!crm || !uf) {
      setError('Por favor, preencha o CRM e o estado.');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await fetchCRMData(crm, uf);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao buscar os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="relative bg-slate-900 pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 to-slate-900 opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <p className="text-teal-400 text-sm font-bold uppercase tracking-[0.2em]">Validação</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mt-2 tracking-tighter">Consulta de Profissionais</h1>
          <p className="text-slate-200 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            Verifique a situação e as especialidades de um profissional de saúde em tempo real utilizando nossa integração direta com a base de dados nacional.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSearch} className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 flex flex-col sm:flex-row items-end gap-4">
            <div className="w-full sm:w-auto flex-grow">
              <label htmlFor="crm" className="text-xs font-bold text-slate-500 uppercase tracking-widest">CRM</label>
              <input 
                id="crm"
                type="text" 
                value={crm} 
                onChange={e => setCrm(e.target.value)} 
                className="w-full mt-1 p-4 bg-slate-100 border-2 border-slate-200 rounded-2xl focus:border-teal-600 outline-none transition-all font-medium text-sm"
                placeholder="000000"
              />
            </div>
            <div className="w-full sm:w-auto">
              <label htmlFor="uf" className="text-xs font-bold text-slate-500 uppercase tracking-widest">UF</label>
              <select 
                id="uf"
                value={uf} 
                onChange={e => setUf(e.target.value)}
                className="w-full mt-1 p-4 bg-slate-100 border-2 border-slate-200 rounded-2xl focus:border-teal-600 outline-none appearance-none font-bold text-sm"
              >
                {BRAZIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-4 bg-teal-800 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-700/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>

          <div className="mt-12">
            {error && <p className="text-center text-red-600 font-bold bg-red-50 p-4 rounded-xl">{error}</p>}
            {result && (
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 animate-fade-in">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{result.nome}</h2>
                        <p className="text-sm font-semibold text-slate-500">CRM: {crm}-{uf}</p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${result.situacao === 'Ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {result.situacao}
                    </span>
                </div>
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Especialidades Registradas</h3>
                    {result.especialidades && result.especialidades.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                        {result.especialidades.map((spec, i) => (
                            <span key={i} className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold border border-teal-100">
                            {spec}
                            </span>
                        ))}
                        </div>
                    ) : (
                        <p className="text-slate-600 italic">Nenhuma especialidade registrada.</p>
                    )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSearchPage;
