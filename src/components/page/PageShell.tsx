import React from 'react';
import { cn } from '../../lib/cn';

type OrbSide = 'left' | 'right' | 'center';

const FIRST_ORB: Record<OrbSide, string> = {
  right: '-right-40 top-[120px] h-[560px] w-[560px]',
  left: '-left-[180px] top-[140px] h-[560px] w-[560px]',
  center: 'left-1/2 top-[260px] -ml-[350px] h-[700px] w-[700px] opacity-[0.12]',
};

/**
 * Envoltorio de las páginas internas: dos orbes de luz de fondo (magenta y
 * azul) detrás del contenido. `overflow-x-clip` evita el scroll horizontal
 * sin romper los elementos sticky (la barra "En esta página").
 */
const PageShell: React.FC<{ orb?: OrbSide; children: React.ReactNode }> = ({ orb = 'right', children }) => (
  <div className="relative isolate overflow-x-clip">
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -z-10 animate-orb rounded-full bg-accent opacity-[0.16] blur-[90px]',
        FIRST_ORB[orb],
      )}
    />
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute top-[1700px] -z-10 h-[520px] w-[520px] animate-orb-reverse rounded-full bg-accent-2 opacity-[0.12] blur-[90px]',
        orb === 'left' ? '-right-[220px]' : '-left-[220px]',
      )}
    />
    {children}
  </div>
);

export default PageShell;
