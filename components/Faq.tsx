import React from 'react';

// FAQ SECTION
const faqs = [
  {
    question: '¿Incluye dominio y hosting?',
    answer: 'No, para darte 100% de propiedad, te ayudamos a configurarlo en tu propia cuenta de hosting (como Hostinger, Vercel o Netlify). El dominio también lo registrás a tu nombre.',
  },
  {
    question: '¿Hacen mantenimiento?',
    answer: 'No ofrecemos planes de mantenimiento mensual. El concepto es "handoff total": te entregamos el proyecto completo y es 100% tuyo, sin dependencias ni costos recurrentes.',
  },
  {
    question: '¿Puedo pedir cambios después de la entrega?',
    answer: 'Cada plan incluye una ronda de revisión para pulir detalles antes de la entrega final. Cualquier cambio o ajuste solicitado después del handoff se cotiza como un nuevo trabajo.',
  },
  {
    question: '¿El sitio sirve para correr ads?',
    answer: '¡Absolutamente! Todos nuestros planes incluyen la configuración de Google Analytics 4 y Meta Pixel, y están diseñados con un enfoque en la conversión para maximizar el retorno de tu inversión publicitaria.',
  },
  {
    question: '¿Qué pasa si no tengo textos ni imágenes?',
    answer: 'Para no demorar la entrega, podemos utilizar textos ("copy") e imágenes de stock genéricos de alta calidad, que vos pre-aprobás al inicio del proyecto. Luego, podés reemplazarlos fácilmente.',
  },
  {
    question: '¿Cómo es el proceso de pago?',
    answer: 'El pago se realiza en dos partes (50/50). Un 50% por adelantado para confirmar el proyecto e iniciar el trabajo, y el 50% restante contra entrega final del sitio y el handoff de todos los archivos.',
  },
];

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <details className="group border-b border-slate-200 dark:border-slate-700 py-4">
        <summary className="flex items-center justify-between cursor-pointer list-none">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 group-hover:text-[#b900de] transition-colors">{question}</h3>
            <span className="text-[#b900de] transition-transform duration-300 transform group-open:-rotate-180">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
        </summary>
        <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 opacity-0 group-open:max-h-96 group-open:opacity-100">
            <p className="mt-4 text-slate-600 dark:text-slate-400">
                {answer}
            </p>
        </div>
    </details>
);

const Faq: React.FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">Preguntas Frecuentes</h2>
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