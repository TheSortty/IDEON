import React from 'react';
import { motion } from 'framer-motion';

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
    <section id="porque" className="bg-transparent py-12 sm:py-16 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">Oportunidades de crecimiento</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary">
            Entender las reglas del juego digital es el primer paso para dejar de regalar clientes a tu competencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8"
            >
              <h3 className="text-xl font-bold text-[#111] dark:text-brand-text-primary mb-3">{topic.question}</h3>
              <p className="text-base text-gray-600 dark:text-brand-text-secondary">{topic.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyYouNeedThis;
