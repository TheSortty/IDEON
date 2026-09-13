# IDEON — Design System

Sistema de diseño oficial de IDEON. Es la fuente de verdad para cualquier
componente o pieza nueva: sitio, propuestas comerciales, kits de bienvenida.

## 1. Fuentes de esta versión

- **Fidelidad**: tokens extraídos de `tailwind.config.cjs`, `src/index.css`
  y el uso real en `src/components/**` (grep de clases Tailwind en todo el
  código, no solo lo declarado).
- **Dirección de arte**: los tres documentos en `../design-refs/`
  (propuesta y kit de bienvenida de Corralcoop, propuesta de Spoon
  Restaurante). Son HTML con CSS embebido, no imágenes — se analizó el
  markup y las clases directamente, lo cual da más precisión que analizar
  capturas de pantalla.

Este documento distingue tres estados por cada token/patrón:
**✅ Confirmado** (ya está en el código y se mantiene tal cual), **🟡
Propuesto** (nuevo, sintetizado a partir de las dos fuentes, no aplicado
todavía a ningún archivo de config ni componente) y **❓ Pendiente** (una
inconsistencia real entre lo declarado en `CLAUDE.md` y lo que el código
hace hoy — necesita una decisión del equipo, no la resuelve este documento).

## 2. Color

### ✅ Paleta de marca (confirmada, `tailwind.config.cjs`)

| Token | Hex | Uso |
|---|---|---|
| `brand-background` | `#0C022D` | Fondo general (violeta muy oscuro) |
| `brand-surface` | `#21115C` | Superficies elevadas: tarjetas, modales |
| `brand-primary` | `#D400FF` | Magenta de acento: CTAs, destacados |
| `brand-primary-hover` | `#a100c2` | Estado hover del anterior |
| `brand-text-primary` | `#F8F8F8` | Texto principal |
| `brand-text-secondary` | `#A9A1D1` | Texto secundario, lavanda apagado |

Regla vigente y confirmada: nunca colores por defecto de Tailwind
(`bg-purple-900`, `text-gray-100`) ni hex sueltos. Solo estos seis tokens.

### 🟡 Gradiente de marca (propuesto)

El código actual arma gradientes "al vuelo" combinando `brand-primary` con
colores que no son de marca: `to-purple-600`, `via-blue-500`, `to-blue-500`
(ver `Cta.tsx`, `.text-gradient` en `index.css`). Los tres documentos de
`design-refs` usan en cambio un único gradiente de marca consistente en
todos los CTAs y destacados:

```css
--grad: linear-gradient(100deg, #7C3AED, #E23BFF); /* violeta → magenta */
```

Se propone formalizar esto como un token `brand-gradient` (violeta-magenta,
ambos dentro de la familia del `brand-primary` actual) y dejar de mezclar
`brand-primary` con azules/púrpuras genéricos de Tailwind, que son los que
generan la única inconsistencia de color real que encontré en el código.
**No se tocó `tailwind.config.cjs` ni ningún componente** — es una
recomendación a implementar cuando el equipo la apruebe.

### ❓ Modo claro (pendiente — inconsistencia real, no la resolví)

`CLAUDE.md` dice que la paleta de marca es únicamente oscura y que hay que
preguntar antes de agregar `dark:`. Pero el código ya tiene un
`ThemeSwitcher` funcionando (`src/contexts/ThemeContext`,
`src/components/ui/ThemeSwitcher.tsx`) con modo claro activo en `index.css`
y en la mayoría de los componentes (`Button.tsx`, `Benefits.tsx`,
`CaseStudies.tsx`, etc.), usando colores de Tailwind por defecto
(`gray-100..900`, `blue-500`, `blue-600`) en vez de tokens de marca, porque
nunca se definió una paleta clara oficial.

Esto es exactamente la pregunta que `CLAUDE.md` pide no asumir. No
inventé una paleta clara acá. Hace falta que el equipo decida entre:

1. Definir una paleta clara oficial (tokens `brand-background-light`, etc.)
   y este documento se actualiza con esa tabla.
