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

export const openWhatsApp = (message: string): void => {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
};
