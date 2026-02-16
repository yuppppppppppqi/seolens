import { getSuggestions } from "@/lib/google-suggest";
import { getKeywordDifficulty } from "@/lib/dataforseo";
import { getSearchVolume, isGoogleAdsConfigured } from "@/lib/google-ads";
import { getSearchVolumeFallback } from "@/lib/dataforseo";
import {
  getCachedMetrics,
  setCachedMetrics,
  getCachedDifficulty,
  setCachedDifficulty,
  getCachedSuggestions,
  setCachedSuggestions,
  getCachedMetricsBatch,
  getCachedDifficultyBatch,
} from "@/lib/cache";
import { getCountry, getLanguage } from "@/lib/constants";
import type { SearchResult, KeywordSuggestion } from "@/types";

interface RawMetrics {
  avgMonthlySearches: number | null;
  competition: string | null;
  competitionIndex: number | null;
  cpcLowMicros: number | null;
  cpcHighMicros: number | null;
  monthlyVolumes: { year: number; month: number; searches: number }[] | null;
}

export async function performSearch(
  keyword: string,
  countryCode: string,
  languageCode: string
): Promise<SearchResult> {
  const country = getCountry(countryCode);
  const language = getLanguage(languageCode);
  if (!country || !language) {
    throw new Error("Invalid countryCode or languageCode");
  }

  const normalizedKeyword = keyword.trim().toLowerCase();

  const [metricsResult, difficultyResult, suggestionsResult] =
    await Promise.allSettled([
      fetchMetrics(normalizedKeyword, countryCode, languageCode, country, language),
      fetchDifficulty(normalizedKeyword, countryCode, languageCode, country, language),
      fetchSuggestions(normalizedKeyword, countryCode, languageCode),
    ]);

  const metrics =
    metricsResult.status === "fulfilled" ? metricsResult.value : null;
  const difficulty =
    difficultyResult.status === "fulfilled" ? difficultyResult.value : null;
  const suggestions =
    suggestionsResult.status === "fulfilled" ? suggestionsResult.value : [];

  const enrichedSuggestions = await enrichSuggestions(
    suggestions,
    countryCode,
    languageCode,
    country,
    language
  );

  return {
    keyword: normalizedKeyword,
    countryCode,
    languageCode,
    metrics: metrics
      ? {
          keyword: normalizedKeyword,
          avgMonthlySearches: metrics.avgMonthlySearches,
          competition: metrics.competition,
          competitionIndex: metrics.competitionIndex,
          cpcLow: metrics.cpcLowMicros ? metrics.cpcLowMicros / 1_000_000 : null,
          cpcHigh: metrics.cpcHighMicros ? metrics.cpcHighMicros / 1_000_000 : null,
          monthlyVolumes: metrics.monthlyVolumes,
        }
      : null,
    difficulty,
    suggestions: enrichedSuggestions,
  };
}

// --- Internal helpers ---

async function fetchMetrics(
  keyword: string,
  countryCode: string,
  languageCode: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  country: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language: any
): Promise<RawMetrics | null> {
  const cached = await getCachedMetrics(keyword, countryCode, languageCode);
  if (cached) {
    return {
      avgMonthlySearches: cached.avg_monthly_searches,
      competition: cached.competition,
      competitionIndex: cached.competition_index,
      cpcLowMicros: cached.cpc_low_micros,
      cpcHighMicros: cached.cpc_high_micros,
      monthlyVolumes: cached.monthly_volumes,
    };
  }

  let metrics: RawMetrics | null = null;

  if (isGoogleAdsConfigured()) {
    try {
      const fetched = await getSearchVolume(
        [keyword],
        country.geoTargetConstant,
        language.googleAdsConstant
      );
      const data = fetched.get(keyword);
      if (data) {
        metrics = {
          avgMonthlySearches: data.avgMonthlySearches,
          competition: data.competition,
          competitionIndex: data.competitionIndex,
          cpcLowMicros: data.cpcLowMicros,
          cpcHighMicros: data.cpcHighMicros,
          monthlyVolumes: data.monthlyVolumes,
        };
      }
    } catch (e) {
      console.warn("Google Ads API failed, falling back to DataForSEO:", e);
    }
  }

  if (!metrics) {
    const fetched = await getSearchVolumeFallback(
      [keyword],
      country.dataForSeoLocationCode,
      language.dataForSeoCode
    );
    const data = fetched.get(keyword);
    if (data) {
      metrics = {
        avgMonthlySearches: data.searchVolume,
        competition: data.competition,
        competitionIndex: null,
        cpcLowMicros: data.cpc ? Math.round(data.cpc * 1_000_000) : null,
        cpcHighMicros: null,
        monthlyVolumes: null,
      };
    }
  }

  if (metrics) {
    await setCachedMetrics(keyword, countryCode, languageCode, metrics);
  }

  return metrics;
}

async function fetchDifficulty(
  keyword: string,
  countryCode: string,
  languageCode: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  country: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language: any
): Promise<number | null> {
  const cached = await getCachedDifficulty(keyword, countryCode, languageCode);
  if (cached) return cached.difficulty;

  const fetched = await getKeywordDifficulty(
    [keyword],
    country.dataForSeoLocationCode,
    language.dataForSeoCode
  );

  const difficulty = fetched.get(keyword) ?? null;
  if (difficulty !== null) {
    await setCachedDifficulty(keyword, countryCode, languageCode, difficulty);
  }

  return difficulty;
}

