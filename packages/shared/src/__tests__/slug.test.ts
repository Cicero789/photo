import { describe, it, expect } from 'vitest';
import { slugify, isValidSlug, generateSlug } from '../utils/slug.js';

describe('slugify', () => {
  it('converts text to lowercase slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Dr. Smith\'s Clinic!')).toBe('dr-smiths-clinic');
  });

  it('collapses multiple hyphens', () => {
    expect(slugify('a---b')).toBe('a-b');
  });

  it('trims leading/trailing hyphens', () => {
    expect(slugify('-hello-')).toBe('hello');
  });

  it('handles empty input', () => {
    expect(slugify('')).toBe('');
    expect(slugify('   ')).toBe('');
  });

  it('truncates to 100 chars', () => {
    const long = 'a'.repeat(200);
    expect(slugify(long).length).toBeLessThanOrEqual(100);
  });
});

describe('isValidSlug', () => {
  it('accepts valid slugs', () => {
    expect(isValidSlug('hello-world')).toBe(true);
    expect(isValidSlug('test123')).toBe(true);
    expect(isValidSlug('my-space-2024')).toBe(true);
  });

  it('rejects slugs with uppercase', () => {
    expect(isValidSlug('Hello-World')).toBe(false);
  });

  it('rejects slugs with special characters', () => {
    expect(isValidSlug('hello_world')).toBe(false);
    expect(isValidSlug('hello world')).toBe(false);
    expect(isValidSlug('hello@world')).toBe(false);
  });

  it('rejects slugs that are too short', () => {
    expect(isValidSlug('a')).toBe(false);
  });

  it('rejects slugs starting/ending with hyphen', () => {
    expect(isValidSlug('-hello')).toBe(false);
    expect(isValidSlug('hello-')).toBe(false);
  });
});

describe('generateSlug', () => {
  it('creates valid slug from name', () => {
    const slug = generateSlug('Dr. Smith Dentistry');
    expect(isValidSlug(slug)).toBe(true);
    expect(slug).toContain('dr-smith-dentistry');
  });

  it('handles empty name', () => {
    const slug = generateSlug('');
    expect(slug).toMatch(/^untitled-/);
  });
});
