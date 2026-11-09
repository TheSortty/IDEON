// Copy y lógica del cotizador (/cotizar/). Es un árbol: lo que la persona
// elige en el paso 1 cambia las preguntas de tamaño y qué funcionalidades se
// recomiendan. El lenguaje es el del cliente, no el técnico.

import type { PageMeta } from './services';

export const COTIZAR_META: PageMeta = {
  path: '/cotizar/',
  name: 'Cotizar',
  title: 'Cotizá tu proyecto en cinco pasos – IDEON',
  description:
    'Contanos de tu negocio y lo que necesitás en cinco pasos: te recomendamos el tipo de proyecto y te enviamos una cotización cerrada, sin cargo y sin compromiso.',
};

export type ProjectType = 'web' | 'tienda' | 'sistema' | 'nose';

export interface QuizOption {
  id: string;
  label: string;
  desc?: string;
}

export interface FeatureGroup {
  id: 'marketing' | 'ventas' | 'operacion' | 'integraciones' | 'acompanamiento';
  title: string;
  options: QuizOption[];
}

// ---------------------------------------------------------------- Paso 1
const TIPOS: QuizOption[] = [
  { id: 'web', label: 'Página web', desc: 'Para presentar tu negocio y recibir consultas' },
  { id: 'tienda', label: 'Tienda online', desc: 'Para vender tus productos por internet' },
  { id: 'sistema', label: 'Sistema o plataforma', desc: 'Para ordenar y automatizar la gestión de tu negocio' },
  { id: 'nose', label: 'Todavía no lo sé', desc: 'Quiero que me asesoren' },
];

// ---------------------------------------------------------------- Paso 2
const RUBROS: QuizOption[] = [
  { id: 'servicios', label: 'Servicios profesionales' },
  { id: 'comercio', label: 'Comercio o venta de productos' },
  { id: 'gastronomia', label: 'Gastronomía' },
  { id: 'salud', label: 'Salud y bienestar' },
  { id: 'educacion', label: 'Educación y capacitación' },
  { id: 'industria', label: 'Industria o distribución' },
  { id: 'turismo', label: 'Turismo y eventos' },
  { id: 'otro', label: 'Otro rubro' },
];

const OBJETIVOS: QuizOption[] = [
  { id: 'clientes', label: 'Conseguir más clientes' },
  { id: 'vender', label: 'Vender por internet' },
  { id: 'imagen', label: 'Dar una imagen más profesional' },
  { id: 'ordenar', label: 'Ordenar la gestión interna' },
  { id: 'tiempo', label: 'Ahorrar tiempo en tareas repetitivas' },
  { id: 'atencion', label: 'Atender mejor a mis clientes' },
];

