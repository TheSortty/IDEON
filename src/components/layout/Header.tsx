import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { UsersIcon, BriefcaseIcon, LayersIcon, HelpCircleIcon, MailIcon } from '../ui/NavIcons';

const navLinks = [
  { label: 'Equipo', id: 'equipo', icon: UsersIcon },
  { label: 'Clientes', id: 'casos', icon: BriefcaseIcon },
  { label: 'Proyectos', id: 'planes', icon: LayersIcon },
  { label: 'FAQ', id: 'faq', icon: HelpCircleIcon },
  { label: 'Contacto', id: 'contacto', icon: MailIcon },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Resalta en el nav la sección que está actualmente en pantalla mientras
  // se scrollea, para que la píldora activa "siga" al usuario y no dependa
  // sólo del click.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setActiveId(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f8f8f8]/80 dark:bg-brand-background/80 backdrop-blur-xl border-b border-gray-900/10 dark:border-white/10 shadow-lg">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')} className="text-3xl font-extrabold text-[#111] dark:text-brand-text-primary">
              IDE<span className="text-brand-primary">ON</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <nav className="nav-glass-pill flex items-center gap-1 p-1.5">
                {navLinks.map((link) => {
                  const isActive = activeId === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      className="relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] dark:bg-brand-primary/15 dark:shadow-[0_0_16px_rgba(212,0,255,0.35)]"
                          transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                        />
                      )}
                      <link.icon
                        className={`relative z-10 w-4 h-4 transition-colors ${
                          isActive
                            ? 'text-brand-primary'
                            : 'text-gray-500 dark:text-brand-text-secondary'
                        }`}
                      />
                      <span
                        className={`relative z-10 transition-colors ${
                          isActive
                            ? 'text-[#111] dark:text-brand-text-primary'
                            : 'text-gray-600 dark:text-brand-text-secondary'
                        }`}
                      >
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </nav>
              <Button onClick={(e) => handleNavClick(e, 'planes')}>Quiero mi cotización</Button>
              <ThemeSwitcher />
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-[#111] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center justify-center gap-2 hover:text-[#111] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-brand-surface block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'text-brand-primary'
                      : 'text-gray-600 dark:text-brand-text-primary'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              );
            })}
            <div className="pt-4">
              <Button className="w-full" onClick={(e) => { handleNavClick(e, 'planes'); setIsMenuOpen(false); }}>Quiero mi cotización</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
