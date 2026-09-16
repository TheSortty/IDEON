import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Carousel, { CarouselImage } from '../ui/Carousel';
import { revealContainer, revealItem, revealViewport } from '../ui/motion';
import { openWhatsApp } from '../../constants/contact';

// CASE STUDIES SECTION
const homeImages: CarouselImage[] = [
  { src: '/casos/home/home-01-coaching.webp', alt: 'Sitio público: sección de Coaching Individual, con agenda de primera sesión.' },
  { src: '/casos/home/home-02-certificacion.webp', alt: 'Certificación en Coaching, con los avales institucionales a la vista.' },
  { src: '/casos/home/home-03-coaches.webp', alt: 'Carrusel del equipo de coaches, con enlace directo a cada perfil.' },
  { src: '/casos/home/home-04-campus-programa.webp', alt: 'Campus: vista del programa con módulos, talleres y progreso del alumno.' },
  { src: '/casos/home/home-05-campus-clase.webp', alt: 'Campus: clase con video y temario completo del módulo al costado.' },
  { src: '/casos/home/home-06-campus-admin.webp', alt: 'Panel de administración: gestión de cursos, módulos y equipo de coaches.' },
];

const cases = [
  {
    name: 'Home',
    subtitle: 'Campus de coaching',
    industry: 'Educación / Coaching',
    description: 'Plataforma de campus virtual para una institución de coaching, con toda la experiencia del alumno resuelta adentro: acceso a contenidos, seguimiento y comunicación, sin depender de plataformas genéricas de terceros.',
    images: homeImages,
    domain: 'siendohome.com',
    url: 'https://siendohome.com',
    whatsappMessage: 'Hola Ideon, vi el proyecto de Home (siendohome.com) y quiero algo similar para mi negocio.',
  },
  {
    name: 'Under Club',
    subtitle: 'Plataforma para clubes nocturnos y RRPP',
    industry: 'Entretenimiento / Nightlife',
    description: 'Sistema a medida para clubes nocturnos y relacionistas públicos (RRPP) que cobran comisión por entrada: gestión de ventas, seguimiento de comisiones y operación pensada para un rubro con reglas muy específicas que ninguna plantilla genérica resuelve.',
    images: [] as CarouselImage[],
    domain: 'underclub.com.ar',
    url: 'https://underclub.com.ar',
    whatsappMessage: 'Hola Ideon, vi el proyecto de Under Club (underclub.com.ar) y quiero algo similar para mi negocio.',
  },
];

const CaseStudies: React.FC = () => {
  return (
    <section id="casos" className="section-alt relative z-10 scroll-mt-24">
      <div className="container-site">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-extrabold text-content">Empresas que confían en nosotros</h2>
          <p className="mt-4 text-lg text-content-muted">
            Proyectos en producción, con clientes reales usándolos hoy.
          </p>
        </div>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {cases.map((project) => (
            <motion.div
              key={project.name}
              variants={revealItem}
              className="surface-card p-8 flex flex-col hover:border-line-strong hover:-translate-y-1 transition-[transform,border-color] duration-medium ease-out-token"
            >
              {project.images.length > 0 && (
                <div className="mb-6">
                  <Carousel images={project.images} />
                </div>
              )}

              <span className="self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-200">
                {project.industry}
              </span>

              <h3 className="mt-6 text-2xl font-extrabold text-content">
                {project.name} <span className="text-content-muted font-bold">— {project.subtitle}</span>
              </h3>

              <p className="mt-4 flex-grow text-content-muted">
                {project.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
                <Button
                  variant="outline"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar el proyecto de ${project.name} en ${project.domain}`}
                >
                  Visitar proyecto →
                </Button>
                <Button
                  variant="outline"
                  className="sm:ml-auto"
                  onClick={() => openWhatsApp(project.whatsappMessage)}
                >
                  Quiero algo similar →
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
