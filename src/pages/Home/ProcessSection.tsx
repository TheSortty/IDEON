import React from 'react';
import AppLink from '../../components/ui/AppLink';
import Reveal from '../../components/ui/Reveal';
import { PROCESS, SECTION_LABELS } from '../../constants/home';
import { NAV_ITEMS } from '../../constants/navigation';
import { resolveNav } from '../../routes';

/**
 * Proceso en 4 pasos: tarjetas apiladas (sticky) que se superponen al bajar,
 * cada una con un pequeño desplazamiento (--i × 18 px). En celular dejan de
 * ser sticky y quedan apiladas normales (.stack-card en index.css).
 */
const ProcessSection: React.FC = () => {
  const preguntas = NAV_ITEMS.find((item) => item.id === 'preguntas');
  const faqHref = preguntas ? resolveNav(preguntas) : null;

  return (
    <section className="band">
      <div className="container-site">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{SECTION_LABELS.process}</p>
            <h2 className="title-section text-content">
              {PROCESS.titleStart}
              <br />
              <span className="text-gradient">{PROCESS.titleHighlight}</span>
            </h2>
          </div>
          {faqHref && (
            <div className="min-[900px]:justify-self-end">
              <AppLink
                to={faqHref}
                className="link-underline group inline-flex min-h-11 items-center gap-1.5 text-lg font-bold text-accent-text no-underline hover:text-content"
              >
                {PROCESS.faqLink}
                <span aria-hidden="true" className="inline-block transition-transform duration-long ease-emphasis group-hover:translate-x-1">
                  →
                </span>
              </AppLink>
            </div>
          )}
        </Reveal>

        <ol className="m-0 flex list-none flex-col gap-4 p-0 md:gap-6">
          {PROCESS.steps.map((step, i) => (
            <li key={step.title} className="stack-card" style={{ '--i': i } as React.CSSProperties}>
              <Reveal
                index={i}
                className="grid items-center gap-x-[clamp(24px,4vw,72px)] gap-y-4 rounded-[28px] border border-line bg-surface-raised p-[clamp(24px,3.4vw,56px)] shadow-[var(--shadow-card)] md:min-h-[240px] md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <span className="text-gradient block text-[clamp(56px,6vw,112px)] font-black leading-[0.85] tracking-[-0.04em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[clamp(26px,3vw,52px)] font-black leading-[1] tracking-[-0.03em] text-content">
                  {step.title}
                </h3>
                <p className="measure text-[clamp(16px,1.2vw,20px)] leading-relaxed text-content-muted">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
