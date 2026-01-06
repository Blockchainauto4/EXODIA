
import React, { useState, useEffect } from 'react';
import { BRAZIL_STATES, SPECIALTIES, CITIES_BY_STATE, DoctorProfile } from '../types';

interface ProfessionalModalProps {
  onClose: () => void;
}

const SYSTEM_MODULES = [
  { id: 'ehr', name: 'Prontuário Inteligente (EHR)', icon: '🩺', desc: 'Histórico clínico com suporte a IA.' },
  { id: 'tele', name: 'Módulo de Teleconsulta', icon: '📹', desc: 'Vídeo chamadas integradas 4K.' },
  { id: 'ai-triage', name: 'Triagem IA Local', icon: '🤖', desc: 'Pré-atendimento automatizado no bairro.' },
  { id: 'schedule', name: 'Gestão de Agendamentos', icon: '📅', desc: 'Agenda inteligente com lembretes SMS.' },
  { id: 'rx', name: 'Prescrição Digital', icon: '💊', desc: 'Emissão de receitas com assinatura digital.' },
  { id: 'flame-seo', name: 'Dashboard Flame Work SEO', icon: '🔥', desc: 'Controle de posicionamento "Perto de Mim".' },
  { id: 'finance', name: 'Gestão Financeira Enterprise', icon: '💰', desc: 'Faturamento e repasses automáticos.' },
];

const GENERATION_LOGS = [
  "Iniciando Provisionamento de Infraestrutura...",
  "Configurando Cluster de Banco de Dados Local...",
  "Instalando Módulos de Inteligência Artificial...",
  "Habilitando Criptografia Rizk-256...",
  "Sincronizando com a Rede Regional de Triagem...",
  "Validando Chaves de Acesso CRM...",
  "Configurando Dashboard Flame SEO...",
  "Sistema Pronto para Operação."
];

const ProfessionalModal: React.FC<ProfessionalModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [selectedModules, setSelectedModules] = useState<string[]>(['flame-seo', 'ai-triage']);
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

  const handleModuleToggle = (id: string) => {
    setSelectedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStep(3.5); // Estado intermediário de geração
    
    // Simula a progressão de logs
    let logIdx = 0;
    const interval = setInterval(() => {
      logIdx++;
      if (logIdx < GENERATION_LOGS.length) {
        setCurrentLogIdx(logIdx);
      } else {
        clearInterval(interval);
        setIsSubmitting(false);
        setStep(4);
      }
    }, 500);
  };

  const cities = CITIES_BY_STATE[formData.estado] || [];

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.4)] overflow-hidden animate-fade-in border border-white/20 flex flex-col max-h-[95vh]">
        
        {step < 4 && (
          <div className="bg-slate-900 p-8 text-white shrink-0">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">DR</div>
                <h2 className="text-xl font-black uppercase tracking-tighter">Credenciamento Médico</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1 flex-grow rounded-full transition-all duration-500 ${step >= i ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-blue-700 tracking-widest mb-1">Identificação Profissional</p>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">Dados de Registro</h3>
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
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Especialidades Atendidas</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">O match regional de triagem é focado na localização exata da sua unidade.</p>
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
                  onClick={() => setStep(3)}
                  disabled={formData.categorias.length === 0}
                  className="flex-[2] py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  Configurar Sistema
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Personalização do Sistema</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Selecione as funções que deseja gerar em tempo real para sua unidade.</p>
              </div>

              <div className="space-y-3 h-64 overflow-y-auto pr-2 custom-scrollbar">
                {SYSTEM_MODULES.map(module => (
                  <button
                    key={module.id}
                    onClick={() => handleModuleToggle(module.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left group ${
                      selectedModules.includes(module.id)
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                    }`}
                  >
                    <span className="text-2xl">{module.icon}</span>
                    <div className="flex-grow">
                      <p className="text-xs font-black uppercase tracking-tight">{module.name}</p>
                      <p className={`text-[10px] font-medium leading-tight ${selectedModules.includes(module.id) ? 'text-slate-300' : 'text-slate-400'}`}>
                        {module.desc}
                      </p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedModules.includes(module.id) ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-transparent'
                    }`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(2)}
                  className="flex-grow py-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black uppercase tracking-widest rounded-2xl"
                >
                  Voltar
                </button>
                <button 
                  onClick={handleSubmit}
                  disabled={selectedModules.length === 0 || isSubmitting}
                  className="flex-[2] py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  Criar Sistema em Tempo Real
                </button>
              </div>
            </div>
          )}

          {step === 3.5 && (
            <div className="py-20 text-center space-y-8 animate-fade-in flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center relative shadow-2xl">
                <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-[2rem] animate-spin"></div>
                <span className="text-2xl">⚡</span>
              </div>
              
              <div className="w-full max-w-sm space-y-4">
                <h3 className="text-lg font-black uppercase tracking-tighter text-slate-900">Gerando Ambiente de Saúde</h3>
                <div className="bg-slate-950 p-6 rounded-2xl font-mono text-[9px] text-emerald-400 text-left h-40 overflow-hidden flex flex-col justify-end">
                  {GENERATION_LOGS.slice(0, currentLogIdx + 1).map((log, i) => (
                    <p key={i} className="mb-1 opacity-80 animate-fade-in">
                      <span className="text-slate-600">{">"}</span> {log}
                    </p>
                  ))}
                  <div className="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${(currentLogIdx + 1) * (100 / GENERATION_LOGS.length)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="py-12 text-center space-y-8 animate-fade-in">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-20 scale-150"></div>
                <div className="relative w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl shadow-2xl z-10">
                  ✅
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 leading-none">Infraestrutura Ativa!</h2>
                <p className="text-blue-600 font-bold uppercase text-[10px] tracking-widest mt-4">Unidade em {formData.cidade} operando em tempo real</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 text-left space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Módulos em Produção:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedModules.map(m => {
                    const mod = SYSTEM_MODULES.find(sm => sm.id === m);
                    return (
                      <span key={m} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[9px] font-black text-slate-600 uppercase shadow-sm">
                        {mod?.icon} {mod?.name}
                      </span>
                    )
                  })}
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl"
              >
                Acessar Meu Sistema IA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalModal;
