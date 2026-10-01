# Auditoría de Marketing: IDEON

**URL:** https://ideon.ar
**Fecha:** 1 de octubre de 2026
**Tipo de negocio:** Agencia / Servicios (con componente de negocio local: Mendoza)
**Marketing Score global: 55/100 (Nota: C — huecos significativos que atender)**

> **Alcance y límites de esta auditoría**
> - Se analizó el **código fuente** del sitio (repo `TheSortty/IDEON`, rama `main`), que es exactamente lo que se publica. El sitio en vivo no se pudo descargar desde este entorno (bloqueo de red), así que no hay mediciones reales de velocidad ni capturas.
> - **No hay datos de tráfico ni conversiones** (todavía no hay Pixel ni GA4). Los impactos estimados son escenarios con supuestos explícitos, no proyecciones.
> - La metodología original de la skill está pensada para España y en EUR; acá se adaptó a Argentina y se expresa en USD.
> - La competencia se relevó por búsqueda web; los sitios de competidores no se pudieron abrir en detalle.

---

## Resumen ejecutivo

IDEON tiene una base técnica **mejor que la media** de las agencias chicas: Schema completo, sitemap, canonicals por ruta, `llms.txt`, imágenes optimizadas, accesibilidad cuidada y precios visibles. El problema no es la calidad de lo que hay, sino **cuánto hay y cómo está organizado**: todo el negocio vive en **una sola URL indexable**, renderizada por JavaScript, sin medición, y con un recorrido hacia el contacto que da más vueltas de las necesarias.

**La hipótesis del equipo es correcta, con un matiz.** Google no "castiga" una landing de una página, pero una sola URL **solo puede competir por un grupo de búsquedas**. Hoy IDEON no tiene dónde rankear para "tienda online Mendoza", "sistema a medida para mi negocio" o "cuánto cuesta una página web", y los competidores que aparecen primero en Mendoza lo hacen justamente con **páginas dedicadas** (`/paginas-web-mendoza/`, `/diseno-web-mendoza`, `/servicios/diseno-web/mendoza`). Lo mismo aplica a la pauta: un anuncio de "tienda online" que cae en una home genérica convierte peor que uno que cae en una página de tiendas online.

**Mayor fortaleza:** honestidad comercial poco común en el rubro — precios desde USD 200 a la vista, código y dominio a nombre del cliente, sin permanencia. Es un diferencial real.
**Mayor hueco:** ese diferencial está **enterrado en el FAQ**, la prueba social es mínima (2 casos, sin testimonios ni números) y no hay forma de medir nada.

**Las 3 acciones que más mueven la aguja:**
1. **Instalar medición** (Pixel + GA4 + eventos de contacto) antes de invertir un peso en pauta. En curso con Celeste.
2. **Pasar de landing única a arquitectura hub + páginas de servicio**, prerenderizadas a HTML estático. Es la respuesta directa a la hipótesis del equipo y la base de SEO y pauta.
3. **Reescribir el hero y acortar el camino al contacto**: H1 con qué, para quién y dónde; CTA principal que lleve a WhatsApp, no a la sección de casos.

---

## Desglose del score

| Categoría | Score | Peso | Ponderado | Hallazgo clave |
|---|---|---|---|---|
| Contenido y Mensaje | 60/100 | 25% | 15,0 | H1 genérico; diferenciales escondidos en el FAQ; poca prueba social |
| Optimización de Conversión | 52/100 | 25% | 13,0 | CTA principal no convierte (scrollea a casos); cero medición |
| SEO y Descubrimiento | 58/100 | 15% | 8,7 | Técnica muy buena, pero 1 sola URL de contenido y renderizado solo por JS |
| Posicionamiento Competitivo | 50/100 | 15% | 7,5 | "A medida" lo dice todo Mendoza; colisión de marca con "Ideon" muebles |
| Marca y Confianza | 62/100 | 10% | 6,2 | Equipo con nombre y casos reales en producción, pero sin fotos ni reseñas |
| Crecimiento y Estrategia | 50/100 | 10% | 5,0 | Sin captura de leads ni ingresos recurrentes productizados |
| **TOTAL** | | **100%** | **55/100** | |

