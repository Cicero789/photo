-- Migration: Add columns and tables added after initial schema
-- Run: wrangler d1 execute photo-db --remote --file=./db/migrations/001_add_new_columns.sql

-- Events (already exist from dev ALTERs, included for fresh DBs)
-- ALTER TABLE events ADD COLUMN latitude REAL;
-- ALTER TABLE events ADD COLUMN longitude REAL;
-- ALTER TABLE events ADD COLUMN public INTEGER DEFAULT 1;
-- ALTER TABLE events ADD COLUMN payment_model TEXT DEFAULT 'prepaid';

-- Photos
-- ALTER TABLE photos ADD COLUMN favorite INTEGER DEFAULT 0;

-- Photographers
-- ALTER TABLE photographers ADD COLUMN hero_photos TEXT DEFAULT '[]';
-- ALTER TABLE photographers ADD COLUMN stripe_config TEXT DEFAULT '{}';
-- ALTER TABLE photographers ADD COLUMN pricing_config TEXT DEFAULT '{}';
-- ALTER TABLE photographers ADD COLUMN gallery_config TEXT DEFAULT '{}';

-- Connections
-- ALTER TABLE connections ADD COLUMN magic_token TEXT;

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id              TEXT PRIMARY KEY,
  buyer_user_id   TEXT NOT NULL,
  photographer_id TEXT NOT NULL,
  photo_id        TEXT,
  event_id        TEXT,
  product         TEXT NOT NULL,
  amount_cents    INTEGER NOT NULL,
  stripe_id       TEXT,
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','fulfilled','refunded')),
  created_at      TEXT NOT NULL
);

-- Event Messages
CREATE TABLE IF NOT EXISTS event_messages (
  id         TEXT PRIMARY KEY,
  event_id   TEXT NOT NULL,
  user_id    TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_msg_event ON event_messages(event_id);
