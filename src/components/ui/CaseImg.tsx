import React from 'react';
import { cn } from '../../lib/cn';
import type { CaseImage } from '../../constants/cases';

interface CaseImgProps {
  image: CaseImage;
  /** Ancho con que se muestra (atributo `sizes`). */
  sizes: string;
  className?: string;
  /** La imagen principal de la página carga enseguida; el resto, diferido. */
  priority?: boolean;
}

/** Captura de un caso en .webp, en dos tamaños (760 px y ~1200 px). */
const CaseImg: React.FC<CaseImgProps> = ({ image, sizes, className, priority = false }) => (
  <img
    src={`${image.src}-sm.webp`}
    srcSet={`${image.src}-sm.webp 760w, ${image.src}-lg.webp 1200w`}
    sizes={sizes}
    alt={image.alt}
    width={1200}
    height={700}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined}
    decoding="async"
    className={cn('block w-full object-cover', className)}
  />
);

export default CaseImg;
