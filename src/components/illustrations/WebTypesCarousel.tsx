import React, { useEffect, useId, useState } from 'react';
import BrowserFrame from './BrowserFrame';
import Reveal from '../ui/Reveal';
import { cn } from '../../lib/cn';

export interface WebType {
  tab: string;
  plan: string;
  title: string;
  description: string;
}

const AUTOPLAY_MS = 7000;

/* ---- Ilustración 1: landing, una sola página larga que se recorre sola ---- */
const LandingIll: React.FC = () => (
  <BrowserFrame>
    <div className="mock-screen h-[290px] p-4">
      <div className="tw-scroll flex flex-col gap-4">
        {[0, 1].map((k) => (
          <React.Fragment key={k}>
            <div className="flex min-h-[120px] flex-col justify-center gap-2.5 rounded-xl bg-gradient-to-br from-brand-primary/30 to-accent-2/20 p-[18px]">
              <span className="tw-l strong w-[70%]" />
              <span className="tw-l w-[50%]" />
              <span className="tw-cta">Contactar</span>
            </div>
            {k === 0 && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <span className="tw-box h-14" />
                  <span className="tw-box h-14" />
                  <span className="tw-box h-14" />
                </div>
                <div className="flex flex-col gap-2 rounded-lg border-l-[3px] border-accent-2 bg-brand-text-primary/[0.04] p-3.5">
                  <span className="tw-l w-[80%]" />
                  <span className="tw-l w-[60%]" />
                </div>
                <div className="flex flex-col gap-2 rounded-xl border border-dashed border-brand-primary/40 bg-brand-text-primary/5 p-3.5">
                  <span className="tw-in" />
                  <span className="tw-in" />
                  <span className="tw-cta">Enviar</span>
                </div>
              </>
            )}
          </React.Fragment>
        ))}
      </div>
      <span className="absolute bottom-3 right-1.5 top-3 w-1 rounded-full bg-brand-text-primary/[0.08]">
        <i className="tw-thumb absolute inset-x-0 block h-[40%] rounded-full bg-brand-primary/70" />
      </span>
    </div>
  </BrowserFrame>
);

/* ---- Ilustración 2: institucional, un menú que va pasando por secciones ---- */
const TABS = [
  { label: 'Inicio', delay: '' },
  { label: 'Nosotros', delay: 'delay-2s' },
  { label: 'Servicios', delay: 'delay-4s' },
  { label: 'Contacto', delay: 'delay-6s' },
];

const InstitutionalIll: React.FC = () => (
  <div className="relative">
    <span aria-hidden="true" className="absolute inset-0 translate-x-[26px] translate-y-[22px] rotate-[4deg] rounded-[22px] border border-line bg-content/[0.04] opacity-60" />
    <span aria-hidden="true" className="absolute inset-0 translate-x-[14px] translate-y-3 rotate-2 rounded-[22px] border border-line bg-content/[0.04]" />
    <BrowserFrame className="relative">
      <div className="mock-screen h-[290px] p-4">
        <div className="mb-3.5 flex items-center gap-1.5 border-b border-brand-text-primary/[0.08] pb-3">
          <span className="mr-auto h-3.5 w-[26px] rounded bg-gradient-to-r from-brand-primary to-accent-2" />
          {TABS.map((tab) => (
            <span key={tab.label} className={cn('tw-tab rounded-full px-2 py-1 text-[10px] font-bold text-brand-text-secondary', tab.delay)}>
              {tab.label}
            </span>
          ))}
        </div>
        <div className="relative h-[210px]">
          <div className="tw-page absolute inset-0 flex flex-col gap-3">
            <span className="block h-[110px] rounded-xl bg-gradient-to-br from-brand-primary/30 to-accent-2/20" />
            <span className="tw-l strong w-[70%]" />
            <span className="tw-l w-[50%]" />
          </div>
          <div className="tw-page delay-2s absolute inset-0 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-[120px] rounded-xl bg-[radial-gradient(circle_at_50%_38%,rgb(255_255_255/0.28)_0_18%,transparent_19%),rgb(255_255_255/0.06)]" />
              ))}
            </div>
            <span className="tw-l w-[60%]" />
          </div>
          <div className="tw-page delay-4s absolute inset-0 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <span className="tw-box h-14" />
              <span className="tw-box h-14" />
              <span className="tw-box h-14" />
            </div>
            <span className="tw-l w-[70%]" />
          </div>
          <div className="tw-page delay-6s absolute inset-0 flex flex-col gap-3">
            <div className="relative h-[130px] rounded-xl bg-accent-2/[0.12] bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[length:22px_22px]">
              <i className="tw-pin absolute left-[48%] top-[38%] block h-4 w-4 rounded-[50%_50%_50%_0] bg-brand-primary shadow-[0_0_16px_rgb(var(--magenta-500))]" />
            </div>
            <span className="tw-in" />
          </div>
        </div>
      </div>
    </BrowserFrame>
  </div>
);

