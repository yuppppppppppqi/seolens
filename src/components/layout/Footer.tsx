import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const sections = [
    {
      title: t("product"),
      links: [
        { href: "/features" as const, label: t("features") },
        { href: "/pricing" as const, label: t("pricing") },
        { href: "/docs" as const, label: t("apiDocs") },
      ],
    },
    {
      title: t("resources"),
      links: [
        { href: "/blog" as const, label: t("blog") },
        { href: "/docs" as const, label: t("documentation") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/legal/privacy" as const, label: t("privacy") },
        { href: "/legal/terms" as const, label: t("terms") },
      ],
    },
  ];

  return (
    <footer className="border-t border-sl-border bg-sl-bg-surface">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="SEOLens" width={24} height={24} />
              <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                SEOLens
              </span>
            </div>
            <p className="mt-2 text-sm text-sl-text-muted max-w-xs">
              Free keyword research tool for SEO professionals and developers.
            </p>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-sl-text-secondary uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-sl-text-muted hover:text-sl-text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-sl-border text-center text-xs text-sl-text-muted">
          {t("copyright", { year: String(year) })}
        </div>
      </div>
    </footer>
  );
}
