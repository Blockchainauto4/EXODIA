
import React, { useState } from 'react';
import { PatientProfile } from '../types';

interface PatientRegistrationModalProps {
  onClose: () => void;
}

const PatientRegistrationModal: React.FC<PatientRegistrationModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PatientProfile>({
    nome: '',
    cpf: '',
    whatsapp: '',
    cep: '',
    sintomaInicial: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[450] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_0_100px_rgba(13,148,136,0.2)] overflow-hidden animate-fade-in border border-white/20 flex flex-col max-h-[90vh]">
        
        {step === 1 && (
          <>
            <div className="bg-teal-600 p-8 text-white shrink-0">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Cadastro de Acesso</h2>
              <p className="text-teal-100 text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-80">Triagem IA Regional Personalizada</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="p-5 bg-teal-50 rounded-2xl border border-teal-100 mb-2">
                <p className="text-[10px] leading-relaxed text-teal-800 font-black uppercase tracking-tight flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>LOCALIZAÇÃO: Seu cadastro garante que a triagem direcione você para o atendimento ideal mais perto daqui.</span>
                </p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</span>
                  <input 
                    required
                    type="text" 
                    placeholder="Nome completo do paciente"
                    className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-teal-600 outline-none transition-all font-medium text-sm"
                    value={formData.nome}
                    onChange={e => setFormData({...formData, nome: e.target.value})}
                  />
                </label>
                
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</span>
                    <input 
                      required
                      type="tel" 
                      placeholder="(00) 00000-0000"
                      className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-teal-600 outline-none transition-all font-medium text-sm"
                      value={formData.whatsapp}
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CEP (Localização)</span>
                    <input 
                      required
                      type="text" 
                      placeholder="00000-000"
                      className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-teal-600 outline-none transition-all font-medium text-sm"
                      value={formData.cep}
                      onChange={e => setFormData({...formData, cep: e.target.value})}
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">O que você está sentindo?</span>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Descreva seus sintomas para a triagem local..."
                    className="w-full mt-1 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-teal-600 outline-none transition-all font-medium text-sm resize-none"
                    value={formData.sintomaInicial}
                    onChange={e => setFormData({...formData, sintomaInicial: e.target.value})}
                  ></textarea>
                </label>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-5 bg-teal-600 hover:bg-teal-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-teal-200 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Processando Localização...' : 'Iniciar Triagem Imediata'}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <div className="p-12 text-center space-y-8 animate-fade-in overflow-y-auto">
            <div className="relative">
              <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-teal-50 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-20 scale-150"></div>
            </div>
            
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 leading-none">Triagem Concluída!</h2>
              <p className="text-teal-600 font-bold uppercase text-[10px] tracking-widest mt-4">Match Regional Ativado com Sucesso</p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-[2rem] text-left space-y-4">
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Sua triagem foi encaminhada para a unidade mais eficiente próxima do CEP <span className="text-teal-600 font-bold">{formData.cep}</span>. Você receberá os detalhes do local ideal para seu caso em instantes.
              </p>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-2xl"
            >
              Acessar Painel de Unidades
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRegistrationModal;
