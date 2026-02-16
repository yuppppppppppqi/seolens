import type { Dictionary } from "../types";

const ko: Dictionary = {
  pageTitle: "키워드 탐색기",
  loadingMessage: "데이터를 가져오는 중... 새 키워드는 몇 초 정도 걸릴 수 있습니다.",
  errorFallback: "오류가 발생했습니다",

  searchPlaceholder: "키워드 입력 (한 줄에 하나 또는 쉼표로 구분)...",
  searchButton: "검색",
  searchButtonLoading: "검색 중...",
  searchButtonCount: "검색 ({count})",

  volume: "검색량",
  keywordDifficulty: "키워드 난이도",
  cpc: "CPC",
  competition: "경쟁도",

  volumeTooltip: "선택한 지역에서 이 키워드의 월평균 검색 횟수입니다.",
  difficultyTooltip: "자연 검색 상위 10위 안에 드는 난이도. 0-100, 높을수록 어렵습니다.",
  cpcTooltip: "클릭당 비용 — 이 키워드 광고 클릭 1회당 예상 비용입니다.",
  competitionTooltip: "Google Ads 유료 검색에서 이 키워드의 광고주 경쟁 수준입니다.",

  keywordSuggestions: "관련 키워드",
  columnKeyword: "키워드",
  columnVolume: "검색량",
  columnKD: "KD",
  columnCPC: "CPC",
  columnCompetition: "경쟁도",

  difficultyVeryEasy: "매우 쉬움",
  difficultyEasy: "쉬움",
  difficultyModerate: "보통",
  difficultyHard: "어려움",
  difficultyVeryHard: "매우 어려움",
  difficultyExtreme: "극도로 어려움",
  difficultyNA: "N/A",
};

export default ko;
