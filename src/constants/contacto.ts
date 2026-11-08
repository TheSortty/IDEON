// Copy de /contacto/ (etapa F).

import type { PageMeta } from './services';

export const CONTACTO_META: PageMeta = {
  path: '/contacto/',
  name: 'Contacto',
  title: 'Contacto: contanos tu idea – IDEON',
  description:
    'Escribinos por WhatsApp o dejanos tus datos y te contactamos. Respondemos de lunes a sábado, de 9 a 22:30 h, desde la Ciudad de Mendoza.',
};

export const CONTACTO = {
  title: ['Contanos ', 'tu idea'],
  lead: 'La forma más rápida es WhatsApp. Si preferís, dejanos tus datos y te escribimos nosotros.',
  whatsappTitle: 'Escribinos por WhatsApp',
  whatsappMessage: 'Hola IDEON, vengo de la página web y quiero contarles mi idea',
  phoneDisplay: '+54 9 261 773-6266',
  info: [
    { icon: 'form', label: 'Email', value: 'contacto@ideon.ar', href: 'mailto:contacto@ideon.ar' },
    { icon: 'calendar', label: 'Horario', value: 'Lunes a sábado, 9 a 22:30 h' },
    { icon: 'target', label: 'Ubicación', value: 'Ciudad de Mendoza · trabajamos con todo el país' },
  ] as const,
  nextTitle: '¿Qué pasa después?',
  nextSteps: [
    'Te respondemos en el horario de atención.',
    'Charlamos sobre tu negocio y lo que necesitás.',
    'Te enviamos una cotización con alcance, plazo y precio cerrado.',
  ],
  formTitle: 'Prefiero dejar mis datos',
  formText: 'Te contactamos por el medio que elijas.',
  fields: {
    name: { label: 'Nombre', placeholder: 'Tu nombre' },
    business: { label: 'Negocio o marca', placeholder: 'Nombre de tu negocio' },
    email: { label: 'Email', placeholder: 'vos@tunegocio.com' },
    phone: { label: 'WhatsApp', placeholder: '+54 9 261 ...' },
    type: { label: '¿Qué necesitás?' },
    message: { label: 'Contanos un poco más', placeholder: 'Qué hace tu negocio y qué te gustaría lograr' },
  },
  types: ['Página web', 'Tienda online', 'Sistema o plataforma a medida', 'Todavía no lo sé'],
  submit: 'Enviar consulta',
  submitting: 'Enviando…',
  privacyBefore: 'Usamos tus datos solo para responderte. Ver ',
  privacyLink: 'política de privacidad',
  errorGeneric: 'No pudimos enviar tu consulta. Probá de nuevo o escribinos por WhatsApp.',
  errorNetwork: 'Hubo un problema de conexión. Revisá tu internet y probá de nuevo.',
  needContact: 'Dejanos un email o un WhatsApp para poder responderte.',
} as const;
