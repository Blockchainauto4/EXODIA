
import React, { useState } from 'react';
import { BRAZIL_STATES, SPECIALTIES, CITIES_BY_STATE, DoctorProfile } from '../types';

interface ProfessionalModalProps {
  onClose: () => void;
}

const ProfessionalModal: React.FC<ProfessionalModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DoctorProfile>({
    nome: '',
    crm: '',
    categorias: [],
    cidade: '',
    estado: 'SP',
    capacidadeDiaria: 10
  });

  const handleCategoryToggle = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      categorias: prev.categorias.includes(spec) 
        ? prev.categorias.filter(c => c !== spec)
        : [...prev.categorias, spec]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 2000);
  };

  const cities = CITIES_BY_STATE[formData.estado] || [];

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.4)] overflow-hidden animate-fade-in border border-white/20 flex flex-col max-h-[95vh]">
        
        {step < 3 && (
          <div className="bg-slate-900 p-8 text-white shrink-0">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">DR</div>
                <h2 className="text-xl font-black uppercase tracking-tighter">Credenciamento Grátis</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Acesso total à rede sem taxas de adesão</p>
          </div>
        )}

        <div className="p-8 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-emerald-700 tracking-widest mb-1">Valor Enterprise</p>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">Custo Zero para o Médico</h3>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</span>
                  <input 
                    type="text" 
                    placeholder="Dr(a). Nome Sobrenome"
                    className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none transition-all font-medium text-sm"
                    value={formData.nome}
                    onChange={e => setFormData({...formData, nome: e.target.value})}
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CRM / Registro</span>
                  <input 
                    type="text" 
                    placeholder="000000-UF"
                    className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none transition-all font-medium text-sm"
                    value={formData.crm}
                    onChange={e => setFormData({...formData, crm: e.target.value})}
                  />
                </label>
                
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Estado</span>
                    <select 
                      className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none appearance-none"
                      value={formData.estado}
                      onChange={e => setFormData({...formData, estado: e.target.value})}
                    >
                      {BRAZIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cidade Sede</span>
                    <select 
                      className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none appearance-none"
                      value={formData.cidade}
                      onChange={e => setFormData({...formData, cidade: e.target.value})}
                    >
                      <option value="">Selecione...</option>
                      {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </label>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                disabled={!formData.nome || !formData.crm || !formData.cidade}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-200"
              >
                Próximo Passo
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Especialidades Atendidas (Free)</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">O match regional de triagem é oferecido sem custos transacionais.</p>
              </div>

              <div className="grid grid-cols-2 gap-2 h-48 overflow-y-auto pr-2 custom-scrollbar">
                {SPECIALTIES.map(spec => (
                  <button
                    key={spec}
                    onClick={() => handleCategoryToggle(spec)}
                    className={`p-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-tight transition-all text-left ${
                      formData.categorias.includes(spec)
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-slate-100 text-slate-500 hover:border-blue-200'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-grow py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black uppercase tracking-widest rounded-2xl"
                >
                  Voltar
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={formData.categorias.length === 0 || isSubmitting}
                  className="flex-[2] py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  {isSubmitting ? 'Salvando...' : 'Finalizar Cadastro Grátis'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-12 text-center space-y-8 animate-fade-in">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-2xl">
                💳
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 leading-none">Perfil Gratuito Ativo</h2>
                <p className="text-emerald-600 font-bold uppercase text-[10px] tracking-widest mt-4">Sua unidade já está listada sem custos de adesão</p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl"
              >
                Acessar Dashboard Free
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal;
