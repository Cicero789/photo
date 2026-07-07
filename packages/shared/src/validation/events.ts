import { z } from 'zod';
import { MAX_TITLE, MAX_DESCRIPTION } from '../constants/limits.js';
import { EVENT_CATEGORIES, VISIBILITY_LEVELS } from '../types/domain.js';

export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(MAX_TITLE, `Title too long (max ${MAX_TITLE} chars)`),
  description: z.string().max(MAX_DESCRIPTION).optional().default(''),
  category: z.enum(EVENT_CATEGORIES),
  eventDate: z.string().optional(),
  address: z.string().max(500).optional().default(''),
  visibility: z.enum(VISIBILITY_LEVELS).default('private'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  spaceId: z.string().optional(),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
