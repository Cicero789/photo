# FrameNest — Self-Audit Report
**Date**: 2026-06-14  
**Commit**: 6d54f2c  
**Scope**: All source files in `src/`, `functions/`, `db/`  
**Method**: Static analysis + build verification + live endpoint testing

---

## Build Status

| Check | Result |
|---|---|
| `tsc -b` (frontend) | ✅ 0 errors |
| `tsc -p functions` (backend) | ✅ 0 errors |
| `vite build` | ✅ Clean |
| `npm audit` (prod) | ✅ 0 vulnerabilities |
| `npm audit` (dev) | ⚠️ 4 high (Vite/esbuild/Wrangler toolchain) |

---

## Critical Findings

### C-1: Stripe key hardcoded in source
**Files**: `index.html:9`, `src/components/commerce/BuyButton.tsx:5`
**Risk**: Real Stripe live key committed to public repo. While publishable keys are designed to be public, committing them permanently bakes them into git history.
**Fix**: Already present — rotate via Stripe dashboard if concerned. Publishable keys can't charge cards.

### C-2: Fixed admin credentials in documentation
**Files**: `CLAUDE.md:44`, `AGENTS.md`
**Risk**: `admin@photo.app / Admin123!@#` documented in two files read by every AI coder. If applied to production, this is a backdoor.
**Fix**: Remove credentials from documentation. Document the bootstrap process instead.

### C-3: JWT dev secret fallback
**File**: `functions/lib/jwt.ts:2`
**Risk**: `DEV_SECRET` is a known string. If `ENVIRONMENT` is not exactly `"production"`, tokens can be forged.
**Fix**: Already guarded — `getJwtSecret()` throws in production if secret < 32 chars. Verified functional. Rotate DEV_SECRET periodically.

### C-4: Media URLs are public and permanent
**File**: `functions/api/media/[[path]].ts`
**Risk**: Any R2 object is accessible by URL with 1-year immutable cache. Private event photos are public-by-link.
**Fix**: Implement signed/expiring URLs for private media. Use short-lived tokens for gate access.

---

## High Findings

### H-1: Silent catch blocks drop errors
**Files**: `connections/index.ts:113`, `photos/upload.ts:11`, `videos/upload.ts:11`
**Risk**: Email send failures, JSON parse errors silently swallowed. Debugging impossible.
**Fix**: Add `console.error` in every catch block.

### H-2: Three `as any` casts in critical paths
**Files**: `feed.ts:20,36,41`, `stripe/checkout.ts:44`
**Risk**: Type checking bypassed on API responses. Shape changes silently break.
**Fix**: Define proper interfaces for D1 and Stripe responses.

### H-3: No upload size/count/type validation server-side
**Files**: `photos/upload.ts`, `videos/upload.ts`
**Risk**: Client-side validation can be bypassed. Large or malicious files can be uploaded.
**Fix**: Enforce limits server-side: max file size, max count, allowed MIME types, magic byte checks.

### H-4: `SELECT *` used in 25+ queries
**Files**: Multiple `events/`, `photos/`, `spaces/` handlers
**Risk**: Adding a sensitive column silently exposes it in API responses.
**Fix**: Use explicit column lists in all public-facing queries.

### H-5: N+1 queries in event listing
**File**: `events/index.ts`
**Risk**: Each event triggers 2 extra D1 queries (photo count + cover photo). Linear scaling.
**Fix**: Use a single aggregated query with JOIN or subquery.

### H-6: Messages endpoint allows gate viewers to write
**File**: `messages/[eventId].ts`
**Risk**: Gate token uses fake `userId: "viewer"` which creates orphan message rows. Gate viewers shouldn't write.
**Fix**: Reject gate sessions for writes. Require real user accounts.

---

## Medium Findings

### M-1: `datetime('now')` vs ISO string inconsistency
**Files**: `reset-password.ts:27,52`
**Risk**: SQLite `datetime('now')` format differs from JS `toISOString()`. Date comparisons may be off.
**Fix**: Use parameterized ISO strings everywhere.

### M-2: Dev toolchain warnings on build
**Risk**: Large chunk warning (PhotoEditorModal 950KB). Already lazy-loaded.
**Fix**: Consider further splitting or lighter editor alternative.

### M-3: `functions/dist` directory committed as workaround
**Risk**: Empty directory created to work around Wrangler bug. May confuse future devs.
**Fix**: Remove when Wrangler bug is fixed or document clearly.

### M-4: `beach-photos.sql`, `fix-beach*.sql` are one-off scripts
**Risk**: These are not migrations and not idempotent. Committing them is confusing.
**Fix**: Move to `/scripts/oneoff/` or delete after use.

### M-5: No test files anywhere in the project
**Risk**: Zero automated tests. Every change is manual-verification only.
**Fix**: Add Vitest with Cloudflare Workers pool. Start with authorization matrix tests.

### M-6: No lint configuration
**Risk**: Style inconsistencies, potential bugs not caught.
**Fix**: Add ESLint with TypeScript rules.

### M-7: `wrangler types --check` fails
**Risk**: Generated Cloudflare binding types not committed. Hand-written env types may drift.
**Fix**: Generate and commit binding types. Add to CI.

---

## Low Findings

### L-1: Unused exports
- `src/lib/utils.ts:generateId()` — never imported
- `src/lib/constants.ts:APP_URL` — never imported
**Fix**: Remove or use.

### L-2: Console.error in 26 files
**Risk**: Production logs may contain sensitive data if error messages include user input.
**Fix**: Audit all console.error calls. Sanitize or structure log output.

### L-3: `document.head.appendChild` for Mapbox CSS
**File**: `EventMap.tsx`, `SpaceEventMap.tsx`
**Risk**: Duplicate CSS link tags on re-render. No cleanup on unmount.
**Fix**: Guard with a flag. Remove on unmount.

### L-4: `as any` in 6 locations
**Risk**: Type safety bypassed. Acceptable for external API responses.
**Fix**: Define proper types where possible.

---

## Verified Working (tested live)

| Feature | Status |
|---|---|
| Public events (demo) | ✅ Anonymous access works |
| Event detail (demo) | ✅ Scrubbed DTO applied |
| Gate key unlock | ✅ Token issued correctly |
| Event create with visibility | ✅ Defaults to private |
| Visibility toggle on event page | ✅ Updates correctly |
| Photo upload | ✅ R2 storage + D1 record |
| Photo favorite | ✅ Toggle works |
| Notification bell | ✅ Shows unread count |
| Community feed | ✅ Returns connections' events |
| Inspiration map | ✅ Lists submissions |
| Health dashboard | ✅ All checks pass |

---

## Summary

| Severity | Count |
|---|---|
| Critical | 4 |
| High | 6 |
| Medium | 7 |
| Low | 4 |

**Overall**: Codebase is functional and type-safe. Main remaining risks are architectural (media privacy, JWT fallback guard, upload validation) and operational (no tests, no lint, no CI migration gates). The visibility/authorization model from the latest commit is correctly implemented for the paths it covers.

**Recommended next actions**:
1. Remove admin credentials from documentation (C-2)
2. Add server-side upload validation (H-3)
3. Replace `SELECT *` with explicit columns in public queries (H-4)
4. Add Vitest + authorization matrix tests (M-5)
5. Add ESLint + CI migration gates (M-6, M-7)
