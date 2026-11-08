// Copy de /casos/ y de cada caso (etapa E del rediseño). Si un cambio es solo
// de texto, se hace acá y no en los componentes.

import type { PageMeta } from './services';

/** Imagen de un caso: /casos/<carpeta>/<nombre>-sm.webp (760 px) y -lg.webp. */
export interface CaseImage {
  src: string;
  alt: string;
}

export interface CaseShot extends CaseImage {
  title: string;
  caption: string;
}

export interface CaseStudy {
  slug: 'home' | 'under-club' | 'corralcoop';
  meta: PageMeta;
  /** [texto, parte destacada] del H1. */
  title: readonly [string, string];
  lead: string;
  url: string;
  hero: CaseImage;
  problemTitle: string;
  problem: string;
  solutionTitle: string;
  solution: string[];
  galleryTitle: string;
  gallery: CaseShot[];
  whatsappName: string;
}

const img = (folder: string, name: string, alt: string): CaseImage => ({ src: `/casos/${folder}/${name}`, alt });

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    slug: 'home',
    meta: {
      path: '/casos/home/',
      name: 'Home',
      title: 'Caso Home: web y campus virtual para una escuela de coaching – IDEON',
      description:
        'Diseñamos la web de Home y un campus virtual a medida con programa, clases, certificación y panel de administración de alumnos.',
    },
    title: ['Home: una escuela de coaching con ', 'su propio campus online'],
    lead: 'Diseñamos el sitio web donde se presenta la organización y un campus virtual donde gestionan todo: programa, clases, certificados y alumnos.',
    url: 'https://siendohome.com',
    hero: img('home', 'web', 'Página principal de la web de Home'),
    problemTitle: 'Presentar la academia y dictar las clases con mil herramientas distintas',
    problem:
      'Toda la gestión vivía en planillas y documentos sueltos, lo que hacía difícil organizar la información y darle seguimiento a cada alumno.',
    solutionTitle: 'Web, campus y administración en una sola plataforma',
    solution: [
      'Web institucional con la propuesta y los coaches',
      'Campus con programa por módulos y clases',
      'Certificación para los egresados',
      'Panel de administración de alumnos y contenidos',
    ],
    galleryTitle: 'El producto, por dentro',
    gallery: [
      { ...img('home', 'campus-programa', 'Programa de formación dentro del campus'), title: 'Campus · Programa.', caption: 'Los módulos y el avance de cada alumno.' },
      { ...img('home', 'campus-clase', 'Vista de una clase dentro del campus'), title: 'Campus · Clase.', caption: 'Contenido y material en un solo lugar.' },
      { ...img('home', 'admin', 'Panel de administración del campus'), title: 'Administración.', caption: 'Alumnos, contenidos y accesos.' },
      { ...img('home', 'certificacion', 'Página de certificación de Home'), title: 'Certificación.', caption: 'La propuesta formativa explicada en la web.' },
      { ...img('home', 'coaches', 'Sección de coaches en la web de Home'), title: 'Coaches.', caption: 'El equipo docente, presentado con claridad.' },
      { ...img('home', 'web', 'Portada de la web de Home'), title: 'Web institucional.', caption: 'La puerta de entrada a la formación.' },
    ],
    whatsappName: 'Home',
  },
  {
    slug: 'under-club',
    meta: {
      path: '/casos/under-club/',
      name: 'Under Club',
      title: 'Caso Under Club: sistema de eventos y comisiones a medida – IDEON',
      description:
        'Sistema a medida para un club de música electrónica: portal de promotores, ventas por evento y cálculo automático de comisiones.',
    },
    title: ['Under Club: un sistema a medida para ', 'organizar eventos y comisiones'],
    lead: 'Sistema a medida para un club de música electrónica que necesitaba organizar sus eventos y las comisiones de su equipo de RRPP.',
    url: 'https://underclub.com.ar',
    hero: img('under-club', 'web', 'Sitio web de Under Club'),
    problemTitle: 'Muchos eventos y un equipo de RRPP grande',
    problem:
      'Llevar el control de cada fecha y de las ventas de cada promotor a mano hacía difícil calcular comisiones y saber cómo rendía cada evento.',
    solutionTitle: 'Eventos y comisiones en un solo sistema',
    solution: [
      'Portal para el equipo de promotores',
      'Registro de ventas por promotor y por evento',
      'Cálculo automático de comisiones',
      'Modo noche y día',
    ],
    galleryTitle: 'Under Club, en imágenes',
    gallery: [
      { ...img('under-club', 'web', 'Inicio del sitio de Under Club'), title: 'Sitio web.', caption: 'La identidad del club.' },
      { ...img('under-club', 'cultura', 'Sección de cultura de Under Club'), title: 'Cultura.', caption: 'Lo que representa el club.' },
      { ...img('under-club', 'novedades', 'Sección de novedades de Under Club'), title: 'Novedades.', caption: 'Historias y entrevistas del club.' },
    ],
    whatsappName: 'Under Club',
  },
  {
    slug: 'corralcoop',
    meta: {
      path: '/casos/corralcoop/',
      name: 'Corralcoop',
      title: 'Caso Corralcoop: portal de autogestión para una cooperativa de agua – IDEON',
      description:
        'Portal de autogestión y oficina virtual de la Cooperativa Corralcoop: consulta y pago de facturas, guías para socios y atención por WhatsApp.',
    },
    title: ['Corralcoop: autogestión y oficina virtual ', 'de una cooperativa de agua'],
    // Decisión 9 (08/11): sin "alta de servicio" (no está en el alcance);
    // el portal es además un puente a la atención personalizada por WhatsApp.
    lead: 'Hicimos el portal de autogestión y oficina virtual de la cooperativa: los socios consultan y pagan su factura, aprenden a leer su medidor y tienen un puente directo a la atención personalizada por WhatsApp, todo en un mismo lugar.',
    url: 'https://corralcoop.com',
    hero: img('corralcoop', 'inicio', 'Portada del portal de Corralcoop'),
    problemTitle: 'Consultas que se resolvían en la ventanilla',
    problem: 'Los socios tenían que acercarse o llamar para consultar su factura o entender su consumo.',
    solutionTitle: 'Un portal para que los socios resuelvan solos',
    solution: [
      'Consulta y pago de facturas online',
      'Guías para entender la factura y leer el medidor',
      'Puente directo a la atención personalizada por WhatsApp',
    ],
    galleryTitle: 'El portal, por dentro',
    gallery: [
      { ...img('corralcoop', 'inicio', 'Portada del portal de Corralcoop'), title: 'Inicio.', caption: 'El agua que une comunidades.' },
      { ...img('corralcoop', 'accesos', 'Accesos rápidos y guía de la factura'), title: 'Accesos rápidos.', caption: 'Factura, medidor y atención a un clic.' },
      { ...img('corralcoop', 'factura', 'Guía para entender la factura'), title: 'Conocé tu factura.', caption: 'Cada dato explicado paso a paso.' },
      { ...img('corralcoop', 'medidor', 'Guía para leer el medidor'), title: 'Tu medidor.', caption: 'Cómo leer el consumo correctamente.' },
    ],
    whatsappName: 'Corralcoop',
  },
];

