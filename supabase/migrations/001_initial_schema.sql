-- Keyword Metrics Cache (search volume, CPC, competition from Google Ads API)
CREATE TABLE keyword_metrics (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  keyword       TEXT NOT NULL,
  country_code  TEXT NOT NULL,
  language_code TEXT NOT NULL,
  avg_monthly_searches  BIGINT,
  competition           TEXT,
  competition_index     INTEGER,
  cpc_low_micros        BIGINT,
  cpc_high_micros       BIGINT,
  monthly_volumes       JSONB,
  fetched_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_keyword_metrics UNIQUE (keyword, country_code, language_code)
);

CREATE INDEX idx_keyword_metrics_lookup
  ON keyword_metrics (keyword, country_code, language_code);

CREATE INDEX idx_keyword_metrics_fetched
  ON keyword_metrics (fetched_at);

-- Keyword Difficulty Cache (from DataForSEO)
CREATE TABLE keyword_difficulty (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  keyword       TEXT NOT NULL,
  country_code  TEXT NOT NULL,
  language_code TEXT NOT NULL,
  difficulty    INTEGER NOT NULL,
  fetched_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_keyword_difficulty UNIQUE (keyword, country_code, language_code)
);

CREATE INDEX idx_keyword_difficulty_lookup
  ON keyword_difficulty (keyword, country_code, language_code);

CREATE INDEX idx_keyword_difficulty_fetched
  ON keyword_difficulty (fetched_at);

-- Keyword Suggestions Cache (from Google Autocomplete)
CREATE TABLE keyword_suggestions (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  seed_keyword  TEXT NOT NULL,
  country_code  TEXT NOT NULL,
  language_code TEXT NOT NULL,
  suggestions   JSONB NOT NULL,
  fetched_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_keyword_suggestions UNIQUE (seed_keyword, country_code, language_code)
);

CREATE INDEX idx_keyword_suggestions_lookup
  ON keyword_suggestions (seed_keyword, country_code, language_code);

-- Cleanup function for stale cache entries
CREATE OR REPLACE FUNCTION cleanup_stale_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM keyword_metrics WHERE fetched_at < NOW() - INTERVAL '30 days';
  DELETE FROM keyword_difficulty WHERE fetched_at < NOW() - INTERVAL '7 days';
  DELETE FROM keyword_suggestions WHERE fetched_at < NOW() - INTERVAL '14 days';
END;
$$ LANGUAGE plpgsql;
