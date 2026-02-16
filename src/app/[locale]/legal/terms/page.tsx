import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "terms" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "terms" });
  const serviceItems = t.raw("serviceDescriptionItems") as string[];
  const acceptableUseItems = t.raw("acceptableUseItems") as string[];
  const limitationsItems = t.raw("limitationsItems") as string[];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-sl-text-primary mb-2">
        {t("heading")}
      </h1>
      <p className="text-sm text-sl-text-muted mb-10">
        {t("lastUpdated")}
      </p>

      <div className="space-y-10">
        {/* Acceptance */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("acceptance")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
            <p className="text-sm text-sl-text-secondary leading-relaxed">
              {t("acceptanceDescription")}
            </p>
          </div>
        </section>

        {/* Service Description */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("serviceDescription")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6 space-y-4">
            <p className="text-sm text-sl-text-secondary leading-relaxed">
              {t("serviceDescriptionIntro")}
            </p>
            <ul className="space-y-3 text-sm text-sl-text-secondary">
              {serviceItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sl-accent mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-sl-text-secondary leading-relaxed">
              {t("serviceDescriptionDisclaimer")}
            </p>
          </div>
        </section>

        {/* Acceptable Use */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("acceptableUse")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
            <p className="text-sm text-sl-text-secondary leading-relaxed mb-4">
              {t("acceptableUseIntro")}
            </p>
            <ul className="space-y-3 text-sm text-sl-text-secondary">
              {acceptableUseItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-sl-error mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Limitations */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("limitations")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6 space-y-4">
            <p className="text-sm text-sl-text-secondary leading-relaxed">
              {t("limitationsIntro")}
            </p>
            <ul className="space-y-3 text-sm text-sl-text-secondary">
              {limitationsItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sl-text-muted mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Data Accuracy */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("dataAccuracy")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
            <p className="text-sm text-sl-text-secondary leading-relaxed">
              {t("dataAccuracyDescription")}
            </p>
          </div>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("changes")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
            <p className="text-sm text-sl-text-secondary leading-relaxed">
              {t("changesDescription")}
            </p>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("contactUs")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
            <p className="text-sm text-sl-text-secondary leading-relaxed">
              {t("contactDescription")}
            </p>
            <p className="mt-3">
              <a
                href="mailto:legal@seolens.dev"
                className="text-sm text-sl-accent hover:text-sl-accent-hover transition-colors"
              >
                legal@seolens.dev
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
