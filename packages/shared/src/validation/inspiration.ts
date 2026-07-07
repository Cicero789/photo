import { z } from 'zod';

export const createInspirationSchema = z.object({
  photoUrl: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  category: z.string().optional().default('general'),
  season: z.string().optional().default(''),
  tips: z.string().optional().default(''),
  bestTime: z.string().optional().default(''),
  permissionInfo: z.string().optional().default(''),
});

export type CreateInspirationInput = z.infer<typeof createInspirationSchema>;
