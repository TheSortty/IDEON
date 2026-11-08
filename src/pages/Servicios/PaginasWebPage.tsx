import React from 'react';
import Button from '../../components/ui/Button';
import AppLink from '../../components/ui/AppLink';
import Reveal from '../../components/ui/Reveal';
import CtaBand, { ON_BAND_GHOST } from '../../components/page/CtaBand';
import FaqList from '../../components/page/FaqList';
import FeatureGrid from '../../components/page/FeatureGrid';
import IconCard from '../../components/page/IconCard';
import NextCards from '../../components/page/NextCards';
import PageHero from '../../components/page/PageHero';
import PageNav from '../../components/page/PageNav';
import PageShell from '../../components/page/PageShell';
import QuoteButton from '../../components/page/QuoteButton';
import BuildMock from '../../components/illustrations/BuildMock';
import WebTypesCarousel from '../../components/illustrations/WebTypesCarousel';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { EXPLORE, SERVICIOS_META, TIENDA_META, WEB, WEB_META } from '../../constants/services';
import { whatsappUrl } from '../../constants/contact';

const PaginasWebPage: React.FC = () => {
  useServicePageSeo(WEB_META, { parents: [SERVICIOS_META], service: { serviceType: 'Diseño y desarrollo de páginas web' }, faqs: WEB.faqs });

  return (
    <PageShell orb="right">
      <PageHero
        crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Servicios', to: SERVICIOS_META.path }, { label: WEB_META.name }]}
        title={WEB.title}
        actions={
          <>
            <QuoteButton size="lg">{WEB.primaryCta}</QuoteButton>
            <Button href={whatsappUrl(WEB.whatsappMessage)} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
              {WEB.whatsappCta}
            </Button>
          </>
        }
        visual={<BuildMock />}
      />

      <PageNav items={WEB.pageNav} />

      <section id="por-que">
        <div className="container-site">
          <Reveal className="mb-10 max-w-[720px]">
            <h2 className="font-extrabold text-content">{WEB.whyTitle}</h2>
          </Reveal>
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {WEB.why.map((item) => (
              <IconCard key={item.title} item={item} />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="tipos">
        <div className="container-site">
          <Reveal className="mb-8 max-w-[720px]">
            <h2 className="font-extrabold text-content">{WEB.typesTitle}</h2>
          </Reveal>
          <WebTypesCarousel types={WEB.types} />
        </div>
      </section>

      <section id="incluye">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-14">
          <Reveal className="pinned-intro flex flex-col gap-[18px]">
            <h2 className="font-extrabold text-content">{WEB.includesTitle}</h2>
            <AppLink to={SERVICIOS_META.path} className="link-underline group inline-flex items-center gap-1.5 self-start font-bold text-accent-text no-underline hover:text-content">
              {EXPLORE.compareLink}
              <span aria-hidden="true" className="transition-transform duration-long ease-emphasis group-hover:translate-x-1">→</span>
            </AppLink>
          </Reveal>
          <Reveal>
            <FeatureGrid items={WEB.includes} />
          </Reveal>
        </div>
      </section>

      <section id="medicion-y-seo" className="band">
        <div className="container-site flex flex-col gap-7">
          <Reveal>
            <h2 className="font-extrabold text-content">{WEB.measureTitle}</h2>
          </Reveal>
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {WEB.measure.map((item) => (
              <IconCard key={item.title} item={item} />
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand title={WEB.ctaTitle}>
        <QuoteButton variant="light" size="lg">{WEB.primaryCta}</QuoteButton>
        <Button to={TIENDA_META.path} variant="ghost" size="lg" className={ON_BAND_GHOST}>
          {WEB.ctaSecondary}
        </Button>
      </CtaBand>

      <NextCards current="web" />
      <FaqList id="preguntas-web" title={WEB.faqTitle} faqs={WEB.faqs} />
    </PageShell>
  );
};

export default PaginasWebPage;
