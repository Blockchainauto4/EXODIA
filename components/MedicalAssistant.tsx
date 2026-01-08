
import React, { useState, useEffect, useRef } from 'react';
import { getMedicalOrientation } from '../services/geminiService';
import { Message, UserLocation } from '../types';

interface MedicalAssistantProps {
  location: UserLocation;
  onClose?: () => void;
}

const personas = [
  { id: 'meditation', name: 'Meditation', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-3.5-2.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm11 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-3.5 2.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM12 21a9 9 0 100-18 9 9 0 000 18z" /></svg> },
  { id: 'doc', name: 'Grok "Doc"', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg> },
  { id: 'trivia', name: 'Trivia Game', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 10v4m-2-2h4M17 3l-4.5 4.5M17 17l-4.5-4.5M7 17l4.5-4.5M7 7l4.5 4.5" /></svg> },
  { id: 'kids', name: 'Kids', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.874 5.126A2 2 0 016 5h12a2 2 0 011.126.874l-3.374 5.626-3.375-5.626-3.375 5.626L4.874 5.126zM2 19h20" /></svg> },
];

const MedicalAssistant: React.FC<MedicalAssistantProps> = ({ location, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Breathe in... ...let the air fill every corner of stillness... ...now breathe out... ...release the noise. You are not the thought that says very... ...nor the one behind it... ...observe the space... ...the echo between syllables... ...there lies the real question. Sit with it.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activePersona, setActivePersona] = useState('meditation');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async (prompt?: string) => {
    const userMsg = prompt || input.trim();
    if (!userMsg || isLoading) return;

    setInput('');
    setIsLoading(true);

    const historyForAPI = messages.map(m => ({ role: m.role, text: m.text }));
    const response = await getMedicalOrientation(userMsg, historyForAPI);
    
    // FIX: Add both user message and model response to maintain correct conversation history.
    setMessages(prev => [...prev, { role: 'user', text: userMsg }, { role: 'model', text: response }]);
    setIsLoading(false);
  };
  
  const lastModelMessage = messages.slice().reverse().find(m => m.role === 'model');

  return (
    <div className="bg-slate-950 text-white flex flex-col h-full w-full font-sans">
      <div className="flex-shrink-0 pt-16 pb-4">
        <div className="px-4 flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-white/10 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
            <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm bg-slate-800 rounded-full font-semibold">Ask</button>
                <button className="px-4 py-2 text-sm text-slate-400 rounded-full font-semibold">Imagine</button>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"></path></svg></button>
        </div>
        <div className="px-4 flex gap-3 overflow-x-auto scrollbar-hide">
            {personas.map(p => (
                <button 
                    key={p.id}
                    onClick={() => setActivePersona(p.id)}
                    className={`shrink-0 w-28 h-24 p-3 flex flex-col items-start justify-between rounded-3xl transition-all ${activePersona === p.id ? 'bg-white/10 border-2 border-white/30' : 'bg-slate-800'}`}
                >
                    <div className="flex items-center justify-between w-full">
                        <span className="text-xl">{p.icon}</span>
                        <span className="text-teal-400">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                        </span>
                    </div>
                    <span className="font-semibold text-sm">{p.name}</span>
                </button>
            ))}
        </div>
      </div>

      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 flex flex-col justify-end">
        {isLoading ? (
            <div className="flex justify-start items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce delay-200"></div>
            </div>
        ) : lastModelMessage && (
            <div className="animate-fade-in">
                <p className="whitespace-pre-wrap text-slate-200 text-lg leading-relaxed">
                    {lastModelMessage.text}
                </p>
                <div className="flex gap-5 mt-6 text-slate-500">
                    <button className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button>
                    <button className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg></button>
                    <button className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 18.734V6a2 2 0 012-2h4a2 2 0 012 2v4z"></path></svg></button>
                    <button className="hover:text-white transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.017c.163 0 .326.02.485.06L17 5.266V15a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z"></path></svg></button>
                </div>
            </div>
        )}
      </div>

      <div className="flex-shrink-0 p-4 pb-8 bg-gradient-to-t from-slate-950 to-transparent">
        <div className="text-center mb-4">
            <p className="text-sm text-slate-400">Ask anything</p>
        </div>
        <div className="flex items-center justify-center gap-3">
            <button className="w-14 h-14 bg-slate-800/70 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
            <button 
              onClick={() => handleSend("Continue a meditação guiada.")}
              className="w-16 h-16 bg-teal-600 rounded-3xl flex items-center justify-center text-3xl shadow-lg shadow-teal-500/30 hover:bg-teal-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
            <button className="w-14 h-14 bg-slate-800/70 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.683 3.92 11 4.158 11 4.5v15c0 .342-.317.58-.707.293L5.586 15z" /></svg></button>
            <button className="w-14 h-14 bg-slate-800/70 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg></button>
            {onClose && (
              <button 
                onClick={onClose} 
                aria-label="Fechar assistente"
                className="w-14 h-14 bg-slate-800/70 backdrop-blur-md rounded-full flex items-center justify-center text-2xl hover:bg-red-500/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
        </div>
      </div>
       <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default MedicalAssistant;
