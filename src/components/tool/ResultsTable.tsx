"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DifficultyBadge from "./DifficultyBadge";
import { exportToCSV, exportToJSON } from "@/lib/export";
import type { KeywordSuggestion } from "@/types";

interface ResultsTableProps {
  suggestions: KeywordSuggestion[];
}

type SortKey = "keyword" | "avgMonthlySearches" | "difficulty" | "cpcLow";
type SortDir = "asc" | "desc";

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

export default function ResultsTable({ suggestions }: ResultsTableProps) {
  const t = useTranslations("tool.results");
  const [sortKey, setSortKey] = useState<SortKey>("avgMonthlySearches");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  const sorted = [...suggestions].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal === null && bVal === null) return 0;
    if (aVal === null) return 1;
    if (bVal === null) return -1;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDir === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortDir === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " \u2191" : " \u2193";
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-sl-text-primary">
          {t("suggestions")} ({suggestions.length})
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(sorted, `seolens-keywords`)}
            className="inline-flex items-center gap-1.5 rounded-md border border-sl-border px-3 py-1.5 text-xs font-medium text-sl-text-secondary hover:bg-sl-bg-hover hover:text-sl-text-primary transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t("exportCSV")}
          </button>
          <button
            onClick={() => exportToJSON(sorted, `seolens-keywords`)}
            className="inline-flex items-center gap-1.5 rounded-md border border-sl-border px-3 py-1.5 text-xs font-medium text-sl-text-secondary hover:bg-sl-bg-hover hover:text-sl-text-primary transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {t("exportJSON")}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-sl-border">
        <table className="min-w-full divide-y divide-sl-border">
          <thead className="bg-sl-bg-elevated">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-sl-text-muted uppercase w-10">
                #
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-sl-text-muted uppercase cursor-pointer hover:text-sl-text-secondary"
                onClick={() => handleSort("keyword")}
              >
                Keyword{sortIndicator("keyword")}
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-sl-text-muted uppercase cursor-pointer hover:text-sl-text-secondary"
                onClick={() => handleSort("avgMonthlySearches")}
              >
                {t("volume")}
                {sortIndicator("avgMonthlySearches")}
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-sl-text-muted uppercase cursor-pointer hover:text-sl-text-secondary"
                onClick={() => handleSort("difficulty")}
              >
                KD{sortIndicator("difficulty")}
              </th>
              <th
                className="px-4 py-3 text-right text-xs font-medium text-sl-text-muted uppercase cursor-pointer hover:text-sl-text-secondary"
                onClick={() => handleSort("cpcLow")}
              >
                {t("cpc")}
                {sortIndicator("cpcLow")}
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-sl-text-muted uppercase">
                {t("competition")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sl-border">
            {sorted.map((s, i) => (
              <tr
                key={s.keyword}
                className="hover:bg-sl-bg-hover transition-colors"
              >
                <td className="px-4 py-3 text-sm text-sl-text-muted tabular-nums">
                  {i + 1}
                </td>
                <td className="px-4 py-3 text-sm text-sl-text-primary font-medium">
                  {s.keyword}
                </td>
                <td className="px-4 py-3 text-sm text-sl-text-secondary text-right font-mono tabular-nums">
                  {formatNumber(s.avgMonthlySearches)}
                </td>
                <td className="px-4 py-3 text-center">
                  <DifficultyBadge difficulty={s.difficulty} />
                </td>
                <td className="px-4 py-3 text-sm text-sl-text-secondary text-right font-mono tabular-nums">
                  {formatCpc(s.cpcLow, s.cpcHigh)}
                </td>
                <td className="px-4 py-3 text-sm text-sl-text-muted text-center">
                  {s.competition ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
