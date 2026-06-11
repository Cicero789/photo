# 📸 Photo

**A home for every moment.** Multi-tenant photo & video event platform for families and businesses. Built with React, Cloudflare Pages, D1, and R2.

---

## Architecture

```
photo/
├── src/                          # Frontend (React 19 + TypeScript + Tailwind CSS v4)
│   ├── components/
│   │   ├── auth/                 # ProtectedRoute, AuthProvider
│   │   ├── events/               # EventTile, EventGrid, CreateEventModal
│   │   ├── layout/               # MainLayout, Navbar, Footer
│   │   ├── map/                  # EventMap (Mapbox GL JS)
│   │   ├── photos/               # PhotoUploader (client-side resize + EXIF)
│   │   └── videos/               # VideoUploader (client-side Canvas+MediaRecorder)
│   ├── hooks/                    # useAuth (context + login/signup/logout)
│   ├── lib/                      # api, constants, exif, utils
│   ├── pages/                    # 11 pages (see Routes below)
│   └── types/                    # TypeScript interfaces
│
├── functions/                    # Backend (Cloudflare Pages Functions)
│   ├── _middleware.ts            # CORS + request preprocessing
│   ├── lib/                      # password, jwt, db, deepseek, response
│   └── api/
│       ├── admin/ads.ts          # Ad tile CRUD (platform_owner)
│       ├── ads.ts                # GET public active ads
│       ├── auth/                 # signup, login, me, logout, gate
│       ├── events/               # CRUD + AI summarize
│       ├── photographers/        # Apply + admin review + public listing
│       ├── photos/upload.ts      # Multipart → R2
│       ├── spaces/               # CRUD + members management
│       └── videos/upload.ts      # Multipart → R2 VIDEOS
│
├── db/schema.sql                 # D1 schema (7 tables)
├── wrangler.toml                 # Cloudflare Pages + D1 + R2 config
├── .env                          # API keys (gitignored)
└── package.json                  # React 19, Router 7, TanStack Query, Tailwind v4
```

## Routes

| Path | Auth | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public | Sign in |
| `/signup` | Public | Create space |
| `/photographers` | Public | Photographer signup + directory |
| `/s/:spaceSlug` | Gate Key | Public space viewer (password-protected) |
| `/s/:spaceSlug/e/:eventId` | Gate Key | Event detail with photos, videos, map |
| `/dashboard` | User | Space dashboard (Events, Members, Settings) |
| `/dashboard/events/:eventId` | User | Event detail with upload |
| `/admin/ads` | Owner | Ad tile management |
| `/admin/photographers` | Owner | Review photographer applications |

## Features

### Multi-Tenant Spaces
- Each user creates a "space" (family or business site)
- Unique URL slug (`photo.app/s/johnson-family`)
- Password-protected "gate key" for viewers
- Custom domain support
- Theme color customization

### Roles
- **Platform Owner** — Full backend access, ad management, application review
- **Page Admin** — Space owner, can add members, manage events
- **Staff** — Can upload and manage events within a space
- **Viewer** — Needs gate key to view a space

### Events
- 16 categories with emoji + color badges (holiday, birthday, wedding, etc.)
- Tile grid display (3-column responsive)
- Event detail page with photos, videos, and map
- Delete with cascade (removes all associated photos/videos)

### Photo Upload
- Drag-and-drop or file picker
- Client-side Canvas resize (max 1920px, JPEG 82% quality)
- EXIF GPS extraction for Mapbox map
- Max 100MB input → ~1-2MB output
- R2 storage: `{spaceId}/{eventId}/{photoId}.jpg`
- Auto-set as event cover photo

### Video Upload
- Duration validation (< 60 seconds)
- Client-side compression via Canvas + MediaRecorder
- Re-encoded to WebM VP9 at ~2 Mbps (720p)
- YouTube-quality web display
- R2 VIDEOS bucket storage

### AI Summaries (DeepSeek)
- Auto-generated on event creation (async)
- Manual regenerate button on event detail page
- 2-4 sentence warm, emotional summaries
- Displayed on event tiles and detail pages

### Map (Mapbox)
- Photos with GPS metadata displayed on interactive map
- Photo markers with click-to-preview
- Auto-fit bounds for all geotagged photos
- Location badge on geotagged photos in grid

### Ad Tiles (Monetization)
- Every 9th tile in any event grid is an ad
- Platform owner creates/manages ads in admin dashboard
- Support: image ads, link ads, message ads
- Enable/disable toggle per ad

### Photographer Network
- Public signup form with portfolio link
- Admin review (approve/reject)
- Public directory of approved photographers

