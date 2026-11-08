import React from 'react';

interface IconProps {
  className?: string;
}

// Íconos de línea (estilo Feather) para los links del nav. Se mantienen
// simples y genéricos a propósito: son símbolos universales (personas,
// maletín, capas, ayuda, sobre), no requieren una librería de íconos nueva.
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const UsersIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export const LayersIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export const HelpCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22 6 12 13 2 6" />
  </svg>
);

// ---- Rediseño (etapa B): menú de Servicios, menú mobile y volver arriba ----

export const StackIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M12 2 2 7l10 5 10-5-10-5z" />
    <path d="m2 17 10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

export const MonitorIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

export const BagIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} strokeWidth={2.5} className={className} aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} strokeWidth={2.5} className={className} aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
