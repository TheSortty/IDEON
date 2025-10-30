import React from 'react';

// FOOTER SECTION
const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-[#03031f] border-t-2 border-slate-200 dark:border-[#42006b]">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
             <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              IDE<span className="text-[#b900de]">ON</span>
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">De la idea a la acción.</p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Datos de contacto</h4>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              <li>WhatsApp: <a href="https://wa.me/5492616915325" target="_blank" rel="noopener noreferrer" className="hover:text-[#b900de] transition-colors">+54 9 261 691-5325</a></li>
              <li>Email: <a href="mailto:gabino44terranova@gmail.com" className="hover:text-[#b900de] transition-colors">gabino44terranova@gmail.com</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Nota legal</h4>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Precios válidos por 5 días hábiles. Modalidad de pago 50/50. Sin mantenimiento mensual incluido.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8 text-center">
          <p className="text-slate-600 dark:text-slate-400">&copy; {new Date().getFullYear()} IDEON. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;