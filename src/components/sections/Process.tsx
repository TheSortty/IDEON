import React from 'react';
import { motion } from 'framer-motion';

// PROCESS SECTION
const steps = [
  {
    number: '01',
    title: 'Inicio',
    description: 'Se completa el formulario + 50% del valor del plan.',
  },
  {
    number: '02',
    title: 'Reunión breve',
    description: '20 minutos para ordenar ideas, definir estilo y dejar claro el alcance.',
  },
  {
    number: '03',
    title: 'Diseño + armado',
    description: 'Se crea la primera versión completa dentro del plazo del plan elegido.',
  },
  {
    number: '04',
    title: 'Ajustes incluidos',
    description: 'Ronda de correcciones para pulir textos, imágenes y detalles finales.',
  },
  {
    number: '05',
    title: 'Lanzamiento',
    description: 'La web se publica en tu dominio, se abona el saldo restante y se entregan todos los accesos.',
  },
];

const Process: React.FC = () => {
  return (
    <section id="proceso" className="bg-transparent py-20 sm:py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">Proceso simple y sin vueltas</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary">
            Tu web lista en 5 pasos
          </p>
        </div>
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start group"
            >
              {index !== steps.length - 1 && (
                <div className="absolute left-6 top-6 h-full border-l-2 border-dashed border-gray-300 dark:border-gray-600" aria-hidden="true"></div>
              )}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-brand-primary text-white font-bold text-xl z-10 shadow-lg shadow-brand-primary/30 transition-all duration-300"
              >
                {step.number}
              </motion.div>
              <div className="ml-6 glass-panel p-6 w-full hover:bg-white/10 transition-colors duration-300">
                <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary transition-colors duration-300 group-hover:text-brand-primary">{step.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center bg-brand-primary/10 border border-brand-primary/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-brand-primary">
            <span className="font-bold">Nota:</span> Si faltan textos o imágenes, usamos copy genérico preaprobado para no frenar el proyecto.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;