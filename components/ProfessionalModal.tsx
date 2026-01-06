
import React, { useState, useEffect } from 'react';
import { BRAZIL_STATES, SPECIALTIES, CITIES_BY_STATE, DoctorProfile } from '../types';

interface ProfessionalModalProps {
  onClose: () => void;
}

const SYSTEM_MODULES = [
  { id: 'ehr', name: 'Prontuário Inteligente (EHR)', icon: '🩺', desc: 'Histórico clínico com suporte a IA e CID-11.' },
  { id: 'tele', name: 'Módulo de Teleconsulta', icon: '📹', desc: 'Vídeo chamadas criptografadas com sala de espera.' },
  { id: 'ai-triage', name: 'Triagem IA Local', icon: '🤖', desc: 'Pré-atendimento automatizado para sua região.' },
  { id: 'schedule', name: 'Gestão de Agendamentos', icon: '📅', desc: 'Agenda inteligente com confirmação via WhatsApp.' },
  { id: 'rx', name: 'Prescrição Digital', icon: '💊', desc: 'Receitas digitais aceitas em todo o território nacional.' },
  { id: 'flame-seo', name: 'Dashboard Flame Work SEO', icon: '🔥', desc: 'Gestão de autoridade e buscas "Perto de Mim".' },
  { id: 'finance', name: 'Gestão Financeira Enterprise', icon: '💰', desc: 'Controle de faturamento, convênios e repasses.' },
];

const BASE_LOGS = [
  "Iniciando Provisionamento de Infraestrutura...",
  "Configurando Cluster de Banco de Dados Regional...",
  "Habilitando Criptografia de Ponta a Ponta (Rizk-256)...",
  "Validando Credenciais CRM junto ao sistema nacional...",
];

const FINAL_LOGS = [
  "Sincronizando com a Rede Regional de Triagem...",
  "Otimizando URLs Canônicas Flame Work...",
  "Finalizando Deploy em Tempo Real...",
  "Sistema Pronto para Operação."
];

