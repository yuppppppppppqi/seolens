import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { BlogPost } from "@/lib/blog";

type Props = {
  post: BlogPost;
  locale: string;
};

export default function BlogCard({ post, locale }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      locale={locale}
      className="group block rounded-xl border border-sl-border bg-sl-bg-surface overflow-hidden hover:border-sl-border-strong hover:bg-sl-bg-elevated transition-all"
    >
      {/* Thumbnail */}
      {post.thumbnail ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-linear-to-br from-cyan-500/10 to-blue-500/10" />
      )}

      <div className="p-6">
        {/* Category & Reading Time */}
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-0.5 text-xs font-medium text-sl-accent">
            {post.category}
          </span>
          <span className="text-xs text-sl-text-muted">
            {post.readingTime} min read
          </span>
          {post.isPillar && (
            <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-0.5 text-xs font-medium text-amber-400">
              Pillar
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-sl-text-primary group-hover:text-sl-accent transition-colors mb-2">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-sl-text-secondary line-clamp-2 mb-4">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-sl-text-muted bg-sl-bg-base rounded px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
