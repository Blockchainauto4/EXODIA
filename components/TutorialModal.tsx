
import React from 'react';

interface TutorialModalProps {
  onClose: () => void;
  onOpenSelectKey: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose, onOpenSelectKey }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="bg-teal-700 p-8 text-white">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">Acesso Tecnológico</h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/20">Acesso PRO</span>
          </div>
          <p className="text-white font-medium opacity-90">O sistema IA Hospital utiliza infraestrutura avançada para triagem local. Veja como habilitar recursos PRO.</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Triagem Regional</h4>
                  <p className="text-slate-700 text-xs leading-relaxed">Localização precisa de unidades de saúde no seu bairro através de IA.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Recursos Avançados (Voz/Vídeo)</h4>
                  <p className="text-slate-700 text-xs leading-relaxed">Conexão direta com a infraestrutura do Google para análise em tempo real via IA Studio.</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4">Níveis de Acesso</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 uppercase">Triagem Texto</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">ATIVO</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 uppercase">Dashboard Médico</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">ATIVO</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-slate-700 uppercase">Análise de Vídeo</span>
                  <span className="text-[10px] bg-teal-100 text-teal-900 px-2 py-0.5 rounded-full font-bold">CHAVE IA</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                onOpenSelectKey();
                onClose();
              }}
              className="flex-grow py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-teal-200"
            >
              Habilitar Vídeo/Voz PRO
            </button>
            <button 
              onClick={onClose}
              className="px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold uppercase tracking-widest rounded-2xl transition-all"
            >
              Usar Versão Padrão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
