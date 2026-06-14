-- Migration 004: Add visibility column + backfill from legacy public boolean
-- Run ONCE: wrangler d1 execute photo-db --remote --file=./db/migrations/004_event_visibility.sql
ALTER TABLE events ADD COLUMN visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('private','gate','public'));
UPDATE events SET visibility = CASE WHEN public = 1 THEN 'public' ELSE 'private' END;
CREATE INDEX IF NOT EXISTS idx_events_space_vis_date ON events(space_id, visibility, event_date);
