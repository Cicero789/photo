# FrameNest Architecture

> **Last updated:** 2026-06-27
> **Target audience:** Human developers + AI coding agents
> **Purpose:** Single source of truth for structure, contracts, naming, and known quirks.

---

## Site Purpose

FrameNest is a **professional website platform + photo-sharing marketplace**.

- **Personal users:** Private photo/video spaces for family sharing (gate keys, memories, albums)
- **Pro photographers:** Portfolio showcase, client delivery, booking, Stripe payments, multi-site agency
- **Local professionals:** Websites for dentists, lawyers, coaches, salons, restaurants (built by photographers)

---

## Repository Layout (Code Map)

```
photo/                          ← Git root
├── src/                        ← React 19 + TypeScript + Vite frontend
│   ├── App.tsx                 ← All routes (SPA, react-router)
│   ├── index.css               ← Tailwind v4 + design tokens
│   ├── hooks/
│   │   └── useAuth.tsx         ← AuthContext: user, space, login, logout, JWT
│   ├── lib/
│   │   ├── api.ts              ← Central API client (fetch wrapper, token injection, API_BASE=/api)
│   │   └── utils.ts            ← cn() classname helper
│   ├── components/
│   │   ├── auth/               ← ProtectedRoute, login/signup forms
│   │   ├── events/             ← EventGrid, EventTile, CreateEventModal
│   │   ├── layout/             ← Navbar, MainLayout
│   │   ├── map/                ← EventMap, SpaceEventMap
│   │   ├── photographer/       ← HireButton, PricingPanel, PhotographerHero, TemplatePicker
│   │   ├── shared/             ← NotificationBell, LoadingSpinner
│   │   └── templates/          ← 263 template components (lazy-loaded, code-split)
│   ├── pages/
│   │   ├── admin/              ← AdminDashboardPage through AdminSystemPage (6 pages, /citysite/*)
│   │   ├── AlbumViewerPage.tsx ← Public album viewer (/album/:token)
│   │   ├── AlbumsPage.tsx      ← Pro album manager (/albums)
│   │   ├── ClientBlogPostPage.tsx  ← Public blog post (/blog/:siteSlug/:postSlug)
│   │   ├── ClientEditorPage.tsx    ← Pro client site editor (/clients/:id/edit)
│   │   ├── ClientsPage.tsx     ← Pro client list + create (/clients)
│   │   ├── ClientSitePage.tsx  ← Public client site renderer (/site/:slug)
│   │   ├── DashboardPage.tsx   ← Main dashboard (mode-dependent tabs)
│   │   ├── EventDetailPage.tsx ← Event page (/s/:space/e/:eventId)
│   │   ├── HomePage.tsx        ← Landing page (/)
│   │   ├── InspirationMapPage.tsx ← Map with 102 scenic pins (/inspiration)
│   │   ├── PhotographerPage.tsx   ← Photographer directory + apply (/photographers)
│   │   ├── PhotographerProfilePage.tsx ← Public profile renderer (/:slug catch-all)
│   │   └── ... (SpacePage, GalleryPage, LoginPage, SignupPage, etc.)
│   └── types/
│       └── index.ts            ← Shared TypeScript interfaces
│
├── functions/                  ← Cloudflare Pages Functions (backend)
│   ├── _middleware.ts          ← CORS, CSP, security headers, rate limiting, custom domain
│   ├── lib/                    ← Shared backend libraries
│   │   ├── auth.ts             ← requireAuth(), requireRole(), ROLES map
│   │   ├── jwt.ts              ← HMAC-SHA256 JWT create/verify, 24h expiry
│   │   ├── password.ts         ← PBKDF2 hashing, timingSafeEqual(), hashToken()
│   │   ├── response.ts         ← json() helper with CORS headers
│   │   ├── signed-url.ts       ← HMAC media URL signing with expiry
│   │   ├── stripe.ts           ← Stripe REST API helper (fetch-based, no SDK)
│   │   ├── upload-validate.ts  ← Magic-byte + dangerous-signature validation
│   │   ├── event-access.ts     ← canReadEvent(), canManageEvent(), requireReadableEvent()
│   │   ├── activity.ts         ← Fire-and-forget activity logger
│   │   ├── email.ts            ← ZeptoMail email sending
│   │   ├── geocode.ts          ← Mapbox forward geocoding
│   │   ├── rate-limit.ts       ← D1-based rate limiter (race-prone, see KNOWN QUIRKS)
│   │   └── validate.ts         ← Input sanitizer + constants
│   └── api/                    ← REST API endpoints (file-based routing)
│       ├── auth/               ← login, signup, gate, forgot-password, reset-password, magic-login, logout
│       ├── spaces/             ← CRUD, members, by-domain
│       ├── events/             ← CRUD, summarize
│       ├── photos/             ← upload, favorite, [id] delete
│       ├── videos/             ← upload
│       ├── media/[[path]].ts   ← Unified media serving (photos + videos)
│       ├── albums/             ← CRUD, view/[token], [id]/photos
│       ├── photographers/      ← apply, config, portfolio, profile/[slug], reviews/[slug], stats
│       ├── stripe/             ← connect, checkout, subscribe, verify, webhook
│       ├── clients/            ← CRUD, blog, galleries, photos (multi-site platform)
│       ├── blog/               ← Public blog post lookup
│       ├── admin/              ← stats, users, spaces, content, orders
│       ├── notifications/      ← Activity log
│       ├── feed/               ← Social feed
│       ├── inspiration/        ← Map pin CRUD + love
│       ├── bookings/           ← Booking inquiries
│       ├── connections/        ← Friend/family invites
│       ├── messages/           ← Event messages
│       ├── ads/                ← Public ad tiles
│       ├── health.ts           ← Platform health check
│       └── users/mode.ts       ← Personal/Pro account mode switch
│
├── db/
│   ├── schema.sql              ← Full D1 schema (25+ tables, 50+ indexes)
│   ├── admin.sql               ← Admin seed data
│   └── migrations/             ← Numbered forward-only migrations
│
├── public/                     ← Static assets + mockup HTML files
│   ├── robots.txt              ← SEO robots file
│   ├── sitemap.xml             ← SEO sitemap
│   ├── mockups-*.html          ← 22 HTML mockup files (preview only, not compiled)
│   └── thumbnails/             ← Template preview JPGs (~500 files)
│
├── tests/                      ← Vitest test suite (61 tests, 5 files)
│   ├── auth-policy.test.ts
│   ├── signed-url.test.ts
│   ├── upload-adversarial.test.ts
│   ├── stripe-webhook.test.ts
│   └── validation.test.ts
│
├── scripts/                    ← Build + utility scripts
│   ├── generate-thumbnails.mjs ← Puppeteer screenshot generator
│   └── import-screenshots.mjs  ← GPT-5.5 screenshot importer
│
├── ARCHITECTURE.md             ← THIS FILE
├── RELEASE_GATES.md            ← Release gate checklist
├── wrangler.toml               ← Cloudflare Pages + D1 + R2 config
├── package.json                ← Dependencies + scripts
├── tsconfig.json               ← Frontend TypeScript config
├── vitest.config.ts            ← Test runner config
└── eslint.config.js            ← Lint rules
```

