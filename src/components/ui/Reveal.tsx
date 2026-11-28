import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { DUR_REVEAL, EASE_EMPHASIS, REVEAL_STAGGER, revealItem, revealViewport } from './motion';

// La transición de una variante le gana al prop `transition` del componente,
// así que el delay tiene que ir adentro de la variante.
const withDelay = (delay: number): Variants => ({
  hidden: revealItem.hidden,
  show: { opacity: 1, y: 0, transition: { duration: DUR_REVEAL, ease: EASE_EMPHASIS, delay } },
});

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Segundos de espera antes de aparecer (para escalonar a mano). */
  delay?: number;
  /** Posición entre hermanos: escalona la entrada `index` × 80 ms. */
  index?: number;
  style?: React.CSSProperties;
}

/**
 * Aparición suave al entrar en pantalla (una sola vez). Usar para contenido
 * que está DEBAJO del primer pantallazo: lo que se ve al cargar no se envuelve
 * en esto, porque el HTML pre-renderizado lo dejaría invisible hasta que cargue
 * el JS y empeoraría el LCP.
 */
const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, index = 0, style }) => {
  const wait = delay + index * REVEAL_STAGGER;
  return (
  <motion.div
    className={className}
    style={style}
    variants={wait ? withDelay(wait) : revealItem}
    initial="hidden"
    whileInView="show"
    viewport={revealViewport}
  >
    {children}
  </motion.div>
  );
};

export default Reveal;
