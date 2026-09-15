import React from 'react';
import { motion } from 'framer-motion';
import { revealContainer, revealItem, revealViewport, revealTransition } from '../ui/motion';

// SVG ICONS
const iconClass = "w-5 h-5 text-accent";

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

const Benefits: React.FC = () => {
  return (
    <section className="section-alt relative z-10">
      <div className="container-site">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={revealTransition}
          className="text-center mb-8"
        >
          <h2 className="font-extrabold text-content">
            Trabajamos distinto
          </h2>
        </motion.div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={revealItem}
              className="surface-card px-6 py-4 flex items-start gap-4 group hover:border-line-strong hover:-translate-y-1 transition-[transform,border-color] duration-medium ease-out-token"
            >
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 dark:bg-brand-background/50 border border-accent/20 group-hover:scale-110 transition-transform duration-fast ease-out-token">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-content">{benefit.title}</h3>
                <p className="mt-1 text-sm leading-snug text-content-muted">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
