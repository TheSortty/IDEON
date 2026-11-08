// Copy y lógica de recomendación del cotizador (/cotizar/, etapa F).

import type { PageMeta } from './services';

export const COTIZAR_META: PageMeta = {
  path: '/cotizar/',
  name: 'Cotizar',
  title: 'Cotizá tu proyecto en cuatro pasos – IDEON',
  description:
    'Respondé cuatro preguntas y te recomendamos el tipo de proyecto. Después te enviamos una cotización cerrada, sin cargo y sin compromiso.',
};

export interface QuizOption {
  id: string;
  label: string;
  desc?: string;
}

export const COTIZADOR = {
  title: ['Cotizá tu proyecto ', 'en cuatro pasos'],
  lead: 'Respondé unas preguntas y te recomendamos el tipo de proyecto. Después te enviamos una cotización cerrada, sin compromiso.',
  stepLabel: (n: number) => `Paso ${n} de 4`,
  doneLabel: 'Listo',
  doneName: 'Tu recomendación',
  stepNames: ['Tipo de proyecto', 'Tamaño', 'Funcionalidades', 'Plazo'],
  questions: {
    tipo: '¿Qué querés hacer?',
    tamano: '¿Qué tan grande imaginás el proyecto?',
    extras: '¿Qué necesitás que incluya?',
    extrasHint: 'Podés elegir varias, o ninguna.',
    plazo: '¿Para cuándo lo necesitás?',
  },
  tipos: [
    { id: 'web', label: 'Página web', desc: 'Landing o institucional, con medición y SEO' },
    { id: 'tienda', label: 'Tienda online', desc: 'Vender productos con pagos online' },
    { id: 'sistema', label: 'Sistema o plataforma', desc: 'CRM, campus, gestión interna' },
    { id: 'nose', label: 'Todavía no lo sé', desc: 'Quiero que me asesoren' },
  ] satisfies QuizOption[],
  tamanos: [
    { id: 'chico', label: 'Algo simple', desc: 'Una página o pocas secciones' },
    { id: 'medio', label: 'Mediano', desc: 'Varias páginas o funcionalidades' },
    { id: 'grande', label: 'Grande', desc: 'Muchas funciones o lógica propia' },
  ] satisfies QuizOption[],
  extras: [
    { id: 'pagos', label: 'Pagos online' },
    { id: 'login', label: 'Usuarios con login' },
    { id: 'panel', label: 'Panel para editar contenido' },
    { id: 'integra', label: 'Integraciones con otras herramientas' },
    { id: 'medicion', label: 'Medición y SEO (Pixel, GA4)' },
    { id: 'mant', label: 'Mantenimiento mensual' },
  ] satisfies QuizOption[],
  plazos: [
    { id: 'ya', label: 'Lo antes posible' },
    { id: 'mes', label: 'En 1 o 2 meses' },
    { id: 'tranqui', label: 'Sin apuro' },
  ] satisfies QuizOption[],
  back: '← Atrás',
  next: 'Siguiente',
  finish: 'Ver recomendación',
  recommendLabel: 'Te recomendamos',
  summaryTitle: 'Resumen de lo que elegiste',
  priceNote: 'El precio lo definimos con vos según el alcance. Enviá este resumen y te respondemos con una cotización cerrada.',
  sendWhatsapp: 'Enviar por WhatsApp',
  sendForm: 'Prefiero que me escriban',
  restart: 'Volver a empezar',
  fromPlan: (plan: string) => `Venís del plan ${plan}: lo tenemos en cuenta en la recomendación.`,
  trust: [
    { title: 'Sin compromiso', text: 'Cotizar no te obliga a nada.' },
    { title: 'Precio cerrado', text: 'No cambia a mitad del proyecto.' },
    { title: 'Te responde una persona', text: 'Del equipo, no un bot.' },
  ],
} as const;

export interface QuizAnswers {
  tipo: string | null;
  tamano: string | null;
  extras: string[];
  plazo: string | null;
}

export interface Recommendation {
  plan: string;
  description: string;
}

/** La misma regla del diseño de Celeste: de la respuesta más exigente a la más simple. */
export function recommend(a: QuizAnswers): Recommendation {
  const has = (id: string) => a.extras.includes(id);
  if (a.tipo === 'nose') {
    return { plan: 'Charla inicial', description: 'Hablemos 20 minutos: entendemos tu negocio y te decimos qué te conviene hacer primero.' };
  }
  if (a.tipo === 'sistema' || a.tamano === 'grande' || has('login') || has('integra')) {
    return { plan: 'Enterprise', description: 'Un sistema o plataforma con la lógica de tu negocio, desarrollado por etapas con entregas que ya podés usar.' };
  }
  if (a.tipo === 'tienda' || a.tamano === 'medio' || has('pagos') || has('panel')) {
    return { plan: 'Pro', description: 'Un sitio con varias secciones o funcionalidades, como una tienda online, con acompañamiento en todo el desarrollo.' };
  }
  return { plan: 'Starter', description: 'Una web profesional, clara y lista para recibir consultas. El mejor punto de partida para tu negocio.' };
}

const labelOf = (list: readonly QuizOption[], id: string | null) => list.find((o) => o.id === id)?.label ?? '';

/** Resumen en texto (para la pantalla, el WhatsApp y el formulario). */
export function summarize(a: QuizAnswers): string[] {
  return [
    `Proyecto: ${labelOf(COTIZADOR.tipos, a.tipo)}`,
    `Tamaño: ${labelOf(COTIZADOR.tamanos, a.tamano)}`,
    `Incluye: ${a.extras.length ? a.extras.map((id) => labelOf(COTIZADOR.extras, id)).join(', ') : 'nada extra por ahora'}`,
    `Plazo: ${labelOf(COTIZADOR.plazos, a.plazo)}`,
  ];
}

export function whatsappSummary(a: QuizAnswers): string {
  return `Hola IDEON, usé el cotizador de la web. ${summarize(a).join('. ')}. Me recomendó: ${recommend(a).plan}.`;
}
