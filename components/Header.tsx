import React, { useState } from 'react';
import Button from './ui/Button';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = ['Planes', 'Proceso', 'FAQ', 'Contacto'];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-50/80 dark:bg-[#03031f]/80 backdrop-blur-xl border-b border-slate-900/10 dark:border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#inicio" onClick={(e) => handleNavClick(e, 'inicio')} className="text-3xl font-extrabold text-slate-900 dark:text-white">
              IDE<span className="text-[#b900de]">ON</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <nav className="flex items-baseline space-x-6">
                {navLinks.map((link) => {
                  const targetId = link.toLowerCase();
                  return (
                    <a key={link} href={`#${targetId}`} onClick={(e) => handleNavClick(e, targetId)} className="text-slate-600 dark:text-slate-300 hover:text-[#b900de] font-medium transition-colors">
                      {link}
                    </a>
                  );
                })}
              </nav>
              <Button onClick={(e) => handleNavClick(e, 'planes')}>Lanzar mi idea</Button>
              <ThemeSwitcher />
            </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#b900de]"
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
              const targetId = link.toLowerCase();
              return (
                <a key={link} href={`#${targetId}`} onClick={(e) => handleNavClick(e, targetId)} className="text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#b900de]/50 block px-3 py-2 rounded-md text-base font-medium transition-colors">
                  {link}
                </a>
              );
            })}
            <div className="pt-4">
               <Button className="w-full" onClick={(e) => { handleNavClick(e, 'planes'); setIsMenuOpen(false); }}>Lanzar mi idea</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;