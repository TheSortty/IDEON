import React from 'react';

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

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <div className="bg-[#f8f8f8] dark:bg-brand-background text-[#111] dark:text-brand-text-primary antialiased">
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