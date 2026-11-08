import React from 'react';
import Button from '../../components/ui/Button';
import Reveal from '../../components/ui/Reveal';
import { FINAL_CTA } from '../../constants/home';
import { whatsappUrl } from '../../constants/contact';
import { COTIZAR } from '../../constants/navigation';
import { isLivePath, resolveNav } from '../../routes';

// Cierre del Inicio. La banda es oscura en los dos temas (superficie de
// marca), por eso el texto va siempre en los tonos claros de la marca.
const FinalCta: React.FC = () => {
  const cotizarLive = isLivePath(COTIZAR.path);

  return (
    <section id="cotizar" className="pb-[120px] pt-8">
      <div className="container-site">
        <Reveal className="cta-band relative flex flex-col items-center gap-[22px] overflow-hidden rounded-[32px] border border-brand-text-primary/15 px-6 py-[clamp(44px,6vw,84px)] text-center shadow-[0_0_60px_rgb(var(--accent)/0.2)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-[140px] left-1/2 -ml-[230px] h-[460px] w-[460px] animate-orb rounded-full bg-brand-primary opacity-[0.22] blur-[90px]"
          />
          <h2 className="relative max-w-[780px] text-[clamp(1.875rem,4vw,3.375rem)] font-extrabold text-brand-text-primary">
            {FINAL_CTA.title}
          </h2>
          <p className="relative max-w-[560px] text-lg leading-relaxed text-brand-text-primary/80">{FINAL_CTA.subtitle}</p>
          <div className="relative flex flex-wrap justify-center gap-3.5">
            <Button to={resolveNav(COTIZAR) ?? '/'} variant="light" size="lg">
              {FINAL_CTA.primary}
            </Button>
            {/* Mientras no exista el cotizador, el botón de arriba ya lleva a WhatsApp. */}
            {cotizarLive && (
              <Button
                href={whatsappUrl(FINAL_CTA.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                className="border-brand-text-primary/20 bg-brand-text-primary/5 text-brand-text-primary"
              >
                {FINAL_CTA.whatsapp}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCta;
