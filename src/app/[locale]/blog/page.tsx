import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await getAllPosts(locale);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-sl-text-primary mb-4">
          {t("heading")}
        </h1>
        <p className="text-lg text-sl-text-secondary max-w-2xl mx-auto">
          {t("meta.description")}
        </p>
      </div>

      {/* Post Grid */}
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 px-4 py-1.5 text-sm font-medium text-sl-accent mb-6">
            {t("badge")}
          </span>
          <p className="text-lg text-sl-text-secondary max-w-md mb-2">
            {t("subtitle")}
          </p>
          <p className="text-sl-text-muted">{t("subtitleSecondary")}</p>
          <div className="mt-10">
            <a
              href={`/${locale}/tool`}
              className="inline-flex rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-medium text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
