// Copy de Servicios y de las tres páginas de servicio (etapa D del rediseño).
// Si un cambio es solo de texto, se hace acá y no en los componentes.

import type { IconName } from '../components/ui/Icon';

export interface Faq {
  question: string;
  answer: string;
}

export interface IconCard {
  icon: IconName;
  title: string;
  description: string;
}

export interface Feature {
  icon: IconName;
  label: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Nombre corto para la miga de pan y el Schema. */
  name: string;
}

// ------------------------------------------------------------------ /servicios/

export const SERVICIOS_META: PageMeta = {
  path: '/servicios/',
  name: 'Servicios',
  title: 'Planes y servicios de desarrollo web y software – IDEON',
  description:
    'Planes Starter, Pro y Enterprise para páginas web, tiendas online y sistemas a medida. Cotización sin cargo y todo a tu nombre.',
};

export interface Plan {
  name: 'Starter' | 'Pro' | 'Enterprise';
  icon: IconName;
  tag: string;
  description: string;
  includesFrom?: string;
  features: string[];
  idealFor: string;
  featured?: boolean;
}

export const SERVICIOS = {
  title: ['Elegí cómo querés ', 'hacer crecer', ' tu negocio'],
  pageNav: [
    { id: 'planes', label: 'Planes' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'cotizacion', label: 'Cómo cotizamos' },
  ],
  featuredBadge: '+ Elegido',
  planCta: 'Quiero mi cotización',
  plans: [
    {
      name: 'Starter',
      icon: 'arrowUp',
      tag: 'Presencia',
      description:
        'Para negocios que están arrancando y necesitan una presencia web profesional, clara y lista para recibir clientes.',
      features: [
        'Landing optimizada para conversión',
        'Diseño a medida de tu marca, incluido',
        'Formulario de contacto funcional',
        'Botón directo a WhatsApp',
        'Optimización para celular, tablet y desktop',
        'Publicación en tu propio dominio, con SSL',
        'Todo queda a tu nombre desde el día uno',
      ],
      idealFor:
        'Ideal para: negocios que todavía no tienen web propia y necesitan un lugar serio adonde mandar a sus clientes.',
    },
    {
      name: 'Pro',
      icon: 'trendUp',
      tag: 'Más alcance',
      featured: true,
      description:
        'Para proyectos con más de una sección o funcionalidad, que necesitan acompañamiento durante el desarrollo.',
      includesFrom: 'Incluye todo lo del plan Starter, más:',
      features: [
        'Varias secciones o funcionalidades',
        'Acompañamiento durante todo el desarrollo',
        'Rondas de ajuste antes de publicar',
        'Más cercanía en el proceso, con avances a la vista',
      ],
      idealFor:
        'Ideal para: proyectos que ya tienen algo de camino recorrido y necesitan más que una landing.',
    },
    {
      name: 'Enterprise',
      icon: 'stack',
      tag: 'A medida',
      description: 'Para sistemas a medida, plataformas o proyectos con lógica propia de negocio.',
      includesFrom: 'Incluye todo lo del plan Pro, más:',
      features: [
        'Sistemas y plataformas con lógica propia de negocio',
        'Prioridad máxima sobre el resto de los proyectos',
        'Comunicación directa durante todo el desarrollo',
        'Revisiones en vivo con vos',
      ],
      idealFor: 'Ideal para: negocios con reglas propias que ninguna plantilla genérica resuelve.',
    },
  ] satisfies Plan[],
  trust: [
    { icon: 'gift', title: 'Cotización sin cargo', description: 'Respondemos con una propuesta cerrada' },
    { icon: 'target', title: 'Cotización a medida', description: 'Según lo que tu proyecto necesita' },
    { icon: 'key', title: 'Todo a tu nombre', description: 'Código, dominio y accesos' },
    { icon: 'unlock', title: 'Sin permanencia', description: 'Mantenimiento opcional' },
  ] satisfies IconCard[],
  linesTitle: 'Conocé cada servicio en detalle',
  linesCta: 'Ver servicio',
  quoteTitle: 'Cotizamos el proyecto en base a tus necesidades',
  quoteCta: 'Empezar cotización',
  quoteSteps: [
    { title: 'Nos contás tu proyecto', description: 'Con el cotizador online, por WhatsApp o en una videollamada.' },
    { title: 'Definimos el alcance', description: 'Qué incluye, qué no, y en cuántas etapas se entrega.' },
    { title: 'Recibís tu propuesta', description: 'Alcance, plazos y precio, por escrito.' },
  ] satisfies Step[],
  ctaTitle: '¿No sabés qué tipo de proyecto necesitás?',
  ctaText: 'El cotizador te guía en cuatro pasos y te recomienda por dónde empezar.',
  // Mientras no exista /cotizar/, el botón abre el formulario de contacto.
  ctaButton: 'Usar el cotizador',
  ctaButtonFallback: 'Pedir asesoramiento',
} as const;

