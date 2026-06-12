-- Photo App: D1 Database Schema
-- Run: wrangler d1 execute photo-db --local --file=./db/schema.sql

-- ─── Users ───
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('platform_owner', 'page_admin', 'staff', 'viewer')),
  space_id    TEXT NOT NULL,
  avatar_url  TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_space_id ON users(space_id);

-- ─── Spaces (family or business sites) ───
CREATE TABLE IF NOT EXISTS spaces (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,  -- "gate key" for viewers
  custom_domain TEXT UNIQUE,
  logo_url      TEXT,
  theme_color   TEXT DEFAULT '#3b82f6',
  owner_id      TEXT NOT NULL REFERENCES users(id),
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_spaces_slug ON spaces(slug);
CREATE INDEX idx_spaces_owner ON spaces(owner_id);

-- ─── Events ───
CREATE TABLE IF NOT EXISTS events (
  id            TEXT PRIMARY KEY,
  space_id      TEXT NOT NULL REFERENCES spaces(id),
  title         TEXT NOT NULL,
  category      TEXT NOT NULL CHECK (category IN (
                  'holiday', 'birthday', 'graduation', 'wedding', 'celebration',
                  'sports', 'school', 'travel', 'vacation', 'work', 'restaurant',
                  'party', 'family', 'kids', 'parents', 'other'
                )),
  event_date    TEXT NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  ai_summary    TEXT,
  cover_photo_id TEXT,
  address       TEXT NOT NULL DEFAULT '',
  address_locked INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_events_space_id ON events(space_id);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_event_date ON events(event_date);

-- ─── Photos ───
CREATE TABLE IF NOT EXISTS photos (
  id                TEXT PRIMARY KEY,
  event_id          TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  space_id          TEXT NOT NULL REFERENCES spaces(id),
  original_filename TEXT NOT NULL,
  storage_key       TEXT NOT NULL,
  thumbnail_key     TEXT,
  width             INTEGER NOT NULL,
  height            INTEGER NOT NULL,
  file_size         INTEGER NOT NULL,
  latitude          REAL,
  longitude         REAL,
  taken_at          TEXT,
  uploaded_by       TEXT NOT NULL REFERENCES users(id),
  created_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_photos_event_id ON photos(event_id);
CREATE INDEX idx_photos_space_id ON photos(space_id);

-- ─── Videos ───
CREATE TABLE IF NOT EXISTS videos (
  id                TEXT PRIMARY KEY,
  event_id          TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  space_id          TEXT NOT NULL REFERENCES spaces(id),
  original_filename TEXT NOT NULL,
  storage_key       TEXT NOT NULL,
  thumbnail_key     TEXT,
  duration          INTEGER NOT NULL,  -- seconds
  file_size         INTEGER NOT NULL,
  uploaded_by       TEXT NOT NULL REFERENCES users(id),
  created_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_videos_event_id ON videos(event_id);
CREATE INDEX idx_videos_space_id ON videos(space_id);

-- ─── Ad Tiles (platform owner messages) ───
CREATE TABLE IF NOT EXISTS ad_tiles (
  id         TEXT PRIMARY KEY,
  image_url  TEXT,
  link_url   TEXT,
  message    TEXT,
  position   INTEGER NOT NULL,
  active     INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Photographers ───
CREATE TABLE IF NOT EXISTS photographers (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  website       TEXT,
  portfolio_url TEXT,
  service_area  TEXT,
  bio           TEXT,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Space Members (for staff/family roles) ───
CREATE TABLE IF NOT EXISTS space_members (
  id       TEXT PRIMARY KEY,
  space_id TEXT NOT NULL REFERENCES spaces(id),
  user_id  TEXT NOT NULL REFERENCES users(id),
  role     TEXT NOT NULL CHECK (role IN ('page_admin', 'staff', 'viewer')),
  UNIQUE(space_id, user_id)
);

CREATE INDEX idx_space_members_space ON space_members(space_id);
CREATE INDEX idx_space_members_user ON space_members(user_id);

-- ─── Community Connections ───
CREATE TABLE IF NOT EXISTS connections (
  id              TEXT PRIMARY KEY,
  from_user       TEXT NOT NULL,
  to_email        TEXT NOT NULL,
  to_user         TEXT,
  connection_type TEXT NOT NULL CHECK (connection_type IN ('family', 'friend')),
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message         TEXT DEFAULT '',
  magic_token     TEXT,
  created_at      TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_conn_from ON connections(from_user);
CREATE INDEX IF NOT EXISTS idx_conn_to_email ON connections(to_email);
CREATE INDEX IF NOT EXISTS idx_conn_to_user ON connections(to_user);

-- ─── Password Resets ───
CREATE TABLE IF NOT EXISTS password_resets (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL,
  token      TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_password_resets_token ON password_resets(token);

-- ─── Rate Limiting ───
CREATE TABLE IF NOT EXISTS rate_limits (
  id        TEXT PRIMARY KEY,
  ip        TEXT NOT NULL,
  endpoint  TEXT NOT NULL,
  timestamp INTEGER NOT NULL
);

CREATE INDEX idx_rate_limits_ip_ep ON rate_limits(ip, endpoint);
CREATE INDEX idx_rate_limits_ts ON rate_limits(timestamp);
