// Navegación del sitio: header, menú de Servicios, menú mobile y footer.
//
// Cada destino tiene su ruta definitiva (`path`) y una alternativa
// (`fallback`) para mientras esa página no exista: una sección del Inicio, un
// link externo (WhatsApp) o `null`, que oculta el link. El rediseño se publica
// por etapas y así ninguna etapa deja links a un 404. Cuando la página se suma
// a src/routes.tsx, el link pasa solo a la ruta nueva.

export type NavId = 'inicio' | 'servicios' | 'casos' | 'nosotros' | 'preguntas' | 'contacto';

import { WHATSAPP_MESSAGES, whatsappUrl } from './contact';

export interface NavTarget {
  path: string;
  /** Destino mientras `path` no esté publicada; `null` oculta el link. */
  fallback: string | null;
}

export interface NavItem extends NavTarget {
  id: NavId;
  label: string;
}

export type ServiceIcon = 'sistemas' | 'web' | 'tienda';

export interface ServiceNavItem extends NavTarget {
  label: string;
  description: string;
  icon: ServiceIcon;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'inicio', label: 'Inicio', path: '/', fallback: '/' },
  { id: 'servicios', label: 'Servicios', path: '/servicios/', fallback: '/#servicios' },
  { id: 'casos', label: 'Casos', path: '/casos/', fallback: '/#casos' },
  { id: 'nosotros', label: 'Nosotros', path: '/nosotros/', fallback: null },
  { id: 'preguntas', label: 'Preguntas', path: '/preguntas/', fallback: null },
  { id: 'contacto', label: 'Contacto', path: '/contacto/', fallback: null },
];

export const SERVICE_NAV: readonly ServiceNavItem[] = [
  {
    label: 'Sistemas a medida',
    description: 'CRM/ERP, sistemas de turnos, oficina virtual, campus virtual y otros',
    icon: 'sistemas',
    path: '/servicios/sistemas-a-medida/',
    fallback: '/#servicios',
  },
  {
    label: 'Páginas web',
    description: 'Landings e institucionales, con medición y SEO',
    icon: 'web',
    path: '/servicios/paginas-web/',
    fallback: '/#servicios',
  },
  {
    label: 'Tiendas online',
    description: 'Vendé 24/7 sin comisiones de plataforma',
    icon: 'tienda',
    path: '/servicios/tiendas-online/',
    fallback: '/#servicios',
  },
];

export const SERVICES_MENU_COPY = {
  helper: '¿No sabés cuál elegir?',
  helperLink: 'Ver los planes',
  mobileOverview: 'Servicios y planes',
} as const;

export const COTIZAR: NavTarget & { label: string } = {
  label: 'Cotizar proyecto',
  path: '/cotizar/',
  fallback: whatsappUrl(WHATSAPP_MESSAGES.hero),
};

export const FOOTER_COPY = {
  tagline:
    'Estudio de desarrollo web y software a medida en Mendoza. Desde tu primera web hasta tu sistema. Tu idea, nuestro desarrollo.',
  servicesTitle: 'Servicios',
  servicesOverview: 'Planes y servicios',
  studioTitle: 'Estudio',
  contactTitle: 'Contacto',
  phoneDisplay: '+54 9 261 773-6266',
  location: 'Ciudad de Mendoza, Argentina',
  hours: 'Lunes a sábado, 9 a 22:30 h',
  copyright: 'IDEON · Desarrollo web y software a medida',
  terms: 'Términos y condiciones',
  privacy: 'Política de privacidad',
} as const;

export const FOOTER_STUDIO: readonly (NavTarget & { label: string })[] = [
  { label: 'Casos', path: '/casos/', fallback: '/#casos' },
  { label: 'Nosotros', path: '/nosotros/', fallback: null },
  { label: 'Preguntas frecuentes', path: '/preguntas/', fallback: null },
  COTIZAR,
];
