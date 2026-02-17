export const locales = ["en", "ja", "ko", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
