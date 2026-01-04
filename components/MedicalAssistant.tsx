
import React, { useState, useEffect, useRef } from 'react';
import { getMedicalOrientation } from '../services/geminiService';
import { Message, UserLocation } from '../types';

const MedicalAssistant: React.FC<{ location: UserLocation }> = ({ location }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Olá! Sou o assistente do IA HOSPITAL. Como posso ajudar com sua saúde na minha região de ${location.city} hoje? O atendimento está aberto agora e disponível onde estou agora.` }
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
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-w-4xl mx-auto">
      <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Atendimento Próximo</h2>
          <p className="text-blue-100 text-sm">Aberto agora para {location.city}</p>
        </div>
        <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">Na Minha Área</div>
      </div>

      <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Descreva o que está sentindo agora..."
            className="flex-grow p-4 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="mt-3 text-[10px] text-center text-slate-400 font-medium">
          Atenção: Este serviço é apenas para orientação informativa. Em caso de emergência, ligue 192 ou vá ao hospital.
        </p>
      </div>
    </div>
  );
};

export default MedicalAssistant;
