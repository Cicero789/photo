import { json } from '../../lib/response.js';
import { createEventSchema, Errors, isAppError } from '@framenest/shared';
import { requireAuth } from '../../middleware/auth.js';
import { EventService } from '../../services/event-service.js';
import { EventRepo } from '../../repos/event-repo.js';
import { PhotoRepo } from '../../repos/photo-repo.js';
import { serializeEvent } from '../../serializers/event.js';

export async function onRequestGet(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    const url = new URL(context.request.url);
    const spaceId = url.searchParams.get('spaceId') || (auth instanceof Response ? '' : auth.actor.spaceId);
    const category = url.searchParams.get('category') || undefined;
    const year = url.searchParams.get('year') ? parseInt(url.searchParams.get('year')!) : undefined;

    const service = new EventService(new EventRepo(context.env.DB), new PhotoRepo(context.env.DB));
    const actor = auth instanceof Response ? { userId: '', spaceId: '', role: 'viewer' as const, sessionId: '' } : auth.actor;

    const events = await service.listBySpace(actor, spaceId, { category, year });
    return json({ events: events.map(e => serializeEvent({ ...e, photo_count: 0 })) });
  } catch (err) {
    if (isAppError(err)) return json(err.toJSON(), err.status);
    throw err;
  }
}

export async function onRequestPost(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return auth;

    const body = await context.request.json();
    const parsed = createEventSchema.safeParse(body);
    if (!parsed.success) return json(Errors.validation(parsed.error.issues).toJSON(), 400);

    const service = new EventService(new EventRepo(context.env.DB), new PhotoRepo(context.env.DB));
    const event = await service.create(auth.actor, parsed.data);

    return json({ event: serializeEvent({ ...event, photo_count: 0 }) }, 201);
  } catch (err) {
    if (isAppError(err)) return json(err.toJSON(), err.status);
    throw err;
  }
}
