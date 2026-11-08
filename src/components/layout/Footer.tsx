import React from 'react';
import { Link } from 'react-router';
import { FacebookIcon, InstagramIcon, WhatsAppIcon, LinkedInIcon } from '../ui/SocialIcons';
import { SOCIAL_PROFILES, type SocialId } from '../../constants/seo';
import { CONTACT_EMAIL, WHATSAPP_MESSAGES, whatsappUrl } from '../../constants/contact';
import { FOOTER_COPY, FOOTER_STUDIO, NAV_ITEMS, SERVICE_NAV } from '../../constants/navigation';
import { resolveNav } from '../../routes';

// Las URLs de las redes viven en constants/seo.ts porque el JSON-LD las
// publica como `sameAs`. Acá solo se resuelve qué ícono le toca a cada una.
const SOCIAL_ICONS: Record<SocialId, React.FC<{ className?: string }>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  linkedin: LinkedInIcon,
};

const footLink =
  'inline-block text-[15px] text-content-muted no-underline transition-[color,transform] duration-long ease-emphasis hover:translate-x-1 hover:text-content';
const colTitle = 'mb-1 text-[13px] font-bold uppercase tracking-[0.2em] text-content';

const Footer: React.FC = () => {
  const servicesOverview = NAV_ITEMS.find((item) => item.id === 'servicios');

  return (
    <footer className="themed-surface relative border-t border-line bg-surface-base">
      <div className="container-site flex flex-col gap-12 pb-8 pt-[72px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              aria-label="IDEON, ir al inicio"
              className="self-start text-[32px] font-black tracking-[-0.02em] text-content no-underline"
            >
              IDE<span className="text-accent">ON</span>
            </Link>
            <p className="max-w-[300px] text-[15px] leading-relaxed text-content-muted">{FOOTER_COPY.tagline}</p>
            <div className="flex gap-2.5">
              {SOCIAL_PROFILES.map(({ id, label, url }) => {
                const Icon = SOCIAL_ICONS[id];
                return (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} de IDEON`}
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-content transition-[transform,background-color,border-color,box-shadow] duration-long ease-emphasis hover:-translate-y-1 hover:-rotate-6 hover:border-accent/60 hover:bg-accent/20 hover:shadow-[0_0_22px_rgb(var(--accent)/0.4)]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Servicios" className="flex flex-col items-start gap-3">
            <p className={colTitle}>{FOOTER_COPY.servicesTitle}</p>
            {servicesOverview && (
              <Link to={resolveNav(servicesOverview)} className={footLink}>
                {FOOTER_COPY.servicesOverview}
              </Link>
            )}
            {SERVICE_NAV.map((service) => (
              <Link key={service.label} to={resolveNav(service)} className={footLink}>
                {service.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Estudio" className="flex flex-col items-start gap-3">
            <p className={colTitle}>{FOOTER_COPY.studioTitle}</p>
            {FOOTER_STUDIO.map((item) => (
              <Link key={item.label} to={resolveNav(item)} className={footLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-3">
            <p className={colTitle}>{FOOTER_COPY.contactTitle}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={footLink}>
              {CONTACT_EMAIL}
            </a>
            <a
              href={whatsappUrl(WHATSAPP_MESSAGES.floating)}
              target="_blank"
              rel="noopener noreferrer"
              className={footLink}
            >
              {FOOTER_COPY.phoneDisplay}
            </a>
            <p className="text-[15px] leading-relaxed text-content-muted">
              {FOOTER_COPY.location}
              <br />
              {FOOTER_COPY.hours}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-6">
          <p className="text-sm text-content-muted">
            {/* El año sale del reloj: si el HTML se generó el año anterior,
                el navegador lo corrige sin quejarse de la hidratación. */}
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {FOOTER_COPY.copyright}
          </p>
          <div className="flex flex-wrap gap-5">
            <Link to="/terminos-y-condiciones/" className={footLink.replace('text-[15px]', 'text-sm')}>
              {FOOTER_COPY.terms}
            </Link>
            <Link to="/politica-de-privacidad/" className={footLink.replace('text-[15px]', 'text-sm')}>
              {FOOTER_COPY.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
