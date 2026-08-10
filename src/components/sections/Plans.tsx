import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useModal } from '../../contexts/ModalContext';
import { openWhatsApp } from '../../constants/contact';

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
          + Elegido
        </div>
      )}

      <div className="flex items-center justify-start mb-2 gap-3">
        <h3 className="text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">{plan.name}</h3>
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${isFeatured ? 'bg-brand-primary text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200'}`}>
          {plan.tag}
        </span>
      </div>

      <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">{plan.description}</p>

      <div className="mt-6">
        <span className="text-2xl font-bold tracking-tight text-[#111] dark:text-brand-text-primary">Cotización a medida</span>
        <p className="mt-1 text-sm text-gray-500 dark:text-brand-text-secondary">Según el alcance real de tu proyecto.</p>
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
    name: 'Starter',
    tag: 'PRESENCIA',
    description: 'Para negocios que están arrancando y necesitan una presencia web profesional, clara y lista para recibir clientes.',
    includesText: null,
    features: [
      'Landing optimizada para conversión',
      'Diseño a medida de tu marca, incluido',
      'Formulario de contacto funcional',
      'Botón directo a WhatsApp',
      'Optimización para celular, tablet y desktop',
      'Publicación en tu propio dominio, con SSL',
      'Todo queda a tu nombre desde el día uno',
    ],
    idealFor: 'Ideal para: negocios que todavía no tienen web propia y necesitan un lugar serio adonde mandar a sus clientes.',
    buttonText: 'Quiero mi cotización'
  },
  {
    name: 'Pro',
    tag: 'MÁS ALCANCE',
    description: 'Para proyectos con más de una sección o funcionalidad, que necesitan acompañamiento durante el desarrollo.',
    includesText: 'Incluye todo lo del plan Starter, más:',
    features: [
      'Varias secciones o funcionalidades',
      'Acompañamiento durante todo el desarrollo',
      'Rondas de ajuste antes de publicar',
      'Más cercanía en el proceso, con avances a la vista',
    ],
    idealFor: 'Ideal para: proyectos que ya tienen algo de camino recorrido y necesitan más que una landing.',
    buttonText: 'Quiero mi cotización'
  },
  {
    name: 'Enterprise',
    tag: 'A MEDIDA',
    description: 'Para sistemas a medida, plataformas o proyectos con lógica propia de negocio, como los que ya construimos para Home y Under Club.',
    includesText: 'Incluye todo lo del plan Pro, más:',
    features: [
      'Sistemas y plataformas con lógica propia de negocio',
      'Prioridad máxima sobre el resto de los proyectos',
      'Comunicación directa durante todo el desarrollo',
      'Revisiones en vivo con vos',
    ],
    idealFor: 'Ideal para: negocios con reglas propias que ninguna plantilla genérica resuelve.',
    buttonText: 'Quiero mi cotización'
  },
];

const Plans: React.FC = () => {
  return (
    <section id="planes" className="py-20 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">Planes</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary">
            Nos adaptamos a tu presupuesto y a tu necesidad. Por eso no publicamos un precio fijo: te cotizamos a medida según el alcance real de tu proyecto, y vos decidís con toda la información en la mano.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PlanCard plan={plans[0]} index={0} />
          <PlanCard plan={plans[1]} isFeatured index={1} />
          <PlanCard plan={plans[2]} index={2} />
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-600 dark:text-brand-text-secondary">
            Diseño, desarrollo, dominio y certificado SSL van siempre incluidos en un solo número — nunca cotizamos el diseño aparte.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              className="shadow-[0_0_20px_rgba(212,0,255,0.4)] hover:shadow-[0_0_30px_rgba(212,0,255,0.6)] transition-shadow duration-200"
              onClick={() => openWhatsApp('Hola Ideon, quiero mi cotización. Te cuento sobre mi proyecto:')}
            >
              Quiero mi cotización →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;