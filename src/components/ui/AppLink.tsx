import React from 'react';
import { Link } from 'react-router';

/** ¿Es un destino fuera del sitio (otra web, wa.me, mailto:)? */
export const isExternalHref = (href: string): boolean => /^(https?:|mailto:|tel:)/.test(href);

type AppLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
  /** Datos que viajan a la página destino (solo links internos). */
  state?: unknown;
};

/**
 * Link que sirve para cualquier destino: rutas del sitio con <Link> de React
 * Router (navegan sin recargar) y destinos externos con <a> en pestaña nueva.
 * Lo usa la navegación, cuyos destinos cambian de interno a externo según qué
 * páginas estén publicadas (ver src/constants/navigation.ts).
 */
const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(({ to, state, ...props }, ref) =>
  isExternalHref(to) ? (
    <a ref={ref} href={to} target={to.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" {...props} />
  ) : (
    <Link ref={ref} to={to} state={state} {...props} />
  ),
);
AppLink.displayName = 'AppLink';

export default AppLink;
