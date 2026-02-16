import { NextRequest, NextResponse } from "next/server";
import { performSearch } from "@/lib/search";

const MAX_KEYWORDS = 50;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { keywords, countryCode = "US", languageCode = "en" } = body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: "keywords (array of strings) is required", example: { keywords: ["seo tools", "keyword research"], countryCode: "US", languageCode: "en" } },
        { status: 400 }
      );
    }

    if (keywords.length > MAX_KEYWORDS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_KEYWORDS} keywords per request` },
        { status: 400 }
      );
    }

    const results = await Promise.all(
      keywords.map((kw: string) => performSearch(kw, countryCode, languageCode))
    );

    return NextResponse.json({
      count: results.length,
      countryCode,
      languageCode,
      results,
    });
  } catch (error) {
    console.error("Research API error:", error);
    return NextResponse.json(
      { error: "Failed to perform research" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    name: "SEOLens Keyword Research API",
    version: "1.0",
    endpoints: {
      "POST /api/v1/research": {
        description: "Research keywords with volume, difficulty, CPC, and suggestions",
        body: {
          keywords: ["string[]", "required - up to 50 keywords"],
          countryCode: ["string", "optional - default: US"],
          languageCode: ["string", "optional - default: en"],
        },
        countries: "US, JP, GB, DE, FR, CA, AU, BR, IN, KR, MX, ES, IT, NL, SE, TW, TH, VN, ID, PH",
        languages: "en, ja, de, fr, es, pt, it, nl, ko, zh, th, vi, id, sv",
      },
    },
  });
}
