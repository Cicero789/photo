import { z } from 'zod';
import { MIN_PASSWORD, MAX_PASSWORD, MAX_NAME, MAX_EMAIL, MAX_SLUG } from '../constants/limits.js';
import { ROLES } from '../types/domain.js';

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required').max(MAX_NAME, `Name too long (max ${MAX_NAME} chars)`),
  email: z.string().email('Invalid email').max(MAX_EMAIL),
  password: z.string().min(MIN_PASSWORD, `Password must be at least ${MIN_PASSWORD} characters`).max(MAX_PASSWORD),
  spaceName: z.string().min(1, 'Space name is required').max(MAX_NAME),
  spaceSlug: z.string().min(2, 'Space slug too short').max(MAX_SLUG).regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  gateKey: z.string().min(1, 'Gate key is required').max(MAX_PASSWORD),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const gateSchema = z.object({
  spaceSlug: z.string().min(1, 'Space slug is required'),
  gateKey: z.string().min(1, 'Gate key is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(MIN_PASSWORD, `Password must be at least ${MIN_PASSWORD} characters`).max(MAX_PASSWORD),
});

export const magicLoginSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export const addMemberSchema = z.object({
  name: z.string().min(1, 'Name is required').max(MAX_NAME),
  email: z.string().email('Invalid email').max(MAX_EMAIL),
  password: z.string().min(MIN_PASSWORD).max(MAX_PASSWORD),
  role: z.enum(ROLES.filter(r => r !== 'platform_owner') as [string, ...string[]]),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type GateInput = z.infer<typeof gateSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type MagicLoginInput = z.infer<typeof magicLoginSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
