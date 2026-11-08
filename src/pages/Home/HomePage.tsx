import React from 'react';

// SEO
import { useJsonLd } from '../../hooks/useJsonLd';
import { HOME_META } from '../../constants/home';
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID, absoluteUrl } from '../../constants/seo';

// Secciones
import HomeHero from './HomeHero';
import WordsDivider from './WordsDivider';
import ProcessSection from './ProcessSection';
import AdvantagesSection from './AdvantagesSection';
import ServicesPromo from './ServicesPromo';
import FeaturedCases from './FeaturedCases';
import FinalCta from './FinalCta';

// WebPage de la home. Ya no es FAQPage: el Inicio nuevo no tiene preguntas
// frecuentes y Google pide que el marcado describa lo que está en la página.
// El FAQPage vuelve en /preguntas/ (etapa F).
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: HOME_META.title,
  description: HOME_META.description,
  inLanguage: 'es-AR',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORGANIZATION_ID },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: absoluteUrl('/og-image.png'),
  },
};

const HomePage: React.FC = () => {
  useJsonLd(homeJsonLd, 'ld-home');

  return (
    // overflow-x-clip: los orbes se salen por los costados a propósito, pero
    // no tienen que generar scroll horizontal. `clip` (no `hidden`) no rompe
    // el sticky de la columna de ventajas.
    <div className="relative isolate overflow-x-clip">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[120px] -z-10 h-[600px] w-[600px] animate-orb rounded-full bg-accent opacity-[0.17] blur-[90px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[220px] top-[1600px] -z-10 h-[560px] w-[560px] animate-orb-reverse rounded-full bg-accent-2 opacity-[0.13] blur-[90px]"
      />
      <HomeHero />
      <WordsDivider />
      <ProcessSection />
      <AdvantagesSection />
      <ServicesPromo />
      <FeaturedCases />
      <FinalCta />
    </div>
  );
};

export default HomePage;