---

## Quick wins (esta semana)

Todos son cambios de copy o de comportamiento en componentes existentes, sin dependencias nuevas.

1. **Reescribir el H1 del hero** (`src/components/sections/Hero.tsx`).
   Hoy: *"Impulsá tu negocio con tecnología a medida. Tu idea, nuestro desarrollo."* No dice qué hacen, para quién ni dónde, y no contiene ninguna búsqueda real.
   Propuesta: *"Páginas web, tiendas online y sistemas a medida para negocios de Mendoza y Argentina."* + subtítulo con el diferencial: *"Desde USD 200. El código y el dominio quedan a tu nombre."*
   Por qué: pasa el test de los 5 segundos, mete las keywords en el H1 y adelanta el diferencial más fuerte.

2. **Cambiar el CTA principal del hero.** Hoy "Consultar proyectos →" **scrollea a #casos**: el botón más visible del sitio no lleva a una conversión. Que sea "Pedí tu cotización por WhatsApp" con mensaje precargado, y "Ver proyectos" como secundario (outline).

3. **Precargar mensaje y origen en el botón flotante de WhatsApp** (`FloatingWhatsAppButton.tsx`). Es el único CTA de WhatsApp sin mensaje: cuando llega una consulta desde ahí, no sabés de dónde vino. Ej.: *"Hola IDEON, vengo de la web y quiero consultar por…"*.

4. **Simplificar el camino de los botones de planes** (`Plans.tsx`). Hoy: clic → scroll hasta #contacto → espera 700 ms → abre el modal. Es una animación que se siente como un error. Abrir el modal directo, con el plan preseleccionado (ya lo soporta).

5. **Subir los diferenciales del FAQ a la página.** "El código es tuyo", "sin mantenimiento obligatorio", "25% al iniciar / 75% al entregar" y "especialista en Meta Ads en el equipo" son argumentos de venta, no dudas frecuentes. Llevar 3 de ellos a la sección "Trabajamos distinto" reemplazando los más genéricos ("Asesoramiento: sesiones de acompañamiento y de feedbacks", "Ideamos para crecer").

6. **Sumar prueba social concreta al lado de los casos.** Aunque sea una cita corta del cliente de Home y de Under Club, con nombre y rol. Under Club hoy no tiene ni capturas: agregarlas.

7. **Fotos reales del equipo** en "Quiénes somos". Hoy hay íconos. En servicios profesionales de ticket medio/alto, ver caras es de lo que más confianza genera, y se puede aprovechar el mismo material para la pauta.

8. **Eliminar el código muerto de Tally** (`TallyModal.tsx` y su contexto): está montado en la app pero ningún botón lo abre. No afecta al usuario, pero suma peso y confusión ("¿qué formulario usamos?").

9. **Pedir reseñas en Google Business Profile** a los clientes actuales. Ya está vinculado en el Schema (`sameAs`); las reseñas son lo que más pesa en búsquedas locales ("diseño web Mendoza").

---

## Recomendaciones estratégicas (este mes)

### 1. Medición completa antes de pautar  *(en curso: Celeste)*
- Pixel de Meta + GA4 (idealmente vía Google Tag Manager, así marketing puede sumar etiquetas sin tocar código).
- Eventos: `Contact` / `Lead` en **cada** clic de WhatsApp (con un parámetro que diga desde qué botón) y en el envío del formulario (la página `/contacto-exitoso/` ya existe y sirve como conversión).
- Más adelante: API de Conversiones de Meta, para no depender solo del navegador.
- **Implementación:** cuando estén los IDs, es una tarea de código chica. Requiere acordarla antes por ser servicio externo nuevo (regla del `CLAUDE.md`).

