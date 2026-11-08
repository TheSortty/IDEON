import React from 'react';
import AppLink from '../../components/ui/AppLink';
import Button from '../../components/ui/Button';
import Reveal from '../../components/ui/Reveal';
import { CASES } from '../../constants/home';
import { NAV_ITEMS } from '../../constants/navigation';
import { isLivePath, resolveNav } from '../../routes';

const ArrowIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const panelBase =
  'peek-panel group relative h-[120px] flex-none overflow-hidden rounded-[22px] border border-line md:h-auto';

/**
 * Trabajos destacados: paneles que se expanden al pasar el mouse. Los casos
 * con página propia (etapa E) llevan ahí; mientras esa página no exista, al
 * sitio real del cliente. AM Suministros y Borea van como "Próximamente".
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
            {CASES.featured.map((item) => {
              const hasPage = isLivePath(item.path);
              const to = resolveNav({ path: item.path, fallback: item.url }) ?? item.url;
              return (
                <AppLink
                  key={item.name}
                  to={to}
                  aria-label={`${item.name}, ${item.tagline}: ${hasPage ? 'ver caso' : 'ver el sitio'}`}
                  className={`${panelBase} bg-brand-surface hover:shadow-[0_30px_60px_-24px_rgb(var(--accent)/0.6)] focus-visible:shadow-[0_30px_60px_-24px_rgb(var(--accent)/0.6)]`}
                >
                  <img
                    src={`${item.cover}-900.webp`}
                    srcSet={`${item.cover}-500.webp 500w, ${item.cover}-900.webp 900w`}
                    sizes="(min-width: 768px) 60vw, 100vw"
                    width={900}
                    height={563}
                    alt={item.coverAlt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top opacity-90 transition-transform duration-[1200ms] ease-emphasis group-hover:scale-105"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/85 md:from-transparent md:from-35% md:to-black/60" />
                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 flex h-10 w-10 scale-[0.6] items-center justify-center rounded-full bg-accent-ink text-brand-surface opacity-0 transition-[opacity,transform] duration-long ease-emphasis group-hover:scale-100 group-hover:opacity-100"
                  >
                    <ArrowIcon />
                  </span>
                  <span className="absolute bottom-[22px] left-[22px] right-[22px] flex flex-col gap-1.5 text-accent-ink">
                    <strong className="truncate text-xl font-extrabold">{item.name}</strong>
                    <span className="truncate text-sm opacity-90 transition-[opacity,transform] delay-100 duration-long ease-emphasis md:translate-y-2.5 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-90">
                      {item.tagline}
                    </span>
                  </span>
                </AppLink>
              );
            })}

            {CASES.upcoming.map((item) => (
              <div key={item.name} className={`${panelBase} glass`}>
                <span aria-hidden="true" className="absolute -bottom-20 -right-20 h-[260px] w-[260px] rounded-full bg-accent-2 opacity-25 blur-[60px]" />
                <span aria-hidden="true" className="text-gradient absolute left-[22px] top-[22px] hidden text-[44px] md:block font-black leading-none tracking-[-0.05em]">
                  {item.monogram}
                </span>
                <span className="absolute right-4 top-4 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent-text">
                  {CASES.upcomingBadge}
                </span>
                <span className="absolute bottom-[22px] left-[22px] right-[22px] flex flex-col gap-1.5 text-content">
                  <strong className="truncate text-xl font-extrabold">{item.name}</strong>
                  <span className="truncate text-sm text-content-muted">{item.tagline}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedCases;
