import React from 'react';
import Button from './ui/Button';
import { useModal } from '../contexts/ModalContext';

// HERO ICONS
const IconImplementacion: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-brand-primary">
        <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const IconPropiedad: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-brand-primary">
        <path d="M8.53554 2.5L3.5 7.53553L12 16.0355L20.5 7.53553L15.4645 2.5H8.53554Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.5 7.5H20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16L17.5 21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16L6.5 21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


// HERO SECTION
const Hero: React.FC = () => {
  const { openTallyModal } = useModal();
  
  const handleScrollToPlans = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('planes');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111] dark:text-brand-text-primary">
              Tu landing lista en tiempo récord.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-brand-text-secondary max-w-lg mx-auto lg:mx-0">
              Efectiva, dominio propio y sin complicaciones.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <Button className="w-full sm:w-auto" onClick={handleScrollToPlans}>Lanzar mi página</Button>
              <Button variant="outline" className="w-full sm:w-auto" onClick={openTallyModal}>Empezar mi brief!</Button>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-6 gap-y-4">
              <div className="flex items-center gap-3 bg-white/60 dark:bg-brand-surface/60 rounded-lg p-3 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-transparent">
                <IconImplementacion />
                <p className="font-medium text-gray-700 dark:text-brand-text-primary">Implementación rápida, enfoque en resultados.</p>
              </div>
              <div className="flex items-center gap-3 bg-white/60 dark:bg-brand-surface/60 rounded-lg p-3 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-transparent">
                <IconPropiedad />
                <p className="font-medium text-gray-700 dark:text-brand-text-primary">Total propiedad, handoff al 100%.</p>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
                <img className="w-full rounded-xl shadow-2xl" src="https://seranking.com/es/blog/wp-content/uploads/sites/13/2020/04/750-X-400-2x.jpg" alt="Mockup de landing page en laptop y móvil" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;