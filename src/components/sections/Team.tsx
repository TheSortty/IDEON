import React from 'react';
import { motion } from 'framer-motion';

// TEAM SECTION
const team = [
  {
    initials: 'CC',
    name: 'Celeste Codaro',
    role: 'CMO',
    description: 'Lic. en Relaciones Internacionales y analista de datos. +3 años de experiencia en desarrollo y posicionamiento de negocios. Es quien planea y concreta la estrategia comercial para lograr la mejor exposición del negocio.',
  },
  {
    initials: 'AT',
    name: 'Angelo Terranova',
    role: 'CEO',
    description: 'Lic. en Sistemas y experto en Customer Experience. +3 años de trayectoria en gestiones e implementación de proyectos. Es quien se toma el tiempo de entender qué necesita realmente tu negocio, para que el proyecto se arme alrededor de tus objetivos.',
  },
  {
    initials: 'GB',
    name: 'Gonzalo Burgia',
    role: 'CTO',
    description: 'Técnico en programación y desarrollador de proyectos interdisciplinarios. Portfolio profesional desenvuelto en un amplio abanico de rubros. Es quien convierte cada proyecto en tecnología funcional.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Team: React.FC = () => {
  return (
    <section id="equipo" className="bg-transparent py-12 sm:py-16 relative z-10">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 text-center lg:text-left mb-10 lg:mb-0 lg:sticky lg:top-28"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">
              Quiénes somos
            </h2>
            <p className="mt-5 text-lg text-gray-600 dark:text-brand-text-secondary leading-relaxed">
              Somos tres personas, cada una a cargo de una parte distinta de tu proyecto. Tu web pasa por gente especializada en cada etapa, no por una sola persona haciendo de todo un poco.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-4"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={item}
                className="glass-panel p-6 sm:flex sm:items-start sm:gap-5 group hover:-translate-y-1 transition-transform duration-150 ease-out"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-gray-100 dark:bg-brand-background/50 border border-brand-primary/20 text-lg font-extrabold text-brand-primary mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-150 ease-out">
                  {member.initials}
                </div>
                <div className="mt-4 sm:mt-0 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary">{member.name}</h3>
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-primary">{member.role}</p>
                  <p className="mt-3 text-base text-gray-600 dark:text-brand-text-secondary">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Team;
