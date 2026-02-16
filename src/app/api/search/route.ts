import { NextRequest, NextResponse } from "next/server";
import { performSearch } from "@/lib/search";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both single keyword and multiple keywords
    const keywords: string[] = body.keywords
      ? body.keywords
      : body.keyword
        ? [body.keyword]
        : [];

    const { countryCode, languageCode } = body;

    if (keywords.length === 0 || !countryCode || !languageCode) {
      return NextResponse.json(
        { error: "keyword(s), countryCode, and languageCode are required" },
        { status: 400 }
      );
    }

    if (keywords.length === 1) {
      const result = await performSearch(keywords[0], countryCode, languageCode);
      return NextResponse.json(result);
    }

    // Multiple keywords: run in parallel
    const results = await Promise.all(
      keywords.map((kw: string) => performSearch(kw, countryCode, languageCode))
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
