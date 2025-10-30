import React from 'react';

// ICONS
const SpeedIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#b900de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const ScopeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#b900de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const MaintenanceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#b900de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 00-9-9m-9 9a9 9 0 019-9" />
    </svg>
);

const AdsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#b900de]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
    </svg>
);

// BENEFITS SECTION
const benefits = [
  {
    icon: <SpeedIcon />,
    title: 'Velocidad',
    description: 'Entrega completa entre 24hs y 10 días según tu necesidad',
  },
  {
    icon: <ScopeIcon />,
    title: 'Alcance cerrado',
    description: 'Objetivo definido, sin sorpresas ni costos ocultos',
  },
  {
    icon: <MaintenanceIcon />,
    title: 'Sin mantenimiento',
    description: 'Handoff total. El sitio es 100% tuyo, sin dependencias',
  },
  {
    icon: <AdsIcon />,
    title: 'Optimizada para ads',
    description: 'Transforma clicks en ventas, redireccionando todo a tu WhatsApp',
  },
];

const Benefits: React.FC = () => {
  return (
    <section className="bg-slate-100 dark:bg-[#42006b] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white dark:bg-[#03031f]/50 shadow-lg mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;