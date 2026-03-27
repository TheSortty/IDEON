import React from 'react';

// FOOTER SECTION
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-brand-background border-t border-gray-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        {/* Floating Shapes */}
        <svg className="absolute top-10 right-10 w-20 h-20 text-brand-primary/10 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
        <svg className="absolute bottom-20 left-10 w-16 h-16 text-blue-500/10 animate-bounce-slow" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-12">
          <div>
            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              IDE<span className="text-brand-primary">ON</span>
            </h3>
            <p className="mt-4 text-gray-600 dark:text-brand-text-secondary leading-relaxed">
              IDEON está conformado por desarrolladores y especialistas en Marketing, unidos para crear webs en tiempo récord, claras y eficientes.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Datos de contacto</h4>
            <ul className="space-y-3 text-gray-600 dark:text-brand-text-secondary">
              <li>Email: <a href="mailto:contacto@ideon.ar" className="text-brand-primary hover:text-gray-900 dark:hover:text-white transition-colors">contacto@ideon.ar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Nota legal</h4>
            <p className="text-sm text-gray-600 dark:text-brand-text-secondary leading-relaxed">
              Precios válidos por 5 días hábiles. Modalidad de pago 50/50. Sin mantenimiento mensual incluido. No incluye hosting o adquisición de dominio.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-white/10 pt-8 text-center">
          <p className="text-gray-500 dark:text-brand-text-secondary text-sm">&copy; {new Date().getFullYear()} IDEON. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;