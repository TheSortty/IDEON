import React from 'react';
import { Link } from 'react-router';
import Reveal from '../../components/ui/Reveal';
import PageShell from '../../components/page/PageShell';
import QuoteButton from '../../components/page/QuoteButton';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { CASOS, CASOS_META } from '../../constants/cases';
import ProjectsCarousel from './ProjectsCarousel';

const CasosPage: React.FC = () => {
  useServicePageSeo(CASOS_META);

  return (
    <PageShell orb="right">
      <section className="pb-10 pt-[72px]">
        <div className="container-site flex flex-col gap-[22px]">
          <nav aria-label="Ruta" className="animate-rise text-sm text-content-muted">
            <Link to="/" className="text-content-muted no-underline transition-colors hover:text-content">Inicio</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-content">{CASOS_META.name}</span>
          </nav>
          <h1 className="max-w-[860px] animate-rise font-extrabold text-content [animation-delay:150ms]">
            {CASOS.title[0]}
            <span className="text-gradient-pan animate-gradient-pan">{CASOS.title[1]}</span>
          </h1>
        </div>
      </section>

      <section className="!pt-4">
        <div className="container-site flex animate-rise flex-col gap-12 [animation-delay:300ms]">
          <ProjectsCarousel />
          <Reveal className="flex flex-wrap items-center justify-between gap-6 rounded-[28px] border-2 border-dashed border-accent/45 bg-accent/5 p-[clamp(32px,5vw,48px)]">
            <div className="max-w-[620px]">
              <h2 className="mb-2.5 text-[clamp(1.5rem,2.8vw,2.125rem)] font-extrabold text-content">{CASOS.nextTitle}</h2>
              <p className="text-[17px] leading-relaxed text-content-muted">{CASOS.nextText}</p>
            </div>
            <QuoteButton size="lg">{CASOS.nextCta}</QuoteButton>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
};

export default CasosPage;
