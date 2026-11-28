import React from 'react';
import { useLocation } from 'react-router';
import { WhatsAppIcon } from '../ui/SocialIcons';
import { whatsappUrl, WHATSAPP_MESSAGES } from '../../constants/contact';

// Páginas que ya tienen su propio botón de WhatsApp y donde el flotante
// taparía los botones principales en celular ("Siguiente" del cotizador,
// "Enviar consulta" del formulario).
const HIDDEN_ON = ['/cotizar/', '/contacto/'];

// El verde es el de la marca WhatsApp (token `whatsapp`): el botón tiene que
// reconocerse de un vistazo. El anillo que late es CSS (animate-ping-soft):
// corre sin JS y lo frena la regla de "reducir movimiento".
const FloatingWhatsAppButton: React.FC = () => {
  const { pathname } = useLocation();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <a
      href={whatsappUrl(WHATSAPP_MESSAGES.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-[calc(24px+env(safe-area-inset-bottom,0px))] right-[calc(24px+env(safe-area-inset-right,0px))] z-50 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-whatsapp transition-[transform,box-shadow] duration-long ease-emphasis hover:-rotate-[8deg] hover:scale-110"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping-soft rounded-full border-2 border-whatsapp" />
      <WhatsAppIcon className="relative h-8 w-8 text-accent-ink" />
    </a>
  );
};

export default FloatingWhatsAppButton;
