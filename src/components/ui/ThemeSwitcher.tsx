import React from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Colores de marca (tailwind.config.cjs) como valores reales: framer-motion
// interpola color/filter/fill en cada frame y necesita el valor, no el
// nombre de una clase de Tailwind.
const GLOW_COLOR = '#D400FF'; // brand-primary
const OFF_COLOR = '#A9A1D1'; // brand-text-secondary

// Cuánto se puede "tirar" del cordón antes de soltar y cambiar de tema.
const CORD_TRAVEL = 16;
const CORD_TOGGLE_THRESHOLD = 9;

// Largo del cordón: a propósito más alto que la barra del nav, para que
// cuelgue por fuera de esta y se note apenas se carga la página.
const CORD_LENGTH = 44;

// Pull switch: la bombilla se enciende (vidrio con relleno + glow + parpadeo)
// en modo claro y se apaga en modo oscuro. El cordón se balancea solo para
// que se note que es interactivo, y además se puede tirar de él para
// alternar el tema (además del click normal).
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
      className="relative flex items-center justify-center h-10 w-10 rounded-full cursor-pointer hover:bg-gray-200/60 dark:hover:bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-[#f8f8f8] dark:focus:ring-offset-brand-background transition-colors duration-300"
    >
      <motion.svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={1.75}
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
        <motion.path
          d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"
          animate={{ fill: isLight ? `${GLOW_COLOR}40` : 'transparent' }}
          transition={{ duration: 0.5 }}
        />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </motion.svg>

      {/* Fuera del flujo a propósito: así el cordón puede colgar por debajo
          del borde inferior de la barra del nav sin agrandar el header ni
          desalinear el resto de los items. */}
      <motion.div
        className="absolute left-1/2 top-full -translate-x-1/2"
        style={{ transformOrigin: 'top center' }}
        animate={{ rotate: [-9, 9, -9] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          aria-hidden="true"
          animate={{ backgroundColor: color }}
          transition={{ duration: 0.4 }}
          className="w-px mx-auto opacity-60"
          style={{ height: CORD_LENGTH }}
        />
        <motion.div
          aria-hidden="true"
          drag="y"
          dragConstraints={{ top: 0, bottom: CORD_TRAVEL }}
          dragElastic={0.3}
          dragMomentum={false}
          onDragEnd={handleCordDragEnd}
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.25 }}
          whileDrag={{ scale: 1.5 }}
          animate={{ backgroundColor: color }}
          transition={{ duration: 0.4 }}
          className="w-2.5 h-2.5 rounded-full cursor-grab active:cursor-grabbing ring-2 ring-current ring-offset-1 ring-offset-transparent"
        />
      </motion.div>
    </div>
  );
};

export default ThemeSwitcher;
