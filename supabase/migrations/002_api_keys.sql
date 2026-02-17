-- API Keys table
CREATE TABLE api_keys (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key_hash      TEXT NOT NULL UNIQUE,
  key_prefix    TEXT NOT NULL,
  name          TEXT NOT NULL DEFAULT '',
  daily_limit   INTEGER NOT NULL DEFAULT 100,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at  TIMESTAMPTZ
);

CREATE INDEX idx_api_keys_hash ON api_keys (key_hash);
CREATE INDEX idx_api_keys_user ON api_keys (user_id);

-- API usage tracking (daily rate limiting)
CREATE TABLE api_usage (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  api_key_id    BIGINT NOT NULL REFERENCES api_keys(id) ON DELETE CASCADE,
  date          DATE NOT NULL DEFAULT CURRENT_DATE,
  request_count INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT uq_api_usage_key_date UNIQUE (api_key_id, date)
);

CREATE INDEX idx_api_usage_lookup ON api_usage (api_key_id, date);

-- Atomic increment for rate limiting
CREATE OR REPLACE FUNCTION increment_api_usage(p_key_id BIGINT, p_date DATE)
RETURNS INTEGER AS $$
  INSERT INTO api_usage (api_key_id, date, request_count)
  VALUES (p_key_id, p_date, 1)
  ON CONFLICT (api_key_id, date)
  DO UPDATE SET request_count = api_usage.request_count + 1
  RETURNING request_count;
$$ LANGUAGE sql;

-- Cleanup old usage data (keep 90 days)
CREATE OR REPLACE FUNCTION cleanup_stale_usage()
RETURNS void AS $$
BEGIN
  DELETE FROM api_usage WHERE date < CURRENT_DATE - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;
