import { createContext } from 'react';

/**
 * Lo que una página declara para el <head> del documento.
 *
 * En el navegador los hooks `useDocumentMeta` y `useJsonLd` tocan el DOM en un
 * efecto, como siempre. Pero en el pre-render (build) los efectos no corren:
 * ahí el script de pre-render provee un `HeadData` vacío por este contexto,
 * los hooks lo llenan DURANTE el render y el script lo vuelca al HTML estático
 * de cada ruta. Así el título, la description, el canonical y el JSON-LD de
 * cada página salen del servidor sin depender de que el crawler ejecute JS.
 */
export interface HeadData {
  title?: string;
  description?: string;
  /** Ruta canónica con barra final ('/terminos-y-condiciones/'). */
  canonicalPath?: string;
  robots?: string;
  /** Bloques JSON-LD propios de la página (el global vive en index.html). */
  jsonLd: { id: string; json: string }[];
}

export const HeadContext = createContext<HeadData | null>(null);
