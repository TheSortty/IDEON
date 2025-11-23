import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { useModal } from '../contexts/ModalContext';

const Cta: React.FC = () => {
  const { openModal } = useModal();

  return (
    <section id="contacto" className="py-20 sm:py-24 relative overflow-hidden bg-gray-50 dark:bg-brand-background transition-colors duration-300">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-brand-background dark:to-brand-surface -z-20"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 -z-10"></div>

      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-y-1/2"></div>

      {/* LED Bars */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent shadow-[0_0_10px_rgba(212,0,255,0.5)]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

      {/* Decorative SVGs */}
      <svg className="absolute top-10 left-10 w-24 h-24 text-gray-300 dark:text-white/5" viewBox="0 0 100 100" fill="currentColor">
        <rect x="0" y="0" width="20" height="20" />
        <rect x="40" y="0" width="20" height="20" />
        <rect x="80" y="0" width="20" height="20" />
        <rect x="0" y="40" width="20" height="20" />
        <rect x="80" y="40" width="20" height="20" />
        <rect x="0" y="80" width="20" height="20" />
        <rect x="40" y="80" width="20" height="20" />
        <rect x="80" y="80" width="20" height="20" />
      </svg>
      <svg className="absolute bottom-10 right-10 w-32 h-32 text-gray-300 dark:text-white/5 rotate-180" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            ¿Tenés una idea? <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-purple-600 dark:to-white">La lanzamos hoy.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary max-w-2xl mx-auto mb-10">
            Compartí lo que necesitás y activamos tu web en tiempo récord.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={() => openModal()} className="text-lg px-10 py-5 shadow-[0_0_30px_rgba(212,0,255,0.4)] hover:shadow-[0_0_50px_rgba(212,0,255,0.6)] transition-shadow duration-300">
              Lanzar mi página
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;