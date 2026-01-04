
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Lógica de Roteamento Virtual para SEO (Query Params)
    const params = new URLSearchParams(window.location.search);
    const cityParam = params.get('cidade');
    const stateParam = params.get('estado');
    const specialtyParam = params.get('especialidade');

    if (cityParam || stateParam || specialtyParam) {
      setLocation({
        city: cityParam || 'sua localidade',
        state: stateParam || 'Brasil',
        specialty: specialtyParam || 'Atendimento Médico'
      });
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
        () => console.log("Location access denied")
      );
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateSEO = (newLocation: UserLocation) => {
    setLocation(newLocation);
    document.title = `${newLocation.specialty} em ${newLocation.city} - ${newLocation.state} | IA HOSPITAL`;
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
      
      {/* Botão Flutuante Admin - Mantido para facilidade de uso durante desenvolvimento */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-slate-800 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-slate-700 hover:scale-110 transition-all z-[60]"
        title="Admin SEO Flame Work"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isAdminOpen && <AdminPanel onClose={() => setIsAdminOpen(false)} onApply={updateSEO} currentLocation={location} />}
    </div>
  );
};

export default App;
