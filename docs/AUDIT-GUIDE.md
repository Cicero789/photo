# FrameNest v2 — Audit Guide for AI Auditors

> **Purpose:** This document tells an AI auditor exactly what to audit, where to look, what's known to be broken, and what priorities to assign. Use this to produce a high-quality audit text file.

---

## Quick Start for the Auditor

1. **Read `docs/ARCHITECTURE.md` first** — it explains the system, naming conventions, and current state
2. **Read this guide** — it lists every known issue with file paths and line numbers
3. **Produce your audit** — focus on unverified claims, missing implementations, and security gaps
4. **Cross-reference with v1** — the original codebase is at `C:\Users\shant\photo\`

### Key Differences from v1
- Table `photographers` → `professionals`, column `gallery_config` → `template_config`
- Column `loves` → `love_count`, `downloads` → `allow_downloads`
- Route prefix `/citysite/*` → `/admin/*`
- localStorage key `photo_token` → `framenest:auth:token`
- 323 template files → 1 renderer + data registry
- Random UUIDs → prefixed IDs (`usr_`, `evt_`, `pho_`, etc.)

---

## SECTION A: Critical Security Issues (Audit First)

### A1. Media Endpoint — No Signed URL Verification
**File:** `packages/backend/src/routes/media/[[path]].ts`
**Severity:** HIGH
**Issue:** The `onRequestGet` handler serves R2 objects directly by storage key. It does NOT call `verifyMediaSignature()` from `lib/media-signing.ts`. The signed URL parameters (`sig` and `exp` in query string) are completely ignored. Any R2 object is publicly accessible by guessing or knowing its storage key.
**How to verify:** Test `GET /api/media/photos/events/{eventId}/{photoId}.jpg` without any `?sig=` or `?exp=` parameters. If the image loads, the vulnerability is still present.
**Fix needed:** Add signature verification before serving. For public events/portfolios, allow unsigned access. For private content, require a valid signature.

### A2. Event Detail — No Auth on GET
**File:** `packages/backend/src/routes/events/[id].ts`, lines 8-23
**Severity:** HIGH
**Issue:** The `onRequestGet` handler does NOT call `requireAuth()`. Anyone can fetch full event details (including private events) by knowing the event ID. Photos, descriptions, and addresses of private events are exposed.
**How to verify:** `GET /api/events/{any-event-id}` without an Authorization header. If it returns full event data, the vulnerability is present.
**Fix needed:** Add `requireAuth()` call and check visibility/space ownership.

### A3. Forgot/Reset Password — Non-Functional
**Files:**
- `packages/backend/src/routes/auth/forgot-password.ts`
- `packages/backend/src/routes/auth/reset-password.ts`
**Severity:** HIGH (functional security)
**Issue:** Both endpoints validate input but return hardcoded success messages without doing any real work. Forgot-password never generates a token, never stores it in `password_resets`, and never sends an email. Reset-password never verifies a token or updates the user's password_hash.
**How to verify:** Call `POST /api/auth/forgot-password` with a valid email. Check if a `password_resets` row was created (it won't be). Call `POST /api/auth/reset-password` with any token — it will always return success.
**Fix needed:** Implement full forgot/reset flow using `password_resets` table and email service.

### A4. Token Revocation Check is Conditional
**File:** `packages/backend/src/middleware/auth.ts`, line 33
**Severity:** MEDIUM
**Issue:** `if (env?.DB)` gates the token_version check. When DB is undefined (e.g., misconfigured deployment), revoked tokens remain valid for their full 24h lifetime.
**How to verify:** Check if any deployment configuration omits the DB binding. Test token validity after calling a token-revocation endpoint.
**Fix needed:** Either make DB required for auth, or log a critical warning when DB is missing.

### A5. CSP Allows Unsafe-Inline
**File:** `packages/backend/src/middleware/security-headers.ts`, lines 12, 14
**Severity:** LOW
**Issue:** Both `script-src` and `style-src` include `'unsafe-inline'`, weakening XSS protection.
**Fix needed:** Use nonces or hashes for inline scripts/styles, or move all inline code to external files.

---

## SECTION B: Missing API Endpoints (79 of ~103)

The following subsystems have ZERO endpoints implemented in v2. They exist in v1 at `C:\Users\shant\photo\functions\api\` and need to be ported.

### B1. Entirely Missing Subsystems (in priority order)

| Priority | Subsystem | v1 Source Directory | Endpoints |
|----------|-----------|---------------------|-----------|
| P1 | **Admin Panel API** | `functions/api/admin/` | 18 endpoints (stats, users, content, ads, spaces, pins, orders, seed) |
| P1 | **Stripe/Payments** | `functions/api/stripe/` | 6 endpoints (connect, checkout, subscribe, verify, webhook) |
| P1 | **Professional System** | `functions/api/photographers/` | 12 endpoints (apply, admin CRUD, config, portfolio, stats, profile, reviews) |
| P2 | **Client Sites** | `functions/api/clients/` | 17 endpoints (CRUD, galleries, blog, photos) |
| P2 | **Client Public Sites** | `functions/api/clients/public/` | 2 endpoints (public site view, public gallery view) |
| P2 | **Albums (remaining)** | `functions/api/albums/` | 3 endpoints (delete, add photos, view by token) |
| P3 | **Connections** | `functions/api/connections/` | 3 endpoints (list, invite, accept/reject) |
| P3 | **Notifications** | `functions/api/notifications.ts` | 2 endpoints (list, mark read) |
| P3 | **Messages** | `functions/api/messages/` | 2 endpoints (list by event, post) |
| P3 | **Feed** | `functions/api/feed.ts` | 1 endpoint |
| P3 | **Bookings** | `functions/api/bookings/` | 1 endpoint (inquire) |
| P3 | **Blog (public)** | `functions/api/blog/` | 1 endpoint (view post) |
| P3 | **Ads (public)** | `functions/api/ads.ts` | 1 endpoint |
| P4 | **Videos** | `functions/api/videos/` | 1 endpoint (upload) |
| P4 | **Users mode** | `functions/api/users/` | 2 endpoints (get/set account type) |
| P4 | **Auth magic-login** | `functions/api/auth/magic-login.ts` | 1 endpoint |
| P4 | **Inspiration love** | `functions/api/inspiration/[id]/love.ts` | 1 endpoint |
| P4 | **Events summarize** | `functions/api/events/summarize.ts` | 1 endpoint |
| P4 | **Photos list/delete/favorite** | `functions/api/photos/` | 3 endpoints |
| P4 | **Spaces members/by-domain** | `functions/api/spaces/` | 5 endpoints |

### B2. Existing Routes Missing Methods
- `GET /api/photos` — list all photos (only POST upload exists)
- `DELETE /api/photos/:id` — delete individual photo
- `PUT /api/photos/favorite` — toggle favorite
- `DELETE /api/albums/:id` — delete album
- `POST /api/albums/:id/photos` — add photo to album
- `GET /api/albums/view/:token` — view shared album
- `PUT /api/events/:id` — update event
- `POST /api/events/summarize` — AI summary generation

---

## SECTION C: Frontend Gaps

### C1. Stub Pages (19 pages — render only a title div)
All at `packages/frontend/src/pages/`:
- `InspirationMapPage.tsx` — Mapbox map with pins
- `PhotographerPage.tsx` — Marketing/landing for photographers
- `PhotographerProfilePage.tsx` — Public professional profile
- `SpacePage.tsx` — Public space (gate entry, event grid)
- `GalleryPage.tsx` — Event photo gallery with slideshow
- `SpaceGalleryPage.tsx` — Multi-event slideshow
- `AlbumsPage.tsx` — Album manager (not the dashboard tab)
- `AlbumViewerPage.tsx` — Public album viewer (password, lightbox)
- `ClientsPage.tsx` — Client site list
- `ClientEditorPage.tsx` — Client site CMS
- `ClientSitePage.tsx` — Public client site
- `ClientBlogPostPage.tsx` — Public blog post
- `admin/AdminDashboardPage.tsx`
- `admin/AdminPeoplePage.tsx`
- `admin/AdminContentPage.tsx`
- `admin/AdminCommercePage.tsx`
- `admin/AdminDiscoveryPage.tsx`
- `admin/AdminSystemPage.tsx`

### C2. Missing Components (17 from v1)
- `photos/PhotoUploader.tsx` — Drag-drop upload with EXIF extraction
- `photos/PhotoEditorModal.tsx` — Filerobot image editor
- `photos/DarkGallery.tsx` — Full-screen lightbox
- `videos/VideoUploader.tsx` — Video upload with re-encoding
- `map/EventMap.tsx` — Small map with photo pins
- `map/SpaceEventMap.tsx` — Space-level map
- `events/EventGrid.tsx` — Event cards with ad injection
- `events/EventTile.tsx` — Single event card
- `events/CreateEventModal.tsx` — Modal form (dashboard has inline version)
- `community/InviteModal.tsx`, `ConnectionsTab.tsx`, `CommunityFeed.tsx`
- `photographer/PricingPanel.tsx`, `PhotographerHero.tsx`, `HireButton.tsx`
- `shared/QRCode.tsx`, `NotificationBell.tsx`
- `commerce/BuyButton.tsx`

### C3. Missing Lib Files (2 from v1)
- `src/lib/constants.ts` — APP_NAME, APP_URL, MAX_PHOTO_SIZE_MB, EVENT_CATEGORIES, AD_TILE_INTERVAL
- `src/lib/exif.ts` — Pure-JS EXIF GPS/location parser from JPEG APP1 segment

---

## SECTION D: Code Quality Issues

### D1. Type Safety
| Issue | Location | Fix |
|-------|----------|-----|
| `(data as any).photos` | `EventDetailPage.tsx:25` | Add `photos` to API response type |
| `(r: any)` in D1 results | `health.ts:5`, `professionals/public.ts:7` | Use typed D1 result generic |
| `safeJson(): any` return | `professionals/public.ts:19` | Return `unknown` with type guard |

### D2. Naming Inconsistencies (NOT YET MIGRATED)
| Old Name | Used In | Should Be |
|----------|---------|-----------|
| `PHOTOGRAPHER_STATUSES` | `shared/src/types/domain.ts:55` | `PROFESSIONAL_STATUSES` |
| `/api/photographers` paths | `backend/src/_middleware.ts:36,47-49` | `/api/professionals` |
| `PhotographerPage` import | `App.tsx:13,14,52` | Should match new naming |
| `photographers` variable | `HomePage.tsx:8,12` | `professionals` |
| "Photographers" link | `Navbar.tsx:28-29`, `Footer.tsx:12-13` | "Professionals" or update UI |
| `'photographer'` in pf field | `templates/registry.ts` | `'professional'` |

### D3. Hardcoded Values
| Value | Location | Should Be |
|-------|----------|-----------|
| `framenest.photos/s/` | `DashboardPage.tsx:297`, `SignupPage.tsx:51` | `window.location.origin` or env var |
| `#3b82f6` (default theme) | `space-repo.ts:24`, `DashboardPage.tsx:266` | Shared constant |
| Mapbox/Stripe/Google URLs | `security-headers.ts:12-20` | Documented but acceptable for CSP |
| Allowed origins | `cors.ts:4-8` | Documented but needs updating for new envs |

### D4. Design Smells
| Issue | Location | Notes |
|-------|----------|-------|
| `null as unknown as R2Bucket` | `albums/index.ts:14` | GET handler doesn't need R2 but constructor requires it |
| Stale bundled JS in functions/ | `functions/api/albums/[id].js` | 4821-line bundled artifact with no matching source file |
| LIMIT/OFFSET via template literal | `event-repo.ts:22` | Should validate before interpolation |

---

## SECTION E: What WAS Fixed in v2 (Verify These Claims)

The auditor should verify these improvements are actually present:

1. ✅ **Namespaced localStorage** — `framenest:auth:token` instead of `photo_token`
2. ✅ **Admin routes** — `/admin/*` instead of `/citysite/*`
3. ✅ **Table renames** — `professionals` instead of `photographers`
4. ✅ **Column renames** — `template_config` instead of `gallery_config`, `love_count` instead of `loves`
5. ✅ **No `events.public` column** — replaced by `visibility` enum
6. ✅ **All foreign keys declared** — v1 had ~17 missing FKs
7. ✅ **Atomic rate limiting** — UPSERT instead of read-count-write race condition
8. ✅ **Structured errors** — `AppError` with codes instead of ad-hoc strings
9. ✅ **Prefixed IDs** — `usr_`, `evt_`, `spc_`, etc. instead of raw UUIDs
10. ✅ **Template system** — 1 renderer + registry instead of 323 files
11. ✅ **BaseRepo.active()** — automatic soft-delete filtering
12. ✅ **No password_hash in login response** — space returns only id/name/slug
13. ✅ **PBKDF2 password hashing** — 100k iterations, SHA-256, constant-time comparison

---

## SECTION F: Deployment Health Checks

Run these to assess the current deployed state:

```bash
# Health endpoint — lists all 26 tables
curl https://framenest.photos/api/health

# Test auth flow
curl -X POST https://framenest.photos/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"name":"Audit Test","email":"audit@test.com","password":"audit1234","spaceName":"Audit","spaceSlug":"audit-test","gateKey":"audit1234"}'

# Test login (check no password_hash leak)
curl -X POST https://framenest.photos/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"audit@test.com","password":"audit1234"}'

# Test media serving (should return image, not HTML)
curl -sI "https://framenest.photos/api/media/photos/events/{eventId}/{photoId}.jpg"

# Test event access without auth (should be blocked for private events)
curl https://framenest.photos/api/events/{any-event-id}

# Test forgot-password (check if it actually creates a reset token)
curl -X POST https://framenest.photos/api/auth/forgot-password \
  -H 'Content-Type: application/json' \
  -d '{"email":"audit@test.com"}'
```

---

## SECTION G: Audit Output Template

The auditor should produce a `.txt` file with this structure:

```
FRAMENEST V2 AUDIT REPORT
=========================
Date: [date]
Auditor: [name]

1. EXECUTIVE SUMMARY
   - Overall health: [critical/needs-work/stable]
   - Critical issues found: [count]
   - High issues found: [count]
   - Endpoints deployed: [count]/103
   - Pages functional: [count]/30

2. CRITICAL SECURITY ISSUES
   [For each: file, line, description, reproduction steps, fix]

3. MISSING ENDPOINTS
   [Grouped by subsystem, with priority]

4. FRONTEND GAPS
   [Stub pages, missing components, missing lib files]

5. CODE QUALITY
   [Type safety, naming, hardcoded values, design smells]

6. VERIFIED FIXES (from v1)
   [Check each claim in Section E — confirm or refute]

7. NEW ISSUES FOUND
   [Anything not in this guide]

8. RECOMMENDATIONS
   [Prioritized list of what to fix first]
```
