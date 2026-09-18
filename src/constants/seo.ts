// Identidad del sitio para SEO: URLs canónicas, perfiles sociales y los datos
// que alimentan el marcado Schema (JSON-LD).
//
// Una sola fuente de verdad a propósito: Google cruza el `sameAs` del Schema
// contra los links que realmente aparecen en la página. Si el footer y el
// JSON-LD se escriben por separado, tarde o temprano se desincronizan y el
// vínculo entre el dominio y las redes deja de consolidarse.

export const SITE_URL = 'https://ideon.ar';

/** URL absoluta a partir de una ruta interna ('/', '/terminos-y-condiciones/'). */
export const absoluteUrl = (path: string): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

// @id estables para que los nodos del grafo se referencien entre sí en vez de
// repetirse. Son identificadores, no URLs a visitar.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export type SocialId = 'facebook' | 'instagram' | 'whatsapp' | 'linkedin';

export interface SocialProfile {
  id: SocialId;
  /** Se usa para el aria-label del link: "Instagram de IDEON". */
  label: string;
  url: string;
  /**
   * Si entra en el `sameAs` del Schema. WhatsApp queda afuera: es un canal de
   * contacto, no un perfil oficial que identifique a la entidad.
   */
  isSameAs: boolean;
}

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61586983154521',
    isSameAs: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/ideon_ar/',
    isSameAs: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/5492617736266',
    isSameAs: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/ideonar/',
    isSameAs: true,
  },
];

/** Perfiles oficiales que declaramos como `sameAs` en el JSON-LD. */
export const SAME_AS_URLS: readonly string[] = SOCIAL_PROFILES.filter(
  (profile) => profile.isSameAs,
).map((profile) => profile.url);
