-- =============================================================================
-- FrameNest v2 — Canonical Database Schema
-- All table/column names are clean, consistent, and self-documenting.
-- =============================================================================

-- ── Users & Authentication ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('platform_owner','page_admin','staff','viewer')),
  space_id TEXT NOT NULL,
  avatar_url TEXT,
  account_type TEXT NOT NULL DEFAULT 'personal',
  token_version INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_space_id ON users(space_id);

CREATE TABLE IF NOT EXISTS password_resets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);

-- ── Spaces ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS spaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  custom_domain TEXT UNIQUE,
  logo_url TEXT,
  theme_color TEXT NOT NULL DEFAULT '#3b82f6',
  owner_id TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  hero_enabled INTEGER NOT NULL DEFAULT 0,
  hero_source TEXT NOT NULL DEFAULT 'off',
  hero_style TEXT NOT NULL DEFAULT 'banner'
);
CREATE INDEX IF NOT EXISTS idx_spaces_slug ON spaces(slug);
CREATE INDEX IF NOT EXISTS idx_spaces_owner ON spaces(owner_id);

CREATE TABLE IF NOT EXISTS space_members (
  id TEXT PRIMARY KEY,
  space_id TEXT NOT NULL REFERENCES spaces(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  role TEXT NOT NULL CHECK(role IN ('page_admin','staff','viewer')),
  UNIQUE(space_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_space_members_space ON space_members(space_id);
CREATE INDEX IF NOT EXISTS idx_space_members_user ON space_members(user_id);

-- ── Events ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  space_id TEXT NOT NULL REFERENCES spaces(id),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  event_date TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  ai_summary TEXT,
  cover_photo_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  address TEXT DEFAULT '',
  address_locked INTEGER NOT NULL DEFAULT 0,
  latitude REAL,
  longitude REAL,
  payment_model TEXT NOT NULL DEFAULT 'prepaid' CHECK(payment_model IN ('prepaid','unlock')),
  visibility TEXT NOT NULL DEFAULT 'private' CHECK(visibility IN ('private','gate','public')),
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_events_space_id ON events(space_id);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_space_vis_date ON events(space_id, visibility, event_date);

-- ── Photos ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS photos (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  space_id TEXT NOT NULL REFERENCES spaces(id),
  original_filename TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  thumbnail_key TEXT,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  file_size INTEGER NOT NULL,
  latitude REAL,
  longitude REAL,
  taken_at TEXT,
  uploaded_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  favorite INTEGER NOT NULL DEFAULT 0,
  license TEXT NOT NULL DEFAULT 'personal',
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_photos_event_id ON photos(event_id);
CREATE INDEX IF NOT EXISTS idx_photos_space_id ON photos(space_id);
CREATE INDEX IF NOT EXISTS idx_photos_storage_key ON photos(storage_key);

-- ── Videos ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  space_id TEXT NOT NULL REFERENCES spaces(id),
  original_filename TEXT NOT NULL,
  storage_key TEXT NOT NULL,
  thumbnail_key TEXT,
  duration INTEGER NOT NULL,
  file_size INTEGER NOT NULL,
  uploaded_by TEXT NOT NULL REFERENCES users(id),
  stream_id TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_videos_event_id ON videos(event_id);
CREATE INDEX IF NOT EXISTS idx_videos_space_id ON videos(space_id);
CREATE INDEX IF NOT EXISTS idx_videos_storage_key ON videos(storage_key);

-- ── Event Messages ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS event_messages (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_msg_event ON event_messages(event_id);

-- ── Professionals (was "photographers" in v1) ──────────────────────────────

CREATE TABLE IF NOT EXISTS professionals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  website TEXT,
  portfolio_url TEXT,
  service_area TEXT,
  bio TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected')),
  hero_photos TEXT NOT NULL DEFAULT '[]',
  stripe_config TEXT NOT NULL DEFAULT '{}',
  pricing_config TEXT NOT NULL DEFAULT '{}',
  template_config TEXT NOT NULL DEFAULT '{}',   -- was gallery_config
  slug TEXT UNIQUE,
  specialties TEXT DEFAULT '',
  tagline TEXT DEFAULT '',
  verified INTEGER NOT NULL DEFAULT 0,
  verified_at TEXT,
  subscription_id TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'none',
  profile_views INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_professionals_slug ON professionals(slug);
CREATE INDEX IF NOT EXISTS idx_professionals_status ON professionals(status);

CREATE TABLE IF NOT EXISTS professional_portfolio (
  id TEXT PRIMARY KEY,
  professional_id TEXT NOT NULL REFERENCES professionals(id),
  storage_key TEXT NOT NULL,
  filename TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_professional_portfolio ON professional_portfolio(professional_id);

-- ── Reviews ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  professional_id TEXT NOT NULL REFERENCES professionals(id),
  reviewer_id TEXT NOT NULL REFERENCES users(id),
  rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  comment TEXT DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_reviews_professional ON reviews(professional_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_unique ON reviews(professional_id, reviewer_id);

-- ── Booking Inquiries ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS booking_inquiries (
  id TEXT PRIMARY KEY,
  professional_id TEXT REFERENCES professionals(id),
  client_user_id TEXT NOT NULL REFERENCES users(id),
  message TEXT NOT NULL,
  event_title TEXT DEFAULT '',
  location_name TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','approved','rejected','completed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_booking_inquiries_professional ON booking_inquiries(professional_id);

-- ── Albums ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS albums (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  share_token TEXT NOT NULL UNIQUE,
  password TEXT,
  allow_downloads INTEGER NOT NULL DEFAULT 1,   -- was downloads
  expires_at TEXT,
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_albums_user ON albums(user_id);
CREATE INDEX IF NOT EXISTS idx_albums_share_token ON albums(share_token);

CREATE TABLE IF NOT EXISTS album_photos (
  album_id TEXT NOT NULL REFERENCES albums(id),
  storage_key TEXT NOT NULL,
  filename TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (album_id, storage_key)
);

-- ── Inspiration Map ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS inspiration (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  photo_url TEXT,
  thumbnail_url TEXT DEFAULT '',
  address TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  season TEXT DEFAULT '',
  tips TEXT DEFAULT '',
  best_time TEXT DEFAULT '',
  permission_info TEXT DEFAULT '',
  love_count INTEGER NOT NULL DEFAULT 0,         -- was loves
  source TEXT NOT NULL DEFAULT 'framenest',
  score REAL NOT NULL DEFAULT 100,
  author TEXT DEFAULT '',
  license_url TEXT DEFAULT '',
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_inspiration_loc ON inspiration(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_inspiration_category ON inspiration(category);

CREATE TABLE IF NOT EXISTS inspiration_loves (
  inspiration_id TEXT NOT NULL REFERENCES inspiration(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  PRIMARY KEY (inspiration_id, user_id)
);

-- ── Social Connections ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS connections (
  id TEXT PRIMARY KEY,
  from_user TEXT NOT NULL REFERENCES users(id),
  to_email TEXT NOT NULL,
  to_user TEXT REFERENCES users(id),
  connection_type TEXT NOT NULL CHECK(connection_type IN ('family','friend')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','rejected')),
  message TEXT DEFAULT '',
  magic_token TEXT,
  created_at TEXT NOT NULL
);

-- ── Activity Log ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS activity_log (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_activity_user ON activity_log(user_id, read);

-- ── Orders ──────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  buyer_user_id TEXT NOT NULL REFERENCES users(id),
  professional_id TEXT NOT NULL REFERENCES professionals(id),
  photo_id TEXT REFERENCES photos(id),
  event_id TEXT REFERENCES events(id),
  product TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  stripe_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','paid','fulfilled','refunded','failed')),
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_user_id);
CREATE INDEX IF NOT EXISTS idx_orders_professional ON orders(professional_id);
CREATE INDEX IF NOT EXISTS idx_orders_stripe ON orders(stripe_id);

-- ── Ad Tiles ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ad_tiles (
  id TEXT PRIMARY KEY,
  image_url TEXT,
  link_url TEXT,
  message TEXT,
  position INTEGER NOT NULL,
  active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Rate Limits (atomic design — no race condition) ───────────────────────

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  window_start INTEGER NOT NULL,
  updated_at TEXT NOT NULL
);

-- ── Client Sites (built by professionals for local businesses) ────────────

CREATE TABLE IF NOT EXISTS client_sites (
  id TEXT PRIMARY KEY,
  professional_id TEXT NOT NULL REFERENCES professionals(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  industry_id TEXT,
  custom_domain TEXT,
  content TEXT DEFAULT '{}',
  template_config TEXT DEFAULT '{}',            -- was gallery_config
  setup_fee_cents INTEGER DEFAULT 0,
  monthly_fee_cents INTEGER DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_client_sites_slug ON client_sites(slug);
CREATE INDEX IF NOT EXISTS idx_client_sites_professional ON client_sites(professional_id);

-- ── Blog Posts ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  client_site_id TEXT NOT NULL REFERENCES client_sites(id),
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  body TEXT DEFAULT '',
  featured_image TEXT,
  published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT,
  UNIQUE(client_site_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_blog_posts_client ON blog_posts(client_site_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- ── Client Galleries ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS client_galleries (
  id TEXT PRIMARY KEY,
  client_site_id TEXT NOT NULL REFERENCES client_sites(id),
  name TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_client_galleries_site ON client_galleries(client_site_id);

CREATE TABLE IF NOT EXISTS client_gallery_photos (
  id TEXT PRIMARY KEY,
  gallery_id TEXT NOT NULL REFERENCES client_galleries(id),
  storage_key TEXT NOT NULL,
  filename TEXT DEFAULT '',
  width INTEGER DEFAULT 0,
  height INTEGER DEFAULT 0,
  file_size INTEGER DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_client_gallery_photos_gallery ON client_gallery_photos(gallery_id);

-- ── Migration Tracking ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS _migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);
