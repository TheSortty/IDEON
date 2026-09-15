import React from 'react';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';

interface LegalPageLayoutProps {
  title: string;
  metaDescription: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, metaDescription, lastUpdated, children }) => {
  useDocumentMeta(`${title} – IDEON`, metaDescription);

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
