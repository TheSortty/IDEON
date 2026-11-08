import React, { useState } from 'react';
import { Link } from 'react-router';
import Button from '../../components/ui/Button';
import CtaBand, { ON_BAND_GHOST } from '../../components/page/CtaBand';
import FaqItem from '../../components/page/FaqItem';
import PageShell from '../../components/page/PageShell';
import QuoteButton from '../../components/page/QuoteButton';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { PREGUNTAS, PREGUNTAS_META, type FaqTopicId } from '../../constants/preguntas';
import { whatsappUrl } from '../../constants/contact';
import { cn } from '../../lib/cn';

const ALL_FAQS = PREGUNTAS.topics.flatMap((topic) => topic.faqs);

const pill =
  'opt inline-flex min-h-[46px] items-center rounded-full border-2 px-5 text-[15px] font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-medium hover:-translate-y-0.5';

const PreguntasPage: React.FC = () => {
  // Todas las preguntas van al JSON-LD; el filtro solo cambia qué se ve.
  useServicePageSeo(PREGUNTAS_META, { faqs: ALL_FAQS });
  const [topic, setTopic] = useState<FaqTopicId | 'todas'>('todas');

  const tabs: { id: FaqTopicId | 'todas'; label: string }[] = [
    { id: 'todas', label: PREGUNTAS.allLabel },
    ...PREGUNTAS.topics.map((t) => ({ id: t.id, label: t.label })),
  ];

  return (
    <PageShell orb="center">
      <section className="pb-10 pt-[72px]">
        <div className="mx-auto flex max-w-[880px] flex-col items-center gap-[18px] px-6 text-center">
          <nav aria-label="Ruta" className="animate-rise text-sm text-content-muted">
            <Link to="/" className="text-content-muted no-underline transition-colors hover:text-content">Inicio</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-content">{PREGUNTAS_META.name}</span>
          </nav>
          <h1 className="animate-rise text-[clamp(2.25rem,4.6vw,3.625rem)] font-extrabold text-content [animation-delay:150ms]">
            {PREGUNTAS.title[0]}
            <span className="text-gradient-pan animate-gradient-pan">{PREGUNTAS.title[1]}</span>
          </h1>
          <p className="animate-rise text-lg text-content-muted [animation-delay:250ms]">{PREGUNTAS.lead}</p>
          <div role="group" aria-label="Elegir tema" className="mt-2 flex animate-rise flex-wrap justify-center gap-2.5 [animation-delay:350ms]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={topic === tab.id}
                onClick={() => setTopic(tab.id)}
                className={cn(
                  pill,
                  topic === tab.id
                    ? 'border-accent bg-surface-raised text-content shadow-[0_0_26px_rgb(var(--accent)/0.3)]'
                    : 'border-line-strong bg-surface-base/50 text-content-muted hover:border-accent/70 hover:text-content',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="!pb-6 !pt-4">
        <div className="mx-auto flex max-w-[880px] flex-col gap-3 px-6">
          {PREGUNTAS.topics.map((t, ti) =>
            t.faqs.map((faq, fi) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                open={ti === 0 && fi === 0}
                hidden={topic !== 'todas' && topic !== t.id}
              />
            )),
          )}
        </div>
      </section>

      <CtaBand title={PREGUNTAS.ctaTitle} className="pb-[96px] pt-10">
        <Button href={whatsappUrl(PREGUNTAS.ctaWhatsappMessage)} target="_blank" rel="noopener noreferrer" variant="light">
          {PREGUNTAS.ctaWhatsapp}
        </Button>
        <QuoteButton variant="ghost" className={ON_BAND_GHOST}>
          {PREGUNTAS.ctaQuote}
        </QuoteButton>
      </CtaBand>
    </PageShell>
  );
};

export default PreguntasPage;
