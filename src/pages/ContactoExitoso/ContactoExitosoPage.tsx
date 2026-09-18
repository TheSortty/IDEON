import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { openWhatsApp } from '../../constants/contact';
import Button from '../../components/ui/Button';

const SuccessIcon: React.FC = () => (
  <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Página destino para cuando alguien completa "Quiero mi cotización". No es
// solo un mensaje de cortesía: al ser una URL propia (no un estado dentro del
// modal), sirve como página de conversión para pixeles/tags de Google Ads,
// Meta, etc. que se disparan por pageview en una ruta específica.
const ContactoExitosoPage: React.FC = () => {
  // noindex: es una página de gracias, no tiene nada que buscar nadie desde
  // Google y aparecer en los resultados solo ensucia. `follow` para que igual
  // siga los links de vuelta al sitio. Tampoco está en el sitemap.
  useDocumentMeta(
    'Mensaje enviado – IDEON',
    'Recibimos tu consulta. El equipo de IDEON te va a responder a la brevedad con una cotización a medida.',
    { canonicalPath: '/contacto-exitoso/', robots: 'noindex, follow' }
  );

  return (
    <section>
      <div className="container-site">
        <div className="max-w-lg mx-auto text-center">
          <SuccessIcon />

          <h1 className="mt-6 font-extrabold text-content">
            ¡Listo, ya recibimos tu mensaje!
          </h1>
          <p className="mt-4 text-lg text-content-muted">
            Gracias por contarnos tu idea. Te vamos a responder a la brevedad con una cotización a medida de tu
            proyecto.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/">
              Volver al inicio
            </Button>
            <Button
              variant="outline"
              onClick={() => openWhatsApp('Hola Ideon, te acabo de escribir por el formulario del sitio.')}
            >
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoExitosoPage;
