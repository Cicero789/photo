import type { InspirationRow } from '@framenest/shared';
import type { InspirationResponse } from '@framenest/shared';

export function serializeInspiration(row: InspirationRow & { user_name?: string }): InspirationResponse {
  return {
    id: row.id,
    userId: row.user_id,
    userName: row.user_name ?? '',
    photoUrl: row.photo_url ?? null,
    thumbnailUrl: row.thumbnail_url || null,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    category: row.category,
    season: row.season,
    tips: row.tips,
    bestTime: row.best_time,
    permissionInfo: row.permission_info,
    loveCount: row.love_count,
    source: row.source,
    score: row.score,
    author: row.author,
    licenseUrl: row.license_url,
    createdAt: row.created_at,
  };
}
