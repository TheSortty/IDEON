import { useContext, useEffect } from 'react';
import { HeadContext } from '../seo/HeadContext';

/**
 * Inyecta un bloque JSON-LD mientras el componente que lo llama está montado,
 * y lo saca al desmontar.
 *
 * El Schema de la organización y del sitio es estático y vive en `index.html`,
 * porque vale para todas las rutas. Este hook es para el marcado que depende
 * de la página: el FAQPage de la home no tiene por qué aparecer en los
 * términos y condiciones.
 *
 * @param data  El objeto JSON-LD, o `null` para no inyectar nada.
 * @param id    Identificador del <script>, para no pisar el de otra página.
 */
export function useJsonLd(data: object | null, id: string): void {
  // El objeto se arma en el render, así que su identidad cambia siempre. Lo
  // serializamos y usamos el string como dependencia: el efecto solo vuelve a
  // correr si el contenido realmente cambió.
  const json = data === null ? null : JSON.stringify(data);

  // Pre-render: se anota para que el script lo escriba en el HTML estático.
  const head = useContext(HeadContext);
  if (head !== null && json !== null && !head.jsonLd.some((block) => block.id === id)) {
    head.jsonLd.push({ id, json });
  }

  useEffect(() => {
    if (json === null) return;

    // Si la página llegó pre-renderizada, el bloque ya está en el <head>: se
    // reemplaza en vez de duplicarlo.
    document.getElementById(id)?.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = json;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [json, id]);
}
