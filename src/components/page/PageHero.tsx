import React from 'react';
import { Link } from 'react-router';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  crumbs: Crumb[];
  /** [texto, parte destacada en degradado] */
  title: readonly [string, string];
  actions: React.ReactNode;
  visual: React.ReactNode;
}

// Hero de las páginas internas: migas, H1, botones y una ilustración. Entra
// con `animate-rise` (CSS), sin esperar al JS, porque es lo primero que se ve.
const PageHero: React.FC<PageHeroProps> = ({ crumbs, title, actions, visual }) => (
  <section className="pb-[72px] pt-[72px]">
    <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-16">
      <div className="flex flex-col gap-6">
        <nav aria-label="Ruta" className="animate-rise text-sm text-content-muted">
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.label}>
              {i > 0 && <span aria-hidden="true"> / </span>}
              {crumb.to ? (
                <Link to={crumb.to} className="text-content-muted no-underline transition-colors hover:text-content">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-content">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="animate-rise font-extrabold text-content [animation-delay:150ms]">
          {title[0]}
          <span className="text-gradient-pan animate-gradient-pan">{title[1]}</span>
        </h1>
        <div className="flex animate-rise flex-wrap gap-3.5 [animation-delay:300ms]">{actions}</div>
      </div>
      <div className="min-w-0 animate-rise [animation-delay:300ms]">{visual}</div>
    </div>
  </section>
);

export default PageHero;
