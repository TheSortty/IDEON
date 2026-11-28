import React from 'react';

type OrbSide = 'left' | 'right' | 'center';

/**
 * Envoltorio de las páginas internas. Antes dibujaba dos orbes de luz
 * (magenta y azul, con blur) detrás del contenido: se sacaron porque se veían
 * como un glow alrededor de tarjetas y preguntas (decisión del 28/11/2026,
 * sin glow exterior). `orb` queda para no tocar cada página, pero ya no
 * dibuja nada. `overflow-clip` sigue evitando el scroll horizontal sin romper
 * los elementos sticky (la barra "En esta página").
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageShell: React.FC<{ orb?: OrbSide; children: React.ReactNode }> = ({ children }) => (
  <div className="relative isolate overflow-clip">{children}</div>
);

export default PageShell;
