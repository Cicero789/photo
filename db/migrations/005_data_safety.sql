-- Migration 005: Data safety improvements
-- Adds soft-delete columns, UNIQUE review constraint, migration tracking

-- Soft-delete support (recovery window before permanent deletion)
ALTER TABLE photos ADD COLUMN deleted_at TEXT;
ALTER TABLE events ADD COLUMN deleted_at TEXT;
ALTER TABLE videos ADD COLUMN deleted_at TEXT;
ALTER TABLE albums ADD COLUMN deleted_at TEXT;

-- Prevent duplicate reviews (closes race condition)
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_unique ON reviews(photographer_id, reviewer_id);

-- Migration tracking table
CREATE TABLE IF NOT EXISTS _migrations (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL UNIQUE,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Record this migration
INSERT OR IGNORE INTO _migrations (name) VALUES ('005_data_safety');
