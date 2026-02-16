# Keyword Search Volume & Difficulty Data: API Research (2025)

Comprehensive research on affordable alternatives for getting keyword search volume and keyword difficulty data globally (all countries and languages).

---

## 1. Google Ads API (Keyword Planner)

**How it works:** The Google Ads API exposes the same Keyword Planner functionality available in the Google Ads UI. You call `KeywordPlanIdeaService.GenerateKeywordHistoricalMetrics` or `GenerateKeywordIdeas` to get search volume, competition, CPC, and bid ranges for keywords. No KeywordPlan resource is required since API v10.1.

### Cost
- **The API itself is free** -- Google does not charge per API call
- **BUT** you need an active Google Ads account, and to get **exact** search volumes (not bucketed ranges like "1K-10K"), you need **active ad spend** on the account
- Accounts with low or zero ad spend only see broad ranges (e.g., "100-1K", "1K-10K") instead of precise numbers like "2,400"
- There is **no published minimum spend threshold** -- higher spend generally unlocks more precise data
- Even a small monthly spend (~$10-50/day) typically unlocks exact volumes

### Developer Token & Access Levels
- **Test Account Access**: Immediate, no approval needed, but only works with test accounts (no real data)
- **Explorer Access** (new tier, 2025): Limited production access without formal approval
- **Basic Access**: 15,000 operations/day limit, requires application and approval (currently experiencing backlogs as of early 2026)
- **Standard Access**: Unlimited operations, requires more extensive review

### Rate Limits
- Keyword Planning services have **stricter rate limits** than other Google Ads API services
- Basic Access: 15,000 operations/day
- Standard Access: Unlimited daily operations, but still subject to per-minute rate limiting
- `GenerateKeywordIdeas`: Up to 10 keywords + 10 URLs per request
- `GenerateHistoricalMetrics`: Returns monthly search volume, competition level, and bid ranges

### Data Quality
- **Source**: Google's own first-party search data -- the gold standard
- **Limitation**: Google groups similar keywords together and returns identical volumes for them (e.g., "running shoes" and "running shoe" may show the same number)
- Search volume is a **12-month average** of monthly searches
- Data is for **exact match** keywords only
- Restricted keyword categories (adult, gambling, etc.) may return no data

### Global Coverage
- All countries and languages supported by Google Ads (200+ countries, 40+ languages)
- Target by country, region, city, or DMA

### Restrictions
- Must comply with Google Ads API Terms of Service
- Cannot resell raw Keyword Planner data directly
- Must have a Google Ads manager account
- Developer token application can take weeks/months for Basic+ access

### Verdict
**Best for**: Getting the most authoritative search volume data if you're already running Google Ads. Effectively free if you have ad spend. Major hurdle is the developer token approval process and the requirement for active ad spend to get exact volumes.

---

## 2. DataForSEO API

The most comprehensive pay-as-you-go option for building SEO tools. Used by many SaaS companies as their backend data provider.

### Pricing (Pay-as-you-go, minimum $50 deposit, balance never expires)

| Endpoint | Cost | Details |
|----------|------|---------|
| **Keywords Data API (Google Ads)** | $0.01 task + $0.0001/keyword | Search volume, CPC, competition from Google Ads |
| **DataForSEO Labs - Keyword Overview** | ~$0.02/request | Up to 700 keywords/request. Includes search volume, KD, CPC, intent, SERP data |
| **DataForSEO Labs - Bulk Keyword Difficulty** | ~$0.01 + $0.0001/keyword | Up to 1,000 keywords/request |
| **Clickstream Search Volume (Bulk)** | $0.01 task + $0.0001/keyword | Up to 1,000 keywords/request |
| **Clickstream Search Volume (Global)** | $0.15/request | Worldwide data for up to 1,000 keywords |
| **DataForSEO Search Volume** (refined) | $0.01 task + $0.0001/keyword | Blends Google Ads + Bing/clickstream for more accuracy |

**Cost example**: 100,000 keywords with search volume + difficulty = approximately **$10-20**

### Data Quality
- **Google Ads data**: Pulled directly from Google Ads API (same bucketing issues, but DataForSEO refines it)
- **DataForSEO Search Volume**: Proprietary metric that combines Google Ads + Bing Ads + clickstream data to "unbucket" Google's ranges. More granular than raw Google Ads data
- **Clickstream data**: Based on GDPR-compliant, anonymized browsing data from millions of users. Captures actual search behavior
- **Keyword Difficulty**: Proprietary score (0-100) based on top-10 SERP analysis, backlink profiles

