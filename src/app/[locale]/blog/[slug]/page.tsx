import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, slugRegistry } from "@/lib/blog";
import { routing } from "@/i18n/routing";
import BlogContent from "@/components/blog/BlogContent";
import { Link } from "@/i18n/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const slugs = slugRegistry[locale] ?? [];
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);

  if (!post) {
    const t = await getTranslations({ locale, namespace: "blogPost" });
    return {
      title: t("meta.title"),
      description: t("meta.description"),
    };
  }

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    if ((slugRegistry[loc] ?? []).includes(slug)) {
      languages[loc] = `/${loc}/blog/${slug}`;
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      ...(post.thumbnail && {
        images: [
          {
            url: post.thumbnail,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(locale, slug);

  if (!post) {
    redirect(`/${locale}/blog`);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    ...(post.thumbnail && {
      image: `https://seolens.dev${post.thumbnail}`,
    }),
    publisher: {
      "@type": "Organization",
      name: "SEOLens",
      url: "https://seolens.dev",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://seolens.dev/${locale}/blog/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-sl-text-muted mb-8">
          <Link href="/" locale={locale} className="hover:text-sl-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" locale={locale} className="hover:text-sl-accent transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-sl-text-secondary truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-0.5 text-xs font-medium text-sl-accent">
              {post.category}
            </span>
            {post.isPillar && (
              <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 text-xs font-medium text-amber-400">
                Pillar Guide
              </span>
            )}
            <span className="text-xs text-sl-text-muted">
              {post.readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-sl-text-primary mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-sl-text-secondary mb-4">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-sl-text-muted">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.updatedAt !== post.publishedAt && (
              <span>
                Updated:{" "}
                <time dateTime={post.updatedAt}>
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </span>
            )}
          </div>
        </header>

        {/* Hero Image or Divider */}
        {post.thumbnail ? (
          <div className="relative aspect-2/1 w-full overflow-hidden rounded-xl mb-10">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="border-t border-sl-border mb-10" />
        )}

        {/* Content */}
        <BlogContent content={post.content} sectionImages={post.sectionImages} />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-sl-border">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-sl-text-muted bg-sl-bg-surface border border-sl-border rounded-full px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-sl-border bg-sl-bg-surface p-8 text-center">
          <h3 className="text-xl font-semibold text-sl-text-primary mb-2">
            Ready to research your keywords?
          </h3>
          <p className="text-sl-text-secondary mb-6">
            Try SEOLens for free — get search volume, keyword difficulty, CPC, and competition data instantly.
          </p>
          <a
            href={`/${locale}/tool`}
            className="inline-flex rounded-lg bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-medium text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            Try SEOLens Free
          </a>
        </div>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            locale={locale}
            className="text-sm text-sl-text-muted hover:text-sl-accent transition-colors"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </article>
    </>
  );
}
