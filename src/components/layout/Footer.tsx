import React from 'react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, LinkedInIcon } from '../ui/SocialIcons';
import { SOCIAL_PROFILES, type SocialId } from '../../constants/seo';

// Las URLs de las redes viven en constants/seo.ts porque el JSON-LD las
// publica como `sameAs`. Acá solo se resuelve qué ícono le toca a cada una.
const SOCIAL_ICONS: Record<SocialId, React.FC<{ className?: string }>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  linkedin: LinkedInIcon,
};

// FOOTER SECTION
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-brand-background border-t border-line pt-16 pb-8 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>

        {/* Floating Shapes */}
        <svg className="absolute top-10 right-10 w-20 h-20 text-accent/10 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
        <svg className="absolute bottom-20 left-10 w-16 h-16 text-blue-500/10 animate-bounce-slow" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left mb-12">
          <div>
            <h3 className="text-3xl font-extrabold text-content">
              IDE<span className="text-accent">ON</span>
            </h3>
            {/* data-nosnippet: Google venia armando el snippet de la home con
                ESTE parrafo en lugar de usar el <meta name="description">.
                El atributo le prohibe usar el texto que envuelve para el
                snippet. Google lo soporta en <span>, <div> y <section>, no en
                <p>, de ahi el span. */}
            <p className="mt-4 text-content-muted leading-relaxed">
              <span data-nosnippet>
                Ideon está conformado por especialistas en desarrollo, atención al cliente y marketing digital, unidos para crear webs y sistemas a medida — claros, cuidados y sin dependencias.
              </span>
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-content mb-4">Datos de contacto</h4>
            <ul className="space-y-3 text-content-muted">
              <li>Email: <a href="mailto:contacto@ideon.ar" className="text-accent hover:text-gray-900 dark:hover:text-white transition-colors">contacto@ideon.ar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-content mb-4">Legal</h4>
            <ul className="space-y-3 text-content-muted">
              <li><a href="/terminos-y-condiciones/" className="hover:text-accent transition-colors">Términos y condiciones</a></li>
              <li><a href="/politica-de-privacidad/" className="hover:text-accent transition-colors">Política de privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider text-content mb-4">Seguinos</h4>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {SOCIAL_PROFILES.map(({ id, label, url }) => {
                const Icon = SOCIAL_ICONS[id];
                return (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de IDEON`}
                    className="text-content-muted hover:text-accent transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-line pt-8 text-center relative">
          <p className="text-content-muted text-sm">
            &copy; {new Date().getFullYear()} IDEON. Todos los derechos reservados.
            <span className="text-transparent opacity-0 absolute pointer-events-none select-none -z-10 text-[1px]">© 2026 TERRANOVA ANGELO GABINO. Todos los derechos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;