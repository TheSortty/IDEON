import React from 'react';
import { motion } from 'framer-motion';
import { revealContainer, revealItem, revealViewport, revealTransition } from '../ui/motion';

// WHY YOU NEED THIS — sección educativa
const topics = [
  {
    question: 'Web vs Redes Sociales',
    answer: 'Una red social puede cambiar el algoritmo, bajar tu alcance o cerrarte la cuenta de un día para el otro, y todo tu esfuerzo desaparece. Tu página web es tu único activo digital real: vos ponés las reglas, vos controlás la imagen y nadie te la puede quitar.',
  },
  {
    question: 'Presencia Online',
    answer: 'Hoy, la decisión de compra se toma buscando en Google antes de siquiera mandar un mensaje. Si alguien busca lo que ofrecés y no aparecés o tenés una presencia desactualizada, esa venta se la lleva automáticamente el competidor que sí se muestra mejor.',
  },
  {
    question: 'SEO',
    answer: 'El SEO (posicionamiento en buscadores) es lo que hace que te sigan encontrando de forma natural. Es la diferencia entre pagar pauta publicitaria todos los meses o tener un sistema que atrae clientes gratis las 24 horas.',
  },
  {
    question: 'Agencia vs plantillas',
    answer: 'Usar plantillas (como Wix o Tiendanube) sirve para salir del paso, pero te encasillan. Te dejan con un sitio genérico y límites técnicos que frenan tu crecimiento. Con IDEON no alquilás una plantilla más del catálogo; tenés una web a medida y un equipo real respaldando tu negocio.',
  },
];

const WhyYouNeedThis: React.FC = () => {
  return (
    <section id="porque" className="bg-transparent relative z-10">
      <div className="container-site">
        {/* Única sección pinneada del sitio: en desktop el título y el contexto
            quedan fijos a la izquierda mientras las tarjetas pasan a la derecha.
            position: sticky nativo, sin librería. */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={revealTransition}
            className="pinned-intro text-center lg:text-left mb-12 lg:mb-0 lg:col-span-4"
          >
            <h2 className="font-extrabold text-content">Oportunidades de crecimiento</h2>
            <p className="mt-4 text-lg text-content-muted">
              Entender las reglas del juego digital es el primer paso para dejar de regalar clientes a tu competencia.
            </p>
          </motion.div>

          <motion.div
            variants={revealContainer}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:col-span-8"
          >
            {topics.map((topic) => (
              <motion.div
                key={topic.question}
                variants={revealItem}
                className="surface-card p-8 hover:border-line-strong hover:-translate-y-1 transition-[transform,border-color] duration-medium ease-out-token"
              >
                <h3 className="text-xl font-bold text-content mb-3">{topic.question}</h3>
                <p className="text-base text-content-muted">{topic.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyYouNeedThis;
