-- ============================================================
-- Leads table migration — run in Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS leads (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL DEFAULT '',
  phone      TEXT NOT NULL DEFAULT '',
  email      TEXT NOT NULL DEFAULT '',
  source     TEXT NOT NULL DEFAULT 'website',
  message    TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: nobody reads/writes directly from browser (all via service role in API routes)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Indexes for fast admin queries
CREATE INDEX IF NOT EXISTS leads_created_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_source_idx  ON leads (source);
