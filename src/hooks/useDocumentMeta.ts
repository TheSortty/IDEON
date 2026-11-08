import { useContext, useEffect } from 'react';
import { absoluteUrl } from '../constants/seo';
import { HeadContext } from '../seo/HeadContext';

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
 * En el build, el pre-render (scripts/prerender.mjs) recoge estos mismos
 * valores por `HeadContext` y los escribe en el HTML estático de la ruta: el
 * efecto de abajo solo hace falta para la navegación interna sin recarga.
 */
export function useDocumentMeta(
  title: string,
  description: string,
  options: DocumentMetaOptions = {},
): void {
  const { canonicalPath, robots } = options;

  // Pre-render: los efectos no corren en el servidor, así que se anota acá.
  const head = useContext(HeadContext);
  if (head !== null) {
    head.title = title;
    head.description = description;
    if (canonicalPath !== undefined) head.canonicalPath = canonicalPath;
    if (robots !== undefined) head.robots = robots;
  }

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