2. Sacar el modo claro y dejar el sitio únicamente oscuro, como dice hoy la
   identidad de marca — se elimina `ThemeSwitcher` y los `dark:` sobran.

## 3. Tipografía

### ✅ Sitio web (confirmado)

Una sola familia: **Inter**, vía `fontFamily.sans` en `tailwind.config.cjs`.
Escala usada en el código (Tailwind por defecto, sin escala propia
definida): `text-xs` a `text-6xl`, títulos en `font-extrabold`.

### ❓ Piezas comerciales vs. sitio (pendiente)

Los tres documentos de `design-refs` usan una pareja tipográfica distinta a
la del sitio: **Archivo** (900/800, itálica, mayúsculas, para títulos —
`h2.title`, cifras "figure") + **Inter Tight** (cuerpo de texto). Es una
identidad visual fuerte y consistente en las tres piezas, pero `CLAUDE.md`
dice explícitamente "Inter como sans por defecto. No introducir otras
familias" para el sitio.

No agregué Archivo a `tailwind.config.cjs` ni a `index.html` — es una
decisión de marca, no algo para resolver por mi cuenta. Las opciones:

1. **Adoptar Archivo como tipografía de display** en todo el ecosistema
   IDEON (sitio + piezas comerciales), reservando Inter para cuerpo de
   texto. Requiere sumar la fuente al sitio.
2. **Mantener Archivo exclusivo de piezas comerciales** (propuestas, kits,
   PDFs) como una sub-identidad de "documento firmable", separada del
   sitio web que sigue solo con Inter.
3. **Unificar todo bajo Inter**, y las próximas propuestas comerciales se
   rehacen con la tipografía del sitio.

## 4. Espaciado y radios

### ✅ Contenedores (confirmado, uso real en `src/components/sections`)

- Ancho máximo de sección: `max-w-[90rem]` (1440px), centrado, con
  `px-4 sm:px-6 lg:px-8`.
- Ritmo vertical de sección: `py-12 sm:py-16`.
- Grillas de tarjetas: `gap-4` (compactas) a `gap-8` (destacadas).

### ✅ Radios (confirmado, por frecuencia de uso real)

| Radio | Uso dominante |
|---|---|
| `rounded-full` | Botones, badges, chips — el más usado con diferencia (22 apariciones) |
| `rounded-2xl` | Tarjeta principal (`.glass-panel`) |
| `rounded-xl` / `rounded-lg` | Contenedores de ícono dentro de una tarjeta |
| `rounded-md` | Tags/etiquetas pequeñas (ej. badge de categoría en `CaseStudies`) |

Regla: cuanto más chico el elemento (botón, ícono, badge), más redondeado
(`full`); las superficies grandes (tarjetas) usan `2xl`. Se mantiene esta
jerarquía para todo componente nuevo.

## 5. Elevación / sombras

No hay una escala de `shadow-*` de Tailwind en uso — la elevación se
resuelve con dos utilidades propias en `index.css` (✅ confirmadas):

- **`.glass-panel`** — superficie elevada estándar: fondo translúcido +
  `backdrop-blur-lg` + borde sutil + `rounded-2xl` + `shadow-lg`. Es la
  tarjeta por defecto de todo el sitio (Beneficios, Casos de éxito, etc.).
- **`.nav-glass-pill`** — variante "liquid glass" para la navegación:
  blur más fuerte, borde redondeado completo, sombra compuesta con un
  filo de luz superior (`inset 0 1px 0 rgba(255,255,255,.7/.08)`).
- **`animate-neon-glow`** — no es elevación sino énfasis: pulso de
  resplandor magenta (`0 0 5px→30px #D400FF`) para llamar la atención sobre
  un elemento puntual (ej. CTA principal). Usar con moderación — es el
  recurso más "gritón" de la marca.

## 6. Movimiento

### ✅ Confirmado

- Transición global de color/borde: `500ms cubic-bezier(0.4,0,0.2,1)` en
  todo elemento (`index.css`, regla `*,*::before,*::after`).
