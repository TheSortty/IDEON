import React from 'react';

// PROCESS SECTION
const steps = [
  {
    number: '01',
    title: 'Brief + 50%',
    description: 'Completás el brief y abonás el 50% para iniciar el proyecto.',
  },
  {
    number: '02',
    title: 'Reunión 20\'',
    description: 'Videollamada rápida para alinear expectativas y resolver dudas.',
  },
  {
    number: '03',
    title: 'MVP en el plazo elegido',
    description: 'Recibís la primera versión completa en el tiempo contratado.',
  },
  {
    number: '04',
    title: '1 revisión 30\'',
    description: 'Una ronda de ajustes incluida para pulir detalles.',
  },
  {
    number: '05',
    title: 'Entrega + handoff + 50%',
    description: 'Recibís todo el código, accesos y documentación. Abonás el saldo restante.',
  },
];

const Process: React.FC = () => {
  return (
    <section id="proceso" className="bg-white dark:bg-brand-surface py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">Proceso claro y directo</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary">
            5 pasos desde la reunión inicial
          </p>
        </div>
        <div className="mt-16 space-y-12">
          {steps.map((step) => (
            <div key={step.number} className="relative flex items-start group">
                <div className="absolute left-6 top-6 h-full border-l-2 border-dashed border-gray-300 dark:border-gray-600" aria-hidden="true"></div>
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary text-white font-bold text-xl z-10 shadow transition-all duration-300 group-hover:bg-brand-primary-hover group-hover:scale-110">
                    {step.number}
                </div>
                <div className="ml-6">
                    <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary transition-colors duration-300 group-hover:text-brand-primary">{step.title}</h3>
                    <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">{step.description}</p>
                </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center bg-brand-primary/10 border border-brand-primary/20 rounded-lg p-4">
            <p className="text-sm text-brand-primary">
                <span className="font-bold">Nota:</span> Si faltan textos o imágenes, usamos copy genérico preaprobado para no frenar el proyecto.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Process;