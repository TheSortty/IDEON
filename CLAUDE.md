# IDEON — Landing page

Landing page de IDEON. Repositorio: `TheSortty/IDEON`. Rama de trabajo: `main`.

> **El `README.md` de este repo está desactualizado.** Describe una versión anterior
> del proyecto (sin build step, React por `importmap`, Tailwind por CDN, componentes
> en la raíz, deploy en Vercel/Netlify). Nada de eso es cierto hoy. Ignoralo como
> fuente de verdad y guiate por este archivo.

---

## Stack

- **React 19.2** + **TypeScript 5.8**
- **Vite 6.2** como bundler (`@vitejs/plugin-react`)
- **Tailwind CSS 3.4** compilado localmente vía PostCSS + autoprefixer
  (config en `tailwind.config.cjs` y `postcss.config.cjs`)
- **framer-motion 12** para animaciones
- **clsx** + **tailwind-merge** para componer clases condicionales
- **React Router 7** (`react-router`) para las rutas
- **MPA pre-renderizada**: al final de `vite build`, `scripts/prerender.mjs` genera
  un HTML estático por ruta (contenido + `<head>` propio) y React lo hidrata en el
  navegador
- **Cloudflare Workers** con static assets, vía `@cloudflare/vite-plugin` y `wrangler 4`

## Comandos

```bash
npm ci              # instalar dependencias (usar ci, no install)
npm run dev         # servidor de desarrollo de Vite
npm run build       # vite build + pre-render de cada ruta a dist/<ruta>/index.html
npm run preview     # build + wrangler dev (emula Workers localmente)
npm run deploy      # build + wrangler deploy  ← NO EJECUTAR (ver Reglas)
```

No hay script de lint ni de tests.

## Estructura

```
/
├── index.html              # entrada de Vite (raíz, no en public/)
├── public/                 # assets estáticos servidos tal cual
├── scripts/prerender.mjs   # genera el HTML de cada ruta (lo llama vite.config.ts)
├── src/
│   ├── main.tsx            # punto de montaje de React (hidrata el HTML pre-renderizado)
│   ├── entry-server.tsx    # render a string, solo para el pre-render del build
│   ├── routes.tsx          # LISTA DE RUTAS: única fuente para el router y el pre-render
│   ├── App.tsx             # componente raíz
│   ├── seo/                # HeadContext: el <head> de cada página en el pre-render
│   ├── index.css           # directivas de Tailwind y estilos globales
│   ├── components/         # componentes reutilizables
│   ├── constants/          # TEXTOS Y CONTENIDO del sitio
│   ├── contexts/           # contextos de React (estado global)
│   └── pages/Home/         # componentes propios de la home
├── tailwind.config.cjs
├── postcss.config.cjs
├── vite.config.ts
├── tsconfig.json
└── wrangler.jsonc          # config de Cloudflare Workers
```

## Convenciones

- **El copy del sitio vive en `src/constants/`**, no hardcodeado en los componentes.
  Si un cambio es de texto, editá ahí. Solo tocá el JSX si además cambia la estructura.
- **Tailwind se compila localmente.** Solo se pueden usar clases que Tailwind pueda
  detectar estáticamente. Nada de nombres de clase armados por concatenación en runtime.
  Para clases condicionales, usar `clsx`; para resolver conflictos, `tailwind-merge`.
- **Sin librerías de UI.** Los componentes son propios y viven en `src/components/`.
  Antes de crear uno nuevo, revisá si ya existe algo equivalente.
- Las animaciones se hacen con `framer-motion`, no con CSS a mano ni otra librería.

## Verificación antes de pushear

No hay CI que actúe de red de seguridad, y `npm run build` **no chequea tipos**.
Antes de dar por terminado cualquier cambio, correr las dos cosas:

```bash
npx tsc --noEmit
npm run build
```

Si alguna falla, arreglarlo antes de pushear.

## Reglas

- **Nunca correr `npm run deploy` ni ningún comando de `wrangler` que publique.**
  El deploy a producción lo hace una persona, a mano. Tu trabajo termina en la rama.
- **No modificar `wrangler.jsonc`, `vite.config.ts` ni `tsconfig.json`** sin
  preguntar primero. Son configuración de infraestructura.
- **No "arreglar" el `README.md`** como efecto colateral de otra tarea. Si hay que
  actualizarlo, que sea su propia tarea y su propio PR.
- No agregar dependencias nuevas sin plantearlo antes y justificar por qué no
  alcanza con lo que ya está instalado.

## Cosas raras conocidas (no tocar sin consultar)

- **El sitio es MPA pre-renderizada** (decidido el 08/11/2026, reemplaza la
  "migración a medio camino" SPA/MPA). `wrangler.jsonc` usa
  `"not_found_handling": "404-page"`: una ruta inexistente devuelve `dist/404.html`
  con status 404. **Una página nueva se agrega en `src/routes.tsx`** (y en
  `public/sitemap.xml` si es indexable); si no está ahí, da 404 en producción.
- **Todo componente tiene que poder renderizarse en Node** (pre-render): nada de
  `window`/`document`/`localStorage` durante el render, solo en efectos o handlers.
  Y el primer render del navegador tiene que coincidir con el del build
  (hidratación): lo que dependa del navegador (tema, ancho de pantalla) se ajusta
  en un efecto después de montar. Título, description, canonical y robots van con
  `useDocumentMeta`; el JSON-LD de la página con `useJsonLd`. Los dos llegan al
  HTML estático solos.
