import React, { useRef } from 'react';
import AppLink from '../../components/ui/AppLink';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import Reveal from '../../components/ui/Reveal';
import { CASES, SECTION_LABELS, type FeaturedCase } from '../../constants/home';
import { NAV_ITEMS } from '../../constants/navigation';
import { isLivePath, resolveNav } from '../../routes';
import { usePointerGlow } from '../../hooks/usePointerGlow';
import { cn } from '../../lib/cn';

const cardBase =
  'case-card glow-card tilt case-themed flex h-full flex-col justify-end rounded-[28px] border border-[var(--c-line)] p-[clamp(22px,2.4vw,36px)] text-left no-underline';

/** Contenido de una tarjeta: fondo (portada o color del cliente), nombre calado y textos. */
const CardBody: React.FC<{ item: FeaturedCase; linked: boolean }> = ({ item, linked }) => (
  <>
    {item.cover && (
      <span aria-hidden="true" className="glow-bg inset-0 overflow-hidden rounded-[inherit]">
        <img
          src={`${item.cover}-900.webp`}
          srcSet={`${item.cover}-500.webp 500w, ${item.cover}-900.webp 900w`}
          sizes="(min-width: 1100px) 34vw, (min-width: 640px) 50vw, 100vw"
          width={900}
          height={563}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top opacity-90"
        />
        <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/85" />
      </span>
    )}
    {/* Nombre gigante calado (solo contorno), detrás del contenido. */}
    <span aria-hidden="true" className={cn('case-outline glow-bg', item.cover && '[-webkit-text-stroke-color:rgb(255_255_255/0.35)]')}>
      {item.name}
    </span>
    {linked && (
      <span
        aria-hidden="true"
        className="case-arrow absolute right-[clamp(18px,2vw,28px)] top-[clamp(18px,2vw,28px)] flex h-12 w-12 items-center justify-center rounded-full bg-[var(--c-accent)] text-[var(--c-accent-ink)]"
      >
        <Icon name="arrowUpRight" size={20} strokeWidth={2.5} />
      </span>
    )}
    <span className={cn('flex flex-col gap-2', item.cover && 'text-brand-text-primary')}>
      {item.upcoming && (
        <span className="case-chip self-start rounded-full px-3.5 py-1.5 text-sm font-bold">{CASES.upcomingBadge}</span>
      )}
      <strong className="text-[clamp(28px,2.6vw,44px)] font-black leading-none tracking-[-0.03em]">{item.name}</strong>
      <span className="case-tag text-base">{item.tagline}</span>
    </span>
  </>
);

const CaseCard: React.FC<{ item: FeaturedCase }> = ({ item }) => {
  const ref = useRef<HTMLElement>(null);
  usePointerGlow(ref, true);
  const classes = cn(cardBase, item.theme);

  // Los "Próximamente" mantienen su estado: no son link, pero tienen el mismo
  // tamaño y tratamiento que el resto para que la grilla no quede con huecos.
  if (item.upcoming || !item.path) {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={classes}>
        <CardBody item={item} linked={false} />
      </div>
    );
  }
  const hasPage = isLivePath(item.path);
  const to = resolveNav({ path: item.path, fallback: item.url ?? null }) ?? '/';
  return (
    <AppLink
      ref={ref as React.RefObject<HTMLAnchorElement>}
      to={to}
      aria-label={`${item.name}, ${item.tagline}: ${hasPage ? 'ver caso' : 'ver el sitio'}`}
      className={classes}
    >
      <CardBody item={item} linked />
    </AppLink>
  );
};

/**
 * Trabajos destacados: grilla de 6 columnas a todo el ancho (3 tarjetas de 2
 * columnas arriba y 2 de 3 abajo; 1 columna en celular). Cada caso con los
 * colores de su cliente (la única excepción a la paleta de IDEON).
 */
const FeaturedCases: React.FC = () => {
  const casos = NAV_ITEMS.find((item) => item.id === 'casos');
  const casosLive = casos ? isLivePath(casos.path) : false;

  return (
    <section id="casos">
      <div className="container-site">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">{SECTION_LABELS.cases}</p>
            <h2 className="title-section max-w-[14ch] text-content">{CASES.title}</h2>
          </div>
          {casosLive && casos && (
            <div className="min-[900px]:justify-self-end">
              <Button to={casos.path} variant="outline">
                {CASES.cta}
              </Button>
            </div>
          )}
        </Reveal>

        <ul className="cases-grid m-0 list-none p-0">
          {CASES.panels.map((item, i) => (
            <li key={item.name} className="flex">
              <Reveal index={i % 3} className="w-full">
                <CaseCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedCases;
