import React, { useEffect, useId, useMemo, useState } from 'react';
import Button from '../../components/ui/Button';
import CaseImg from '../../components/ui/CaseImg';
import Icon from '../../components/ui/Icon';
import { CASOS, CASE_COPY, type ProjectCategory } from '../../constants/cases';
import { whatsappUrl } from '../../constants/contact';
import { isLivePath } from '../../routes';
import { cn } from '../../lib/cn';

type Filter = 'todos' | ProjectCategory;

const AUTOPLAY_MS = 7000;

const pillBase =
  'inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold transition-[color,background-color,border-color,box-shadow] duration-long';
const pillOn = 'page-nav-link is-on border-accent/60 text-content shadow-[0_0_24px_rgb(var(--accent)/0.25)]';
const pillOff = 'border-line-strong bg-surface-base/50 text-content-muted hover:border-accent/45 hover:text-content';

/**
 * Carrusel de proyectos de /casos/ con filtro por tipo. Pasa solo cada 7 s
 * (con barra de progreso), se frena con el mouse encima y con "reducir
 * movimiento". Todas las diapositivas del filtro están en el HTML.
 */
const ProjectsCarousel: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('todos');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const baseId = useId();

  const list = useMemo(
    () => (filter === 'todos' ? CASOS.projects : CASOS.projects.filter((p) => (p.categories as readonly string[]).includes(filter))),
    [filter],
  );
  const n = list.length;
  const active = ((index % n) + n) % n;

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => setIndex((i) => i + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [paused, active, filter]);

  return (
    <div>
      <div role="group" aria-label="Filtrar por tipo de proyecto" className="mb-6 flex flex-wrap gap-2.5">
        {CASOS.filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => {
              setFilter(f.id);
              setIndex(0);
            }}
            className={cn(pillBase, 'min-h-[46px] px-[18px] text-[15px]', filter === f.id ? pillOn : pillOff)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          'relative grid overflow-hidden rounded-[32px] border border-line bg-surface-raised/60 shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)]',
          paused && 'is-paused',
        )}
        aria-roledescription="carrusel"
        aria-label="Proyectos de IDEON"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {list.map((project, i) => {
          const isOn = i === active;
          const live = project.shots.length > 0;
          const hasCase = project.casePath !== undefined && isLivePath(project.casePath);
          return (
            <article
              key={project.id}
              id={`${baseId}-${project.id}`}
              aria-roledescription="diapositiva"
              aria-label={`${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}: ${project.name}`}
              aria-hidden={!isOn}
              className={cn(
                'tw-slide relative grid min-h-[560px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-10 overflow-hidden p-[clamp(28px,4vw,56px)]',
                isOn && 'is-on',
              )}
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-[140px] -top-40 h-[520px] w-[520px] animate-orb rounded-full bg-accent opacity-[0.22] blur-[90px]" />
              <div className="relative flex flex-col gap-[18px]">
                <h3 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-content">{project.name}</h3>
                <p className="max-w-[520px] text-lg leading-relaxed text-content-muted">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {hasCase && project.casePath && (
                    <Button to={project.casePath} tabIndex={isOn ? 0 : -1}>
                      {CASOS.caseCta}
                    </Button>
                  )}
                  <Button
                    href={whatsappUrl(CASE_COPY.whatsappMessage(project.short))}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="ghost"
                    tabIndex={isOn ? 0 : -1}
                  >
                    {CASOS.similarCta}
                  </Button>
                </div>
              </div>

              <div className="relative">
                {live ? (
                  <div className="grid grid-cols-2 gap-3">
                    {project.shots.map((shot, k) => (
                      <CaseImg
                        key={shot.src}
                        image={shot}
                        sizes="(min-width: 1000px) 560px, 100vw"
                        className={cn(
                          'rounded-[18px] object-top shadow-[0_24px_50px_-24px_rgb(0_0_0/0.55)] transition-transform duration-[900ms] ease-emphasis hover:scale-[1.03]',
                          k === 0 ? 'col-span-2 h-[250px]' : project.shots.length === 2 ? 'col-span-2 h-[150px]' : 'h-[170px]',
                        )}
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="case-blur flex min-h-[400px] flex-col items-center justify-center gap-3.5 rounded-3xl border border-dashed border-line-strong bg-surface-base/60">
                      <span className="text-gradient text-[clamp(72px,9vw,120px)] font-black leading-none tracking-[-0.05em]">
                        {project.monogram}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-[var(--popover)] px-5 py-3 text-[15px] font-extrabold tracking-[0.02em] text-content shadow-[0_16px_40px_-14px_rgb(0_0_0/0.5)]">
                        <span className="h-2 w-2 animate-dot-pulse rounded-full bg-accent shadow-[0_0_10px_rgb(var(--accent))]" />
                        {CASOS.upcoming}
                      </span>
                    </div>
                  </>
                )}
              </div>
              {isOn && <span key={`${filter}-${index}`} aria-hidden="true" className="case-progress absolute bottom-0 left-0 z-[3] h-1 w-full bg-gradient-to-r from-accent to-accent-2" />}
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {list.map((project, i) => (
            <button
              key={project.id}
              type="button"
              aria-pressed={i === active}
              aria-controls={`${baseId}-${project.id}`}
              onClick={() => setIndex(i)}
              className={cn(pillBase, i === active ? pillOn : pillOff)}
            >
              {project.short}
            </button>
          ))}
        </div>
        <div className="flex gap-2.5">
          {[
            { label: CASOS.prev, to: active - 1, flip: true },
            { label: CASOS.next, to: active + 1, flip: false },
          ].map((arrow) => (
            <button
              key={arrow.label}
              type="button"
              aria-label={arrow.label}
              onClick={() => setIndex(arrow.to)}
              className="glass flex h-[52px] w-[52px] items-center justify-center rounded-full text-content transition-[transform,background-color,border-color,box-shadow] duration-medium hover:scale-[1.08] hover:border-accent hover:bg-accent/20 hover:shadow-[0_0_24px_rgb(var(--accent)/0.4)] active:scale-95"
            >
              <Icon name="arrowUpRight" size={20} className={arrow.flip ? '-rotate-[135deg]' : 'rotate-45'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
