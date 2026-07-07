# FrameNest v2 — Architecture & Current State

> **Purpose:** This document provides the next AI auditor or developer with a complete understanding of the system architecture, what's been built, what remains, and known issues. Read this first.

---

## 1. System Overview

FrameNest is a three-sided platform: personal photo sharing, professional photographer marketplace, and local business website builder. v2 is a ground-up rewrite of the v1 codebase with clean architecture.

### Stack
- **Frontend:** React 19 + TypeScript + Tailwind CSS v4 + Vite
- **Backend:** Cloudflare Pages Functions (file-based routing)
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2 (photo-uploads, video-uploads buckets)
- **Payments:** Stripe Connect (not yet implemented in v2)
- **Maps:** Mapbox GL JS (not yet implemented in v2)
- **Auth:** JWT with HMAC-SHA256, 24h expiry, PBKDF2 password hashing

---

## 2. Repository Structure

```
framenest-v2/
├── packages/
│   ├── shared/                     # Single source of truth — ZERO runtime deps except zod
│   │   └── src/
│   │       ├── types/              # db.ts (26 table rows), api.ts (25 response DTOs), domain.ts (enums)
│   │       ├── validation/         # Zod schemas for every input (auth, events, albums, clients, etc.)
│   │       ├── constants/          # limits.ts, mime-types.ts, roles.ts
│   │       ├── templates/          # types.ts, registry.ts (323 template definitions)
│   │       ├── utils/              # id.ts (prefixed IDs), datetime.ts, slug.ts
│   │       └── errors.ts          # AppError class + Errors factory
│   │
│   ├── backend/                    # Cloudflare Pages Functions — routes → services → repos
│   │   └── src/
│   │       ├── routes/             # HTTP handlers (~15-25 lines each)
│   │       │   ├── auth/           # signup, login, gate, logout, me, forgot-password, reset-password
│   │       │   ├── events/         # index (list+create), [id] (get+delete)
│   │       │   ├── albums/         # index (list+create)
│   │       │   ├── spaces/         # [slug] (get+update)
│   │       │   ├── photos/         # upload
│   │       │   ├── media/          # [[path]] (serve from R2)
│   │       │   ├── inspiration.ts  # list+create
│   │       │   ├── professionals/  # public (list approved)
│   │       │   └── health.ts       # DB health check
│   │       ├── services/           # Business logic (auth-service, event-service, album-service)
│   │       ├── repos/              # Database access (user, space, event, photo, album repos)
│   │       ├── middleware/         # auth, cors, security-headers, rate-limit, error-handler
│   │       ├── serializers/        # DB row → API response (snake_case → camelCase)
│   │       ├── lib/                # jwt, password, media-signing, upload-validate, logger, response
│   │       └── _middleware.ts      # Global middleware (CORS, rate limit, auth gatekeeper)
│   │
│   └── frontend/                   # React SPA
│       └── src/
│           ├── pages/              # Route-level components (see Section 4 for status)
│           ├── components/         # ui/, layout/, auth/
│           ├── data/queries/       # useAuth (AuthContext + provider)
│           ├── lib/                # api-client, auth-store, utils
│           └── styles/             # globals.css (Tailwind v4)
│
├── functions/                      # Deployed Cloudflare Pages Functions (bundled JS from backend/src/routes/)
├── db/schema.sql                   # Clean v2 schema (26 tables, all FKs, atomic rate_limits)
├── scripts/                        # build-functions.ts, migrate-data.ts
├── docs/                           # This file + AUDIT-GUIDE.md
└── wrangler.toml                   # Cloudflare Pages + D1 + R2 configuration
```

---

## 3. Database Schema — Key Naming Changes from v1

| v1 Name | v2 Name | Table |
|---------|---------|-------|
| `photographers` | `professionals` | Table rename |
| `photographer_portfolio` | `professional_portfolio` | Table rename |
| `gallery_config` | `template_config` | Column in professionals, client_sites |
| `photographer_id` | `professional_id` | Column in portfolio, reviews, orders, bookings, client_sites |
| `loves` | `love_count` | Column in inspiration, events |
| `downloads` | `allow_downloads` | Column in albums |
| `events.public` | REMOVED | Replaced by `visibility` enum |
| `photo_token` (localStorage) | `framenest:auth:token` | Frontend auth key |
| `/citysite/*` | `/admin/*` | Admin route prefix |

### Tables (26 total)
`users`, `password_resets`, `spaces`, `space_members`, `events`, `photos`, `videos`, `event_messages`, `professionals`, `professional_portfolio`, `reviews`, `booking_inquiries`, `albums`, `album_photos`, `inspiration`, `inspiration_loves`, `connections`, `activity_log`, `orders`, `ad_tiles`, `rate_limits`, `client_sites`, `blog_posts`, `client_galleries`, `client_gallery_photos`, `_migrations`

---

## 4. API Endpoint Status

### Deployed & Working (24 endpoints)
| Domain | Endpoints |
|--------|-----------|
| Auth | POST signup, login, gate, logout; GET me; POST forgot-password (stub), reset-password (stub) |
| Events | GET list, POST create, GET by id, DELETE |
| Albums | GET list, POST create |
| Spaces | GET by slug, PUT update |
| Photos | POST upload |
| Media | GET serve from R2 |
| Inspiration | GET list, POST create |
| Professionals | GET public listing |
| Health | GET check |

