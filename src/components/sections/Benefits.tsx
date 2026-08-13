import React from 'react';
import { motion } from 'framer-motion';

// SVG ICONS
const iconClass = "w-5 h-5 text-brand-primary";

const IconDiseno: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const IconAsesoramiento: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconProyecto: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconCasos: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconEntrega: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const IconCrecer: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

// BENEFITS SECTION
const benefits = [
  {
    icon: <IconDiseno />,
    title: 'Diseño incluido',
    description: 'Si tenés un branding lo seguimos, pero si no, lo creamos.',
  },
  {
    icon: <IconAsesoramiento />,
    title: 'Asesoramiento',
    description: 'Sesiones de acompañamiento y de feedbacks.',
  },
  {
    icon: <IconProyecto />,
    title: 'Proyecto claro',
    description: 'Plan detallado con fechas, valores y condiciones.',
  },
  {
    icon: <IconCasos />,
    title: 'Casos de éxito',
    description: 'Desarrollos reales a la vista, que generan valor y crecimiento.',
  },
  {
    icon: <IconEntrega />,
    title: 'Entrega total',
    description: 'Toda entrega es tuya. Y seguimos acompañándote.',
  },
  {
    icon: <IconCrecer />,
    title: 'Ideamos para crecer',
    description: 'En visitas, en clientes, en productividad y en tecnología.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Benefits: React.FC = () => {
  return (
    <section className="bg-transparent py-12 sm:py-16 relative z-10">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">
            Trabajamos distinto
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={item}
              className="glass-panel px-5 py-4 flex items-start gap-4 group hover:-translate-y-1 transition-transform duration-150 ease-out"
            >
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 dark:bg-brand-background/50 border border-brand-primary/20 group-hover:scale-110 transition-transform duration-150 ease-out">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#111] dark:text-brand-text-primary">{benefit.title}</h3>
                <p className="mt-1 text-sm leading-snug text-gray-600 dark:text-brand-text-secondary">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
