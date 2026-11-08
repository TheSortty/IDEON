import React, { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpIcon } from '../ui/NavIcons';
import { EASE_EMPHASIS } from '../ui/motion';

/** A partir de cuántos px de scroll aparece el botón de volver arriba. */
const TO_TOP_THRESHOLD = 600;

/**
 * Barra de progreso de lectura (arriba de todo) y botón de volver arriba.
 * La barra se mueve con un motion value: framer-motion actualiza el transform
 * directo, sin re-renderizar React en cada scroll. El botón sí es estado, pero
 * solo cambia al cruzar el umbral.
 */
const ScrollChrome: React.FC = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [showToTop, setShowToTop] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > TO_TOP_THRESHOLD;
    setShowToTop((prev) => (prev === next ? prev : next));
  });

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_12px_rgb(var(--accent)/0.7)]"
        style={{ scaleX: scrollYProgress }}
      />
      <AnimatePresence>
        {showToTop && (
          <motion.button
            type="button"
            aria-label="Volver arriba"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass fixed bottom-[100px] right-[31px] z-50 flex h-12 w-12 items-center justify-center rounded-full text-content shadow-[0_12px_30px_-10px_rgb(0_0_0/0.5)] transition-[background-color,border-color,box-shadow] duration-medium hover:border-accent hover:bg-accent-solid hover:text-accent-ink hover:shadow-[0_0_30px_rgb(var(--accent)/0.6)]"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4, ease: EASE_EMPHASIS }}
          >
            <ArrowUpIcon className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollChrome;