## API Endpoints

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create user + space |
| POST | `/api/auth/login` | No | Email + password → JWT |
| GET | `/api/auth/me` | Token | Current user info |
| POST | `/api/auth/logout` | No | Client-side token discard |
| POST | `/api/auth/gate` | No | Verify gate key → viewer token |

### Spaces
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/spaces/:slug` | No | Public space info |
| PUT | `/api/spaces/:slug` | Token | Update space settings |
| GET | `/api/spaces/members` | Token | List members |
| POST | `/api/spaces/members` | Token | Add staff/viewer |
| DELETE | `/api/spaces/members?id=` | Token | Remove member |

### Events
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/events` | Token | List user's events |
| GET | `/api/events?spaceId=` | No | List space's events (public) |
| POST | `/api/events` | Token | Create event (+ AI summary) |
| GET | `/api/events/:id` | No | Event detail + photos + videos |
| PUT | `/api/events/:id` | Token | Update event |
| DELETE | `/api/events/:id` | Token | Delete event (cascade) |
| POST | `/api/events/summarize` | Token | Regenerate AI summary |

### Photos & Videos
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/photos/upload` | Token | Multipart upload → R2 |
| POST | `/api/videos/upload` | Token | Multipart upload → R2 VIDEOS |

### Ads
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/ads` | No | List active ads |
| GET | `/api/admin/ads` | Owner | List all ads |
| POST | `/api/admin/ads` | Owner | Create ad |
| PUT | `/api/admin/ads` | Owner | Update ad |
| DELETE | `/api/admin/ads?id=` | Owner | Delete ad |

### Photographers
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/photographers/public` | No | List approved |
| POST | `/api/photographers` | No | Submit application |
| GET | `/api/photographers` | Owner | List all (admin) |
| PUT | `/api/photographers` | Owner | Approve/reject |

## Database (D1)

7 tables: `users`, `spaces`, `events`, `photos`, `videos`, `ad_tiles`, `photographers`, `space_members`

Full schema in `db/schema.sql`.

## Getting Started

```bash
# Install
npm install

# Local dev (frontend only)
npm run dev                # → http://localhost:3000

# Build
npm run build              # tsc + vite build → dist/

# Deploy to Cloudflare
npm run deploy             # wrangler pages deploy ./dist

# D1 setup
npx wrangler d1 create photo-db
npx wrangler d1 execute photo-db --local --file=./db/schema.sql
```

## Environment Variables & Secrets

Cloudflare Pages Functions do **not** read `.env` — production secrets must be
set with wrangler (or in the Pages dashboard → Settings → Variables):

```bash
wrangler pages secret put JWT_SECRET --project-name photo        # 32+ chars, signs auth tokens
wrangler pages secret put DEEPSEEK_API_KEY --project-name photo  # AI summaries
wrangler pages secret put RESEND_API_KEY --project-name photo    # password-reset email
wrangler pages secret put EMAIL_FROM --project-name photo        # optional, see Email below
```

A local `.env` (gitignored, see `.env.example`) is only for your own tooling
and local frontend keys — it never reaches the deployed Functions.

**⚠️ Never commit `.env` to version control.** It is in `.gitignore`.

## Email (password reset)

Outgoing email uses [Resend](https://resend.com) (`functions/lib/email.ts`).
The old MailChannels fallback was removed — its free Cloudflare Workers API
shut down in August 2024.

1. Create a free Resend account (3,000 emails/month) and an API key, then
   `wrangler pages secret put RESEND_API_KEY --project-name photo`.
2. Without a verified domain, mail is sent from `onboarding@resend.dev` and
   can only be delivered to **your own** Resend account email — fine for
   testing, not for real users.
3. To email real users, verify a domain you own in Resend (it gives you
   SPF/DKIM DNS records to add in Cloudflare), then set
   `EMAIL_FROM="Photo <no-reply@yourdomain.com>"` as a Pages secret.
   A `*.pages.dev` address can never be verified — Cloudflare owns that DNS —
   so a custom domain is required for production email.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite 6 |
| Routing | React Router 7 |
| State | TanStack Query 5, React Context |
| Backend | Cloudflare Pages Functions |
| Database | Cloudflare D1 (SQLite) |
| Storage | Cloudflare R2 (photos + videos) |
| AI | DeepSeek API (chat completions) |
| Maps | Mapbox GL JS |
| Auth | PBKDF2 password hashing, JWT (HMAC-SHA256) |

## Security

- Passwords hashed with PBKDF2 (100K iterations, SHA-256, 16-byte salt)
- JWT tokens signed with HMAC-SHA256 (7-day expiry)
- Gate keys hashed same as passwords
- Parameterized SQL queries (no SQL injection)
- `.env` gitignored
- **TODO before production**: Move JWT secret to Cloudflare secret, add rate limiting, use public Mapbox token (pk.*) for frontend

---

Built with ❤️ for families and photographers.
