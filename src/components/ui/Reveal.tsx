import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { DUR_LONG, EASE_EMPHASIS, revealItem, revealViewport } from './motion';

// La transición de una variante le gana al prop `transition` del componente,
// así que el delay tiene que ir adentro de la variante.
const withDelay = (delay: number): Variants => ({
  hidden: revealItem.hidden,
  show: { opacity: 1, y: 0, transition: { duration: DUR_LONG, ease: EASE_EMPHASIS, delay } },
});

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Segundos de espera antes de aparecer (para escalonar a mano). */
  delay?: number;
}

/**
 * Aparición suave al entrar en pantalla (una sola vez). Usar para contenido
 * que está DEBAJO del primer pantallazo: lo que se ve al cargar no se envuelve
 * en esto, porque el HTML pre-renderizado lo dejaría invisible hasta que cargue
 * el JS y empeoraría el LCP.
 */
const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    variants={delay ? withDelay(delay) : revealItem}
    initial="hidden"
    whileInView="show"
    viewport={revealViewport}
  >
    {children}
  </motion.div>
);

export default Reveal;
