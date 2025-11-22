import React from 'react';
import Button from './ui/Button';
import { useModal } from '../contexts/ModalContext';

const Cta: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section id="contacto" className="py-20 sm:py-24 bg-white dark:bg-brand-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-[#111] dark:text-brand-text-primary">
          ¿Tenés una idea? <span className="text-brand-primary">Es hora de ideonar.</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary max-w-2xl mx-auto">
          Contanos tu proyecto y lo ponemos online en tiempo récord. Hacé click y completá el formulario para que podamos contactarte.
        </p>
        <div className="mt-8">
          <Button onClick={() => openModal()} className="text-lg px-8 py-4">
            Lanzar mi página
          </Button>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-brand-text-secondary/20">
             <p className="text-gray-600 dark:text-brand-text-secondary">¿Preferís hablar directo? Contactanos por WhatsApp.</p>
             <a href="https://wa.me/5492616915325" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
               <Button className="bg-[#25D366] text-white hover:bg-[#128C7E] focus:ring-green-500">Hablar por WhatsApp</Button>
             </a>
        </div>
      </div>
    </section>
  );
};

export default Cta;