import React from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Colores de marca (tailwind.config.cjs) como valores reales: framer-motion
// interpola color/filter/fill en cada frame y necesita el valor, no el
// nombre de una clase de Tailwind.
const GLOW_COLOR = '#D400FF'; // brand-primary
const OFF_COLOR = '#A9A1D1'; // brand-text-secondary

// Cadenita (chain pull): una serie de cuentas chicas + la cuenta final, más
// grande, que es la que se arrastra. Mucho más chica que el foco a
// propósito, para que no compita en tamaño con él.
const CHAIN_BEAD_COUNT = 5;
const CORD_TRAVEL = 14;
const CORD_TOGGLE_THRESHOLD = 8;

// Pull switch: el foco se enciende (vidrio con relleno + filamento + glow +
// parpadeo) en modo claro y se apaga en modo oscuro. La cadenita se
// balancea sola para que se note que es interactiva, y además se puede
// tirar de la última cuenta para alternar el tema (además del click normal).
const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const color = isLight ? GLOW_COLOR : OFF_COLOR;

  const handleCordDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > CORD_TOGGLE_THRESHOLD) toggleTheme();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleTheme}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      }}
      aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      className="relative flex items-center justify-center h-12 w-12 rounded-full cursor-pointer hover:bg-gray-200/60 dark:hover:bg-brand-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f8f8] dark:focus-visible:ring-offset-brand-background transition-colors duration-300"
    >
      <motion.svg
        width="34"
        height="34"
        viewBox="0 0 24 28"
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          stroke: color,
          filter: isLight
            ? [
                'drop-shadow(0 0 0px rgba(212,0,255,0))',
                `drop-shadow(0 0 16px ${GLOW_COLOR})`,
                `drop-shadow(0 0 4px ${GLOW_COLOR}66)`,
                `drop-shadow(0 0 14px ${GLOW_COLOR}cc)`,
              ]
            : 'drop-shadow(0 0 0px rgba(212,0,255,0))',
        }}
        transition={
          isLight
            ? { duration: 0.7, times: [0, 0.35, 0.55, 1] }
            : { duration: 0.3 }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
      >
        {/* Vidrio */}
        <motion.circle
          cx="12"
          cy="10"
          r="7"
          animate={{ fill: isLight ? `${GLOW_COLOR}33` : 'transparent' }}
          transition={{ duration: 0.5 }}
        />
        {/* Filamento (la "resistencia" de adentro) */}
        <motion.path
          d="M8.8 12.5 10.4 8 12 12.5 13.6 8 15.2 12.5"
          strokeWidth={1.2}
          animate={{ stroke: isLight ? GLOW_COLOR : OFF_COLOR, opacity: isLight ? 1 : 0.55 }}
          transition={{ duration: 0.4 }}
        />
        <path d="M8.8 12.5v3M15.2 12.5v3" strokeWidth={1} />
        {/* Cuello */}
        <path d="M9 16.3 9.7 19h4.6l.7-2.7" />
        {/* Rosca de la base */}
        <path d="M9.9 19.6h4.2" strokeWidth={1.3} />
        <path d="M10.1 21.4h3.8" strokeWidth={1.3} />
        <path d="M10.3 23.2h3.4" strokeWidth={1.3} />
        {/* Casquillo inferior */}
        <path d="M10.8 25h2.4" strokeWidth={2} />
      </motion.svg>

      {/* Fuera del flujo a propósito: así la cadenita puede colgar por
          debajo del borde inferior de la barra del nav sin agrandar el
          header ni desalinear el resto de los items. Se ancla al centro
          horizontal de este contenedor (que es también el centro del SVG,
          simétrico respecto a x=12), para que arranque justo donde
          arranca el foco.
          El centrado horizontal NO puede ir por una clase de Tailwind
          (-translate-x-1/2): framer-motion toma control total de
          `transform` en cuanto anima `rotate`, y en cada frame pisa
          cualquier transform que venga de una clase CSS. Por eso el `x`
          va como valor de framer-motion (style.x), para que lo componga
          junto con el rotate en vez de perderlo. */}
      <motion.div
        className="absolute left-1/2 top-full flex flex-col items-center gap-1"
        style={{ x: '-50%', transformOrigin: 'top center' }}
        animate={{ rotate: [-9, 9, -9] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {Array.from({ length: CHAIN_BEAD_COUNT }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="w-1 h-1 rounded-full transition-colors duration-500"
            style={{ backgroundColor: color }}
          />
        ))}
        <motion.div
          aria-hidden="true"
          drag="y"
          dragConstraints={{ top: 0, bottom: CORD_TRAVEL }}
          dragElastic={0.3}
          dragMomentum={false}
          dragSnapToOrigin
          onDragEnd={handleCordDragEnd}
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.25 }}
          whileDrag={{ scale: 1.5 }}
          className="w-2 h-2 rounded-full cursor-grab active:cursor-grabbing ring-2 ring-current ring-offset-1 ring-offset-transparent transition-colors duration-500"
          style={{ backgroundColor: color }}
        />
      </motion.div>
    </div>
  );
};

export default ThemeSwitcher;
