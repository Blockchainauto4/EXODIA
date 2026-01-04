
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MedicalAssistant from './components/MedicalAssistant';
import SEOContent from './components/SEOContent';
import VoiceFAQ from './components/VoiceFAQ';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import LiveAnalysis from './components/LiveAnalysis';
import TutorialModal from './components/TutorialModal';
import ProfessionalModal from './components/ProfessionalModal';
import WhatsAppWidget from './components/WhatsAppWidget';
import AdminAuthModal from './components/AdminAuthModal';
import ProcessingDashboard from './components/ProcessingDashboard';
import { UserLocation } from './types';

const App: React.FC = () => {
  const [location, setLocation] = useState<UserLocation>({ 
    city: 'sua região', 
    state: 'Brasil',
    specialty: 'Atendimento Médico'
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLiveAnalysisOpen, setIsLiveAnalysisOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isProfModalOpen, setIsProfModalOpen] = useState(false);
  const [isProcessingOpen, setIsProcessingOpen] = useState(false);
  const [apiTier, setApiTier] = useState<'BASIC' | 'PRO'>('BASIC');

  // Lógica de "Desvio" para Tags Antigas e Roteamento SEO
  const handleRouting = useCallback(() => {
    const path = window.location.pathname;
    
    // Desvio de tags antigas (Fallthrough de segurança no cliente)
    if (path.startsWith('/tag/')) {
      window.history.replaceState({}, '', '/');
      return;
    }

    const parts = path.split('/').filter(p => p);
    if (parts[0] === 'atendimento' && parts.length >= 2) {
      const stateParam = parts[1].toUpperCase();
      const cityParam = parts[2] ? parts[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
      const specialtyParam = parts[3] ? parts[3].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Atendimento Médico';

      setLocation({ 
        city: cityParam || 'Sua Localidade', 
        state: stateParam, 
        specialty: specialtyParam 
      });
    }
  }, []);

  const checkApiTier = useCallback(async () => {
    try {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setApiTier(hasKey ? 'PRO' : 'BASIC');
      }
    } catch (e) {
      console.warn("AI Studio API indisponível");
    }
  }, []);

  useEffect(() => {
    handleRouting();
    window.addEventListener('popstate', handleRouting);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Auto-localização inicial se estiver na home limpa
    if (window.location.pathname === '/' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // Silenciosamente mantém a localização genérica para o SEO não flutuar muito no client-side
      });
    }

    const timer = setInterval(checkApiTier, 2000);
    return () => {
      window.removeEventListener('popstate', handleRouting);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, [handleRouting, checkApiTier]);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header 
        isScrolled={isScrolled} 
        location={location} 
        apiTier={apiTier}
        onAdminOpen={() => isAuthorized ? setIsAdminOpen(true) : setIsAuthOpen(true)} 
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />
      
      <main className="flex-grow">
        <Hero location={location} onStartLive={() => apiTier === 'PRO' ? setIsLiveAnalysisOpen(true) : setIsTutorialOpen(true)} apiTier={apiTier} />
        <div id="assistente" className="max-w-7xl mx-auto px-4 py-12">
          <MedicalAssistant location={location} />
        </div>
        <SEOContent location={location} />
        <VoiceFAQ location={location} />
      </main>

      <Footer 
        location={location} 
        isAuthorized={isAuthorized}
        onAdminOpen={() => isAuthorized ? setIsAdminOpen(true) : setIsAuthOpen(true)} 
        onProfOpen={() => setIsProfModalOpen(true)}
      />
      
      <WhatsAppWidget />
      
      {/* Gatilho Admin (Flame Work) */}
      <button 
        onClick={() => isAuthorized ? setIsAdminOpen(true) : setIsAuthOpen(true)}
        className={`fixed bottom-6 left-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 hover:scale-110 active:scale-95 transition-all z-[60] border-2 border-white/10 ${isAuthorized ? 'opacity-100' : 'opacity-20'}`}
      >
        <span className="text-2xl">🔥</span>
      </button>

      {isAuthOpen && <AdminAuthModal onClose={() => setIsAuthOpen(false)} onSuccess={() => { setIsAuthorized(true); setIsAuthOpen(false); setIsAdminOpen(true); }} />}
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} onApply={(loc) => setLocation(loc)} currentLocation={location} onOpenProcessing={() => { setIsAdminOpen(false); setIsProcessingOpen(true); }} />}
      {isProcessingOpen && <ProcessingDashboard onClose={() => setIsProcessingOpen(false)} location={location} />}
      {isLiveAnalysisOpen && <LiveAnalysis location={location} onClose={() => setIsLiveAnalysisOpen(false)} />}
      {isTutorialOpen && <TutorialModal onClose={() => setIsTutorialOpen(false)} onOpenSelectKey={async () => { await window.aistudio.openSelectKey(); checkApiTier(); }} />}
      {isProfModalOpen && <ProfessionalModal onClose={() => setIsProfModalOpen(false)} />}
    </div>
  );
};

export default App;
