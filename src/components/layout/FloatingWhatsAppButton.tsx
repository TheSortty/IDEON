import React from 'react';
import { WhatsAppIcon } from '../ui/SocialIcons';
import { whatsappUrl, WHATSAPP_MESSAGES } from '../../constants/contact';

// El verde es el de la marca WhatsApp (token `whatsapp`): el botón tiene que
// reconocerse de un vistazo. El anillo que late es CSS (animate-ping-soft):
// corre sin JS y lo frena la regla de "reducir movimiento".
const FloatingWhatsAppButton: React.FC = () => {
  return (
    <a
      href={whatsappUrl(WHATSAPP_MESSAGES.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-whatsapp shadow-[0_0_30px_rgb(var(--whatsapp)/0.55),0_12px_28px_-10px_rgb(0_0_0/0.5)] transition-[transform,box-shadow] duration-long ease-emphasis hover:-rotate-[8deg] hover:scale-110 hover:shadow-[0_0_46px_rgb(var(--whatsapp)/0.8),0_16px_34px_-10px_rgb(0_0_0/0.5)]"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping-soft rounded-full border-2 border-whatsapp" />
      <WhatsAppIcon className="relative h-8 w-8 text-accent-ink" />
    </a>
  );
};

export default FloatingWhatsAppButton;
