import { z } from 'zod';

export const favoritePhotoSchema = z.object({
  photoId: z.string().min(1, 'Photo ID is required'),
});

export const photoMetadataSchema = z.object({
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  takenAt: z.string().optional(),
});

export type FavoritePhotoInput = z.infer<typeof favoritePhotoSchema>;
export type PhotoMetadataInput = z.infer<typeof photoMetadataSchema>;
