import React, { useEffect, useId, useRef, useState } from 'react';
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
  EMPTY_ANSWERS,
  FEATURE_TREE,
  SIZE_TREE,
  TYPE_PHRASE,
  recommend,
  summarize,
  whatsappSummary,
  type ProjectType,
  type QuizAnswers,
  type QuizOption,
} from '../../constants/cotizador';
import { CONTACTO_META } from '../../constants/contacto';
import { whatsappUrl } from '../../constants/contact';
import { cn } from '../../lib/cn';
import type { ContactPrefill } from '../Contacto/ContactoPage';

const TOTAL_STEPS = 5;

// Cotizador → tipo del formulario de contacto.
const TYPE_FOR_FORM: Record<ProjectType, string> = {
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

/* ------------------------------------------------------------ Opciones */

interface OptionProps {
  option: QuizOption;
  selected: boolean;
  multi?: boolean;
  compact?: boolean;
  /** Recomendada para el tipo de proyecto elegido: se resalta. */
  recommended?: boolean;
  /** Orden de aparición (para escalonar el resaltado). */
  index?: number;
  onPick: () => void;
}

const Option: React.FC<OptionProps> = ({ option, selected, multi, compact, recommended, index = 0, onPick }) => (
  <motion.button
    type="button"
    aria-pressed={selected}
    onClick={onPick}
    // Las recomendadas se "encienden" una detrás de otra al entrar al paso.
    initial={recommended ? { scale: 0.96, boxShadow: '0 0 0px rgb(212 0 255 / 0)' } : false}
    animate={
      recommended
        ? { scale: 1, boxShadow: ['0 0 0px rgb(212 0 255 / 0)', '0 0 28px rgb(212 0 255 / 0.45)', '0 0 14px rgb(212 0 255 / 0.18)'] }
        : undefined
    }
    transition={{ duration: 0.9, delay: 0.15 + index * 0.08, ease: EASE_EMPHASIS }}
    className={cn(
      'opt relative flex w-full items-start gap-3 rounded-2xl border-2 text-left transition-[border-color,color,background-color,transform] duration-medium hover:-translate-y-0.5 hover:border-accent/70 active:scale-[0.97]',
      compact ? 'min-h-[56px] px-4 py-3' : option.desc ? 'min-h-[84px] px-5 py-4' : 'min-h-14 items-center px-5 py-3',
      selected
        ? 'border-accent bg-surface-raised shadow-[0_0_26px_rgb(var(--accent)/0.3)]'
        : recommended
          ? 'border-accent/45 bg-accent/[0.07]'
          : 'border-line-strong bg-surface-base/50',
    )}
  >
    <span
      className={cn(
        'opt-dot mt-0.5 h-[18px] w-[18px] flex-shrink-0 border-2 border-content/35 transition-all duration-medium',
        multi ? 'rounded-md' : 'rounded-full',
      )}
    />
    <span className="min-w-0 flex-1">
      <span className={cn('block font-bold text-content', compact ? 'text-[15px] leading-snug' : 'text-base')}>{option.label}</span>
      {option.desc && (
        <span className={cn('mt-1 block font-normal leading-snug text-content-muted', compact ? 'text-[13px]' : 'text-sm')}>
          {option.desc}
        </span>
      )}
    </span>
    {recommended && (
      <span className="absolute -top-2.5 right-3 rounded-full bg-accent-solid px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-accent-ink">
        {COTIZADOR.features.recommendedBadge}
      </span>
    )}
  </motion.button>
);

/** Una pregunta: título, aclaración opcional y las opciones. */
const Question: React.FC<{ title: string; hint?: string; optional?: boolean; children: React.ReactNode }> = ({
  title,
  hint,
  optional,
  children,
}) => {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className="flex flex-col">
      <h2 id={id} className="flex flex-wrap items-center gap-3 text-[clamp(1.375rem,2.6vw,1.875rem)] font-extrabold text-content">
        {title}
        {optional && (
          <span className="rounded-full border border-line-strong px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-content-muted">
            {COTIZADOR.optionalBadge}
          </span>
        )}
      </h2>
      {hint && <p className="mt-2 text-[15px] text-content-muted">{hint}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
};

const grid = (min: number) =>
  min === 180
    ? 'grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-3'
    : min === 220
      ? 'grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-3'
      : 'grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3';

/* ------------------------------------------------------------- Página */

/**
 * Cotizador en cinco pasos. Es un árbol: lo que se elige en el paso 1 cambia
 * la pregunta de tamaño y qué funcionalidades se recomiendan (y en qué orden
 * aparecen). El paso 5 es opcional y abierto: qué tiene hoy y qué idea trae.
 * Al final, recomendación con sus motivos y el resumen por WhatsApp o
 * precargado en el formulario de contacto.
 */
const CotizarPage: React.FC = () => {
  useServicePageSeo(COTIZAR_META);
  const [params] = useSearchParams();
  // El HTML pre-renderizado no conoce el ?plan=: se lee después de montar,
  // para que la hidratación coincida.
  const [fromPlan, setFromPlan] = useState<string | null>(null);
  useEffect(() => setFromPlan(params.get('plan')), [params]);

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const cardRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Al cambiar de paso, la tarjeta vuelve a quedar a la vista (en celular el
  // paso 3 es largo y el siguiente arrancaría scrolleado).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const card = cardRef.current;
    if (card && card.getBoundingClientRect().top < 0) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const setOne = <K extends 'tipo' | 'rubro' | 'tamano' | 'plazo'>(key: K, value: QuizAnswers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));
  const toggle = (key: 'objetivos' | 'extras' | 'hoy', id: string) =>
    setAnswers((a) => ({ ...a, [key]: a[key].includes(id) ? a[key].filter((x) => x !== id) : [...a[key], id] }));
  // "Arrancamos de cero" excluye al resto de "qué tenés hoy" (y al revés).
  const toggleHoy = (id: string) =>
    setAnswers((a) => {
      if (id === 'cero') return { ...a, hoy: a.hoy.includes('cero') ? [] : ['cero'] };
      const rest = a.hoy.filter((x) => x !== 'cero');
      return { ...a, hoy: rest.includes(id) ? rest.filter((x) => x !== id) : [...rest, id] };
    });

  const tipo = answers.tipo;
  const canNext =
    (step === 1 && !!tipo) ||
    (step === 2 && !!answers.rubro && answers.objetivos.length > 0) ||
    step === 3 ||
    (step === 4 && !!answers.tamano && !!answers.plazo) ||
    step === 5;

  const done = step > TOTAL_STEPS;
  const result = done ? recommend(answers) : null;
  const summary = done ? summarize(answers) : [];

  const tree = tipo ? FEATURE_TREE[tipo] : FEATURE_TREE.nose;
  const groups = tree.order.map((id) => COTIZADOR.features.groups.find((g) => g.id === id)!).filter(Boolean);
  let recommendedIndex = 0;

  // "Prefiero que me escriban": el resumen viaja al formulario de contacto.
  const prefill: ContactPrefill = {
    type: tipo ? TYPE_FOR_FORM[tipo] : undefined,
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
          <p className="max-w-[640px] animate-rise text-lg text-content-muted [animation-delay:250ms]">{COTIZADOR.lead}</p>
          {fromPlan && <p className="animate-rise text-sm font-semibold text-accent-text [animation-delay:300ms]">{COTIZADOR.fromPlan(fromPlan)}</p>}
        </div>
      </section>

      <section className="!pb-[96px] !pt-0">
        <div className="mx-auto max-w-[960px] animate-rise px-6 [animation-delay:350ms]">
          <div
            ref={cardRef}
            className="glass scroll-mt-[calc(var(--nav-h)+1rem)] overflow-hidden rounded-[32px] p-[clamp(24px,4vw,48px)] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)]"
          >
            <div className="mb-9 flex flex-col gap-3">
              <div className="flex justify-between text-sm text-content-muted">
                <span>{done ? COTIZADOR.doneLabel : COTIZADOR.stepLabel(step)}</span>
                <span>{done ? COTIZADOR.doneName : COTIZADOR.stepNames[step - 1]}</span>
              </div>
              <div className="flex gap-2" aria-hidden="true">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
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
                <motion.div key={step} {...stepMotion} className="flex flex-col gap-10">
                  {step === 1 && (
                    <Question title={COTIZADOR.tipo.question}>
                      <div className={grid(260)}>
                        {COTIZADOR.tipo.options.map((o) => (
                          <Option key={o.id} option={o} selected={tipo === o.id} onPick={() => setOne('tipo', o.id as ProjectType)} />
                        ))}
                      </div>
                    </Question>
                  )}

                  {step === 2 && (
                    <>
                      <Question title={COTIZADOR.rubro.question}>
                        <div className={grid(220)}>
                          {COTIZADOR.rubro.options.map((o) => (
                            <Option key={o.id} option={o} compact selected={answers.rubro === o.id} onPick={() => setOne('rubro', o.id)} />
                          ))}
                        </div>
                      </Question>
                      <Question title={COTIZADOR.objetivos.question} hint={COTIZADOR.objetivos.hint}>
                        <div className={grid(220)}>
                          {COTIZADOR.objetivos.options.map((o) => (
                            <Option key={o.id} option={o} compact multi selected={answers.objetivos.includes(o.id)} onPick={() => toggle('objetivos', o.id)} />
                          ))}
                        </div>
                      </Question>
                    </>
                  )}

                  {step === 3 && (
                    <Question title={COTIZADOR.features.question} hint={COTIZADOR.features.hint}>
                      {tipo && tipo !== 'nose' && (
                        <p className="-mt-2 mb-6 rounded-xl border border-accent/30 bg-accent/[0.07] px-4 py-3 text-sm text-content">
                          {COTIZADOR.features.recommendedNote(TYPE_PHRASE[tipo])}
                        </p>
                      )}
                      <div className="flex flex-col gap-8">
                        {groups.map((group) => (
                          <div key={group.id} className="flex flex-col gap-3">
                            <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-accent-text">{group.title}</h3>
                            <div className={grid(260)}>
                              {group.options.map((o) => {
                                const isRecommended = tree.recommended.includes(o.id);
                                return (
                                  <Option
                                    key={o.id}
                                    option={o}
                                    compact
                                    multi
                                    recommended={isRecommended}
                                    index={isRecommended ? recommendedIndex++ : 0}
                                    selected={answers.extras.includes(o.id)}
                                    onPick={() => toggle('extras', o.id)}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Question>
                  )}

                  {step === 4 && tipo && (
                    <>
                      <Question title={SIZE_TREE[tipo].question}>
                        <div className={grid(220)}>
                          {SIZE_TREE[tipo].options.map((o) => (
                            <Option key={o.id} option={o} selected={answers.tamano === o.id} onPick={() => setOne('tamano', o.id)} />
                          ))}
                        </div>
                      </Question>
                      <Question title={COTIZADOR.plazo.question}>
                        <div className={grid(180)}>
                          {COTIZADOR.plazo.options.map((o) => (
                            <Option key={o.id} option={o} compact selected={answers.plazo === o.id} onPick={() => setOne('plazo', o.id)} />
                          ))}
                        </div>
                      </Question>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <Question title={COTIZADOR.hoy.question} hint={COTIZADOR.hoy.hint} optional>
                        <div className={grid(220)}>
                          {COTIZADOR.hoy.options.map((o) => (
                            <Option key={o.id} option={o} compact multi selected={answers.hoy.includes(o.id)} onPick={() => toggleHoy(o.id)} />
                          ))}
                        </div>
                      </Question>
                      <Question title={COTIZADOR.idea.question} hint={COTIZADOR.idea.hint} optional>
                        <textarea
                          aria-label={COTIZADOR.idea.question}
                          rows={5}
                          value={answers.idea}
                          onChange={(e) => setAnswers((a) => ({ ...a, idea: e.target.value }))}
                          placeholder={COTIZADOR.idea.placeholder}
                          className="field min-h-[140px] w-full resize-y rounded-2xl border-2 border-line-strong bg-surface-base/60 px-4 py-3.5 text-base leading-normal text-content transition-[border-color,box-shadow] duration-medium focus:border-accent focus:shadow-[0_0_0_4px_rgb(var(--accent)/0.22)] focus:outline-none"
                        />
                      </Question>
                    </>
                  )}

                  {done && result && (
                    // Único punto de "cotizador completo": acá va el evento
                    // `cotizador_complete` cuando se instale la medición.
                    <div className="flex flex-col gap-6">
                      <div className="plan-featured flex flex-col gap-3.5 rounded-3xl border-2 border-transparent bg-surface-raised/70 p-[clamp(24px,4vw,40px)] shadow-[0_0_50px_rgb(var(--accent)/0.3)]">
                        <p className="text-sm font-bold text-accent-text">{COTIZADOR.recommendLabel}</p>
                        <p className="text-gradient-pan animate-gradient-pan text-[clamp(2.25rem,5vw,3.5rem)] font-black leading-none">{result.plan}</p>
                        <p className="text-[17px] leading-relaxed text-content-muted">{result.description}</p>
                        {result.reasons.length > 0 && (
                          <div className="mt-1 border-t border-accent/20 pt-4">
                            <p className="mb-2 text-sm font-bold text-content">{COTIZADOR.whyTitle}</p>
                            <ul className="check-list m-0 flex list-none flex-col gap-2.5 p-0 text-[15px] text-content-muted">
                              {result.reasons.map((reason) => (
                                <li key={reason}>{reason}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="glass flex flex-col gap-2.5 rounded-[18px] p-6">
                        <p className="font-bold text-content">{COTIZADOR.summaryTitle}</p>
                        <ul className="check-list m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-content">
                          {summary.map((line) => (
                            <li key={line} className="break-words">{line}</li>
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
                          setAnswers(EMPTY_ANSWERS);
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

            {!done && (
              <div className="mt-9 flex items-center justify-between gap-3 border-t border-line pt-6">
                <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
                  {COTIZADOR.back}
                </Button>
                <Button onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext}>
                  {step === TOTAL_STEPS ? COTIZADOR.finish : COTIZADOR.next}
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
