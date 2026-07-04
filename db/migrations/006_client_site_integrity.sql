-- Migration 006: client-site soft-delete integrity + media lookup indexes
-- Run: npx wrangler d1 execute photo-db --remote --file=./db/migrations/006_client_site_integrity.sql
--
-- WHY: functions/api/clients/[id].ts and clients/public/[slug].ts query
-- client_gallery_photos.deleted_at, but no migration ever added that column.
-- Editing schema.sql does NOT alter tables that already exist (CREATE TABLE
-- IF NOT EXISTS is a no-op for them), so the live DB needs this ALTER.
--
-- NOTE: "ALTER TABLE ... ADD COLUMN" fails if the column already exists.
-- BEFORE running, check the live DB and delete any ALTER line whose column
-- is already present:
--   npx wrangler d1 execute photo-db --remote --command="PRAGMA table_info(client_gallery_photos)"
--   npx wrangler d1 execute photo-db --remote --command="PRAGMA table_info(client_sites)"
--   npx wrangler d1 execute photo-db --remote --command="PRAGMA table_info(blog_posts)"
--   npx wrangler d1 execute photo-db --remote --command="PRAGMA table_info(client_galleries)"
-- Back up first: npm run db:backup

ALTER TABLE client_gallery_photos ADD COLUMN deleted_at TEXT;
-- Uncomment any of these that the PRAGMA checks show as missing:
-- ALTER TABLE client_sites     ADD COLUMN deleted_at TEXT;
-- ALTER TABLE blog_posts       ADD COLUMN deleted_at TEXT;
-- ALTER TABLE client_galleries ADD COLUMN deleted_at TEXT;

-- Media serving (/api/media/*) looks up storage keys on EVERY image/video
-- request; none of these columns were indexed:
CREATE INDEX IF NOT EXISTS idx_photos_storage_key    ON photos(storage_key);
CREATE INDEX IF NOT EXISTS idx_videos_storage_key    ON videos(storage_key);
CREATE INDEX IF NOT EXISTS idx_portfolio_storage_key ON photographer_portfolio(storage_key);
CREATE INDEX IF NOT EXISTS idx_cgp_storage_key       ON client_gallery_photos(storage_key);
CREATE INDEX IF NOT EXISTS idx_album_photos_key      ON album_photos(storage_key);

-- Magic-link login scans connections by token hash:
CREATE INDEX IF NOT EXISTS idx_connections_magic     ON connections(magic_token);

INSERT INTO _migrations (name) VALUES ('006_client_site_integrity');
