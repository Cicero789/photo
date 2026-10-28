-- Additive migration: existing sites, albums and auth are unchanged.
CREATE TABLE IF NOT EXISTS studio_settings (id INTEGER PRIMARY KEY CHECK (id = 1), content TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS studio_photos (
  id TEXT PRIMARY KEY, storage_key TEXT NOT NULL UNIQUE, title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '', category TEXT NOT NULL DEFAULT 'Portraits',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS studio_requests (
  id TEXT PRIMARY KEY, kind TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL,
  message TEXT NOT NULL, album_id TEXT, owner_id TEXT, items TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS studio_requests_owner ON studio_requests(owner_id, created_at);