// ---------------------------------------------------------------- Paso 3
const GROUPS: FeatureGroup[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    options: [
      { id: 'medicion', label: 'Medición de pautas publicitarias', desc: 'Saber cuántas consultas y ventas trae cada anuncio' },
      { id: 'google', label: 'Optimización para aparecer en Google', desc: 'Que te encuentren cuando buscan lo que ofrecés' },
      { id: 'leads', label: 'Formulario para guardar datos de contacto', desc: 'Cada interesado queda registrado para seguirlo' },
      { id: 'newsletter', label: 'Newsletter / mailing', desc: 'Novedades y promociones por mail a tus clientes' },
      { id: 'landing', label: 'Landing page individual para campañas', desc: 'Una página propia para cada promoción o anuncio' },
    ],
  },
  {
    id: 'ventas',
    title: 'Ventas y pagos online',
    options: [
      { id: 'pagos', label: 'Botón de pago', desc: 'Mercado Pago, tarjetas y QR' },
      { id: 'carrito', label: 'Catálogo y carrito', desc: 'Que elijan productos y compren solos' },
      { id: 'suscripciones', label: 'Cobros recurrentes / suscripciones', desc: 'Cuotas o abonos que se cobran automáticamente' },
      { id: 'factura', label: 'Factura electrónica automática', desc: 'Cada venta genera su comprobante sin cargarlo a mano' },
      { id: 'envios', label: 'Envíos y retiro', desc: 'Costos de envío, zonas y retiro en el local' },
    ],
  },
  {
    id: 'operacion',
    title: 'Operación y gestión',
    options: [
      { id: 'login', label: 'Usuarios con login y permisos', desc: 'Cada persona ve y hace solo lo que le corresponde' },
      { id: 'panel', label: 'Panel para editar contenido', desc: 'Cambiar textos, fotos y precios sin depender de nadie' },
      { id: 'turnos', label: 'Turnos y reservas online', desc: 'Agenda que tus clientes completan solos' },
      { id: 'stock', label: 'Stock e inventario', desc: 'Productos y existencias siempre al día' },
      { id: 'clientes', label: 'Gestión de clientes y ventas', desc: 'Todo el historial de cada cliente en un lugar' },
      { id: 'reportes', label: 'Tableros de reportes y dashboards', desc: 'Los números de tu negocio de un vistazo' },
      { id: 'notificaciones', label: 'Notificaciones al cliente', desc: 'Avisos automáticos de pedidos, turnos o pagos' },
    ],
  },
  {
    id: 'integraciones',
    title: 'Integraciones y seguridad',
    options: [
      { id: 'integraciones', label: 'Integraciones con otras herramientas', desc: 'Planillas, sistemas o apps que ya usás' },
      { id: 'api', label: 'API para conexiones', desc: 'Que otros sistemas puedan conectarse con el tuyo' },
      { id: 'backups', label: 'Copias de seguridad en tus servidores', desc: 'Respaldos automáticos y en paralelo de tu información' },
    ],
  },
  {
    id: 'acompanamiento',
    title: 'Acompañamiento',
    options: [
      { id: 'mant', label: 'Mantenimiento mensual', desc: 'Actualizaciones, ajustes y soporte continuo' },
      { id: 'capacitacion', label: 'Capacitación para tu equipo', desc: 'Que todos sepan usar lo que construimos' },
      { id: 'migracion', label: 'Migración desde tu web o sistema actual', desc: 'Pasamos tu información sin perder nada' },
    ],
  },
];

/** Según lo que quiere hacer, qué grupos van primero y qué se recomienda. */
export const FEATURE_TREE: Record<ProjectType, { order: FeatureGroup['id'][]; recommended: string[] }> = {
  web: {
    order: ['marketing', 'operacion', 'ventas', 'integraciones', 'acompanamiento'],
    recommended: ['medicion', 'google', 'leads', 'landing', 'panel', 'mant'],
  },
  tienda: {
    order: ['ventas', 'marketing', 'operacion', 'integraciones', 'acompanamiento'],
    recommended: ['pagos', 'carrito', 'envios', 'factura', 'stock', 'notificaciones', 'medicion'],
  },
  sistema: {
    order: ['operacion', 'integraciones', 'ventas', 'acompanamiento', 'marketing'],
    recommended: ['login', 'clientes', 'reportes', 'notificaciones', 'integraciones', 'backups', 'capacitacion'],
  },
  nose: {
    order: ['marketing', 'ventas', 'operacion', 'integraciones', 'acompanamiento'],
    recommended: [],
  },
};

// ---------------------------------------------------------------- Paso 4
// La pregunta de tamaño cambia según el tipo: lo que se puede contar en cada caso.
export const SIZE_TREE: Record<ProjectType, { question: string; options: QuizOption[] }> = {
  web: {
    question: '¿Cuántas secciones imaginás?',
    options: [
      { id: 'chico', label: 'Una sola página', desc: 'Para un servicio, un producto o una campaña' },
      { id: 'medio', label: 'Entre 3 y 6 secciones', desc: 'Quiénes somos, servicios, contacto…' },
      { id: 'grande', label: 'Más de 6 secciones o con funciones', desc: 'Reservas, catálogo, área de clientes…' },
    ],
  },
  tienda: {
    question: '¿Cuántos productos vas a vender?',
    options: [
      { id: 'chico', label: 'Hasta 50 productos', desc: 'Un catálogo acotado' },
      { id: 'medio', label: 'Entre 50 y 500 productos', desc: 'Varias categorías y variantes' },
      { id: 'grande', label: 'Más de 500 productos o varias sucursales', desc: 'Un catálogo grande o más de un punto de venta' },
    ],
  },
  sistema: {
    question: '¿Cuántas personas lo van a usar?',
    options: [
      { id: 'chico', label: 'De 1 a 3 personas', desc: 'Vos y alguien más del equipo' },
      { id: 'medio', label: 'Un equipo de 4 a 15 personas', desc: 'Varias tareas y roles' },
      { id: 'grande', label: 'Más de 15 personas o varias áreas', desc: 'Distintos sectores trabajando en el mismo sistema' },
    ],
  },
  nose: {
    question: '¿Qué tan grande lo imaginás?',
    options: [
      { id: 'chico', label: 'Algo simple', desc: 'Para empezar con lo justo' },
      { id: 'medio', label: 'Mediano', desc: 'Varias secciones o funciones' },
      { id: 'grande', label: 'Grande', desc: 'Muchas funciones o lógica propia de tu negocio' },
    ],
  },
};

