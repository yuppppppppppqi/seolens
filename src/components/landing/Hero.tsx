"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("landing.hero");
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = keyword.trim();
    if (!trimmed) return;
    router.push(`/tool?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-sl-border bg-sl-bg-surface px-4 py-1.5 text-xs font-medium text-sl-text-secondary mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2" />
          {t("badge")}
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-sl-text-primary">
          {t("title")}
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            {t("titleHighlight")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-sl-text-secondary max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Search form */}
        <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="flex-1 rounded-lg border border-sl-border bg-sl-bg-elevated px-4 py-3 text-base text-sl-text-primary placeholder:text-sl-text-muted focus:border-sl-accent focus:ring-1 focus:ring-sl-accent outline-none"
            />
            <button
              type="submit"
              disabled={!keyword.trim()}
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-base font-medium text-white hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              {t("cta")}
            </button>
          </div>
        </form>

        {/* Tool preview mockup */}
        <div className="mt-16 mx-auto max-w-4xl">
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-1 shadow-[0_0_80px_rgba(6,182,212,0.1)]">
            <div className="rounded-lg bg-sl-bg-elevated p-6">
              {/* Fake toolbar */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="flex-1 mx-4 h-7 rounded-md bg-sl-bg-base border border-sl-border" />
              </div>
              {/* Fake content rows */}
              <div className="space-y-2">
                {[
                  { kw: "seo tools", vol: "12,100", kd: 45, cpc: "$4.20" },
                  {
                    kw: "keyword research",
                    vol: "33,100",
                    kd: 62,
                    cpc: "$6.80",
                  },
                  {
                    kw: "search volume checker",
                    vol: "2,400",
                    kd: 28,
                    cpc: "$2.10",
                  },
                ].map((row) => (
                  <div
                    key={row.kw}
                    className="flex items-center justify-between rounded-md bg-sl-bg-base/50 px-4 py-2.5 text-sm"
                  >
                    <span className="text-sl-text-primary font-medium">
                      {row.kw}
                    </span>
                    <div className="flex items-center gap-6">
                      <span className="text-sl-text-secondary font-mono tabular-nums">
                        {row.vol}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${
                          row.kd <= 30
                            ? "bg-green-500/15 text-green-400 border-green-500/20"
                            : row.kd <= 50
                              ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
                              : "bg-orange-500/15 text-orange-400 border-orange-500/20"
                        }`}
                      >
                        {row.kd}
                      </span>
                      <span className="text-sl-text-muted font-mono tabular-nums">
                        {row.cpc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
