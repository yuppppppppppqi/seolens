// --- API Response Types ---

export interface KeywordMetrics {
  keyword: string;
  avgMonthlySearches: number | null;
  competition: string | null;
  competitionIndex: number | null;
  cpcLow: number | null;
  cpcHigh: number | null;
  monthlyVolumes: MonthlyVolume[] | null;
}

export interface MonthlyVolume {
  year: number;
  month: number;
  searches: number;
}

export interface KeywordDifficulty {
  keyword: string;
  difficulty: number | null;
}

export interface KeywordSuggestion {
  keyword: string;
  avgMonthlySearches: number | null;
  difficulty: number | null;
  cpcLow: number | null;
  cpcHigh: number | null;
  competition: string | null;
}

export interface SearchResult {
  keyword: string;
  countryCode: string;
  languageCode: string;
  metrics: KeywordMetrics | null;
  difficulty: number | null;
  suggestions: KeywordSuggestion[];
}

// --- Request Types ---

export interface SearchRequest {
  keyword: string;
  countryCode: string;
  languageCode: string;
}

// --- DB Cache Row Types ---

export interface CachedKeywordMetrics {
  id: number;
  keyword: string;
  country_code: string;
  language_code: string;
  avg_monthly_searches: number | null;
  competition: string | null;
  competition_index: number | null;
  cpc_low_micros: number | null;
  cpc_high_micros: number | null;
  monthly_volumes: MonthlyVolume[] | null;
  fetched_at: string;
}

export interface CachedKeywordDifficulty {
  id: number;
  keyword: string;
  country_code: string;
  language_code: string;
  difficulty: number;
  fetched_at: string;
}

export interface CachedKeywordSuggestions {
  id: number;
  seed_keyword: string;
  country_code: string;
  language_code: string;
  suggestions: string[];
  fetched_at: string;
}

// --- Country / Language Config ---

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  geoTargetConstant: string;
  dataForSeoLocationCode: number;
  defaultLanguage: string;
}

export interface LanguageConfig {
  code: string;
  name: string;
  googleAdsConstant: string;
  dataForSeoCode: string;
}
