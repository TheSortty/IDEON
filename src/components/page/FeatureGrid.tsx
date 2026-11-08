import React, { useEffect, useRef, useState } from 'react';
import Icon from '../ui/Icon';
import type { Feature } from '../../constants/services';

const STEP_MS = 1080;

/**
 * Grilla de "qué incluye" (recurso B): mientras está en pantalla, las
 * tarjetas se encienden de a una, en orden, como en el diseño de Celeste.
 * El intervalo solo corre con la grilla visible y se apaga con "reducir
 * movimiento". Además conserva la luz del hover de las demás tarjetas.
 */
const FeatureGrid: React.FC<{ items: readonly Feature[] }> = ({ items }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: ReturnType<typeof setInterval> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && timer === null) {
          timer = setInterval(() => setActive((i) => (i + 1) % items.length), STEP_MS);
        } else if (!entry.isIntersecting && timer !== null) {
          clearInterval(timer);
          timer = null;
          setActive(-1);
        }
      },
      { rootMargin: '-10% 0px -10% 0px' },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer !== null) clearInterval(timer);
    };
  }, [items.length]);

  return (
    <ul ref={ref} className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-3 p-0">
      {items.map((item, i) => (
        <li
          key={item.label}
          data-active={active === i ? 'true' : 'false'}
          className="feat-card glass flex items-center gap-3.5 rounded-2xl px-[18px] py-4 text-[15px] font-medium leading-snug text-content transition-[transform,border-color,background-color,box-shadow] duration-long ease-emphasis"
        >
          <span className="feat-ico flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[11px] border border-accent/35 bg-accent/15 text-accent transition-[transform,background-color,box-shadow] duration-long ease-emphasis">
            <Icon name={item.icon} size={18} />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default FeatureGrid;
