import React from 'react';

import HomePage from './pages/Home/HomePage';
import TerminosPage from './pages/Legal/TerminosPage';
import PoliticaPrivacidadPage from './pages/Legal/PoliticaPrivacidadPage';
import ContactoExitosoPage from './pages/ContactoExitoso/ContactoExitosoPage';

/**
 * Las rutas del sitio. Es la única fuente: la usan el <Routes> de App.tsx y el
 * pre-render del build (scripts/prerender.mjs), que genera un HTML estático
 * por cada una. Una página nueva se suma ACÁ y queda ruteada y pre-renderizada
 * a la vez; además va al sitemap (public/sitemap.xml) si es indexable.
 *
 * Los paths van con barra final, que es la forma canónica del sitio: Cloudflare
 * sirve /ruta/index.html y redirige /ruta → /ruta/.
 */
export interface SiteRoute {
  path: string;
  element: React.ReactNode;
}

export const SITE_ROUTES: readonly SiteRoute[] = [
  { path: '/', element: <HomePage /> },
  { path: '/terminos-y-condiciones/', element: <TerminosPage /> },
  { path: '/politica-de-privacidad/', element: <PoliticaPrivacidadPage /> },
  { path: '/contacto-exitoso/', element: <ContactoExitosoPage /> },
];

/** Path con el que el pre-render genera dist/404.html. */
export const NOT_FOUND_PATH = '/404/';