async function fetchSuggestions(
  keyword: string,
  countryCode: string,
  languageCode: string
): Promise<string[]> {
  const cached = await getCachedSuggestions(keyword, countryCode, languageCode);
  if (cached) return cached.suggestions;

  const suggestions = await getSuggestions(keyword, countryCode, languageCode);
  await setCachedSuggestions(keyword, countryCode, languageCode, suggestions);

  return suggestions;
}

async function enrichSuggestions(
  suggestions: string[],
  countryCode: string,
  languageCode: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  country: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  language: any
): Promise<KeywordSuggestion[]> {
  if (suggestions.length === 0) return [];

  const toEnrich = suggestions.slice(0, 50);

  const [cachedMetrics, cachedDifficulty] = await Promise.all([
    getCachedMetricsBatch(toEnrich, countryCode, languageCode),
    getCachedDifficultyBatch(toEnrich, countryCode, languageCode),
  ]);

  const uncachedMetrics = toEnrich.filter((kw) => !cachedMetrics.has(kw));
  const uncachedDifficulty = toEnrich.filter((kw) => !cachedDifficulty.has(kw));

  const fetchPromises: Promise<void>[] = [];

  if (uncachedMetrics.length > 0) {
    fetchPromises.push(
      (async () => {
        let googleAdsSucceeded = false;

        if (isGoogleAdsConfigured()) {
          try {
            const chunks = chunkArray(uncachedMetrics, 10);
            for (const chunk of chunks) {
              const fetched = await getSearchVolume(
                chunk,
                country.geoTargetConstant,
                language.googleAdsConstant
              );
              for (const [kw, data] of fetched) {
                cachedMetrics.set(kw, {
                  id: 0,
                  keyword: kw,
                  country_code: countryCode,
                  language_code: languageCode,
                  avg_monthly_searches: data.avgMonthlySearches,
                  competition: data.competition,
                  competition_index: data.competitionIndex,
                  cpc_low_micros: data.cpcLowMicros,
                  cpc_high_micros: data.cpcHighMicros,
                  monthly_volumes: data.monthlyVolumes,
                  fetched_at: new Date().toISOString(),
                });
                await setCachedMetrics(kw, countryCode, languageCode, {
                  avgMonthlySearches: data.avgMonthlySearches,
                  competition: data.competition,
                  competitionIndex: data.competitionIndex,
                  cpcLowMicros: data.cpcLowMicros,
                  cpcHighMicros: data.cpcHighMicros,
                  monthlyVolumes: data.monthlyVolumes,
                });
              }
            }
            googleAdsSucceeded = true;
          } catch (e) {
            console.warn("Google Ads API failed for suggestions, falling back to DataForSEO:", e);
          }
        }

        if (!googleAdsSucceeded) {
          const stillMissing = uncachedMetrics.filter((kw) => !cachedMetrics.has(kw));
          if (stillMissing.length > 0) {
            const chunks = chunkArray(stillMissing, 700);
            for (const chunk of chunks) {
              const fetched = await getSearchVolumeFallback(
                chunk,
                country.dataForSeoLocationCode,
                language.dataForSeoCode
              );
              for (const [kw, data] of fetched) {
                cachedMetrics.set(kw, {
                  id: 0,
                  keyword: kw,
                  country_code: countryCode,
                  language_code: languageCode,
                  avg_monthly_searches: data.searchVolume,
                  competition: data.competition,
                  competition_index: null,
                  cpc_low_micros: data.cpc ? Math.round(data.cpc * 1_000_000) : null,
                  cpc_high_micros: null,
                  monthly_volumes: null,
                  fetched_at: new Date().toISOString(),
                });
                await setCachedMetrics(kw, countryCode, languageCode, {
                  avgMonthlySearches: data.searchVolume,
                  competition: data.competition,
                  competitionIndex: null,
                  cpcLowMicros: data.cpc ? Math.round(data.cpc * 1_000_000) : null,
                  cpcHighMicros: null,
                  monthlyVolumes: null,
                });
              }
            }
          }
        }
      })()
    );
  }

  if (uncachedDifficulty.length > 0) {
    fetchPromises.push(
      (async () => {
        const chunks = chunkArray(uncachedDifficulty, 1000);
        for (const chunk of chunks) {
          const fetched = await getKeywordDifficulty(
            chunk,
            country.dataForSeoLocationCode,
            language.dataForSeoCode
          );
          for (const [kw, diff] of fetched) {
            cachedDifficulty.set(kw, diff);
            await setCachedDifficulty(kw, countryCode, languageCode, diff);
          }
        }
      })()
    );
  }

  await Promise.allSettled(fetchPromises);

  return toEnrich.map((kw) => {
    const m = cachedMetrics.get(kw);
    return {
      keyword: kw,
      avgMonthlySearches: m?.avg_monthly_searches ?? null,
      difficulty: cachedDifficulty.get(kw) ?? null,
      cpcLow: m?.cpc_low_micros ? m.cpc_low_micros / 1_000_000 : null,
      cpcHigh: m?.cpc_high_micros ? m.cpc_high_micros / 1_000_000 : null,
      competition: m?.competition ?? null,
    };
  });
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
