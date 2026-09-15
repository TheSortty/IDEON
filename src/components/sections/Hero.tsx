import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

// HERO SECTION
const Hero: React.FC = () => {

  const handleScrollToCases = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('casos');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden scroll-mt-24">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
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

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-accent mb-5">
              Diseño + desarrollo + estrategia
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-content">
              <span className="block">Impulsá tu negocio con tecnología a medida.</span>
              <span className="block text-gradient mt-2">Tu idea, nuestro desarrollo.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-content-muted max-w-xl mx-auto lg:mx-0">
              Creamos páginas web y sistemas pensados para ganar posicionamiento, ahorrar tiempo y aumentar eficiencia operativa. Ideas claras y asesoramiento de calidad.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  className="w-full sm:w-auto shadow-[0_0_20px_rgba(212,0,255,0.5)] hover:shadow-[0_0_30px_rgba(212,0,255,0.7)] transition-shadow duration-200"
                  onClick={handleScrollToCases}
                >
                  Consultar proyectos →
                </Button>
              </motion.div>
            </div>
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
              {/* Producto real, no foto de stock: los dos encuadres son capturas
                  del campus de coaching que también se ve en #casos, montadas en
                  marcos de navegador. El PNG tiene fondo transparente, así que se
                  apoya sobre el fondo de la página y no necesita ni panel de
                  vidrio ni borde propio.
                  Dos encuadres reales vía <picture>, no la misma imagen escalada:
                  en mobile va una sola ventana y un recorte más bajo. */}
              <picture>
                <source media="(max-width: 768px)" srcSet="/hero/hero-mobile.webp" type="image/webp" />
                <img
                  className="w-full h-auto"
                  src="/hero/hero-desktop.webp"
                  alt="Campus virtual desarrollado por IDEON para una institución de coaching: la vista del programa del alumno, con progreso y módulos, y el panel de administración desde el que se gestionan cursos y coaches."
                  fetchPriority="high"
                  width={1520}
                  height={802}
                />
              </picture>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;