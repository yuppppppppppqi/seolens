interface DataForSeoKDItem {
  keyword: string;
  keyword_difficulty: number;
}

interface DataForSeoResponse {
  tasks: Array<{
    result: Array<{
      items: DataForSeoKDItem[];
    }>;
  }>;
}

function getCredentials(): string {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    throw new Error("Missing DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD");
  }
  return Buffer.from(`${login}:${password}`).toString("base64");
}

export async function getKeywordDifficulty(
  keywords: string[],
  locationCode: number,
  languageCode: string
): Promise<Map<string, number>> {
  const credentials = getCredentials();

  const res = await fetch(
    "https://api.dataforseo.com/v3/dataforseo_labs/google/bulk_keyword_difficulty/live",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          keywords,
          location_code: locationCode,
          language_code: languageCode,
        },
      ]),
    }
  );

  if (!res.ok) {
    throw new Error(`DataForSEO API error: ${res.status} ${res.statusText}`);
  }

  const data: DataForSeoResponse = await res.json();

  const map = new Map<string, number>();
  const items = data.tasks?.[0]?.result?.[0]?.items;
  if (items) {
    for (const item of items) {
      if (item.keyword_difficulty != null) {
        map.set(item.keyword, item.keyword_difficulty);
      }
    }
  }

  return map;
}

// DataForSEO also provides search volume as a fallback
// when Google Ads API developer token is pending approval

interface DataForSeoVolumeItem {
  keyword: string;
  keyword_info: {
    search_volume: number;
    cpc: number;
    competition: number;
    competition_level: string;
  };
}

interface DataForSeoVolumeResponse {
  tasks: Array<{
    result: Array<{
      items: DataForSeoVolumeItem[];
    }>;
  }>;
}

export async function getSearchVolumeFallback(
  keywords: string[],
  locationCode: number,
  languageCode: string
): Promise<
  Map<
    string,
    {
      searchVolume: number;
      cpc: number;
      competition: string;
    }
  >
> {
  const credentials = getCredentials();

  const res = await fetch(
    "https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_overview/live",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          keywords,
          location_code: locationCode,
          language_code: languageCode,
        },
      ]),
    }
  );

  if (!res.ok) {
    throw new Error(`DataForSEO API error: ${res.status} ${res.statusText}`);
  }

  const data: DataForSeoVolumeResponse = await res.json();

  const map = new Map<
    string,
    { searchVolume: number; cpc: number; competition: string }
  >();
  const items = data.tasks?.[0]?.result?.[0]?.items;
  if (items) {
    for (const item of items) {
      const info = item.keyword_info;
      if (info) {
        map.set(item.keyword, {
          searchVolume: info.search_volume,
          cpc: info.cpc,
          competition: info.competition_level,
        });
      }
    }
  }

  return map;
}
