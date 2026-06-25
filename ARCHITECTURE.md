# FrameNest Architecture & Contracts

## API Naming Convention
- **All API routes use BASE**: `/api` prefix
- **Resource names are SINGULAR**: `/client`, `/blog`, `/gallery` (not `/clients`, `/blogs`)
- **Public endpoints**: `/api/client/public/:slug`, `/api/blog/:siteSlug/:postSlug`
- **Owner endpoints**: `/api/client`, `/api/client/:id`, `/api/client/:id/blog`

---

## ROUTE MAP

### Client Sites
| Method | Path | Handler | Auth | Returns |
|--------|------|---------|------|---------|
| GET | `/api/client` | clients/index.ts | requireAuth | `{ clients: ClientSiteSummary[] }` |
| POST | `/api/client` | clients/index.ts | requireAuth | `{ id, slug }` |
| GET | `/api/client/:id` | clients/[id].ts | requireAuth | `{ client: ClientSiteDetail }` |
| PUT | `/api/client/:id` | clients/[id].ts | requireAuth | `{ success, id }` |
| DELETE | `/api/client/:id` | clients/[id].ts | requireAuth | `{ success }` |
| GET | `/api/client/public/:slug` | clients/public/[slug].ts | None | `{ name, content, galleryConfig, blogs, galleries }` |

### Blog
| Method | Path | Handler | Auth | Returns |
|--------|------|---------|------|---------|
| GET | `/api/client/:id/blog` | clients/[id]/blog/index.ts | requireAuth | `{ blogs: BlogPostDto[] }` |
| POST | `/api/client/:id/blog` | clients/[id]/blog/index.ts | requireAuth | `{ id }` |
| PUT | `/api/client/:id/blog/:postId` | clients/[id]/blog/[postId].ts | requireAuth | `{ success }` |
| DELETE | `/api/client/:id/blog/:postId` | clients/[id]/blog/[postId].ts | requireAuth | `{ success }` |
| GET | `/api/blog/:siteSlug/:postSlug` | blog/[siteSlug]/[postSlug].ts | None | `{ post }` |

### Galleries
| Method | Path | Handler | Auth | Returns |
|--------|------|---------|------|---------|
| GET | `/api/client/:id/gallery` | clients/[id]/galleries/index.ts | requireAuth | `{ galleries }` |
| POST | `/api/client/:id/gallery` | clients/[id]/galleries/index.ts | requireAuth | `{ id }` |
| PUT | `/api/client/:id/gallery/:gid` | clients/[id]/galleries/[gid].ts | requireAuth | `{ success }` |
| DELETE | `/api/client/:id/gallery/:gid` | clients/[id]/galleries/[gid].ts | requireAuth | `{ success }` |
| POST | `/api/client/:id/gallery/:gid/photo` | clients/[id]/galleries/[gid].ts | requireAuth | `{ uploaded }` |
| GET | `/api/client/public/:slug/gallery/:gid` | clients/public/[slug]/galleries/[gid].ts | None | `{ photos }` |

### Photo Pool
| Method | Path | Handler | Auth | Returns |
|--------|------|---------|------|---------|
| POST | `/api/client/:id/photo` | clients/[id]/photos.ts | requireAuth | `{ uploaded, photos }` |

---

## DTO CONTRACTS

### ClientSiteSummary
```typescript
interface ClientSiteSummary {
  id: string;
  name: string;
  slug: string;
  industryId: string | null;
  customDomain: string | null;
  status: "draft" | "published";
  blogCount: number;
  galleryCount: number;
  updatedAt: string;
}
```