export const CASE_COPY = {
  siteCta: 'Ir al sitio web',
  similarTitle: '¿Querés algo así para tu negocio?',
  similarCta: 'Cotizar algo similar',
  nextLabel: 'Siguiente caso',
  whatsappMessage: (name: string) => `Hola IDEON, vi el proyecto de ${name} y quiero algo similar`,
} as const;

// ------------------------------------------------------------------- /casos/

export const CASOS_META: PageMeta = {
  path: '/casos/',
  name: 'Casos',
  title: 'Proyectos y casos de éxito: webs y sistemas a medida – IDEON',
  description:
    'Conocé los proyectos de IDEON: campus virtuales, sistemas de gestión, portales de autogestión y páginas web para negocios de Argentina.',
};

export type ProjectCategory = 'sistemas' | 'web';

/**
 * Tema de color de cada cliente (clases de src/index.css). Es la única
 * excepción a la paleta de IDEON: en los casos, el protagonista es el
 * proyecto y se muestra con los colores de su marca.
 */
export type ClientTheme = 't-home' | 't-under' | 't-corral' | 't-am' | 't-borea' | 't-bb';

export interface Project {
  id: string;
  short: string;
  name: string;
  categories: ProjectCategory[];
  description: string;
  /** Página del caso (si tiene). */
  casePath?: string;
  /** Capturas: la primera grande, el resto chicas. Sin capturas = en desarrollo. */
  shots: CaseImage[];
  monogram: string;
  theme: ClientTheme;
}

