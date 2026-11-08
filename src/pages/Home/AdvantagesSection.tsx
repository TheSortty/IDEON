import React from 'react';
import Reveal from '../../components/ui/Reveal';
import SpotlightCard from '../../components/ui/SpotlightCard';
import { ADVANTAGES, type AdvantageIcon } from '../../constants/home';

const iconProps = {
  width: 22,
  height: 22,
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

// Recursos C + D (decisión 4): luz que sigue al cursor, borde con degradado,
// textura de fondo alternada y número grande en contorno.
const TEXTURES = ['dots', 'grid'] as const;

const AdvantagesSection: React.FC = () => {
  const [before, first, middle, second, after] = ADVANTAGES.title;

  return (
    <section>
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-14">
        <Reveal className="pinned-intro">
          <h2 className="font-extrabold text-content">
            {before}
            <span className="text-gradient">{first}</span>
            {middle}
            <span className="text-gradient">{second}</span>
            {after}
          </h2>
        </Reveal>
        <Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
            {ADVANTAGES.items.map((item, i) => (
              <SpotlightCard
                key={item.title}
                texture={TEXTURES[i % 2]}
                number={String(i + 1).padStart(2, '0')}
                className="p-7"
              >
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-accent/35 bg-accent/15 text-accent">
                  {ICONS[item.icon]}
                </span>
                <h3 className="mt-3 text-[19px] font-bold text-content">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-content-muted">{item.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default AdvantagesSection;
