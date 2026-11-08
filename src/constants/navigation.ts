// Navegación del sitio: header, menú de Servicios, menú mobile y footer.
//
// Cada destino tiene su ruta definitiva (`path`) y una alternativa
// (`fallback`) que apunta a la sección equivalente de la home actual. El
// rediseño se publica por etapas: mientras una página nueva no exista en
// src/routes.tsx, el link usa la alternativa en vez de llevar a un 404. Cuando
// la página se suma a routes.tsx, el link pasa solo a la ruta nueva.

export type NavId = 'inicio' | 'servicios' | 'casos' | 'nosotros' | 'preguntas' | 'contacto';

export interface NavTarget {
  path: string;
  /** Destino mientras `path` no esté publicada. */
  fallback: string;
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
  { id: 'servicios', label: 'Servicios', path: '/servicios/', fallback: '/#planes' },
  { id: 'casos', label: 'Casos', path: '/casos/', fallback: '/#casos' },
  { id: 'nosotros', label: 'Nosotros', path: '/nosotros/', fallback: '/#equipo' },
  { id: 'preguntas', label: 'Preguntas', path: '/preguntas/', fallback: '/#faq' },
  { id: 'contacto', label: 'Contacto', path: '/contacto/', fallback: '/#contacto' },
];

export const SERVICE_NAV: readonly ServiceNavItem[] = [
  {
    label: 'Sistemas a medida',
    description: 'CRM/ERP, sistemas de turnos, oficina virtual, campus virtual y otros',
    icon: 'sistemas',
    path: '/servicios/sistemas-a-medida/',
    fallback: '/#planes',
  },
  {
    label: 'Páginas web',
    description: 'Landings e institucionales, con medición y SEO',
    icon: 'web',
    path: '/servicios/paginas-web/',
    fallback: '/#planes',
  },
  {
    label: 'Tiendas online',
    description: 'Vendé 24/7 sin comisiones de plataforma',
    icon: 'tienda',
    path: '/servicios/tiendas-online/',
    fallback: '/#planes',
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
  fallback: '/#planes',
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
  { label: 'Nosotros', path: '/nosotros/', fallback: '/#equipo' },
  { label: 'Preguntas frecuentes', path: '/preguntas/', fallback: '/#faq' },
  COTIZAR,
];
