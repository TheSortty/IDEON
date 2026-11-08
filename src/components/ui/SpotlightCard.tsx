import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '../../lib/cn';

type Texture = 'dots' | 'grid';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'li' | 'article';
  /** Recurso D: textura de fondo dentro de la tarjeta. */
  texture?: Texture;
  /** Recurso D: número grande en contorno detrás del contenido ("01"). */
  number?: string;
  className?: string;
  children?: React.ReactNode;
}

const TEXTURE_CLASS: Record<Texture, string> = {
  dots: 'texture-dots',
  grid: 'texture-grid',
};

/**
 * Tarjeta de vidrio con la luz que sigue al cursor (recurso C del rediseño).
 *
 * El seguimiento no re-renderiza nada: el pointermove escribe --mx/--my
 * directo en el estilo del elemento y el CSS (.spotlight en index.css) dibuja
 * la luz. En pantallas táctiles no hay cursor: la tarjeta se enciende sola
 * cuando cruza la franja central de la pantalla.
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({
  as = 'div',
  texture,
  number,
  className,
  children,
  onPointerMove,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);
  const inCenter = useInView(ref, { margin: '-40% 0px -40% 0px' });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (el && event.pointerType === 'mouse') {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    }
    onPointerMove?.(event);
  };

  return React.createElement(
    as,
    {
      ...rest,
      ref,
      onPointerMove: handlePointerMove,
      'data-lit': inCenter ? 'true' : 'false',
      className: cn('spotlight glass overflow-hidden rounded-[20px]', className),
    },
    texture && <span aria-hidden="true" className={cn('pointer-events-none absolute inset-0', TEXTURE_CLASS[texture])} />,
    number && (
      <span
        aria-hidden="true"
        className="num-outline pointer-events-none absolute -right-2 -top-3 select-none text-[clamp(5rem,9vw,7.5rem)]"
      >
        {number}
      </span>
    ),
    <div className="relative">{children}</div>,
  );
};

export default SpotlightCard;
