import type { Dictionary } from "../types";

const zh: Dictionary = {
  pageTitle: "关键词探索",
  loadingMessage: "正在获取数据... 新关键词可能需要几秒钟。",
  errorFallback: "发生错误",

  searchPlaceholder: "输入关键词（每行一个或用逗号分隔）...",
  searchButton: "搜索",
  searchButtonLoading: "搜索中...",
  searchButtonCount: "搜索 ({count})",

  volume: "搜索量",
  keywordDifficulty: "关键词难度",
  cpc: "CPC",
  competition: "竞争度",

  volumeTooltip: "该关键词在所选地区的月均搜索次数。",
  difficultyTooltip: "进入自然搜索前10名的难度。0-100，数值越高越难。",
  cpcTooltip: "每次点击费用 — 广告主为该关键词每次点击支付的预估费用。",
  competitionTooltip: "该关键词在Google Ads付费搜索中的广告主竞争程度。",

  keywordSuggestions: "相关关键词",
  columnKeyword: "关键词",
  columnVolume: "搜索量",
  columnKD: "KD",
  columnCPC: "CPC",
  columnCompetition: "竞争度",

  difficultyVeryEasy: "非常容易",
  difficultyEasy: "容易",
  difficultyModerate: "中等",
  difficultyHard: "困难",
  difficultyVeryHard: "非常困难",
  difficultyExtreme: "极难",
  difficultyNA: "N/A",
};

export default zh;
