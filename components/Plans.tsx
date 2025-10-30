import React from 'react';
import Button from './ui/Button';
import { useModal } from '../contexts/ModalContext';

// PLANS SECTION
const PlanCard = ({ plan, isFeatured }: { plan: any; isFeatured?: boolean }) => {
  const { openModal } = useModal();

  const handleChoosePlan = () => {
    const targetElement = document.getElementById('contacto');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      // Wait for the scroll animation to be noticeable before opening the modal
      setTimeout(() => {
        openModal(plan.name);
      }, 700);
    } else {
      // Fallback if the element isn't found for some reason
      openModal(plan.name);
    }
  };

  return (
    <div className={`rounded-2xl p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/80 dark:bg-[#4510b0]/30 backdrop-blur-sm border ${isFeatured ? 'border-[#b900de]/50 animate-neon-glow' : 'border-slate-200 dark:border-slate-700'}`}>
      {isFeatured && (
        <div className="absolute top-4 right-[-34px] bg-[#b900de] text-white text-xs font-bold px-10 py-1.5 rotate-45">
            POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{plan.delivery}</p>
      <div className="mt-6">
        {plan.price.original ? (
          <div className="flex items-baseline gap-2">
              <span className="text-2xl text-slate-500 dark:text-slate-400 line-through">{plan.price.original}</span>
              <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{plan.price.current}</span>
          </div>
        ) : (
          <span className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{plan.price.current}</span>
        )}
      </div>
      <ul className="mt-8 space-y-4 text-slate-600 dark:text-slate-300 flex-grow">
        {plan.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start">
            <span className="text-[#b900de] mr-2 mt-1">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button className="w-full" variant={isFeatured ? 'primary' : 'outline'} onClick={handleChoosePlan}>
          Elegir {plan.name}
        </Button>
      </div>
    </div>
  );
};

const plans = [
    {
        name: 'Lite', delivery: '7-10 días', price: { current: 'USD$139' },
        features: ['One-page base', 'SEO on-page', 'Integración WhatsApp', 'Google Analytics 4', 'Certificado SSL', 'Responsive design']
    },
    {
        name: 'Express', delivery: '24–48hs', price: { current: 'USD$259', original: 'USD$289' },
        features: ['Todo lo de Fast', 'Prioridad máxima', 'Revisión express', 'Entrega ultra-ágil', 'Setup completo']
    },
    {
        name: 'Fast', delivery: '5–7 días', price: { current: 'USD$219' },
        features: ['Todo lo de Lite', 'Prioridad media', 'Diseño personalizado', 'Optimización de imágenes', 'Meta tags completos', 'Sitemap XML']
    }
];

const Plans: React.FC = () => {
  return (
    <section id="planes" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Elegí tu velocidad</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Planes diseñados según tu urgencia. Todos incluyen handoff total.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PlanCard plan={plans[0]} />
          <PlanCard plan={plans[1]} isFeatured />
          <PlanCard plan={plans[2]} />
        </div>
      </div>
    </section>
  );
};

export default Plans;