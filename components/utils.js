import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function createSlugFromText(text, wordCount = 4) {
  // Convertit en minuscules
  let sanitized = text.toLowerCase();

  // Supprime la ponctuation et caractères spéciaux (sauf chiffres, lettres, espaces)
  sanitized = sanitized.replace(/[^\p{L}\p{N}\s]+/gu, "");

  // Découpe en mots
  const words = sanitized.split(/\s+/).filter(Boolean);

  // On prend les N premiers mots (4 par défaut) pour créer le slug
  const selectedWords = words.slice(0, wordCount).join("-");
  return selectedWords;
}
