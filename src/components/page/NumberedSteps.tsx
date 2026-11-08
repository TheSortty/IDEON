import React from 'react';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';
import type { Step } from '../../constants/services';

/** Lista vertical de pasos numerados ("Cómo cotizamos", "Cómo lo hacemos"). */
const NumberedSteps: React.FC<{ steps: readonly Step[] }> = ({ steps }) => (
  <Reveal>
    <ol className="m-0 flex list-none flex-col gap-3 p-0">
      {steps.map((step, i) => (
        <SpotlightCard as="li" key={step.title} className="rounded-[18px] p-6">
          <div className="flex gap-5">
            <span className="text-gradient text-[32px] font-black leading-none">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <strong className="mb-1 block text-[17px] text-content">{step.title}</strong>
              <span className="text-[15px] leading-relaxed text-content-muted">{step.description}</span>
            </span>
          </div>
        </SpotlightCard>
      ))}
    </ol>
  </Reveal>
);

export default NumberedSteps;
