import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { HeadContext, type HeadData } from './seo/HeadContext';

export { SITE_ROUTES, NOT_FOUND_PATH } from './routes';

/**
 * Entrada del pre-render. Solo la usa scripts/prerender.mjs durante el build,
 * nunca llega al navegador. Devuelve el HTML del #root para `url` y lo que la
 * página declaró para el <head>.
 */
export function render(url: string): { html: string; head: HeadData } {
  const head: HeadData = { jsonLd: [] };

  const html = renderToString(
    <React.StrictMode>
      <HeadContext.Provider value={head}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </React.StrictMode>,
  );

  return { html, head };
}
