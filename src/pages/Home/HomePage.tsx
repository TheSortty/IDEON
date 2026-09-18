import React from 'react';

// SEO
import { useJsonLd } from '../../hooks/useJsonLd';
import { FAQS } from '../../constants/faq';
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID, absoluteUrl } from '../../constants/seo';

// Sections
import Hero from '../../components/sections/Hero';
import Benefits from '../../components/sections/Benefits';
import Team from '../../components/sections/Team';
import CaseStudies from '../../components/sections/CaseStudies';
import WhyYouNeedThis from '../../components/sections/WhyYouNeedThis';
import Plans from '../../components/sections/Plans';
import Faq from '../../components/sections/Faq';
import Cta from '../../components/sections/Cta';

// La home es una WebPage que además contiene el FAQ, así que se marca con los
// dos tipos y las preguntas van en `mainEntity`. Se inyecta desde acá y no
// desde index.html para que este marcado no aparezca en los legales, que no
// tienen preguntas frecuentes.
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['WebPage', 'FAQPage'],
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: 'IDEON - Impulsá tu negocio con tecnología a medida',
  description:
    'Creamos páginas web y sistemas a medida pensados para ganar posicionamiento, ahorrar tiempo y aumentar eficiencia operativa. Diseño, dominio y SSL incluidos.',
  inLanguage: 'es-AR',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORGANIZATION_ID },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: absoluteUrl('/hero/hero-desktop.webp'),
  },
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const HomePage: React.FC = () => {
  useJsonLd(homeJsonLd, 'ld-home');

  return (
    <>
      <Hero />
      <Benefits />
      <Team />
      <CaseStudies />
      <WhyYouNeedThis />
      <Plans />
      <Faq />
      <Cta />
    </>
  );
};

export default HomePage;
