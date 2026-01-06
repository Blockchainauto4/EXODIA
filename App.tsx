
import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SEOContent from './components/SEOContent';
import VoiceFAQ from './components/VoiceFAQ';
import JobsBoard from './components/JobsBoard';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import CookieConsent from './components/CookieConsent';
import { UserLocation, LegalModalType } from './types';

// Lazy Loading de componentes pesados para otimização de Performance (Code Splitting)
const MedicalAssistant = lazy(() => import('./components/MedicalAssistant'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const ProfessionalModal = lazy(() => import('./components/ProfessionalModal'));
const PatientRegistrationModal = lazy(() => import('./components/PatientRegistrationModal'));
const AdminAuthModal = lazy(() => import('./components/AdminAuthModal'));
const ProcessingDashboard = lazy(() => import('./components/ProcessingDashboard'));
const LegalModal = lazy(() => import('./components/LegalModal'));
const LiveAnalysis = lazy(() => import('./components/LiveAnalysis'));
const TutorialModal = lazy(() => import('./components/TutorialModal'));

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
  const [isProfModalOpen, setIsProfModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isProcessingOpen, setIsProcessingOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLiveOpen, setIsLiveOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  
  const [legalModal, setLegalModal] = useState<{ open: boolean; title: string; type: LegalModalType }>({
    open: false,
    title: '',
    type: 'privacy'
  });

  const handleRouting = useCallback(() => {
    const path = window.location.pathname;
    if (path.startsWith('/tag/')) {
      window.history.replaceState({}, '', '/');
      return;
    }
    const parts = path.split('/').filter(p => p);
    if (parts[0] === 'atendimento' && parts.length >= 2) {
      const stateParam = parts[1].toUpperCase();
      const cityParam = parts[2] ? parts[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
      const specialtyParam = parts[3] ? parts[3].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Atendimento Médico';
      setLocation({ city: cityParam || 'Sua Localidade', state: stateParam, specialty: specialtyParam });
    }
  }, []);

  useEffect(() => {
    handleRouting();
    window.addEventListener('popstate', handleRouting);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('popstate', handleRouting);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleRouting]);

  useEffect(() => {
    const spec = location.specialty || 'Atendimento Médico';
    const city = location.city === 'sua região' ? 'na sua cidade' : location.city;
    const state = location.state === 'Brasil' ? '' : `, ${location.state}`;
    
    document.title = `${spec} Perto de Mim em ${city}${state} | Unidade Mais Próxima`;
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('?')[0]);
    
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', `Encontre ${spec.toLowerCase()} em ${city}${state} agora. Localize unidades de saúde, UPAs e postos de atendimento médico próximos de você com triagem inteligente.`);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header 
        isScrolled={isScrolled} 
        location={location} 
        onAdminOpen={() => isAuthorized ? setIsAdminOpen(true) : setIsAuthOpen(true)}
        onPatientOpen={() => setIsPatientModalOpen(true)}
        onDoctorOpen={() => setIsProfModalOpen(true)}
        onLiveOpen={() => setIsTutorialOpen(true)}
      />
      
      <main className="flex-grow">
        <Hero 
          location={location} 
          onStartChat={() => setIsChatOpen(true)}
          onPatientOpen={() => setIsPatientModalOpen(true)}
          onLiveOpen={() => setIsTutorialOpen(true)}
        />
        
        <JobsBoard location={location} />

        <SEOContent location={location} />
        <VoiceFAQ location={location} />
      </main>

      <Footer 
        location={location} 
        isAuthorized={isAuthorized}
        onAdminOpen={() => isAuthorized ? setIsAdminOpen(true) : setIsAuthOpen(true)} 
        onProfOpen={() => setIsProfModalOpen(true)}
        onOpenLegal={(type, title) => setLegalModal({ open: true, type, title })}
      />
      
      <div className="fixed bottom-24 left-6 z-[100] flex flex-col items-start gap-4">
        {isChatOpen && (
          <Suspense fallback={<div className="w-12 h-12 bg-white rounded-full animate-pulse shadow-xl"></div>}>
            <div className="w-[calc(100vw-3rem)] sm:w-[400px] animate-slide-up shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-[2.5rem] overflow-hidden border-2 border-slate-200 bg-white">
              <MedicalAssistant location={location} onClose={() => setIsChatOpen(false)} />
            </div>
          </Suspense>
        )}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? "Fechar chat de triagem" : "Abrir chat de triagem inteligente"}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-[101] border-2 border-white/20 ${
            isChatOpen ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white shadow-blue-500/40'
          }`}
        >
          <span className="text-2xl" aria-hidden="true">{isChatOpen ? '✕' : '💬'}</span>
        </button>
      </div>

      <WhatsAppWidget />
      <CookieConsent onOpenPrivacy={() => setLegalModal({ open: true, type: 'privacy', title: 'Política de Privacidade' })} />
      
      <button 
        onClick={() => isAuthorized ? setIsAdminOpen(true) : setIsAuthOpen(true)}
        aria-label="Painel Flame Work SEO Admin"
        className={`fixed bottom-6 left-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 hover:scale-110 active:scale-95 transition-all z-[60] border-2 border-white/10 ${isAuthorized ? 'opacity-100' : 'opacity-30'}`}
      >
        <span className="text-2xl" aria-hidden="true">🔥</span>
      </button>

      {/* Modais carregados sob demanda */}
      <Suspense fallback={null}>
        {legalModal.open && <LegalModal title={legalModal.title} type={legalModal.type} onClose={() => setLegalModal({ ...legalModal, open: false })} />}
        {isAuthOpen && <AdminAuthModal onClose={() => setIsAuthOpen(false)} onSuccess={() => { setIsAuthorized(true); setIsAuthOpen(false); setIsAdminOpen(true); }} />}
        {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} onApply={(loc) => setLocation(loc)} currentLocation={location} onOpenProcessing={() => { setIsAdminOpen(false); setIsProcessingOpen(true); }} />}
        {isProcessingOpen && <ProcessingDashboard onClose={() => setIsProcessingOpen(false)} location={location} />}
        {isProfModalOpen && <ProfessionalModal onClose={() => setIsProfModalOpen(false)} />}
        {isPatientModalOpen && <PatientRegistrationModal onClose={() => setIsPatientModalOpen(false)} />}
        {isTutorialOpen && <TutorialModal onClose={() => setIsTutorialOpen(false)} onOpenSelectKey={() => { setIsLiveOpen(true); setIsTutorialOpen(false); }} />}
        {isLiveOpen && <LiveAnalysis location={location} onClose={() => setIsLiveOpen(false)} />}
      </Suspense>
    </div>
  );
};

export default App;
