import { useEffect } from 'react';

/**
 * Actualiza el <title> y el <meta name="description"> del documento mientras
 * el componente que llama al hook está montado, y restaura los valores
 * anteriores al desmontar. Es un sitio sin SSR, así que esta es la forma más
 * simple de tener título/description por página sin sumar dependencias.
 */
export function useDocumentMeta(title: string, description: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute('content') ?? null;
    metaDescription?.setAttribute('content', description);

    return () => {
      document.title = previousTitle;
      if (previousDescription !== null) {
        metaDescription?.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
}
