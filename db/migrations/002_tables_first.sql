-- Part A: idempotent table creation. Safe to run and re-run.
-- Every statement uses IF NOT EXISTS.
-- Run: wrangler d1 execute photo-db --remote --file=./db/migrations/002_tables_first.sql

CREATE TABLE IF NOT EXISTS orders (
  id              TEXT PRIMARY KEY,
  buyer_user_id   TEXT NOT NULL,
  photographer_id TEXT NOT NULL,
  photo_id        TEXT,
  event_id        TEXT,
  product         TEXT NOT NULL,
  amount_cents    INTEGER NOT NULL,
  stripe_id       TEXT,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','paid','fulfilled','refunded','failed')),
  created_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_orders_stripe ON orders(stripe_id);

CREATE TABLE IF NOT EXISTS event_messages (
  id         TEXT PRIMARY KEY,
  event_id   TEXT NOT NULL,
  user_id    TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_msg_event ON event_messages(event_id);

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
