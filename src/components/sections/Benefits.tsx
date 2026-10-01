import React from 'react';
import { motion } from 'framer-motion';
import { revealContainer, revealItem, revealViewport, revealTransition } from '../ui/motion';
import { BENEFITS, type BenefitIcon } from '../../constants/home';

// SVG ICONS
const iconClass = "w-5 h-5 text-accent";

const IconDiseno: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const IconProyecto: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const IconPropiedad: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const IconPauta: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const IconLibertad: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconPago: React.FC = () => (
  <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

// El copy de cada tarjeta vive en src/constants/home.ts; acá solo se elige
// el ícono que le corresponde.
const ICONS: Record<BenefitIcon, React.FC> = {
  diseno: IconDiseno,
  propiedad: IconPropiedad,
  libertad: IconLibertad,
  proyecto: IconProyecto,
  pago: IconPago,
  pauta: IconPauta,
};

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
          {BENEFITS.map((benefit) => {
            const Icon = ICONS[benefit.icon];
            return (
              <motion.div
                key={benefit.title}
                variants={revealItem}
                className="surface-card px-6 py-4 flex items-start gap-4 group hover:border-line-strong hover:-translate-y-1 transition-[transform,border-color] duration-medium ease-out-token"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100 dark:bg-brand-background/50 border border-accent/20 group-hover:scale-110 transition-transform duration-fast ease-out-token">
                  <Icon />
                </div>
                <div>
                  <h3 className="text-base font-bold text-content">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-content-muted">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
