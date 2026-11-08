// Pre-render: genera un HTML estático por cada ruta del sitio.
//
// Corre al final de `vite build` (lo engancha el plugin `prerender` de
// vite.config.ts), sobre el HTML que Vite ya dejó en dist/. Por cada ruta de
// src/routes.tsx:
//   1. renderiza <App /> a string con React (src/entry-server.tsx),
//   2. lo mete dentro de <div id="root">,
//   3. reemplaza en el <head> título, description, canonical, robots, OG y
//      Twitter con lo que declaró la página (useDocumentMeta) y suma su
//      JSON-LD (useJsonLd),
//   4. lo escribe en dist/<ruta>/index.html.
// Además genera dist/404.html, que Cloudflare sirve con status 404.
//
// Así cada URL llega con su contenido y sus metadatos en el HTML: lo leen
// Google, WhatsApp, Facebook y LinkedIn sin ejecutar JavaScript, y la página
// se ve antes de que cargue el JS.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SSR_OUT = path.join(ROOT, 'node_modules', '.prerender');
const SITE_URL = 'https://ideon.ar';

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeText = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Un JSON-LD no puede contener "</script>": se escapa el "<".
const escapeJson = (json) => json.replace(/</g, '\\u003c');

/** Cambia el atributo `attr` del primer tag que matchea `tagPattern`. Falla si no lo encuentra. */
function setTagAttr(html, tagPattern, attr, value) {
  const tagRe = new RegExp(`<${tagPattern}[^>]*>`);
  const tag = html.match(tagRe);
  if (!tag) throw new Error(`prerender: no encontré <${tagPattern}> en index.html`);
  const updated = tag[0].replace(new RegExp(`${attr}="[^"]*"`), `${attr}="${escapeAttr(value)}"`);
  return html.replace(tag[0], updated);
}

const metaName = (name) => `meta name="${name}"`;
const metaProp = (prop) => `meta property="${prop}"`;

function applyHead(template, head) {
  let html = template;

  if (head.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(head.title)}</title>`);
    for (const tag of [metaProp('og:title'), metaProp('twitter:title')]) {
      html = setTagAttr(html, tag, 'content', head.title);
    }
  }

  if (head.description) {
    for (const tag of [metaName('description'), metaProp('og:description'), metaProp('twitter:description')]) {
      html = setTagAttr(html, tag, 'content', head.description);
    }
  }

  if (head.canonicalPath) {
    const url = `${SITE_URL}${head.canonicalPath}`;
    html = setTagAttr(html, 'link rel="canonical"', 'href', url);
    for (const tag of [metaProp('og:url'), metaProp('twitter:url')]) {
      html = setTagAttr(html, tag, 'content', url);
    }
  }

  if (head.robots) {
    html = setTagAttr(html, metaName('robots'), 'content', head.robots);
    // Una página noindex sin canonical propio (la 404) no debe heredar el
    // canonical de la home que trae el template.
    if (!head.canonicalPath && head.robots.includes('noindex')) {
      html = html.replace(/\s*<link rel="canonical"[^>]*>/, '');
    }
  }

  if (head.jsonLd.length > 0) {
    const scripts = head.jsonLd
      .map(({ id, json }) => `  <script type="application/ld+json" id="${escapeAttr(id)}">${escapeJson(json)}</script>`)
      .join('\n');
    html = html.replace('</head>', `${scripts}\n</head>`);
  }

  return html;
}

/** Ruta del sitio → archivo en dist ('/' → index.html, '/a/' → a/index.html). */
function outputFile(outDir, routePath) {
  const clean = routePath.replace(/^\/+|\/+$/g, '');
  return path.join(outDir, clean, 'index.html');
}

export async function prerender(outDir) {
  // 1. Compila la entrada de servidor a un módulo de Node. Sin vite.config.ts
  //    (configFile: false): el plugin de Cloudflare no aplica acá y además se
  //    evita que este build vuelva a disparar el pre-render.
  await build({
    configFile: false,
    root: ROOT,
    logLevel: 'warn',
    plugins: [react()],
    resolve: { alias: { '@': path.join(ROOT, 'src') } },
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: SSR_OUT,
      emptyOutDir: true,
      copyPublicDir: false,
      minify: false,
    },
  });

  const entry = await import(pathToFileURL(path.join(SSR_OUT, 'entry-server.js')).href);
  const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('prerender: index.html no tiene un <div id="root"></div> vacío');
  }

  const pages = [
    ...entry.SITE_ROUTES.map((route) => ({ url: route.path, file: outputFile(outDir, route.path) })),
    { url: entry.NOT_FOUND_PATH, file: path.join(outDir, '404.html') },
  ];

  for (const page of pages) {
    const { html, head } = entry.render(page.url);
    const document = applyHead(template, head).replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`,
    );
    await fs.mkdir(path.dirname(page.file), { recursive: true });
    await fs.writeFile(page.file, document);
    console.log(`  prerender  ${page.url.padEnd(30)} → ${path.relative(ROOT, page.file)}`);
  }

  await fs.rm(SSR_OUT, { recursive: true, force: true });
}
