import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import Button from '../../components/ui/Button';

// Se pre-renderiza como dist/404.html y Cloudflare la sirve con status 404 para
// cualquier ruta que no exista (wrangler.jsonc → not_found_handling). Antes
// toda ruta desconocida devolvía la home con 200, que Google trata como
// "soft 404".
const NotFoundPage: React.FC = () => {
  useDocumentMeta(
    'Página no encontrada – IDEON',
    'La página que buscás no existe o cambió de dirección.',
    { robots: 'noindex, follow' },
  );

  return (
    <section>
      <div className="container-site">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-accent font-extrabold text-6xl">404</p>
          <h1 className="mt-6 font-extrabold text-content">Esta página no existe</h1>
          <p className="mt-4 text-lg text-content-muted">
            Puede que el link esté mal escrito o que la página haya cambiado de dirección.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href="/">Volver al inicio</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
