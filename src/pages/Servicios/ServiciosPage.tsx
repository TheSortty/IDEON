import React from 'react';
import AppLink from '../../components/ui/AppLink';
import Icon from '../../components/ui/Icon';
import Reveal from '../../components/ui/Reveal';
import SpotlightCard from '../../components/ui/SpotlightCard';
import CtaBand from '../../components/page/CtaBand';
import NumberedSteps from '../../components/page/NumberedSteps';
import PageNav from '../../components/page/PageNav';
import PageShell from '../../components/page/PageShell';
import QuoteButton from '../../components/page/QuoteButton';
import MiniMock from '../../components/illustrations/MiniMock';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { SERVICE_LINES, SERVICIOS, SERVICIOS_META, type Plan } from '../../constants/services';
import { COTIZAR } from '../../constants/navigation';
import { isLivePath } from '../../routes';
import { cn } from '../../lib/cn';

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const featured = plan.featured === true;
  return (
    <SpotlightCard
      className={cn(
        'flex flex-col overflow-visible rounded-3xl p-9',
        featured && 'plan-featured border-2 border-transparent bg-surface-raised/70 shadow-[0_0_50px_rgb(var(--accent)/0.3)]',
      )}
    >
      {featured && (
        <span className="absolute -top-[15px] left-9 z-10 rounded-full bg-accent-solid px-4 py-1 text-[13px] font-bold text-accent-ink shadow-[0_0_20px_rgb(var(--accent)/0.5)]">
          {SERVICIOS.featuredBadge}
        </span>
      )}
      <div className="flex h-full flex-col gap-[22px]">
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-accent/35 bg-accent/15 text-accent">
          <Icon name={plan.icon} />
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-[34px] font-extrabold leading-tight text-content">{plan.name}</h2>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em]',
              featured ? 'bg-accent-solid text-accent-ink' : 'bg-content/10 text-content',
            )}
          >
            {plan.tag}
          </span>
        </div>
        <p className="text-base leading-relaxed text-content-muted">{plan.description}</p>
        {plan.includesFrom && <p className="text-sm font-bold text-accent-text">{plan.includesFrom}</p>}
        <ul className="check-list m-0 flex flex-grow list-none flex-col gap-3 p-0 text-[15px] leading-normal text-content">
          {plan.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p
          className={cn(
            'border-t pt-[18px] text-sm italic leading-relaxed text-content-muted',
            featured ? 'border-accent/25' : 'border-line',
          )}
        >
          {plan.idealFor}
        </p>
        <QuoteButton plan={plan.name} variant={featured ? 'primary' : 'outline'} className="w-full">
          {SERVICIOS.planCta}
        </QuoteButton>
      </div>
    </SpotlightCard>
  );
};

const ServiciosPage: React.FC = () => {
  useServicePageSeo(SERVICIOS_META);
  const [before, highlight, after] = SERVICIOS.title;

  return (
    <PageShell orb="center">
      <section className="pb-14 pt-[72px]">
        <div className="container-site flex flex-col items-center gap-[22px] text-center">
          <h1 className="max-w-[900px] animate-rise font-extrabold text-content">
            {before}
            <span className="text-gradient-pan animate-gradient-pan">{highlight}</span>
            {after}
          </h1>
        </div>
      </section>

      <PageNav items={SERVICIOS.pageNav} />

      <section id="planes" className="!pt-6">
        <Reveal className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-stretch gap-6 pt-4">
          {SERVICIOS.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </Reveal>
        <Reveal className="container-site mt-8">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-4">
            {SERVICIOS.trust.map((item) => (
              <SpotlightCard key={item.title} className="rounded-[18px] px-[22px] py-5">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-[11px] border border-accent/35 bg-accent/15 text-accent">
                    <Icon name={item.icon} size={18} />
                  </span>
                  <span className="flex flex-col gap-1">
                    <strong className="text-base text-content">{item.title}</strong>
                    <span className="text-sm text-content-muted">{item.description}</span>
                  </span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="servicios">
        <div className="container-site">
          <Reveal className="mb-12 max-w-[680px]">
            <h2 className="font-extrabold text-content">{SERVICIOS.linesTitle}</h2>
          </Reveal>
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            {SERVICE_LINES.map((line) => (
              <SpotlightCard key={line.slug} className="group rounded-[22px]">
                <AppLink to={line.path} className="flex h-full flex-col gap-5 p-6 text-content no-underline">
                  <MiniMock kind={line.slug} />
                  <span className="flex items-start gap-4">
                    <span className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[14px] border border-accent/35 bg-accent/15 text-accent">
                      <Icon name={line.icon} />
                    </span>
                    <span className="flex flex-col gap-2">
                      <span className="text-[21px] font-bold leading-tight">{line.title}</span>
                      <span className="text-base leading-relaxed text-content-muted">{line.description}</span>
                      <span className="link-underline inline-flex items-center gap-1.5 self-start text-[15px] font-bold text-accent-text">
                        {SERVICIOS.linesCta}
                        <span aria-hidden="true" className="transition-transform duration-long ease-emphasis group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </span>
                  </span>
                </AppLink>
              </SpotlightCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="cotizacion">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-14">
          <Reveal className="flex flex-col gap-[18px]">
            <h2 className="font-extrabold text-content">{SERVICIOS.quoteTitle}</h2>
            <QuoteButton className="self-start">{SERVICIOS.quoteCta}</QuoteButton>
          </Reveal>
          <NumberedSteps steps={SERVICIOS.quoteSteps} />
        </div>
      </section>

      <CtaBand title={SERVICIOS.ctaTitle} text={SERVICIOS.ctaText} className="pb-[120px] pt-6">
        <QuoteButton variant="light" size="lg">
          {isLivePath(COTIZAR.path) ? SERVICIOS.ctaButton : SERVICIOS.ctaButtonFallback}
        </QuoteButton>
      </CtaBand>
    </PageShell>
  );
};

export default ServiciosPage;
