import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { whatsappUrl } from '../../constants/contact';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import PageShell from '../../components/page/PageShell';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { CASOS_META } from '../../constants/cases';

const COPY = {
  title: '¡Recibimos tu consulta!',
  text: 'Te escribimos dentro del horario de atención. Si es urgente, mandanos un WhatsApp.',
  cases: 'Mientras tanto, ver casos',
  whatsapp: 'Hablar por WhatsApp',
  whatsappMessage: 'Hola IDEON, te acabo de escribir por el formulario del sitio.',
} as const;

// Página destino del formulario de contacto. No es solo un mensaje de
// cortesía: al ser una URL propia sirve como página de conversión para la
// medición (GA4, Pixel de Meta: ver docs/pendiente-medicion-pixel-ga4.md).
const ContactoExitosoPage: React.FC = () => {
  // noindex: es una página de gracias, no tiene nada que buscar nadie desde
  // Google. `follow` para que igual siga los links. Tampoco está en el sitemap.
  useDocumentMeta(
    'Mensaje enviado – IDEON',
    'Recibimos tu consulta. El equipo de IDEON te va a responder a la brevedad con una cotización a medida.',
    { canonicalPath: '/contacto-exitoso/', robots: 'noindex, follow' },
  );

  return (
    <PageShell orb="center">
      <section className="!pb-[120px] !pt-[96px]">
        <div className="container-site">
          <SpotlightCard
            role="status"
            className="plan-featured mx-auto max-w-[640px] overflow-visible rounded-[28px] border-2 border-transparent bg-surface-raised/70 px-7 py-[clamp(36px,5vw,64px)] shadow-[0_0_50px_rgb(var(--accent)/0.3)]"
          >
            <div className="flex animate-rise flex-col items-center gap-[18px] text-center">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-accent/20 text-accent shadow-[0_0_40px_rgb(var(--accent)/0.5)]">
                <Icon name="check" size={34} strokeWidth={2.5} />
              </span>
              <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-content">{COPY.title}</h1>
              <p className="max-w-[380px] text-base leading-relaxed text-content-muted">{COPY.text}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button to={CASOS_META.path}>{COPY.cases}</Button>
                <Button href={whatsappUrl(COPY.whatsappMessage)} target="_blank" rel="noopener noreferrer" variant="ghost">
                  {COPY.whatsapp}
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </PageShell>
  );
};

export default ContactoExitosoPage;
