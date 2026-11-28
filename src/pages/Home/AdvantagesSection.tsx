import React from 'react';
import Reveal from '../../components/ui/Reveal';
import GlowCard from '../../components/ui/GlowCard';
import { ADVANTAGES, SECTION_LABELS, type AdvantageIcon } from '../../constants/home';

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const ICONS: Record<AdvantageIcon, React.ReactNode> = {
  propiedad: (
    <svg {...iconProps}>
      <path d="M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  cotizacion: (
    <svg {...iconProps}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  permanencia: (
    <svg {...iconProps}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  ),
  pauta: (
    <svg {...iconProps}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

/**
 * Diferenciales: 4 tarjetas a todo el ancho del contenedor, sobre una franja
 * oscura de borde a borde. La franja es oscura en los dos temas (superficie
 * de marca), así que el texto va en los claros de la marca. Al pasar el mouse
 * cada tarjeta se eleva 6 px, el borde pasa a magenta sólido y aparece el
 * brillo interno que sigue al cursor.
 */
const AdvantagesSection: React.FC = () => {
  const [before, first, middle, second, after] = ADVANTAGES.title;

  return (
    <section className="bg-brand-background text-brand-text-primary">
      <div className="container-site">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow !text-brand-primary">{SECTION_LABELS.advantages}</p>
            <h2 className="title-section text-brand-text-primary">
              {before}
              <span className="text-gradient">{first}</span>
              {middle}
              <span className="text-gradient">{second}</span>
              {after}
            </h2>
          </div>
          <p className="measure text-[clamp(17px,1.35vw,22px)] leading-relaxed text-brand-text-secondary">{ADVANTAGES.support}</p>
        </Reveal>
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4">
          {ADVANTAGES.items.map((item, i) => (
            <li key={item.title} className="flex">
              <Reveal index={i} className="flex w-full">
                <GlowCard className="flex w-full flex-col gap-4 rounded-[24px] border border-brand-text-primary/10 bg-brand-surface/60 p-[clamp(24px,2.4vw,36px)] min-[1100px]:min-h-[320px]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-brand-primary/40 bg-brand-primary/15 text-brand-primary">
                    {ICONS[item.icon]}
                  </span>
                  <h3 className="mt-auto pt-6 text-[clamp(21px,1.6vw,26px)] font-extrabold leading-tight text-brand-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-brand-text-secondary">{item.description}</p>
                </GlowCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AdvantagesSection;
