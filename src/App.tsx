import React from 'react';
import './index.css';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsAppButton from './components/layout/FloatingWhatsAppButton';

// UI
import ParticleBackground from './components/ui/ParticleBackground';

// Modals
import ContactModal from './components/modals/ContactModal';
import TallyModal from './components/modals/TallyModal';

// Pages
import HomePage from './pages/Home/HomePage';
import TerminosPage from './pages/Legal/TerminosPage';
import PoliticaPrivacidadPage from './pages/Legal/PoliticaPrivacidadPage';

// Sitio sin librería de routing: alcanza con mirar el pathname una vez al
// cargar. wrangler.jsonc ya sirve cualquier ruta como single-page-application,
// así que /terminos-y-condiciones/ y /politica-de-privacidad/ llegan acá.
function getPage(pathname: string): React.ReactNode {
  switch (pathname.replace(/\/+$/, '')) {
    case '/terminos-y-condiciones':
      return <TerminosPage />;
    case '/politica-de-privacidad':
      return <PoliticaPrivacidadPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  const page = getPage(window.location.pathname);

  return (
    <ThemeProvider>
      <ModalProvider>
        <ParticleBackground />
        <div className="bg-transparent text-[#111] dark:text-brand-text-primary antialiased relative z-10">
          <Header />
          <main>
            {page}
          </main>
          <Footer />
          <ContactModal />
          <TallyModal />
          <FloatingWhatsAppButton />
        </div>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;