---

## Request Lifecycle

```
Browser → Cloudflare Pages (static assets + SPA shell)
              ↓
         React Router (client-side routing)
              ↓
         Page component loads → calls api.get/post/put/delete()
              ↓
         api.ts wraps fetch() → prepends /api → adds JWT Bearer token
              ↓
    ┌──── Cloudflare Pages Function (functions/api/*.ts)
    │     ↓
    │  _middleware.ts (CORS, CSP, security headers, rate limit)
    │     ↓
    │  requireAuth() → JWT verify → extract userId, role, spaceId
    │     ↓
    │  Business logic → D1 queries (parameterized) → R2 operations
    │     ↓
    │  json() response with CORS headers
    │     ↓
    └──→ Frontend receives response → React state update → re-render
```

---

## Database Architecture

### Core Tables (25+)

```
users ────┐
          ├── spaces (owner_id → users.id)
          │     ├── events (space_id → spaces.id)
          │     │     ├── photos (event_id → events.id) ON DELETE CASCADE
          │     │     ├── videos (event_id → events.id) ON DELETE CASCADE
          │     │     └── event_messages (event_id → events.id)
          │     └── space_members (space_id → spaces.id, user_id → users.id)
          │
          ├── photographers (email matches users.email)
          │     ├── photographer_portfolio
          │     └── reviews (photographer_id)
          │
          ├── albums (user_id → users.id)
          │     └── album_photos (album_id → albums.id)
          │
          ├── connections (from_user → users.id, to_email)
          ├── activity_log (user_id → users.id)
          ├── orders (buyer_user_id → users.id, photographer_id → photographers.id)
          ├── booking_inquiries (photographer_id → photographers.id)
          │
          └── client_sites (photographer_id → users.id)  ← multi-site platform
                ├── blog_posts (client_site_id)
                └── client_galleries (client_site_id)
                      └── client_gallery_photos (gallery_id)

Supporting: inspiration, inspiration_loves, ad_tiles, rate_limits, password_resets,
            _migrations, reviews, booking_inquiries
```

