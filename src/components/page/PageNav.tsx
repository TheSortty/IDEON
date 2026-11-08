import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

interface PageNavProps {
  items: readonly { id: string; label: string }[];
}

/**
 * "En esta página": píldora fija debajo del header con las secciones. Marca
 * la sección que se está leyendo y, en celular, se desplaza sola para que el
 * link activo quede a la vista.
 */
const PageNav: React.FC<PageNavProps> = ({ items }) => {
  const [active, setActive] = useState<string | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = Math.min(window.innerHeight * 0.35, 320);
      let current: string | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Al llegar al final de la página, la última sección queda activa.
      const last = document.getElementById(items[items.length - 1].id);
      if (last && last.getBoundingClientRect().bottom <= window.innerHeight + 4) current = items[items.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  useEffect(() => {
    const inner = innerRef.current;
    const link = active ? inner?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    if (inner && link && inner.scrollWidth > inner.clientWidth) {
      inner.scrollTo({ left: link.offsetLeft - (inner.clientWidth - link.offsetWidth) / 2, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <nav
      aria-label="En esta página"
      className="pointer-events-none sticky top-[calc(var(--nav-h)+12px)] z-30 -mt-7 mb-2 flex justify-center px-4"
    >
      <div
        ref={innerRef}
        className="pointer-events-auto flex max-w-full gap-1 overflow-x-auto rounded-full border border-line-strong bg-[var(--popover)] p-1.5 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.5)] [scrollbar-width:none]"
      >
        {items.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            data-id={id}
            aria-current={active === id ? 'true' : undefined}
            className={cn(
              'page-nav-link inline-flex min-h-[38px] flex-shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm font-semibold text-content-muted no-underline transition-[color,background-color,box-shadow] duration-long hover:bg-content/[0.08] hover:text-content',
              active === id && 'is-on',
            )}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default PageNav;
