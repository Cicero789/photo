import { z } from 'zod';
import { MAX_EMAIL, MAX_URL, MAX_MESSAGE } from '../constants/limits.js';

export const emailSchema = z.string().email('Invalid email').max(MAX_EMAIL);

export const urlSchema = z.string().url('Invalid URL').max(MAX_URL);

export const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional().default(50),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

export const bookingInquirySchema = z.object({
  professionalId: z.string().optional(),
  message: z.string().min(1, 'Message is required').max(MAX_MESSAGE),
  eventTitle: z.string().max(200).optional().default(''),
  locationName: z.string().max(500).optional().default(''),
});

export const connectionSchema = z.object({
  email: z.string().email('Invalid email'),
  connectionType: z.enum(['family', 'friend']),
  message: z.string().max(MAX_MESSAGE).optional().default(''),
});

export const messageSchema = z.object({
  message: z.string().min(1, 'Message is required').max(MAX_MESSAGE),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type BookingInquiryInput = z.infer<typeof bookingInquirySchema>;
export type ConnectionInput = z.infer<typeof connectionSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
