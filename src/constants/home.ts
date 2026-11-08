// Copy del Inicio (rediseño de Celeste, etapa C). Si un cambio es solo de
// texto, se hace acá y no en los componentes.

export const HOME_META = {
  title: 'IDEON | Desarrollo web y software a medida.',
  description:
    'Diseñamos y desarrollamos páginas web, CRM, tiendas online y plataformas a medida para hacer crecer tu negocio. Conocé nuestros servicios.',
} as const;

export const HERO = {
  // El H1 es el slogan de marca (el mismo del Schema en index.html). Va en
  // tres líneas: las dos primeras no se cortan en desktop y la tercera lleva
  // el degradado.
  titleLines: ['Impulsá tu negocio', 'con tecnología a medida'],
  titleHighlight: 'Tu idea, nuestro desarrollo.',
  primaryCta: 'Cotizá tu proyecto',
  secondaryCta: 'Ver proyectos',
} as const;

// Divisor: la palabra que rota. La lista completa va en el aria-label (los
// lectores de pantalla no ven la animación).
export const ROTATOR = {
  label: 'Páginas web, tiendas online, sistemas de gestión, oficina virtual, campus virtuales, CRM/ERP, sistemas de turnos y más.',
  words: [
    'Páginas web',
    'Tiendas online',
    'Sistemas de gestión',
    'Oficina virtual',
    'Campus virtuales',
    'CRM/ERP',
    'Sistemas de turnos',
    'Y más...',
  ],
} as const;

export const PROCESS = {
  titleStart: 'De la idea al sistema completo,',
  titleHighlight: 'en 4 pasos.',
  faqLink: 'Preguntas frecuentes',
  steps: [
    { title: 'Conversación', description: 'Nos contás sobre tu negocio y lo que necesitás en una videollamada.' },
    { title: 'Cotización', description: 'Te mandamos una propuesta con el alcance, los plazos y el precio de tu proyecto.' },
    { title: 'Diseño y desarrollo', description: 'Ves avances y das feedback en cada etapa. Nada se publica sin tu OK.' },
    { title: 'Lanzamiento', description: 'Publicamos en tu dominio y te pasamos todos los accesos a tu nombre.' },
  ],
} as const;

export type AdvantageIcon = 'propiedad' | 'cotizacion' | 'permanencia' | 'pauta';

export const ADVANTAGES = {
  // "Nos caracteriza la [transparencia] y la [claridad]."
  title: ['Nos caracteriza la ', 'transparencia', ' y la ', 'claridad', '.'],
  items: [
    {
      icon: 'propiedad',
      title: 'Propiedad total',
      description:
        'Dominio y accesos quedan a tu nombre, y podés solicitar el código completo para llevarte el desarrollo también.',
    },
    {
      icon: 'cotizacion',
      title: 'Cotización a medida',
      description:
        'Todo tu proyecto se cotiza en base a tus necesidades, para que se amolde a tu operativa y no al revés.',
    },
    {
      icon: 'permanencia',
      title: 'Sin permanencia',
      description:
        'El mantenimiento es opcional: podés contratar solo el desarrollo o sumar el servicio de mantenimiento.',
    },
    {
      icon: 'pauta',
      title: 'Lista para pautar',
      description:
        'Las herramientas de marketing como Pixel o GA4 las incluimos para que vos o tu agencia puedan medir sus inversiones.',
    },
  ] satisfies readonly { icon: AdvantageIcon; title: string; description: string }[],
} as const;

export const SERVICES_PROMO = {
  title: 'Un aliado tecnológico para digitalizar todo lo que tu negocio necesita.',
  subtitle: 'Conocé nuestros planes y servicios.',
  cta: 'Ver planes y servicios',
  // Mientras /servicios/ no esté publicada, el botón lleva a WhatsApp.
  whatsappMessage: 'Hola IDEON, vengo de la web y quiero conocer sus planes y servicios.',
} as const;

export interface FeaturedCase {
  name: string;
  tagline: string;
  /** Página del caso (etapa E). */
  path: string;
  /** Sitio real del cliente: destino mientras la página del caso no exista. */
  url: string;
  /** Portada en /public/casos/portadas (sin sufijo de tamaño). */
  cover: string;
  coverAlt: string;
}

export interface UpcomingCase {
  name: string;
  tagline: string;
  monogram: string;
}

export const CASES = {
  title: 'Conocé nuestros trabajos destacados',
  cta: 'Ver proyectos',
  upcomingBadge: 'Próximamente',
  featured: [
    {
      name: 'Home',
      tagline: 'Campus de coaching · Sistema a medida',
      path: '/casos/home/',
      url: 'https://siendohome.com',
      cover: '/casos/portadas/home',
      coverAlt: 'Web institucional de Home, escuela de coaching',
    },
    {
      name: 'Under Club',
      tagline: 'Club de eventos · Sistema a medida',
      path: '/casos/under-club/',
      url: 'https://underclub.com.ar',
      cover: '/casos/portadas/under-club',
      coverAlt: 'Sitio web de Under Club',
    },
    {
      name: 'Corralcoop',
      tagline: 'Cooperativa de agua · Portal de autogestión',
      path: '/casos/corralcoop/',
      url: 'https://corralcoop.com',
      cover: '/casos/portadas/corralcoop',
      coverAlt: 'Portal de autogestión de Corralcoop',
    },
  ] satisfies readonly FeaturedCase[],
  upcoming: [
    { name: 'AM Suministros', tagline: 'Ferretería industrial', monogram: 'AM' },
    { name: 'Borea', tagline: 'Tienda de carteras', monogram: 'B' },
  ] satisfies readonly UpcomingCase[],
} as const;

export const FINAL_CTA = {
  title: '¿Tenés una idea? Cotizala en dos minutos.',
  subtitle: 'Respondé unas preguntas y te enviamos una propuesta clara, sin compromiso.',
  primary: 'Empezar cotización',
  whatsapp: 'Prefiero WhatsApp',
  whatsappMessage: 'Hola IDEON, vengo de la página web y quiero contarles mi idea',
} as const;
