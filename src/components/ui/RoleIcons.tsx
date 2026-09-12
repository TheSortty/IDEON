import React from 'react';

interface IconProps {
  className?: string;
}

// Íconos de línea (estilo Feather), consistentes con NavIcons.tsx: uno por
// rol del equipo, en vez de las iniciales en texto.
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// CMO: crecimiento / métricas.
export const TrendingUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// CEO: dirección / visión de negocio.
export const CompassIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

// CTO: desarrollo / tecnología.
export const CodeIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);
