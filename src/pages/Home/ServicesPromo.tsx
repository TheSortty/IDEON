import React from 'react';
import AppLink from '../../components/ui/AppLink';
import Reveal from '../../components/ui/Reveal';
import { buttonClasses } from '../../components/ui/Button';
import { SECTION_LABELS, SERVICES_PROMO } from '../../constants/home';
import { whatsappUrl } from '../../constants/contact';
import { resolveNav } from '../../routes';

// Tarjeta-link a Servicios. Mientras /servicios/ no esté publicada, lleva a
// WhatsApp con un mensaje que dice de dónde viene la consulta.
const ServicesPromo: React.FC = () => {
  const to = resolveNav({ path: '/servicios/', fallback: whatsappUrl(SERVICES_PROMO.whatsappMessage) }) ?? '/';

  return (
    <section id="servicios">
      <div className="container-site">
        <Reveal>
          <AppLink
            to={to}
            className="group relative isolate flex min-h-[clamp(220px,22vw,340px)] flex-wrap items-end justify-between gap-8 overflow-hidden rounded-[28px] bg-gradient-to-br from-accent-solid to-[rgb(var(--blue-600))] p-[clamp(28px,4vw,64px)] text-accent-ink no-underline shadow-[var(--shadow-card)] transition-transform duration-long ease-emphasis hover:-translate-y-1.5"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(500px_260px_at_85%_0%,rgb(255_255_255/0.22),transparent_70%)]"
            />
            <div className="max-w-[1000px]">
              <p className="eyebrow !text-accent-ink">{SECTION_LABELS.services}</p>
              <h2 className="title-section text-accent-ink">
                {SERVICES_PROMO.title}
              </h2>
              <p className="mt-3 text-lg text-accent-ink/85">{SERVICES_PROMO.subtitle}</p>
            </div>
            <span className={buttonClasses('light')}>{SERVICES_PROMO.cta}</span>
          </AppLink>
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesPromo;
