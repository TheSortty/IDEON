import React, { useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { useLocation, useRoutes } from 'react-router';
import './index.css';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsAppButton from './components/layout/FloatingWhatsAppButton';
import ScrollChrome from './components/layout/ScrollChrome';

// UI
import ParticleBackground from './components/ui/ParticleBackground';


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

/**
 * El header es fijo (se esconde al bajar y vuelve al subir), así que el
 * <main> reserva su alto. En el Inicio no: el hero ocupa la pantalla
 * completa y el header queda transparente encima.
 */
function Main({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <main id="contenido" tabIndex={-1} className={pathname === '/' ? 'outline-none' : 'pt-[var(--header-h)] outline-none'}>
      {children}
    </main>
  );
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
        <ScrollOnNavigate />
        <ParticleBackground />
        <div className="bg-transparent text-content antialiased relative z-10">
          <a href="#contenido" className="skip-link no-underline">
            Saltar al contenido
          </a>
          <Header />
          <Main>
            <SiteRoutes />
          </Main>
          <Footer />
          <ScrollChrome />
          <FloatingWhatsAppButton />
        </div>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