// Las tres líneas de servicio: tarjetas de /servicios/ y "Seguí explorando".
export type ServiceSlug = 'sistemas' | 'web' | 'tienda';

export interface ServiceLine {
  slug: ServiceSlug;
  path: string;
  icon: IconName;
  title: string;
  description: string;
  /** Bajada corta para "Seguí explorando". */
  short: string;
}

export const SERVICE_LINES: readonly ServiceLine[] = [
  {
    slug: 'sistemas',
    path: '/servicios/sistemas-a-medida/',
    icon: 'stack',
    title: 'Sistemas a medida',
    description: 'CRM/ERP, sistemas de turnos, oficina virtual, campus virtual y otros.',
    short: 'CRM/ERP, turnos, campus y más',
  },
  {
    slug: 'web',
    path: '/servicios/paginas-web/',
    icon: 'monitor',
    title: 'Páginas web',
    description: 'Landings e institucionales, con medición y SEO.',
    short: 'Con medición y SEO',
  },
  {
    slug: 'tienda',
    path: '/servicios/tiendas-online/',
    icon: 'bag',
    title: 'Tiendas online',
    description: 'Catálogo, carrito y pagos con tu marca.',
    short: 'Vendé las 24 horas',
  },
];

export const EXPLORE = {
  title: 'Seguí explorando',
  projects: { title: 'Nuestros proyectos', short: 'Trabajos destacados' },
  compareLink: 'Comparar tipos de plan',
} as const;

// ------------------------------------------------------- /servicios/paginas-web/

export const WEB_META: PageMeta = {
  path: '/servicios/paginas-web/',
  name: 'Páginas web',
  title: 'Diseño de páginas web a medida en Mendoza – IDEON',
  description:
    'Landings, webs institucionales y sitios con funcionalidades. Diseño a medida, SEO, medición con GA4 y Pixel, y todo a tu nombre.',
};

