import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import { useJsonLd } from '../../hooks/useJsonLd';
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID, absoluteUrl } from '../../constants/seo';
import type { Faq, PageMeta } from '../../constants/services';

interface SeoOptions {
  /** Migas: de la raíz a la página (sin incluir la página). */
  parents?: PageMeta[];
  /** Si la página describe un servicio, sale como `Service` en el Schema. */
  service?: { serviceType: string };
  /** Preguntas visibles en la página → FAQPage. */
  faqs?: readonly Faq[];
  /** Tipo de página de Schema.org (por defecto, WebPage). */
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
}

/**
 * Título, description, canonical y JSON-LD de una página de servicios:
 * WebPage (+ FAQPage si tiene preguntas), BreadcrumbList y Service. Todo sale
 * en el HTML pre-renderizado.
 */
export function useServicePageSeo(meta: PageMeta, { parents = [], service, faqs, pageType = 'WebPage' }: SeoOptions = {}): void {
  useDocumentMeta(meta.title, meta.description, { canonicalPath: meta.path });

  const url = absoluteUrl(meta.path);
  const crumbs = [{ name: 'Inicio', url: `${SITE_URL}/` }, ...parents.map((p) => ({ name: p.name, url: absoluteUrl(p.path) }))];

  const graph: object[] = [
    {
      '@type': faqs && faqs.length > 0 ? [pageType, 'FAQPage'] : pageType,
      '@id': `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      inLanguage: 'es-AR',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      ...(faqs && faqs.length > 0
        ? {
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }
        : {}),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        ...crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, name: crumb.name, item: crumb.url })),
        { '@type': 'ListItem', position: crumbs.length + 1, name: meta.name },
      ],
    },
  ];

  if (service) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: meta.name,
      serviceType: service.serviceType,
      description: meta.description,
      url,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: { '@type': 'Country', name: 'Argentina' },
    });
  }

  useJsonLd({ '@context': 'https://schema.org', '@graph': graph }, 'ld-page');
}
