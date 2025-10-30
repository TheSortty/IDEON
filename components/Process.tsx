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
    <section id="proceso" className="bg-slate-100 dark:bg-[#42006b] py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Proceso claro y directo</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            5 pasos desde la reunión inicial
          </p>
        </div>
        <div className="mt-16 space-y-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex items-start group">
                <div className="absolute left-6 top-6 h-full border-l-2 border-dashed border-slate-300 dark:border-slate-600" aria-hidden="true"></div>
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-[#b900de] text-white font-bold text-xl z-10 shadow transition-all duration-300 group-hover:bg-[#a200c5] group-hover:scale-110">
                    {step.number}
                </div>
                <div className="ml-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-[#b900de]">{step.title}</h3>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">{step.description}</p>
                </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center bg-[#b900de]/10 border border-[#b900de]/20 rounded-lg p-4">
            <p className="text-sm text-purple-800 dark:text-[#e08aff]">
                <span className="font-bold">Nota:</span> Si faltan textos o imágenes, usamos copy genérico preaprobado para no frenar el proyecto.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Process;