import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export type CarouselImage = {
  src: string;
  alt: string;
};

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? '-100%' : '100%', opacity: 0 }),
};

const Arrow: React.FC<{ flipped?: boolean }> = ({ flipped }) => (
  <svg className={`w-5 h-5 ${flipped ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
);

const Carousel: React.FC<{ images: CarouselImage[] }> = ({ images }) => {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);

  if (images.length === 0) return null;

  const paginate = (dir: number) => {
    setSlide(([current]) => [(current + dir + images.length) % images.length, dir]);
  };

  const goTo = (target: number) => {
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  };

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-brand-background/60">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={index}
            src={images[index].src}
            alt={images[index].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 32 }, opacity: { duration: 0.2 } }}
            className="absolute inset-0 w-full h-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/45 text-white backdrop-blur-sm hover:bg-brand-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <Arrow />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Imagen siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/45 text-white backdrop-blur-sm hover:bg-brand-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              <Arrow flipped />
            </button>
            <span className="absolute bottom-3 right-3 text-xs font-semibold px-2 py-1 rounded-md bg-black/45 text-white backdrop-blur-sm">
              {index + 1}/{images.length}
            </span>
          </>
        )}
      </div>

      <div className="mt-3 flex items-center gap-4">
        <p className="flex-grow text-sm text-gray-500 dark:text-brand-text-secondary">
          {images[index].alt}
        </p>
        {images.length > 1 && (
          <div className="flex-shrink-0 flex items-center gap-2">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  i === index ? 'w-6 bg-brand-primary' : 'w-2 bg-gray-300 dark:bg-white/25 hover:bg-brand-primary/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