### Key Relationships

| Parent | Child | FK | On Delete |
|--------|-------|-----|-----------|
| events | photos | event_id | CASCADE |
| events | videos | event_id | CASCADE |
| spaces | events | space_id | RESTRICT |
| spaces | space_members | space_id | RESTRICT |
| users | spaces | owner_id | RESTRICT |
| albums | album_photos | album_id | CASCADE |
| photographers | photographer_portfolio | photographer_id | none |

---

## Naming Conventions

### API Routes (file-based, plural root)

| Pattern | Handler location | Auth | Used by |
|---------|-----------------|------|---------|
| `/api/auth/*` | `functions/api/auth/` | Varies | Auth flows |
| `/api/spaces/*` | `functions/api/spaces/` | Yes | Space management |
| `/api/events/*` | `functions/api/events/` | Varies | Event CRUD |
| `/api/photos/*` | `functions/api/photos/` | Yes | Photo upload |
| `/api/media/*` | `functions/api/media/[[path]].ts` | Varies | File serving |
| `/api/albums/*` | `functions/api/albums/` | Varies | Album CRUD |
| `/api/photographers/*` | `functions/api/photographers/` | Varies | Pro management |
| `/api/stripe/*` | `functions/api/stripe/` | Yes | Payments |
| `/api/clients/*` | `functions/api/clients/` | Yes (owner) | Client sites |
| `/api/blog/*` | `functions/api/blog/` | None | Public blog posts |
| `/api/admin/*` | `functions/api/admin/` | platform_owner | Admin panel |

### Frontend Routes

| Path | Page | Access |
|------|------|--------|
| `/` | HomePage | Public |
| `/login`, `/signup` | LoginPage, SignupPage | Public |
| `/s/:spaceSlug` | SpacePage | Public/gate |
| `/inspiration` | InspirationMapPage | Public |
| `/photographers` | PhotographerPage | Public |
| `/:slug` | PhotographerProfilePage (catch-all) | Public |
| `/site/:slug` | ClientSitePage | Public |
| `/blog/:siteSlug/:postSlug` | ClientBlogPostPage | Public |
| `/album/:token` | AlbumViewerPage | Public |
| `/dashboard` | DashboardPage | Auth |
| `/albums` | AlbumsPage | Auth |
| `/clients` | ClientsPage | Pro |
| `/clients/:id/edit` | ClientEditorPage | Pro |
| `/citysite/*` | Admin pages | platform_owner |

**Critical ordering rule:** The `/:slug` catch-all route must come LAST (before `*` 404). All named routes must precede it.

---

## Known Quirks (Read Before Coding)

### 1. `photographers` Table = All Professionals
The `photographers` table stores ANY professional (doctors, lawyers, coaches) not just photographers. The name is legacy — renaming would break dozens of queries.

```
Table: photographers
Actually stores: photographers + doctors + lawyers + coaches + all 20 industries
```

**Rule:** When querying `photographers`, mentally substitute "professionals." Do not assume the data is photography-specific.

### 2. `gallery_config` Column = Design/Theming Config
The column name says "gallery" but stores template/design configuration:
```json
{"template": "cinematic-dark", "colorScheme": "dark", "fontPairing": "classic"}
```
**Rule:** Do not rename this column — it breaks existing code. Treat it as `design_config` mentally.

### 3. Template IDs are Numeric-Kebab
The template registry uses numeric-kebab IDs like `1-clean`, `10-brutalist`, `teaching-music`. These IDs come from the auto-generated index.ts. The thumbnail files use these same IDs.

**Rule:** Template IDs always match the pattern `[category]?-[name]`. Never change an existing ID without updating the thumbnail file.

### 4. Two Primary Branches
Both `master` and `main` exist and point to the same commit. **Use `main` for all new work.** `master` exists for backward compat only.

### 5. Rate Limiter Is Race-Prone
`functions/lib/rate-limit.ts` uses D1 read-count-write pattern without atomicity. Concurrent requests can exceed limits. For strict security limits, a Durable Object or Cloudflare Rate Limiting is needed.

### 6. Soft-Delete Is Inconsistently Applied
- events, photos, videos, albums: `deleted_at` column ✅
- client_sites, blog_posts, client_galleries: `deleted_at` column ✅
- client_gallery_photos: `deleted_at` column ✅
- All public queries filter `AND deleted_at IS NULL`
- **Exception:** `events/[id].ts` GET does NOT filter deleted_at (AP-019 — pending fix)

