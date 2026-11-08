import React from 'react';
import { Link } from 'react-router';
import Button from '../../components/ui/Button';
import CaseImg from '../../components/ui/CaseImg';
import Reveal from '../../components/ui/Reveal';
import SpotlightCard from '../../components/ui/SpotlightCard';
import BrowserFrame from '../../components/illustrations/BrowserFrame';
import PageShell from '../../components/page/PageShell';
import QuoteButton from '../../components/page/QuoteButton';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { CASE_COPY, CASE_STUDIES, CASOS_META, type CaseStudy } from '../../constants/cases';

/** Página de un caso. Las tres (Home, Under Club, Corralcoop) usan esta plantilla. */
const CaseStudyPage: React.FC<{ study: CaseStudy }> = ({ study }) => {
  useServicePageSeo(study.meta, { parents: [CASOS_META] });

  const i = CASE_STUDIES.findIndex((s) => s.slug === study.slug);
  const next = CASE_STUDIES[(i + 1) % CASE_STUDIES.length];

  return (
    <PageShell orb="left">
      <article>
        <header className="pb-10 pt-[72px]">
          <div className="container-site flex flex-col gap-[22px]">
            <nav aria-label="Ruta" className="animate-rise text-sm text-content-muted">
              <Link to="/" className="text-content-muted no-underline transition-colors hover:text-content">Inicio</Link>
              <span aria-hidden="true"> / </span>
              <Link to={CASOS_META.path} className="text-content-muted no-underline transition-colors hover:text-content">{CASOS_META.name}</Link>
              <span aria-hidden="true"> / </span>
              <span aria-current="page" className="text-content">{study.meta.name}</span>
            </nav>
            <h1 className="max-w-[980px] animate-rise font-extrabold text-content [animation-delay:150ms]">
              {study.title[0]}
              <span className="text-gradient-pan animate-gradient-pan">{study.title[1]}</span>
            </h1>
            <p className="max-w-[720px] animate-rise text-xl leading-relaxed text-content-muted [animation-delay:300ms]">{study.lead}</p>
          </div>
        </header>

        <section className="!pb-[72px] !pt-6">
          <div className="container-site animate-rise [animation-delay:400ms]">
            <BrowserFrame>
              <CaseImg
                image={study.hero}
                priority
                sizes="(min-width: 1280px) 1232px, 100vw"
                className="h-[clamp(260px,42vw,560px)] rounded-[14px] object-top"
              />
            </BrowserFrame>
            <div className="mt-7 flex justify-center">
              <Button href={study.url} target="_blank" rel="noopener noreferrer" size="lg">
                {CASE_COPY.siteCta}
              </Button>
            </div>
          </div>
        </section>

        <section className="!py-12">
          <Reveal className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-6">
            <SpotlightCard className="rounded-3xl p-9">
              <h2 className="text-[28px] font-extrabold leading-tight text-content">{study.problemTitle}</h2>
              <p className="mt-3.5 text-base leading-relaxed text-content-muted">{study.problem}</p>
            </SpotlightCard>
            <SpotlightCard className="plan-featured overflow-visible rounded-3xl border-2 border-transparent bg-surface-raised/70 p-9 shadow-[0_0_50px_rgb(var(--accent)/0.3)]">
              <h2 className="text-[28px] font-extrabold leading-tight text-content">{study.solutionTitle}</h2>
              <ul className="check-list m-0 mt-3.5 flex list-none flex-col gap-3 p-0 text-base text-content">
                {study.solution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </section>

        <section className="!pt-12">
          <div className="container-site">
            <Reveal>
              <h2 className="mb-8 font-extrabold text-content">{study.galleryTitle}</h2>
            </Reveal>
            <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-5">
              {study.gallery.map((shot) => (
                <figure key={shot.title} className="group m-0 flex flex-col gap-3">
                  <div className="overflow-hidden rounded-[18px] border border-line-strong">
                    <CaseImg
                      image={shot}
                      sizes="(min-width: 1280px) 400px, (min-width: 800px) 50vw, 100vw"
                      className="h-[280px] object-top transition-transform duration-[1000ms] ease-emphasis group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="text-[15px] text-content-muted">
                    <strong className="text-content">{shot.title}</strong> {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </section>
      </article>

      <section className="!pb-[120px] !pt-6">
        <Reveal className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-5">
          <SpotlightCard className="plan-featured overflow-visible rounded-[28px] border-2 border-transparent bg-surface-raised/70 p-[clamp(32px,4vw,48px)] shadow-[0_0_50px_rgb(var(--accent)/0.3)]">
            <div className="flex flex-col justify-center gap-[18px]">
              <h2 className="text-[clamp(1.5rem,2.8vw,2.125rem)] font-extrabold text-content">{CASE_COPY.similarTitle}</h2>
              <QuoteButton size="lg" className="self-start">{CASE_COPY.similarCta}</QuoteButton>
            </div>
          </SpotlightCard>
          <SpotlightCard className="rounded-[28px]">
            <Link to={next.meta.path} className="group flex h-full flex-col justify-center gap-2.5 p-[clamp(32px,4vw,48px)] text-content no-underline">
              <span className="text-sm text-content-muted">{CASE_COPY.nextLabel}</span>
              <span className="text-[clamp(1.5rem,2.8vw,2.125rem)] font-extrabold">
                {next.meta.name}{' '}
                <span aria-hidden="true" className="inline-block text-accent transition-transform duration-long ease-emphasis group-hover:translate-x-1.5">→</span>
              </span>
            </Link>
          </SpotlightCard>
        </Reveal>
      </section>
    </PageShell>
  );
};

export default CaseStudyPage;
