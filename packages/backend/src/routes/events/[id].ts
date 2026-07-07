import { json } from '../../lib/response.js';
import { isAppError } from '@framenest/shared';
import { requireAuth } from '../../middleware/auth.js';
import { EventRepo } from '../../repos/event-repo.js';
import { PhotoRepo } from '../../repos/photo-repo.js';
import { serializeEvent } from '../../serializers/event.js';

export async function onRequestGet(context: { request: Request; env: { DB: D1Database }; params: { id: string } }): Promise<Response> {
  try {
    const repo = new EventRepo(context.env.DB);
    const event = await repo.getById(context.params.id);
    if (!event) return json({ error: 'Event not found', code: 'NOT_FOUND' }, 404);
    const photos = await new PhotoRepo(context.env.DB).listByEvent(context.params.id);
    const serializedPhotos = photos.map(p => ({
      id: p.id, eventId: p.event_id, originalFilename: p.original_filename,
      storageKey: p.storage_key, url: `/api/media/photos/${p.storage_key}`,
      thumbnailUrl: p.thumbnail_key, width: p.width, height: p.height,
      fileSize: p.file_size, favorite: p.favorite === 1, license: p.license,
      createdAt: p.created_at,
    }));
    return json({ event: serializeEvent({ ...event, photo_count: photos.length }), photos: serializedPhotos });
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}

export async function onRequestDelete(context: { request: Request; env: { DB: D1Database }; params: { id: string } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return auth;
    const eventRepo = new EventRepo(context.env.DB);
    const event = await eventRepo.getById(context.params.id);
    if (!event) return json({ error: 'Event not found', code: 'NOT_FOUND' }, 404);
    if (event.space_id !== auth.actor.spaceId && auth.actor.role !== 'platform_owner') {
      return json({ error: 'Not authorized', code: 'FORBIDDEN' }, 403);
    }
    const photoRepo = new PhotoRepo(context.env.DB);
    const photos = await photoRepo.listByEvent(context.params.id);
    const batchOps = photos.map(p => ({ sql: "UPDATE photos SET deleted_at = datetime('now') WHERE id = ?", params: [p.id] }));
    batchOps.push({ sql: "UPDATE events SET deleted_at = datetime('now') WHERE id = ?", params: [context.params.id] });
    await eventRepo.batch(batchOps);
    return json({ success: true });
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}
