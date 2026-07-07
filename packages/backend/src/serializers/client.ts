import type { ClientSiteRow, BlogPostRow, ClientGalleryRow } from '@framenest/shared';
import type { ClientSiteResponse, BlogPostResponse, ClientGalleryResponse } from '@framenest/shared';

export function serializeClientSite(row: ClientSiteRow & { blog_count?: number; gallery_count?: number }): ClientSiteResponse {
  return {
    id: row.id,
    professionalId: row.professional_id,
    name: row.name,
    slug: row.slug,
    industryId: row.industry_id ?? null,
    customDomain: row.custom_domain ?? null,
    content: safeParseJson(row.content),
    templateConfig: safeParseJson(row.template_config),
    setupFeeCents: row.setup_fee_cents,
    monthlyFeeCents: row.monthly_fee_cents,
    published: row.published === 1,
    blogCount: row.blog_count ?? 0,
    galleryCount: row.gallery_count ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function serializeBlogPost(row: BlogPostRow): BlogPostResponse {
  return {
    id: row.id,
    clientSiteId: row.client_site_id,
    title: row.title,
    slug: row.slug,
    body: row.body,
    featuredImage: row.featured_image ?? null,
    published: row.published === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function serializeGallery(row: ClientGalleryRow & { photo_count?: number }): ClientGalleryResponse {
  return {
    id: row.id,
    clientSiteId: row.client_site_id,
    name: row.name,
    photoCount: row.photo_count ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function safeParseJson(val: string): Record<string, unknown> {
  try { return JSON.parse(val); } catch { return {}; }
}
