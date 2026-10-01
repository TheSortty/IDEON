// Datos de contacto compartidos por toda la web.
// El numero de WhatsApp se define UNA sola vez aca: el boton flotante, el
// footer y el JSON-LD lo toman de este modulo. Antes habia dos numeros
// distintos dando vueltas y los CTA de conversion apuntaban al equivocado.
export const WHATSAPP_NUMBER = '5492617736266';
export const CONTACT_EMAIL = 'contacto@ideon.ar';

// Arma un link de WhatsApp con el mensaje ya precargado, para que el cliente
// no tenga que explicar de nuevo desde dónde nos escribe.
export const whatsappUrl = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Mensajes precargados de los CTA generales. Cada uno dice desde dónde
// escribe la persona, así la consulta llega con contexto y se sabe qué botón
// la generó.
export const WHATSAPP_MESSAGES = {
  hero: 'Hola IDEON, vengo de la web y quiero cotizar un proyecto:',
  floating: 'Hola IDEON, vengo de la web y tengo una consulta:',
} as const;

export const openWhatsApp = (message: string): void => {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
};
