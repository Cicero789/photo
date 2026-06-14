-- Migration 003: Pro features — license, location tips
-- Run ONCE: wrangler d1 execute photo-db --remote --file=./db/migrations/003_pro_features.sql
ALTER TABLE photos ADD COLUMN license TEXT NOT NULL DEFAULT 'personal';
ALTER TABLE inspiration ADD COLUMN tips TEXT DEFAULT '';
ALTER TABLE inspiration ADD COLUMN best_time TEXT DEFAULT '';
ALTER TABLE inspiration ADD COLUMN permission_info TEXT DEFAULT '';
