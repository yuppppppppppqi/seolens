export type BlogPost = {
  slug: string;
  locale: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  isPillar: boolean;
  readingTime: number;
  relatedSlugs: string[];
  content: string; // markdown
  thumbnail?: string;
  sectionImages?: string[];
};

// Dynamic import of all posts by locale
const postModules: Record<string, () => Promise<{ posts: BlogPost[] }>> = {
  en: () => import("@/content/blog/en"),
  ja: () => import("@/content/blog/ja"),
  ko: () => import("@/content/blog/ko"),
  zh: () => import("@/content/blog/zh"),
  es: () => import("@/content/blog/es"),
};

export async function getAllPosts(locale: string): Promise<BlogPost[]> {
  const loader = postModules[locale];
  if (!loader) return [];
  const { posts } = await loader();
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPost | null> {
  const posts = await getAllPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPillarPosts(locale: string): Promise<BlogPost[]> {
  const posts = await getAllPosts(locale);
  return posts.filter((p) => p.isPillar);
}

export function getAllSlugs(locale: string): string[] {
  // For static generation, we need synchronous access to slugs
  // This will be populated per locale
  return slugRegistry[locale] ?? [];
}

// Registry of all slugs per locale for generateStaticParams
export const slugRegistry: Record<string, string[]> = {
  en: [
    "seo-audit-guide",
    "seo-audit-agency",
    "keyword-research-guide",
    "backlinks-guide",
    "seo-tools-guide",
    "meta-tags-seo-guide",
    "seo-audit-report-template",
    "seo-audit-report-sample",
    "seo-audit-template",
    "keywords-meaning",
    "keywords-definition",
    "keywords-for-instagram",
    "keywords-ai",
    "analytics-definition",
    "seo-tools-for-excel",
    "backlinks-for-website",
    "meta-tags-font-generator",
  ],
  ja: [
    "seo-basics-guide",
    "keyword-research-guide",
    "backlinks-guide",
    "search-ranking-guide",
    "seo-tools-guide",
    "seo-taisaku-toha",
    "keyword-toha",
    "seo-ai",
    "keyword-map",
    "keyword-planner-tsukaikata",
    "seo-taisaku-yarikata",
    "keyword-planner-guide",
    "seo-taisaku-imi-nai",
    "backlink-toha",
    "backlink-shirabekata",
    "kensaku-juni-toha",
    "kensaku-juni-shirabekata",
    "kensaku-juni-checker",
    "seo-tool-toha",
    "seo-tool-free",
    "access-kaiseki-toha",
    "access-kaiseki-tool-free",
    "keyword-imi",
  ],
  ko: [
    "seo-basics-guide",
    "keyword-research-guide",
    "backlinks-guide",
    "search-ranking-guide",
    "seo-optimization",
    "seo-marketing",
    "keyword-search-volume",
    "keyword-recommendations",
    "backlink-building",
    "backlink-free",
    "backlink-how-to",
    "naver-search-ranking",
  ],
  zh: [
    "seo-basics-guide",
    "keyword-research-guide",
    "backlinks-guide",
    "seo-optimization",
    "seo-copywriting",
    "seo-keyword-analysis",
    "backlink-check",
  ],
  es: [
    "seo-basics-guide",
    "seo-tools-guide",
    "backlinks-guide",
    "keywords-seo",
    "seo-tools-free",
    "seo-tools-ai",
    "seo-audit-free",
    "backlinks-free",
  ],
};
