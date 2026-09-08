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
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <a href="/" className="text-sm font-medium text-brand-primary hover:text-brand-primary-hover transition-colors">
          ← Volver al inicio
        </a>

        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111] dark:text-brand-text-primary">
          {title}
        </h1>
        <p className="mt-3 text-sm text-gray-500 dark:text-brand-text-secondary">
          Última actualización: {lastUpdated}
        </p>

        <article className="legal-content mt-10">
          {children}
        </article>
      </div>
    </section>
  );
};

export default LegalPageLayout;
