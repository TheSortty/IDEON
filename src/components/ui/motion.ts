import type { Variants, Transition } from 'framer-motion';

// Curvas y duraciones compartidas. Son las mismas que --ease-emphasis y
// --dur-long en src/index.css: framer-motion anima en JS y no puede leer una
// custom property, así que el valor se repite acá y en ningún otro lado.
export const EASE_EMPHASIS = [0.16, 1, 0.3, 1] as const;
export const DUR_LONG = 0.6;

// Reveal escalonado por sección. El contenedor no anima nada propio: solo
// coordina el delay entre sus hijos, para que las cards entren una detrás de
// otra en vez de todas juntas.
export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR_LONG, ease: EASE_EMPHASIS },
  },
};

// amount bajo a propósito: con un umbral alto, un elemento más alto que el
// viewport puede no llegar a cruzarlo nunca y quedarse en opacity: 0.
export const revealViewport = { once: true, amount: 0.2 } as const;

export const revealTransition: Transition = {
  duration: DUR_LONG,
  ease: EASE_EMPHASIS,
};
