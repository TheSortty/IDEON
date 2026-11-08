import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, type PanInfo } from 'framer-motion';
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
/** Radio (px) en el que la cadenita "busca" el cursor. */
const MAGNET_RADIUS = 120;
/** Inclinación máxima de la cadenita hacia el cursor (grados). */
const MAGNET_MAX_ANGLE = 34;

/**
 * La cadenita del foco.
 *
 * - En desktop, cuando el cursor se acerca, deja de balancearse y se inclina
 *   hacia él (y la cuenta final crece): es fácil de agarrar sin apuntar fino.
 * - El área de toque de la cuenta final es de 44 × 44 px (mínimo recomendado
 *   para dedos), aunque se vea chiquita.
 * - Se puede tocar (da un tirón y cambia el tema) o arrastrar hacia abajo.
 *   El foco sigue siendo el botón accesible (teclado y lectores de
 *   pantalla); la cadenita es un atajo para el mouse y el dedo.
 */
const PullCord: React.FC<{ color: string; onPull: () => void }> = ({ color, onPull }) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const rotate = useMotionValue(0);
  const pullY = useMotionValue(0);
  const [near, setNear] = useState(false);

  // Balanceo en reposo; se frena mientras la cadenita sigue al cursor.
  useEffect(() => {
    if (near) return;
    const controls = animate(rotate, [rotate.get(), -9, 9, -9], {
      duration: 2.6,
      times: [0, 0.15, 0.6, 1],
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [near, rotate]);

  // Imán: solo con mouse (en pantallas táctiles no hay cursor que seguir).
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    let isNear = false;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const anchor = anchorRef.current;
        if (!anchor) return;
        const r = anchor.getBoundingClientRect();
        const ax = r.left + r.width / 2;
        const ay = r.top;
        const dx = e.clientX - ax;
        const dy = e.clientY - ay;
        // Distancia a la cuenta final (cuelga ~44 px debajo del anclaje).
        const dist = Math.hypot(dx, dy - 44);
        const nowNear = dist < MAGNET_RADIUS && dy > -24;
        if (nowNear) {
          const angle = (-Math.atan2(dx, Math.max(dy, 12)) * 180) / Math.PI;
          const clamped = Math.max(-MAGNET_MAX_ANGLE, Math.min(MAGNET_MAX_ANGLE, angle));
          animate(rotate, clamped, { type: 'spring', stiffness: 160, damping: 14 });
        }
        if (nowNear !== isNear) {
          isNear = nowNear;
          setNear(nowNear);
        }
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [rotate]);

  const pull = () => {
    animate(pullY, [0, CORD_TRAVEL, 0], { duration: 0.35, ease: 'easeOut' });
    onPull();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > CORD_TOGGLE_THRESHOLD) onPull();
  };

  return (
    <motion.div
      ref={anchorRef}
      className="absolute left-1/2 top-full flex flex-col items-center gap-1"
      // El centrado va como motion value (x): framer-motion escribe el
      // `transform` completo y pisaría un -translate-x-1/2 de Tailwind.
      style={{ x: '-50%', rotate, transformOrigin: 'top center' }}
    >
      {Array.from({ length: CHAIN_BEAD_COUNT }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="h-1 w-1 rounded-full transition-colors duration-500"
          style={{ backgroundColor: color }}
        />
      ))}
      {/* Área de toque grande (44 × 44) con la cuenta visible en el centro. */}
      <motion.div
        aria-hidden="true"
        drag="y"
        dragConstraints={{ top: 0, bottom: CORD_TRAVEL }}
        dragElastic={0.3}
        dragMomentum={false}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        onTap={pull}
        onClick={(e) => e.stopPropagation()}
        style={{ y: pullY, touchAction: 'none' }}
        className="-my-[18px] flex h-11 w-11 cursor-grab items-center justify-center active:cursor-grabbing"
      >
        <motion.span
          className="block h-2 w-2 rounded-full transition-colors duration-500"
          style={{ backgroundColor: color }}
          animate={{ scale: near ? 1.6 : 1, boxShadow: near ? `0 0 12px ${color}` : `0 0 0px ${color}` }}
          whileHover={{ scale: 1.8 }}
          whileTap={{ scale: 1.5 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Pull switch: el foco se enciende (vidrio con relleno + filamento + glow +
// parpadeo) en modo claro y se apaga en modo oscuro. La cadenita se
// balancea sola para que se note que es interactiva, y además se puede
// tirar de la última cuenta para alternar el tema (además del click normal).
const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  // El tema real solo se conoce en el navegador (lo fija el script del <head>
  // de index.html). El HTML pre-renderizado no puede saberlo, así que el foco
  // se dibuja recién después de montar: si se hidratara con el tema
  // equivocado, quedaría con el aria-label y el brillo al revés.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-12 w-12" aria-hidden="true" />;
  const color = isLight ? GLOW_COLOR : OFF_COLOR;

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
      className="relative flex items-center justify-center h-12 w-12 rounded-full cursor-pointer hover:bg-content/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base transition-colors duration-300"
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
          header ni desalinear el resto de los items. */}
      <PullCord color={color} onPull={toggleTheme} />
    </div>
  );
};

export default ThemeSwitcher;