### Known Non-Functional
- **`POST /api/auth/forgot-password`** — Returns success but never sends email or creates reset token
- **`POST /api/auth/reset-password`** — Returns success but never updates password in DB
- **`GET /api/events/:id`** — No auth check; private events are accessible to anyone with the ID

### NOT YET IMPLEMENTED (~79 endpoints from v1)
Entire subsystems missing: Video upload, Messages, Feed, Connections, Notifications, Bookings, Stripe payments, Admin panel API, Client sites CRUD, Blog, Ads, Users mode, Professional profile/portfolio/reviews, Inspiration love toggle, Album delete/add-photos/view, Photos list/delete/favorite

---

## 5. Frontend Page Status

### Full Implementation (8 pages)
HomePage, LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage, NotFoundPage, DashboardPage, EventDetailPage

### Stub/Placeholder (19 pages)
InspirationMapPage, PhotographerPage, PhotographerProfilePage, SpacePage, GalleryPage, SpaceGalleryPage, AlbumsPage, AlbumViewerPage, ClientsPage, ClientEditorPage, ClientSitePage, ClientBlogPostPage, AdminDashboardPage, AdminPeoplePage, AdminContentPage, AdminCommercePage, AdminDiscoveryPage, AdminSystemPage

### Missing (3 pages from v1)
DashboardGalleryPage, HealthPage, AdminPhotographersPage, AdminAdsPage

---

## 6. Known Security Issues

| Severity | Issue | Location |
|----------|-------|----------|
| **HIGH** | Media endpoint serves R2 objects without signed URL verification | `routes/media/[[path]].ts` |
| **HIGH** | Event detail GET has no auth — private events accessible by ID | `routes/events/[id].ts` |
| **MEDIUM** | Token revocation check skipped when DB binding undefined | `middleware/auth.ts:33` |
| **MEDIUM** | Forgot/reset password are no-ops (return success, do nothing) | `routes/auth/forgot-password.ts`, `reset-password.ts` |
| **LOW** | CSP allows `'unsafe-inline'` for scripts and styles | `middleware/security-headers.ts` |
| **LOW** | Hardcoded domain `framenest.photos/s/` in frontend | `DashboardPage.tsx:297`, `SignupPage.tsx:51` |

---

## 7. Deploy Information

- **Production URL:** https://framenest.photos
- **Cloudflare Pages Project:** `photo`
- **D1 Database:** `framenest-v2-db` (UUID: 106c8371-c84a-49d9-be36-717d3a439a5c)
- **R2 Buckets:** `photo-uploads` (PHOTOS), `video-uploads` (VIDEOS)
- **Secrets set:** JWT_SECRET, MEDIA_SIGNING_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, ZOHO_API_KEY, DEEPSEEK_API_KEY

### Deployment Commands
```bash
# Build functions
npx tsx scripts/build-functions.ts

# Build frontend
npm run build

# Deploy
npx wrangler pages deploy packages/frontend/dist --project-name=photo --branch=main --commit-dirty=true

# Deploy functions only (without rebuilding frontend)
# Just ensure functions/ directory is up to date and run the deploy command above
```

### Important: JS vs TS Functions
- Bundled JS functions work for most routes
- The media route `[[path]].ts` works as native TypeScript (no imports)
- If a function has NO external imports (only uses global Cloudflare types like `R2Bucket`, `D1Database`), deploy it as `.ts` directly
- If a function imports from `@framenest/shared` or local modules, use the esbuild bundler (`scripts/build-functions.ts`)

---

## 8. Key Architectural Patterns

### Route Handler Pattern
```typescript
export async function onRequestPost(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return auth;  // 401
    const body = await context.request.json();
    const parsed = someSchema.safeParse(body);
    if (!parsed.success) return json(Errors.validation(parsed.error.issues).toJSON(), 400);
    const service = new SomeService(new SomeRepo(context.env.DB));
    const result = await service.doSomething(auth.actor, parsed.data);
    return json(serializeSomething(result), 201);
  } catch (err) {
    if (isAppError(err)) return json(err.toJSON(), err.status);
    throw err;  // Caught by global middleware → 500
  }
}
```

### Service Pattern
- Services contain ALL business logic
- Services throw `AppError` (from `@framenest/shared`) for expected errors
- Services NEVER return Response objects — routes handle HTTP concerns
- Services receive Actor + validated input, return domain objects

### Repository Pattern
- All DB queries go through repos extending `BaseRepo`
- `BaseRepo.active(tableName)` adds `AND deleted_at IS NULL` — NEVER forget soft-delete
- `BaseRepo.batch(statements)` for atomic multi-statement operations
- Repos return raw DB rows (snake_case) — serializers convert to camelCase

### ID System
All entity IDs are prefixed for self-documentation:
`usr_` (user), `spc_` (space), `evt_` (event), `pho_` (photo), `vid_` (video), `alb_` (album), `pro_` (professional), `cli_` (client), `blg_` (blog), `gal_` (gallery), `ins_` (inspiration), `ord_` (order), `rev_` (review), `con_` (connection)

---

## 9. Template System

V2 replaces 323 individual React template components with a data-driven system:
- **Definitions:** `packages/shared/src/templates/registry.ts` — 323 `TemplateDefinition` objects
- **Renderer:** `packages/frontend/src/pages/professionals/TemplateRenderer.tsx` — one component
- **Section types:** hero, about, gallery, services, pricing, testimonials, contact, blog, cta
- **Adding a template:** Add an entry to the registry — no new React component needed
- **Adding a section type:** Add a case to the SectionRenderer switch + create the section component
