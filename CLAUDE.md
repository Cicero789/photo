# CLAUDE.md — FrameNest Photo Platform

## Quick Context
- **Production**: https://framenest.photos (Cloudflare Pages, project: `photo`)
- **GitHub**: `Cicero789/photo` (main branch)
- **Stack**: React 19 + TypeScript + Tailwind CSS v4 / Cloudflare Pages Functions / D1 + R2

## Commands
```bash
npm run build          # tsc -b && vite build → dist/
npm run dev            # Vite dev server → localhost:3000
npm run deploy         # wrangler pages deploy ./dist --project-name photo --branch main
npx wrangler d1 execute photo-db --remote --file=./db/schema.sql  # Push schema
npx wrangler pages secret put <NAME> --project-name photo          # Set secrets
```

## Architecture

### Frontend (src/)
- `src/App.tsx` — all routes (13 pages)
- `src/pages/` — page components
- `src/components/` — reusable: auth/, events/, layout/, map/, photos/, videos/
- `src/hooks/useAuth.tsx` — AuthContext + login/signup/logout
- `src/lib/api.ts` — fetch wrapper with JWT token injection
- `src/types/index.ts` — TypeScript interfaces

### Backend (functions/)
- `functions/_middleware.ts` — CORS, CSP, CSRF, security headers
- `functions/lib/` — auth, jwt, password, db, deepseek, email, geocode, rate-limit, validate
- `functions/api/` — 28 REST endpoints (file-based routing)

### Database (D1)
- 11 tables: users, spaces, events, photos, videos, ad_tiles, photographers, space_members, rate_limits, password_resets
- D1 ID: `075806fa-1702-4c71-84c3-7ac84aeb4c33`
- Account ID: `aa63e05af724df04d81cce575ffdfa5b`

### Storage (R2)
- `photo-uploads` (PHOTOS binding), `video-uploads` (VIDEOS binding)

## Auth Model
- Roles: platform_owner(4) > page_admin(3) > staff(2) > viewer(1)
- JWT with HMAC-SHA256, PBKDF2 password hashing
- Gate key = viewer access to a space
- Admin: admin@photo.app / Admin123!@# (platform_owner)

## Key Patterns
- All API endpoints use `requireAuth()` + `requireRole()` from `functions/lib/auth.ts`
- Photos served via `/api/media/photos/<storageKey>` (not raw R2 URLs)
- Event addresses geocoded via Mapbox on create/update
- Every 9th tile in EventGrid is an ad tile
- Filerobot editor is lazy-loaded (dynamic import)
- SpaceEventMap caches Mapbox globally, reuses map instance

## .env (gitignored — never commit)
Contains: DEEPSEEK_API_KEY, MAPBOX_API_KEY, CLOUDFLARE_API_KEY, CLOUDFLARED1R1_API_KEY, ZOHO_API_KEY, GITHUB_API_KEY

## Git Workflow for Multi-AI
1. `git pull origin main` before starting any work
2. Work on a feature branch: `git checkout -b feat/your-feature`
3. Commit often with clear messages
4. `git pull origin main` again before pushing
5. Push to your branch, merge to main via PR
6. Other AI: `git pull origin main` before starting

## Never Do
- Commit .env or secrets
- Use `eval()`, `innerHTML`, or raw SQL concatenation
- Skip role checks on new endpoints
- Hardcode API keys in source (use env/secrets)
- Change the auth model without updating all endpoints
