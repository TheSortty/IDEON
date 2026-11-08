import React, { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { useLocation, useRoutes } from 'react-router';
import './index.css';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsAppButton from './components/layout/FloatingWhatsAppButton';
import ScrollChrome from './components/layout/ScrollChrome';

// UI
import ParticleBackground from './components/ui/ParticleBackground';

// Modals
import ContactModal from './components/modals/ContactModal';
import TallyModal from './components/modals/TallyModal';

// Pages
import { SITE_ROUTES } from './routes';
import NotFoundPage from './pages/NotFound/NotFoundPage';

// El router no es quien elige el HTML: cada ruta llega del servidor ya
// pre-renderizada (ver scripts/prerender.mjs). App.tsx es el mismo árbol en el
// build y en el navegador; el router de afuera (StaticRouter en
// entry-server.tsx, BrowserRouter en main.tsx) le dice en qué ruta está.

/** En la navegación interna, arranca cada página desde arriba (o en su #ancla). */
function ScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // En la carga inicial manda el navegador (respeta el scroll al recargar).
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

const ROUTES = [...SITE_ROUTES, { path: '*', element: <NotFoundPage /> }];

function SiteRoutes() {
  return useRoutes(ROUTES);
}

function App() {
  return (
    // reducedMotion="user" respeta la preferencia del sistema en TODAS las
    // animaciones de framer-motion. Hace falta además de la regla CSS de
    // @media: framer-motion anima en JS y una regla de CSS no lo frena.
    // Framer sigue animando la opacidad, así que nada queda en opacity: 0, y
    // los transforms se aplican de una en vez de interpolarse.
    <MotionConfig reducedMotion="user">
    <ThemeProvider>
      <ModalProvider>
        <ScrollOnNavigate />
        <ParticleBackground />
        <div className="bg-transparent text-content antialiased relative z-10">
          <Header />
          <main>
            <SiteRoutes />
          </main>
          <Footer />
          <ContactModal />
          <TallyModal />
          <ScrollChrome />
          <FloatingWhatsAppButton />
        </div>
      </ModalProvider>
    </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