### Global Coverage
- **249 countries/locations** supported
- All Google locations and languages
- Bing data also available for supported markets
- Amazon keyword data for 20+ marketplaces

### Rate Limits
- No hard rate limits published; limited by your account balance
- Practical limits based on endpoint (e.g., 700 keywords per Keyword Overview request, 1,000 per bulk request)
- Concurrent request limits may apply

### Restrictions
- $50 minimum initial deposit
- Balance never expires
- Can be used to build and resell SaaS products (this is their primary use case)

### Verdict
**Best overall option for a Semrush clone**. Pay-as-you-go model is extremely cost-effective at scale. Full global coverage, keyword difficulty included, clickstream data for better accuracy. The $50 minimum is very reasonable.

---

## 3. Keywords Everywhere API

### Pricing
- **$10 for 100,000 credits** (1 credit = 1 keyword lookup)
- Credits valid for **1 year** from purchase
- That's **$0.0001 per keyword** -- extremely cheap
- No monthly subscription required for credits

### Annual Subscription Plans (for browser extension features):
| Plan | Monthly | Annual |
|------|---------|--------|
| Bronze | $2.25/mo | $27/yr |
| Silver | $6/mo | $72/yr |
| Gold | $17.50/mo | $210/yr |
| Platinum | $41.67/mo | $500/yr |

### API Capabilities
- Search volume (monthly average over 12 months)
- CPC (Cost Per Click)
- Competition score
- Trend data (12-month sparkline)
- Related keywords
- "People Also Search For" data
- Domain-level traffic metrics

### Data Quality
- Data sourced from Google Ads API + their own processing
- Generally considered reliable for English-language keywords
- Less accurate for non-English and low-volume keywords

### Global Coverage
- **Limited**: Primarily English-speaking countries
- Officially supports: Global, US, UK, Canada, Australia, New Zealand, South Africa, India
- Has some Latin-alphabet language data (Spanish, French, German) but **much less comprehensive** than English
- **NOT suitable for true global multi-language coverage**

### Rate Limits
- API rate limits not publicly detailed
- Credit-based system naturally limits usage

### Restrictions
- 1 credit per keyword lookup
- Bulk data feature available
- Credits expire after 1 year

### Verdict
**Cheapest per-keyword option** if you only need English-language data. The $10/100K credits pricing is hard to beat. However, severely limited for global/multi-language coverage.

---

## 4. Mangools / KWFinder API

### Pricing (Mangools Suite -- includes KWFinder, SERPChecker, SERPWatcher, LinkMiner, SiteProfiler)

| Plan | Monthly | Annual (per month) |
|------|---------|-------------------|
| Entry | $29.90 | $19.90 |
| Basic | $44.90 | $29.90 |
| Premium | $69.90 | $44.90 |
| Agency | $129.90 | $89.90 |

### API Access
- **API access is granted individually** -- you must contact Mangools directly
- No public API documentation or self-serve API signup
- Custom pricing provided upon request
- API provides: exact search volumes, keyword suggestions, SEO difficulty scores, bulk keyword data

### Data Quality
- Keyword difficulty score is well-regarded in the SEO community
- Search volume pulled from Google Ads API
- Historical data available
- SERP analysis included

### Global Coverage
- Supports **50,000+ locations** worldwide
- Multiple languages supported
- Good international coverage

### Restrictions
- Lookup limits per plan (e.g., Basic: 100 keyword lookups/24h, Premium: 500/24h)
- No public API -- must negotiate access
- Primarily designed as an end-user tool, not a data backend

### Verdict
**Not ideal for building a clone/SaaS**. Good tool for personal use, but the lack of public API and per-plan lookup limits make it unsuitable as a data backend. Better as a competitor reference.

---

## 5. Google Search Console API

### Cost
- **Completely free**

### Capabilities
- Queries (keywords) that drove impressions/clicks to your verified sites
- Clicks, impressions, CTR, average position per query
- Filter by country, device, page, date range, search type (web, image, video)
- Up to 16 months of historical data

### Data Quality
- **First-party Google data** -- highly accurate for what it covers
- Shows actual search queries people used to find YOUR site
- Privacy-filtered: very low-volume queries are hidden
- Data is sampled for large sites (potentially missing up to 66% of impression data)

### Global Coverage
- All countries and languages (wherever your site has search visibility)
- But only for keywords YOUR site ranks for

### Rate Limits
- 1,200 requests per minute per site per user
- 30,000,000 requests per day per project
- 50,000 rows per API response (pagination available)

### Restrictions
- **Only shows data for sites you own/verify** -- cannot research competitor keywords or arbitrary keywords
- 2-3 day data delay
- No search volume (only impressions for your own site)
- No keyword difficulty score
- No CPC data

