import { NextRequest, NextResponse } from "next/server";
import { getSuggestions } from "@/lib/google-suggest";
import { getCachedSuggestions, setCachedSuggestions } from "@/lib/cache";

export async function POST(req: NextRequest) {
  try {
    const { keyword, countryCode, languageCode } = await req.json();

    if (!keyword || !countryCode || !languageCode) {
      return NextResponse.json(
        { error: "keyword, countryCode, and languageCode are required" },
        { status: 400 }
      );
    }

    const normalizedKeyword = keyword.trim().toLowerCase();

    // Check cache
    const cached = await getCachedSuggestions(
      normalizedKeyword,
      countryCode,
      languageCode
    );
    if (cached) {
      return NextResponse.json({ suggestions: cached.suggestions, cached: true });
    }

    // Fetch from Google Suggest
    const suggestions = await getSuggestions(
      normalizedKeyword,
      countryCode,
      languageCode
    );

    // Cache results
    await setCachedSuggestions(
      normalizedKeyword,
      countryCode,
      languageCode,
      suggestions
    );

    return NextResponse.json({ suggestions, cached: false });
  } catch (error) {
    console.error("Suggestions API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 }
    );
  }
}
