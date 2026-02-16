"use client";

import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import SearchBar from "@/components/tool/SearchBar";
import ResultsTable from "@/components/tool/ResultsTable";
import DifficultyBadge from "@/components/tool/DifficultyBadge";
import type { SearchResult } from "@/types";

function formatNumber(n: number | null): string {
  if (n === null || n === undefined) return "-";
  return n.toLocaleString();
}

function formatCpc(low: number | null, high: number | null): string {
  if (low === null && high === null) return "-";
  if (low !== null && high !== null) {
    return `$${low.toFixed(2)} - $${high.toFixed(2)}`;
  }
  if (low !== null) return `$${low.toFixed(2)}`;
  return `$${high!.toFixed(2)}`;
}

function ToolPageContent() {
  const t = useTranslations("tool");
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialSearchDone = useRef(false);

  const handleSearch = useCallback(async function handleSearch(
    keyword: string,
    countryCode: string,
    languageCode: string
  ) {
    setLoading(true);
    setError(null);
    setResults([]);

    const keywords = keyword
      .split(/[,\n]/)
      .map((k) => k.trim())
      .filter(Boolean);

    if (keywords.length === 0) return;

    try {
      if (keywords.length === 1) {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keyword: keywords[0],
            countryCode,
            languageCode,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `HTTP ${res.status}`);
        }

        const data: SearchResult = await res.json();
        setResults([data]);
      } else {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keywords, countryCode, languageCode }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `HTTP ${res.status}`);
        }

        const data = await res.json();
        setResults(data.results);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-search when navigated with ?q= param
  useEffect(() => {
    if (initialSearchDone.current) return;
    const q = searchParams.get("q");
    if (q) {
      initialSearchDone.current = true;
      const countryCode = localStorage.getItem("seolens_country") || "US";
      const languageCode = localStorage.getItem("seolens_language") || "en";
      handleSearch(q, countryCode, languageCode);
    }
  }, [searchParams, handleSearch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-sl-text-primary mb-6">
        {t("title")}
      </h1>

      <SearchBar
        onSearch={handleSearch}
        loading={loading}
        initialKeyword={searchParams.get("q") ?? ""}
      />

      {loading && (
        <div className="mt-8 flex items-center justify-center gap-3 text-sl-text-muted">
          <svg
            className="animate-spin h-5 w-5 text-sl-accent"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span>{t("search.loading")}</span>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      {results.map((result) => (
        <div key={result.keyword} className="mt-6">
          <div className="rounded-xl border border-sl-border bg-sl-bg-surface p-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-semibold text-sl-text-primary mb-4">
              &ldquo;{result.keyword}&rdquo;
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-sl-text-muted uppercase font-medium tracking-wider">
                  {t("results.volume")}
                </p>
                <p className="text-2xl font-bold text-sl-text-primary font-mono tabular-nums mt-1">
                  {formatNumber(result.metrics?.avgMonthlySearches ?? null)}
                </p>
              </div>
              <div>
                <p className="text-xs text-sl-text-muted uppercase font-medium tracking-wider">
                  {t("results.difficulty")}
                </p>
                <div className="mt-2">
                  <DifficultyBadge difficulty={result.difficulty} />
                </div>
              </div>
              <div>
                <p className="text-xs text-sl-text-muted uppercase font-medium tracking-wider">
                  {t("results.cpc")}
                </p>
                <p className="text-lg font-semibold text-sl-text-primary font-mono tabular-nums mt-1">
                  {formatCpc(
                    result.metrics?.cpcLow ?? null,
                    result.metrics?.cpcHigh ?? null
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-sl-text-muted uppercase font-medium tracking-wider">
                  {t("results.competition")}
                </p>
                <p className="text-lg font-semibold text-sl-text-primary mt-1">
                  {result.metrics?.competition ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <ResultsTable suggestions={result.suggestions} />
        </div>
      ))}
    </div>
  );
}

export default function ToolPage() {
  return (
    <Suspense>
      <ToolPageContent />
    </Suspense>
  );
}
