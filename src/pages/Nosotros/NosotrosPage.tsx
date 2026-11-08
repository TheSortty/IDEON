import React from 'react';
import { Link } from 'react-router';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import Reveal from '../../components/ui/Reveal';
import SpotlightCard from '../../components/ui/SpotlightCard';
import CtaBand, { ON_BAND_GHOST } from '../../components/page/CtaBand';
import PageNav from '../../components/page/PageNav';
import PageShell from '../../components/page/PageShell';
import QuoteButton from '../../components/page/QuoteButton';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { NOSOTROS, NOSOTROS_META, type TeamTone } from '../../constants/nosotros';
import { CASOS_META } from '../../constants/cases';
import { cn } from '../../lib/cn';

const TONE: Record<TeamTone, string> = {
  magenta: 'team-magenta',
  violet: 'team-violet',
  blue: 'team-blue',
};

const NosotrosPage: React.FC = () => {
  useServicePageSeo(NOSOTROS_META, { pageType: 'AboutPage' });

  return (
    <PageShell orb="right">
      <section className="pb-16 pt-[72px]">
        <div className="container-site flex flex-col gap-[22px]">
          <nav aria-label="Ruta" className="animate-rise text-sm text-content-muted">
            <Link to="/" className="text-content-muted no-underline transition-colors hover:text-content">Inicio</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-content">{NOSOTROS_META.name}</span>
          </nav>
          <h1 className="max-w-[1000px] animate-rise font-extrabold text-content [animation-delay:150ms]">
            {NOSOTROS.title[0]}
            <span className="text-gradient-pan animate-gradient-pan">{NOSOTROS.title[1]}</span>
          </h1>
          <p className="max-w-[720px] animate-rise text-xl leading-relaxed text-content-muted [animation-delay:300ms]">{NOSOTROS.lead}</p>
        </div>
      </section>

      <PageNav items={NOSOTROS.pageNav} />

      <section id="equipo" className="!pt-10">
        <div className="container-site">
          <Reveal className="mb-10 max-w-[680px]">
            <h2 className="font-extrabold text-content">{NOSOTROS.teamTitle}</h2>
          </Reveal>
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {NOSOTROS.team.map((member) => (
              <SpotlightCard key={member.name} as="article" className="group rounded-3xl">
                <div className={cn('team-head relative flex h-[280px] flex-col overflow-hidden px-[26px] py-6', TONE[member.tone])}>
                  <span className="relative z-[2] self-start rounded-full border border-brand-text-primary/30 bg-brand-text-primary/15 px-3 py-1.5 text-xs font-extrabold tracking-[0.16em] text-brand-text-primary">
                    {member.roleShort}
                  </span>
                  <img
                    src={member.avatar}
                    alt={`Ilustración de ${member.name}`}
                    width={240}
                    height={240}
                    loading="lazy"
                    className="absolute bottom-0 left-1/2 h-60 w-60 -translate-x-1/2 drop-shadow-[0_18px_30px_rgb(0_0_0/0.3)] transition-transform duration-long ease-emphasis group-hover:-translate-y-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2 p-7">
                  <h3 className="text-[22px] font-extrabold text-content">{member.name}</h3>
                  <p className="text-[15px] font-bold text-accent-text">{member.role}</p>
                  <p className="text-[15px] leading-relaxed text-content-muted">{member.bio}</p>
                </div>
              </SpotlightCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="valores">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-start gap-14">
          <Reveal className="pinned-intro flex flex-col gap-4">
            <h2 className="font-extrabold text-content">{NOSOTROS.valuesTitle}</h2>
            <p className="text-lg leading-relaxed text-content-muted">{NOSOTROS.valuesText}</p>
          </Reveal>
          {/* Ventajas → recursos C + D (luz al cursor + texturas). */}
          <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
            {NOSOTROS.values.map((value, i) => (
              <SpotlightCard key={value.title} texture={i % 2 ? 'grid' : 'dots'} className="p-[26px]">
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-accent/35 bg-accent/15 text-accent">
                  <Icon name={value.icon} />
                </span>
                <h3 className="mt-3 text-[19px] font-bold text-content">{value.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-content-muted">{value.description}</p>
              </SpotlightCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="historia">
        <div className="container-site">
          <Reveal>
            <SpotlightCard className="plan-featured overflow-visible rounded-[28px] border-2 border-transparent bg-surface-raised/70 p-[clamp(28px,4vw,56px)] shadow-[0_0_50px_rgb(var(--accent)/0.3)]">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-10">
                <h2 className="text-[clamp(1.625rem,3vw,2.375rem)] font-extrabold text-content">{NOSOTROS.historyTitle}</h2>
                <div className="flex flex-col gap-4">
                  {NOSOTROS.history.map((paragraph, i) => (
                    <p key={i} className="text-[17px] leading-[1.7] text-content-muted">
                      {paragraph.map((part) =>
                        'highlight' in part && part.highlight ? (
                          // pr: la cursiva se inclina y el recorte del degradado
                          // (background-clip: text) cortaría la última letra.
                          <em key={part.text} className="text-gradient-pan animate-gradient-pan pr-[0.12em] font-bold italic">
                            {part.text}
                          </em>
                        ) : (
                          <React.Fragment key={part.text}>{part.text}</React.Fragment>
                        ),
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      <section id="convenios" className="!pt-6">
        <div className="container-site">
          <Reveal className="mb-7 max-w-[680px]">
            <h2 className="text-[clamp(1.625rem,3vw,2.375rem)] font-extrabold text-content">{NOSOTROS.partnersTitle}</h2>
          </Reveal>
          <Reveal>
            <SpotlightCard className="rounded-3xl p-[clamp(28px,4vw,44px)]">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-8">
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/35 bg-accent/15 text-accent">
                      <Icon name="receipt" size={26} />
                    </span>
                    <span>
                      <span className="block text-[26px] font-black tracking-[-0.01em] text-content">{NOSOTROS.partner.name}</span>
                      <span className="text-sm text-content-muted">{NOSOTROS.partner.by}</span>
                    </span>
                  </div>
                  <p className="text-base leading-relaxed text-content-muted">{NOSOTROS.partner.description}</p>
                </div>
                <ul className="check-list m-0 flex list-none flex-col gap-3.5 p-0 text-base text-content">
                  {NOSOTROS.partner.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </section>

      <CtaBand title={NOSOTROS.ctaTitle} text={NOSOTROS.ctaText} className="pb-[120px] pt-6">
        <QuoteButton variant="light" size="lg">{NOSOTROS.ctaPrimary}</QuoteButton>
        <Button to={CASOS_META.path} variant="ghost" size="lg" className={ON_BAND_GHOST}>
          {NOSOTROS.ctaSecondary}
        </Button>
      </CtaBand>
    </PageShell>
  );
};

export default NosotrosPage;
