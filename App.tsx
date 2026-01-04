
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MedicalAssistant from './components/MedicalAssistant';
import SEOContent from './components/SEOContent';
import VoiceFAQ from './components/VoiceFAQ';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { UserLocation } from './types';

const App: React.FC = () => {
  const [location, setLocation] = useState<UserLocation>({ 
    city: 'sua região', 
    state: 'Brasil',
    specialty: 'Atendimento Médico'
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Função para sincronizar o Título e Metadados SEO
  const updateSEOMetadata = (loc: UserLocation) => {
    const title = `${loc.specialty} Perto de Mim em ${loc.city} - ${loc.state} | IA HOSPITAL`;
    document.title = title;
    
    // Atualiza a tag canonical dinamicamente para o Google
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const slugCity = loc.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-');
      const slugState = loc.state.toLowerCase();
      canonical.setAttribute('href', `https://iahospital.com.br/atendimento/${slugState}/${slugCity}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Lógica de Roteamento Avançada (Lê Pathname ou Query Params)
    const parseLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const pathParts = window.location.pathname.split('/').filter(p => p);
      
      // Exemplo de path: /atendimento/sp/sao-paulo/cardiologia
      // Parts: [0]: atendimento, [1]: sp, [2]: sao-paulo, [3]: cardiologia
      
      let city = params.get('cidade');
      let state = params.get('estado');
      let specialty = params.get('especialidade');

      if (pathParts.length >= 3) {
        state = pathParts[1].toUpperCase();
        city = pathParts[2].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        if (pathParts[3]) {
          specialty = pathParts[3].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        }
      }

      if (city || state || specialty) {
        const newLoc = {
          city: city || 'sua localidade',
          state: state || 'Brasil',
          specialty: specialty || 'Atendimento Médico'
        };
        setLocation(newLoc);
        updateSEOMetadata(newLoc);
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation(prev => ({ 
              ...prev,
              city: 'sua cidade atual', 
              lat: position.coords.latitude, 
              lng: position.coords.longitude 
            }));
          },
          () => console.log("Geolocation access denied")
        );
      }
    };

    parseLocation();
    window.addEventListener('popstate', parseLocation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', parseLocation);
    };
  }, []);

  const handleApplyLocation = (newLocation: UserLocation) => {
    setLocation(newLocation);
    updateSEOMetadata(newLocation);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header 
        isScrolled={isScrolled} 
        location={location} 
        onAdminOpen={() => setIsAdminOpen(true)} 
      />
      <main className="flex-grow">
        <Hero location={location} />
        <div id="assistente" className="max-w-7xl mx-auto px-4 py-12">
          <MedicalAssistant location={location} />
        </div>
        <SEOContent location={location} />
        <VoiceFAQ location={location} />
      </main>
      <Footer onAdminOpen={() => setIsAdminOpen(true)} />
      
      {/* Botão Flutuante Admin */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-slate-800 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-slate-700 hover:scale-110 transition-all z-[60] border-2 border-orange-500/20"
        title="Admin SEO Flame Work"
      >
        <span className="text-xl">🔥</span>
      </button>

      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} onApply={handleApplyLocation} currentLocation={location} />}
    </div>
  );
};

export default App;
