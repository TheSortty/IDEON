import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Plans from './components/Plans';
import Process from './components/Process';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';
import ContactModal from './components/ContactModal';
import TallyModal from './components/TallyModal';

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <div className="bg-slate-50 text-slate-800 dark:bg-[#03031f] dark:text-slate-300 font-['Poppins',_sans-serif] antialiased transition-colors duration-300">
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
        </div>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