export const WEB = {
  title: ['Una web profesional para que tu negocio ', 'se presente solo'],
  primaryCta: 'Cotizar mi página',
  whatsappCta: 'Consultar por WhatsApp',
  whatsappMessage: 'Hola IDEON, vengo de la página web y quiero una página',
  pageNav: [
    { id: 'por-que', label: 'Por qué una web' },
    { id: 'tipos', label: 'Tipos de web' },
    { id: 'incluye', label: 'Qué incluye' },
    { id: 'medicion-y-seo', label: 'Medición y SEO' },
    { id: 'preguntas-web', label: 'Preguntas' },
  ],
  whyTitle: 'Una página web es tu carta de presentación',
  why: [
    { icon: 'search', title: 'Te encuentran en Google', description: 'Cuando te buscan, aparece tu negocio: qué hacen, dónde se ubican y cómo contactarlos.' },
    { icon: 'shield', title: 'Transmitís confianza', description: 'Dominio propio y un diseño cuidado que muestran tu trayectoria y profesionalismo.' },
    { icon: 'lock', title: 'Es tuya, no del algoritmo', description: 'Si cambia una red social, tu número de teléfono o perdés una cuenta, tu web sigue ahí.' },
  ] satisfies IconCard[],
  typesTitle: '¿Qué tipo de web necesitás?',
  types: [
    {
      tab: 'Landing page',
      plan: 'Starter',
      title: 'Landing page',
      description:
        'Una sola página enfocada en un objetivo: que te contacten o que compren. Ideal para un servicio, un producto o una campaña.',
    },
    {
      tab: 'Web institucional',
      plan: 'Starter o Pro',
      title: 'Web institucional',
      description: 'Varias secciones con menú: quiénes son, qué hacen, dónde están y cómo contactarlos.',
    },
    {
      tab: 'Sitio con funcionalidades',
      plan: 'Pro',
      title: 'Sitio con funcionalidades',
      description:
        'Además de las secciones, suma herramientas: reservas, catálogo o blog, con un panel para editarlo vos.',
    },
  ],
  includesTitle: 'Todo lo necesario para salir a recibir consultas',
  includes: [
    { icon: 'devices', label: 'Diseño a medida y responsive' },
    { icon: 'chat', label: 'Botón directo a WhatsApp' },
    { icon: 'lock', label: 'Dominio propio con SSL' },
    { icon: 'search', label: 'SEO para aparecer en Google' },
    { icon: 'form', label: 'Formulario de contacto' },
    { icon: 'barChart', label: 'Medición con GA4 y Pixel de Meta' },
    { icon: 'zap', label: 'Carga rápida en celular' },
    { icon: 'key', label: 'Código y accesos a tu nombre' },
  ] satisfies Feature[],
  measureTitle: 'Pautar sin medir es invertir a ciegas. Con una página web podés:',
  measure: [
    { icon: 'barChart', title: 'Saber qué atrae más a tu público', description: 'Medir en qué secciones se posicionan más tus clientes.' },
    { icon: 'refresh', title: 'Hacer remarketing', description: 'Públicos listos con quienes visitaron tu web.' },
    { icon: 'search', title: 'Aparecer en Google', description: 'Visitas sin pagar por cada clic.' },
  ] satisfies IconCard[],
  ctaTitle: 'Tu web puede estar recibiendo consultas muy pronto',
  ctaSecondary: 'Necesito vender online',
  faqTitle: 'Preguntas sobre páginas web',
  faqs: [
    { question: '¿Puedo editar la web yo mismo?', answer: 'En el plan Pro incluimos un panel para que cambies textos, fotos y productos sin depender de nosotros.' },
    { question: '¿El dominio y el hosting están incluidos?', answer: 'Los gestionamos por vos y quedan registrados a tu nombre. El detalle de costos va en la cotización.' },
    { question: '¿Ya tengo web, la pueden rehacer?', answer: 'Sí. Revisamos lo que tenés, mantenemos lo que funciona y migramos tu dominio sin perder posicionamiento.' },
    { question: '¿La medición y el SEO vienen incluidos?', answer: 'Depende del plan que elijas, y solo si lo necesitás.' },
    { question: 'Ya tengo web, ¿me pueden configurar la medición y el SEO?', answer: 'Consultanos: revisamos tu web actual y te decimos qué se puede configurar.' },
    { question: '¿Ustedes hacen los anuncios?', answer: 'No. Dejamos la web lista para pautar; las campañas las gestionás vos o la agencia que elijas, con toda la medición ya funcionando.' },
  ] satisfies Faq[],
} as const;

// ----------------------------------------------------- /servicios/tiendas-online/

export const TIENDA_META: PageMeta = {
  path: '/servicios/tiendas-online/',
  name: 'Tiendas online',
  title: 'Tiendas online a medida, sin comisiones por venta – IDEON',
  description:
    'Tu tienda online con catálogo, carrito, pagos y panel de stock. Diseño propio, sin comisión por venta y todo a tu nombre.',
};

export const TIENDA = {
  title: ['Tu tienda online, catálogo y ', 'todo en un mismo lugar'],
  primaryCta: 'Cotizar mi tienda',
  whatsappCta: 'Consultar por WhatsApp',
  whatsappMessage: 'Hola IDEON, vengo de la página web y quiero una tienda',
  mockBrand: ['tu', 'marca'],
  mockOrder: 'Nuevo pedido',
  pageNav: [
    { id: 'problema', label: 'El problema' },
    { id: 'incluye', label: 'Qué incluye' },
    { id: 'preguntas', label: 'Preguntas' },
  ],
  problemTitle: '¿Te pasa esto?',
  problems: [
    { title: 'Respondés lo mismo todo el día', description: 'Precio, talles, stock, envío… mensaje por mensaje.' },
    { title: 'Perdés ventas fuera de horario', description: 'Si no contestás rápido, compran en otro lado.' },
    { title: 'Las plataformas se llevan tu margen', description: 'Comisiones y mensualidades que crecen con vos.' },
  ],
  includesTitle: 'Una tienda completa, lista para vender',
  includes: [
    { icon: 'grid', label: 'Catálogo con categorías y buscador' },
    { icon: 'cart', label: 'Carrito y pagos online' },
    { icon: 'box', label: 'Panel de productos y stock' },
    { icon: 'bell', label: 'Avisos de pedido por mensaje o mail' },
    { icon: 'truck', label: 'Opciones de envío y retiro' },
    { icon: 'percent', label: 'Sin comisión por venta' },
    { icon: 'crosshair', label: 'Pixel de Meta para tus campañas' },
    { icon: 'key', label: 'Todo a tu nombre' },
  ] satisfies Feature[],
  ctaTitle: 'Empezá a vender las 24 horas',
  ctaText: 'Contanos qué vendés y te cotizamos tu tienda.',
  faqTitle: 'Preguntas sobre tiendas online',
  faqs: [
    { question: '¿Por qué no usar una plataforma ya hecha?', answer: 'Para algunos negocios es lo mejor. A medida conviene si querés diseño propio, sin comisiones por venta o funciones que la plataforma no tiene. En la cotización te decimos cuál te conviene.' },
    { question: '¿Qué medios de pago puedo aceptar?', answer: 'Depende del servicio que elijas: los medios de pago se definen en la cotización.' },
    { question: '¿Puedo cargar los productos yo?', answer: 'Sí. Te entregamos un panel para cargar productos, precios y stock, y te enseñamos a usarlo.' },
  ] satisfies Faq[],
} as const;

