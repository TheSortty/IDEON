// Datos de contacto compartidos por toda la web
export const WHATSAPP_NUMBER = '5492616915325';
export const CONTACT_EMAIL = 'contacto@ideon.ar';

// Arma un link de WhatsApp con el mensaje ya precargado, para que el cliente
// no tenga que explicar de nuevo desde dónde nos escribe.
export const whatsappUrl = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const openWhatsApp = (message: string): void => {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
};
