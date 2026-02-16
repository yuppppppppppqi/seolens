export function getWebApplicationSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SEOLens",
    applicationCategory: "SEO Tool",
    operatingSystem: "Web",
    description:
      locale === "ja"
        ? "キーワードの検索ボリューム、難易度、CPC、競合データを無料で調査"
        : "Free keyword research tool for search volume, difficulty, CPC, and competition data",
    url: `https://seolens.dev/${locale}/tool`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    inLanguage: locale === "ja" ? "ja" : "en",
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SEOLens",
    url: "https://seolens.dev",
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
