import React from 'react';
import Button from '../../components/ui/Button';
import QuoteButton from '../../components/page/QuoteButton';
import Reveal from '../../components/ui/Reveal';
import { FINAL_CTA } from '../../constants/home';
import { CONTACT_EMAIL, WHATSAPP_MESSAGES, whatsappUrl } from '../../constants/contact';
import { FOOTER_COPY } from '../../constants/navigation';

const contactLink =
  'inline-flex min-h-11 items-center text-[clamp(16px,1.2vw,19px)] font-semibold text-brand-text-primary no-underline link-underline';

// Cierre del Inicio: franja de borde a borde. Es oscura en los dos temas
// (superficie de marca), por eso el texto va siempre en los claros de la
// marca. Los botones son los mismos de siempre, sin cambios.
const FinalCta: React.FC = () => {
  return (
    <section id="cotizar" className="cta-band relative isolate overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[140px] left-[8%] -z-10 h-[460px] w-[460px] animate-orb rounded-full bg-brand-primary opacity-[0.22] blur-[90px]"
      />
      <div className="container-site flex flex-col gap-[clamp(40px,5vw,72px)]">
        <Reveal className="grid items-end gap-8 min-[1000px]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <h2 className="title-hero text-brand-text-primary">{FINAL_CTA.title}</h2>
          <div className="flex flex-col gap-6">
            <p className="measure text-[clamp(17px,1.3vw,20px)] leading-relaxed text-brand-text-primary/80">{FINAL_CTA.subtitle}</p>
            <div className="flex flex-wrap gap-3.5">
              <QuoteButton variant="light" size="lg">
                {FINAL_CTA.primary}
              </QuoteButton>
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
            </div>
          </div>
        </Reveal>

        <Reveal index={1}>
          <address className="contact-row not-italic">
            <div>
              <a href={`mailto:${CONTACT_EMAIL}`} className={contactLink}>
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <a href={whatsappUrl(WHATSAPP_MESSAGES.floating)} target="_blank" rel="noopener noreferrer" className={contactLink}>
                {FOOTER_COPY.phoneDisplay}
              </a>
            </div>
            <p className="flex min-h-11 items-center text-base text-brand-text-primary/75">{FOOTER_COPY.location}</p>
            <p className="flex min-h-11 items-center text-base text-brand-text-primary/75">{FOOTER_COPY.hours}</p>
          </address>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCta;
