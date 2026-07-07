import type { ProfessionalRow } from '@framenest/shared';
import type { ProfessionalResponse } from '@framenest/shared';

export function serializeProfessional(row: ProfessionalRow): ProfessionalResponse {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    website: row.website ?? null,
    serviceArea: row.service_area ?? null,
    bio: row.bio ?? null,
    status: row.status,
    slug: row.slug ?? null,
    specialties: safeParseJsonArray(row.specialties),
    tagline: row.tagline,
    verified: row.verified === 1,
    verifiedAt: row.verified_at ?? null,
    featured: row.featured === 1,
    profileViews: row.profile_views,
    heroPhotos: safeParseJsonArray(row.hero_photos),
    stripeConfig: safeParseJson(row.stripe_config),
    pricingConfig: safeParseJson(row.pricing_config),
    templateConfig: safeParseJson(row.template_config),
    subscriptionStatus: row.subscription_status,
    createdAt: row.created_at,
  };
}

export function serializeProfessionalPublic(row: ProfessionalRow): Partial<ProfessionalResponse> {
  return {
    id: row.id,
    name: row.name,
    website: row.website ?? null,
    serviceArea: row.service_area ?? null,
    bio: row.bio ?? null,
    slug: row.slug ?? null,
    specialties: safeParseJsonArray(row.specialties),
    tagline: row.tagline,
    verified: row.verified === 1,
    featured: row.featured === 1,
    profileViews: row.profile_views,
    heroPhotos: safeParseJsonArray(row.hero_photos),
    pricingConfig: safeParseJson(row.pricing_config),
    templateConfig: safeParseJson(row.template_config),
  };
}

function safeParseJson(val: string): Record<string, unknown> {
  try { return JSON.parse(val); } catch { return {}; }
}

function safeParseJsonArray(val: string): string[] {
  try { const parsed = JSON.parse(val); return Array.isArray(parsed) ? parsed : []; } catch { return []; }
}
