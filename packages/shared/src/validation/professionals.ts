import { z } from 'zod';
import { MAX_BIO, MAX_SERVICE_AREA, MAX_URL, MAX_SLUG } from '../constants/limits.js';

export const applyProfessionalSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email').max(254),
  website: z.string().max(MAX_URL).optional().default(''),
  serviceArea: z.string().max(MAX_SERVICE_AREA).optional().default(''),
  bio: z.string().max(MAX_BIO).optional().default(''),
});

export const updateProfessionalSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  slug: z.string().min(2).max(MAX_SLUG).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).optional(),
  tagline: z.string().max(200).optional(),
  specialties: z.string().optional(),
  verified: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export const updateProfessionalConfigSchema = z.object({
  pricingConfig: z.record(z.unknown()).optional(),
  templateConfig: z.record(z.unknown()).optional(),
  stripeAccount: z.string().optional(),
  slug: z.string().min(2).max(MAX_SLUG).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).optional(),
  tagline: z.string().max(200).optional(),
  specialties: z.string().optional(),
  heroPhotos: z.array(z.string()).optional(),
});

export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional().default(''),
});

export type ApplyProfessionalInput = z.infer<typeof applyProfessionalSchema>;
export type UpdateProfessionalInput = z.infer<typeof updateProfessionalSchema>;
export type UpdateProfessionalConfigInput = z.infer<typeof updateProfessionalConfigSchema>;
export type CreateReviewInput = z.infer<typeof createReviewSchema>;
