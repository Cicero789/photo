-- Migration 001: Add columns/tables added after initial D1 schema
-- Run: wrangler d1 execute photo-db --remote --file=./db/migrations/001_add_new_columns.sql
-- Safe to re-run — uses ALTER TABLE for columns and IF NOT EXISTS for new tables.

-- Events
ALTER TABLE events ADD COLUMN latitude REAL;
ALTER TABLE events ADD COLUMN longitude REAL;
ALTER TABLE events ADD COLUMN public INTEGER DEFAULT 1;
ALTER TABLE events ADD COLUMN payment_model TEXT DEFAULT 'prepaid';

-- Photos
ALTER TABLE photos ADD COLUMN favorite INTEGER DEFAULT 0;

-- Photographers
ALTER TABLE photographers ADD COLUMN hero_photos TEXT DEFAULT '[]';
ALTER TABLE photographers ADD COLUMN stripe_config TEXT DEFAULT '{}';
ALTER TABLE photographers ADD COLUMN pricing_config TEXT DEFAULT '{}';
ALTER TABLE photographers ADD COLUMN gallery_config TEXT DEFAULT '{}';

-- Connections
ALTER TABLE connections ADD COLUMN magic_token TEXT;

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
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','fulfilled','refunded','failed')),
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

-- Activity Log (notifications)
CREATE TABLE IF NOT EXISTS activity_log (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  type       TEXT NOT NULL,
  message    TEXT NOT NULL,
  link       TEXT,
  read       INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_act_user ON activity_log(user_id, read);

-- Inspiration Map
CREATE TABLE IF NOT EXISTS inspiration (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  photo_url  TEXT NOT NULL,
  address    TEXT NOT NULL,
  latitude   REAL NOT NULL,
  longitude  REAL NOT NULL,
  category   TEXT DEFAULT 'general',
  season     TEXT DEFAULT '',
  loves      INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS inspiration_loves (
  inspiration_id TEXT NOT NULL,
  user_id        TEXT NOT NULL,
  PRIMARY KEY (inspiration_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_insp_loc ON inspiration(latitude, longitude);
