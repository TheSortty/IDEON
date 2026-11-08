import React from 'react';
import Icon from '../ui/Icon';
import SpotlightCard from '../ui/SpotlightCard';
import type { IconCard as IconCardData } from '../../constants/services';

/** Tarjeta con ícono, título y bajada (con la luz que sigue al cursor). */
const IconCard: React.FC<{ item: IconCardData; compact?: boolean; className?: string }> = ({ item, compact, className }) => (
  <SpotlightCard className={className ?? (compact ? 'p-7' : 'p-[30px]')}>
    <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-accent/35 bg-accent/15 text-accent">
      <Icon name={item.icon} />
    </span>
    <h3 className={compact ? 'mt-3 text-[19px] font-bold text-content' : 'mt-3 font-bold text-content'}>{item.title}</h3>
    <p className="mt-3 text-[15px] leading-relaxed text-content-muted">{item.description}</p>
  </SpotlightCard>
);

export default IconCard;
