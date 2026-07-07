import { describe, it, expect } from 'vitest';
import { signupSchema, loginSchema, gateSchema } from '../validation/auth.js';
import { createEventSchema } from '../validation/events.js';
import { createAlbumSchema } from '../validation/albums.js';

describe('signupSchema', () => {
  const validInput = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepass123',
    spaceName: 'Johns Family',
    spaceSlug: 'johns-family',
    gateKey: 'family-secret-123',
  };

  it('accepts valid signup data', () => {
    const result = signupSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it('rejects short password', () => {
    const result = signupSchema.safeParse({ ...validInput, password: 'short' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = signupSchema.safeParse({ ...validInput, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects slug with spaces', () => {
    const result = signupSchema.safeParse({ ...validInput, spaceSlug: 'my space' });
    expect(result.success).toBe(false);
  });

  it('rejects empty name', () => {
    const result = signupSchema.safeParse({ ...validInput, name: '' });
    expect(result.success).toBe(false);
  });

  it('accepts slug with hyphens and numbers', () => {
    const result = signupSchema.safeParse({ ...validInput, spaceSlug: 'family-2024' });
    expect(result.success).toBe(true);
  });
});

describe('loginSchema', () => {
  it('accepts valid login', () => {
    const result = loginSchema.safeParse({ email: 'test@test.com', password: 'pass1234' });
    expect(result.success).toBe(true);
  });

  it('rejects missing email', () => {
    const result = loginSchema.safeParse({ password: 'pass1234' });
    expect(result.success).toBe(false);
  });
});

describe('gateSchema', () => {
  it('accepts valid gate unlock', () => {
    const result = gateSchema.safeParse({ spaceSlug: 'my-family', gateKey: 'secret' });
    expect(result.success).toBe(true);
  });

  it('rejects empty gate key', () => {
    const result = gateSchema.safeParse({ spaceSlug: 'my-family', gateKey: '' });
    expect(result.success).toBe(false);
  });
});

describe('createEventSchema', () => {
  it('accepts valid event', () => {
    const result = createEventSchema.safeParse({
      title: 'Beach Wedding',
      category: 'wedding',
      eventDate: '2026-07-15',
      visibility: 'gate',
    });
    expect(result.success).toBe(true);
  });

  it('defaults visibility to private', () => {
    const result = createEventSchema.safeParse({
      title: 'Test', category: 'family',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.visibility).toBe('private');
    }
  });

  it('rejects invalid category', () => {
    const result = createEventSchema.safeParse({
      title: 'Test', category: 'invalid_category',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty title', () => {
    const result = createEventSchema.safeParse({
      title: '', category: 'family',
    });
    expect(result.success).toBe(false);
  });
});

describe('createAlbumSchema', () => {
  it('accepts valid album', () => {
    const result = createAlbumSchema.safeParse({ name: 'Summer Vacation' });
    expect(result.success).toBe(true);
  });

  it('defaults allowDownloads to true', () => {
    const result = createAlbumSchema.safeParse({ name: 'Test' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.allowDownloads).toBe(true);
    }
  });
});
