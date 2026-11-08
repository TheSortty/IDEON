import React from 'react';

import HomePage from './pages/Home/HomePage';
import TerminosPage from './pages/Legal/TerminosPage';
import PoliticaPrivacidadPage from './pages/Legal/PoliticaPrivacidadPage';
import ContactoExitosoPage from './pages/ContactoExitoso/ContactoExitosoPage';
import ServiciosPage from './pages/Servicios/ServiciosPage';
import PaginasWebPage from './pages/Servicios/PaginasWebPage';
import TiendasOnlinePage from './pages/Servicios/TiendasOnlinePage';
import SistemasPage from './pages/Servicios/SistemasPage';
import CasosPage from './pages/Casos/CasosPage';
import CaseStudyPage from './pages/Casos/CaseStudyPage';
import { CASE_STUDIES } from './constants/cases';

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
  { path: '/servicios/', element: <ServiciosPage /> },
  { path: '/servicios/paginas-web/', element: <PaginasWebPage /> },
  { path: '/servicios/tiendas-online/', element: <TiendasOnlinePage /> },
  { path: '/servicios/sistemas-a-medida/', element: <SistemasPage /> },
  { path: '/casos/', element: <CasosPage /> },
  ...CASE_STUDIES.map((study) => ({ path: study.meta.path, element: <CaseStudyPage study={study} /> })),
  { path: '/terminos-y-condiciones/', element: <TerminosPage /> },
  { path: '/politica-de-privacidad/', element: <PoliticaPrivacidadPage /> },
  { path: '/contacto-exitoso/', element: <ContactoExitosoPage /> },
];

const LIVE_PATHS = new Set(SITE_ROUTES.map((route) => route.path));

/** ¿La ruta ya está publicada? La navegación lo usa para no linkear a un 404. */
export const isLivePath = (path: string): boolean => LIVE_PATHS.has(path);

/**
 * Destino real de un link de navegación: la ruta si existe, si no su
 * alternativa. `null` = no hay a dónde llevar todavía: el link no se muestra.
 */
export const resolveNav = (target: { path: string; fallback: string | null }): string | null =>
  isLivePath(target.path) ? target.path : target.fallback;

/** Path con el que el pre-render genera dist/404.html. */
export const NOT_FOUND_PATH = '/404/';
