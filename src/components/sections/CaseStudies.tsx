import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { openWhatsApp } from '../../constants/contact';

// CASE STUDIES SECTION
const cases = [
  {
    name: 'Home',
    subtitle: 'Campus de coaching',
    industry: 'Educación / Coaching',
    description: 'Plataforma de campus virtual para una institución de coaching, con toda la experiencia del alumno resuelta adentro: acceso a contenidos, seguimiento y comunicación, sin depender de plataformas genéricas de terceros.',
    domain: 'siendohome.com',
    url: 'https://siendohome.com',
    whatsappMessage: 'Hola Ideon, vi el proyecto de Home (siendohome.com) y quiero algo similar para mi negocio.',
  },
  {
    name: 'Under Club',
    subtitle: 'Plataforma para boliches y RRPP',
    industry: 'Entretenimiento / Nightlife',
    description: 'Sistema a medida para boliches y relacionistas públicos (RRPP) que cobran comisión por entrada: gestión de ventas, seguimiento de comisiones y operación pensada para un rubro con reglas muy específicas que ninguna plantilla genérica resuelve.',
    domain: 'underclub.com.ar',
    url: 'https://underclub.com.ar',
    whatsappMessage: 'Hola Ideon, vi el proyecto de Under Club (underclub.com.ar) y quiero algo similar para mi negocio.',
  },
];

const CaseStudies: React.FC = () => {
  return (
    <section id="casos" className="py-20 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">Casos de éxito</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary">
            Antes de contarte lo que podemos hacer, te mostramos lo que ya hicimos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cases.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="glass-panel p-8 flex flex-col"
            >
              <span className="self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200">
                {project.industry}
              </span>

              <h3 className="mt-5 text-2xl font-extrabold text-[#111] dark:text-brand-text-primary">
                {project.name} <span className="text-gray-500 dark:text-brand-text-secondary font-bold">— {project.subtitle}</span>
              </h3>

              <p className="mt-4 flex-grow text-gray-600 dark:text-brand-text-secondary">
                {project.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-primary font-semibold hover:underline underline-offset-4"
                >
                  Ver sitio: {project.domain} →
                </a>
                <Button
                  variant="outline"
                  className="sm:ml-auto"
                  onClick={() => openWhatsApp(project.whatsappMessage)}
                >
                  Quiero algo similar →
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
