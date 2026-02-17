import { NextRequest, NextResponse } from "next/server";
import { getSearchVolume, isGoogleAdsConfigured } from "@/lib/google-ads";
import { getSearchVolumeFallback } from "@/lib/dataforseo";
import { isInternalRequest } from "@/lib/api-auth";
import {
  getCachedMetrics,
  setCachedMetrics,
  getCachedMetricsBatch,
} from "@/lib/cache";
import { getCountry, getLanguage } from "@/lib/constants";

export async function POST(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json(
      { error: "This endpoint is for internal use. Use /api/v1/research with an API key." },
      { status: 403 }
    );
  }

  try {
    const { keywords, countryCode, languageCode } = await req.json();

    if (!keywords?.length || !countryCode || !languageCode) {
      return NextResponse.json(
        { error: "keywords[], countryCode, and languageCode are required" },
        { status: 400 }
      );
    }

    const country = getCountry(countryCode);
    const language = getLanguage(languageCode);
    if (!country || !language) {
      return NextResponse.json(
        { error: "Invalid countryCode or languageCode" },
        { status: 400 }
      );
    }

    const keywordList: string[] = keywords.map((k: string) =>
      k.trim().toLowerCase()
    );

    // Check cache
    const result = new Map<
      string,
      {
        avgMonthlySearches: number | null;
        competition: string | null;
        competitionIndex: number | null;
        cpcLow: number | null;
        cpcHigh: number | null;
        monthlyVolumes: { year: number; month: number; searches: number }[] | null;
      }
    >();

    let uncached: string[];

    if (keywordList.length === 1) {
      const cached = await getCachedMetrics(
        keywordList[0],
        countryCode,
        languageCode
      );
      if (cached) {
        result.set(keywordList[0], {
          avgMonthlySearches: cached.avg_monthly_searches,
          competition: cached.competition,
          competitionIndex: cached.competition_index,
          cpcLow: cached.cpc_low_micros
            ? cached.cpc_low_micros / 1_000_000
            : null,
          cpcHigh: cached.cpc_high_micros
            ? cached.cpc_high_micros / 1_000_000
            : null,
          monthlyVolumes: cached.monthly_volumes,
        });
      }
      uncached = cached ? [] : keywordList;
    } else {
      const cachedMap = await getCachedMetricsBatch(
        keywordList,
        countryCode,
        languageCode
      );
      for (const [kw, cached] of cachedMap) {
        result.set(kw, {
          avgMonthlySearches: cached.avg_monthly_searches,
          competition: cached.competition,
          competitionIndex: cached.competition_index,
          cpcLow: cached.cpc_low_micros
            ? cached.cpc_low_micros / 1_000_000
            : null,
          cpcHigh: cached.cpc_high_micros
            ? cached.cpc_high_micros / 1_000_000
            : null,
          monthlyVolumes: cached.monthly_volumes,
        });
      }
      uncached = keywordList.filter((kw) => !cachedMap.has(kw));
    }

    // Fetch uncached keywords
    if (uncached.length > 0) {
      if (isGoogleAdsConfigured()) {
        // Use Google Ads API (free, exact volumes)
        const chunks = chunkArray(uncached, 10);
        for (const chunk of chunks) {
          const fetched = await getSearchVolume(
            chunk,
            country.geoTargetConstant,
            language.googleAdsConstant
          );

          for (const [kw, metrics] of fetched) {
            result.set(kw, {
              avgMonthlySearches: metrics.avgMonthlySearches,
              competition: metrics.competition,
              competitionIndex: metrics.competitionIndex,
              cpcLow: metrics.cpcLowMicros
                ? metrics.cpcLowMicros / 1_000_000
                : null,
              cpcHigh: metrics.cpcHighMicros
                ? metrics.cpcHighMicros / 1_000_000
                : null,
              monthlyVolumes: metrics.monthlyVolumes,
            });

            await setCachedMetrics(kw, countryCode, languageCode, {
              avgMonthlySearches: metrics.avgMonthlySearches,
              competition: metrics.competition,
              competitionIndex: metrics.competitionIndex,
              cpcLowMicros: metrics.cpcLowMicros,
              cpcHighMicros: metrics.cpcHighMicros,
              monthlyVolumes: metrics.monthlyVolumes,
            });
          }
        }
      } else {
        // Fallback: Use DataForSEO for volume
        const chunks = chunkArray(uncached, 700);
        for (const chunk of chunks) {
          const fetched = await getSearchVolumeFallback(
            chunk,
            country.dataForSeoLocationCode,
            language.dataForSeoCode
          );

          for (const [kw, data] of fetched) {
            result.set(kw, {
              avgMonthlySearches: data.searchVolume,
              competition: data.competition,
              competitionIndex: null,
              cpcLow: data.cpc,
              cpcHigh: null,
              monthlyVolumes: null,
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

    const metrics = keywordList.map((kw) => ({
      keyword: kw,
      ...(result.get(kw) ?? {
        avgMonthlySearches: null,
        competition: null,
        competitionIndex: null,
        cpcLow: null,
        cpcHigh: null,
        monthlyVolumes: null,
      }),
    }));

    return NextResponse.json({ metrics });
  } catch (error) {
    console.error("Keywords API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch keyword metrics" },
      { status: 500 }
    );
  }
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
