import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  const howWeUseItems = t.raw("howWeUseItems") as string[];
  const dataRetentionItems = t.raw("dataRetentionItems") as string[];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-sl-text-primary mb-2">
        {t("heading")}
      </h1>
      <p className="text-sm text-sl-text-muted mb-10">
        {t("lastUpdated")}
      </p>

      <div className="space-y-10">
        {/* Intro */}
        <section>
          <p className="text-sl-text-secondary leading-relaxed">
            {t("intro")}
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("informationWeCollect")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6 space-y-4">
            <div>
              <h3 className="text-base font-medium text-sl-text-primary mb-2">
                {t("usageData")}
              </h3>
              <p className="text-sm text-sl-text-secondary leading-relaxed">
                {t("usageDataDescription")}
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium text-sl-text-primary mb-2">
                {t("searchQueries")}
              </h3>
              <p className="text-sm text-sl-text-secondary leading-relaxed">
                {t("searchQueriesDescription")}
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium text-sl-text-primary mb-2">
                {t("cookies")}
              </h3>
              <p className="text-sm text-sl-text-secondary leading-relaxed">
                {t("cookiesDescription")}
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("howWeUse")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
            <ul className="space-y-3 text-sm text-sl-text-secondary">
              {howWeUseItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sl-accent mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("dataRetention")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
            <p className="text-sm text-sl-text-secondary leading-relaxed mb-3">
              {t("dataRetentionIntro")}
            </p>
            <ul className="space-y-3 text-sm text-sl-text-secondary">
              {dataRetentionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sl-accent mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Third-Party Services */}
        <section>
          <h2 className="text-2xl font-semibold text-sl-text-primary mb-4">
            {t("thirdParty")}
          </h2>
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6">
            <p className="text-sm text-sl-text-secondary leading-relaxed">
              {t("thirdPartyIntro")}
            </p>
            <ul className="mt-3 space-y-3 text-sm text-sl-text-secondary">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sl-accent mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-sl-text-primary">Vercel</strong> -{" "}
                  {t("thirdPartyVercel")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sl-accent mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-sl-text-primary">Supabase</strong> -{" "}
                  {t("thirdPartySupabase")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sl-accent mt-1.5 flex-shrink-0" />
                <span>
                  <strong className="text-sl-text-primary">
                    Google Keyword Planner API
                  </strong>{" "}
                  - {t("thirdPartyGoogle")}
                </span>
              </li>
            </ul>
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
                href="mailto:privacy@seolens.dev"
                className="text-sm text-sl-accent hover:text-sl-accent-hover transition-colors"
              >
                privacy@seolens.dev
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