### Verdict
**Excellent free supplement** but cannot be your primary data source. Use it for real performance data on your own properties. Cannot replace a keyword research API.

---

## 6. Clickstream Data Providers

### Background
After Jumpshot (owned by Avast) shut down in January 2020 due to privacy concerns, the clickstream landscape became fragmented. Most SEO tools now rely on Google Ads API data supplemented by smaller clickstream sources.

### Current Providers

#### Datos (datos.live)
- Global leader in multi-source anonymized clickstream data
- Desktop and mobile browsing behavior from millions of users
- **Enterprise pricing** -- not designed for small startups
- Used by DataForSEO as one of their clickstream sources
- Contact for pricing (typically $1,000+/month minimum)

#### SimilarWeb
- Major clickstream data provider (uses browser extensions, ISP partnerships)
- API plans start at **$199/month** (Starter) or **$1,500/year**
- Enterprise API pricing requires custom quote
- 100 free monthly credits on DigitalRank API
- Keyword search volume = 12-month average
- Good global coverage but expensive at scale

#### Permission.io
- Privacy-first clickstream data
- Consent-based data collection
- Enterprise pricing

#### MFour
- Combines survey + behavioral data
- App, web, and location data
- Enterprise pricing

### Practical Reality
For a startup/clone project, **you won't buy raw clickstream data directly**. Instead, use **DataForSEO's clickstream endpoints** which aggregate and process clickstream data at affordable pay-as-you-go rates ($0.0001/keyword).

### Verdict
Raw clickstream data is enterprise-tier ($1,000+/mo minimum). Use DataForSEO as your clickstream data intermediary instead.

---

## 7. Free / Open-Source Approaches

### Google Trends API (Official -- Alpha, launched July 2025)
- **Cost**: Free (currently in alpha)
- **Access**: Requires Google Cloud authentication; accepting alpha testers via application
- **Data**: Relative interest over time (0-100 scale), NOT absolute search volume
- **Coverage**: Global, all languages
- **Limitations**: Alpha with restricted quotas and limited endpoints; no absolute volume numbers
- **Useful for**: Trend comparison, seasonality detection, geographic interest

### PyTrends (Open Source -- github.com/GeneralMills/pytrends)
- **Cost**: Free (Python library)
- **Data**: Unofficial scraping of Google Trends
- **Features**: Interest over time, interest by region, related topics/queries, trending searches
- **Limitations**: Not maintained actively; subject to Google blocking/rate limiting; no absolute search volume
- **Risk**: Google can break it at any time by changing their endpoints

### Google Autocomplete / Suggest Scraping
- **Cost**: Free
- **Endpoint**: `http://suggestqueries.google.com/complete/search?output=firefox&q={keyword}&hl={lang}&gl={country}`
- **No API key needed** -- completely open
- **Data**: Suggested search completions (keyword ideas only, NO search volume)
- **Speed**: Can generate 20,000+ long-tail keywords in under 60 seconds
- **Parameters**: `hl` (language), `gl` (country), `q` (query)
- **Coverage**: All countries and languages Google supports
- **Limitations**: No volume data, no difficulty scores. Google may rate-limit aggressive scraping
- **Best use**: Generating keyword ideas/suggestions to then look up volumes via another API

### Google Keyword Surfer (Chrome Extension)
- **Cost**: Free browser extension
- **Data**: Search volume estimates shown directly in Google search results
- **No API access**

### Combine Free Sources Strategy
1. Use **Google Autocomplete** to generate keyword ideas (free, global)
2. Use **Google Trends** to understand relative popularity and trends (free)
3. Use **Google Search Console** for your own site's actual keyword performance (free)
4. Use **Keywords Everywhere** ($10/100K keywords) or **DataForSEO** ($0.0001/keyword) for actual search volumes
5. Calculate your own **keyword difficulty** from SERP data (scrape top 10 results, analyze DA/PA/backlinks)

### Verdict
No free source provides both search volume AND keyword difficulty. Free tools are best used for keyword discovery, then paired with a cheap paid API for volume/difficulty data.

---

## 8. Bing Webmaster Tools API

### Cost
- **Completely free** (just need a Bing Webmaster Tools account with a verified site)

### Capabilities

#### Site-Specific Data (like Google Search Console):
- Search query performance for your verified sites
- Impressions, clicks, position data
- Up to 6 months of historical data

#### General Keyword Research (GetKeywordStats -- works for ANY keyword):
- **Broad-match impressions** (weekly historical data)
- **Strict-match impressions** (weekly historical data)
- Related keywords and suggestions
- This works for **any keyword**, not just ones your site ranks for

