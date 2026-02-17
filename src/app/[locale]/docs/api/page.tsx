import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docsApi" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ApiReferencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "docsApi" });
  const rateLimitItems = t.raw("rateLimitItems") as string[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-sm text-sl-text-muted mb-2">
          <a
            href={`/${locale}/docs`}
            className="hover:text-sl-accent transition-colors"
          >
            {t("breadcrumbDocs")}
          </a>{" "}
          / {t("heading")}
        </p>
        <h1 className="text-4xl font-bold text-sl-text-primary">
          {t("heading")}
        </h1>
        <p className="mt-4 text-lg text-sl-text-secondary">
          {t("subtitle")}
        </p>
      </div>

      {/* Base URL */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
          {t("baseUrl")}
        </h2>
        <div className="rounded-xl border border-sl-border bg-sl-bg-elevated p-4">
          <code className="text-sm text-sl-accent font-mono">
            https://seo-lens.site/api/v1
          </code>
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
          {t("authentication")}
        </h2>
        <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
          <p className="text-sl-text-secondary mb-4">
            {t("authenticationDescription")}
          </p>
          <div className="rounded-lg border border-sl-border bg-sl-bg-elevated p-4">
            <pre className="text-sm text-sl-text-secondary font-mono leading-relaxed overflow-x-auto">
              <code>{`Authorization: Bearer YOUR_API_KEY

# or

x-api-key: YOUR_API_KEY`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* POST /research */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            POST
          </span>
          <h2 className="text-2xl font-semibold text-sl-text-primary font-mono">
            /research
          </h2>
        </div>
        <p className="text-sl-text-secondary mb-6">
          {t("researchEndpointDescription")}
        </p>

        {/* Request Parameters */}
        <h3 className="text-lg font-semibold text-sl-text-primary mb-3">
          {t("requestBody")}
        </h3>
        <div className="rounded-xl border border-sl-border bg-sl-bg-surface overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sl-border bg-sl-bg-elevated">
                <th className="text-left px-4 py-3 text-sl-text-muted font-medium">
                  {t("parameter")}
                </th>
                <th className="text-left px-4 py-3 text-sl-text-muted font-medium">
                  {t("type")}
                </th>
                <th className="text-left px-4 py-3 text-sl-text-muted font-medium">
                  {t("required")}
                </th>
                <th className="text-left px-4 py-3 text-sl-text-muted font-medium">
                  {t("description")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sl-border">
              <tr>
                <td className="px-4 py-3 font-mono text-sl-accent">keyword</td>
                <td className="px-4 py-3 text-sl-text-secondary">string</td>
                <td className="px-4 py-3 text-sl-text-secondary">Yes*</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("keywordDescription")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sl-accent">keywords</td>
                <td className="px-4 py-3 text-sl-text-secondary">string[]</td>
                <td className="px-4 py-3 text-sl-text-secondary">Yes*</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("keywordsDescription")}{" "}
                  <code className="text-xs bg-sl-bg-elevated px-1 py-0.5 rounded">
                    keyword
                  </code>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sl-accent">
                  countryCode
                </td>
                <td className="px-4 py-3 text-sl-text-secondary">string</td>
                <td className="px-4 py-3 text-sl-text-secondary">No</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("countryCodeDescription")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sl-accent">
                  languageCode
                </td>
                <td className="px-4 py-3 text-sl-text-secondary">string</td>
                <td className="px-4 py-3 text-sl-text-secondary">No</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("languageCodeDescription")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-sl-text-muted mb-6">
          * {t("keywordsNote")}{" "}
          <code className="bg-sl-bg-elevated px-1 py-0.5 rounded">keyword</code>{" "}
          {t("keywordsNoteOr")}{" "}
          <code className="bg-sl-bg-elevated px-1 py-0.5 rounded">keywords</code>
          {t("keywordsNoteEnd")}
        </p>

        {/* Response Format */}
        <h3 className="text-lg font-semibold text-sl-text-primary mb-3">
          {t("responseSingle")}
        </h3>
        <div className="rounded-xl border border-sl-border bg-sl-bg-elevated overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-2 border-b border-sl-border bg-sl-bg-surface">
            <span className="text-xs text-sl-text-muted font-mono">
              200 OK
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm text-sl-text-secondary font-mono leading-relaxed">
            <code>{`{
  "keyword": "react hooks",
  "metrics": {
    "avgMonthlySearches": 18100,
    "competition": "LOW",
    "cpcLow": 0.15,
    "cpcHigh": 1.85
  },
  "difficulty": "easy",
  "suggestions": [
    {
      "keyword": "react custom hooks",
      "avgMonthlySearches": 6600,
      "competition": "LOW",
      "cpcLow": 0.10,
      "cpcHigh": 0.95
    }
  ]
}`}</code>
          </pre>
        </div>

        {/* Response Format - Batch */}
        <h3 className="text-lg font-semibold text-sl-text-primary mb-3">
          {t("responseBatch")}
        </h3>
        <div className="rounded-xl border border-sl-border bg-sl-bg-elevated overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-2 border-b border-sl-border bg-sl-bg-surface">
            <span className="text-xs text-sl-text-muted font-mono">
              200 OK
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm text-sl-text-secondary font-mono leading-relaxed">
            <code>{`{
  "results": [
    {
      "keyword": "react hooks",
      "metrics": { ... },
      "difficulty": "easy",
      "suggestions": [ ... ]
    },
    {
      "keyword": "vue composables",
      "metrics": { ... },
      "difficulty": "medium",
      "suggestions": [ ... ]
    }
  ]
}`}</code>
          </pre>
        </div>
      </section>

      {/* Code Examples */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-sl-text-primary mb-6">
          {t("codeExamples")}
        </h2>

        {/* JavaScript */}
        <h3 className="text-lg font-semibold text-sl-text-primary mb-3">
          JavaScript / TypeScript
        </h3>
        <div className="rounded-xl border border-sl-border bg-sl-bg-elevated overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-2 border-b border-sl-border bg-sl-bg-surface">
            <span className="text-xs text-sl-text-muted font-mono">
              fetch
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm text-sl-text-secondary font-mono leading-relaxed">
            <code>{`const response = await fetch("https://seo-lens.site/api/v1/research", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY",
  },
  body: JSON.stringify({
    keywords: ["nextjs seo"],
    countryCode: "US",
    languageCode: "en",
  }),
});

const data = await response.json();
console.log(data.results);`}</code>
          </pre>
        </div>

        {/* Python */}
        <h3 className="text-lg font-semibold text-sl-text-primary mb-3">
          Python
        </h3>
        <div className="rounded-xl border border-sl-border bg-sl-bg-elevated overflow-hidden mb-6">
          <div className="flex items-center justify-between px-4 py-2 border-b border-sl-border bg-sl-bg-surface">
            <span className="text-xs text-sl-text-muted font-mono">
              requests
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm text-sl-text-secondary font-mono leading-relaxed">
            <code>{`import requests

response = requests.post(
    "https://seo-lens.site/api/v1/research",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "keywords": ["nextjs seo"],
        "countryCode": "US",
        "languageCode": "en",
    },
)

data = response.json()
print(f"Results: {data['results']}")`}</code>
          </pre>
        </div>

        {/* cURL */}
        <h3 className="text-lg font-semibold text-sl-text-primary mb-3">
          cURL
        </h3>
        <div className="rounded-xl border border-sl-border bg-sl-bg-elevated overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-sl-border bg-sl-bg-surface">
            <span className="text-xs text-sl-text-muted font-mono">
              bash
            </span>
          </div>
          <pre className="p-4 overflow-x-auto text-sm text-sl-text-secondary font-mono leading-relaxed">
            <code>{`# Single keyword
curl -X POST https://seo-lens.site/api/v1/research \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"keywords": ["nextjs seo"], "countryCode": "US"}'

# Batch keywords
curl -X POST https://seo-lens.site/api/v1/research \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"keywords": ["react hooks", "vue composables"], "countryCode": "US"}'`}</code>
          </pre>
        </div>
      </section>

      {/* Error Codes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
          {t("errorCodes")}
        </h2>
        <div className="rounded-xl border border-sl-border bg-sl-bg-surface overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sl-border bg-sl-bg-elevated">
                <th className="text-left px-4 py-3 text-sl-text-muted font-medium">
                  {t("status")}
                </th>
                <th className="text-left px-4 py-3 text-sl-text-muted font-medium">
                  {t("description")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sl-border">
              <tr>
                <td className="px-4 py-3 font-mono text-sl-success">200</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("errors.200")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sl-warning">401</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("errors.401")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sl-warning">400</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("errors.400")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sl-warning">429</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("errors.429")}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-sl-error">500</td>
                <td className="px-4 py-3 text-sl-text-secondary">
                  {t("errors.500")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Rate Limits */}
      <section>
        <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
          {t("rateLimits")}
        </h2>
        <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
          <p className="text-sl-text-secondary mb-4">
            {t("rateLimitsDescription")}
          </p>
          <ul className="space-y-2 text-sm text-sl-text-secondary">
            {rateLimitItems.map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sl-accent flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
