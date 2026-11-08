# PENDIENTE — Reseñas reales de Google

> **Estado: pendiente.** Mientras tanto, la sección de reseñas **no se muestra**
> en el sitio (decisión del 08/11/2026: se saca del Inicio rediseñado hasta
> conectar las reales). La configuración del lado de Google la hace el equipo.

## Opción elegida: Places API (New) de Google

Devuelve el puntaje, la cantidad total de reseñas y **hasta 5 reseñas** (las que
Google considera más relevantes; no se pueden elegir).

### Lo que hace el equipo (sin código)

1. **Place ID** del perfil: buscar "IDEON" en el *Place ID Finder* de Google Maps
   Platform y copiar el ID.
2. **Google Cloud Console**: crear un proyecto, activar la facturación (Maps
   Platform tiene cuota gratuita mensual; confirmar el costo vigente al
   configurarlo) y habilitar **Places API (New)**.
3. Crear una **clave de API** restringida **solo** a Places API.
4. Cargar la clave como **secreto del Worker** en Cloudflare (Settings →
   Variables and Secrets, o `wrangler secret put` lo corre una persona). **Nunca
   en el repo.**
5. Pasar el Place ID (no es secreto, puede ir en el código).

### Lo que se implementa después

- Un endpoint chico en el Worker (`/api/resenas`) que consulta Places API con la
  clave del secreto y **cachea** la respuesta unas horas (Cache API de
  Cloudflare), para no gastar cuota por cada visita.
  ⚠ Suma un `main` al Worker en `wrangler.jsonc`: es cambio de infraestructura,
  se consulta antes.
- El bloque de reseñas con el diseño acordado (decisión 5): tarjetas de vidrio,
  comillas grandes en magenta, inicial sobre círculo con degradado de marca,
  estrellas en magenta, sello "Reseña de Google" monocromo y resumen con el
  puntaje grande. Sin la tipografía ni los colores de Google.
- Se carga en el navegador (no en el pre-render): si Google falla o tarda, la
  sección no se muestra y el resto de la página no se entera.
- **Sin marcado Schema de reseñas/AggregateRating**: Google no admite reseñas
  publicadas por el propio negocio sobre sí mismo.
- Atribución: link "Ver reseñas en Google" al perfil, como piden las políticas
  de Maps Platform.

## Alternativa descartada por ahora: Google Business Profile API

Trae todas las reseñas (no solo 5), pero requiere que Google apruebe el acceso
(formulario, puede tardar semanas). Conviene solo si se quiere elegir qué
reseñas mostrar.