const PLAZOS: QuizOption[] = [
  { id: 'ya', label: 'Lo antes posible' },
  { id: 'mes', label: 'En 1 o 2 meses' },
  { id: 'fecha', label: 'Tengo una fecha concreta', desc: 'Un lanzamiento, una temporada, un evento' },
  { id: 'tranqui', label: 'Sin apuro' },
];

// ---------------------------------------------------------------- Paso 5
const TIENE_HOY: QuizOption[] = [
  { id: 'cero', label: 'Arrancamos de cero' },
  { id: 'marca', label: 'Logo e identidad de marca' },
  { id: 'dominio', label: 'Dominio propio' },
  { id: 'web', label: 'Una web actual' },
  { id: 'redes', label: 'Redes sociales activas' },
  { id: 'planillas', label: 'Un sistema o planillas que usamos hoy' },
];

export const COTIZADOR = {
  title: ['Cotizá tu proyecto ', 'en cinco pasos'],
  lead: 'Contanos de tu negocio y lo que necesitás. Te recomendamos por dónde empezar y después te enviamos una cotización cerrada, sin compromiso.',
  stepLabel: (n: number) => `Paso ${n} de 5`,
  doneLabel: 'Listo',
  doneName: 'Tu recomendación',
  stepNames: ['Tu proyecto', 'Tu negocio', 'Funcionalidades', 'Tamaño y plazo', 'Lo que tenés hoy'],
  tipo: { question: '¿Qué querés hacer?', options: TIPOS },
  rubro: { question: '¿A qué se dedica tu negocio?', options: RUBROS },
  objetivos: { question: '¿Qué querés lograr?', hint: 'Podés elegir más de una.', options: OBJETIVOS },
  features: {
    question: '¿Qué necesitás que incluya?',
    hint: 'Podés elegir varias, o ninguna. Si no estás seguro, lo vemos juntos.',
    recommendedNote: (tipo: string) => `Marcamos lo más elegido para ${tipo}. Podés sumar o sacar lo que quieras.`,
    recommendedBadge: 'Recomendado',
    groups: GROUPS,
  },
  plazo: { question: '¿Para cuándo lo necesitás?', options: PLAZOS },
  hoy: {
    question: 'Contanos qué tenés hoy',
    hint: 'Mientras más sepamos de tu negocio, más a medida va a ser nuestra propuesta.',
    options: TIENE_HOY,
  },
  idea: {
    question: '¿Qué idea tenés?',
    hint: 'Entender qué buscás lograr nos ayuda a proponerte lo que de verdad te sirve.',
    placeholder: 'Por ejemplo: quiero que mis clientes reserven turnos solos y dejar de anotarlos en un cuaderno.',
  },
  optionalBadge: 'Opcional',
  back: '← Atrás',
  next: 'Siguiente',
  finish: 'Ver recomendación',
  recommendLabel: 'Te recomendamos',
  whyTitle: 'Por qué',
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

/** Nombre del tipo para las frases ("para una tienda online"). */
export const TYPE_PHRASE: Record<ProjectType, string> = {
  web: 'una página web',
  tienda: 'una tienda online',
  sistema: 'un sistema a medida',
  nose: 'tu proyecto',
};

// ------------------------------------------------------- Respuestas y lógica

export interface QuizAnswers {
  tipo: ProjectType | null;
  rubro: string | null;
  objetivos: string[];
  extras: string[];
  tamano: string | null;
  plazo: string | null;
  hoy: string[];
  idea: string;
}

export const EMPTY_ANSWERS: QuizAnswers = {
  tipo: null,
  rubro: null,
  objetivos: [],
  extras: [],
  tamano: null,
  plazo: null,
  hoy: [],
  idea: '',
};

// Funcionalidades que piden lógica propia de negocio (→ Enterprise) y las que
// suman funciones a un sitio (→ Pro). Marketing y acompañamiento no cambian
// el plan: van al resumen.
const ENTERPRISE_FEATURES = ['login', 'stock', 'clientes', 'reportes', 'integraciones', 'api', 'backups', 'suscripciones', 'factura'];
const PRO_FEATURES = ['pagos', 'carrito', 'envios', 'panel', 'turnos', 'notificaciones'];

export interface Recommendation {
  plan: string;
  description: string;
  reasons: string[];
}

const ALL_FEATURES = GROUPS.flatMap((g) => g.options);
const labelOf = (list: readonly QuizOption[], id: string | null) => list.find((o) => o.id === id)?.label ?? '';
const labelsOf = (list: readonly QuizOption[], ids: string[]) => ids.map((id) => labelOf(list, id)).filter(Boolean);

export function recommend(a: QuizAnswers): Recommendation {
  const enterprise = a.extras.filter((id) => ENTERPRISE_FEATURES.includes(id));
  const pro = a.extras.filter((id) => PRO_FEATURES.includes(id));
  const sizeLabel = a.tipo ? labelOf(SIZE_TREE[a.tipo].options, a.tamano).toLowerCase() : '';

  if (a.tipo === 'nose') {
    return {
      plan: 'Charla inicial',
      description: 'Hablemos 20 minutos: entendemos tu negocio y te decimos qué te conviene hacer primero.',
      reasons: ['Todavía no tenés definido el tipo de proyecto, y está perfecto: para eso está la charla.'],
    };
  }

  if (a.tipo === 'sistema' || a.tamano === 'grande' || enterprise.length > 0) {
    const reasons: string[] = [];
    if (a.tipo === 'sistema') reasons.push('Buscás un sistema con la lógica propia de tu negocio.');
    if (a.tamano === 'grande' && sizeLabel) reasons.push(`El tamaño que imaginás (${sizeLabel}) pide una base sólida.`);
    if (enterprise.length) reasons.push(`Elegiste ${labelsOf(ALL_FEATURES, enterprise.slice(0, 3)).join(', ').toLowerCase()}.`);
    return {
      plan: 'Enterprise',
      description: 'Un sistema o plataforma con la lógica de tu negocio, desarrollado por etapas con entregas que ya podés usar.',
      reasons,
    };
  }

  if (a.tipo === 'tienda' || a.tamano === 'medio' || pro.length > 0) {
    const reasons: string[] = [];
    if (a.tipo === 'tienda') reasons.push('Querés vender por internet con tu propia tienda.');
    if (a.tamano === 'medio' && sizeLabel) reasons.push(`El tamaño que imaginás (${sizeLabel}) va más allá de una sola página.`);
    if (pro.length) reasons.push(`Elegiste ${labelsOf(ALL_FEATURES, pro.slice(0, 3)).join(', ').toLowerCase()}.`);
    return {
      plan: 'Pro',
      description: 'Un sitio con varias secciones o funcionalidades, como una tienda online, con acompañamiento en todo el desarrollo.',
      reasons,
    };
  }

  return {
    plan: 'Starter',
    description: 'Una web profesional, clara y lista para recibir consultas. El mejor punto de partida para tu negocio.',
    reasons: ['Lo que necesitás se resuelve con una web clara y bien hecha, sin funciones de más.'],
  };
}

/** Resumen en texto (pantalla, WhatsApp y formulario). Omite lo que no respondió. */
export function summarize(a: QuizAnswers): string[] {
  const size = a.tipo ? labelOf(SIZE_TREE[a.tipo].options, a.tamano) : '';
  const lines = [
    `Proyecto: ${labelOf(TIPOS, a.tipo)}`,
    `Rubro: ${labelOf(RUBROS, a.rubro)}`,
    a.objetivos.length ? `Objetivos: ${labelsOf(OBJETIVOS, a.objetivos).join(', ')}` : '',
    `Incluye: ${a.extras.length ? labelsOf(ALL_FEATURES, a.extras).join(', ') : 'nada extra por ahora'}`,
    size ? `Tamaño: ${size}` : '',
    `Plazo: ${labelOf(PLAZOS, a.plazo)}`,
    a.hoy.length ? `Tiene hoy: ${labelsOf(TIENE_HOY, a.hoy).join(', ')}` : '',
    a.idea.trim() ? `Idea: ${a.idea.trim()}` : '',
  ];
  return lines.filter(Boolean);
}

export function whatsappSummary(a: QuizAnswers): string {
  return `Hola IDEON, usé el cotizador de la web.\n${summarize(a).join('\n')}\nMe recomendó: ${recommend(a).plan}.`;
}
