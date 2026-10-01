// Copy de la home que no vive en otro módulo más específico (FAQ, contacto).
// Si un cambio es solo de texto, se hace acá y no en los componentes.

export const HERO = {
  eyebrow: 'Diseño + desarrollo + estrategia',
  // El H1 dice qué hacemos, para quién y dónde: es lo primero que lee la
  // visita y lo que más pesa para Google. Las dos líneas se renderizan por
  // separado para que la segunda lleve el degradado.
  titleLine1: 'Páginas web, tiendas online y sistemas a medida,',
  titleLine2: 'desde Mendoza.',
  subtitle:
    'Para negocios de todo el país, desde USD 200 con diseño, dominio y SSL incluidos. El código y el dominio quedan a tu nombre: sin permanencia ni costos fijos obligatorios.',
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
    title: 'Pagás en dos partes',
    description: '25% para arrancar y 75% recién cuando la web está publicada y tenés todos los accesos.',
  },
  {
    icon: 'pauta',
    title: 'Lista para pautar',
    description: 'Tenemos especialista en Meta Ads en el equipo: tu web sale preparada para campañas.',
  },
];
