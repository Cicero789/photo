import { z } from 'zod';
import { MAX_TITLE } from '../constants/limits.js';

export const createAlbumSchema = z.object({
  name: z.string().min(1, 'Name is required').max(MAX_TITLE),
  password: z.string().optional(),
  allowDownloads: z.boolean().optional().default(true),
  expiresAt: z.string().optional(),
});

export const albumViewSchema = z.object({
  password: z.string().optional(),
});

export type CreateAlbumInput = z.infer<typeof createAlbumSchema>;
export type AlbumViewInput = z.infer<typeof albumViewSchema>;
