import React from 'react';
import { ROTATOR } from '../../constants/home';

// "Y más..." cierra la lista: en una franja que no termina, va como un ítem más.
const WORDS = ROTATOR.words;

const Track: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <ul className="marquee-track m-0 list-none p-0" aria-hidden={hidden || undefined}>
    {WORDS.map((word) => (
      <li key={word} className="flex items-center whitespace-nowrap">
        <span className="px-[clamp(18px,2.4vw,40px)] text-[clamp(22px,2.6vw,40px)] font-black tracking-[-0.02em]">{word}</span>
        <span aria-hidden="true" className="text-[clamp(16px,1.6vw,24px)] opacity-70">
          ✦
        </span>
      </li>
    ))}
  </ul>
);

/**
 * Franja en movimiento debajo del inicio, de borde a borde, en magenta plano,
 * con los servicios. El loop es CSS (corre sin JS) y se pausa al pasar el
 * mouse; con "reducir movimiento" queda quieta. La segunda pista es la copia
 * del loop y va oculta para los lectores de pantalla.
 */
const ServicesMarquee: React.FC = () => (
  <div
    className="marquee border-y border-black/10 bg-accent-solid py-[clamp(16px,2vw,26px)] text-accent-ink"
  >
    <Track />
    <Track hidden />
  </div>
);

export default ServicesMarquee;
