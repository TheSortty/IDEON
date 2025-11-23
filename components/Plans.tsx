import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { useModal } from '../contexts/ModalContext';

// PLANS SECTION
const PlanCard = ({ plan, isFeatured, index }: { plan: any; isFeatured?: boolean; index: number }) => {
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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.2 } }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.1, ease: "easeOut" } }}
      className={`glass-panel p-8 flex flex-col relative overflow-hidden transition-all duration-200 ${isFeatured ? 'border-brand-primary shadow-[0_0_40px_rgba(212,0,255,0.3)] ring-2 ring-brand-primary/50 scale-105 z-10' : 'border-white/10 hover:border-white/30'}`}
    >
      {isFeatured && (
        <div className="absolute top-4 right-[-34px] bg-brand-primary text-white text-xs font-bold px-10 py-1.5 rotate-45 z-10 shadow-lg">
          + Oferta
        </div>
      )}

      <div className="flex items-center justify-start mb-2 gap-3">
        <h3 className="text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">{plan.name}</h3>
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${isFeatured ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200'}`}>
          {plan.time}
        </span>
      </div>

      <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">{plan.description}</p>

      <div className="mt-6">
        {plan.price.original ? (
          <div className="flex items-baseline gap-2">
            <span className="text-lg text-gray-500 dark:text-brand-text-secondary line-through">{plan.price.original}</span>
            <span className="text-3xl font-bold tracking-tight text-[#111] dark:text-brand-text-primary">{plan.price.current}</span>
          </div>
        ) : (
          <span className="text-3xl font-bold tracking-tight text-[#111] dark:text-brand-text-primary">{plan.price.current}</span>
        )}
      </div>

      <div className="mt-8 flex-grow">
        {plan.includesText && (
          <p className="text-sm font-bold text-brand-primary mb-3 uppercase tracking-wide">{plan.includesText}</p>
        )}
        <ul className="space-y-4 text-gray-600 dark:text-brand-text-secondary">
          {plan.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-brand-primary mr-2 mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10">
        <p className="text-sm italic text-gray-500 dark:text-gray-400">
          {plan.idealFor}
        </p>
      </div>

      <div className="mt-6">
        <Button className="w-full" variant={isFeatured ? 'primary' : 'outline'} onClick={handleChoosePlan}>
          {plan.buttonText}
        </Button>
      </div>
    </motion.div>
  );
};

const plans = [
  {
    name: 'Lite',
    time: '7 días',
    description: 'Pensado para salir online sin complicarte.',
    includesText: null,
    price: { current: 'USD 79$' },
    features: ['Pagina simple y clara', 'Diseño moderno', 'Boton a WhatsApp para recibir consultas', 'Texto y estructura base', 'Publicacion en tu dominio', 'Acceso total a la web (queda a tu nombre)'],
    idealFor: 'Ideal para: Quienes quieren tener presencia online rapido y sin gastar de mas.',
    buttonText: 'Elegir plan'
  },
  {
    name: 'Instant',
    time: '24–48hs',
    description: 'Tu web lista YA, con prioridad total.',
    includesText: 'Incluye todo lo del Plus, más:',
    price: { current: 'USD $179', original: 'USD $199' },
    features: ['Trabajo Prioritario', 'REVISION INMEDIATA CON VOS', 'Entrega super rapida', 'Acompañamiento durante el proceso', 'Publicacion final sin demoras'],
    idealFor: 'Ideal para: Lanzamientos urgentes, apreturas, campañas, o "la necesito para ayer".',
    buttonText: 'Elegir plan'
  },
  {
    name: 'Plus',
    time: '5 días',
    description: 'Una web más completa, cuidada y lista para convertir.',
    includesText: 'Incluye todo lo del Lite, más:',
    price: { current: 'USD 139$' },
    features: ['Diseño mas trabajado segun tu estetica.', 'Secciones adicionales(Servicio, contacto, sobre vos, etc.)', 'Imagenes mejor presentadas.', 'Ajustes antes de publicar.', 'Preparada para compañas y anuncios.', 'Estructura pensada para generar mas consultas.'],
    idealFor: 'Ideal para: Negocios que necesitan una web mas profesional y conveniente.',
    buttonText: 'Elegir plan'
  },
];

const Plans: React.FC = () => {
  return (
    <section id="planes" className="py-20 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">Elegí tu velocidad</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary">
            Planes pensados según tu urgencia. Todos sin gastos mensuales ni dependencias.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PlanCard plan={plans[0]} index={0} />
          <PlanCard plan={plans[1]} isFeatured index={1} />
          <PlanCard plan={plans[2]} index={2} />
        </div>
      </div>
    </section>
  );
};

export default Plans;