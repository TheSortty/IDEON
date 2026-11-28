import React from 'react';

// SEO
import { useJsonLd } from '../../hooks/useJsonLd';
import { HOME_META } from '../../constants/home';
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID, absoluteUrl } from '../../constants/seo';

// Secciones
import HomeHero from './HomeHero';
import ServicesMarquee from './ServicesMarquee';
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
    // overflow-clip: nada genera scroll horizontal. `clip` (no `hidden`) no
    // rompe el sticky de las tarjetas del proceso. Los orbes de luz de fondo
    // se sacaron (se veían como glow alrededor del contenido).
    <div className="relative isolate overflow-clip">
      <HomeHero />
      <ServicesMarquee />
      <ProcessSection />
      <AdvantagesSection />
      <ServicesPromo />
      <FeaturedCases />
      <FinalCta />
    </div>
  );
};

export default HomePage;
