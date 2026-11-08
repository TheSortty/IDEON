import React from 'react';
import AppLink from '../../components/ui/AppLink';
import Reveal from '../../components/ui/Reveal';
import { buttonClasses } from '../../components/ui/Button';
import { SERVICES_PROMO } from '../../constants/home';
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
            className="group relative isolate flex flex-wrap items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-accent-solid to-[rgb(var(--blue-600))] p-[clamp(28px,4vw,44px)] text-accent-ink no-underline shadow-[0_30px_70px_-30px_rgb(var(--accent-solid)/0.8)] transition-[transform,box-shadow] duration-long ease-emphasis hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-30px_rgb(var(--accent-solid)/0.95)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(500px_260px_at_85%_0%,rgb(255_255_255/0.22),transparent_70%)]"
            />
            <div className="max-w-[760px]">
              <h2 className="text-[clamp(1.625rem,3vw,2.375rem)] font-extrabold leading-[1.1] text-accent-ink">
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