### ClientSiteDetail extends ClientSiteSummary
```typescript
interface ClientSiteDetail {
  id: string;
  name: string;
  slug: string;
  industryId: string | null;
  customDomain: string | null;
  status: "draft" | "published";
  galleryConfig: { template?: string; colorScheme?: string; fontPairing?: string };
  content: ClientSiteContent;
  blogCount: number;
  galleryCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### ClientSiteContent
```typescript
interface ClientSiteContent {
  bio: string;
  services: string;    // plain text, line-separated
  pricing: string;     // plain text
}
```

### CreateClientSiteInput
```typescript
interface CreateClientSiteInput {
  name: string;
  slug: string;
  industryId: string;
}
```

### UpdateClientSiteInput
```typescript
interface UpdateClientSiteInput {
  name?: string;
  slug?: string;
  customDomain?: string;
  published?: boolean;
  content?: ClientSiteContent;
  galleryConfig?: { template?: string; colorScheme?: string; fontPairing?: string };
}
```

### BlogPostDto
```typescript
interface BlogPostDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;       // DB: excerpt
  content: string;       // DB: body
  coverImageUrl: string | null;  // DB: featured_image
  status: "draft" | "published"; // DB: published (0/1)
  publishedAt: string | null;    // DB: published_at
  createdAt: string;
  updatedAt: string;
}
```

### SaveBlogPostInput
```typescript
interface SaveBlogPostInput {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  coverImageUrl?: string | null;
  status?: "draft" | "published";
}
```

### GalleryDto
```typescript
interface GalleryDto {
  id: string;
  name: string;
  photoCount: number;
  coverUrl: string | null;
  createdAt: string;
}
```

---

## DATABASE COLUMN MAP

### client_sites
| Column | Type | DTO Field | Notes |
|--------|------|-----------|-------|
| id | TEXT PK | id | |
| photographer_id | TEXT | (auth only) | FK → users.id |
| name | TEXT | name | |
| slug | TEXT UNIQUE | slug | |
| industry_id | TEXT | industryId | |
| custom_domain | TEXT | customDomain | |
| gallery_config | TEXT (JSON) | galleryConfig | |
| content | TEXT (JSON) | content | |
| published | INTEGER (0/1) | status | 1→"published", 0→"draft" |
| deleted_at | TEXT | (internal) | Soft delete |
| created_at | TEXT | createdAt | |
| updated_at | TEXT | updatedAt | |

### blog_posts
| Column | Type | DTO Field | Notes |
|--------|------|-----------|-------|
| id | TEXT PK | id | |
| client_site_id | TEXT | (internal) | |
| title | TEXT | title | |
| slug | TEXT | slug | |
| excerpt | TEXT | excerpt | |
| body | TEXT | content | DB name is "body", DTO name is "content" |
| featured_image | TEXT | coverImageUrl | DB name is "featured_image", DTO "coverImageUrl" |
| published | INTEGER | status | 1→"published", 0→"draft" |
| published_at | TEXT | publishedAt | |
| deleted_at | TEXT | (internal) | |
| created_at | TEXT | createdAt | |
| updated_at | TEXT | updatedAt | |

### client_galleries
| Column | Type | DTO Field | Notes |
|--------|------|-----------|-------|
| id | TEXT PK | id | |
| client_site_id | TEXT | (internal) | |
| name | TEXT | name | |
| slug | TEXT | slug | |
| deleted_at | TEXT | (internal) | |
| created_at | TEXT | createdAt | |
| updated_at | TEXT | updatedAt | |

### client_gallery_photos
| Column | Type | DTO Field | Notes |
|--------|------|-----------|-------|
| gallery_id | TEXT PK | (internal) | FK |
| storage_key | TEXT PK | (internal) | R2 key |
| caption | TEXT | caption | |
| sort_order | INTEGER | sortOrder | |
| uploaded_at | TEXT | uploadedAt | |
| deleted_at | TEXT | (internal) | |

---

## FRONTEND ROUTE MAP

| Route | Page | Auth |
|-------|------|------|
| `/site/:slug` | ClientSitePage | Public |
| `/blog/:siteSlug/:postSlug` | ClientBlogPostPage | Public |
| `/clients` | ClientsPage | Pro photographer |
| `/clients/:id/edit` | ClientEditorPage | Pro photographer |

---

## NAMING RULES (DO NOT VIOLATE)

1. **API paths are SINGULAR**: `/client`, `/blog`, `/gallery`, `/photo`
2. **DTO fields are camelCase**: `industryId`, `coverImageUrl`, `publishedAt`
3. **DB columns are snake_case**: `industry_id`, `featured_image`, `published_at`
4. **Status is always "draft" | "published"** (never 0/1 in DTO)
5. **Frontend calls api.get/post/put/delete with path starting with `/client`**
6. **Auth checks verify real user, not gate viewer, for client management**
7. **All public queries filter `deleted_at IS NULL`**
8. **Content is stored as JSON string, parsed on read**

---

## RESERVED SLUGS (rejected by all slug creation endpoints)
```
admin, albums, api, blog, citysite, client, clients, dashboard,
forgot-password, inspiration, login, photographers, reset-password,
s, signup, site, mockups, thumbnails, album
```
