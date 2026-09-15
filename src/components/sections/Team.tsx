import React, { useEffect, useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { TrendingUpIcon, CompassIcon, CodeIcon } from '../ui/RoleIcons';

// TEAM SECTION
const team = [
  {
    Icon: TrendingUpIcon,
    name: 'Celeste Codaro',
    role: 'CMO',
    description: 'Lic. en Relaciones Internacionales y analista de datos. +3 años de experiencia en desarrollo y posicionamiento de negocios. Es quien planea y concreta la estrategia comercial para lograr la mejor exposición del negocio.',
  },
  {
    Icon: CompassIcon,
    name: 'Angelo Terranova',
    role: 'CEO',
    description: 'Lic. en Sistemas y experto en Customer Experience. +3 años de trayectoria en gestiones e implementación de proyectos. Es quien se toma el tiempo de entender qué necesita realmente tu negocio, para que el proyecto se arme alrededor de tus objetivos.',
  },
  {
    Icon: CodeIcon,
    name: 'Gonzalo Burgia',
    role: 'CTO',
    description: 'Técnico en programación y desarrollador de proyectos interdisciplinarios. Portfolio profesional desenvuelto en un amplio abanico de rubros. Es quien convierte cada proyecto en tecnología funcional.',
  },
];

// El ancho de la tarjeta se define en dos lugares que tienen que coincidir:
// las clases estáticas de Tailwind (lo que se ve) y estos mismos valores en
// JS (lo que necesita el cálculo del desplazamiento del carrusel). Los
// breakpoints replican los de Tailwind (sm: 640px, lg: 1024px).
const CARD_WIDTH_MOBILE = 320;
const CARD_WIDTH_SM = 500;
const CARD_WIDTH_LG = 640;

function getCardWidth(viewportWidth: number) {
  if (viewportWidth >= 1024) return CARD_WIDTH_LG;
  if (viewportWidth >= 640) return CARD_WIDTH_SM;
  return CARD_WIDTH_MOBILE;
}

const STEP1_RATIO = 0.34;
const STEP2_RATIO = 0.6;
const SCALE_BY_LEVEL = [1, 0.85, 0.7];
const BLUR_BY_LEVEL = [0, 2, 5];
const Z_INDEX_BY_LEVEL = [30, 20, 10];

function getCardMotion(relativeIndex: number, cardWidth: number) {
  const level = Math.min(2, Math.abs(relativeIndex));
  const sign = Math.sign(relativeIndex);
  const step = level === 1 ? cardWidth * STEP1_RATIO : cardWidth * STEP2_RATIO;
  return {
    x: -cardWidth / 2 + sign * step,
    scale: SCALE_BY_LEVEL[level],
    filter: `blur(${BLUR_BY_LEVEL[level]}px)`,
    zIndex: Z_INDEX_BY_LEVEL[level],
  };
}

const Team: React.FC = () => {
  // Angelo (índice 1) arranca como tarjeta activa; Celeste queda a la
  // izquierda y Gonzalo a la derecha, navegables con los botones/dots/swipe.
  const [activeIndex, setActiveIndex] = useState(1);
  const [cardWidth, setCardWidth] = useState(() =>
    getCardWidth(typeof window !== 'undefined' ? window.innerWidth : CARD_WIDTH_LG)
  );

  // Mantiene el ancho usado para el cálculo del carrusel sincronizado con el
  // breakpoint de Tailwind activo (la tarjeta cambia de ancho al cruzar
  // sm/lg mientras se redimensiona la ventana).
  useEffect(() => {
    const onResize = () => setCardWidth(getCardWidth(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-extrabold text-content"
        >
          Quiénes somos
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            className="relative h-[450px] sm:h-96 lg:h-80 w-full max-w-full overflow-hidden touch-pan-y"
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
              const { x, scale, filter, zIndex } = getCardMotion(relativeIndex, cardWidth);
              const RoleIcon = member.Icon;

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
                  className={`glass-panel absolute left-1/2 top-0 w-80 sm:w-[500px] lg:w-[640px] h-full flex text-left overflow-hidden ${
                    isActive ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <div className="flex items-center justify-center w-28 sm:w-36 lg:w-48 shrink-0 bg-accent/10 dark:bg-accent/15">
                    <div className="flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-full bg-white dark:bg-brand-background/50 border border-accent/20">
                      <RoleIcon className="h-9 w-9 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-accent" />
                    </div>
                  </div>
                  <div className="p-5 sm:p-7 flex flex-col flex-1 min-w-0 justify-center">
                    <h3 className="text-xl sm:text-2xl font-bold text-content">{member.name}</h3>
                    <p className="text-sm sm:text-base font-bold uppercase tracking-wider text-accent">{member.role}</p>
                    <p className="mt-3 text-sm sm:text-base text-content-muted leading-relaxed">
                      {member.description}
                    </p>

                    {isActive && (
                      <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {team.map((dotMember, dotIndex) => (
                            <span
                              key={dotMember.name}
                              className={`h-2.5 rounded-full transition-all duration-500 ${
                                dotIndex === activeIndex
                                  ? 'w-7 bg-accent'
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
                              className="flex items-center justify-center h-9 w-9 rounded-full border border-gray-900/15 dark:border-white/15 text-content hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
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
                              className="flex items-center justify-center h-9 w-9 rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
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
    </section>
  );
};

export default Team;
