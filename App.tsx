
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MedicalAssistant from './components/MedicalAssistant';
import SEOContent from './components/SEOContent';
import VoiceFAQ from './components/VoiceFAQ';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import LiveAnalysis from './components/LiveAnalysis';
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

    const handlePopState = () => {
      const loc = parseLocationFromUrl();
      if (loc) {
        setLocation(loc);
        updateSEOMetadata(loc);
      }
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [parseLocationFromUrl, updateSEOMetadata]);

  const handleApplyLocation = useCallback((newLocation: UserLocation) => {
    setLocation(newLocation);
    updateSEOMetadata(newLocation);
  }, [updateSEOMetadata]);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header 
        isScrolled={isScrolled} 
        location={location} 
        onAdminOpen={() => setIsAdminOpen(true)} 
      />
      <main className="flex-grow">
        <Hero location={location} onStartLive={() => setIsLiveAnalysisOpen(true)} />
        <div id="assistente" className="max-w-7xl mx-auto px-4 py-12">
          <MedicalAssistant location={location} />
        </div>
        <SEOContent location={location} />
        <VoiceFAQ location={location} />
      </main>
      <Footer onAdminOpen={() => setIsAdminOpen(true)} />
      
      {/* Botão Flutuante Flame Work */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-orange-600 hover:scale-110 active:scale-95 transition-all z-[60] border-2 border-white/10 group"
        title="Flame Work SEO Suite"
      >
        <span className="text-2xl group-hover:animate-bounce">🔥</span>
      </button>

      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} onApply={handleApplyLocation} currentLocation={location} />}
      
      {isLiveAnalysisOpen && <LiveAnalysis location={location} onClose={() => setIsLiveAnalysisOpen(false)} />}
    </div>
  );
};

export default App;
