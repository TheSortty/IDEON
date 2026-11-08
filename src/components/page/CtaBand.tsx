import React from 'react';
import Reveal from '../ui/Reveal';

interface CtaBandProps {
  title: string;
  text?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

/**
 * Franja de llamado a la acción (fondo oscuro de marca con luces magenta y
 * azul). Es oscura en los dos temas: el texto va siempre en los claros de
 * la marca.
 */
const CtaBand: React.FC<CtaBandProps> = ({ title, text, children, id, className = 'pb-10 pt-6' }) => (
  <section id={id} className={className}>
    <div className="container-site">
      <Reveal className="cta-band relative flex flex-col items-center gap-[22px] overflow-hidden rounded-[32px] border border-brand-text-primary/15 px-6 py-[clamp(44px,6vw,84px)] text-center shadow-[0_0_60px_rgb(var(--accent)/0.2)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-[140px] left-1/2 -ml-[230px] h-[460px] w-[460px] animate-orb rounded-full bg-brand-primary opacity-[0.22] blur-[90px]"
        />
        <h2 className="relative max-w-[780px] font-extrabold text-brand-text-primary">{title}</h2>
        {text && <p className="relative max-w-[560px] text-lg leading-relaxed text-brand-text-primary/80">{text}</p>}
        <div className="relative flex flex-wrap justify-center gap-3.5">{children}</div>
      </Reveal>
    </div>
  </section>
);

export default CtaBand;

/** Clases para un botón secundario sobre la franja (que siempre es oscura). */
export const ON_BAND_GHOST = 'border-brand-text-primary/20 bg-brand-text-primary/5 text-brand-text-primary';
