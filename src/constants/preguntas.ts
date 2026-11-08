// Copy de /preguntas/ (etapa F). Las preguntas de cada servicio viven en
// src/constants/services.ts, junto a su página.

import type { Faq, PageMeta } from './services';

export const PREGUNTAS_META: PageMeta = {
  path: '/preguntas/',
  name: 'Preguntas frecuentes',
  title: 'Preguntas frecuentes sobre desarrollo web y software – IDEON',
  description:
    'Precios, cotización, propiedad del código y del dominio, mantenimiento, plazos y publicidad: lo que siempre nos preguntan, respondido.',
};

export type FaqTopicId = 'cot' | 'prop' | 'proy';

export const PREGUNTAS = {
  title: ['Lo que siempre ', 'nos preguntan'],
  lead: 'Si tu duda no está acá, escribinos y te respondemos.',
  allLabel: 'Todas',
  topics: [
    {
      id: 'cot',
      label: 'Cotización',
      faqs: [
        { question: '¿Por qué no publican precios?', answer: 'Porque cada proyecto es distinto y no queremos que pagues por cosas que no necesitás. Escuchamos primero y te pasamos un precio cerrado según tu proyecto.' },
        { question: '¿Cotizar tiene costo?', answer: 'No. La cotización es sin cargo y sin compromiso.' },
        { question: '¿El precio puede cambiar durante el proyecto?', answer: 'No, si el alcance se mantiene. Si querés sumar algo nuevo, lo cotizamos aparte antes de hacerlo.' },
      ],
    },
    {
      id: 'prop',
      label: 'Propiedad y mantenimiento',
      faqs: [
        { question: '¿El código y el dominio quedan a mi nombre?', answer: 'Sí. Dominio, hosting, código y accesos son tuyos desde el primer día.' },
        { question: '¿Tengo que contratar mantenimiento?', answer: 'No. Es opcional. Si lo necesitás, lo podemos sumar a tu cotización o agregarlo una vez terminado el desarrollo.' },
        { question: '¿Puedo cambiar de proveedor después?', answer: 'Sí, cuando quieras. Como todo está a tu nombre, te llevás tu web o tu sistema con todos los permisos.' },
      ],
    },
    {
      id: 'proy',
      label: 'El proyecto',
      faqs: [
        { question: '¿Cuánto tarda un proyecto?', answer: 'Depende del alcance y la urgencia que tengas. En la cotización te damos el plazo concreto para cada etapa.' },
        { question: '¿Trabajan solo en Mendoza?', answer: 'Estamos en Mendoza, pero trabajamos con negocios de toda Argentina y el mundo de forma remota.' },
        { question: '¿Ustedes hacen la publicidad?', answer: 'No gestionamos campañas. Lo que sí hacemos es dejar tu web lista para pautar: Pixel de Meta, GA4, eventos de conversión y SEO configurados, para que vos o tu agencia puedan medir cada consulta desde el primer día.' },
      ],
    },
  ] satisfies { id: FaqTopicId; label: string; faqs: Faq[] }[],
  ctaTitle: '¿Te quedó alguna duda?',
  ctaWhatsapp: 'Preguntanos por WhatsApp',
  ctaWhatsappMessage: 'Hola IDEON, vengo de la página web y tengo una duda',
  ctaQuote: 'Ir al cotizador',
} as const;
