import React from 'react';
import { motion } from 'framer-motion';

// SVG ICONS
const IconDiseno: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const IconEquipo: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const IconPortafolio: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconReglas: React.FC = () => (
  <svg className="w-10 h-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

// BENEFITS SECTION
const benefits = [
  {
    icon: <IconDiseno />,
    title: 'Diseño incluido, no aparte',
    description: 'Muchos estudios cotizan el diseño como un servicio extra, de USD 1.000 a 10.000. Acá va incluido en un solo número junto con el desarrollo, el dominio y el certificado SSL.',
  },
  {
    icon: <IconEquipo />,
    title: 'Un equipo con nombre y apellido',
    description: 'No hablás con un buzón de entrada. Sabés quién te diseña, quién te programa y quién responde tus mensajes — y por qué cada uno está capacitado para hacerlo.',
  },
  {
    icon: <IconReglas />,
    title: 'Reglas claras desde el día uno',
    description: 'Antes de arrancar sabés exactamente qué incluye tu plan, cuántas rondas de cambios tenés y qué pasa si pedís algo que no estaba contemplado. Sin sorpresas a mitad de camino.',
  },
  {
    icon: <IconPortafolio />,
    title: 'Portafolio real, no simulado',
    description: 'No te mostramos capturas de stock: te dejamos entrar y navegar sitios y sistemas que ya están funcionando en producción, con clientes reales usándolos hoy.',
  },
  {
    icon: <IconDominio />,
    title: 'Tu web, tu dominio, sin cadenas',
    description: 'El dominio se registra a tu nombre y el código queda con vos. No hay mensualidad obligatoria para seguir teniendo tu propia web online.',
  },
  {
    icon: <IconAds />,
    title: 'Pensada para convertir',
    description: 'Carga rápida, mobile-first y con el camino más corto entre que alguien entra a tu web y te escribe: preparada para campañas de Google y Meta Ads desde el día uno.',
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
            En el mercado, la mayoría de las agencias cotiza el diseño aparte del desarrollo, o te hace firmar una mensualidad de la que después es difícil salir. En Ideon el diseño va incluido, la web queda 100% a tu nombre desde el día uno, y las reglas del proyecto se hablan claras antes de empezar — no después.
          </p>
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