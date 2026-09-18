// Preguntas frecuentes de la home.
//
// Viven acá y no en el componente porque además de renderizarse se publican
// como Schema FAQPage (ver src/pages/Home/HomePage.tsx). Si cambia una
// respuesta, cambia en los dos lados a la vez.

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: readonly Faq[] = [
  {
    question: '¿Incluye dominio y hosting?',
    answer: 'Sí, te regalamos el primer año de hosting para que arranques sin costos extra. El dominio se registra a tu nombre y queda 100% tuyo. A partir del segundo año, podés renovarlo por tu cuenta o pedirnos ayuda — vos elegís. Sin permanencia, sin sorpresas.',
  },
  {
    question: '¿Hacen mantenimiento mensual?',
    answer: 'No es obligatorio. La web queda a tu nombre, sin costos fijos ni dependencias. Si más adelante querés agregar o modificar algo, se cotiza como trabajo puntual o podés sumar un plan de horas mensuales.',
  },
  {
    question: '¿Puedo pedir cambios después de la entrega?',
    answer: 'Sí. Cada plan incluye una ronda de ajustes antes del lanzamiento. Los cambios posteriores se cotizan como trabajo nuevo, o se resuelven dentro de las horas incluidas si tenés un plan de mantenimiento activo.',
  },
  {
    question: '¿De quién es el código y el diseño final?',
    answer: 'Tuyo. No hay lock-in: el dominio se registra a tu nombre y el código te pertenece desde la entrega. Si el día de mañana querés llevarte tu web a otro lado, podés hacerlo.',
  },
  {
    question: '¿Qué pasa si el resultado no me convence?',
    answer: 'Por eso hay una reunión inicial donde dejamos el alcance y el estilo por escrito antes de empezar, y una ronda de ajustes incluida antes de publicar. La idea es que no haya sorpresas al final.',
  },
  {
    question: '¿Sirve para hacer campañas de Ads?',
    answer: 'Sí. Todas las webs se entregan preparadas para campañas: botón directo a WhatsApp, estructura clara y carga rápida. Además, contamos con especialista en Meta Ads dentro del equipo para ayudarte a arrancar la pauta bien desde el principio.',
  },
  {
    question: '¿Qué pasa si no tengo textos o imágenes?',
    answer: 'Para no frenar el proyecto, podemos redactar contenido de calidad que aprobás antes de publicar. Después podés reemplazarlo cuando quieras.',
  },
  {
    question: '¿Cómo es el proceso de pago?',
    answer: 'El pago se divide en dos partes: 25% para iniciar el proyecto y 75% al publicar la web y entregar todos los accesos.',
  },
];
