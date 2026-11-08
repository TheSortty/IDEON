import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Reveal from '../../components/ui/Reveal';
import PageShell from '../../components/page/PageShell';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { EASE_EMPHASIS } from '../../components/ui/motion';
import {
  COTIZADOR,
  COTIZAR_META,
  recommend,
  summarize,
  whatsappSummary,
  type QuizAnswers,
  type QuizOption,
} from '../../constants/cotizador';
import { CONTACTO_META } from '../../constants/contacto';
import { whatsappUrl } from '../../constants/contact';
import { cn } from '../../lib/cn';
import type { ContactPrefill } from '../Contacto/ContactoPage';

const EMPTY: QuizAnswers = { tipo: null, tamano: null, extras: [], plazo: null };

// Cotizador → tipo del formulario de contacto.
const TYPE_FOR_FORM: Record<string, string> = {
  web: 'Página web',
  tienda: 'Tienda online',
  sistema: 'Sistema o plataforma a medida',
  nose: 'Todavía no lo sé',
};

const stepMotion = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.45, ease: EASE_EMPHASIS },
};

const optBase =
  'opt flex w-full items-center gap-3 rounded-2xl border-2 px-5 text-left text-[15px] font-semibold transition-[border-color,color,background-color,transform,box-shadow] duration-medium hover:-translate-y-0.5 hover:border-accent/70 hover:text-content active:scale-[0.97]';
const optOn = 'border-accent bg-surface-raised text-content shadow-[0_0_26px_rgb(var(--accent)/0.3)]';
const optOff = 'border-line-strong bg-surface-base/50 text-content-muted';

const Option: React.FC<{ option: QuizOption; selected: boolean; multi?: boolean; onPick: () => void }> = ({
  option,
  selected,
  multi,
  onPick,
}) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onPick}
    className={cn(optBase, option.desc ? 'min-h-[84px] items-start py-4' : 'min-h-14', selected ? optOn : optOff)}
  >
    <span className={cn('opt-dot mt-0.5 h-[18px] w-[18px] flex-shrink-0 border-2 border-content/35 transition-all duration-medium', multi ? 'rounded-md' : 'rounded-full')} />
    <span>
      <span className="block text-base font-bold text-content">{option.label}</span>
      {option.desc && <span className="mt-1 block text-sm font-normal text-content-muted">{option.desc}</span>}
    </span>
  </button>
);

const Question: React.FC<{ title: string; hint?: string; children: React.ReactNode }> = ({ title, hint, children }) => (
  <fieldset className="m-0 flex flex-col gap-5 border-0 p-0">
    <legend className="mb-5 text-[clamp(1.375rem,2.6vw,1.875rem)] font-extrabold text-content">{title}</legend>
    {hint && <p className="-mt-7 text-sm text-content-muted">{hint}</p>}
    {children}
  </fieldset>
);

/**
 * Cotizador en cuatro pasos (lógica del diseño de Celeste). Al final
 * recomienda un plan y ofrece mandar el resumen por WhatsApp o pasarlo al
 * formulario de contacto, ya precargado.
 */