/* ---- Ilustración 3: funcionalidades (reservas, catálogo y panel) ---- */
const FeaturesIll: React.FC = () => (
  <BrowserFrame>
    <div className="mock-screen grid h-[290px] grid-cols-[1.1fr_1fr] grid-rows-[auto_1fr] gap-3 p-4">
      <div className="row-span-2 rounded-xl border border-brand-text-primary/[0.08] bg-brand-text-primary/5 p-3">
        <span className="tw-l strong mb-3 w-[40%]" />
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: 21 }, (_, i) => (
            <i
              key={i}
              className={cn(
                'block aspect-square rounded-md',
                i === 3 || i === 11 ? 'bg-brand-text-primary/[0.02]' : 'bg-brand-text-primary/[0.07]',
                i === 8 && 'tw-day',
                i === 15 && 'tw-day delay-3s',
              )}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <span className="tw-cat h-14 rounded-[10px] bg-gradient-to-br from-brand-primary/35 to-brand-surface/60" />
        <span className="tw-cat delay-1s h-14 rounded-[10px] bg-gradient-to-br from-accent-2/40 to-brand-surface/60" />
        <span className="tw-cat delay-2s h-14 rounded-[10px] bg-gradient-to-br from-brand-primary-hover/40 to-brand-surface/60" />
        <span className="tw-cat delay-3s h-14 rounded-[10px] bg-gradient-to-br from-accent-2/30 to-brand-surface/60" />
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-brand-primary/30 bg-brand-background/70 p-3">
        {[
          { w: 'w-[60%]', late: false },
          { w: 'w-[50%]', late: true },
          { w: 'w-[70%]', late: false },
        ].map((row, i) => (
          <div key={i} className="flex items-center justify-between gap-2">
            <span className={cn('tw-l', row.w)} />
            <b className={cn('switch switch-sm', row.late && 'is-late')} />
          </div>
        ))}
      </div>
    </div>
  </BrowserFrame>
);

const ILLUSTRATIONS = [LandingIll, InstitutionalIll, FeaturesIll];

/**
 * Carrusel "¿Qué tipo de web necesitás?". Pasa solo cada 7 s (se frena con el
 * mouse encima y con "reducir movimiento"); las pestañas son botones reales.
 * Las tres diapositivas están en el HTML: el texto lo lee Google aunque solo
 * se vea una.
 */
const WebTypesCarousel: React.FC<{ types: readonly WebType[] }> = ({ types }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const baseId = useId();

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % types.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, types.length]);

  return (
    <Reveal>
      <div
        className="relative rounded-[32px] border border-line-strong bg-surface-raised/45 p-[clamp(20px,3vw,36px)] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div role="tablist" aria-label="Tipos de web" className="mb-7 flex flex-wrap gap-2">
          {types.map((type, i) => (
            <button
              key={type.tab}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={i === index}
              aria-controls={`${baseId}-panel-${i}`}
              onClick={() => setIndex(i)}
              className={cn(
                'inline-flex min-h-[46px] items-center rounded-full border px-[18px] text-[15px] font-semibold transition-[color,background-color,border-color,box-shadow] duration-long',
                i === index
                  ? 'page-nav-link is-on border-accent/60 text-content shadow-[0_0_24px_rgb(var(--accent)/0.25)]'
                  : 'border-line-strong bg-surface-base/50 text-content-muted hover:border-accent/45 hover:text-content',
              )}
            >
              {type.tab}
            </button>
          ))}
        </div>

        <div className="grid">
          {types.map((type, i) => {
            const Ill = ILLUSTRATIONS[i];
            return (
              <article
                key={type.tab}
                id={`${baseId}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${i}`}
                aria-hidden={i !== index}
                className={cn(
                  'tw-slide grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] min-[900px]:gap-12',
                  i === index && 'is-on',
                )}
              >
                <div className="flex flex-col gap-4">
                  <span className="self-start rounded-full bg-accent/15 px-3 py-1 text-[13px] font-semibold text-accent-text">
                    {type.plan}
                  </span>
                  <h3 className="text-[clamp(1.625rem,3vw,2.25rem)] font-extrabold text-content">{type.title}</h3>
                  <p className="max-w-[440px] text-[17px] leading-relaxed text-content-muted">{type.description}</p>
                </div>
                <div className="px-[18px] pb-[26px] pt-[18px]">
                  <Ill />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-7 flex gap-2" aria-hidden="true">
          {types.map((type, i) => (
            <span
              key={type.tab}
              className={cn(
                'h-2 rounded-full transition-[width,background-color] duration-long ease-emphasis',
                i === index ? 'w-[34px] bg-gradient-to-r from-accent to-accent-2' : 'w-2 bg-content/20',
              )}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default WebTypesCarousel;
