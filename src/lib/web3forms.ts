// Envío de formularios a Web3Forms (el servicio que ya recibía las consultas
// del sitio). La access key es pública por diseño: Web3Forms la usa solo para
// saber a qué casilla reenviar, no da acceso a nada.
//
// Único punto de "envío OK" de los formularios: cuando se instale la medición
// (docs/pendiente-medicion-pixel-ga4.md), el evento `generate_lead` va acá.

const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = '6ff694f4-3a26-42bf-b439-59cfdd349ab6';

export type SubmitResult = { ok: true } | { ok: false; reason: 'network' | 'rejected'; message?: string };

export async function submitLead(subject: string, fields: Record<string, string>): Promise<SubmitResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...fields, access_key: ACCESS_KEY, subject, from_name: 'Notificación IDEON' }),
    });
    const json = (await res.json()) as { success?: boolean; message?: string };
    return json.success ? { ok: true } : { ok: false, reason: 'rejected', message: json.message };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
