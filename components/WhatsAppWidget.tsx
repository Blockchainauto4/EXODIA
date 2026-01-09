
import React, { memo } from 'react';

const WhatsAppWidget: React.FC = () => {
  const mainContactUrl = "https://api.whatsapp.com/send?phone=5511932046970&text=Ol%C3%A1%2C%2C%20preciso%20de%20orienta%C3%A7%C3%A3o%20m%C3%A9dica%20pelo%20IA%20HOSPITAL.";
  const professionalUrl = "https://painel.iahospital.com.br/";

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-4 group">
      {/* Opção Secundária: Cadastro Profissional (Aparece no Hover) */}
      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
        <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-teal-100">
          <p className="text-[10px] font-bold text-teal-800 uppercase tracking-widest whitespace-nowrap">Portal Profissional</p>
        </div>
        <a 
          href={professionalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-teal-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-700 hover:scale-110 transition-all"
          title="Cadastro de Profissionais"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </a>
      </div>

      {/* Opção Principal: Contato Solicitado */}
      <div className="flex items-center gap-3">
        <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-emerald-100 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest whitespace-nowrap">Orientação Médica</p>
        </div>
        
        <a 
          href={mainContactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-emerald-500 text-white rounded-full shadow-[0_15px_40px_rgba(16,185,129,0.4)] flex items-center justify-center hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all relative group/btn"
          title="Falar com Especialista"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 group-hover/btn:animate-none"></div>
          <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.675 1.438 5.662 1.439h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default memo(WhatsAppWidget);
