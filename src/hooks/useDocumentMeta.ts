import { useEffect } from 'react';
import { absoluteUrl } from '../constants/seo';

interface DocumentMetaOptions {
  /** Ruta canónica de la página ('/terminos-y-condiciones/'). */
  canonicalPath?: string;
  /** Valor de <meta name="robots">. Ej: 'noindex, follow'. */
  robots?: string;
}

/** Cambia el `content` de un <meta> y devuelve cómo restaurarlo al desmontar. */
function setMetaContent(selector: string, value: string): () => void {
  const tag = document.querySelector(selector);
  if (tag === null) return () => {};

  const previous = tag.getAttribute('content');
  tag.setAttribute('content', value);

  return () => {
    if (previous !== null) tag.setAttribute('content', previous);
  };
}

/**
 * Actualiza el <title>, el <meta name="description"> y —si se le pasan— la URL
 * canónica y el <meta name="robots"> del documento mientras el componente que
 * llama al hook está montado, y restaura los valores anteriores al desmontar.
 * Es un sitio sin SSR, así que esta es la forma más simple de tener
 * título/description por página sin sumar dependencias.
 *
 * Ojo: `index.html` sale del server con el canonical de la home, y esto lo
 * corrige recién al renderizar. Google ejecuta JS y lo toma, pero la solución
 * de fondo es servir HTML propio por ruta (la migración a MPA pendiente).
 */
export function useDocumentMeta(
  title: string,
  description: string,
  options: DocumentMetaOptions = {},
): void {
  const { canonicalPath, robots } = options;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const restore = [setMetaContent('meta[name="description"]', description)];

    if (robots !== undefined) {
      restore.push(setMetaContent('meta[name="robots"]', robots));
    }

    if (canonicalPath !== undefined) {
      const canonical = document.querySelector('link[rel="canonical"]');
      const previousHref = canonical?.getAttribute('href') ?? null;
      canonical?.setAttribute('href', absoluteUrl(canonicalPath));
      restore.push(() => {
        if (previousHref !== null) canonical?.setAttribute('href', previousHref);
      });
    }

    return () => {
      document.title = previousTitle;
      restore.forEach((undo) => undo());
    };
  }, [title, description, canonicalPath, robots]);
}
