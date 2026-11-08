// Copy de /nosotros/ (etapa F del rediseño).

import type { IconCard, PageMeta } from './services';

export const NOSOTROS_META: PageMeta = {
  path: '/nosotros/',
  name: 'Nosotros',
  title: 'Nosotros: el equipo de IDEON, estudio de software en Mendoza',
  description:
    'Conocé a IDEON: un estudio de desarrollo web y software a medida fundado en Mendoza en 2025. El equipo, cómo trabajamos y por qué existimos.',
};

export type TeamTone = 'magenta' | 'violet' | 'blue';

export interface TeamMember {
  name: string;
  role: string;
  roleShort: string;
  bio: string;
  /** Avatar ilustrado en /public/equipo. */
  avatar: string;
  tone: TeamTone;
}

export const NOSOTROS = {
  title: ['Somos el equipo de especialistas que ', 'entiende lo que necesita tu negocio'],
  lead: 'Somos un estudio de desarrollo web y software a medida, fundado en Mendoza en 2025.',
  pageNav: [
    { id: 'equipo', label: 'El equipo' },
    { id: 'valores', label: 'Cómo pensamos' },
    { id: 'historia', label: 'Historia' },
    { id: 'convenios', label: 'Convenios' },
  ],
  teamTitle: 'Las personas detrás de cada proyecto',
  team: [
    {
      name: 'Angelo Terranova',
      role: 'CEO y cofundador',
      roleShort: 'CEO',
      bio: 'Lleva las relaciones comerciales: entiende lo que necesita cada cliente y lo convierte en solución. Es quien tuvo la idea que dio origen a IDEON.',
      avatar: '/equipo/angelo.svg',
      tone: 'magenta',
    },
    {
      name: 'Gonzalo Burgia',
      role: 'CTO y cofundador',
      roleShort: 'CTO',
      bio: 'Lleva el desarrollo tecnológico de IDEON y se encarga de convertir cada idea en realidad.',
      avatar: '/equipo/gonzalo.svg',
      tone: 'violet',
    },
    {
      name: 'Celeste Codaro',
      role: 'CMO y cofundadora',
      roleShort: 'CMO',
      bio: 'Lleva el marketing de IDEON y la estrategia digital de cada cliente: SEO, medición y análisis de datos, y acompaña la experiencia de usuario de cada proyecto.',
      avatar: '/equipo/celeste.svg',
      tone: 'blue',
    },
  ] satisfies TeamMember[],
  valuesTitle: 'Lo que no negociamos',
  valuesText: 'Elegimos trabajar de la forma en que nos gustaría que nos trabajen como clientes.',
  values: [
    { icon: 'check', title: 'Claridad', description: 'Propuestas sin tecnicismos y precio cerrado antes de empezar.' },
    { icon: 'key', title: 'Propiedad', description: 'Lo que construimos es tuyo, siempre.' },
    { icon: 'users', title: 'Cercanía', description: 'Hablás con quienes hacen tu proyecto, no con un intermediario.' },
    { icon: 'trendUp', title: 'Resultados', description: 'Una web vale por los clientes que trae, no por lo linda que es.' },
  ] satisfies IconCard[],
  historyTitle: 'Por qué existe IDEON',
  // Texto de origen (corrección del 09/11/2026). Cada párrafo es una lista
  // de tramos: los que tienen `highlight` van en cursiva con el degradado.
  history: [
    [
      {
        text: 'Tras vivenciar el problema de muchas empresas, que usan programas por suscripción, con una mensualidad obligatoria para sostener la operativa interna, y sin la seguridad de hasta cuánto eso sería así, tuvimos una idea.',
      },
    ],
    [
      { text: 'O más bien, un ' },
      { text: 'ideón', highlight: true },
      {
        text: ': crear una agencia dedicada al desarrollo de software a medida, desde una landing page simple hasta un ERP completo y nativo.',
      },
    ],
    [
      {
        text: 'Apasionados por solucionar problemas de operación, gestiones, cobranza, interacción y posicionamiento a través de la tecnología.',
      },
    ],
  ] satisfies { text: string; highlight?: boolean }[][],
  partnersTitle: 'Trabajamos con aliados para ir más lejos',
  partner: {
    name: 'SIRO',
    by: 'de Banco Roela',
    description: 'Integramos SIRO en tus sistemas y tiendas para automatizar cobros sin procesos manuales.',
    features: ['Cobranzas recurrentes automatizadas', 'Pagos online', 'Rendiciones automáticas'],
  },
  ctaTitle: 'Hablemos de tu proyecto',
  ctaText: 'Te responde una persona del equipo, no un bot.',
  ctaPrimary: 'Cotizar proyecto',
  ctaSecondary: 'Ver nuestro trabajo',
} as const;
