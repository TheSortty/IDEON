import React from 'react';
import './index.css';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Plans from './components/Plans';
import Process from './components/Process';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import TallyModal from './components/TallyModal';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <ParticleBackground />
        <div className="bg-transparent text-[#111] dark:text-brand-text-primary antialiased relative z-10">
          <Header />
          <main>
            <Hero />
            <Benefits />
            <Plans />
            <Process />
            <Faq />
            <Cta />
          </main>
          <Footer />
          <ContactModal />
          <TallyModal />
          <FloatingWhatsAppButton />
        </div>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;