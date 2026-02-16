import type { Locale, Dictionary } from "./types";
import en from "./dictionaries/en";
import ja from "./dictionaries/ja";
import zh from "./dictionaries/zh";
import ko from "./dictionaries/ko";
import es from "./dictionaries/es";

const dictionaries: Record<Locale, Dictionary> = { en, ja, zh, ko, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}

export { type Locale, type Dictionary } from "./types";
export { UI_LANGUAGES } from "./types";
