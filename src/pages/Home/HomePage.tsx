import React from 'react';

// Sections
import Hero from '../../components/sections/Hero';
import Benefits from '../../components/sections/Benefits';
import Plans from '../../components/sections/Plans';
import Process from '../../components/sections/Process';
import Faq from '../../components/sections/Faq';
import Cta from '../../components/sections/Cta';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <Plans />
      <Process />
      <Faq />
      <Cta />
    </>
  );
};

export default HomePage;