// -------------------------------------------------- /servicios/sistemas-a-medida/

export const SISTEMAS_META: PageMeta = {
  path: '/servicios/sistemas-a-medida/',
  name: 'Sistemas a medida',
  title: 'Sistemas y software a medida: CRM, ERP, turnos y campus – IDEON',
  description:
    'Desarrollamos CRM/ERP, sistemas de turnos, campus virtuales, oficinas virtuales y portales de clientes a medida, por etapas y a tu nombre.',
};

export const SISTEMAS = {
  title: ['Sistemas a medida para que tu negocio ', 'deje de vivir en planillas'],
  primaryCta: 'Cotizar mi sistema',
  caseCta: 'Ver un caso real',
  pageNav: [
    { id: 'que-construimos', label: 'Qué construimos' },
    { id: 'proceso', label: 'Cómo lo hacemos' },
    { id: 'plan', label: 'Preguntas' },
  ],
  buildTitle: 'Software a medida pensado para tu operación',
  build: [
    { icon: 'users', title: 'CRM/ERP a medida', description: 'Clientes, ventas y stock conectados.' },
    { icon: 'calendar', title: 'Sistema de turnos', description: 'Agenda online y recordatorios.' },
    { icon: 'graduation', title: 'Campus y e-learning', description: 'Programas, clases, alumnos y certificados.' },
    { icon: 'briefcase', title: 'Oficina virtual', description: 'Documentos y tareas del equipo.' },
    { icon: 'userCheck', title: 'Portal de clientes', description: 'Autoconsulta de datos y pagos.' },
    { icon: 'layout', title: 'Paneles de gestión', description: 'Roles, permisos y reportes.' },
    { icon: 'box', title: 'Stock e inventario', description: 'Productos y depósitos al día.' },
    { icon: 'dollar', title: 'Ventas y comisiones', description: 'Ventas y comisiones automáticas.' },
    { icon: 'receipt', title: 'Cobros y facturación', description: 'Cobranzas y comprobantes.' },
    { icon: 'plus', title: 'Y más...', description: 'Todas las secciones que tu negocio necesite.' },
  ] satisfies IconCard[],
  processTitle: 'Por etapas, para que veas avances desde la primera semana',
  process: [
    { title: 'Relevamiento', description: 'Entendemos tus procesos.' },
    { title: 'Prototipo navegable', description: 'Ves las pantallas antes de escribir una línea de código.' },
    { title: 'Desarrollo por entregas', description: 'Módulos funcionando que tu equipo prueba y valida.' },
    { title: 'Lanzamiento y capacitación', description: 'Capacitamos a tu equipo y todo queda a tu nombre.' },
  ] satisfies Step[],
  casesText: 'Conocé los sistemas a medida que ya construimos',
  casesCta: 'Ver casos',
  ctaTitle: 'Contanos cómo trabaja tu negocio hoy',
  ctaText: 'En una charla de 30 minutos te decimos por dónde empezar.',
  ctaWhatsapp: 'Agendar una charla',
  ctaWhatsappMessage: 'Hola IDEON, vengo de la página web y quiero agendar una charla',
  faqTitle: 'Preguntas sobre sistemas',
  faqs: [
    { question: '¿Cuánto tarda un sistema a medida?', answer: 'Depende del alcance. En la propuesta te damos un plazo por etapa, y la primera entrega usable llega antes del final.' },
    { question: '¿Qué pasa con mis datos?', answer: 'Son tuyos. El sistema y la base de datos quedan en cuentas a tu nombre.' },
    { question: '¿Se puede ampliar más adelante?', answer: 'Sí. Lo construimos para que crezca: podés sumar módulos con un plan de horas mensuales o por proyecto.' },
  ] satisfies Faq[],
} as const;
