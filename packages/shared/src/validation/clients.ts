import { z } from 'zod';
import { MAX_TITLE, MAX_SLUG } from '../constants/limits.js';

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(MAX_TITLE),
  slug: z.string().min(2).max(MAX_SLUG).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Invalid slug format'),
  industryId: z.string().optional(),
});

export const updateClientSchema = z.object({
  name: z.string().min(1).max(MAX_TITLE).optional(),
  slug: z.string().min(2).max(MAX_SLUG).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).optional(),
  customDomain: z.string().max(253).optional(),
  published: z.boolean().optional(),
  content: z.record(z.unknown()).optional(),
  templateConfig: z.record(z.unknown()).optional(),
  setupFeeCents: z.number().int().min(0).optional(),
  monthlyFeeCents: z.number().int().min(0).optional(),
});

export const createBlogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(MAX_TITLE),
  slug: z.string().min(2).max(MAX_SLUG).optional(),
  body: z.string().optional().default(''),
  featuredImage: z.string().optional(),
  published: z.boolean().optional().default(false),
});

export const updateBlogPostSchema = z.object({
  title: z.string().min(1).max(MAX_TITLE).optional(),
  slug: z.string().min(2).max(MAX_SLUG).optional(),
  body: z.string().optional(),
  featuredImage: z.string().optional(),
  published: z.boolean().optional(),
});

export const createGallerySchema = z.object({
  name: z.string().min(1, 'Name is required').max(MAX_TITLE),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
export type CreateGalleryInput = z.infer<typeof createGallerySchema>;