const CotizarPage: React.FC = () => {
  useServicePageSeo(COTIZAR_META);
  const [params] = useSearchParams();
  // El HTML pre-renderizado no conoce el ?plan=: se lee después de montar,
  // para que la hidratación coincida.
  const [fromPlan, setFromPlan] = useState<string | null>(null);
  useEffect(() => setFromPlan(params.get('plan')), [params]);

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY);

  const set = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => setAnswers((a) => ({ ...a, [key]: value }));
  const toggleExtra = (id: string) =>
    setAnswers((a) => ({ ...a, extras: a.extras.includes(id) ? a.extras.filter((x) => x !== id) : [...a.extras, id] }));

  const canNext =
    (step === 1 && !!answers.tipo) || (step === 2 && !!answers.tamano) || step === 3 || (step === 4 && !!answers.plazo);
  const result = step === 5 ? recommend(answers) : null;
  const summary = step === 5 ? summarize(answers) : [];

  // "Prefiero que me escriban": el resumen viaja al formulario de contacto.
  const prefill: ContactPrefill = {
    type: answers.tipo ? TYPE_FOR_FORM[answers.tipo] : undefined,
    message: result ? `${summary.join('\n')}\nRecomendación del cotizador: ${result.plan}.` : undefined,
  };

  return (
    <PageShell orb="center">
      <section className="pb-12 pt-16">
        <div className="container-site flex flex-col items-center gap-[18px] text-center">
          <nav aria-label="Ruta" className="animate-rise text-sm text-content-muted">
            <Link to="/" className="text-content-muted no-underline transition-colors hover:text-content">Inicio</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page" className="text-content">{COTIZAR_META.name}</span>
          </nav>
          <h1 className="max-w-[820px] animate-rise text-[clamp(2.25rem,4.6vw,3.625rem)] font-extrabold text-content [animation-delay:150ms]">
            {COTIZADOR.title[0]}
            <span className="text-gradient-pan animate-gradient-pan">{COTIZADOR.title[1]}</span>
          </h1>
          <p className="max-w-[600px] animate-rise text-lg text-content-muted [animation-delay:250ms]">{COTIZADOR.lead}</p>
          {fromPlan && <p className="animate-rise text-sm font-semibold text-accent-text [animation-delay:300ms]">{COTIZADOR.fromPlan(fromPlan)}</p>}
        </div>
      </section>

      <section className="!pb-[96px] !pt-0">
        <div className="mx-auto max-w-[920px] animate-rise px-6 [animation-delay:350ms]">
          <div className="glass overflow-hidden rounded-[32px] p-[clamp(24px,4vw,48px)] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)]">
            <div className="mb-9 flex flex-col gap-3">
              <div className="flex justify-between text-sm text-content-muted">
                <span>{step <= 4 ? COTIZADOR.stepLabel(step) : COTIZADOR.doneLabel}</span>
                <span>{step <= 4 ? COTIZADOR.stepNames[step - 1] : COTIZADOR.doneName}</span>
              </div>
              <div className="flex gap-2" aria-hidden="true">
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className={cn(
                      'h-1.5 flex-1 rounded-full transition-colors duration-long',
                      n <= step ? 'bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_10px_rgb(var(--accent)/0.6)]' : 'bg-content/15',
                    )}
                  />
                ))}
              </div>
            </div>

            <div aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} {...stepMotion}>
                  {step === 1 && (
                    <Question title={COTIZADOR.questions.tipo}>
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3">
                        {COTIZADOR.tipos.map((o) => (
                          <Option key={o.id} option={o} selected={answers.tipo === o.id} onPick={() => set('tipo', o.id)} />
                        ))}
                      </div>
                    </Question>
                  )}
                  {step === 2 && (
                    <Question title={COTIZADOR.questions.tamano}>
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
                        {COTIZADOR.tamanos.map((o) => (
                          <Option key={o.id} option={o} selected={answers.tamano === o.id} onPick={() => set('tamano', o.id)} />
                        ))}
                      </div>
                    </Question>
                  )}
                  {step === 3 && (
                    <Question title={COTIZADOR.questions.extras} hint={COTIZADOR.questions.extrasHint}>
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
                        {COTIZADOR.extras.map((o) => (
                          <Option key={o.id} option={o} multi selected={answers.extras.includes(o.id)} onPick={() => toggleExtra(o.id)} />
                        ))}
                      </div>
                    </Question>
                  )}
                  {step === 4 && (
                    <Question title={COTIZADOR.questions.plazo}>
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3">
                        {COTIZADOR.plazos.map((o) => (
                          <Option key={o.id} option={o} selected={answers.plazo === o.id} onPick={() => set('plazo', o.id)} />
                        ))}
                      </div>
                    </Question>
                  )}
                  {step === 5 && result && (
                    // Único punto de "cotizador completo": acá va el evento
                    // `cotizador_complete` cuando se instale la medición.
                    <div className="flex flex-col gap-6">
                      <div className="plan-featured flex flex-col gap-3.5 rounded-3xl border-2 border-transparent bg-surface-raised/70 p-[clamp(24px,4vw,40px)] shadow-[0_0_50px_rgb(var(--accent)/0.3)]">
                        <p className="text-sm font-bold text-accent-text">{COTIZADOR.recommendLabel}</p>
                        <p className="text-gradient-pan animate-gradient-pan text-[clamp(2.25rem,5vw,3.5rem)] font-black leading-none">{result.plan}</p>
                        <p className="text-[17px] leading-relaxed text-content-muted">{result.description}</p>
                      </div>
                      <div className="glass flex flex-col gap-2.5 rounded-[18px] p-6">
                        <p className="font-bold text-content">{COTIZADOR.summaryTitle}</p>
                        <ul className="check-list m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-content">
                          {summary.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-[15px] leading-relaxed text-content-muted">{COTIZADOR.priceNote}</p>
                      <div className="flex flex-wrap gap-3">
                        <Button href={whatsappUrl(whatsappSummary(answers))} target="_blank" rel="noopener noreferrer" size="lg">
                          {COTIZADOR.sendWhatsapp}
                        </Button>
                        <Button to={CONTACTO_META.path} state={prefill} variant="outline" size="lg">
                          {COTIZADOR.sendForm}
                        </Button>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAnswers(EMPTY);
                          setStep(1);
                        }}
                        className="link-underline self-start border-0 bg-transparent p-0 text-[15px] font-bold text-accent-text"
                      >
                        {COTIZADOR.restart}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {step <= 4 && (
              <div className="mt-9 flex items-center justify-between gap-3 border-t border-line pt-6">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
                  {COTIZADOR.back}
                </Button>
                <Button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext}>
                  {step === 4 ? COTIZADOR.finish : COTIZADOR.next}
                </Button>
              </div>
            )}
          </div>

          <Reveal className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
            {COTIZADOR.trust.map((item) => (
              <div key={item.title} className="glass rounded-2xl px-5 py-[18px]">
                <strong className="block text-[15px] text-content">{item.title}</strong>
                <span className="text-sm text-content-muted">{item.text}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
};

export default CotizarPage;
