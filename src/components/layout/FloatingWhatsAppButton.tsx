import React from 'react';
import { WhatsAppIcon } from '../ui/SocialIcons';

const FloatingWhatsAppButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5492617736266"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] rounded-full shadow-lg hover:bg-[#128C7E] transition-colors duration-300 transform hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="w-8 h-8 text-white" />
    </a>
  );
};

export default FloatingWhatsAppButton;