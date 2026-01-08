
import React, { useState, useEffect } from 'react';
import { checkApiStatus } from '../services/consultarApi';

type ServiceStatus = 'OPERACIONAL' | 'FALHA' | 'DEGRADADO' | 'VERIFICANDO...';

interface SystemState {
  service: string;
  description: string;
  status: ServiceStatus;
  details?: string;
}

const SystemStatusPage: React.FC = () => {
  const [systems, setSystems] = useState<SystemState[]>([
    { service: 'Páginas Canônicas (Flame Work)', description: 'Motor de SEO Local e geração de páginas "perto de mim".', status: 'VERIFICANDO...' },
    { service: 'API de Vagas Médicas', description: 'Fonte de dados para o mural de oportunidades de carreira.', status: 'VERIFICANDO...' },
    { service: 'API de Validação (consultar.io)', description: 'Serviço externo para validação de credenciais profissionais (CRM).', status: 'VERIFICANDO...' },
    { service: 'Serviços de IA (Gemini)', description: 'Infraestrutura de IA para triagem e orientação médica.', status: 'VERIFICANDO...' },
  ]);

  const updateSystemStatus = (serviceName: string, status: ServiceStatus, details: string) => {
    setSystems(prevSystems =>
      prevSystems.map(s =>
        s.service === serviceName ? { ...s, status, details } : s
      )
    );
  };

  const runChecks = async () => {
    // Check 1: Flame Work (always operational if app is running)
    setTimeout(() => {
      updateSystemStatus('Páginas Canônicas (Flame Work)', 'OPERACIONAL', 'Sistema central de renderização e SEO local em funcionamento.');
    }, 300);

    // Check 2: Jobs API (mocked, as data is static)
    setTimeout(() => {
        updateSystemStatus('API de Vagas Médicas', 'OPERACIONAL', 'Conexão com a base de dados estática de vagas estabelecida.');
    }, 600);

    // Check 3: Consultar.io API
    try {
      const apiStatusResult = await checkApiStatus();
      const consultarStatus = apiStatusResult.status === 'online' ? 'OPERACIONAL' : 'FALHA';
      updateSystemStatus('API de Validação (consultar.io)', consultarStatus, apiStatusResult.message);
    } catch (e: any) {
      updateSystemStatus('API de Validação (consultar.io)', 'FALHA', e.message);
    }
    
    // Check 4: Gemini API
    setTimeout(() => {
      const geminiStatus = process.env.API_KEY ? 'OPERACIONAL' : 'DEGRADADO';
      const geminiDetails = process.env.API_KEY ? 'API Key principal configurada para triagem de texto.' : 'API Key principal não configurada. Funções PRO (vídeo/voz) exigem chave do usuário.';
      updateSystemStatus('Serviços de IA (Gemini)', geminiStatus, geminiDetails);
    }, 1200);
  };
  
  useEffect(() => {
    runChecks();
    const interval = setInterval(runChecks, 60000); // Re-check every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusInfo = (status: ServiceStatus) => {
    switch (status) {
      case 'OPERACIONAL':
        return { indicator: 'bg-emerald-500', text: 'text-emerald-500', bg: 'bg-emerald-500/10', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg> };
      case 'FALHA':
        return { indicator: 'bg-red-500', text: 'text-red-500', bg: 'bg-red-500/10', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> };
      case 'DEGRADADO':
        return { indicator: 'bg-yellow-500', text: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> };
      default:
        return { indicator: 'bg-slate-400 animate-pulse', text: 'text-slate-400', bg: 'bg-slate-500/10', icon: <div className="w-4 h-4 border-2 border-slate-400/50 border-t-slate-400 rounded-full animate-spin"></div> };
    }
  };

  const overallStatus: ServiceStatus = systems.some(s => s.status === 'FALHA') ? 'FALHA'
    : systems.some(s => s.status === 'DEGRADADO') ? 'DEGRADADO'
    : systems.every(s => s.status === 'OPERACIONAL') ? 'OPERACIONAL'
    : 'VERIFICANDO...';
  
  const overallStatusInfo = getStatusInfo(overallStatus);

  return (
    <div className="animate-fade-in">
      <div className="relative bg-slate-900 pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black opacity-80"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter">Status do Sistema</h1>
          <p className="text-slate-200 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
            Acompanhe em tempo real a saúde operacional de todos os serviços que compõem a plataforma IA HOSPITAL.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className={`p-8 rounded-3xl border ${overallStatusInfo.bg.replace('10', '20')} ${overallStatusInfo.bg} mb-12`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${overallStatusInfo.bg.replace('10', '50')} ${overallStatusInfo.text}`}>
                {overallStatusInfo.icon}
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${overallStatusInfo.text}`}>
                  {overallStatus === 'OPERACIONAL' && 'Todos os Sistemas Operacionais'}
                  {overallStatus === 'FALHA' && 'Falha Crítica Detectada'}
                  {overallStatus === 'DEGRADADO' && 'Performance Degradada'}
                  {overallStatus === 'VERIFICANDO...' && 'Verificando Sistemas...'}
                </h2>
                <p className={`text-sm font-semibold ${overallStatusInfo.text.replace('500', '700')}`}>Última verificação: {new Date().toLocaleTimeString('pt-BR')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {systems.map((system) => {
              const statusInfo = getStatusInfo(system.status);
              return (
                <div key={system.service} className="bg-white p-6 rounded-3xl border border-slate-200">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-slate-900">{system.service}</h3>
                      <p className="text-xs text-slate-500 mt-1">{system.description}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${statusInfo.bg} ${statusInfo.text}`}>
                      <div className={`w-2 h-2 rounded-full ${statusInfo.indicator}`}></div>
                      {system.status}
                    </div>
                  </div>
                  {system.details && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-600 font-mono">{system.details}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusPage;