- Existe una rama `cloudflare/workers-autoconfig` generada automáticamente por el bot
  de Cloudflare. Está abandonada y atrasada respecto de `main`. Ignorala.

---

## Identidad visual

Definida en `tailwind.config.cjs`. **Usar siempre estos tokens, nunca valores
hexadecimales sueltos ni clases de color por defecto de Tailwind** (nada de
`bg-purple-900` ni `text-gray-100`).

| Token | Hex | Uso |
|---|---|---|
| `brand-background` | `#0C022D` | fondo general (violeta muy oscuro) |
| `brand-surface` | `#21115C` | superficies elevadas: tarjetas, modales |
| `brand-primary` | `#D400FF` | magenta de acento: CTAs, destacados |
| `brand-primary-hover` | `#a100c2` | estado hover del anterior |
| `brand-text-primary` | `#F8F8F8` | texto principal |
| `brand-text-secondary` | `#A9A1D1` | texto secundario, lavanda apagado |

En los componentes se usan los **roles** (cambian solos con el tema claro/oscuro,
definidos en `src/index.css`): `surface-base`, `surface-raised`, `content`,
`content-muted`, `accent`, `accent-solid`, `accent-text` (acento para texto: pasa
AA en los dos temas), `accent-2` (el azul `#3B82F6`/`#2563EB`, que es el
`accent-secondary` del IDEON Design System: solo para el degradado de marca
magenta → azul y acentos secundarios), `whatsapp` (verde de la marca WhatsApp,
solo para su botón) y `--lamp-*` (amarillos de la lamparita ASCII del hero: son
de la ilustración, no se usan en la interfaz).

**Única excepción a la paleta: los casos.** En el carrusel de `/casos/` y en los
paneles de trabajos destacados del Inicio, cada proyecto se muestra con los colores
de su cliente (clases `.t-home`, `.t-under`, `.t-corral`, `.t-am`, `.t-borea`,
`.t-bb` de `src/index.css`, tal cual el diseño de Celeste), para darle protagonismo
al proyecto. Esos colores no se usan en ningún otro lugar.

Primitivas del rediseño: `Button` (variantes `primary`, `outline`, `ghost`,
`light`; `to` para links internos), `SpotlightCard` (vidrio + luz que sigue al
cursor + texturas), `Reveal` (aparición al scrollear; no usar en lo que se ve al
cargar) y las clases `.glass`, `.texture-dots`, `.texture-grid`, `.num-outline`,
`.text-gradient` de `src/index.css`.

- **Tipografía**: `Inter` como sans por defecto. No introducir otras familias.
- **Animaciones propias** ya disponibles como utilidades: `animate-neon-glow`
  (pulso de resplandor magenta), `animate-float` y `animate-float-delayed`
  (flotación suave de 6s, la segunda desfasada 3s), `animate-gradient-pan`,
  `animate-orb`/`animate-orb-reverse` y `animate-ping-soft`. Reutilizarlas antes
  de escribir keyframes nuevos. Los **loops decorativos infinitos** van como
  estas utilidades CSS (corren sin JS); las entradas e interacciones, con
  framer-motion.

La estética es neón sobre fondo oscuro. Cualquier componente nuevo tiene que
sostener ese registro.

## Nota sobre el tema claro/oscuro

`tailwind.config.cjs` tiene `darkMode: 'class'`. Los roles de color (`surface-base`,
`content`, `accent`, …) apuntan a custom properties de `src/index.css` que cambian
con el tema, así que en general no hace falta escribir variantes `dark:`.

El switcher claro/oscuro **sigue vivo y se mantiene** (decisión 08/11/2026): el
tema claro se arma con la paleta del sistema de diseño llevada a claro. El tema
inicial lo aplica un script inline en el `<head>` de `index.html`, antes del primer
pintado; `ThemeContext` solo lee esa clase.

---

## Trabajo en curso y pendiente

- **Rediseño + migración a MPA, en curso por etapas:** `docs/plan-rediseno-mpa.md`
  (decisiones tomadas, etapas y checklist de SEO).
- **PENDIENTE (después del rediseño) — Pixel de Meta + GA4:**
  `docs/pendiente-medicion-pixel-ga4.md`. No implementarlo todavía, pero todo
  cambio tiene que dejar el terreno listo (ver "Mientras tanto" en ese doc).
- **PENDIENTE — Reseñas reales de Google:** `docs/pendiente-resenas-google.md`.
  Hasta entonces la sección de reseñas no se muestra.

## TODO — completar

- [ ] **Integraciones externas**: qué servicios están conectados (formularios,
      analytics) y dónde viven sus claves o endpoints. El README viejo menciona
      Web3Forms y Tally.so — confirmar si siguen en uso tras el refactor.
- [ ] **Tono de la copy**: cómo le habla IDEON a su cliente. Útil para cualquier
      cambio de texto en `src/constants/`.
- [ ] **Origen del proyecto**: definir si Google AI Studio sigue sincronizando con
      este repo. Si lo hace, coordinar para que no pise el refactor a Vite.
- [ ] **Convención de ramas y commits**: si hay un prefijo esperado
      (los commits actuales usan `feat:`, `copy:`, `fix:`, `Refactor:`).
