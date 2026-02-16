import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricing" });
  const freeFeatures = t.raw("free.features") as string[];
  const proFeatures = t.raw("pro.features") as string[];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-sl-text-primary">
          {t("heading")}{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t("headingHighlight")}
          </span>{" "}
          {t("headingSuffix")}
        </h1>
        <p className="mt-4 text-lg text-sl-text-secondary max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-8 relative">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-sl-text-primary">{t("free.name")}</h2>
            <p className="text-sm text-sl-text-muted mt-1">
              {t("free.description")}
            </p>
          </div>

          <div className="mb-8">
            <span className="text-5xl font-bold text-sl-text-primary">{t("free.price")}</span>
            <span className="text-sl-text-muted ml-2">{t("free.period")}</span>
          </div>

          <ul className="space-y-4 mb-8">
            {freeFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-sm text-sl-text-secondary"
              >
                <svg
                  className="w-5 h-5 text-sl-success flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href={`/${locale}/tool`}
            className="block w-full text-center rounded-lg border border-sl-border-strong px-6 py-3 text-sm font-medium text-sl-text-primary hover:bg-sl-bg-hover transition-colors"
          >
            {t("free.cta")}
          </a>
        </div>

        {/* Pro Plan (Coming Soon) */}
        <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-8 relative opacity-80">
          {/* Coming Soon Badge */}
          <div className="absolute -top-3 right-6">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-xs font-semibold text-white">
              {t("pro.badge")}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-sl-text-primary">{t("pro.name")}</h2>
            <p className="text-sm text-sl-text-muted mt-1">
              {t("pro.description")}
            </p>
          </div>

          <div className="mb-8">
            <span className="text-5xl font-bold text-sl-text-primary">{t("pro.price")}</span>
            <span className="text-sl-text-muted ml-2">{t("pro.period")}</span>
          </div>

          <ul className="space-y-4 mb-8">
            {proFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-sm text-sl-text-secondary"
              >
                <svg
                  className="w-5 h-5 text-sl-success flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <button
            disabled
            className="block w-full text-center rounded-lg bg-sl-bg-hover px-6 py-3 text-sm font-medium text-sl-text-muted cursor-not-allowed"
          >
            {t("pro.cta")}
          </button>
        </div>
      </div>

      {/* FAQ or extra info */}
      <div className="mt-16 text-center">
        <p className="text-sm text-sl-text-muted">
          {t("contact")}{" "}
          <a
            href="mailto:support@seolens.dev"
            className="text-sl-accent hover:text-sl-accent-hover transition-colors"
          >
            {t("contactLink")}
          </a>
        </p>
      </div>
    </div>
  );
}
