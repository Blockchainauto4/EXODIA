
import React from 'react';

interface FooterProps {
  onAdminOpen?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen }) => {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">IA</div>
              <span className="font-bold text-xl uppercase tracking-tighter">IA HOSPITAL</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              Plataforma brasileira pioneira em triagem médica por Inteligência Artificial e educação em saúde para todo o território nacional.
            </p>
            <div className="flex gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 bg-white/5 rounded-full hover:bg-blue-600 transition-colors cursor-pointer flex items-center justify-center">
                   <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-blue-400">Links Úteis</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#assistente" className="hover:text-white transition-colors">Orientação Médica</a></li>
              <li><a href="#orientacao" className="hover:text-white transition-colors">Categorias Médicas</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Dúvidas Frequentes</a></li>
              <li>
                <button 
                  onClick={onAdminOpen}
                  className="hover:text-white transition-colors text-left"
                >
                  Área Administrativa (SEO)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-blue-400">Contato Nacional</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>contato@iahospital.com.br</li>
              <li>Sede: São Paulo - Brasil</li>
              <li>Atendimento 24/7 Digital</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs">
            © 2024 IA HOSPITAL. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <span>Ética Médica</span>
            <span>Ciência & Tecnologia</span>
            <span>Segurança de Dados</span>
            <span>EEAT Compliance</span>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
          <p className="text-[10px] text-slate-500 leading-relaxed text-center">
            AVISO LEGAL: O IA HOSPITAL é uma ferramenta de apoio informacional e educacional. Não substitui consulta médica presencial, diagnóstico profissional ou tratamento médico. Em situações de emergência (dor aguda, sangramento intenso, perda de consciência), procure imediatamente uma unidade de saúde ou ligue para o SAMU (192).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
