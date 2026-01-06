
import React, { useState, useEffect, useRef } from 'react';
import { getMedicalOrientation } from '../services/geminiService';
import { Message, UserLocation } from '../types';

interface MedicalAssistantProps {
  location: UserLocation;
  onClose?: () => void;
}

const MedicalAssistant: React.FC<MedicalAssistantProps> = ({ location, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Olá! Sou o assistente do IA HOSPITAL. Como posso ajudar com sua saúde na região de ${location.city} hoje? Estou disponível agora para te orientar.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const response = await getMedicalOrientation(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-white flex flex-col h-[550px] w-full max-h-[80vh] shadow-2xl">
      <div className="bg-blue-700 p-5 text-white flex items-center justify-between shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg">IA</div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest leading-tight">Triagem Inteligente</h2>
            <p className="text-xs text-blue-50 font-bold uppercase tracking-tighter">{location.city} • Online agora</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            aria-label="Minimizar chat de orientação"
            title="Minimizar"
            className="p-2 hover:bg-white/10 rounded-xl transition-all hover:scale-105 active:scale-95 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-5 bg-slate-50 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[88%] p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-700 text-white rounded-tr-none font-medium' 
                : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none font-medium'
            }`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 rounded-tl-none">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-200 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Descreva seus sintomas aqui..."
            className="flex-grow p-4 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700 outline-none transition-all text-xs font-bold text-slate-950"
            aria-label="Descreva seus sintomas para a triagem médica"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            aria-label="Enviar mensagem de triagem"
            title="Enviar mensagem"
            className="p-4 bg-blue-700 text-white rounded-2xl hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-700 rounded-full animate-pulse"></div>
          <p className="text-xs text-center text-slate-700 font-black uppercase tracking-widest">
            Apenas Orientação • Emergência? Ligue 192
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalAssistant;
