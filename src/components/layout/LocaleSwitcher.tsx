"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(nextLocale: "en" | "ja") {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center rounded-lg border border-sl-border bg-sl-bg-elevated text-xs">
      <button
        onClick={() => switchLocale("en")}
        className={`px-2.5 py-1.5 rounded-l-lg transition-colors ${
          locale === "en"
            ? "bg-sl-accent/15 text-sl-accent"
            : "text-sl-text-muted hover:text-sl-text-secondary"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("ja")}
        className={`px-2.5 py-1.5 rounded-r-lg transition-colors ${
          locale === "ja"
            ? "bg-sl-accent/15 text-sl-accent"
            : "text-sl-text-muted hover:text-sl-text-secondary"
        }`}
      >
        JA
      </button>
    </div>
  );
}
