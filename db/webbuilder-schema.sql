-- Webbuilder — AI-driven website builder tables
-- Run: npx wrangler d1 execute photo-db --remote --file=db/webbuilder-schema.sql

CREATE TABLE IF NOT EXISTS web_projects (
  id              TEXT PRIMARY KEY,
  photographer_id TEXT NOT NULL,
  name            TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  custom_domain   TEXT,
  status          TEXT DEFAULT 'draft',
  template_id     TEXT,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS web_templates (
  id          TEXT PRIMARY KEY,
  project_id  TEXT NOT NULL,
  version     INTEGER NOT NULL DEFAULT 1,
  description TEXT NOT NULL,
  design_json TEXT NOT NULL,
  preview_html TEXT,
  status      TEXT DEFAULT 'draft',
  created_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS web_pages (
  id          TEXT PRIMARY KEY,
  project_id  TEXT NOT NULL,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  nav_visible INTEGER DEFAULT 1,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS web_sections (
  id           TEXT PRIMARY KEY,
  page_id      TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'text',
  title        TEXT NOT NULL,
  instructions TEXT NOT NULL DEFAULT '',
  sort_order   INTEGER DEFAULT 0,
  created_at   TEXT NOT NULL,
  updated_at   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS web_footers (
  id           TEXT PRIMARY KEY,
  project_id   TEXT NOT NULL UNIQUE,
  instructions TEXT NOT NULL DEFAULT '',
  content_html TEXT,
  updated_at   TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS web_generated_pages (
  id          TEXT PRIMARY KEY,
  project_id  TEXT NOT NULL,
  page_id     TEXT NOT NULL,
  template_id TEXT NOT NULL,
  version     INTEGER NOT NULL DEFAULT 1,
  html        TEXT NOT NULL,
  css         TEXT,
  status      TEXT DEFAULT 'draft',
  created_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS web_versions (
  id            TEXT PRIMARY KEY,
  project_id    TEXT NOT NULL,
  page_id       TEXT,
  template_id   TEXT,
  version       INTEGER NOT NULL,
  type          TEXT NOT NULL,
  snapshot_json TEXT NOT NULL,
  created_at    TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_web_projects_photographer ON web_projects(photographer_id);
CREATE INDEX IF NOT EXISTS idx_web_templates_project ON web_templates(project_id);
CREATE INDEX IF NOT EXISTS idx_web_pages_project ON web_pages(project_id);
CREATE INDEX IF NOT EXISTS idx_web_sections_page ON web_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_web_generated_pages_project ON web_generated_pages(project_id);
CREATE INDEX IF NOT EXISTS idx_web_versions_project ON web_versions(project_id);
