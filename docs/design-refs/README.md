# Referencias de diseño

Páginas HTML autocontenidas (CSS embebido, sin dependencias de este proyecto
Vite) generadas con Claude Design para clientes reales de IDEON. No son
parte del sitio ni se sirven desde `public/`: son insumo crudo para extraer,
más adelante, un design system compartido (paleta, tipografía, componentes)
a partir de patrones que ya funcionaron en producción.

## Contenido

- **`corralcoop/`** — Cooperativa Corralcoop Ltda.
  - `propuesta.html` — propuesta comercial de desarrollo (Etapa 1, 2 y 3).
  - `kit-bienvenida.html` — página de bienvenida tras la firma de la Etapa 1.
- **`spoon-restaurante/`**
  - `propuesta.html` — propuesta comercial de sitio + reservas por WhatsApp.

## Nota sobre datos sensibles

Antes de subirse, estos archivos se revisaron para que no quede en el repo
(que es público) ningún precio, plazo o dato identificable del cliente:

- Se sacaron el CUIT, el domicilio completo y el número de WhatsApp del
  proyecto de los archivos de Corralcoop.
- Se reemplazaron todos los montos (propios de IDEON y estimados del
  cliente) y todos los plazos/tiempos comprometidos (semanas, porcentajes
  de pago, tiempos de respuesta) por placeholders genéricos
  (`[monto]`, `[XX]%`, `[N] días`, "Plazo a definir", etc.) en los dos
  archivos de propuesta.
- El PDF `Cronograma_Etapa_1_Corralcoop.pdf` (reuniones y pagos con fechas y
  montos concretos) **no se subió**: es en su totalidad precio y cronograma,
  así que no queda nada útil como referencia de diseño una vez redactado.
- El archivo de Spoon Restaurante no tenía datos identificables del cliente
  más allá de texto de plantilla pidiéndoselos.

El resto del copy, la estructura y el CSS quedan intactos: lo que cambia son
sólo los números y datos de contacto puntuales.

Este repositorio es público — cualquier archivo nuevo que se agregue acá
debería pasar por la misma revisión antes de commitear.
