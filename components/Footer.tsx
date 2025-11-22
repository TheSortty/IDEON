import React from 'react';

// FOOTER SECTION
const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-brand-background border-t-2 border-gray-200 dark:border-brand-surface">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
             <h3 className="text-3xl font-extrabold text-[#111] dark:text-brand-text-primary">
              IDE<span className="text-brand-primary">ON</span>
            </h3>
            <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">De la idea a la acción.</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-gray-700 dark:text-brand-text-primary">Datos de contacto</h4>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-brand-text-secondary">
              <li>WhatsApp: <a href="https://wa.me/5492616915325" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">+54 9 261 691-5325</a></li>
              <li>Email: <a href="mailto:contacto@ideon.ar" className="hover:text-brand-primary transition-colors">contacto@ideon.ar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-gray-700 dark:text-brand-text-primary">Nota legal</h4>
            <p className="mt-4 text-sm text-gray-600 dark:text-brand-text-secondary">
              Precios válidos por 5 días hábiles. Modalidad de pago 50/50. Sin mantenimiento mensual incluido.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 dark:border-brand-surface pt-8 text-center">
          <p className="text-gray-600 dark:text-brand-text-secondary">&copy; {new Date().getFullYear()} IDEON. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;