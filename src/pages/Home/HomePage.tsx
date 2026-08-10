import React from 'react';

// Sections
import Hero from '../../components/sections/Hero';
import Benefits from '../../components/sections/Benefits';
import Team from '../../components/sections/Team';
import CaseStudies from '../../components/sections/CaseStudies';
import WhyYouNeedThis from '../../components/sections/WhyYouNeedThis';
import Plans from '../../components/sections/Plans';
import Process from '../../components/sections/Process';
import Support from '../../components/sections/Support';
import Faq from '../../components/sections/Faq';
import Cta from '../../components/sections/Cta';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <Team />
      <CaseStudies />
      <WhyYouNeedThis />
      <Plans />
      <Process />
      <Support />
      <Faq />
      <Cta />
    </>
  );
};

export default HomePage;
