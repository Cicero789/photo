import type { AlbumRow } from '@framenest/shared';
import type { AlbumResponse } from '@framenest/shared';

export function serializeAlbum(row: AlbumRow & { photo_count?: number }): AlbumResponse {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    shareToken: row.share_token,
    hasPassword: !!row.password,
    allowDownloads: row.allow_downloads === 1,
    expiresAt: row.expires_at ?? null,
    viewCount: row.view_count,
    photoCount: row.photo_count ?? 0,
    createdAt: row.created_at,
  };
}
