// Identidad del sitio para SEO: URLs canónicas, perfiles sociales y los datos
// que alimentan el marcado Schema (JSON-LD).
//
// Google cruza el `sameAs` del JSON-LD contra los links que realmente
// aparecen en la página, así que los dos tienen que decir lo mismo. El
// `sameAs` vive en el <script type="application/ld+json"> de index.html, que
// es HTML estático y no puede importar de acá: SI SE AGREGA O SE CAMBIA UNA
// RED, HAY QUE TOCAR LOS DOS LUGARES. Acá viven los links que renderiza el
// footer; index.html suma además la ficha de Google Business Profile, que no
// se muestra en el footer.

import { WHATSAPP_NUMBER } from './contact';

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
}

export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61586983154521',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    url: 'https://www.instagram.com/ideon_ar/',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/ideonar/',
  },
];
