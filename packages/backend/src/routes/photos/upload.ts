import { json } from '../../lib/response.js';
import { isAppError, Errors, generateId, PHOTO_MIME_TYPES, MAX_PHOTO_BYTES } from '@framenest/shared';
import { requireAuth } from '../../middleware/auth.js';
import { validateUploadContent, rejectOversizedRequest } from '../../lib/upload-validate.js';

export async function onRequestPost(context: { request: Request; env: { DB: D1Database; PHOTOS: R2Bucket } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return auth;

    // Check content-length early
    const tooLarge = rejectOversizedRequest(context.request, MAX_PHOTO_BYTES * 10);
    if (tooLarge) return tooLarge;

    const contentType = context.request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return json({ error: 'Expected multipart/form-data', code: 'VALIDATION' }, 400);
    }

    const form = await context.request.formData();
    const eventId = (form.get('eventId') as string) || '';
    const files = form.getAll('files').filter(f => typeof f !== 'string') as unknown as File[];

    if (!eventId) return json({ error: 'eventId is required', code: 'VALIDATION' }, 400);
    if (files.length === 0) return json({ error: 'No files provided', code: 'VALIDATION' }, 400);

    // Verify event ownership
    const event = await context.env.DB.prepare('SELECT id, space_id FROM events WHERE id = ? AND deleted_at IS NULL').bind(eventId).first<{ id: string; space_id: string }>();
    if (!event) return json({ error: 'Event not found', code: 'NOT_FOUND' }, 404);
    if (event.space_id !== auth.actor.spaceId && auth.actor.role !== 'platform_owner') {
      return json({ error: 'Not authorized', code: 'FORBIDDEN' }, 403);
    }

    const results: Array<{ id: string; storageKey: string; url: string; filename: string }> = [];

    for (const file of files) {
      if (!PHOTO_MIME_TYPES.has(file.type)) {
        return json({ error: `Unsupported type: ${file.type}`, code: 'UNSUPPORTED_TYPE' }, 415);
      }
      if (file.size > MAX_PHOTO_BYTES) return json(Errors.tooLarge(MAX_PHOTO_BYTES).toJSON(), 413);

      const contentCheck = await validateUploadContent(file);
      if (!contentCheck.valid) return json({ error: contentCheck.reason, code: 'VALIDATION' }, 400);

      const photoId = generateId('photo');
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const storageKey = `events/${eventId}/${photoId}.${ext}`;

      await context.env.PHOTOS.put(storageKey, file.stream(), {
        httpMetadata: { contentType: file.type, contentDisposition: `inline; filename="${file.name}"` },
        customMetadata: { uploaded_by: auth.actor.userId, event_id: eventId },
      });

      await context.env.DB.prepare(
        'INSERT INTO photos (id, event_id, space_id, original_filename, storage_key, width, height, file_size, uploaded_by, created_at) VALUES (?,?,?,?,?,?,?,?,?,datetime(\'now\'))'
      ).bind(photoId, eventId, auth.actor.spaceId, file.name, storageKey, 0, 0, file.size, auth.actor.userId).run();

      // Set cover photo if first upload
      const currentCover = await context.env.DB.prepare('SELECT cover_photo_id FROM events WHERE id = ?').bind(eventId).first<{ cover_photo_id: string | null }>();
      if (!currentCover?.cover_photo_id) {
        await context.env.DB.prepare('UPDATE events SET cover_photo_id = ? WHERE id = ?').bind(photoId, eventId).run();
      }

      results.push({ id: photoId, storageKey, url: `/api/media/photos/${storageKey}`, filename: file.name });
    }

    return json({ photos: results }, 201);
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}
