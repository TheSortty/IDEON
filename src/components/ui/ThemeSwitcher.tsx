import React from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Colores de marca (tailwind.config.cjs) como valores reales: framer-motion
// interpola color/filter en cada frame y necesita el valor, no el nombre de
// una clase de Tailwind.
const GLOW_COLOR = '#D400FF'; // brand-primary
const OFF_COLOR = '#A9A1D1'; // brand-text-secondary

// Cuánto se puede "tirar" del cordón antes de soltar y cambiar de tema.
const CORD_TRAVEL = 10;
const CORD_TOGGLE_THRESHOLD = 6;

// Versión chica de un pull-switch: la bombilla se enciende en modo claro y
// se apaga en modo oscuro (metáfora de "luces prendidas/apagadas"), y el
// cordón de abajo se puede tirar para alternar, además del click normal.
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
      className="relative flex flex-col items-center px-2 pt-1.5 pb-3 rounded-full cursor-pointer hover:bg-gray-200/60 dark:hover:bg-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-[#f8f8f8] dark:focus:ring-offset-brand-background transition-colors duration-300"
    >
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          stroke: color,
          filter: isLight
            ? `drop-shadow(0 0 6px ${GLOW_COLOR}aa)`
            : 'drop-shadow(0 0 0 rgba(0,0,0,0))',
        }}
        transition={{ duration: 0.4 }}
      >
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" />
      </motion.svg>

      <motion.div
        aria-hidden="true"
        animate={{ backgroundColor: color }}
        transition={{ duration: 0.4 }}
        className="w-px h-2 opacity-50 mt-0.5"
      />
      <motion.div
        aria-hidden="true"
        drag="y"
        dragConstraints={{ top: 0, bottom: CORD_TRAVEL }}
        dragElastic={0.3}
        dragMomentum={false}
        onDragEnd={handleCordDragEnd}
        onClick={(e) => e.stopPropagation()}
        whileDrag={{ scale: 1.4 }}
        animate={{ backgroundColor: color }}
        transition={{ duration: 0.4 }}
        className="w-2 h-2 rounded-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};

export default ThemeSwitcher;
