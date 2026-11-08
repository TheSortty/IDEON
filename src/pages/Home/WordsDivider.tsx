import React from 'react';
import Reveal from '../../components/ui/Reveal';
import { ROTATOR } from '../../constants/home';
import { cn } from '../../lib/cn';

// Los tres puntos laten en cadena. Clases completas para que Tailwind las vea.
const DOT_DELAYS = ['[animation-delay:0s]', '[animation-delay:0.2s]', '[animation-delay:0.4s]'];

/**
 * Divisor entre el hero y el resto: dos haces de luz, la palabra que rota y
 * tres puntos. Todo el movimiento es CSS (loops sin JS).
 */
const WordsDivider: React.FC = () => (
  <Reveal className="flex flex-col items-center gap-9 overflow-hidden px-6 py-[72px]">
    <div className="beam" aria-hidden="true" />
    <p
      aria-label={ROTATOR.label}
      className="m-0 text-center text-[clamp(2.125rem,5.6vw,4.75rem)] font-black leading-[1.1] tracking-[-0.035em] text-content"
    >
      <span className="rotator" aria-hidden="true">
        <span className="rotator-track">
          {[...ROTATOR.words, ROTATOR.words[0]].map((word, i) => (
            <span key={`${word}-${i}`} className="text-gradient-pan animate-gradient-pan">
              {word}
            </span>
          ))}
        </span>
      </span>
    </p>
    <div className="flex gap-2.5" aria-hidden="true">
      {DOT_DELAYS.map((delay) => (
        <i key={delay} className={cn('block h-2 w-2 animate-dot-pulse rounded-full bg-accent', delay)} />
      ))}
    </div>
    <div className="beam beam-reverse" aria-hidden="true" />
  </Reveal>
);

export default WordsDivider;
