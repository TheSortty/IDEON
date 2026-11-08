import React from 'react';
import AppLink from '../../components/ui/AppLink';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import Reveal from '../../components/ui/Reveal';
import { CASES, type FeaturedCase } from '../../constants/home';
import { NAV_ITEMS } from '../../constants/navigation';
import { isLivePath, resolveNav } from '../../routes';
import { cn } from '../../lib/cn';

const panelBase =
  'peek-panel group relative h-[120px] flex-none overflow-hidden rounded-[22px] border border-brand-text-primary/10 no-underline md:h-auto';

/** Contenido de un panel: portada (Home) o monograma con el brillo del cliente. */
const PanelBody: React.FC<{ item: FeaturedCase; linked: boolean }> = ({ item, linked }) => (
  <>
    {item.cover ? (
      <>
        <img
          src={`${item.cover}-900.webp`}
          srcSet={`${item.cover}-500.webp 500w, ${item.cover}-900.webp 900w`}
          sizes="(min-width: 768px) 60vw, 100vw"
          width={900}
          height={563}
          alt={item.coverAlt ?? ''}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-transform duration-[1200ms] ease-emphasis group-hover:scale-105"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/85 md:from-transparent md:from-35% md:to-black/55" />
      </>
    ) : (
      <>
        <span aria-hidden="true" className="case-glow absolute -bottom-20 -right-20 h-[260px] w-[260px] rounded-full opacity-35 blur-[60px]" />
        <span aria-hidden="true" className="case-accent absolute left-[22px] top-[22px] hidden text-[44px] font-black leading-none tracking-[-0.05em] md:block">
          {item.monogram}
        </span>
      </>
    )}
    {linked && (
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 flex h-10 w-10 scale-[0.6] items-center justify-center rounded-full bg-[var(--c-accent)] text-[var(--c-accent-ink)] opacity-0 transition-[opacity,transform] duration-long ease-emphasis group-hover:scale-100 group-hover:opacity-100"
      >
        <Icon name="arrowUpRight" size={18} strokeWidth={2.5} />
      </span>
    )}
    <span className={cn('absolute bottom-[22px] left-[22px] right-[22px] flex flex-col gap-1.5', item.cover && 'text-brand-text-primary')}>
      {item.upcoming && (
        <span className="case-chip self-start rounded-full px-3 py-1 text-xs font-bold">{CASES.upcomingBadge}</span>
      )}
      <strong className="truncate text-xl font-extrabold">{item.name}</strong>
      <span className="truncate text-sm opacity-90 transition-[opacity,transform] delay-100 duration-long ease-emphasis md:translate-y-2.5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-90">
        {item.tagline}
      </span>
    </span>
  </>
);

/**
 * Trabajos destacados: paneles que se expanden al pasar el mouse. Cada uno
 * con los colores de su cliente (la única excepción a la paleta de IDEON).
 * Llevan a la página del caso; si todavía no existe, al sitio real.
 */
const FeaturedCases: React.FC = () => {
  const casos = NAV_ITEMS.find((item) => item.id === 'casos');
  const casosLive = casos ? isLivePath(casos.path) : false;

  return (
    <section id="casos">
      <div className="container-site">
        <Reveal className="glass flex flex-col gap-8 rounded-[28px] p-[clamp(24px,4vw,44px)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <h2 className="max-w-[680px] text-[clamp(1.625rem,3vw,2.375rem)] font-extrabold text-content">{CASES.title}</h2>
            {casosLive && casos && (
              <Button to={casos.path} variant="outline">
                {CASES.cta}
              </Button>
            )}
          </div>

          <div className="peek flex flex-col gap-3 md:h-[380px] md:flex-row">
            {CASES.panels.map((item) => {
              const panel = cn(panelBase, item.theme, 'case-themed');
              if (item.upcoming || !item.path) {
                return (
                  <div key={item.name} className={panel}>
                    <PanelBody item={item} linked={false} />
                  </div>
                );
              }
              const hasPage = isLivePath(item.path);
              const to = resolveNav({ path: item.path, fallback: item.url ?? null }) ?? '/';
              return (
                <AppLink
                  key={item.name}
                  to={to}
                  aria-label={`${item.name}, ${item.tagline}: ${hasPage ? 'ver caso' : 'ver el sitio'}`}
                  className={cn(panel, 'case-panel-glow')}
                >
                  <PanelBody item={item} linked />
                </AppLink>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedCases;
