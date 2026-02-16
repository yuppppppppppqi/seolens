import { GoogleAdsApi } from "google-ads-api";
import type { MonthlyVolume } from "@/types";

interface GoogleAdsMetrics {
  keyword: string;
  avgMonthlySearches: number | null;
  competition: string | null;
  competitionIndex: number | null;
  cpcLowMicros: number | null;
  cpcHighMicros: number | null;
  monthlyVolumes: MonthlyVolume[] | null;
}

let clientInstance: GoogleAdsApi | null = null;

function getClient(): GoogleAdsApi {
  if (clientInstance) return clientInstance;

  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;

  if (!clientId || !clientSecret || !developerToken) {
    throw new Error(
      "Missing Google Ads API credentials (CLIENT_ID, CLIENT_SECRET, or DEVELOPER_TOKEN)"
    );
  }

  clientInstance = new GoogleAdsApi({
    client_id: clientId,
    client_secret: clientSecret,
    developer_token: developerToken,
  });

  return clientInstance;
}

export async function getSearchVolume(
  keywords: string[],
  geoTargetConstant: string,
  languageConstant: string
): Promise<Map<string, GoogleAdsMetrics>> {
  const client = getClient();
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID;

  if (!customerId || !refreshToken) {
    throw new Error("Missing GOOGLE_ADS_CUSTOMER_ID or GOOGLE_ADS_REFRESH_TOKEN");
  }

  const customer = client.Customer({
    customer_id: customerId,
    refresh_token: refreshToken,
    login_customer_id: loginCustomerId || undefined,
  });

  // Use the keyword plan service to get historical metrics
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: any =
    await customer.keywordPlanIdeas.generateKeywordHistoricalMetrics({
      customer_id: customerId,
      keywords,
      geo_target_constants: [geoTargetConstant],
      language: languageConstant,
      keyword_plan_network: 2, // GOOGLE_SEARCH
      include_adult_keywords: false,
    } as Parameters<typeof customer.keywordPlanIdeas.generateKeywordHistoricalMetrics>[0]);

  const map = new Map<string, GoogleAdsMetrics>();

  if (response?.results) {
    for (const result of response.results) {
      const text = result.text;
      const metrics = result.keyword_metrics;

      if (!text || !metrics) continue;

      const monthlyVolumes: MonthlyVolume[] = [];
      if (metrics.monthly_search_volumes) {
        for (const mv of metrics.monthly_search_volumes) {
          monthlyVolumes.push({
            year: mv.year,
            month: mv.month,
            searches: Number(mv.monthly_searches) || 0,
          });
        }
      }

      map.set(text, {
        keyword: text,
        avgMonthlySearches: Number(metrics.avg_monthly_searches) || null,
        competition: metrics.competition
          ? String(metrics.competition)
          : null,
        competitionIndex: metrics.competition_index ?? null,
        cpcLowMicros: metrics.low_top_of_page_bid_micros
          ? Number(metrics.low_top_of_page_bid_micros)
          : null,
        cpcHighMicros: metrics.high_top_of_page_bid_micros
          ? Number(metrics.high_top_of_page_bid_micros)
          : null,
        monthlyVolumes: monthlyVolumes.length > 0 ? monthlyVolumes : null,
      });
    }
  }

  return map;
}

export function isGoogleAdsConfigured(): boolean {
  return !!(
    process.env.GOOGLE_ADS_CLIENT_ID &&
    process.env.GOOGLE_ADS_CLIENT_SECRET &&
    process.env.GOOGLE_ADS_DEVELOPER_TOKEN &&
    process.env.GOOGLE_ADS_CUSTOMER_ID &&
    process.env.GOOGLE_ADS_REFRESH_TOKEN
  );
}