- Transición de fondo al cambiar de tema: `700ms` para `background-color`,
  `500ms ease` para `color`.
- Micro-interacción de hover en tarjetas/botones: `hover:-translate-y-0.5`
  a `-translate-y-1`, `duration-150` a `duration-300`, `ease-out`.
- `animate-float` / `animate-float-delayed`: flotación vertical suave de
  6s (±20px), la segunda desfasada 3s — para elementos decorativos de
  fondo (ver `ParticleBackground.tsx`).
- `animate-neon-glow`: pulso de 2.5s `ease-in-out infinite alternate`.
- Animaciones de contenido (entradas, scroll reveal): `framer-motion`,
  nunca CSS a mano — regla ya vigente y respetada en el código.

No se agregan animaciones nuevas: las cinco existentes cubren los casos de
uso (fondo decorativo, énfasis puntual, micro-interacción, entrada de
contenido). Reutilizarlas antes de escribir keyframes nuevos.

## 7. Dirección de arte (de `docs/design-refs/`)

Patrones que aparecen consistentemente en las tres piezas comerciales y que
vale la pena preservar como identidad IDEON, traducidos al sistema de
tokens del sitio (sin necesitar Archivo ni colores nuevos):

- **Kicker / eyebrow label**: texto chico, mayúsculas, `letter-spacing`
  amplio, en color de acento, arriba de cada título de sección. Ya existe
  un patrón equivalente informal en el sitio (badges de categoría); se
  propone formalizarlo como componente `Kicker`.
- **Cifras "figure"**: números grandes y protagónicos (ej. "3 etapas",
  "24hs de respuesta") en vez de íconos o ilustraciones para comunicar un
  dato. Encaja directo con la regla de "tarjetas tipográficas de alto
  contraste" pedida — es el recurso visual más alineado a SaaS corporativo.
- **Listas de check/cruz**: `✔` / `✕` tipográficos simples (no íconos de
  librería) para "esto sí" / "esto no". Refuerzan el tono resolutivo sin
  caer en iconografía decorativa.
- **Timeline punto + línea**: para procesos y etapas (ver sección 10).
- **Tarjetas con borde + fondo sólido**, sin sombras decorativas pesadas:
  compatible con `.glass-panel`, solo que las piezas comerciales usan
  fondo sólido (`--panel`/`--panel-2`) en vez de translúcido — variante
  válida para documentos que se leen impresos o en PDF.
- **Diagramas de flujo simples**: cajas conectadas por flechas verticales
  (ver la sección "Integramos, no reemplazamos" de la propuesta Corralcoop)
  para explicar cómo encaja IDEON en el negocio del cliente, sin
  ilustración ni metáfora visual — otra vez, texto + geometría simple.

## 8. Reglas estrictas de estilo

Estas tres reglas aplican a **todo** lo que se diseñe de acá en más — sitio,
propuestas, kits, redes:

1. **Prohibido**: ilustraciones "flat" de stock, avatares/personas
   irreales (generadas o de banco de imágenes), iconografía técnica cliché
   (`</>`, brackets de código, tuercas/engranajes, chips, terminales).
2. **Minimalista, tipo SaaS corporativo / tarjetas tipográficas de alto
   contraste**: el color, la tipografía y el espacio en blanco comunican;
   no la decoración. Cuando haga falta representar una idea, primero se
   prueba con una cifra grande, un ✔/✕, o geometría simple (línea, punto,
   caja) antes de buscar un ícono o ilustración.
3. **Perfil Business Manager (BM), no técnico**: toda pieza —copy e
   imágenes— habla en términos de negocio (tiempo ahorrado, cobranza,
   atención al cliente, presencia online), nunca en términos de
   programación (no "API", "stack", "responsive", "base de datos" en cara
   al cliente — esos términos quedan para documentación interna como esta).
   Las imágenes/íconos, cuando sean estrictamente necesarios, representan
   procesos de negocio (flechas, checklists, gráficos de crecimiento
   simples), nunca objetos de programación.

