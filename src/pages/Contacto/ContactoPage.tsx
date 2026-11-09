import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import Button from '../../components/ui/Button';
import Icon, { type IconName } from '../../components/ui/Icon';
import SpotlightCard from '../../components/ui/SpotlightCard';
import PageShell from '../../components/page/PageShell';
import { useServicePageSeo } from '../../components/page/servicePageSeo';
import { WhatsAppIcon } from '../../components/ui/SocialIcons';
import { CONTACTO, CONTACTO_META } from '../../constants/contacto';
import { whatsappUrl } from '../../constants/contact';
import { submitLead } from '../../lib/web3forms';

/** Lo que el cotizador le pasa al formulario ("Prefiero que me escriban"). */
export interface ContactPrefill {
  type?: string;
  message?: string;
}

const fieldClass =
  'field min-h-[50px] w-full rounded-xl border border-line-strong bg-surface-base/60 px-4 text-base text-content transition-[border-color,box-shadow] duration-medium focus:border-accent focus:shadow-[0_0_0_4px_rgb(var(--accent)/0.22)] focus:outline-none';
const labelClass = 'text-sm font-semibold text-content';

const ContactoPage: React.FC = () => {
  useServicePageSeo(CONTACTO_META, { pageType: 'ContactPage' });
  const navigate = useNavigate();
  const prefill = (useLocation().state ?? {}) as ContactPrefill;

  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    type: prefill.type ?? CONTACTO.types[0],
    message: prefill.message ?? '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [error, setError] = useState('');

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() && !form.phone.trim()) {
      setStatus('error');
      setError(CONTACTO.needContact);
      return;
    }
    setStatus('sending');
    const result = await submitLead(`Nueva consulta desde /contacto - IDEON (${form.name})`, {
      nombre: form.name,
      negocio: form.business,
      email: form.email,
      whatsapp: form.phone,
      necesita: form.type,
      mensaje: form.message,
      origen: 'Página de contacto',
    });
    if (result.ok) {
      // /contacto-exitoso/ es la URL de conversión (medición, ver docs).
      navigate('/contacto-exitoso/');
      return;
    }
    setStatus('error');
    setError('reason' in result && result.reason === 'network' ? CONTACTO.errorNetwork : CONTACTO.errorGeneric);
  };

  return (
    <PageShell orb="left">
      <section className="!pb-[120px] !pt-[72px]">
        <nav aria-label="Ruta" className="container-site mb-[26px] animate-rise text-sm text-content-muted">
          <Link to="/" className="text-content-muted no-underline transition-colors hover:text-content">Inicio</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page" className="text-content">{CONTACTO_META.name}</span>
        </nav>
        {/* Las dos columnas arrancan a la misma altura (las migas quedan
            afuera) y se estiran juntas: el formulario termina a la par del
            panel izquierdo, con el mensaje ocupando el espacio que sobra. */}
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-stretch gap-12">
          <div className="flex flex-col gap-[26px]">
            <h1 className="animate-rise text-[clamp(2.5rem,5vw,3.875rem)] font-extrabold text-content [animation-delay:150ms]">
              {CONTACTO.title[0]}
              <span className="text-gradient-pan animate-gradient-pan">{CONTACTO.title[1]}</span>
            </h1>
            <p className="animate-rise text-xl leading-relaxed text-content-muted [animation-delay:250ms]">{CONTACTO.lead}</p>

            <Button
              href={whatsappUrl(CONTACTO.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-rise !justify-start gap-[18px] whitespace-normal rounded-3xl px-7 py-[22px] text-left [animation-delay:350ms]"
            >
              <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-accent-ink/20">
                <WhatsAppIcon className="h-8 w-8" />
              </span>
              <span>
                <span className="block text-xl font-extrabold">
                  {CONTACTO.whatsappTitle} <span aria-hidden="true">→</span>
                </span>
                <span className="block text-[15px] font-medium opacity-90">{CONTACTO.phoneDisplay}</span>
              </span>
            </Button>

            <ul className="m-0 flex animate-rise list-none flex-col gap-3 p-0 [animation-delay:450ms]">
              {CONTACTO.info.map((item) => (
                <SpotlightCard as="li" key={item.label} className="rounded-2xl px-5 py-[18px]">
                  <div className="flex items-center gap-4">
                    <span className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-xl border border-accent/35 bg-accent/15 text-accent">
                      <Icon name={item.icon as IconName} size={20} />
                    </span>
                    <span>
                      <span className="block text-[13px] text-content-muted">{item.label}</span>
                      {'href' in item ? (
                        <a href={item.href} className="link-underline font-semibold text-content no-underline">
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-semibold text-content">{item.value}</span>
                      )}
                    </span>
                  </div>
                </SpotlightCard>
              ))}
            </ul>

            <SpotlightCard className="plan-featured animate-rise overflow-visible rounded-[20px] border-2 border-transparent bg-surface-raised/70 p-7 shadow-[0_0_50px_rgb(var(--accent)/0.3)] [animation-delay:550ms]">
              <h2 className="text-xl font-extrabold text-content">{CONTACTO.nextTitle}</h2>
              <ol className="m-0 mt-3.5 flex list-none flex-col gap-3 p-0 text-[15px] leading-normal text-content-muted">
                {CONTACTO.nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <strong className="text-accent-text">{i + 1}.</strong>
                    {step}
                  </li>
                ))}
              </ol>
            </SpotlightCard>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-labelledby="form-titulo"
            className="glass flex h-full animate-rise flex-col gap-5 rounded-[28px] p-[clamp(28px,4vw,44px)] shadow-[0_30px_80px_-20px_rgb(0_0_0/0.5)] [animation-delay:350ms]"
          >
            <div>
              <h2 id="form-titulo" className="mb-1.5 text-[26px] font-extrabold text-content">{CONTACTO.formTitle}</h2>
              <p className="text-[15px] text-content-muted">{CONTACTO.formText}</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="c-nombre" className={labelClass}>{CONTACTO.fields.name.label}</label>
                <input id="c-nombre" required autoComplete="name" className={fieldClass} placeholder={CONTACTO.fields.name.placeholder} value={form.name} onChange={update('name')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-negocio" className={labelClass}>{CONTACTO.fields.business.label}</label>
                <input id="c-negocio" autoComplete="organization" className={fieldClass} placeholder={CONTACTO.fields.business.placeholder} value={form.business} onChange={update('business')} />
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="c-email" className={labelClass}>{CONTACTO.fields.email.label}</label>
                <input id="c-email" type="email" autoComplete="email" className={fieldClass} placeholder={CONTACTO.fields.email.placeholder} value={form.email} onChange={update('email')} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="c-tel" className={labelClass}>{CONTACTO.fields.phone.label}</label>
                <input id="c-tel" type="tel" autoComplete="tel" className={fieldClass} placeholder={CONTACTO.fields.phone.placeholder} value={form.phone} onChange={update('phone')} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="c-tipo" className={labelClass}>{CONTACTO.fields.type.label}</label>
              <select id="c-tipo" className={`${fieldClass} bg-surface-raised`} value={form.type} onChange={update('type')}>
                {CONTACTO.types.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="c-msg" className={labelClass}>{CONTACTO.fields.message.label}</label>
              <textarea id="c-msg" rows={5} className={`${fieldClass} min-h-[140px] flex-1 resize-y py-3.5 leading-normal`} placeholder={CONTACTO.fields.message.placeholder} value={form.message} onChange={update('message')} />
            </div>
            {status === 'error' && (
              <p role="alert" className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-content">
                {error}
              </p>
            )}
            <Button type="submit" size="lg" className="w-full" disabled={status === 'sending'}>
              {status === 'sending' ? CONTACTO.submitting : CONTACTO.submit}
            </Button>
            <p className="text-[13px] text-content-muted">
              {CONTACTO.privacyBefore}
              <Link to="/politica-de-privacidad/" className="text-accent-text underline underline-offset-2">
                {CONTACTO.privacyLink}
              </Link>
              .
            </p>
          </form>
        </div>
      </section>
    </PageShell>
  );
};

export default ContactoPage;
