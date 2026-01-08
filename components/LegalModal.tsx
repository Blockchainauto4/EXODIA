
import React from 'react';
import { LegalModalType } from '../types';

interface LegalModalProps {
  title: string;
  type: LegalModalType;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ title, type, onClose }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white h-[85vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-fade-in border border-white/10">
        
        <div className="bg-slate-900 p-8 text-white flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-teal-600 rounded flex items-center justify-center text-[10px] font-bold">IA</div>
              <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">{title}</h2>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">IA HOSPITAL • Governança Corporativa v3.0</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 md:p-12 custom-scrollbar bg-slate-50">
          <div className="prose prose-slate max-w-none text-slate-600">
            
            {type === 'about' && (
              <div className="space-y-12">
                <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-white/5">
                  <div className="absolute top-0 right-0 p-8 opacity-5 text-9xl font-black">IAH</div>
                  <h3 className="text-2xl font-black uppercase mb-4 text-teal-400">Nossa Visão Institucional</h3>
                  <p className="text-lg leading-relaxed font-medium">
                    O IA HOSPITAL é mais que uma plataforma; é uma infraestrutura de saúde digital de alta fidelidade. Operamos sob uma governança corporativa rígida para garantir que a transmissão de conhecimento médico seja um ativo de confiança nacional.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black uppercase text-slate-900 border-l-4 border-teal-600 pl-4 tracking-tighter">Liderança & Estratégia</h3>
                    <p className="font-bold text-slate-900 text-xl tracking-tight">
                      Bruno Audric Bittencourt Rizk
                    </p>
                    <p className="font-medium leading-relaxed">
                      Líder em <strong>Segurança Cibernética Mundial</strong>, Bruno Audric Bittencourt Rizk transpõe a seriedade de protocolos de segurança nacional para a triagem médica digital. Sua abordagem é fundamentada na integridade total do dado e na precisão cirúrgica da informação.
                    </p>
                    <p className="font-medium leading-relaxed">
                      A fusão entre <strong>Física Quântica</strong> e inteligência artificial de última geração permite que o IA HOSPITAL processe variáveis de saúde com uma profundidade técnica sem precedentes no mercado latino-americano.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Pilares da Plataforma</h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                          <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Governança de Dados Transparente
                        </li>
                        <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                          <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Alta Disponibilidade Sistêmica
                        </li>
                        <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                          <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Auditoria em Tempo Real via IA
                        </li>
                        <li className="flex items-center gap-3 text-xs font-bold text-slate-700">
                          <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Arquitetura de Rede Certificada
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-8 bg-teal-600 text-white rounded-[2.5rem] shadow-xl">
                      <p className="text-xs font-black uppercase tracking-widest text-teal-100 mb-2">Nosso Manifesto</p>
                      <p className="text-sm font-medium leading-relaxed italic">
                        "Convertemos complexidade técnica em clareza assistencial. Nossa missão é transmitir segurança onde existe incerteza." 
                        <br/><br/>
                        <span className="font-black uppercase tracking-widest text-white">— Board of Directors</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {type === 'privacy' && (
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase text-slate-900">Privacidade & Protocolo de Dados</h3>
                <p className="font-medium">O tratamento de dados no IA HOSPITAL segue as diretrizes do <strong>Global Data Shield</strong>.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">Integridade de Dados</h4>
                    <p className="text-xs leading-relaxed">
                      Cada interação de triagem é encapsulada em um ambiente efêmero e isolado, garantindo que o processamento pelo modelo Gemini não resulte em retenção persistente de PII (Personally Identifiable Information).
                    </p>
                  </div>
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">Criptografia Avançada</h4>
                    <p className="text-xs leading-relaxed">
                      Utilizamos chaves de criptografia geradas dinamicamente, assegurando que o canal de transmissão entre o usuário e o centro de processamento seja inviolável.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {type === 'terms' && (
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase text-slate-900">Governança & Termos de Uso</h3>
                
                <div className="p-8 bg-slate-900 text-white rounded-[2rem] border-l-8 border-teal-600">
                  <h4 className="text-sm font-black text-teal-400 uppercase tracking-widest mb-3">Aviso Importante</h4>
                  <p className="text-sm font-medium leading-relaxed">
                    A transmissão de conteúdo via IA HOSPITAL é de caráter estritamente informativo e educativo. A governança do projeto veda qualquer tentativa de automação de diagnóstico final, delegando a responsabilidade clínica exclusivamente a médicos credenciados.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800">1. Compliance Normativo</h4>
                  <p className="text-sm leading-relaxed text-slate-500">
                    O uso do sistema implica na aceitação de que esta é uma ferramenta de triagem pré-clínica. Nossa responsabilidade limita-se à entrega da orientação mais precisa baseada nos dados fornecidos pelo usuário.
                  </p>
                </div>
              </div>
            )}

            {type === 'data' && (
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase text-slate-900">Segurança Cibernética & Auditoria</h3>
                <p className="font-medium text-slate-600">Nossa infraestrutura é resiliente a ataques de negação de serviço e exfiltração de dados.</p>
                
                <div className="space-y-4">
                  {[
                    { t: 'Estratégia Multi-Cloud', d: 'Redundância geográfica em três continentes para zero downtime.' },
                    { t: 'Governança de IA', d: 'Monitoramento contínuo para evitar alucinações de modelo e garantir conformidade ética.' },
                    { t: 'Acesso Zero Trust', d: 'Nenhum dado é acessado sem autenticação multifatorial e verificação contínua.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <div className="w-10 h-10 bg-slate-900 text-teal-400 rounded-xl flex items-center justify-center text-xs font-bold shrink-0">{i+1}</div>
                      <div>
                        <p className="font-black text-xs uppercase text-slate-900 mb-1">{item.t}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="p-8 bg-white border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6 shrink-0">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Uma Iniciativa de Bruno Audric Bittencourt Rizk</p>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-12 py-5 bg-teal-600 hover:bg-teal-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-teal-100 border-b-4 border-teal-800"
          >
            Validar & Acessar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalModal;
