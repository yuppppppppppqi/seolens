import { getSupabase } from "./supabase";
import { CACHE_TTL } from "./constants";
import type {
  CachedKeywordMetrics,
  CachedKeywordDifficulty,
  CachedKeywordSuggestions,
  MonthlyVolume,
} from "@/types";

function ttlDate(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

// --- Keyword Metrics ---

export async function getCachedMetrics(
  keyword: string,
  countryCode: string,
  languageCode: string
): Promise<CachedKeywordMetrics | null> {
  const { data } = await getSupabase()
    .from("keyword_metrics")
    .select("*")
    .eq("keyword", keyword)
    .eq("country_code", countryCode)
    .eq("language_code", languageCode)
    .gte("fetched_at", ttlDate(CACHE_TTL.metrics))
    .single();

  return data as CachedKeywordMetrics | null;
}

export async function setCachedMetrics(
  keyword: string,
  countryCode: string,
  languageCode: string,
  metrics: {
    avgMonthlySearches: number | null;
    competition: string | null;
    competitionIndex: number | null;
    cpcLowMicros: number | null;
    cpcHighMicros: number | null;
    monthlyVolumes: MonthlyVolume[] | null;
  }
): Promise<void> {
  await getSupabase().from("keyword_metrics").upsert(
    {
      keyword,
      country_code: countryCode,
      language_code: languageCode,
      avg_monthly_searches: metrics.avgMonthlySearches,
      competition: metrics.competition,
      competition_index: metrics.competitionIndex,
      cpc_low_micros: metrics.cpcLowMicros,
      cpc_high_micros: metrics.cpcHighMicros,
      monthly_volumes: metrics.monthlyVolumes,
      fetched_at: new Date().toISOString(),
    },
    { onConflict: "keyword,country_code,language_code" }
  );
}

// --- Keyword Difficulty ---

export async function getCachedDifficulty(
  keyword: string,
  countryCode: string,
  languageCode: string
): Promise<CachedKeywordDifficulty | null> {
  const { data } = await getSupabase()
    .from("keyword_difficulty")
    .select("*")
    .eq("keyword", keyword)
    .eq("country_code", countryCode)
    .eq("language_code", languageCode)
    .gte("fetched_at", ttlDate(CACHE_TTL.difficulty))
    .single();

  return data as CachedKeywordDifficulty | null;
}

export async function setCachedDifficulty(
  keyword: string,
  countryCode: string,
  languageCode: string,
  difficulty: number
): Promise<void> {
  await getSupabase().from("keyword_difficulty").upsert(
    {
      keyword,
      country_code: countryCode,
      language_code: languageCode,
      difficulty,
      fetched_at: new Date().toISOString(),
    },
    { onConflict: "keyword,country_code,language_code" }
  );
}

// --- Keyword Suggestions ---

export async function getCachedSuggestions(
  seedKeyword: string,
  countryCode: string,
  languageCode: string
): Promise<CachedKeywordSuggestions | null> {
  const { data } = await getSupabase()
    .from("keyword_suggestions")
    .select("*")
    .eq("seed_keyword", seedKeyword)
    .eq("country_code", countryCode)
    .eq("language_code", languageCode)
    .gte("fetched_at", ttlDate(CACHE_TTL.suggestions))
    .single();

  return data as CachedKeywordSuggestions | null;
}

export async function setCachedSuggestions(
  seedKeyword: string,
  countryCode: string,
  languageCode: string,
  suggestions: string[]
): Promise<void> {
  await getSupabase().from("keyword_suggestions").upsert(
    {
      seed_keyword: seedKeyword,
      country_code: countryCode,
      language_code: languageCode,
      suggestions,
      fetched_at: new Date().toISOString(),
    },
    { onConflict: "seed_keyword,country_code,language_code" }
  );
}

// --- Batch helpers ---

export async function getCachedMetricsBatch(
  keywords: string[],
  countryCode: string,
  languageCode: string
): Promise<Map<string, CachedKeywordMetrics>> {
  const { data } = await getSupabase()
    .from("keyword_metrics")
    .select("*")
    .in("keyword", keywords)
    .eq("country_code", countryCode)
    .eq("language_code", languageCode)
    .gte("fetched_at", ttlDate(CACHE_TTL.metrics));

  const map = new Map<string, CachedKeywordMetrics>();
  if (data) {
    for (const row of data as CachedKeywordMetrics[]) {
      map.set(row.keyword, row);
    }
  }
  return map;
}

export async function getCachedDifficultyBatch(
  keywords: string[],
  countryCode: string,
  languageCode: string
): Promise<Map<string, number>> {
  const { data } = await getSupabase()
    .from("keyword_difficulty")
    .select("*")
    .in("keyword", keywords)
    .eq("country_code", countryCode)
    .eq("language_code", languageCode)
    .gte("fetched_at", ttlDate(CACHE_TTL.difficulty));

  const map = new Map<string, number>();
  if (data) {
    for (const row of data as CachedKeywordDifficulty[]) {
      map.set(row.keyword, row.difficulty);
    }
  }
  return map;
}
