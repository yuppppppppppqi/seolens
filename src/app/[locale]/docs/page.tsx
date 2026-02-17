import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function DocsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docs" });

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-sl-text-primary">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lg text-sl-text-secondary">
          {t("subtitle")}
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
          {t("quickStart")}
        </h2>
        <p className="text-sl-text-secondary mb-6">
          {t("quickStartDescription")}
        </p>

        {/* Endpoint */}
        <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              POST
            </span>
            <code className="text-sm text-sl-text-primary font-mono">
              /api/v1/research
            </code>
          </div>
          <p className="text-sm text-sl-text-muted">
            {t("endpointDescription")}
          </p>
        </div>
      </section>

      {/* Example Request */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
          {t("exampleRequest")}
        </h2>
        <div className="rounded-xl border border-sl-border bg-sl-bg-elevated overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-sl-border bg-sl-bg-surface">
            <span className="text-xs text-sl-text-muted font-mono">
              cURL
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm text-sl-text-secondary font-mono leading-relaxed">
            <code>{`curl -X POST https://seo-lens.site/api/v1/research \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "keywords": ["nextjs seo"],
    "countryCode": "US",
    "languageCode": "en"
  }'`}</code>
          </pre>
        </div>
      </section>

      {/* Example Response */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
          {t("exampleResponse")}
        </h2>
        <div className="rounded-xl border border-sl-border bg-sl-bg-elevated overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-sl-border bg-sl-bg-surface">
            <span className="text-xs text-sl-text-muted font-mono">
              JSON Response
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm text-sl-text-secondary font-mono leading-relaxed">
            <code>{`{
  "keyword": "nextjs seo",
  "metrics": {
    "avgMonthlySearches": 2400,
    "competition": "MEDIUM",
    "cpcLow": 0.50,
    "cpcHigh": 2.10
  },
  "difficulty": "medium",
  "suggestions": [
    {
      "keyword": "next js seo optimization",
      "avgMonthlySearches": 880,
      "competition": "LOW",
      "cpcLow": 0.30,
      "cpcHigh": 1.50
    },
    {
      "keyword": "nextjs metadata seo",
      "avgMonthlySearches": 590,
      "competition": "LOW",
      "cpcLow": 0.25,
      "cpcHigh": 1.20
    }
  ]
}`}</code>
          </pre>
        </div>
      </section>

      {/* Links */}
      <section className="grid sm:grid-cols-2 gap-6">
        <a
          href={`/${locale}/docs/api`}
          className="group rounded-xl border border-sl-border bg-sl-bg-surface p-6 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all"
        >
          <h3 className="text-lg font-semibold text-sl-text-primary mb-2 group-hover:text-sl-accent transition-colors">
            {t("apiReference")}
          </h3>
          <p className="text-sm text-sl-text-muted">
            {t("apiReferenceDescription")}
          </p>
        </a>
        <a
          href={`/${locale}/tool`}
          className="group rounded-xl border border-sl-border bg-sl-bg-surface p-6 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all"
        >
          <h3 className="text-lg font-semibold text-sl-text-primary mb-2 group-hover:text-sl-accent transition-colors">
            {t("tryTool")}
          </h3>
          <p className="text-sm text-sl-text-muted">
            {t("tryToolDescription")}
          </p>
        </a>
      </section>
    </div>
  );
}
