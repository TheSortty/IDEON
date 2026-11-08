import React from 'react';
import Button from '../../components/ui/Button';
import Reveal from '../../components/ui/Reveal';
import CtaBand, { ON_BAND_GHOST } from '../../components/page/CtaBand';
import FaqList from '../../components/page/FaqList';
import IconCard from '../../components/page/IconCard';
import NextCards from '../../components/page/NextCards';
import NumberedSteps from '../../components/page/NumberedSteps';
import PageHero from '../../components/page/PageHero';
import PageNav from '../../components/page/PageNav';
import PageShell from '../../components/page/PageShell';
import QuoteButton from '../../components/page/QuoteButton';
import DashMock from '../../components/illustrations/DashMock';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { SERVICIOS_META, SISTEMAS, SISTEMAS_META } from '../../constants/services';
import { CASE_STUDIES } from '../../constants/cases';
import { NAV_ITEMS } from '../../constants/navigation';
import { whatsappUrl } from '../../constants/contact';
import { resolveNav } from '../../routes';

const SistemasPage: React.FC = () => {
  useServicePageSeo(SISTEMAS_META, { parents: [SERVICIOS_META], service: { serviceType: 'Desarrollo de software a medida' }, faqs: SISTEMAS.faqs });

  // "Ver un caso real" → el caso de Home (etapa E); mientras tanto, su sitio.
  const homeCase = CASE_STUDIES[0];
  const caseHref = resolveNav({ path: homeCase.meta.path, fallback: homeCase.url }) ?? homeCase.url;
  const casos = NAV_ITEMS.find((item) => item.id === 'casos');
  const casosHref = casos ? resolveNav(casos) : null;

  return (
    <PageShell orb="right">
      <PageHero
        crumbs={[{ label: 'Inicio', to: '/' }, { label: 'Servicios', to: SERVICIOS_META.path }, { label: SISTEMAS_META.name }]}
        title={SISTEMAS.title}
        actions={
          <>
            <QuoteButton size="lg">{SISTEMAS.primaryCta}</QuoteButton>
            <Button to={caseHref} variant="outline" size="lg">
              {SISTEMAS.caseCta}
            </Button>
          </>
        }
        visual={<DashMock />}
      />

      <PageNav items={SISTEMAS.pageNav} />

      <section id="que-construimos">
        <div className="container-site">
          <Reveal className="mb-10 max-w-[720px]">
            <h2 className="font-extrabold text-content">{SISTEMAS.buildTitle}</h2>
          </Reveal>
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
            {SISTEMAS.build.map((item, i) => (
              <IconCard
                key={item.title}
                item={item}
                compact
                className={i === SISTEMAS.build.length - 1 ? 'border-accent/45 p-7' : undefined}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <section id="proceso">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-14">
          <Reveal className="pinned-intro">
            <h2 className="font-extrabold text-content">{SISTEMAS.processTitle}</h2>
          </Reveal>
          <NumberedSteps steps={SISTEMAS.process} />
        </div>
      </section>

      {casosHref && (
        <section className="!py-2">
          <Reveal className="container-site flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-center">
            <p className="text-lg font-semibold text-content">{SISTEMAS.casesText}</p>
            <Button to={casosHref} variant="outline">
              {SISTEMAS.casesCta}
            </Button>
          </Reveal>
        </section>
      )}

      <CtaBand title={SISTEMAS.ctaTitle} text={SISTEMAS.ctaText}>
        <QuoteButton variant="light" size="lg">{SISTEMAS.primaryCta}</QuoteButton>
        <Button href={whatsappUrl(SISTEMAS.ctaWhatsappMessage)} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg" className={ON_BAND_GHOST}>
          {SISTEMAS.ctaWhatsapp}
        </Button>
      </CtaBand>

      <NextCards current="sistemas" />
      <FaqList id="plan" title={SISTEMAS.faqTitle} faqs={SISTEMAS.faqs} />
    </PageShell>
  );
};

export default SistemasPage;
