import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogPost" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blogPost" });

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        {/* Icon */}
        <div className="mb-6 text-sl-text-muted">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-sl-text-primary mb-4">
          {t("notFoundHeading")}
        </h1>

        <p className="text-lg text-sl-text-secondary max-w-md mb-2">
          {t("notFoundDescription")}
        </p>
        <p className="text-sl-text-muted mb-8">
          {t("notFoundSubtitle")}
        </p>

        {/* Back links */}
        <div className="flex items-center gap-4">
          <a
            href={`/${locale}/blog`}
            className="inline-flex rounded-lg border border-sl-border-strong px-5 py-2.5 text-sm font-medium text-sl-text-primary hover:bg-sl-bg-hover transition-colors"
          >
            {t("backToBlog")}
          </a>
          <a
            href={`/${locale}/tool`}
            className="inline-flex rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            {t("tryTool")}
          </a>
        </div>
      </div>
    </div>
  );
}
