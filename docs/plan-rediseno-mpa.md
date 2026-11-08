# Plan — Rediseño de Celeste y migración a MPA

Fuente del diseño: canvas "IDEON — Sitio web completo" (Claude Design), armado
por Celeste. 13 páginas + 3 componentes (Header con menú de Servicios, Footer,
carrusel de proyectos). Los diseños están a 1440 px: el responsive (375 / 768 /
1440) se resuelve y se verifica en la implementación.

## Decisiones tomadas (08/11/2026)

| # | Tema | Decisión |
|---|---|---|
| 1 | Arquitectura | **MPA con HTML pre-generado por ruta** en el build. Aprobado tocar `vite.config.ts`, `wrangler.jsonc` y scripts de build para esto. Cierra la "decisión pendiente" SPA/MPA de `CLAUDE.md`. |
| 2 | Routing | **React Router** (dependencia nueva aprobada). |
| 3 | Tema | Se mantiene **claro + oscuro**. El claro se arma con la paleta del sistema de diseño llevada a claro. |
| 4 | Colores fuera de paleta | **Abierto.** No usar colores sueltos. Buscar otro recurso visual para dar variedad en listas, grillas, ventajas y funciones. Se presentan opciones. |
| 5 | Reseñas | Rediseñarlas más cerca del lenguaje visual de IDEON (sin imitar la tarjeta de Google). |
| 6 | Animaciones | framer-motion para entradas e interacciones; loops decorativos infinitos como utilidades CSS de Tailwind (igual que `animate-float`). |
| 7 | Formulario de `/contacto` | Conectado a **Web3Forms** (misma config que `ContactModal`) y redirige a `/contacto-exitoso/`. |
| 8 | Nosotros · historia | Texto final abajo. |
| 9 | Caso Corralcoop | Sacar "alta de servicio online". Reemplazar por el portal como puente directo a la atención personalizada por WhatsApp. Pagos: se mantiene (casi terminado). |
| 10 | Precios en el Schema | **Abierto.** Pendiente de recomendación. |
| 11 | Casos | Home, Under Club y Corralcoop enlazan a su caso, y cada caso muestra la URL del sitio real. AM Suministros y Borea: "Próximamente". |
| 12 | Reseñas reales de Google | **Abierto.** Conectar las reseñas reales del perfil de Google (paso a paso aparte). |
| 13 | Erratas del diseño | Se corrigen ("podés", "desarrollo", etc.). |
| 14 | Entrega | **Por etapas**, una por PR, con capturas a 375 / 768 / 1440. |

### Texto de historia (Nosotros)

> Tras vivenciar el problema de muchas empresas, que usan software de una SaaS
> externa, con una mensualidad obligatoria para sostener la operativa interna, y
> sin la seguridad de hasta cuánto eso sería así, tuvimos una idea.
>
> O más bien, un IDEON: crear una agencia en Mendoza, dedicada al desarrollo de
> software a medida, desde una landing page simple hasta un ERP completo y
> nativo.
>
> Apasionados por solucionar problemas de operación, gestión, cobranza,
> interacción y posicionamiento a través de la tecnología.

## Etapas

- [ ] **A — Base MPA.** React Router + pre-render de cada ruta a HTML estático,
      meta/canonical/JSON-LD por ruta en el HTML servido, 404 real. Sin cambio
      visual: las páginas actuales siguen igual.
- [ ] **B — Sistema visual.** Tokens nuevos (claro y oscuro), Header con menú de
      Servicios, Footer, fondo de partículas, utilidades de animación.
- [ ] **C — Inicio.**
- [ ] **D — Servicios** (`/servicios`, `/servicios/paginas-web`,
      `/servicios/tiendas-online`, `/servicios/sistemas-a-medida`).
- [ ] **E — Casos** (`/casos`, `/casos/home`, `/casos/under-club`,
      `/casos/corralcoop`).
- [ ] **F — Nosotros, Preguntas, Contacto, Cotizar.** Sitemap final.

## SEO: lo que no se puede perder

Título y description únicos por ruta · canonical con barra final · OG/Twitter
por ruta · JSON-LD de Organization/WebSite (index.html) + WebPage, Breadcrumb y
FAQPage por ruta · un solo H1 por página · alt en imágenes · Inter self-hosted ·
imágenes `.webp` con tamaños · sitemap actualizado · `/contacto-exitoso/`
noindex · URLs actuales (`/`, legales, `/contacto-exitoso/`) sin cambios.

## Después del rediseño

Medición con Pixel + GA4: ver `docs/pendiente-medicion-pixel-ga4.md`.
