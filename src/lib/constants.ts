import type { CountryConfig, LanguageConfig } from "@/types";

export const COUNTRIES: CountryConfig[] = [
  { code: "US", name: "United States", flag: "\ud83c\uddfa\ud83c\uddf8", geoTargetConstant: "geoTargetConstants/2840", dataForSeoLocationCode: 2840, defaultLanguage: "en" },
  { code: "JP", name: "Japan", flag: "\ud83c\uddef\ud83c\uddf5", geoTargetConstant: "geoTargetConstants/2392", dataForSeoLocationCode: 2392, defaultLanguage: "ja" },
  { code: "GB", name: "United Kingdom", flag: "\ud83c\uddec\ud83c\udde7", geoTargetConstant: "geoTargetConstants/2826", dataForSeoLocationCode: 2826, defaultLanguage: "en" },
  { code: "DE", name: "Germany", flag: "\ud83c\udde9\ud83c\uddea", geoTargetConstant: "geoTargetConstants/2276", dataForSeoLocationCode: 2276, defaultLanguage: "de" },
  { code: "FR", name: "France", flag: "\ud83c\uddeb\ud83c\uddf7", geoTargetConstant: "geoTargetConstants/2250", dataForSeoLocationCode: 2250, defaultLanguage: "fr" },
  { code: "CA", name: "Canada", flag: "\ud83c\udde8\ud83c\udde6", geoTargetConstant: "geoTargetConstants/2124", dataForSeoLocationCode: 2124, defaultLanguage: "en" },
  { code: "AU", name: "Australia", flag: "\ud83c\udde6\ud83c\uddfa", geoTargetConstant: "geoTargetConstants/2036", dataForSeoLocationCode: 2036, defaultLanguage: "en" },
  { code: "BR", name: "Brazil", flag: "\ud83c\udde7\ud83c\uddf7", geoTargetConstant: "geoTargetConstants/2076", dataForSeoLocationCode: 2076, defaultLanguage: "pt" },
  { code: "IN", name: "India", flag: "\ud83c\uddee\ud83c\uddf3", geoTargetConstant: "geoTargetConstants/2356", dataForSeoLocationCode: 2356, defaultLanguage: "en" },
  { code: "KR", name: "South Korea", flag: "\ud83c\uddf0\ud83c\uddf7", geoTargetConstant: "geoTargetConstants/2410", dataForSeoLocationCode: 2410, defaultLanguage: "ko" },
  { code: "MX", name: "Mexico", flag: "\ud83c\uddf2\ud83c\uddfd", geoTargetConstant: "geoTargetConstants/2484", dataForSeoLocationCode: 2484, defaultLanguage: "es" },
  { code: "ES", name: "Spain", flag: "\ud83c\uddea\ud83c\uddf8", geoTargetConstant: "geoTargetConstants/2724", dataForSeoLocationCode: 2724, defaultLanguage: "es" },
  { code: "IT", name: "Italy", flag: "\ud83c\uddee\ud83c\uddf9", geoTargetConstant: "geoTargetConstants/2380", dataForSeoLocationCode: 2380, defaultLanguage: "it" },
  { code: "NL", name: "Netherlands", flag: "\ud83c\uddf3\ud83c\uddf1", geoTargetConstant: "geoTargetConstants/2528", dataForSeoLocationCode: 2528, defaultLanguage: "nl" },
  { code: "SE", name: "Sweden", flag: "\ud83c\uddf8\ud83c\uddea", geoTargetConstant: "geoTargetConstants/2752", dataForSeoLocationCode: 2752, defaultLanguage: "sv" },
  { code: "TW", name: "Taiwan", flag: "\ud83c\uddf9\ud83c\uddfc", geoTargetConstant: "geoTargetConstants/2158", dataForSeoLocationCode: 2158, defaultLanguage: "zh" },
  { code: "TH", name: "Thailand", flag: "\ud83c\uddf9\ud83c\udded", geoTargetConstant: "geoTargetConstants/2764", dataForSeoLocationCode: 2764, defaultLanguage: "th" },
  { code: "VN", name: "Vietnam", flag: "\ud83c\uddfb\ud83c\uddf3", geoTargetConstant: "geoTargetConstants/2704", dataForSeoLocationCode: 2704, defaultLanguage: "vi" },
  { code: "ID", name: "Indonesia", flag: "\ud83c\uddee\ud83c\udde9", geoTargetConstant: "geoTargetConstants/2360", dataForSeoLocationCode: 2360, defaultLanguage: "id" },
  { code: "PH", name: "Philippines", flag: "\ud83c\uddf5\ud83c\udded", geoTargetConstant: "geoTargetConstants/2608", dataForSeoLocationCode: 2608, defaultLanguage: "en" },
];

export const LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", googleAdsConstant: "languageConstants/1000", dataForSeoCode: "en" },
  { code: "ja", name: "Japanese", googleAdsConstant: "languageConstants/1005", dataForSeoCode: "ja" },
  { code: "de", name: "German", googleAdsConstant: "languageConstants/1001", dataForSeoCode: "de" },
  { code: "fr", name: "French", googleAdsConstant: "languageConstants/1002", dataForSeoCode: "fr" },
  { code: "es", name: "Spanish", googleAdsConstant: "languageConstants/1003", dataForSeoCode: "es" },
  { code: "pt", name: "Portuguese", googleAdsConstant: "languageConstants/1014", dataForSeoCode: "pt" },
  { code: "it", name: "Italian", googleAdsConstant: "languageConstants/1004", dataForSeoCode: "it" },
  { code: "nl", name: "Dutch", googleAdsConstant: "languageConstants/1010", dataForSeoCode: "nl" },
  { code: "ko", name: "Korean", googleAdsConstant: "languageConstants/1012", dataForSeoCode: "ko" },
  { code: "zh", name: "Chinese", googleAdsConstant: "languageConstants/1017", dataForSeoCode: "zh" },
  { code: "th", name: "Thai", googleAdsConstant: "languageConstants/1044", dataForSeoCode: "th" },
  { code: "vi", name: "Vietnamese", googleAdsConstant: "languageConstants/1040", dataForSeoCode: "vi" },
  { code: "id", name: "Indonesian", googleAdsConstant: "languageConstants/1025", dataForSeoCode: "id" },
  { code: "sv", name: "Swedish", googleAdsConstant: "languageConstants/1015", dataForSeoCode: "sv" },
];

// Helpers
export function getCountry(code: string): CountryConfig | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getLanguage(code: string): LanguageConfig | undefined {
  return LANGUAGES.find((l) => l.code === code);
}

// Cache TTLs in days
export const CACHE_TTL = {
  metrics: 30,
  difficulty: 7,
  suggestions: 14,
} as const;
