import type { PhotoRow } from '@framenest/shared';
import type { PhotoResponse } from '@framenest/shared';

export function serializePhoto(row: PhotoRow & { url?: string; thumbnail_url_val?: string }): PhotoResponse {
  return {
    id: row.id,
    eventId: row.event_id,
    spaceId: row.space_id,
    originalFilename: row.original_filename,
    storageKey: row.storage_key,
    url: row.url ?? '',
    thumbnailUrl: row.thumbnail_url_val ?? row.thumbnail_key ?? null,
    width: row.width,
    height: row.height,
    fileSize: row.file_size,
    latitude: row.latitude ?? null,
    longitude: row.longitude ?? null,
    takenAt: row.taken_at ?? null,
    uploadedBy: row.uploaded_by,
    favorite: row.favorite === 1,
    license: row.license,
    createdAt: row.created_at,
  };
}

export function serializePhotoPublic(row: PhotoRow): Partial<PhotoResponse> {
  return {
    id: row.id,
    eventId: row.event_id,
    url: row.storage_key ? `/api/media/photos/${row.storage_key}` : '',
    width: row.width,
    height: row.height,
    license: row.license,
  };
}

export function serializeVideo(row: {
  id: string; event_id: string; space_id: string; original_filename: string;
  storage_key: string; thumbnail_key: string | null; duration: number;
  file_size: number; uploaded_by: string; created_at: string; url?: string;
}) {
  return {
    id: row.id,
    eventId: row.event_id,
    spaceId: row.space_id,
    originalFilename: row.original_filename,
    storageKey: row.storage_key,
    url: row.url ?? '',
    thumbnailUrl: row.thumbnail_key ?? null,
    duration: row.duration,
    fileSize: row.file_size,
    uploadedBy: row.uploaded_by,
    createdAt: row.created_at,
  };
}
