import React from 'react';

// SVG ICONS
const IconVelocidad: React.FC = () => (
    <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const IconAlcance: React.FC = () => (
    <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const IconMantenimiento: React.FC = () => (
    <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
         <line x1="4" y1="20" x2="20" y2="4" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

const IconAds: React.FC = () => (
    <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

// BENEFITS SECTION
const benefits = [
  {
    icon: <IconVelocidad />,
    title: 'Velocidad',
    description: 'Entrega completa entre 24hs y 10 días según tu necesidad',
  },
  {
    icon: <IconAlcance />,
    title: 'Alcance cerrado',
    description: 'Objetivo definido, sin sorpresas ni costos ocultos',
  },
  {
    icon: <IconMantenimiento />,
    title: 'Sin mantenimiento',
    description: 'Handoff total. El sitio es 100% tuyo, sin dependencias',
  },
  {
    icon: <IconAds />,
    title: 'Optimizada para ads',
    description: 'Transforma clicks en ventas, redireccionando todo a tu WhatsApp',
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="bg-white dark:bg-brand-surface py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 dark:bg-brand-background shadow-lg mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary">{benefit.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;