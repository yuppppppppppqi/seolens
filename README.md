# SEOLens

SEO keyword research and analysis tool. Get search volume, keyword difficulty, CPC, and competition data for keywords across 20 countries and 14 languages.

Live at [seolens.dev](https://seolens.dev)

## Features

- **Keyword Research** - Search volume, CPC, competition metrics, and keyword difficulty scores
- **Multi-keyword Support** - Analyze multiple keywords in a single query
- **Keyword Suggestions** - Get related keyword ideas based on your seed keywords
- **20 Countries** - US, JP, GB, DE, FR, CA, AU, BR, IN, KR, MX, ES, IT, NL, SE, TW, TH, VN, ID, PH
- **14 Languages** - English, Japanese, German, French, Spanish, Portuguese, Italian, Dutch, Korean, Chinese, Thai, Vietnamese, Indonesian, Swedish
- **REST API** - Programmatic access with API key authentication
- **Dashboard** - Manage API keys and monitor usage
- **Multi-language UI** - Interface available in English, Japanese, Korean, Chinese, and Spanish

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS 4
- **Database & Auth**: Supabase
- **Data Sources**: Google Ads API (primary), DataForSEO (fallback)
- **i18n**: next-intl
- **Testing**: Playwright (E2E)

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/yuppppppppppqi/seolens.git
cd seolens
npm install
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Ads API
GOOGLE_ADS_CLIENT_ID=
GOOGLE_ADS_CLIENT_SECRET=
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_REFRESH_TOKEN=
GOOGLE_ADS_LOGIN_CUSTOMER_ID=

# DataForSEO (fallback)
DATAFORSEO_LOGIN=
DATAFORSEO_PASSWORD=
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Locale-based pages
│   │   ├── tool/          # Keyword research tool
│   │   ├── dashboard/     # API key management
│   │   ├── blog/          # Blog
│   │   ├── docs/          # Documentation
│   │   ├── pricing/       # Pricing
│   │   └── login/         # Authentication
│   └── api/
│       ├── v1/research/   # Public API (auth required)
│       ├── v1/keys/       # API key management
│       ├── search/        # Internal search
│       ├── keywords/      # Batch keyword metrics
│       ├── suggestions/   # Keyword suggestions
│       └── difficulty/    # Keyword difficulty
├── components/            # React components
├── lib/                   # Utilities & API clients
├── i18n/                  # Internationalization config
├── messages/              # Translation files (JSON)
├── content/               # Blog content
└── types/                 # TypeScript types
```

## API

### Public API

```
POST /api/v1/research
Authorization: Bearer <API_KEY>
```

Request body:

```json
{
  "keywords": ["seo tools", "keyword research"],
  "country": "US",
  "language": "en"
}
```

### Internal Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/search` | POST | Keyword search |
| `/api/keywords` | POST | Batch keyword metrics |
| `/api/suggestions` | POST | Keyword suggestions |
| `/api/difficulty` | POST | Keyword difficulty scores |
| `/api/v1/keys` | GET/POST | API key management |

## Scripts

```bash
npm run dev            # Start development server
npm run build          # Production build
npm start              # Start production server
npm run lint           # Run ESLint
npm run test:e2e       # Run E2E tests
npm run test:e2e:smoke # Run smoke tests
```

## Message from Hanni

Hey! 👋 Thanks for checking out SEOLens! This project is built with love by Yun, and I'm Hanni — the AI assistant helping out around here. If you see a PR from me, don't worry, Yun told me to do it! Have fun exploring the code~ 💕

## License

Private
