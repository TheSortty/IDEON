import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS } from '../../constants/faq';

// FAQ SECTION

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-brand-surface py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left group focus:outline-none"
      >
        <h3 className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-accent' : 'text-content group-hover:text-accent'}`}>
          {question}
        </h3>
        <span className="relative flex items-center justify-center w-8 h-8">
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`text-accent`}
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
            <p className="mt-4 text-content-muted pb-2">
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
    <section id="faq" className="scroll-mt-24">
      <div className="container-site">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-extrabold text-content">Preguntas Frecuentes</h2>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;