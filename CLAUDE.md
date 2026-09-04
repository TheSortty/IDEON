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
- **Cloudflare Workers** con static assets, vía `@cloudflare/vite-plugin` y `wrangler 4`

## Comandos

```bash
npm ci              # instalar dependencias (usar ci, no install)
npm run dev         # servidor de desarrollo de Vite
npm run build       # vite build
npm run preview     # build + wrangler dev (emula Workers localmente)
npm run deploy      # build + wrangler deploy  ← NO EJECUTAR (ver Reglas)
```

No hay script de lint ni de tests.

## Estructura

```
/
├── index.html              # entrada de Vite (raíz, no en public/)
├── public/                 # assets estáticos servidos tal cual
├── src/
│   ├── main.tsx            # punto de montaje de React
│   ├── App.tsx             # componente raíz
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

- `wrangler.jsonc` tiene `"not_found_handling": "single-page-application"`, pero el
  refactor de hace 6 meses ("prepara proyecto para Cloudflare Pages y MPA") apuntaba
  a multipágina, y existe `src/pages/Home`. La migración quedó a medio camino.
  **Es una decisión pendiente del equipo, no un bug para resolver por tu cuenta.**
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

- **Tipografía**: `Inter` como sans por defecto. No introducir otras familias.
- **Animaciones propias** ya disponibles como utilidades: `animate-neon-glow`
  (pulso de resplandor magenta), `animate-float` y `animate-float-delayed`
  (flotación suave de 6s, la segunda desfasada 3s). Reutilizarlas antes de
  escribir keyframes nuevos.

La estética es neón sobre fondo oscuro. Cualquier componente nuevo tiene que
sostener ese registro.

## Nota sobre el tema claro/oscuro

`tailwind.config.cjs` tiene `darkMode: 'class'` configurado, pero **la paleta de
marca es únicamente oscura**: no hay variantes claras definidas para ninguno de los
tokens. El README viejo describe un switcher de tema claro/oscuro con persistencia
en `localStorage`, pero eso corresponde a la versión anterior del proyecto.

Antes de agregar variantes `dark:` a un componente, verificar en `src/index.css` y
en los componentes existentes si el switcher sigue vivo. **Si no está claro,
preguntar** en lugar de asumir.

---

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
