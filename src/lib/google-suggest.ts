import pLimit from "p-limit";

const limit = pLimit(5);
const DELAY_MS = 100;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchSuggestions(
  query: string,
  gl: string,
  hl: string
): Promise<string[]> {
  const params = new URLSearchParams({
    client: "chrome",
    q: query,
    gl: gl.toLowerCase(),
    hl: hl.toLowerCase(),
    ie: "utf-8",
    oe: "utf-8",
  });

  const url = `https://suggestqueries.google.com/complete/search?${params}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const buf = await res.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(buf);
    const data = JSON.parse(text);
    return (data[1] as string[]) || [];
  } catch {
    return [];
  }
}

export async function getSuggestions(
  keyword: string,
  countryCode: string,
  languageCode: string
): Promise<string[]> {
  const suggestions = new Set<string>();

  // 1. Direct query
  const direct = await fetchSuggestions(keyword, countryCode, languageCode);
  direct.forEach((s) => suggestions.add(s));

  // 2. Alphabet expansion (a-z)
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  // 3. For Japanese, add hiragana expansion
  const hiragana =
    languageCode === "ja"
      ? "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split(
          ""
        )
      : [];

  const expansionChars = [...alphabet, ...hiragana];

  const tasks = expansionChars.map((char) =>
    limit(async () => {
      await sleep(DELAY_MS);
      return fetchSuggestions(`${keyword} ${char}`, countryCode, languageCode);
    })
  );

  const results = await Promise.allSettled(tasks);
  for (const result of results) {
    if (result.status === "fulfilled") {
      result.value.forEach((s) => suggestions.add(s));
    }
  }

  // Remove the seed keyword itself
  suggestions.delete(keyword);

  return Array.from(suggestions);
}
