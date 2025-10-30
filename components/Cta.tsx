import React from 'react';
import Button from './ui/Button';
import { useModal } from '../contexts/ModalContext';

const Cta: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section id="contacto" className="py-20 sm:py-24 bg-slate-100 dark:bg-[#42006b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          ¿Tenés una idea? <span className="text-[#b900de]">Es hora de ideonar.</span>
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Contanos tu proyecto y lo ponemos online en tiempo récord. Hacé click y completá el formulario para que podamos contactarte.
        </p>
        <div className="mt-8">
          <Button onClick={() => openModal()} className="text-lg px-8 py-4">
            Lanzar mi página
          </Button>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-300 dark:border-slate-600">
             <p className="text-slate-600 dark:text-slate-300">¿Preferís hablar directo? Contactanos por WhatsApp.</p>
             <a href="https://wa.me/5492616915325" target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
               <Button variant="secondary">Hablar por WhatsApp</Button>
             </a>
        </div>
      </div>
    </section>
  );
};

export default Cta;