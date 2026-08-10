import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { openWhatsApp } from '../../constants/contact';

// HERO SECTION
const Hero: React.FC = () => {

  const handleScrollToCases = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('casos');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brand-primary mb-5">
              Diseño + desarrollo + estrategia, en un solo equipo
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111] dark:text-brand-text-primary">
              <span className="block">Tu web, hecha por un equipo real —</span>
              <span className="block text-gradient">no una plantilla ni un contrato eterno.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-brand-text-secondary max-w-xl mx-auto lg:mx-0">
              Sitios y sistemas a medida, con diseño, código, dominio y SSL en un solo número. Sin letra chica, sin mensualidad obligatoria: vos sabés qué pagás, qué recibís y con quién hablás en cada paso.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  className="w-full sm:w-auto shadow-[0_0_20px_rgba(212,0,255,0.5)] hover:shadow-[0_0_30px_rgba(212,0,255,0.7)] transition-shadow duration-200"
                  onClick={() => openWhatsApp('Hola Ideon, quiero mi web. ¿Me pasan más información?')}
                >
                  Quiero mi web →
                </Button>
              </motion.div>
            </div>
            <p className="mt-5 text-sm text-gray-500 dark:text-brand-text-secondary">
              Ya lo hicimos:{' '}
              <a
                href="#casos"
                onClick={handleScrollToCases}
                className="text-brand-primary font-semibold hover:underline underline-offset-4"
              >
                mirá siendohome.com y underclub.com.ar →
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-12 lg:mt-0 lg:col-span-6"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              <div className="relative rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
                <img className="w-full opacity-90 hover:opacity-100 transition-opacity duration-200" src="https://seranking.com/es/blog/wp-content/uploads/sites/13/2020/04/750-X-400-2x.jpg" alt="Mockup de landing page en laptop y móvil" />

                {/* Floating badge example */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-6 bg-brand-surface border border-brand-primary/30 p-4 rounded-xl shadow-lg hidden sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-brand-text-primary">Proyectos en producción</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;