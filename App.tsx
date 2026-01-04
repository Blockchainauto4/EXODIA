
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
import { UserLocation } from './types';

const App: React.FC = () => {
  const [location, setLocation] = useState<UserLocation>({ 
    city: 'sua região', 
    state: 'Brasil',
    specialty: 'Atendimento Médico'
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLiveAnalysisOpen, setIsLiveAnalysisOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [apiTier, setApiTier] = useState<'BASIC' | 'PRO'>('BASIC');

  const checkApiTier = useCallback(async () => {
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiTier(hasKey ? 'PRO' : 'BASIC');
    }
  }, []);

  const updateSEOMetadata = useCallback((loc: UserLocation) => {
    const title = `${loc.specialty} Perto de Mim em ${loc.city} - ${loc.state} | IA HOSPITAL`;
    document.title = title;
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const slugCity = loc.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-');
      const slugState = loc.state.toLowerCase();
      canonical.setAttribute('href', `https://iahospital.com.br/atendimento/${slugState}/${slugCity}`);
    }
  }, []);

  const parseLocationFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const pathParts = window.location.pathname.split('/').filter(p => p);
    
    let city = params.get('cidade');
    let state = params.get('estado');
    let specialty = params.get('especialidade');

    if (pathParts.length >= 3 && pathParts[0] === 'atendimento') {
      state = pathParts[1].toUpperCase();
      city = pathParts[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      if (pathParts[3]) {
        specialty = pathParts[3].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }

    if (city || state || specialty) {
      return {
        city: city || 'sua localidade',
        state: state || 'Brasil',
        specialty: specialty || 'Atendimento Médico'
      };
    }
    return null;
  }, []);

  useEffect(() => {
    checkApiTier();
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const initialLoc = parseLocationFromUrl();
    if (initialLoc) {
      setLocation(initialLoc);
      updateSEOMetadata(initialLoc);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { 
            city: 'sua cidade atual', 
            state: 'Brasil',
            specialty: 'Atendimento Médico',
            lat: position.coords.latitude, 
            lng: position.coords.longitude 
          };
          setLocation(loc);
          updateSEOMetadata(loc);
        },
        () => console.log("Geolocation access denied")
      );
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [parseLocationFromUrl, updateSEOMetadata, checkApiTier]);

  const handleStartLiveAnalysis = async () => {
    if (window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setIsTutorialOpen(true);
      } else {
        setIsLiveAnalysisOpen(true);
      }
    } else {
      setIsLiveAnalysisOpen(true);
    }
  };

  const handleOpenSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      await checkApiTier();
      setIsLiveAnalysisOpen(true);
    }
  };

  const handleApplyLocation = useCallback((newLocation: UserLocation) => {
    setLocation(newLocation);
    updateSEOMetadata(newLocation);
  }, [updateSEOMetadata]);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header 
        isScrolled={isScrolled} 
        location={location} 
        apiTier={apiTier}
        onAdminOpen={() => setIsAdminOpen(true)} 
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />
      <main className="flex-grow">
        <Hero location={location} onStartLive={handleStartLiveAnalysis} apiTier={apiTier} />
        <div id="assistente" className="max-w-7xl mx-auto px-4 py-12">
          <MedicalAssistant location={location} />
        </div>
        <SEOContent location={location} />
        <VoiceFAQ location={location} />
      </main>
      <Footer onAdminOpen={() => setIsAdminOpen(true)} />
      
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 hover:scale-110 active:scale-95 transition-all z-[60] border-2 border-white/10 group"
        title="Flame Work SEO Suite"
      >
        <span className="text-2xl group-hover:animate-bounce">🔥</span>
      </button>

      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} onApply={handleApplyLocation} currentLocation={location} />}
      
      {isLiveAnalysisOpen && <LiveAnalysis location={location} onClose={() => setIsLiveAnalysisOpen(false)} />}

      {isTutorialOpen && (
        <TutorialModal 
          onClose={() => setIsTutorialOpen(false)} 
          onOpenSelectKey={handleOpenSelectKey} 
        />
      )}
    </div>
  );
};

export default App;