const ProfessionalModal: React.FC<ProfessionalModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [dynamicLogs, setDynamicLogs] = useState<string[]>([]);
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
    
    // Constrói os logs dinâmicos com base nos módulos escolhidos em tempo real
    const modulesLogs = selectedModules.map(m => {
      const mod = SYSTEM_MODULES.find(sm => sm.id === m);
      return `Provisionando Módulo: ${mod?.name}...`;
    });
    
    const allLogs = [...BASE_LOGS, ...modulesLogs, ...FINAL_LOGS];
    setDynamicLogs(allLogs);
    setStep(3.5); 
    
    let logIdx = 0;
    const interval = setInterval(() => {
      logIdx++;
      if (logIdx < allLogs.length) {
        setCurrentLogIdx(logIdx);
      } else {
        clearInterval(interval);
        setIsSubmitting(false);
        setStep(4);
      }
    }, 400);
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
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tighter leading-none">Sistema sob Demanda</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Personalização em Tempo Real</p>
                </div>
              </div>
              <button onClick={onClose} aria-label="Fechar credenciamento" className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 flex-grow rounded-full transition-all duration-700 ${step >= i ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-blue-700 tracking-widest mb-1">Passo 1: Profissional</p>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">Dados de Registro</h3>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</span>
                  <input 
                    type="text" 
                    placeholder="Ex: Dr. Bruno Rizk"
                    className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none transition-all font-medium text-sm"
                    value={formData.nome}
                    onChange={e => setFormData({...formData, nome: e.target.value})}
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CRM / UF</span>
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
                      className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none appearance-none font-bold text-sm"
                      value={formData.estado}
                      onChange={e => setFormData({...formData, estado: e.target.value})}
                    >
                      {BRAZIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cidade Principal</span>
                    <select 
                      className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-600 outline-none appearance-none font-bold text-sm"
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
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
              >
                Próximo Passo
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-blue-700 tracking-widest mb-1">Passo 2: Atuação</p>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter leading-none">Especialidades e Unidades</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 h-48 overflow-y-auto pr-2 custom-scrollbar">
                {SPECIALTIES.map(spec => (
                  <button
                    key={spec}
                    onClick={() => handleCategoryToggle(spec)}
                    className={`p-3 rounded-xl border-2 text-[10px] font-black uppercase tracking-tight transition-all text-left ${
                      formData.categorias.includes(spec)
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
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
                  className="flex-[2] py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl disabled:opacity-50"
                >
                  Escolher Módulos do Sistema
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 bg-slate-900 border border-slate-700 rounded-2xl">
                <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">Passo 3: Arquitetura</p>
                <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Funções Desejadas</h3>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl mb-4">
                <p className="text-[9px] font-bold text-blue-700 uppercase tracking-widest leading-tight">
                  Seu sistema será gerado instantaneamente com base nos {selectedModules.length} módulos selecionados abaixo.
                </p>
              </div>

              <div className="space-y-3 h-56 overflow-y-auto pr-2 custom-scrollbar">
                {SYSTEM_MODULES.map(module => (
                  <button
                    key={module.id}
                    onClick={() => handleModuleToggle(module.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-4 text-left group ${
                      selectedModules.includes(module.id)
                        ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                        : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                    }`}
                  >
                    <span className="text-2xl">{module.icon}</span>
                    <div className="flex-grow">
                      <p className="text-xs font-black uppercase tracking-tight">{module.name}</p>
                      <p className={`text-[10px] font-medium leading-tight mt-0.5 ${selectedModules.includes(module.id) ? 'text-slate-300' : 'text-slate-400'}`}>
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
                  className="flex-[2] py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  Gerar Sistema em Tempo Real
                </button>
              </div>
            </div>
          )}

          {step === 3.5 && (
            <div className="py-16 text-center space-y-8 animate-fade-in flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center relative shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
                <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-[2.5rem] animate-spin"></div>
                <span className="text-3xl animate-pulse">⚡</span>
              </div>
              
              <div className="w-full max-w-sm space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-none">Criando Ambiente</h3>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-[0.2em]">Sincronizando preferências do Dr(a). {formData.nome.split(' ')[0]}...</p>
                
                <div className="bg-slate-950 p-6 rounded-[2rem] font-mono text-[9px] text-emerald-400 text-left h-48 overflow-hidden flex flex-col justify-end shadow-inner border border-white/5 relative">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
                  <div className="space-y-1.5">
                    {dynamicLogs.slice(0, currentLogIdx + 1).map((log, i) => (
                      <p key={i} className="opacity-90 animate-fade-in flex items-center gap-2">
                        <span className="text-emerald-800 font-black shrink-0">✔</span> {log}
                      </p>
                    ))}
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-300" style={{ width: `${(currentLogIdx + 1) * (100 / dynamicLogs.length)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="py-12 text-center space-y-8 animate-fade-in">
              <div className="relative mx-auto w-28 h-28">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20 scale-150"></div>
                <div className="relative w-28 h-28 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl z-10 border border-emerald-200">
                  🏥
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 leading-none">Arquitetura Concluída!</h2>
                <p className="text-emerald-600 font-bold uppercase text-[11px] tracking-widest mt-4">Sua unidade em {formData.cidade} está pronta para operar</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 text-left space-y-5">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Configuração Ativa:
                  </p>
                  <span className="text-[9px] font-black text-blue-600 uppercase">Deploy 100% Real-time</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedModules.map(m => {
                    const mod = SYSTEM_MODULES.find(sm => sm.id === m);
                    return (
                      <span key={m} className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-700 uppercase shadow-sm flex items-center gap-2 hover:border-emerald-400 transition-colors cursor-default">
                        <span>{mod?.icon}</span> {mod?.name}
                      </span>
                    )
                  })}
                </div>
              </div>

              <button 
                onClick={onClose}
                aria-label="Acessar meu painel médico"
                className="w-full py-6 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-3xl transition-all shadow-2xl hover:scale-[1.02] active:scale-95 border-b-4 border-black"
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
