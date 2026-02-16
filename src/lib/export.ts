import type { KeywordSuggestion } from "@/types";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToCSV(suggestions: KeywordSuggestion[], filename: string) {
  const header = "Keyword,Volume,Difficulty,CPC Low,CPC High,Competition";
  const rows = suggestions.map((s) => {
    const keyword = `"${s.keyword.replace(/"/g, '""')}"`;
    const volume = s.avgMonthlySearches ?? "";
    const difficulty = s.difficulty ?? "";
    const cpcLow = s.cpcLow != null ? s.cpcLow.toFixed(2) : "";
    const cpcHigh = s.cpcHigh != null ? s.cpcHigh.toFixed(2) : "";
    const competition = s.competition ?? "";
    return `${keyword},${volume},${difficulty},${cpcLow},${cpcHigh},${competition}`;
  });

  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, filename.endsWith(".csv") ? filename : `${filename}.csv`);
}

export function exportToJSON(suggestions: KeywordSuggestion[], filename: string) {
  const json = JSON.stringify(suggestions, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
  triggerDownload(blob, filename.endsWith(".json") ? filename : `${filename}.json`);
}