### 2. De landing única a arquitectura hub + páginas de servicio
Esta es la respuesta a la pregunta del equipo. Propuesta de mapa:

```
ideon.ar/                              ← home "hub": más corta, resume y deriva
├── /paginas-web/                      ← landings e institucionales (Starter)
├── /tiendas-online/                   ← e-commerce
├── /sistemas-a-medida/                ← CRM, plataformas, campus (Enterprise)
├── /meta-ads/                         ← el servicio que hoy solo aparece en el FAQ
├── /casos/                            ← índice de casos
│   ├── /casos/home-campus-coaching/
│   └── /casos/under-club/
├── /nosotros/                         ← equipo con fotos, historia, forma de trabajo
└── (más adelante) /guias/ o /blog/    ← contenido para búsquedas informativas
```

Por qué resuelve los tres problemas que planteaste:
- **SEO:** cada página puede apuntar a su propio grupo de búsquedas ("tienda online Mendoza", "desarrollo de sistemas a medida", "precio página web Argentina") con su propio título, H1, FAQ y Schema `Service`. Hoy todas esas intenciones compiten por la misma URL.
- **Pauta:** cada campaña cae en la página de lo que anuncia (*message match*). Es lo que más sube la conversión en Meta y lo que mejora el Nivel de calidad en Google Ads, que abarata el clic.
- **Scroll largo / "no nos guardamos nada":** la home deja de cargar con todo y pasa a ser una vidriera que deriva. Y algo que suele pasarse por alto: **cada clic hacia una página de servicio es un dato**. Con el Pixel instalado, "visitó /tiendas-online/" es un público de remarketing listo para usar, cosa que con una sola página es imposible distinguir.

**Matiz importante:** más páginas no es automáticamente mejor para convertir: cada clic extra es un punto donde alguien puede irse. Por eso la propuesta es híbrida: **la home sigue teniendo CTAs a WhatsApp en todas las secciones**, y las páginas de servicio también. Nadie está obligado a navegar para contactar.

**Requisito técnico (decisión del equipo):**
Hoy el sitio se renderiza **solo en el navegador**: el HTML que sale del servidor tiene un `<div id="root">` vacío y todo el contenido aparece después de ejecutar JavaScript. Google lo procesa, pero en una segunda pasada y con menos garantías; las redes sociales, WhatsApp, Bing y la mayoría de los buscadores con IA **no ejecutan JavaScript** y ven la página vacía (salvo los meta tags del `index.html`, que por eso funcionan). Además, con `"not_found_handling": "single-page-application"` **cualquier URL inventada** (`ideon.ar/lo-que-sea`) responde 200 con la home: Google lo considera *soft 404*.
Para que las páginas nuevas valgan, cada una tiene que **salir del servidor como HTML ya armado** (prerender / generación estática con Vite) y las rutas inexistentes tienen que responder 404. Esto toca `wrangler.jsonc`, `vite.config.ts` y probablemente suma una dependencia: según el `CLAUDE.md`, es la **migración a multipágina que quedó a medio camino** y requiere decisión del equipo. Esta auditoría recomienda completarla.

### 3. Primera pauta en Meta: Click-to-WhatsApp
- Objetivo: mensajes a WhatsApp (Meta los mide de forma nativa, aun antes de tener todo el Pixel fino).
- Segmentación: Mendoza primero (es donde la cercanía es diferencial), Argentina después.
- 3 ángulos creativos para testear: (a) precio "desde USD 200, todo a tu nombre", (b) caso real (campus de Home con capturas), (c) dolor "tu negocio depende de Instagram" (el contenido de "Web vs Redes Sociales" ya existe).
- Presupuesto de prueba chico y 2 semanas mínimo antes de sacar conclusiones.
- Siguiente paso: `/marketing ads ideon.ar` para armar las piezas.

### 4. Captura de leads que no están listos para escribir
Hoy las únicas opciones son WhatsApp o el formulario: quien está "mirando" se va sin dejar rastro. Opciones de bajo costo: un checklist "¿Tu negocio necesita web o alcanza con Instagram?" o un "Calculá el presupuesto de tu web" (3–4 preguntas → rango de precio → WhatsApp). El segundo además califica al lead.

