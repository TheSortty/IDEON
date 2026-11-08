import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';
import { ASCII_FRAMES, ASCII_FRAME_MS, ASCII_STILL_INDEX, type AsciiMode } from './asciiFrames';

// Clases completas (no armadas con el modo) para que Tailwind las detecte.
const TEXT_CLASS: Record<AsciiMode, string> = {
  off: 'ascii-off',
  warm: 'ascii-warm',
  on: 'ascii-on',
  morph: 'ascii-morph',
  code: 'ascii-code',
};

const HALO_CLASS: Record<AsciiMode, string> = {
  off: 'opacity-0',
  warm: 'opacity-[0.35] bg-accent-2',
  on: 'opacity-[0.35] bg-accent-2',
  morph: 'opacity-[0.35] bg-accent',
  code: 'opacity-[0.35] bg-accent',
};

const PRE_BASE =
  'relative m-0 whitespace-pre font-mono text-[clamp(7.5px,0.8vw,11px)] font-bold leading-none tracking-[0.02em] transition-[color,text-shadow] duration-500';
const HALO_BASE =
  'absolute h-[300px] w-[300px] animate-halo-breathe rounded-full blur-[70px] transition-[opacity,background-color] duration-[900ms]';

/**
 * Lamparita ASCII del hero (se enciende y se convierte en "/>").
 *
 * Rendimiento: React dibuja solo el primer cuadro (que es el que trae el HTML
 * pre-renderizado). Después, un intervalo cambia el texto y la clase del <pre>
 * directo en el DOM, sin re-renderizar nada, y se pausa cuando la lamparita
 * sale de pantalla o la pestaña no está visible. Con "reducir movimiento"
 * queda quieto en el "/>".
 */
const AsciiLamp: React.FC = () => {
  const preRef = useRef<HTMLPreElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    const halo = haloRef.current;
    if (!pre || !halo) return;

    const paint = (index: number) => {
      const frame = ASCII_FRAMES[index];
      pre.textContent = frame.text;
      pre.className = cn(PRE_BASE, TEXT_CLASS[frame.mode]);
      halo.className = cn(HALO_BASE, HALO_CLASS[frame.mode]);
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(ASCII_STILL_INDEX);
      return;
    }

    let index = 0;
    let timer: ReturnType<typeof setInterval> | null = null;
    let onScreen = true;

    const start = () => {
      if (timer === null && onScreen && !document.hidden) {
        timer = setInterval(() => {
          index = (index + 1) % ASCII_FRAMES.length;
          paint(index);
        }, ASCII_FRAME_MS);
      }
    };
    const stop = () => {
      if (timer !== null) clearInterval(timer);
      timer = null;
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    observer.observe(pre);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const first = ASCII_FRAMES[0];

  return (
    <div aria-hidden="true" className="relative mx-auto flex w-[min(100%,460px)] items-center justify-center">
      <span ref={haloRef} className={cn(HALO_BASE, HALO_CLASS[first.mode])} />
      <pre ref={preRef} className={cn(PRE_BASE, TEXT_CLASS[first.mode])}>
        {first.text}
      </pre>
    </div>
  );
};

export default AsciiLamp;
