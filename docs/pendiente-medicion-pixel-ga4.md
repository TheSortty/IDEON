# PENDIENTE — Medición: Pixel de Meta + GA4

> **Estado: pendiente, no empezar todavía.** Se implementa **después** del
> rediseño MPA (ver `docs/plan-rediseno-mpa.md`), para medir sobre las URLs
> definitivas. Cualquier cambio en el sitio mientras tanto tiene que dejar el
> terreno listo para esto (ver "Mientras tanto" al final).

Contexto: la auditoría de marketing (`AUDITORIA-MARKETING.md`) marca la
medición como prioridad 1 antes de invertir en pauta. Hoy no hay ningún tag
instalado. El dominio ya está verificado en Meta (`facebook-domain-verification`
en `index.html`).

---

## Paso 0 — Prerrequisitos (marketing / Celeste, sin código)

- [ ] Propiedad de **GA4** creada → ID de medición `G-XXXXXXX`.
- [ ] **Pixel de Meta** creado en el Business Manager → ID del pixel.
- [ ] Decidir **Google Tag Manager** (recomendado por la auditoría: marketing
      suma etiquetas sin tocar código) o instalación directa (gtag + fbq).
      Si es GTM → ID del contenedor `GTM-XXXXXXX`.
- [ ] Definir quién tiene acceso de administrador a GA4, GTM y Meta.
- [ ] Lista de IPs internas de IDEON para excluir del tráfico.

Los IDs **no son secretos** (van en el HTML público), pueden ir en el repo.

## Paso 1 — Privacidad

- Argentina, Ley 25.326: no exige banner de cookies tipo GDPR, pero la
  **Política de privacidad** (`src/pages/Legal/PoliticaPrivacidadPage.tsx`)
  tiene que mencionar Google Analytics, el Pixel de Meta y las cookies.
- Decidir si igual se muestra un aviso simple de cookies.
- Consent Mode v2 solo es obligatorio para tráfico del EEE; evaluarlo si se
  pauta afuera.

## Paso 2 — Instalación base

- Snippet de GTM (o gtag + Pixel) en `index.html`, `async`, sin bloquear el
  render ni empeorar el LCP. Con el pre-render, el snippet queda en el HTML de
  cada ruta automáticamente (sale del template).
- **page_view en navegación interna**: el sitio usa React Router, así que al
  pasar de página sin recargar hay que avisar el cambio (trigger "History
  Change" en GTM, o un `page_view` manual desde un listener de `useLocation`).
  Si no, GA4 cuenta solo la primera página de cada visita.
- Revisar `public/_headers`: si en algún momento se agrega una
  Content-Security-Policy, habilitar los dominios de Google y Meta.

## Paso 3 — Eventos

Un único módulo `src/lib/analytics.ts` con funciones tipadas
(`trackLead()`, `trackWhatsAppClick(origen)`, …) que hace `dataLayer.push`.
Los componentes nunca llaman a `gtag`/`fbq` directo.

| Acción del usuario | GA4 | Meta |
|---|---|---|
| Envío OK del formulario de contacto (Web3Forms) | `generate_lead` | `Lead` |
| Clic en WhatsApp (param. `origen`: header, flotante, cta, caso, servicio, cotizador) | `whatsapp_click` | `Contact` |
| Cotizador: inicio, cada paso, final (param. `tipo_recomendado`) | `cotizador_start` / `cotizador_step` / `cotizador_complete` | `Lead` al finalizar |
| Clic en teléfono o mail | `contact_click` | `Contact` |
| Visita a una página de servicio o caso | `page_view` (automático) | `ViewContent` |

`/contacto-exitoso/` sigue existiendo como URL de conversión (noindex, fuera
del sitemap): sirve como respaldo para objetivos por URL.

## Paso 4 — Conversiones

- GA4: marcar como **eventos clave** `generate_lead`, `whatsapp_click`,
  `cotizador_complete`.
- Meta: conversiones personalizadas sobre `Lead` y `Contact`.
- Vincular GA4 con **Search Console** (y con Google Ads si se pauta).

## Paso 5 — QA antes de publicar

- Vista previa de GTM + **DebugView** de GA4.
- Meta **Test Events** + extensión Pixel Helper.
- Filtro de tráfico interno activo.
- Probar en celular real (Android + iPhone).

## Paso 6 — Publicar y validar

- 48–72 h comparando eventos contra consultas reales (WhatsApp, formulario).
- Armar audiencias de remarketing por servicio: "visitó
  /servicios/tiendas-online/", "visitó /servicios/sistemas-a-medida/", "inició
  el cotizador y no terminó".

## Paso 7 — Opcional: Conversions API de Meta

Mandar los eventos también desde el servidor (Worker de Cloudflare) para
recuperar señal perdida por iOS y bloqueadores. Requiere un token de acceso
de Meta → va como secreto de Wrangler, **nunca** en el repo.

---

## Dónde enganchar cada evento (estado al terminar el rediseño)

- **Envío OK de formularios** → `submitLead()` en `src/lib/web3forms.ts` (único
  punto). Después del envío se navega a `/contacto-exitoso/` (noindex, fuera del
  sitemap): sirve también como conversión por URL.
- **Cotizador completo** → paso 5 de `src/pages/Cotizar/CotizarPage.tsx` (está
  marcado con un comentario). Parámetro sugerido: `plan_recomendado`.
- **Clics a WhatsApp** → todos los links salen de `whatsappUrl()` en
  `src/constants/contact.ts`; el mensaje precargado dice desde dónde se escribe
  (sirve como `origen`).
- **Clics en "Cotizar"** → `QuoteButton` (`src/components/page/QuoteButton.tsx`),
  con el plan si viene de uno.
- **Navegación interna sin recarga** (React Router): disparar `page_view` en cada
  cambio de ruta (trigger "History Change" en GTM o un listener de
  `useLocation`).

Regla: no sumar scripts de terceros sueltos en componentes.
