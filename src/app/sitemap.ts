import type { MetadataRoute } from "next";

const BASE_URL = "https://seolens.dev";
const locales = ["en", "ja", "ko", "zh", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/tool",
    "/features",
    "/pricing",
    "/docs",
    "/docs/api",
    "/legal/privacy",
    "/legal/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "/tool" ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page}`,
            ja: `${BASE_URL}/ja${page}`,
            ko: `${BASE_URL}/ko${page}`,
            zh: `${BASE_URL}/zh${page}`,
            es: `${BASE_URL}/es${page}`,
          },
        },
      });
    }
  }

  return entries;
}
