import React from 'react';
import FaqItem from './FaqItem';
import Reveal from '../ui/Reveal';
import type { Faq } from '../../constants/services';

interface FaqListProps {
  id: string;
  title: string;
  faqs: readonly Faq[];
}

// Preguntas con <details>: se abren sin JS y el texto está en el HTML (lo
// lee Google). Las mismas preguntas van al JSON-LD de la página (FAQPage).
const FaqList: React.FC<FaqListProps> = ({ id, title, faqs }) => (
  <section id={id} className="pb-[120px]">
    <Reveal className="mx-auto flex max-w-[880px] flex-col gap-3 px-6">
      <h2 className="mb-3 text-[clamp(1.625rem,3vw,2.25rem)] font-extrabold text-content">{title}</h2>
      {faqs.map((faq) => (
        <FaqItem key={faq.question} faq={faq} />
      ))}
    </Reveal>
  </section>
);

export default FaqList;
