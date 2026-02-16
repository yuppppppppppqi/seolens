import type { Dictionary } from "../types";

const en: Dictionary = {
  pageTitle: "Keyword Explorer",
  loadingMessage: "Fetching data... This may take a few seconds for new keywords.",
  errorFallback: "An error occurred",

  searchPlaceholder: "Enter keywords (one per line or comma-separated)...",
  searchButton: "Search",
  searchButtonLoading: "Searching...",
  searchButtonCount: "Search ({count})",

  volume: "Volume",
  keywordDifficulty: "Keyword Difficulty",
  cpc: "CPC",
  competition: "Competition",

  volumeTooltip: "Average number of monthly searches for this keyword in the selected region.",
  difficultyTooltip: "How hard it is to rank in the top 10 organic results. 0-100, higher = harder.",
  cpcTooltip: "Cost Per Click — the estimated price advertisers pay per click for this keyword.",
  competitionTooltip: "Level of advertiser competition for this keyword in paid search (Google Ads).",

  keywordSuggestions: "Keyword Suggestions",
  columnKeyword: "Keyword",
  columnVolume: "Volume",
  columnKD: "KD",
  columnCPC: "CPC",
  columnCompetition: "Competition",

  difficultyVeryEasy: "Very Easy",
  difficultyEasy: "Easy",
  difficultyModerate: "Moderate",
  difficultyHard: "Hard",
  difficultyVeryHard: "Very Hard",
  difficultyExtreme: "Extreme",
  difficultyNA: "N/A",
};

export default en;
