import React, { useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';

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

// Ancho fijo de cada tarjeta (coincide con la clase w-72 de Tailwind) para
// poder calcular en JS el desplazamiento que centra a la tarjeta activa y
// apila al resto detrás, en perspectiva.
const CARD_WIDTH = 288;
const STEP_BY_LEVEL = [0, 130, 230];
const SCALE_BY_LEVEL = [1, 0.85, 0.7];
const BLUR_BY_LEVEL = [0, 2, 5];
const Z_INDEX_BY_LEVEL = [30, 20, 10];

function getCardMotion(relativeIndex: number) {
  const level = Math.min(2, Math.abs(relativeIndex));
  const sign = Math.sign(relativeIndex);
  return {
    x: -CARD_WIDTH / 2 + sign * STEP_BY_LEVEL[level],
    scale: SCALE_BY_LEVEL[level],
    filter: `blur(${BLUR_BY_LEVEL[level]}px)`,
    zIndex: Z_INDEX_BY_LEVEL[level],
  };
}

const Team: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(team.length - 1, index)));
  };

  // Soporte de swipe: se arrastra el escenario completo (con resistencia
  // elástica, ya que dragConstraints lo fija en 0) y al soltar se decide si
  // avanza o retrocede según la distancia recorrida.
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) goTo(activeIndex + 1);
    else if (info.offset.x > 60) goTo(activeIndex - 1);
  };

  return (
    <section id="equipo" className="bg-transparent py-12 sm:py-16 relative z-10 scroll-mt-24">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <motion.div
              className="relative h-[440px] max-w-full touch-pan-y"
              role="group"
              aria-roledescription="carrusel"
              aria-label="Integrantes del equipo"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
            >
              {team.map((member, index) => {
                const relativeIndex = index - activeIndex;
                if (Math.abs(relativeIndex) > 2) return null;

                const isActive = relativeIndex === 0;
                const { x, scale, filter, zIndex } = getCardMotion(relativeIndex);

                return (
                  <motion.div
                    key={member.name}
                    animate={{ x, scale, filter, zIndex }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    onClick={() => goTo(index)}
                    role={isActive ? undefined : 'button'}
                    tabIndex={isActive ? undefined : 0}
                    onKeyDown={(e) => {
                      if (!isActive && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        goTo(index);
                      }
                    }}
                    aria-label={isActive ? undefined : `Ir a ${member.name}`}
                    aria-hidden={isActive ? undefined : true}
                    className={`glass-panel absolute left-1/2 top-0 w-72 h-full flex flex-col overflow-hidden ${
                      isActive ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-center h-28 shrink-0 bg-brand-primary/10 dark:bg-brand-primary/15">
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white dark:bg-brand-background/50 border border-brand-primary/20 text-lg font-extrabold text-brand-primary">
                        {member.initials}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary">{member.name}</h3>
                      <p className="text-sm font-bold uppercase tracking-wider text-brand-primary">{member.role}</p>
                      <p className="mt-3 text-sm text-gray-600 dark:text-brand-text-secondary leading-relaxed line-clamp-4">
                        {member.description}
                      </p>

                      {isActive && (
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {team.map((dotMember, dotIndex) => (
                              <span
                                key={dotMember.name}
                                className={`h-2.5 rounded-full transition-all duration-500 ${
                                  dotIndex === activeIndex
                                    ? 'w-7 bg-brand-primary'
                                    : 'w-2.5 bg-gray-300 dark:bg-white/20'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            {activeIndex > 0 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goTo(activeIndex - 1);
                                }}
                                aria-label="Integrante anterior"
                                className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-900/15 dark:border-white/15 text-[#111] dark:text-brand-text-primary hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                              >
                                ←
                              </button>
                            )}
                            {activeIndex < team.length - 1 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goTo(activeIndex + 1);
                                }}
                                aria-label="Siguiente integrante"
                                className="flex items-center justify-center h-9 w-9 rounded-full bg-brand-primary text-white hover:bg-brand-primary-hover transition-colors"
                              >
                                →
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Team;
