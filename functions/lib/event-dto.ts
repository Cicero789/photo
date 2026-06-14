/** Scrubs sensitive fields from public API responses. */
type Row = Record<string, unknown>;

export function toPublicEventDto(e: Row) {
  return {
    id: e.id, title: e.title, category: e.category, eventDate: e.event_date,
    description: e.description, aiSummary: e.ai_summary,
    visibility: "public" as const,
    address: (e.address_locked as number) ? null : (e.address || null),
    latitude: null, longitude: null, // Never expose exact GPS publicly
    photoCount: (e as any).photoCount ?? 0,
  };
}

export function toPublicPhotoDto(p: Row) {
  return {
    id: p.id, url: `/api/media/photos/${p.storage_key}`,
    width: p.width, height: p.height, license: (p.license as string) || "personal",
  };
}
