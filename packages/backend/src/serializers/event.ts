import type { EventRow } from '@framenest/shared';
import type { EventResponse } from '@framenest/shared';

export function serializeEvent(row: EventRow & { photo_count?: number; cover_url?: string }): EventResponse {
  return {
    id: row.id,
    spaceId: row.space_id,
    title: row.title,
    category: row.category,
    eventDate: row.event_date,
    description: row.description,
    aiSummary: row.ai_summary ?? null,
    coverPhotoId: row.cover_photo_id ?? null,
    coverPhotoUrl: row.cover_url ?? null,
    photoCount: row.photo_count ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    address: row.address,
    addressLocked: row.address_locked === 1,
    latitude: row.latitude ?? null,
    longitude: row.longitude ?? null,
    visibility: row.visibility,
  };
}

export function serializeEventPublic(row: EventRow): Partial<EventResponse> {
  // Scrubbed version for non-owners
  return {
    id: row.id,
    spaceId: row.space_id,
    title: row.title,
    category: row.category,
    eventDate: row.event_date,
    description: row.description,
    aiSummary: row.ai_summary ?? null,
    coverPhotoUrl: null,
    photoCount: 0,
    address: row.address_locked ? '' : row.address,
    visibility: row.visibility,
  };
}
