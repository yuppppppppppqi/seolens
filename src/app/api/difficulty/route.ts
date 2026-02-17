import { NextRequest, NextResponse } from "next/server";
import { getKeywordDifficulty } from "@/lib/dataforseo";
import { isInternalRequest } from "@/lib/api-auth";
import {
  getCachedDifficulty,
  setCachedDifficulty,
  getCachedDifficultyBatch,
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

    // Check cache for all keywords
    let uncached: string[];
    const result = new Map<string, number>();

    if (keywordList.length === 1) {
      const cached = await getCachedDifficulty(
        keywordList[0],
        countryCode,
        languageCode
      );
      if (cached) {
        result.set(keywordList[0], cached.difficulty);
      }
      uncached = cached ? [] : keywordList;
    } else {
      const cachedMap = await getCachedDifficultyBatch(
        keywordList,
        countryCode,
        languageCode
      );
      for (const [kw, diff] of cachedMap) {
        result.set(kw, diff);
      }
      uncached = keywordList.filter((kw) => !cachedMap.has(kw));
    }

    // Fetch uncached from DataForSEO (batch up to 1000)
    if (uncached.length > 0) {
      const chunks = chunkArray(uncached, 1000);
      for (const chunk of chunks) {
        const fetched = await getKeywordDifficulty(
          chunk,
          country.dataForSeoLocationCode,
          language.dataForSeoCode
        );

        // Cache and collect results
        for (const [kw, diff] of fetched) {
          result.set(kw, diff);
          await setCachedDifficulty(kw, countryCode, languageCode, diff);
        }
      }
    }

    const difficulties = keywordList.map((kw) => ({
      keyword: kw,
      difficulty: result.get(kw) ?? null,
    }));

    return NextResponse.json({ difficulties });
  } catch (error) {
    console.error("Difficulty API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch keyword difficulty" },
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
