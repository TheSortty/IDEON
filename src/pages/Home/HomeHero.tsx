import React from 'react';
import Button from '../../components/ui/Button';
import { HERO } from '../../constants/home';
import { COTIZAR, NAV_ITEMS } from '../../constants/navigation';
import { resolveNav } from '../../routes';
import AsciiLamp from './AsciiLamp';

// Primer pantallazo. La entrada es la animación CSS `animate-rise` y no
// framer-motion: arranca con el HTML pre-renderizado, sin esperar al JS, así
// el H1 (el elemento LCP) aparece enseguida.
const HomeHero: React.FC = () => {
  const casos = NAV_ITEMS.find((item) => item.id === 'casos');
  const casosHref = casos ? resolveNav(casos) : null;

  return (
    <section className="relative flex min-h-[min(calc(100vh-var(--nav-h)),860px)] items-center border-b border-line bg-[var(--hero-band)] py-[clamp(80px,10vh,130px)]">
      <div className="container-site grid w-full grid-cols-1 items-center gap-12 min-[1000px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] min-[1000px]:gap-10">
        <div className="flex flex-col gap-7">
          <h1 className="animate-rise pb-[1.04em] text-[clamp(2.125rem,7.6vw,3.625rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-content min-[1000px]:text-[clamp(2.75rem,4vw,3.75rem)]">
            {HERO.titleLines.map((line) => (
              <span key={line} className="block min-[1000px]:whitespace-nowrap">
                {line}
              </span>
            ))}
            <span className="text-gradient-pan mt-[1.04em] block animate-gradient-pan">{HERO.titleHighlight}</span>
          </h1>
          <div className="flex animate-rise flex-wrap gap-3.5 [animation-delay:250ms]">
            <Button to={resolveNav(COTIZAR) ?? '/'} size="lg">
              {HERO.primaryCta}
            </Button>
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
    </section>
  );
};

export default HomeHero;
