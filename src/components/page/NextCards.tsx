import React from 'react';
import AppLink from '../ui/AppLink';
import Icon, { type IconName } from '../ui/Icon';
import Reveal from '../ui/Reveal';
import SpotlightCard from '../ui/SpotlightCard';
import { EXPLORE, SERVICE_LINES, type ServiceSlug } from '../../constants/services';
import { NAV_ITEMS } from '../../constants/navigation';
import { resolveNav } from '../../routes';

/** "Seguí explorando": las otras dos líneas de servicio y los proyectos. */
const NextCards: React.FC<{ current: ServiceSlug }> = ({ current }) => {
  const casos = NAV_ITEMS.find((item) => item.id === 'casos');
  const casosHref = casos ? resolveNav(casos) : null;

  const cards: { to: string; icon: IconName; title: string; short: string }[] = SERVICE_LINES.filter(
    (line) => line.slug !== current,
  ).map((line) => ({ to: line.path, icon: line.icon, title: line.title, short: line.short }));
  if (casosHref) cards.push({ to: casosHref, icon: 'grid', title: EXPLORE.projects.title, short: EXPLORE.projects.short });

  return (
    <section className="pb-8 pt-6">
      <Reveal className="container-site flex flex-col gap-5">
        <h2 className="text-[clamp(1.375rem,2.4vw,1.75rem)] font-extrabold text-content">{EXPLORE.title}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4">
          {cards.map((card) => (
            <SpotlightCard key={card.title} className="group">
              <AppLink to={card.to} className="flex items-center gap-4 px-6 py-[22px] text-content no-underline">
                <span className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[14px] border border-accent/35 bg-accent/15 text-accent">
                  <Icon name={card.icon} />
                </span>
                <span className="flex flex-col gap-0.5">
                  <strong className="text-[17px]">{card.title}</strong>
                  <span className="text-sm text-content-muted">{card.short}</span>
                </span>
                <span className="ml-auto flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line-strong bg-content/[0.06] transition-[transform,background-color,border-color] duration-long ease-emphasis group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent/35">
                  <Icon name="arrowUpRight" size={18} />
                </span>
              </AppLink>
            </SpotlightCard>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default NextCards;
