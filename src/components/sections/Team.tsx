import React from 'react';
import { motion } from 'framer-motion';

// TEAM SECTION
const team = [
  {
    initials: 'CC',
    name: 'Celeste Codaro',
    role: 'CMO',
    description: 'Analista de datos y especialista en Meta. Se encarga de tu presencia online, tus métricas y de que tus campañas publicitarias arranquen bien: verificación de portafolios comerciales, vinculación de cuentas y prevención de restricciones, para que cuando tu web esté lista, también esté lista para recibir tráfico pago.',
  },
  {
    initials: 'A',
    name: 'Angelo',
    role: 'CEO',
    description: 'Gerente de Customer Service con años de experiencia en atención al cliente y retención. Es quien se toma el tiempo de entender qué necesita realmente tu negocio, para que el proyecto se arme alrededor de tus objetivos y no al revés.',
  },
  {
    initials: 'G',
    name: 'Gonzalo',
    role: 'CTO',
    description: 'Técnico en programación universitario. Ya construyó proyectos reales que están en producción hoy: el campus de la institución de coaching Home (siendohome.com) y el portal de Under Club (underclub.com.ar), una plataforma para boliches y RRPP que cobran comisión por entradas. Es quien convierte cada plan en código funcionando.',
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
    <section id="equipo" className="bg-transparent py-20 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary mb-6">
            Quiénes somos
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-brand-text-secondary leading-relaxed">
            No somos una agencia grande y anónima, ni un freelancer trabajando solo. Somos tres personas, cada una a cargo de una parte distinta de tu proyecto — y eso es justo lo que nos diferencia: en Ideon, tu web pasa por gente especializada en cada etapa, no por una sola persona haciendo de todo un poco.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={item}
              className="glass-panel p-8 flex flex-col group hover:-translate-y-2 transition-transform duration-150 ease-out"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-brand-background/50 border border-brand-primary/20 text-xl font-extrabold text-brand-primary group-hover:scale-110 transition-transform duration-150 ease-out">
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary">{member.name}</h3>
                  <p className="text-sm font-bold uppercase tracking-wider text-brand-primary">{member.role}</p>
                </div>
              </div>
              <p className="text-base text-gray-600 dark:text-brand-text-secondary">{member.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
