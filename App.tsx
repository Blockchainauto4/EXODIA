
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
      return hasKey;
    }
    return false;
  }, []);

  const updateSEOMetadata = useCallback((loc: UserLocation) => {
    const title = `${loc.specialty} Perto de Mim em ${loc.city} - ${loc.state} | IA HOSPITAL`;
    const description = `Busca ${loc.specialty?.toLowerCase()} próximo de mim em ${loc.city}? O IA HOSPITAL oferece orientação médica inteligente e triagem por IA na sua região agora.`;
    
    document.title = title;
    
    // Update Meta Description for SEO bots
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    
    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const slugCity = loc.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-');
      const slugState = loc.state.toLowerCase();
      canonical.setAttribute('href', `https://iahospital.com.br/atendimento/${slugState}/${slugCity}`);
    }
  }, []);

  const parseLocationFromUrl = useCallback(() => {
    const pathParts = window.location.pathname.split('/').filter(p => p);
    
    // Pattern: /atendimento/{state}/{city}/{specialty}
    if (pathParts[0] === 'atendimento' && pathParts.length >= 2) {
      const state = pathParts[1].toUpperCase();
      const city = pathParts[2] 
        ? pathParts[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        : 'Sua Cidade';
      const specialty = pathParts[3]
        ? pathParts[3].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        : 'Atendimento Médico';

      return { city, state, specialty };
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
            city: 'Sua Localização', 
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

    return () => window.removeEventListener('scroll', handleScroll);
  }, [parseLocationFromUrl, updateSEOMetadata, checkApiTier]);

  const handleStartLiveAnalysis = async () => {
    const isPro = await checkApiTier();
    if (!isPro) {
      setIsTutorialOpen(true);
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
        
        {apiTier === 'BASIC' && (
          <div className="max-w-7xl mx-auto px-4 mt-8">
            <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">🩺</span>
                <p className="text-blue-900 text-sm font-medium">
                  Modo de Orientação Básico Ativo. Para diagnóstico visual por IA em {location.city}, ative sua chave Pro.
                </p>
              </div>
              <button onClick={() => setIsTutorialOpen(true)} className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">Configurar Pro</button>
            </div>
          </div>
        )}

        <div id="assistente" className="max-w-7xl mx-auto px-4 py-12">
          <MedicalAssistant location={location} />
        </div>
        <SEOContent location={location} />
        <VoiceFAQ location={location} />
      </main>
      <Footer location={location} onAdminOpen={() => setIsAdminOpen(true)} />
      
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 active:scale-95 transition-all z-[60] border-2 border-white/10 group"
      >
        <span className="text-2xl group-hover:animate-bounce">🔥</span>
      </button>

      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} onApply={handleApplyLocation} currentLocation={location} />}
      {isLiveAnalysisOpen && <LiveAnalysis location={location} onClose={() => setIsLiveAnalysisOpen(false)} />}
      {isTutorialOpen && <TutorialModal onClose={() => setIsTutorialOpen(false)} onOpenSelectKey={handleOpenSelectKey} />}
    </div>
  );
};

export default App;
