import { describe, it, expect } from 'vitest';
import { generateId, parseId, getEntityType } from '../utils/id.js';

describe('generateId', () => {
  it('generates prefixed IDs for all entity types', () => {
    const types = ['user', 'space', 'event', 'photo', 'video', 'album', 'professional', 'client', 'inspiration', 'order'] as const;
    for (const type of types) {
      const id = generateId(type);
      expect(id).toBeTruthy();
      expect(id.length).toBeGreaterThan(5);
      // Should start with prefix + underscore
      expect(id).toMatch(/^[a-z]+_[a-z0-9]+$/);
      expect(id).not.toContain(' ');
    }
  });

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId('event')));
    expect(ids.size).toBe(100);
  });

  it('includes timestamp for sortability', () => {
    const id1 = generateId('photo');
    const id2 = generateId('photo');
    // Both should be parseable
    expect(parseId(id1)).toBeTruthy();
    expect(parseId(id2)).toBeTruthy();
  });
});

describe('parseId', () => {
  it('returns type and timestamp for valid IDs', () => {
    const id = generateId('user');
    const parsed = parseId(id);
    expect(parsed).toBeTruthy();
    expect(parsed!.type).toBe('user');
    expect(typeof parsed!.timestamp).toBe('number');
  });

  it('returns null for invalid IDs', () => {
    expect(parseId('not-a-valid-id')).toBeNull();
    expect(parseId('')).toBeNull();
    expect(parseId('justtext')).toBeNull();
  });

  it('returns null for unknown prefixes', () => {
    expect(parseId('xyz_something')).toBeNull();
  });
});

describe('getEntityType', () => {
  it('returns entity type from ID', () => {
    expect(getEntityType(generateId('event'))).toBe('event');
    expect(getEntityType(generateId('photo'))).toBe('photo');
    expect(getEntityType(generateId('album'))).toBe('album');
  });

  it('returns null for invalid IDs', () => {
    expect(getEntityType('garbage')).toBeNull();
  });
});