### Data Quality
- Represents **Bing search** data only (~3-6% of global search market share)
- Can be used as a **proxy/multiplier** for Google volumes (multiply Bing volume by ~15-20x for rough Google estimate)
- More granular than Google Ads bucketed ranges
- Weekly granularity (vs. monthly for most other sources)

### Global Coverage
- Bing's global markets (strongest in US, UK, parts of Europe)
- Limited coverage in Asia, Africa, South America where Bing has minimal market share

### Rate Limits
- Not explicitly published but generally generous for normal use
- ~3 day data delay

### Restrictions
- Must have a verified site in Bing Webmaster Tools (even for the general keyword research)
- Data represents Bing search only, not Google
- 6-month data retention

### Verdict
**Excellent free supplement**, especially the GetKeywordStats endpoint which works for any keyword. Bing volumes can serve as a directional signal. However, Bing's small market share makes it unreliable as a primary data source, especially outside English-speaking markets.

---

## 9. Other Affordable APIs

### SpyFu API
- **Cost**: Professional plan at $79/month ($58/month annually), includes 10,000 data rows/month. Additional rows at $0.50/1,000 rows
- **Data**: Keyword search volume, difficulty, CPC, competition, historical data, competitor keywords
- **Coverage**: Primarily US-focused; limited international data
- **API**: Well-documented REST API (developer.spyfu.com)
- **Limitation**: 10K rows/month on base plan is very restrictive for building a tool

### Serpstat API
- **Cost**: Lite $69/mo, Standard $149/mo, Advanced $299/mo, Enterprise $499/mo
- **Free tier**: 10 requests/day
- **Data**: Search volume, keyword difficulty, CPC, SERP analysis, related keywords
- **Coverage**: Multiple countries and languages supported
- **Good for**: Mid-range alternative to SEMrush/Ahrefs

### Moz API
- **Cost**: Starter $49/mo, Standard $99/mo, Medium $179/mo, Large $299/mo
- **Free**: 30-day trial, limited free Keyword Explorer access
- **Data**: Search volume (ranges, not exact), keyword difficulty, Domain Authority, Page Authority
- **Coverage**: Primarily US; some international
- **Best for**: Domain/Page Authority metrics (DA/PA) rather than keyword volumes

### SE Ranking API
- **Cost**: Growth plan ~$119/mo (includes 100K API credits), API Standalone 24M credits/year
- **Data**: Monthly search volume with monthly breakdown, keyword difficulty, CPC, competition
- **Coverage**: Multi-country support
- **Limitation**: API access requires Business plan ($259+/mo) or Growth plan ($119+/mo)

### Ubersuggest (Neil Patel)
- **Cost**: Plans from $29/mo; lifetime deal available
- **NO API ACCESS** -- cannot integrate programmatically
- **Not suitable** for building a clone/tool

### Keyword Tool (keywordtool.io) API
- **Cost**: Not publicly listed (contact for pricing)
- **Data**: Keywords from Google, YouTube, Bing, Amazon, eBay, TikTok, etc. autocomplete
- **Volume**: Matches Google Keyword Planner numbers
- **Coverage**: Multiple platforms and countries

### SerpApi
- **Cost**: From $75/month (5,000 searches), pay-as-you-go available
- **Data**: SERP scraping including related searches, People Also Ask, featured snippets
- **Includes**: Google Trends API, Google Autocomplete API
- **No native search volume** -- you'd need to combine with another source

---

## Comparison Matrix

| Provider | Cost | Search Volume | Keyword Difficulty | Global Coverage | Best For |
|----------|------|--------------|-------------------|----------------|----------|
| **Google Ads API** | Free (needs ad spend) | Excellent (exact w/ spend) | No | 200+ countries | Authoritative volume data |
| **DataForSEO** | $0.0001/keyword | Very Good (refined) | Yes | 249 countries | Building SEO SaaS tools |
| **Keywords Everywhere** | $0.0001/keyword | Good | Limited | English mainly | Cheap English keyword data |
| **Mangools/KWFinder** | $29-130/mo | Good | Yes | 50K+ locations | Personal use, not API |
| **Google Search Console** | Free | No (impressions only) | No | Global (own sites) | Own site performance |
| **Clickstream (Datos etc.)** | $1,000+/mo | Excellent | No | Global | Enterprise only |
| **Google Trends** | Free | Relative only (0-100) | No | Global | Trend analysis |
| **Google Autocomplete** | Free | None | No | Global | Keyword idea generation |
| **Bing Webmaster Tools** | Free | Bing only | No | US/UK/EU mainly | Free Bing volume proxy |
| **SpyFu** | $58-79/mo | Good | Yes | US mainly | Competitor research |
| **Serpstat** | $69-499/mo | Good | Yes | Multi-country | Mid-range SEO tool |
| **Moz** | $49-299/mo | Ranges only | Yes | US mainly | DA/PA metrics |
| **SE Ranking** | $119-259/mo | Good | Yes | Multi-country | All-in-one SEO |

