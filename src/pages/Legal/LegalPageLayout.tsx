import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useJsonLd } from '../../hooks/useJsonLd';
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID, absoluteUrl } from '../../constants/seo';

interface LegalPageLayoutProps {
  title: string;
  metaDescription: string;
  lastUpdated: string;
  /** Ruta de la página, con barra final: '/terminos-y-condiciones/'. */
  path: string;
  /** Fecha de la última actualización en ISO, para el Schema. */
  lastUpdatedIso: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  metaDescription,
  lastUpdated,
  path,
  lastUpdatedIso,
  children,
}) => {
  // Sin esto las legales heredarían el canonical de index.html, que apunta a
  // la home: dos URLs distintas declarándose la misma página.
  useDocumentMeta(`${title} – IDEON`, metaDescription, { canonicalPath: path });

  // WebPage + miga de pan. El breadcrumb es lo que le permite a Google mostrar
  // "ideon.ar › Términos y Condiciones" en vez de la URL pelada.
  useJsonLd(
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${absoluteUrl(path)}#webpage`,
          url: absoluteUrl(path),
          name: `${title} – IDEON`,
          description: metaDescription,
          inLanguage: 'es-AR',
          dateModified: lastUpdatedIso,
          isPartOf: { '@id': WEBSITE_ID },
          about: { '@id': ORGANIZATION_ID },
          publisher: { '@id': ORGANIZATION_ID },
          breadcrumb: { '@id': `${absoluteUrl(path)}#breadcrumb` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${absoluteUrl(path)}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: title },
          ],
        },
      ],
    },
    'ld-legal',
  );

  return (
    <section>
      <div className="container-site">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="text-sm font-medium text-accent hover:text-accent-hover transition-colors">
            ← Volver al inicio
          </a>

          <h1 className="mt-6 font-extrabold text-content">
            {title}
          </h1>
          <p className="mt-3 text-sm text-content-muted">
            Última actualización: {lastUpdated}
          </p>

          <article className="legal-content mt-8">
            {children}
          </article>
        </div>
      </div>
    </section>
  );
};

export default LegalPageLayout;
