import React from 'react';
import './index.css';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';

// Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsAppButton from './components/layout/FloatingWhatsAppButton';

// UI
import ParticleBackground from './components/ui/ParticleBackground';

// Modals
import ContactModal from './components/modals/ContactModal';
import TallyModal from './components/modals/TallyModal';

// Pages
import HomePage from './pages/Home/HomePage';

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <ParticleBackground />
        <div className="bg-transparent text-[#111] dark:text-brand-text-primary antialiased relative z-10">
          <Header />
          <main>
            <HomePage />
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