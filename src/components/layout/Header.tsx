import React, { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import AppLink from '../ui/AppLink';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../ui/Button';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { BagIcon, ChevronDownIcon, CloseIcon, MenuIcon, MonitorIcon, StackIcon } from '../ui/NavIcons';
import { EASE_EMPHASIS } from '../ui/motion';
import { cn } from '../../lib/cn';
import { isLivePath, resolveNav } from '../../routes';
import {
  COTIZAR,
  NAV_ITEMS,
  SERVICE_NAV,
  SERVICES_MENU_COPY,
  type NavItem,
  type ServiceIcon,
} from '../../constants/navigation';

const SERVICE_ICONS: Record<ServiceIcon, React.FC<{ className?: string }>> = {
  sistemas: StackIcon,
  web: MonitorIcon,
  tienda: BagIcon,
};

/** Entrada de los paneles flotantes (menú de Servicios y menú mobile). */
const popMotion = {
  initial: { opacity: 0, y: -8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
  transition: { duration: 0.28, ease: EASE_EMPHASIS },
};

/** ¿Este ítem corresponde a la página en la que estamos? */
function isActive(item: NavItem, pathname: string): boolean {
  if (item.id === 'inicio') return pathname === '/';
  return isLivePath(item.path) && pathname.startsWith(item.path);
}

const linkBase =
  'inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-[15px] font-semibold no-underline ' +
  'text-content-muted transition-[color,background-color,box-shadow] duration-medium hover:bg-content/[0.08] hover:text-content';
const linkActive =
  'bg-surface-raised text-content shadow-[inset_0_0_0_1px_rgb(var(--accent)/0.6),0_0_18px_rgb(var(--accent)/0.25)] hover:bg-surface-raised';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <Link
    to="/"
    aria-label="IDEON, ir al inicio"
    className={cn(
      'font-black tracking-[-0.02em] text-content no-underline transition-[letter-spacing,text-shadow] duration-long ease-emphasis',
      'hover:tracking-[0.01em] hover:[text-shadow:0_0_24px_rgb(var(--accent)/0.6)]',
      className,
    )}
  >
    IDE<span className="text-accent">ON</span>
  </Link>
);

const ServicesMenu: React.FC<{ active: boolean }> = ({ active }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const { pathname } = useLocation();

  // Se cierra al navegar, con Escape y con un click afuera.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(linkBase, active && linkActive)}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        Servicios
        <ChevronDownIcon
          className={cn('h-4 w-4 transition-transform duration-long ease-emphasis', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            className="absolute left-1/2 top-full z-[60] w-[460px] pt-3.5"
            {...popMotion}
            // framer-motion escribe el `transform` en línea: el centrado va
            // como motion value (x) para que no lo pise una clase de Tailwind.
            style={{ x: '-50%', transformOrigin: 'top center' }}
          >
            <div className="grid gap-0.5 rounded-[22px] border border-line-strong bg-[var(--popover)] p-2.5 shadow-[0_30px_70px_-20px_rgb(0_0_0/0.6),0_0_40px_rgb(var(--accent)/0.12)]">
              {SERVICE_NAV.map((service) => {
                const Icon = SERVICE_ICONS[service.icon];
                const to = resolveNav(service);
                if (to === null) return null;
                return (
                  <AppLink
                    key={service.label}
                    to={to}
                    onClick={() => setOpen(false)}
                    className="group flex items-start gap-3.5 rounded-[14px] p-3.5 text-content no-underline transition-[background-color,transform] duration-medium ease-emphasis hover:translate-x-1 hover:bg-content/[0.07]"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-accent/35 bg-accent/15 text-accent transition-[background-color,box-shadow] duration-medium group-hover:bg-accent/30 group-hover:shadow-[0_0_20px_rgb(var(--accent)/0.4)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <strong className="block text-[15px]">{service.label}</strong>
                      <span className="text-[13px] text-content-muted">{service.description}</span>
                    </span>
                  </AppLink>
                );
              })}
              <div className="mt-1.5 flex items-center justify-between gap-3 rounded-[14px] border border-accent/25 bg-accent/[0.08] p-3.5">
                <span className="text-sm text-content-muted">{SERVICES_MENU_COPY.helper}</span>
                <AppLink
                  to={resolveNav(NAV_ITEMS[1]) ?? '/'}
                  onClick={() => setOpen(false)}
                  className="link-underline inline-flex items-center gap-1.5 text-sm font-bold text-accent-text no-underline hover:text-content"
                >
                  {SERVICES_MENU_COPY.helperLink} <span aria-hidden="true">→</span>
                </AppLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Los links cierran el menú al tocarlos: si el destino es un ancla de la misma
// página (/#planes estando en /), el pathname no cambia y no alcanza con eso.
const MobileMenu: React.FC<{ open: boolean; id: string; onNavigate: () => void }> = ({ open, id, onNavigate }) => {
  const mobileLink =
    'flex min-h-[52px] items-center rounded-[14px] px-4 text-[17px] font-semibold text-content no-underline transition-colors duration-medium hover:bg-content/[0.07]';
  const subLink = cn(mobileLink, 'min-h-11 pl-8 text-[15px] text-content-muted');

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id={id}
          aria-label="Menú"
          className="absolute inset-x-3 top-full z-[60] mt-2 flex max-h-[calc(100dvh-var(--nav-h)-1.5rem)] flex-col gap-0.5 overflow-y-auto rounded-[22px] border border-line-strong bg-[var(--popover)] p-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] xl:hidden"
          {...popMotion}
        >
          {NAV_ITEMS.map((item) => {
            const to = resolveNav(item);
            if (to === null) return null;
            return (
              <React.Fragment key={item.id}>
                <AppLink to={to} onClick={onNavigate} className={mobileLink}>
                  {item.id === 'servicios' ? SERVICES_MENU_COPY.mobileOverview : item.label}
                </AppLink>
                {item.id === 'servicios' &&
                  SERVICE_NAV.map((service) => {
                    const serviceTo = resolveNav(service);
                    return serviceTo === null ? null : (
                      <AppLink key={service.label} to={serviceTo} onClick={onNavigate} className={subLink}>
                        {service.label}
                      </AppLink>
                    );
                  })}
              </React.Fragment>
            );
          })}
          <Button to={resolveNav(COTIZAR) ?? '/'} onClick={onNavigate} className="mt-2 w-full">
            {COTIZAR.label}
          </Button>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileId = useId();

  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* El vidrio del header va en una capa propia y no en el <header>, para
          que los menús desplegables no queden anidados dentro de un
          backdrop-filter (los filtros anidados se dibujan distinto según el
          navegador). */}
      <div
        aria-hidden="true"
        className="themed-surface absolute inset-0 -z-10 border-b border-line bg-[var(--chrome)] backdrop-blur-xl"
      />
      <div className="container-site relative flex h-[var(--nav-h)] items-center justify-between gap-5">
        <Logo className="text-[28px]" />

        <nav aria-label="Principal" className="relative isolate hidden items-center gap-1 rounded-full p-1.5 xl:flex">
          {/* Vidrio en capa aparte, por lo mismo que el fondo del header. */}
          <span
            aria-hidden="true"
            className="glass absolute inset-0 -z-10 rounded-full shadow-[0_8px_32px_-8px_rgb(0_0_0/0.35)]"
          />
          {NAV_ITEMS.map((item) => {
            const to = resolveNav(item);
            if (to === null) return null;
            return item.id === 'servicios' ? (
              <ServicesMenu key={item.id} active={isActive(item, pathname)} />
            ) : (
              <AppLink
                key={item.id}
                to={to}
                aria-current={isActive(item, pathname) ? 'page' : undefined}
                className={cn(linkBase, isActive(item, pathname) && linkActive)}
              >
                {item.label}
              </AppLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button to={resolveNav(COTIZAR) ?? '/'} size="sm" className="hidden sm:inline-flex">
            {COTIZAR.label}
          </Button>
          <ThemeSwitcher />
          <button
            type="button"
            className="glass flex h-[46px] w-[46px] items-center justify-center rounded-[14px] text-content xl:hidden"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <CloseIcon className="h-[22px] w-[22px]" /> : <MenuIcon className="h-[22px] w-[22px]" />}
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} id={mobileId} onNavigate={() => setMobileOpen(false)} />
    </header>
  );
};

export default Header;
