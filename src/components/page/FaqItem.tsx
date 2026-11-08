import React from 'react';
import Icon from '../ui/Icon';
import type { Faq } from '../../constants/services';

/** Una pregunta con <details>: se abre sin JS y el texto está en el HTML. */
const FaqItem: React.FC<{ faq: Faq; open?: boolean; hidden?: boolean }> = ({ faq, open, hidden }) => (
  <details
    open={open}
    hidden={hidden}
    className="faq-item group glass rounded-2xl transition-[border-color,background-color,box-shadow,transform] duration-long ease-emphasis hover:-translate-y-0.5 hover:border-line-strong open:border-accent/50 open:bg-accent/[0.08] open:shadow-[0_0_40px_rgb(var(--accent)/0.16)]"
  >
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[26px] py-[22px] text-lg font-bold text-content">
      {faq.question}
      <Icon name="chevronDown" size={20} className="faq-chev flex-shrink-0 transition-transform duration-long ease-emphasis" />
    </summary>
    <p className="px-[26px] pb-6 text-base leading-relaxed text-content-muted">{faq.answer}</p>
  </details>
);

export default FaqItem;
