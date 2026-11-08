import React from 'react';
import Icon from '../ui/Icon';
import BrowserFrame from './BrowserFrame';

const PRODUCTS = [
  { bar: 'w-[80%]', tint: 'from-brand-primary' },
  { bar: 'w-[70%]', tint: 'from-accent-2' },
  { bar: 'w-[85%]', tint: 'from-brand-primary-hover' },
];

interface StoreMockProps {
  brand: readonly [string, string];
  orderLabel: string;
}

// Tienda online de muestra con el aviso de "Nuevo pedido" flotando al costado.
const StoreMock: React.FC<StoreMockProps> = ({ brand, orderLabel }) => (
  <div className="relative">
    <BrowserFrame>
      <div className="mock-screen flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-lg font-black">
            {brand[0]}
            <span className="text-brand-primary">{brand[1]}</span>
          </span>
          <span className="flex gap-2">
            <span className="h-2.5 w-[60px] rounded-full bg-brand-text-primary/15" />
            <span className="h-2.5 w-[60px] rounded-full bg-brand-text-primary/15" />
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="overflow-hidden rounded-xl bg-brand-text-primary/5">
              <div className={`h-[110px] bg-gradient-to-br ${p.tint} to-brand-surface opacity-80`} />
              <div className="flex flex-col gap-1.5 p-2.5">
                <span className={`h-2 rounded-full bg-brand-text-primary/25 ${p.bar}`} />
                <span className="h-2 w-[40%] rounded-full bg-brand-primary/60" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="h-[90px] rounded-xl bg-brand-text-primary/5" />
          <div className="h-[90px] rounded-xl bg-brand-text-primary/5" />
          <div className="h-[90px] rounded-xl bg-brand-text-primary/5" />
        </div>
      </div>
    </BrowserFrame>
    <div
      aria-hidden="true"
      className="absolute -right-[18px] top-[70px] flex animate-float items-center gap-3 rounded-2xl border border-line-strong bg-[var(--popover)] px-[18px] py-3.5 shadow-[0_20px_40px_-16px_rgb(0_0_0/0.5)]"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-accent/35 bg-accent/15 text-accent">
        <Icon name="cart" size={18} />
      </span>
      <span className="text-sm font-bold text-content">{orderLabel}</span>
    </div>
  </div>
);

export default StoreMock;
