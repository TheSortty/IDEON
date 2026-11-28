import { useEffect, type RefObject } from 'react';

/** Grados máximos de la inclinación 3D (casos). */
const MAX_TILT = 5;

/**
 * Brillo interno que sigue al mouse (y, opcional, inclinación 3D).
 *
 * Escribe --mx/--my (y --rx/--ry con `tilt`) en el estilo de la tarjeta dentro
 * de un requestAnimationFrame: como mucho una escritura por cuadro y sin
 * re-renderizar React. El CSS (.glow-card, .tilt en index.css) dibuja la luz
 * y aplica la rotación.
 *
 * Solo se engancha con un puntero fino que puede hacer hover y sin "reducir
 * movimiento": en celular no hay nada que seguir.
 */
export function usePointerGlow(ref: RefObject<HTMLElement | null>, tilt = false): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const px = x - rect.left;
      const py = y - rect.top;
      el.style.setProperty('--mx', `${px}px`);
      el.style.setProperty('--my', `${py}px`);
      if (tilt && !reduced.matches) {
        const nx = px / rect.width - 0.5;
        const ny = py / rect.height - 0.5;
        el.style.setProperty('--rx', `${(-ny * MAX_TILT).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(nx * MAX_TILT).toFixed(2)}deg`);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, tilt]);
}
