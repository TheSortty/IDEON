import React from 'react';
import { MotionConfig } from 'framer-motion';
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
import ContactoExitosoPage from './pages/ContactoExitoso/ContactoExitosoPage';

// Sitio sin librería de routing: alcanza con mirar el pathname una vez al
// cargar. wrangler.jsonc ya sirve cualquier ruta como single-page-application,
// así que /terminos-y-condiciones/, /politica-de-privacidad/ y
// /contacto-exitoso/ llegan acá.
function getPage(pathname: string): React.ReactNode {
  switch (pathname.replace(/\/+$/, '')) {
    case '/terminos-y-condiciones':
      return <TerminosPage />;
    case '/politica-de-privacidad':
      return <PoliticaPrivacidadPage />;
    case '/contacto-exitoso':
      return <ContactoExitosoPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  const page = getPage(window.location.pathname);

  return (
    // reducedMotion="user" respeta la preferencia del sistema en TODAS las
    // animaciones de framer-motion. Hace falta además de la regla CSS de
    // @media: framer-motion anima en JS y una regla de CSS no lo frena.
    // Framer sigue animando la opacidad, así que nada queda en opacity: 0, y
    // los transforms se aplican de una en vez de interpolarse.
    <MotionConfig reducedMotion="user">
    <ThemeProvider>
      <ModalProvider>
        <ParticleBackground />
        <div className="bg-transparent text-content antialiased relative z-10">
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
    </MotionConfig>
  );
}

export default App;