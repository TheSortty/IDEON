import React from 'react';
import { motion } from 'framer-motion';

// SVG ICONS
const IconVelocidad: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconAlcance: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconSinDependencias: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const IconAds: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
);

const IconDominio: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);

const IconSinLetraChica: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

// BENEFITS SECTION
const benefits = [
  {
    icon: <IconVelocidad />,
    title: 'Velocidad',
    description: 'Entregas rápidas: desde 24hs hasta 10 días, según tu proyecto.',
  },
  {
    icon: <IconSinDependencias />,
    title: 'Sin dependencias',
    description: 'Sitio propio, sin mantenimiento obligatorio ni costos mensuales.',
  },
  {
    icon: <IconDominio />,
    title: 'Dominio propio',
    description: 'Todo queda a tu nombre. Tu web, tu dominio, tu marca',
  },
  {
    icon: <IconAlcance />,
    title: 'Alcance cerrado',
    description: 'Trabajo claro desde el principio, sin sorpresas ni cargos ocultos.',
  },
  {
    icon: <IconSinLetraChica />,
    title: 'Sin letra chica',
    description: 'Transparencia real. Lo que acordamos es lo que entregamos.',
  },
  {
    icon: <IconAds />,
    title: 'Optimizada para ads',
    description: 'Pensada para convertir: todo redirige directo a tu WhatsApp.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Benefits: React.FC = () => {
  return (
    <section className="bg-transparent py-20 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary mb-6">
            Trabajamos distinto
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-brand-text-secondary leading-relaxed">
            En el mercado, muchos desarrolladores generan dependencia con tecnicismos y cuotas mensuales. En IDEON nos enfocamos en vos: claridad, entrega completa e independencia real desde el primer día.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={item}
              className="glass-panel p-8 text-center group hover:-translate-y-2 transition-transform duration-150 ease-out"
            >
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 dark:bg-brand-background/50 mx-auto mb-6 group-hover:scale-110 transition-transform duration-150 ease-out border border-brand-primary/20">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary mb-3">{benefit.title}</h3>
              <p className="text-base text-gray-600 dark:text-brand-text-secondary">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;