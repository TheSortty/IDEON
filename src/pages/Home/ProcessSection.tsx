import React from 'react';
import AppLink from '../../components/ui/AppLink';
import Reveal from '../../components/ui/Reveal';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { PROCESS } from '../../constants/home';
import { NAV_ITEMS } from '../../constants/navigation';
import { resolveNav } from '../../routes';

const ProcessSection: React.FC = () => {
  const preguntas = NAV_ITEMS.find((item) => item.id === 'preguntas');
  const faqHref = preguntas ? resolveNav(preguntas) : null;

  return (
    <section className="band">
      <div className="container-site">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[680px] font-extrabold text-content">
            {PROCESS.titleStart}
            <br />
            <span className="text-gradient">{PROCESS.titleHighlight}</span>
          </h2>
          {faqHref && (
            <AppLink
              to={faqHref}
              className="link-underline group inline-flex items-center gap-1.5 font-bold text-accent-text no-underline hover:text-content"
            >
              {PROCESS.faqLink}
              <span aria-hidden="true" className="inline-block transition-transform duration-long ease-emphasis group-hover:translate-x-1">
                →
              </span>
            </AppLink>
          )}
        </Reveal>

        <Reveal>
          <ol className="relative m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-5 p-0">
            {/* La línea que une los pasos, detrás de las tarjetas (solo en una fila). */}
            <span
              aria-hidden="true"
              className="absolute left-[6%] right-[6%] top-[56px] hidden h-0.5 bg-gradient-to-r from-accent to-accent-2 opacity-35 min-[1100px]:block"
            />
            {PROCESS.steps.map((step, i) => (
              <SpotlightCard as="li" key={step.title} className="flex flex-col gap-3.5 bg-surface-raised/80 p-7">
                <span className="text-gradient block text-[44px] font-black leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3.5 text-xl font-bold text-content">{step.title}</h3>
                <p className="mt-3.5 text-[15px] leading-relaxed text-content-muted">{step.description}</p>
              </SpotlightCard>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};

export default ProcessSection;
