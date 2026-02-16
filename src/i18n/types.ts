export type Locale = "en" | "ja" | "zh" | "ko" | "es";

export interface Dictionary {
  // Page
  pageTitle: string;
  loadingMessage: string;
  errorFallback: string;

  // Search bar
  searchPlaceholder: string;
  searchButton: string;
  searchButtonLoading: string;
  searchButtonCount: string; // uses {count} placeholder

  // Metric labels
  volume: string;
  keywordDifficulty: string;
  cpc: string;
  competition: string;

  // Metric tooltips
  volumeTooltip: string;
  difficultyTooltip: string;
  cpcTooltip: string;
  competitionTooltip: string;

  // Table
  keywordSuggestions: string;
  columnKeyword: string;
  columnVolume: string;
  columnKD: string;
  columnCPC: string;
  columnCompetition: string;

  // Difficulty levels
  difficultyVeryEasy: string;
  difficultyEasy: string;
  difficultyModerate: string;
  difficultyHard: string;
  difficultyVeryHard: string;
  difficultyExtreme: string;
  difficultyNA: string;
}

export const UI_LANGUAGES: { code: Locale; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
  { code: "zh", name: "中文" },
  { code: "ko", name: "한국어" },
  { code: "es", name: "Español" },
];
