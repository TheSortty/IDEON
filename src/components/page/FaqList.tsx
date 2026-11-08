import React from 'react';
import Icon from '../ui/Icon';
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
        <details
          key={faq.question}
          className="faq-item group glass rounded-2xl transition-[border-color,background-color,box-shadow,transform] duration-long ease-emphasis hover:-translate-y-0.5 hover:border-line-strong open:border-accent/50 open:bg-accent/[0.08] open:shadow-[0_0_40px_rgb(var(--accent)/0.16)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[26px] py-[22px] text-lg font-bold text-content">
            {faq.question}
            <Icon name="chevronDown" size={20} className="faq-chev flex-shrink-0 transition-transform duration-long ease-emphasis" />
          </summary>
          <p className="px-[26px] pb-6 text-base leading-relaxed text-content-muted">{faq.answer}</p>
        </details>
      ))}
    </Reveal>
  </section>
);

export default FaqList;
