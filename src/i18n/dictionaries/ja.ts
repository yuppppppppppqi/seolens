import type { Dictionary } from "../types";

const ja: Dictionary = {
  pageTitle: "キーワードエクスプローラー",
  loadingMessage: "データを取得中... 新しいキーワードは数秒かかる場合があります。",
  errorFallback: "エラーが発生しました",

  searchPlaceholder: "キーワードを入力（1行に1つ、またはカンマ区切り）...",
  searchButton: "検索",
  searchButtonLoading: "検索中...",
  searchButtonCount: "検索 ({count})",

  volume: "検索ボリューム",
  keywordDifficulty: "キーワード難易度",
  cpc: "CPC",
  competition: "競合性",

  volumeTooltip: "選択した地域における、このキーワードの月間平均検索回数です。",
  difficultyTooltip: "検索結果のトップ10にランクインする難しさ。0〜100で、数値が高いほど難しくなります。",
  cpcTooltip: "クリック単価 — このキーワードの広告1クリックあたりの推定費用です。",
  competitionTooltip: "Google広告における、このキーワードの広告主間の競争レベルです。",

  keywordSuggestions: "関連キーワード",
  columnKeyword: "キーワード",
  columnVolume: "ボリューム",
  columnKD: "KD",
  columnCPC: "CPC",
  columnCompetition: "競合性",

  difficultyVeryEasy: "とても簡単",
  difficultyEasy: "簡単",
  difficultyModerate: "普通",
  difficultyHard: "難しい",
  difficultyVeryHard: "とても難しい",
  difficultyExtreme: "非常に難しい",
  difficultyNA: "N/A",
};

export default ja;