### 5. Resolver la colisión de marca
Buscar "Ideon Argentina" devuelve una marca de muebles y sillas gamer en Mercado Libre y una fabricante de computadoras en Rosario (el `llms.txt` ya lo aclara para las IA). Para Google: usar consistentemente **"IDEON Estudio"** o **"IDEON desarrollo web"** en títulos, perfiles y Google Business Profile, y sumar contenido que asocie la marca con Mendoza y desarrollo.

---

## Iniciativas a largo plazo (este trimestre)

1. **Contenido para búsquedas informativas** (`/guias/`): "cuánto cuesta una página web en Argentina en 2026", "Tiendanube vs tienda a medida", "web o Instagram para mi negocio". Ya tienen el argumento escrito en la sección "Oportunidades de crecimiento"; falta convertirlo en páginas indexables. Captan gente antes de que busque proveedor.
2. **Páginas de caso de estudio completas**: problema → solución → resultado con números (alumnos activos, horas ahorradas, ventas gestionadas). Son la mejor prueba social para Enterprise y el mejor destino para anuncios de retargeting.
3. **Productizar el ingreso recurrente**: el FAQ menciona "plan de horas mensuales" y el equipo tiene especialista en Meta Ads, pero ninguno de los dos se ofrece como plan. Un "Plan Crecimiento" (mantenimiento + gestión de pauta mensual) convierte clientes de una sola vez en abonos.
4. **Google Ads de búsqueda** sobre las páginas de servicio, una vez que estén publicadas y midiendo: "diseño web Mendoza", "tienda online precio", "desarrollo de sistemas a medida".

---

## Análisis detallado por categoría

### Contenido y Mensaje — 60/100

**Funciona:**
- Tono cercano y en voseo, coherente en todo el sitio.
- El FAQ es excelente: responde objeciones reales (propiedad del código, pagos, mantenimiento, qué pasa si no convence).
- "Oportunidades de crecimiento" tiene argumentos de venta muy buenos (dependencia de redes, decisión de compra en Google).
- Las imágenes de casos son producto real con textos alternativos descriptivos.

**No funciona:**
- **H1 genérico.** "Impulsá tu negocio con tecnología a medida" podría ser de cualquier agencia del mundo. El eyebrow "Diseño + desarrollo + estrategia" tampoco ancla.
- **"Trabajamos distinto"** promete diferencia pero varias tarjetas son genéricas ("Asesoramiento", "Ideamos para crecer"). Lo verdaderamente distinto (código a tu nombre, sin permanencia, precio visible) está más abajo, en el FAQ.
- **Prueba social escasa:** 2 casos (uno sin imágenes), ningún testimonio, ninguna cifra ("X proyectos", "X años", "respuesta en menos de 24 h").
- **"Empresas que confían en nosotros"** como título de una sección con 2 proyectos sobrepromete. "Proyectos en producción" es más honesto y suena más sólido.
- **Navegación con nombres confusos:** "Proyectos" lleva a los planes y "Clientes" a los casos.

### Optimización de Conversión — 52/100

**Funciona:**
- WhatsApp con **mensajes precargados por contexto** ("vi el proyecto de Under Club y quiero algo similar"): muy bien pensado, facilita escribir y dice de dónde viene el lead.
- Precios visibles con "desde": filtra curiosos sin presupuesto y ancla el valor.
- Plan Pro destacado como "+ Elegido": anclaje correcto.
- Doble vía de contacto en el cierre (WhatsApp o "Prefiero dejar mis datos").

