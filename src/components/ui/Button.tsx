import React from 'react';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

// `secondary` y `gradient` son los nombres viejos: siguen funcionando para las
// secciones que todavía no se migraron al rediseño (se mapean a ghost/primary).
type Variant = 'primary' | 'outline' | 'ghost' | 'light' | 'secondary' | 'gradient';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: React.ReactNode;
}

// Tres formas de renderizar con los mismos estilos:
//  - `to`:   link interno del sitio → <Link> de React Router (navega sin recargar).
//  - `href`: link externo, mailto:, wa.me o ancla → <a>.
//  - nada:   acción → <button>.
type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { href?: undefined; to?: undefined };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string; to?: undefined };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> & { to: string; href?: undefined };

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

const base =
  'group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap rounded-full font-bold no-underline ' +
  'transition-[transform,box-shadow,border-color,background-color,color] duration-medium ease-emphasis ' +
  'hover:-translate-y-[3px] active:scale-[0.97] active:duration-fast ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base ' +
  'disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<Size, string> = {
  sm: 'min-h-[46px] px-[22px] text-[15px]',
  md: 'min-h-[54px] px-7 text-base',
  lg: 'min-h-[60px] px-8 text-[17px]',
};

const variants: Record<Variant, string> = {
  // Degradado de la propia paleta en paneo continuo + brillo que cruza al hover.
  primary:
    'btn-shine bg-accent-gradient animate-gradient-pan text-accent-ink ' +
    'shadow-[0_0_28px_rgb(var(--accent)/0.35),inset_0_1px_0_rgb(255_255_255/0.18)] ' +
    'hover:shadow-[0_0_46px_rgb(var(--accent)/0.6),0_14px_30px_-10px_rgb(var(--accent)/0.5)]',
  outline:
    'btn-fill border-[1.5px] border-content/30 bg-content/[0.04] text-content ' +
    'hover:border-accent hover:text-accent-ink hover:shadow-[0_0_32px_rgb(var(--accent)/0.4)]',
  ghost:
    'glass text-content hover:border-accent/60 hover:bg-accent/10',
  // Para usar sobre superficies de color (la tarjeta promo, el CTA final).
  light:
    'btn-shine bg-accent-ink text-brand-surface shadow-[0_10px_30px_-10px_rgb(0_0_0/0.5)] ' +
    'hover:shadow-[0_18px_40px_-12px_rgb(0_0_0/0.6),0_0_34px_rgb(255_255_255/0.35)]',
  secondary: '',
  gradient: '',
};
variants.secondary = variants.ghost;
variants.gradient = variants.primary;

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', size = 'md', ...props }) => {
  const classes = cn(base, sizes[size], variants[variant], className);

  if (typeof props.to === 'string') {
    const { to, ...linkProps } = props as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  if (typeof props.href === 'string') {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
};

export default Button;