### 7. Media Authorization Is Complex
`functions/api/media/[[path]].ts` resolves authorization through 5 layers:
1. Signed URL (HMAC verified)
2. Event photos/videos (visibility check + ownership)
3. Album photos (share token context)
4. Photographer portfolio (public)
5. Client gallery photos (published check)

Each layer has different auth rules. Changes to any layer affect the others.

### 8. Template System Is 263 Components
Each template is a standalone React component (~100-600 lines), code-split via lazy loading. Templates accept `TemplateProps` but NOT all templates use all props. Some template interactions (CTAs, forms) are decorative — they display a button but the handler may be a no-op.

### 9. CSP Blocks Google Fonts
The Content-Security-Policy blocks `fonts.googleapis.com` and `fonts.gstatic.com`, but 262 of 263 templates try to load Google Fonts. Fonts fall back to system defaults. The intended fix is self-hosted fonts — not loosening the CSP.

### 10. Two JWT Secrets (JWT + Media)
- `JWT_SECRET`: signs authentication tokens
- `MEDIA_SIGNING_SECRET`: signs media access URLs (falls back to JWT_SECRET if unset)

**Rule:** Both must be set in production. The media secret fallback exists for backward compat.

---

## DO NOT Rules (for AI Coders)

1. **DO NOT** rename `photographers` table or columns
2. **DO NOT** rename `gallery_config` column
3. **DO NOT** change template IDs without updating thumbnails + registry
4. **DO NOT** edit 263 templates while repairing API/database contracts
5. **DO NOT** deploy schema changes without a forward D1 migration
6. **DO NOT** use production as the migration test environment
7. **DO NOT** skip `deleted_at IS NULL` in new queries
8. **DO NOT** trust a frontend role check as authorization
9. **DO NOT** allow a gate token to act as a real user account
10. **DO NOT** swallow errors silently — always log with context
11. **DO NOT** use raw `innerHTML` or `dangerouslySetInnerHTML` with user content
12. **DO NOT** place new routes AFTER `/:slug` in App.tsx route order

---

## Build & Deploy

```bash
npm run build          # tsc -b + tsc -p functions + vite build
npm test               # vitest run (61 tests)
npm run lint           # eslint (currently warns — see KNOWN QUIRKS)
npm run deploy         # wrangler pages deploy ./dist --project-name photo --branch main
npm run deploy:safe    # build + test + db:backup + deploy
npm run db:backup      # wrangler d1 export photo-db --remote
```

### Release Gates
All must pass before production deploy:
- [ ] `npm run build` passes
- [ ] `npm test` passes (61/61)
- [ ] `npm run lint` has zero errors
- [ ] `npx wrangler types --check` passes
- [ ] PRAGMA foreign_key_check returns 0 rows
- [ ] No production console errors on /, /s/demo, /photographers, /inspiration
- [ ] Mobile 375px has no horizontal overflow

---

## Illogical Parts — Fix Queue

| # | Issue | Fix Priority | Effort | Risk |
|---|-------|-------------|--------|------|
| 1 | `events/[id].ts` GET missing `deleted_at IS NULL` filter | P1 | 1 line | None |
| 2 | `master` branch should be deleted/archived | P3 | 1 command | Check CI deps |
| 3 | Template registry IDs vs thumbnail filenames still have mismatches in ~30 cases | P2 | Script fix | None |
| 4 | photographers table name is misleading | P3 (never) | Full migration | HIGH — 50+ queries |
| 5 | gallery_config column name is misleading | P3 (never) | Full migration | HIGH — 20+ references |
| 6 | CSP blocks Google Fonts but 262 templates use them | P2 | Self-host fonts | Medium |
| 7 | Rate limiter is non-atomic | P1 | Durable Object | Medium |
| 8 | Signed URL comparison uses string equality (not constant-time) | P1 | crypto.subtle | Low |
| 9 | Health check table list is stale | P2 | Update static list | None |
| 10 | tsconfig.tsbuildinfo tracked in git | P3 | .gitignore | None |

---

## Reference

- Cloudflare Workers: https://developers.cloudflare.com/workers/
- Cloudflare D1: https://developers.cloudflare.com/d1/
- Cloudflare R2: https://developers.cloudflare.com/r2/
- Stripe Connect: https://stripe.com/docs/connect
- Mapbox GL JS: https://docs.mapbox.com/mapbox-gl-js/