**No funciona:**
- **El CTA principal del hero no convierte**: scrollea a casos.
- **El CTA del header ("Quiero mi cotización") scrollea a planes**, y desde ahí cada plan scrollea al contacto y abre un modal: 3 pasos para algo que podría ser 1.
- **Botón flotante de WhatsApp sin mensaje ni origen.**
- **Cero medición**: no se sabe cuántas visitas hay, cuántas hacen clic en WhatsApp ni desde qué botón.
- **Sin confianza cerca del punto de conversión**: al lado de los botones de planes no hay testimonio, garantía ni "respuesta en menos de 24 h".
- **Página larga sin atajos en mobile**: 8 secciones; quien llega desde un anuncio de "tienda online" tiene que scrollear todo para encontrar algo sobre tiendas (que no tiene sección propia).

### SEO y Descubrimiento — 58/100

**Funciona (y bien):**
- Title y meta description correctos, canonical por ruta (hook `useDocumentMeta`), `robots.txt` y `sitemap.xml` válidos.
- Schema muy completo: `Organization` + `ProfessionalService`, `OfferCatalog` con precios, `FAQPage`, `WebSite`, equipo, horarios, zona de servicio.
- `llms.txt` (poco común y útil para buscadores con IA).
- Imágenes WebP con versiones responsive, fuente self-hosted con preload, headers de caché, trabajo previo sobre PageSpeed y contraste AA.
- Open Graph con medidas declaradas (tarjetas grandes en WhatsApp).

**No funciona:**
- **Una sola URL de contenido.** El sitemap tiene 3 URLs y 2 son legales. No hay dónde rankear por servicio ni por intención.
- **Renderizado solo en cliente**: el HTML inicial está vacío. Ver estrategia #2.
- **Soft 404**: cualquier ruta inexistente devuelve la home con estado 200.
- **H1 sin keywords** de búsqueda ("páginas web", "Mendoza", "tienda online").
- **Sin enlazado interno** real: todos los links son anclas (`#planes`, `#faq`), que Google no cuenta como páginas.
- **Colisión de marca** con otras "Ideon" en búsquedas de marca.

### Posicionamiento Competitivo — 50/100