**Iconografía**: hoy el sitio usa SVG de línea genéricos (Heroicons-style,
inline, sin librería — ver `Benefits.tsx`, `NavIcons.tsx`, `SocialIcons.tsx`,
`RoleIcons.tsx`). Es compatible con la regla 1 (no son ilustraciones ni
clichés técnicos) y no depende de agregar una librería nueva. Se mantiene
este enfoque: **SVG de línea, simple, dibujado a mano o adaptado, un color
(`currentColor`), nunca ilustración a color ni set de terceros** sin
plantearlo antes (regla de `CLAUDE.md` sobre dependencias nuevas).

## 9. Componentes

| Componente | Estado | Ubicación / spec |
|---|---|---|
| `Button` (primary / outline / secondary) | ✅ Existe | `src/components/ui/Button.tsx` |
| `.glass-panel` (tarjeta) | ✅ Existe | `src/index.css` |
| `.nav-glass-pill` (nav) | ✅ Existe | `src/index.css` |
| Kicker / eyebrow label | 🟡 Propuesto | Formalizar como componente reutilizable — hoy cada sección arma su propia etiqueta a mano |
| Stat / "figure" (cifra grande) | 🟡 Propuesto | Extraído de `design-refs`; no existe hoy como componente en el sitio |
| Checklist ✔/✕ | 🟡 Propuesto | Extraído de `design-refs`; el sitio no tiene una lista de este tipo hoy |
| Timeline (punto + línea) | 🟡 Propuesto | Extraído de `design-refs`; útil para una futura sección "Cómo trabajamos" en el sitio |

Ver `style-guide.html` en esta misma carpeta para una referencia visual de
los tokens de color, tipografía, botones y los tres componentes propuestos,
todos con los tokens reales de `tailwind.config.cjs` (fondo oscuro, sin
Archivo — para no adelantar la decisión pendiente de la sección 3).

## 10. Qué falta / decisiones pendientes

Esto responde directamente "¿nos faltaría algo?":

1. **Modo claro** (sección 2, ❓): el `ThemeSwitcher` está vivo pero corre
   sobre colores de Tailwind por defecto, no sobre tokens de marca. Es la
   brecha más grande entre lo que dice `CLAUDE.md` y lo que hace el código.
2. **Tipografía de display** (sección 3, ❓): decidir si Archivo entra al
   sitio, queda exclusivo de piezas comerciales, o se abandona.
3. **`clsx` y `tailwind-merge`** están instalados (`package.json`) pero
   **no se usan en ningún componente** — todo `className` se arma con
   template strings a mano. Si se van a aprovechar (como dice la
   convención de `CLAUDE.md`), conviene un helper `cn()` chico en
   `src/lib/utils.ts` antes de escalar el design system a más componentes.
4. **Gradiente de marca** (sección 2, 🟡): reemplazar `to-purple-600` /
   `via-blue-500` por el `brand-gradient` propuesto, para que el único
   gradiente de la marca no dependa de colores que no son de IDEON.
5. **Sin escala tipográfica nombrada**: el sitio usa toda la escala de
   Tailwind (`text-xs` a `text-6xl`) sin una jerarquía documentada de
   cuándo usar cada tamaño. Vale la pena nombrar 4-5 niveles (display,
   h1, h2, body, caption) en vez de elegir el tamaño a ojo en cada sección.
6. **Sin dirección de imagen/fotografía**: ni el sitio ni `design-refs`
   usan fotos reales (de clientes, del equipo, de Mendoza). Dado que la
   regla 1 prohíbe stock e ilustración, falta definir si IDEON va a usar
   fotografía real en algún momento (equipo, oficina, clientes con
   permiso) o si el sistema se apoya 100% en tipografía + color + geometría
   simple, como hasta ahora.
7. **Contraste**: no hay chequeo documentado de contraste
   `brand-text-secondary` (`#A9A1D1`) sobre `brand-background` (`#0C022D`)
   ni sobre `brand-surface` (`#21115C`) para accesibilidad (WCAG AA). Antes
   de escalar el sistema a más pantallas de texto largo, conviene
   verificarlo.