---

## Recommended Strategy for a Semrush Clone

### Tier 1: Primary Data Source
**DataForSEO API** -- Best bang for the buck
- $50 minimum deposit, pay-as-you-go
- Use **Keywords Data API** for search volume (~$0.0001/keyword)
- Use **DataForSEO Labs** for keyword difficulty (~$0.02/request for up to 700 keywords)
- Use **Bulk Keyword Difficulty** for scaled KD lookups (~$0.0001/keyword)
- Optionally add clickstream data for refined volumes
- Full global coverage (249 countries, all languages)

### Tier 2: Free Supplements
- **Google Autocomplete scraping** for keyword idea generation (free, global, no API key)
- **Google Trends** for trend data and seasonality (free)
- **Google Search Console** for authenticated users' own site data (free)
- **Bing Webmaster Tools** for free directional volume data

### Tier 3: Optional Enhancements
- **Keywords Everywhere** for ultra-cheap English volume lookups ($10/100K)
- **Google Ads API** if you/your users have active Google Ads accounts (free, most authoritative)

### Estimated Costs for 1M Keywords/Month
| Source | Cost |
|--------|------|
| DataForSEO Search Volume (1M keywords) | ~$100-110 |
| DataForSEO Keyword Difficulty (1M keywords) | ~$100-110 |
| Google Autocomplete (keyword ideas) | Free |
| Google Trends (trend data) | Free |
| **Total** | **~$200-220/month** |

Compare this to SEMrush ($499/mo for Guru plan with API) or Ahrefs ($449/mo for Advanced plan).

---

## Sources

- [Google Ads API Keyword Planning Documentation](https://developers.google.com/google-ads/api/docs/keyword-planning/overview)
- [Google Ads API Access Levels](https://developers.google.com/google-ads/api/docs/api-policy/access-levels)
- [Google Ads API Rate Limits](https://developers.google.com/google-ads/api/docs/best-practices/quotas)
- [DataForSEO Pricing](https://dataforseo.com/pricing)
- [DataForSEO Keywords Data API Pricing](https://dataforseo.com/pricing/keywords-data)
- [DataForSEO Labs API](https://dataforseo.com/apis/dataforseo-labs-api)
- [DataForSEO Search Volume](https://dataforseo.com/update/dataforseo-search-volume-api)
- [DataForSEO Clickstream Data](https://dataforseo.com/apis/clickstream-data-api)
- [Keywords Everywhere Pricing](https://keywordseverywhere.com/credits.html)
- [Keywords Everywhere API Documentation](https://api.keywordseverywhere.com/docs/)
- [Keywords Everywhere FAQ](https://keywordseverywhere.com/frequently-asked-questions.html)
- [Mangools API Access](https://mangools.com/api)
- [Mangools Pricing](https://mangools.com/plans-and-pricing)
- [Google Search Console API Pricing (Free)](https://developers.google.com/webmaster-tools/pricing)
- [Google Search Console API Limits](https://developers.google.com/webmaster-tools/limits)
- [Google Trends API Alpha Announcement (July 2025)](https://developers.google.com/search/blog/2025/07/trends-api)
- [PyTrends GitHub](https://github.com/GeneralMills/pytrends)
- [Bing Webmaster API](https://learn.microsoft.com/en-us/bingwebmaster/)
- [Bing Webmaster GetKeywordStats](https://bing-webmaster-api.analyticsedge.com/getkeywordstats/)
- [SpyFu API Documentation](https://developer.spyfu.com/)
- [SpyFu API Pricing](https://developer.spyfu.com/docs/api-pricing)
- [Serpstat Keyword Volume API](https://serpstat.com/page/keyword-search-volume-api/)
- [SE Ranking API Documentation](https://seranking.com/api/how-to-get-api/)
- [Datos Clickstream Data](https://datos.live/)
- [Clickstream Providers on Datarade](https://datarade.ai/data-categories/clickstream-data/providers)
- [Jumpshot Alternatives](https://sandboxseo.com/jumpshot-clickstream-alternatives/)
- [DataForSEO Review: Real Cost vs Subscription Tools](https://nextgrowth.ai/dataforseo-review/)
- [Best Keyword Research APIs 2025](https://coefficient.io/keyword-research-apis)
