import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Compone clases condicionales (clsx) y resuelve conflictos de Tailwind (twMerge). */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