export const CASOS = {
  title: ['Nuestros ', 'proyectos'],
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'sistemas', label: 'Sistemas a medida' },
    { id: 'web', label: 'Páginas web' },
  ] as const,
  caseCta: 'Ver caso completo',
  similarCta: 'Quiero algo similar',
  upcoming: 'Próximo lanzamiento',
  prev: 'Proyecto anterior',
  next: 'Proyecto siguiente',
  projects: [
    {
      id: 'home',
      short: 'Home',
      name: 'Home — Campus de coaching',
      categories: ['sistemas', 'web'],
      description:
        'Una escuela de coaching que necesitaba vender su formación y dictarla online. Hicimos la web, el campus con clases y certificación, y un panel para administrar todo.',
      casePath: '/casos/home/',
      shots: [
        img('home', 'campus-programa', 'Campus de Home: programa de formación'),
        img('home', 'web', 'Web institucional de Home'),
        img('home', 'admin', 'Panel de administración de Home'),
      ],
      monogram: 'H',
      theme: 't-home',
    },
    {
      id: 'under',
      short: 'Under Club',
      name: 'Under Club',
      categories: ['sistemas'],
      description:
        'Sistema a medida para un club de música electrónica que necesitaba organizar sus eventos y las comisiones de su equipo de RRPP.',
      casePath: '/casos/under-club/',
      shots: [img('under-club', 'web', 'Under Club: página de inicio'), img('under-club', 'cultura', 'Under Club: sección de cultura')],
      monogram: 'U',
      theme: 't-under',
    },
    {
      id: 'corral',
      short: 'Corralcoop',
      name: 'Cooperativa Corralcoop',
      categories: ['sistemas'],
      description:
        'Cooperativa de agua de Mendoza. Hicimos su portal de autogestión y oficina virtual: los socios consultan y pagan su factura, entienden su consumo y llegan directo a la atención por WhatsApp.',
      casePath: '/casos/corralcoop/',
      shots: [img('corralcoop', 'inicio', 'Corralcoop: página de inicio'), img('corralcoop', 'accesos', 'Corralcoop: accesos rápidos')],
      monogram: 'C',
      theme: 't-corral',
    },
    { id: 'am', short: 'AM Suministros', name: 'AM Suministros', categories: ['web'], description: 'Página web para ferretería industrial. En desarrollo.', shots: [], monogram: 'AM', theme: 't-am' },
    { id: 'borea', short: 'Borea', name: 'Borea', categories: ['web'], description: 'Página web para tienda de carteras. En desarrollo.', shots: [], monogram: 'B', theme: 't-borea' },
    { id: 'bb', short: 'BB Tatoo', name: 'BB Tatoo', categories: ['web'], description: 'Página web para casa de tatuajes. En desarrollo.', shots: [], monogram: 'BB', theme: 't-bb' },
  ] satisfies Project[],
  nextTitle: 'Tu proyecto puede ser el próximo',
  nextText: 'Contanos qué tenés en mente y te mostramos cómo lo resolveríamos.',
  nextCta: 'Cotizar mi proyecto',
} as const;
