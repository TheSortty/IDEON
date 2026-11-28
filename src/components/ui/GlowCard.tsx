import React, { useRef } from 'react';
import { usePointerGlow } from '../../hooks/usePointerGlow';
import { cn } from '../../lib/cn';

interface GlowCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'li' | 'article';
  /** Se eleva 6 px y el borde pasa a magenta sólido al pasar el mouse. */
  lift?: boolean;
  /** Leve inclinación 3D que sigue al puntero (casos). */
  tilt?: boolean;
}

/**
 * Tarjeta con brillo INTERNO que sigue al mouse (.glow-card en index.css).
 * La luz vive dentro de la caja (overflow: hidden) y nunca se derrama hacia
 * afuera. Sin JS (o en celular) la tarjeta se ve igual, solo sin la luz.
 * Para una tarjeta que además es un link, usar `useCardGlow` + las clases.
 */
const GlowCard: React.FC<GlowCardProps> = ({ as = 'div', lift = true, tilt = false, className, children, ...rest }) => {
  const ref = useRef<HTMLElement>(null);
  usePointerGlow(ref, tilt);
  return React.createElement(
    as,
    { ...rest, ref, className: cn('glow-card', lift && 'glow-lift', tilt && 'tilt', className) },
    children,
  );
};

export default GlowCard;
