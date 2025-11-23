import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// FAQ SECTION
const faqs = [
  {
    question: '¿Incluye dominio y hosting?',
    answer: 'Para que tengas propiedad total, el hosting se configura en tu propia cuenta y el dominio se registra a tu nombre. No están incluidos en los planes, pero si necesitás ayuda, lo hacemos juntos.',
  },
  {
    question: '¿Hacen mantenimiento mensual?',
    answer: 'No cobramos mantenimiento mensual. La web queda a tu nombre, sin costos fijos ni dependencias. Si más adelante querés agregar o modificar algo, se cotiza como un trabajo puntual.',
  },
  {
    question: '¿Puedo pedir cambios después de la entrega?',
    answer: 'Sí. Cada plan incluye una ronda de ajustes antes del lanzamiento. Los cambios posteriores se cotizan como un nuevo trabajo entregable.',
  },
  {
    question: '¿Sirve para hacer anuncios?',
    answer: 'Sí. Todas las webs se entregan preparadas para campañas y pensadas para convertir mejor: botón a WhatsApp, estructura clara y carga rápida.',
  },
  {
    question: '¿Qué pasa si no tengo textos o imágenes?',
    answer: 'Para no frenar el proyecto, podemos crear contenido de alta calidad que aprobás antes de publicar. Después podés reemplazarlo cuando quieras.',
  },
  {
    question: '¿Cómo es el proceso de pago?',
    answer: 'El pago se divide en dos partes: 50% para iniciar el proyecto y 50% al publicar la web y entregar los accesos.',
  },
];

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-brand-surface py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left group focus:outline-none"
      >
        <h3 className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-gray-800 dark:text-brand-text-primary group-hover:text-brand-primary'}`}>
          {question}
        </h3>
        <span className="relative flex items-center justify-center w-8 h-8">
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`text-brand-primary`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </motion.span>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.98 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-gray-600 dark:text-brand-text-secondary pb-2">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq: React.FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">Preguntas Frecuentes</h2>
        </div>
        <div className="mt-12">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;