Competidores visibles en la primera página de Google para "desarrollo web a medida Mendoza": [MyDesign](https://www.mydesign.com.ar/institucional) (comunica +18 años, plataformas y e-commerce), [BacchisWork](https://bacchiswork.com.ar/paginas-web-mendoza/) ("código desde cero"), [Brekor](https://brekor.com/), [BIGMEDIA](https://bigmedia.ar/servicios/diseno-web/mendoza), [Argentina Web](https://argentiaweb.com.ar/), [Siarweb](https://www.siarweb.com/diseno-web-mendoza) y [Glupex](https://glupex.com/).

- **"A medida", "código propio" y "foco en SEO" lo dice casi todo el mercado local.** No diferencia.
- **Lo que sí diferencia a IDEON y casi nadie comunica:** precio público desde USD 200, **todo a nombre del cliente sin permanencia**, pago 25/75, sistemas complejos reales (campus, plataforma de comisiones) y Meta Ads en el mismo equipo. Eso debería ser el posicionamiento: *"estudio chico que hace desde tu primera web hasta tu sistema, sin atarte"*.
- **Patrón de los competidores que rankean:** URLs dedicadas por servicio y localidad. Es la misma conclusión que la estrategia #2.
- **Desventaja real:** antigüedad (fundada en 2025, frente a +18 años de MyDesign). Se compensa con casos concretos y cercanía, no escondiéndola.

| Factor | IDEON | MyDesign | BacchisWork | BIGMEDIA |
|---|---|---|---|---|
| Páginas dedicadas por servicio / ciudad | No | Sí | Sí | Sí |
| Precio visible | **Sí** | s/d | s/d | s/d |
| Antigüedad comunicada | No (2025) | +18 años | s/d | s/d |
| Sistemas complejos en portfolio | **Sí** | Sí | s/d | s/d |
| Propiedad del código explícita | **Sí** | s/d | s/d | s/d |

*s/d: sin dato. Los sitios de la competencia no se pudieron abrir desde este entorno; la tabla se basa en lo que muestran sus resultados de búsqueda y conviene validarla a mano o con `/marketing competidores`.*

### Marca y Confianza — 62/100

- **A favor:** identidad visual fuerte y consistente (neón sobre violeta oscuro), equipo con nombres, roles y formación, proyectos en producción con link en vivo, páginas legales, email de dominio propio, Google Business Profile.
- **En contra:** sin fotos del equipo, sin reseñas visibles, sin cifras, solo 2 casos. El tema claro/oscuro existe pero la identidad de marca está pensada para oscuro: verificar que la versión clara sostenga la estética.

### Crecimiento y Estrategia — 50/100

- **Modelo claro** (proyectos por alcance en 3 niveles) y **precios bien escalonados** (USD 200 → 1.500 → a medida): buen anclaje y buena puerta de entrada.
- **Sin ingreso recurrente productizado:** mantenimiento y pauta se mencionan pero no se venden como plan.
- **Sin captura de leads tibios** ni nurturing (email, contenido).
- **Sin loop de referidos:** los clientes satisfechos no tienen un incentivo para recomendar.
- **Oportunidad clara:** el "servicio de Meta Ads" es a la vez producto vendible y caso propio. Si IDEON pauta bien para sí misma, tiene el mejor caso de venta posible.

---

## Impacto estimado

**No hay datos de tráfico**, así que no tiene sentido inventar una cifra mensual. Este es el marco para calcularlo cuando GA4 empiece a medir (2–4 semanas de datos):

```
Visitas/mes × tasa de contacto × tasa de cierre × ticket promedio = ingreso mensual
```

**Escenario ilustrativo** (todos los números son supuestos para mostrar el orden de magnitud, reemplazar con datos reales):
- 600 visitas/mes, 2% de contacto → 12 consultas, 25% de cierre → **3 proyectos/mes**.
- Si el hero, los CTAs y la prueba social llevan el contacto de 2% a 3% (mejora habitual en este tipo de ajustes): **+6 consultas/mes → +1,5 proyectos/mes**.
- Con un ticket promedio supuesto de USD 700: **≈ USD 1.000/mes adicionales** solo por conversión, sin sumar tráfico.

| Recomendación | Qué mueve | Confianza | Plazo |
|---|---|---|---|
| Medición (Pixel + GA4) | Habilita todo lo demás; sin esto la pauta es a ciegas | Alta | 1 semana |
| Hero + CTAs + WhatsApp con origen | Tasa de contacto | Alta | 1 semana |
| Prueba social (testimonios, fotos, reseñas) | Tasa de contacto y de cierre | Media | 2–3 semanas |
| Pauta Click-to-WhatsApp | Volumen de consultas | Media (depende de presupuesto y creatividades) | 2–4 semanas |
| Arquitectura multipágina + prerender | Tráfico orgánico, conversión de pauta, remarketing por servicio | Alta en dirección, lenta en resultados (SEO tarda 3–6 meses) | 4–8 semanas |
| Plan recurrente (mantenimiento + pauta) | Ingreso previsible | Media | 1–2 meses |

---

## Siguientes pasos

1. **Medición:** cuando Celeste tenga los IDs, implementar Pixel + GA4 + eventos de contacto (tarea de código chica).
2. **Quick wins de copy y CTAs** (puntos 1 a 5): una rama, un PR, esta semana.
3. **Decisión del equipo sobre multipágina + prerender**: es el cambio de fondo y está marcado como decisión pendiente en el `CLAUDE.md`. Con el sí, armar el plan técnico.
4. **Pauta:** `/marketing ads ideon.ar` para las primeras creatividades de Click-to-WhatsApp.
5. **Profundizar:** `/marketing copy ideon.ar` (reescritura completa), `/marketing competidores` (con acceso a los sitios de la competencia) y `/marketing seo ideon.ar` (plan de keywords para cada página de servicio).

_Generado con la skill `/marketing auditoria` (Marketing Claude Code), adaptada al contexto de IDEON._
