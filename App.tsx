
import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SEOContent from './components/SEOContent';
import VoiceFAQ from './components/VoiceFAQ';
import JobsBoard from './components/JobsBoard';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import CookieConsent from './components/CookieConsent';
import { UserLocation, LegalModalType, JobOpportunity } from './types';

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
const JobDetailPage = lazy(() => import('./components/JobDetailPage'));
const CareersPage = lazy(() => import('./components/CareersPage'));

const slugify = (text: string) => 
  text.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

const MOCK_JOBS_DATA: Omit<JobOpportunity, 'slug'>[] = [
  { id: 'job-go-001', title: 'Ginecologia e Obstetrícia - Amparo/SP', description: '🤰 Oportunidade para Ginecologia e Obstetrícia em Amparo. Atendimento em Maternidade e Ambulatório. Rede de alta complexidade com suporte completo.', datePosted: '2025-01-26', validThrough: '2025-06-30', employmentType: 'CONTRACTOR', hiringOrganization: 'Hospital Regional Amparo', city: 'Amparo', state: 'SP', specialty: 'Ginecologia', salary: 'Tabela Hospitalar', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-ped-001', title: 'Pediatria (Sala de Parto) - Amparo/SP', description: '👶 Pediatra para acompanhamento de Sala de Parto e Recepção de Recém-nascido. Unidade em Amparo/SP com infraestrutura moderna.', datePosted: '2025-01-26', validThrough: '2025-05-15', employmentType: 'FULL_TIME', hiringOrganization: 'Maternidade Amparo', city: 'Amparo', state: 'SP', specialty: 'Pediatria', salary: 'A combinar', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-eped-001', title: 'Emergência Pediatria (RQE) - Sorocaba/SP', description: '🚨 Plantões de Emergência Pediátrica em Sorocaba/SP. Obrigatório RQE na especialidade. Unidade de pronto atendimento 24h.', datePosted: '2025-01-26', validThrough: '2025-04-01', employmentType: 'TEMPORARY', hiringOrganization: 'Pronto Socorro Infantil Sorocaba', city: 'Sorocaba', state: 'SP', specialty: 'Pediatria', salary: 'Valor por Plantão', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-uti-001', title: 'UTI Neonatal - Taipas/SP', description: '🩺 Médico Intensivista para UTI Neonatal na região de Taipas (São Paulo). Equipe multidisciplinar e suporte tecnológico avançado.', datePosted: '2025-01-26', validThrough: '2025-07-20', employmentType: 'CONTRACTOR', hiringOrganization: 'Hospital Geral Taipas', city: 'São Paulo', state: 'SP', specialty: 'Pediatria', salary: 'Valor Hora UTI', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-orto-jundiai', title: 'Ortopedia Especializada - Jundiaí/SP', description: '🦴 Vaga para Ortopedia em Jundiaí. Atendimento ambulatorial e retaguarda hospitalar. Oportunidade fixa para especialistas.', datePosted: '2025-01-26', validThrough: '2025-08-15', employmentType: 'FULL_TIME', hiringOrganization: 'Hospital Jundiaí', city: 'Jundiaí', state: 'SP', specialty: 'Ortopedia', salary: 'Rendimento Expressivo', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-vasc-001', title: 'Vascular - Jundiaí/SP e Cacoal/RO', description: '🩸 Oportunidade para Angiologia e Cirurgia Vascular em Jundiaí/SP e Cacoal/RO. Vagas para ambulatório e procedimentos cirúrgicos.', datePosted: '2025-01-26', validThrough: '2025-09-01', employmentType: 'CONTRACTOR', hiringOrganization: 'Rede Vascular Integrada', city: 'Jundiaí', state: 'SP', specialty: 'Clínica Geral', salary: 'Comissão por Procedimento', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-card-001', title: 'Cardiologia - Jundiaí/SP', description: '🫀 Cardiologista para corpo clínico em Jundiaí. Exames de imagem (Eco/Holter) e consultas ambulatoriais. Vaga estável.', datePosted: '2025-01-26', validThrough: '2025-10-10', employmentType: 'PART_TIME', hiringOrganization: 'Centro Cardiológico Jundiaí', city: 'Jundiaí', state: 'SP', specialty: 'Cardiologia', salary: 'Valor por Consulta/Exame', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-neuro-001', title: 'Neurologia e Neuropediatria - Jundiaí/SP', description: '🧠 Atendimento especializado em Neurologia Clínica e Neuropediatria em Jundiaí. Foco em neurodesenvolvimento e distúrbios cognitivos.', datePosted: '2025-01-26', validThrough: '2025-12-31', employmentType: 'CONTRACTOR', hiringOrganization: 'NeuroCenter Jundiaí', city: 'Jundiaí', state: 'SP', specialty: 'Saúde Mental', salary: 'Remuneração Diferenciada', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-psiq-001', title: 'Psiquiatria - Jundiaí/SP', description: '🧠 Médico Psiquiatra para acompanhamento ambulatorial e suporte em saúde mental na região de Jundiaí. Agenda flexível.', datePosted: '2025-01-26', validThrough: '2025-11-05', employmentType: 'PART_TIME', hiringOrganization: 'Saúde Mental Regional', city: 'Jundiaí', state: 'SP', specialty: 'Psiquiatria', salary: 'Valor por Atendimento', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-orto-fortaleza', title: 'Ortopedia - Fortaleza/CE', description: '🦴 Oportunidade na Ortopedia em Fortaleza. Atendimento ambulatorial e plantões em hospital de grande porte.', datePosted: '2025-01-26', validThrough: '2025-06-15', employmentType: 'CONTRACTOR', hiringOrganization: 'Hospital Fortaleza Unidade I', city: 'Fortaleza', state: 'CE', specialty: 'Ortopedia', salary: 'A consultar', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-clin-fortaleza', title: 'Clínica Médica - Fortaleza/CE', description: '🏛️ Médico Clínico para atendimento em unidade hospitalar de Fortaleza. Carga horária flexível e excelente ambiente de trabalho.', datePosted: '2025-01-26', validThrough: '2025-09-30', employmentType: 'FULL_TIME', hiringOrganization: 'Rede Saúde Fortaleza', city: 'Fortaleza', state: 'CE', specialty: 'Clínica Geral', salary: 'Salário Fixo + Benefícios', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' },
  { id: 'job-gastro-001', title: 'Gastroenterologia - Valinhos/SP', description: '🧪 Médico Gastroenterologista para Valinhos e Jundiaí. Foco em exames endoscópicos e consultas. Unidade com alto fluxo.', datePosted: '2025-01-26', validThrough: '2025-08-01', employmentType: 'CONTRACTOR', hiringOrganization: 'Clínica Digestiva Valinhos', city: 'Valinhos', state: 'SP', specialty: 'Clínica Geral', salary: 'Fixo + Comissão', contactUrl: 'https://wa.me/message/IVXUAVBMSDFEM1' }
];

const jobsWithSlugs: JobOpportunity[] = MOCK_JOBS_DATA.map(job => ({ ...job, slug: slugify(job.title) }));

const App: React.FC = () => {
  const [location, setLocation] = useState<UserLocation>({ city: 'sua região', state: 'Brasil', specialty: 'Atendimento Médico' });
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  const [isCareersPage, setIsCareersPage] = useState(false);
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
  
  const [legalModal, setLegalModal] = useState<{ open: boolean; title: string; type: LegalModalType }>({ open: false, title: '', type: 'privacy' });

  const handleRouting = useCallback(() => {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p);
    
    // Reseta estados de página
    setSelectedJob(null);
    setIsCareersPage(false);

    if (path.startsWith('/tag/')) {
      window.history.replaceState({}, '', '/');
      return;
    }

    if (path === '/carreiras') {
      setIsCareersPage(true);
    } else if (parts[0] === 'vagas' && parts[1]) {
      const job = jobsWithSlugs.find(j => j.slug === parts[1]);
      setSelectedJob(job || null);
    } else if (parts[0] === 'atendimento' && parts.length >= 2) {
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
    
    let pageTitle = `${spec} Perto de Mim em ${city}${state} | Unidade Mais Próxima`;
    let pageDescription = `Encontre ${spec.toLowerCase()} em ${city}${state} agora. Localize unidades de saúde, UPAs e postos de atendimento médico próximos de você com triagem inteligente.`;

    if (isCareersPage) {
      pageTitle = 'Carreiras - Trabalhe Conosco | IA HOSPITAL';
      pageDescription = 'Junte-se à nossa equipe e faça parte da revolução na saúde digital. Veja as vagas médicas abertas em todo o Brasil e candidate-se.';
    } else if (selectedJob) {
      pageTitle = `${selectedJob.title} | Vaga Médica IA HOSPITAL`;
      pageDescription = `Vaga de ${selectedJob.specialty} em ${selectedJob.city}, ${selectedJob.state}. Candidate-se para a posição de ${selectedJob.title} no ${selectedJob.hiringOrganization}.`;
    }
    
    document.title = pageTitle;
    
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
    description.setAttribute('content', pageDescription);
  }, [location, selectedJob, isCareersPage]);

  const renderMainContent = () => (
    <>
      <Hero 
        location={location} 
        onStartChat={() => setIsChatOpen(true)}
        onPatientOpen={() => setIsPatientModalOpen(true)}
        onLiveOpen={() => setIsTutorialOpen(true)}
      />
      <JobsBoard location={location} jobs={jobsWithSlugs} />
      <SEOContent location={location} />
      <VoiceFAQ location={location} />
    </>
  );

  const renderPage = () => {
    if (isCareersPage) return <CareersPage jobs={jobsWithSlugs} />;
    if (selectedJob) return <JobDetailPage job={selectedJob} />;
    return renderMainContent();
  };

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
        <Suspense fallback={<div className="pt-48 text-center text-lg font-bold">Carregando conteúdo...</div>}>
          {renderPage()}
        </Suspense>
      </main>

      <Footer 
        location={location} 
        isAuthorized={isAuthorized}
        onAdminOpen={() => isAuthorized ? setIsAdminOpen(true) : setIsAuthOpen(true)} 
        onProfOpen={() => setIsProfModalOpen(true)}
        onOpenLegal={(type, title) => setLegalModal({ open: true, type, title })}
      />
      
      {!selectedJob && !isCareersPage && (
        <>
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
        </>
      )}

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
