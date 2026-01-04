
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
    
    // Atualiza Meta Description dinamicamente para o Googlebot
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = description;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    
    // Atualiza Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    const slugCity = loc.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-');
    const slugState = loc.state.toLowerCase();
    const canonicalUrl = `https://iahospital.com.br/atendimento/${slugState}/${slugCity}`;
    
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }
  }, []);

  const parseLocationFromUrl = useCallback(() => {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p);
    
    if (parts[0] === 'atendimento' && parts.length >= 2) {
      const stateParam = parts[1].toUpperCase();
      const cityParam = parts[2] ? parts[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
      const specialtyParam = parts[3] ? parts[3].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Atendimento Médico';

      return { 
        city: cityParam || 'Sua Localidade', 
        state: stateParam, 
        specialty: specialtyParam 
      };
    }
    return null;
  }, []);

  // Sincroniza estado inicial e ouve mudanças de URL (Popstate)
  useEffect(() => {
    const syncLocation = () => {
      const initialLoc = parseLocationFromUrl();
      if (initialLoc) {
        setLocation(initialLoc);
        updateSEOMetadata(initialLoc);
      }
    };

    syncLocation();
    window.addEventListener('popstate', syncLocation);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    // Se não houver rota, tenta geolocalização como fallback (mas não sobrepõe a URL)
    if (!parseLocationFromUrl() && navigator.geolocation) {
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
        }
      );
    }

    checkApiTier();
    return () => {
      window.removeEventListener('popstate', syncLocation);
      window.removeEventListener('scroll', handleScroll);
    };
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
                  Modo de Orientação Básico Ativo em {location.city}. Para análise visual Pro, configure sua chave de API.
                </p>
              </div>
              <button onClick={() => setIsTutorialOpen(true)} className="text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">Ativar Pro</button>
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
        title="Configurações SEO Flame Work"
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
