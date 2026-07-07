import { Errors, generateId } from '@framenest/shared';
import type { EventRow } from '@framenest/shared';
import { EventRepo } from '../repos/event-repo.js';
import { PhotoRepo } from '../repos/photo-repo.js';
import { log } from '../lib/logger.js';
import type { Actor } from '../middleware/auth.js';

export class EventService {
  constructor(
    private eventRepo: EventRepo,
    private photoRepo: PhotoRepo,
    private photosBucket?: R2Bucket,
  ) {}

  async create(actor: Actor, input: {
    title: string; category: string; eventDate?: string; description?: string;
    address?: string; visibility?: string; latitude?: number; longitude?: number;
  }): Promise<EventRow> {
    const id = generateId('event');
    const eventDate = input.eventDate || new Date().toISOString().split('T')[0]!;

    await this.eventRepo.create({
      id, space_id: actor.spaceId, title: input.title, category: input.category,
      event_date: eventDate, description: input.description, address: input.address,
      visibility: input.visibility ?? 'private',
      latitude: input.latitude, longitude: input.longitude,
    });

    log({ level: 'info', message: 'Event created', actor: actor.userId, action: 'event_created', metadata: { eventId: id, title: input.title } });

    return (await this.eventRepo.getById(id))!;
  }

  async getById(actor: Actor, eventId: string): Promise<EventRow & { photos: unknown[] }> {
    const event = await this.eventRepo.getById(eventId);
    if (!event) throw Errors.notFound('Event', eventId);

    // Access control
    if (event.visibility !== 'public') {
      if (actor.role === 'viewer' && event.space_id !== actor.spaceId) {
        throw Errors.forbidden('This event is not accessible');
      }
      if (actor.role !== 'platform_owner' && event.space_id !== actor.spaceId) {
        throw Errors.forbidden('Not in your space');
      }
    }

    const photos = await this.photoRepo.listByEvent(eventId);
    return { ...event, photos };
  }

  async listBySpace(actor: Actor, spaceId: string, opts?: {
    category?: string; year?: number; limit?: number; offset?: number;
  }): Promise<EventRow[]> {
    if (actor.role !== 'platform_owner' && actor.spaceId !== spaceId) {
      // Show only public events for other spaces
      return this.eventRepo.listBySpace(spaceId, { ...opts, visibility: 'public' });
    }
    return this.eventRepo.listBySpace(spaceId, opts);
  }

  async update(actor: Actor, eventId: string, input: Record<string, unknown>): Promise<EventRow> {
    const event = await this.eventRepo.getById(eventId);
    if (!event) throw Errors.notFound('Event', eventId);
    if (event.space_id !== actor.spaceId && actor.role !== 'platform_owner') {
      throw Errors.forbidden('Not in your space');
    }
    await this.eventRepo.update(eventId, input as Partial<EventRow>);
    return (await this.eventRepo.getById(eventId))!;
  }

  async softDelete(actor: Actor, eventId: string): Promise<void> {
    const event = await this.eventRepo.getById(eventId);
    if (!event) throw Errors.notFound('Event', eventId);
    if (event.space_id !== actor.spaceId && actor.role !== 'platform_owner') {
      throw Errors.forbidden('Not in your space');
    }

    // Soft-delete all photos first
    const photos = await this.photoRepo.listByEvent(eventId);
    const batchOps = photos.map(p => ({
      sql: "UPDATE photos SET deleted_at = datetime('now') WHERE id = ?",
      params: [p.id],
    }));
    batchOps.push({ sql: "UPDATE events SET deleted_at = datetime('now') WHERE id = ?", params: [eventId] });
    await this.eventRepo.batch(batchOps);

    // Move R2 objects to trash (best-effort)
    if (this.photosBucket) {
      for (const p of photos) {
        try {
          const obj = await this.photosBucket.get(p.storage_key);
          if (obj) {
            await this.photosBucket.put(`trash/${p.storage_key}`, obj.body);
            await this.photosBucket.delete(p.storage_key);
          }
        } catch { /* best-effort */ }
      }
    }

    log({ level: 'info', message: 'Event deleted', actor: actor.userId, action: 'event_deleted', metadata: { eventId } });
  }
}
