import React from 'react';
import Button from './ui/Button';
import { useModal } from '../contexts/ModalContext';

// ICONS
const RocketIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#b900de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const LightBulbIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#b900de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Tu landing lista en tiempo récord.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-lg mx-auto lg:mx-0">
              Efectiva, dominio propio y sin complicaciones.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
              <Button className="w-full sm:w-auto" onClick={handleScrollToPlans}>Lanzar mi página</Button>
              <Button variant="outline" className="w-full sm:w-auto" onClick={openTallyModal}>Empezar mi brief!</Button>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-x-6 gap-y-4">
              <div className="flex items-center gap-3 bg-white/60 dark:bg-[#4510b0]/40 rounded-lg p-3 shadow-lg backdrop-blur-sm border border-slate-200 dark:border-transparent">
                <RocketIcon />
                <p className="font-medium text-slate-700 dark:text-slate-200">Implementación rápida, enfoque en resultados.</p>
              </div>
              <div className="flex items-center gap-3 bg-white/60 dark:bg-[#4510b0]/40 rounded-lg p-3 shadow-lg backdrop-blur-sm border border-slate-200 dark:border-transparent">
                <LightBulbIcon />
                <p className="font-medium text-slate-700 dark:text-slate-200">Total propiedad, handoff al 100%.</p>
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
