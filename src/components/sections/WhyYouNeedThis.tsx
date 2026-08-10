import React from 'react';
import { motion } from 'framer-motion';

// WHY YOU NEED THIS — sección educativa
const topics = [
  {
    question: '¿Por qué tener tu propia página web?',
    answer: 'Una red social te la puede suspender, cambiar el alcance o desaparecer de un día para el otro, y nunca es realmente tuya. Tu propia web es el único lugar online que te pertenece por completo: vos decidís qué mostrar, cómo se ve y quién la administra.',
  },
  {
    question: '¿Por qué importa tener presencia online?',
    answer: 'Hoy, antes de comprarte o contratarte, casi cualquier cliente te busca en Google o en redes. Si no aparecés, o aparecés mal, esa decisión ya se tomó sin vos — a favor de otro que sí tenía dónde mostrarse.',
  },
  {
    question: '¿Qué es el SEO y por qué importa?',
    answer: 'SEO es simplemente lo que hace que tu web aparezca cuando alguien busca lo que vos ofrecés, sin tener que pagar publicidad para eso. No es magia ni es inmediato, pero es la diferencia entre depender solo de la pauta paga o tener gente que te encuentra sola, todos los meses, gratis.',
  },
  {
    question: '¿Por qué una agencia y no una plataforma prefabricada (tipo Tiendanube o Wix)?',
    answer: 'Una plantilla es más barata al arrancar, pero te deja con un sitio genérico, sin nadie detrás y con límites técnicos duros apenas tu negocio crece. Con Ideon pagás por un sitio propio, hecho a medida de tu negocio y con un equipo real que lo sostiene — no por una casilla más en un catálogo de miles de sitios iguales.',
  },
];

const WhyYouNeedThis: React.FC = () => {
  return (
    <section id="porque" className="bg-transparent py-20 sm:py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111] dark:text-brand-text-primary">Por qué necesitás esto</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-brand-text-secondary">
            Esta sección no vende directamente — te ayuda a entender por qué lo que vendemos importa, sin tecnicismos.
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
