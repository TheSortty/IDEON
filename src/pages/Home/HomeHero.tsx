import React from 'react';
import Button from '../../components/ui/Button';
import QuoteButton from '../../components/page/QuoteButton';
import { CASES, HERO, HERO_STATS_LABELS, PROCESS } from '../../constants/home';
import { NAV_ITEMS } from '../../constants/navigation';
import { resolveNav } from '../../routes';
import AsciiLamp from './AsciiLamp';

const STATS = [
  HERO_STATS_LABELS.founded,
  { value: String(CASES.panels.filter((c) => !('upcoming' in c && c.upcoming)).length), label: HERO_STATS_LABELS.projects.label },
  { value: String(PROCESS.steps.length), label: HERO_STATS_LABELS.steps.label },
  HERO_STATS_LABELS.ownership,
];

// Primer pantallazo a pantalla completa. Todo el movimiento es CSS y no
// framer-motion: arranca con el HTML pre-renderizado, sin esperar al JS, así
// el H1 (el elemento LCP) aparece enseguida. El título entra línea por línea,
// subiendo desde una máscara (.mask-line).
const HomeHero: React.FC = () => {
  const casos = NAV_ITEMS.find((item) => item.id === 'casos');
  const casosHref = casos ? resolveNav(casos) : null;
  const lines = [...HERO.titleLines];

  return (
    // El header es fijo y queda transparente encima del inicio: el <main> del
    // Inicio no reserva su alto (ver App.tsx), lo hace este padding.
    <section className="relative flex min-h-[100svh] flex-col border-b border-line bg-[var(--hero-band)] !pb-0 pt-[calc(var(--header-h)+clamp(32px,6vh,72px))]">
      <div className="container-site grid w-full flex-1 grid-cols-1 items-center gap-10 pb-[clamp(40px,7vh,88px)] min-[1000px]:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] min-[1000px]:gap-12">
        <div className="flex flex-col gap-[clamp(28px,4vh,44px)]">
          <h1 className="title-hero text-content">
            {lines.map((line, i) => (
              <span key={line} className="mask-line" style={{ '--d': i } as React.CSSProperties}>
                <span>{line}</span>
              </span>
            ))}
            <span className="mask-line mt-[0.35em]" style={{ '--d': lines.length } as React.CSSProperties}>
              <span className="text-gradient-pan animate-gradient-pan">{HERO.titleHighlight}</span>
            </span>
          </h1>
          <p className="measure animate-rise text-[clamp(17px,1.35vw,22px)] leading-relaxed text-content-muted [animation-delay:350ms]">
            {HERO.lead}
          </p>
          <div className="flex animate-rise flex-wrap gap-3.5 [animation-delay:450ms]">
            <QuoteButton size="lg">{HERO.primaryCta}</QuoteButton>
            {casosHref && (
              <Button to={casosHref} variant="outline" size="lg">
                {HERO.secondaryCta}
              </Button>
            )}
          </div>
        </div>
        <div className="animate-rise [animation-delay:400ms]">
          <AsciiLamp />
        </div>
      </div>

      <div className="container-site w-full">
        <dl className="hero-stats m-0 animate-rise [animation-delay:600ms]">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="m-0">
                <span className="block text-[clamp(28px,3vw,48px)] font-black leading-none tracking-[-0.03em] text-content">
                  {stat.value}
                </span>
                <span className="mt-2 block text-base leading-snug text-content-muted" aria-hidden="true">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default HomeHero;
