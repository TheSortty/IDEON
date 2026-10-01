// Copy de la home que no vive en otro módulo más específico (FAQ, contacto).
// Si un cambio es solo de texto, se hace acá y no en los componentes.

export const HERO = {
  eyebrow: 'Diseño + desarrollo + estrategia',
  // El H1 es el slogan de marca (el mismo del Schema en index.html). Como no
  // dice qué hacemos, el subtítulo nombra los servicios con las palabras que
  // la gente busca. Las dos líneas del H1 se renderizan por separado para que
  // la segunda lleve el degradado.
  titleLine1: 'Impulsá tu negocio con tecnología a medida.',
  titleLine2: 'Tu idea, nuestro desarrollo.',
  subtitle:
    'Somos un estudio argentino que diseña y desarrolla páginas web, tiendas online y sistemas para negocios de todo el país. Y todo lo que creamos queda a tu nombre.',
  primaryCta: 'Pedí tu cotización por WhatsApp',
  secondaryCta: 'Ver proyectos',
} as const;

export type BenefitIcon = 'diseno' | 'propiedad' | 'libertad' | 'proyecto' | 'pago' | 'pauta';

export interface Benefit {
  icon: BenefitIcon;
  title: string;
  description: string;
}

// Lo que de verdad nos diferencia. Varios de estos puntos antes solo
// aparecían en el FAQ; si cambia una condición comercial, revisar también
// src/constants/faq.ts para que digan lo mismo.
export const BENEFITS: readonly Benefit[] = [
  {
    icon: 'diseno',
    title: 'Diseño incluido',
    description: 'Si tenés un branding lo seguimos, pero si no, lo creamos.',
  },
  {
    icon: 'propiedad',
    title: 'Todo queda a tu nombre',
    description: 'Dominio y código registrados a tu nombre. Si un día querés llevarte la web, te la llevás.',
  },
  {
    icon: 'libertad',
    title: 'Sin costos fijos obligatorios',
    description: 'No hay mantenimiento mensual forzoso ni permanencia. Pagás solo lo que necesitás.',
  },
  {
    icon: 'proyecto',
    title: 'Proyecto claro',
    description: 'Plan detallado con fechas, valores y condiciones antes de empezar.',
  },
  {
    icon: 'pago',
    title: 'Plan de pagos a medida',
    description: 'Armamos el esquema de pagos según el alcance y los tiempos de tu proyecto.',
  },
  {
    icon: 'pauta',
    title: 'Lista para pautar',
    description: 'Tenemos especialista en Meta Ads en el equipo: tu web sale preparada para campañas.',
  },
];
