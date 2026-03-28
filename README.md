# SEOLens

SEO キーワードリサーチ・分析ツール。20 カ国・14 言語に対応し、検索ボリューム、キーワード難易度、CPC、競合性などのデータを取得できます。

公開URL: [seolens.dev](https://seolens.dev)

## 主な機能

- **キーワードリサーチ** - 検索ボリューム、CPC、競合性、キーワード難易度スコアを取得
- **複数キーワード一括分析** - 1 回のクエリで複数キーワードをまとめて分析
- **関連キーワード提案** - シードキーワードから関連キーワードを取得
- **20 カ国対応** - US, JP, GB, DE, FR, CA, AU, BR, IN, KR, MX, ES, IT, NL, SE, TW, TH, VN, ID, PH
- **14 言語対応** - 英語, 日本語, ドイツ語, フランス語, スペイン語, ポルトガル語, イタリア語, オランダ語, 韓国語, 中国語, タイ語, ベトナム語, インドネシア語, スウェーデン語
- **REST API** - API キー認証によるプログラマティックアクセス
- **ダッシュボード** - API キーの管理と利用状況の確認
- **多言語 UI** - 英語・日本語・韓国語・中国語・スペイン語に対応

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **UI**: React 19, Tailwind CSS 4
- **データベース & 認証**: Supabase
- **データソース**: Google Ads API（メイン）, DataForSEO（フォールバック）
- **国際化**: next-intl
- **テスト**: Playwright (E2E)

## セットアップ

### 前提条件

- Node.js 18+
- npm / yarn / pnpm

### インストール

```bash
git clone https://github.com/yuppppppppppqi/seolens.git
cd seolens
npm install
```

### 環境変数

`.env.local` ファイルを作成し、以下の変数を設定してください:

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

# DataForSEO（フォールバック）
DATAFORSEO_LOGIN=
DATAFORSEO_PASSWORD=
```

### 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

## プロジェクト構成

```
src/
├── app/
│   ├── [locale]/          # ロケール別ページ
│   │   ├── tool/          # キーワードリサーチツール
│   │   ├── dashboard/     # API キー管理
│   │   ├── blog/          # ブログ
│   │   ├── docs/          # ドキュメント
│   │   ├── pricing/       # 料金プラン
│   │   └── login/         # 認証
│   └── api/
│       ├── v1/research/   # 公開 API（認証必須）
│       ├── v1/keys/       # API キー管理
│       ├── search/        # 内部検索
│       ├── keywords/      # キーワードメトリクス一括取得
│       ├── suggestions/   # キーワード提案
│       └── difficulty/    # キーワード難易度
├── components/            # React コンポーネント
├── lib/                   # ユーティリティ & API クライアント
├── i18n/                  # 国際化設定
├── messages/              # 翻訳ファイル (JSON)
├── content/               # ブログコンテンツ
└── types/                 # TypeScript 型定義
```

## API

### 公開 API

```
POST /api/v1/research
Authorization: Bearer <API_KEY>
```

リクエストボディ:

```json
{
  "keywords": ["seo tools", "keyword research"],
  "country": "US",
  "language": "en"
}
```

### 内部エンドポイント

| エンドポイント | メソッド | 説明 |
|---|---|---|
| `/api/search` | POST | キーワード検索 |
| `/api/keywords` | POST | キーワードメトリクス一括取得 |
| `/api/suggestions` | POST | キーワード提案 |
| `/api/difficulty` | POST | キーワード難易度スコア |
| `/api/v1/keys` | GET/POST | API キー管理 |

## スクリプト

```bash
npm run dev            # 開発サーバー起動
npm run build          # プロダクションビルド
npm start              # プロダクションサーバー起動
npm run lint           # ESLint 実行
npm run test:e2e       # E2E テスト実行
npm run test:e2e:smoke # スモークテスト実行
```

## ライセンス

Private
