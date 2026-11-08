import React from 'react';
import type { ServiceSlug } from '../../constants/services';

const BARS = [40, 65, 50, 80, 60, 92];

/**
 * Mini ilustración animada para las tarjetas de servicios (recurso B, en
 * lugar de un ícono): una pantallita con el producto armándose. Reutiliza las
 * mismas piezas que los mockups grandes de cada página.
 */
const MiniMock: React.FC<{ kind: ServiceSlug }> = ({ kind }) => (
  <div aria-hidden="true" className="mock-screen h-[132px] p-3">
    <div className="mock-grid" />
    {kind === 'web' && (
      <div className="relative flex h-full flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="bk bk-accent b1 h-2.5 w-9" />
          <div className="bk bk-accent b2 h-3.5 w-10 !rounded-full" />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <div className="bk b3 h-2.5 w-[90%]" />
            <div className="bk b3 h-2.5 w-[70%]" />
            <div className="bk bk-line b4 !h-1.5 w-[85%]" />
            <div className="bk bk-accent b5 mt-1 h-3.5 w-12 !rounded-full" />
          </div>
          <div className="bk b6 h-full" />
        </div>
      </div>
    )}
    {kind === 'tienda' && (
      <div className="relative grid h-full grid-cols-3 gap-2">
        {['b1', 'b2', 'b3'].map((b) => (
          <div key={b} className={`bk ${b} flex flex-col gap-1 !bg-none p-1`}>
            <span className="tw-cat block h-[62px] rounded-md bg-gradient-to-br from-brand-primary/50 to-accent-2/30" />
            <span className="block h-1.5 w-[80%] rounded-full bg-brand-text-primary/25" />
            <span className="block h-1.5 w-[45%] rounded-full bg-brand-primary/60" />
          </div>
        ))}
      </div>
    )}
    {kind === 'sistemas' && (
      <div className="relative grid h-full grid-cols-[22px_1fr] gap-2">
        <div className="flex flex-col gap-1.5">
          <span className="bk dash-ic on b1 !h-4 !w-4" />
          <span className="bk dash-ic b2 !h-4 !w-4" />
          <span className="bk dash-ic b3 !h-4 !w-4" />
        </div>
        <div className="bk b2 flex items-end gap-1.5 rounded-lg p-2 !opacity-100">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="dash-bar"
              style={{ '--h': `${h}%`, animationDelay: `${(i * 0.12).toFixed(2)}s` } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);

export default MiniMock;
