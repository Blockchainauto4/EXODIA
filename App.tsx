
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MedicalAssistant from './components/MedicalAssistant';
import SEOContent from './components/SEOContent';
import VoiceFAQ from './components/VoiceFAQ';
import JobsBoard from './components/JobsBoard';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import ProfessionalModal from './components/ProfessionalModal';
import PatientRegistrationModal from './components/PatientRegistrationModal';
import WhatsAppWidget from './components/WhatsAppWidget';
import AdminAuthModal from './components/AdminAuthModal';
import ProcessingDashboard from './components/ProcessingDashboard';
import LegalModal from './components/LegalModal';
import CookieConsent from './components/CookieConsent';
import LiveAnalysis from './components/LiveAnalysis';
import TutorialModal from './components/TutorialModal';
import { UserLocation, LegalModalType } from './types';

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
    
    document.title = `${spec} Perto de Mim em ${city}${state} | Aberto Agora 24h`;
    
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
    description.setAttribute('content', `Precisa de ${spec.toLowerCase()} em ${city}${state} agora? Atendimento médico próximo de você, no seu bairro, com triagem inteligente 24 horas. Marque sua consulta ou encontre um pronto atendimento hoje.`);
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
          <div className="w-[calc(100vw-3rem)] sm:w-[400px] animate-slide-up shadow-[0_20px_60px_rgba(0,0,0,0.4)] rounded-[2.5rem] overflow-hidden border-2 border-slate-200 bg-white">
            <MedicalAssistant location={location} onClose={() => setIsChatOpen(false)} />
          </div>
        )}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-[101] border-2 border-white/20 ${
            isChatOpen ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white shadow-blue-500/40'
          }`}
        >
          <span className="text-2xl">{isChatOpen ? '✕' : '💬'}</span>
        </button>
      </div>

      <WhatsAppWidget />
      <CookieConsent onOpenPrivacy={() => setLegalModal({ open: true, type: 'privacy', title: 'Política de Privacidade' })} />
      
      <button 
        onClick={() => isAuthorized ? setIsAdminOpen(true) : setIsAuthOpen(true)}
        className={`fixed bottom-6 left-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 hover:scale-110 active:scale-95 transition-all z-[60] border-2 border-white/10 ${isAuthorized ? 'opacity-100' : 'opacity-30'}`}
      >
        <span className="text-2xl">🔥</span>
      </button>

      {legalModal.open && <LegalModal title={legalModal.title} type={legalModal.type} onClose={() => setLegalModal({ ...legalModal, open: false })} />}
      {isAuthOpen && <AdminAuthModal onClose={() => setIsAuthOpen(false)} onSuccess={() => { setIsAuthorized(true); setIsAuthOpen(false); setIsAdminOpen(true); }} />}
      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} onApply={(loc) => setLocation(loc)} currentLocation={location} onOpenProcessing={() => { setIsAdminOpen(false); setIsProcessingOpen(true); }} />}
      {isProcessingOpen && <ProcessingDashboard onClose={() => setIsProcessingOpen(false)} location={location} />}
      {isProfModalOpen && <ProfessionalModal onClose={() => setIsProfModalOpen(false)} />}
      {isPatientModalOpen && <PatientRegistrationModal onClose={() => setIsPatientModalOpen(false)} />}
      {isTutorialOpen && <TutorialModal onClose={() => setIsTutorialOpen(false)} onOpenSelectKey={() => { setIsLiveOpen(true); setIsTutorialOpen(false); }} />}
      {isLiveOpen && <LiveAnalysis location={location} onClose={() => setIsLiveOpen(false)} />}
    </div>
  );
};

export default App;
