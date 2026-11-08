import React from 'react';
import Button from '../../components/ui/Button';
import AppLink from '../../components/ui/AppLink';
import Reveal from '../../components/ui/Reveal';
import SpotlightCard from '../../components/ui/SpotlightCard';
import CtaBand from '../../components/page/CtaBand';
import FaqList from '../../components/page/FaqList';
import FeatureGrid from '../../components/page/FeatureGrid';
import NextCards from '../../components/page/NextCards';
import PageHero from '../../components/page/PageHero';
import PageNav from '../../components/page/PageNav';
import PageShell from '../../components/page/PageShell';
import QuoteButton from '../../components/page/QuoteButton';
import StoreMock from '../../components/illustrations/StoreMock';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { EXPLORE, SERVICIOS_META, TIENDA, TIENDA_META } from '../../constants/services';
import { whatsappUrl } from '../../constants/contact';

const TiendasOnlinePage: React.FC = () => {
  useServicePageSeo(TIENDA_META, { parents: [SERVICIOS_META], service: { serviceType: 'Desarrollo de tiendas online' }, faqs: TIENDA.faqs });

  return (
    <PageShell orb="left">
      <PageHero
        crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Servicios', to: SERVICIOS_META.path }, { label: TIENDA_META.name }]}
        title={TIENDA.title}
        actions={
          <>
            <QuoteButton size="lg">{TIENDA.primaryCta}</QuoteButton>
            <Button href={whatsappUrl(TIENDA.whatsappMessage)} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
              {TIENDA.whatsappCta}
            </Button>
          </>
        }
        visual={<StoreMock brand={TIENDA.mockBrand} orderLabel={TIENDA.mockOrder} />}
      />

      <PageNav items={TIENDA.pageNav} />

      <section id="problema">
        <div className="container-site">
          <Reveal className="mb-10 max-w-[720px]">
            <h2 className="font-extrabold text-content">{TIENDA.problemTitle}</h2>
          </Reveal>
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {TIENDA.problems.map((item, i) => (
              <SpotlightCard key={item.title} texture={i % 2 ? 'grid' : 'dots'} className="p-[30px]">
                <h3 className="font-bold text-content">{item.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-content-muted">{item.description}</p>
              </SpotlightCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="incluye">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-14">
          <Reveal className="pinned-intro flex flex-col gap-[18px]">
            <h2 className="font-extrabold text-content">{TIENDA.includesTitle}</h2>
            <AppLink to={SERVICIOS_META.path} className="link-underline group inline-flex items-center gap-1.5 self-start font-bold text-accent-text no-underline hover:text-content">
              {EXPLORE.compareLink}
              <span aria-hidden="true" className="transition-transform duration-long ease-emphasis group-hover:translate-x-1">→</span>
            </AppLink>
          </Reveal>
          <Reveal>
            <FeatureGrid items={TIENDA.includes} />
          </Reveal>
        </div>
      </section>

      <CtaBand title={TIENDA.ctaTitle} text={TIENDA.ctaText}>
        <QuoteButton variant="light" size="lg">{TIENDA.primaryCta}</QuoteButton>
      </CtaBand>

      <NextCards current="tienda" />
      <FaqList id="preguntas" title={TIENDA.faqTitle} faqs={TIENDA.faqs} />
    </PageShell>
  );
};

export default TiendasOnlinePage;
