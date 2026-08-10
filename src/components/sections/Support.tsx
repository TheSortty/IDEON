import React from 'react';
import { motion } from 'framer-motion';

// SUPPORT SECTION — qué pasa después de publicar la web
const paths = [
  {
    title: 'Cambio puntual',
    description: 'Se cotiza como un trabajo nuevo, con presupuesto antes de empezar. Sin permanencia ni costos fijos: pedís lo que necesitás, cuando lo necesitás.',
  },
  {
    title: 'Plan con mensualidad activa',
    description: 'Incluye un número definido de horas de cambios por mes, con un portal de tickets para pedirlos y hacerles seguimiento — sin necesidad de escribirnos cada vez.',
  },
];

const Support: React.FC = () => {
  return (
    <section id="soporte" className="py-20 sm:py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">
            Soporte y cambios después de la entrega
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary">
            Publicar la web no es el final del acompañamiento. Si más adelante necesitás modificar algo, tenés dos caminos, claros desde el principio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8"
            >
              <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary mb-3">{path.title}</h3>
              <p className="text-base text-gray-600 dark:text-brand-text-secondary">{path.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center bg-brand-primary/10 border border-brand-primary/20 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-brand-primary">
            <span className="font-bold">Importante:</span> la garantía cubre errores nuestros (bugs), no pedidos nuevos — eso también te lo dejamos claro por escrito antes de arrancar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Support;
