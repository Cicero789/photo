import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword, constantTimeCompare } from '../../lib/password.js';

describe('hashPassword', () => {
  it('returns formatted hash string', async () => {
    const hash = await hashPassword('mypassword123');
    expect(hash).toContain(':');
    const parts = hash.split(':');
    expect(parts).toHaveLength(3);
    expect(parts[0]).toBe('100000'); // iterations
    expect(parts[1]!.length).toBe(32); // salt (16 bytes hex)
    expect(parts[2]!.length).toBe(64); // hash (32 bytes hex)
  });

  it('produces different hashes for same password', async () => {
    const h1 = await hashPassword('password');
    const h2 = await hashPassword('password');
    expect(h1).not.toBe(h2); // Different salts
  });
});

describe('verifyPassword', () => {
  it('verifies correct password', async () => {
    const hash = await hashPassword('correct-horse-battery');
    const result = await verifyPassword('correct-horse-battery', hash);
    expect(result).toBe(true);
  });

  it('rejects wrong password', async () => {
    const hash = await hashPassword('correct-horse-battery');
    const result = await verifyPassword('wrong-password', hash);
    expect(result).toBe(false);
  });

  it('rejects malformed hash', async () => {
    expect(await verifyPassword('test', 'bad-hash')).toBe(false);
    expect(await verifyPassword('test', '')).toBe(false);
    expect(await verifyPassword('test', 'a:b:c:d')).toBe(false);
  });

  it('handles empty passwords', async () => {
    const hash = await hashPassword('');
    expect(await verifyPassword('', hash)).toBe(true);
    expect(await verifyPassword('x', hash)).toBe(false);
  });
});

describe('constantTimeCompare', () => {
  it('returns true for equal strings', () => {
    expect(constantTimeCompare('abc', 'abc')).toBe(true);
  });

  it('returns false for different strings', () => {
    expect(constantTimeCompare('abc', 'abd')).toBe(false);
  });

  it('returns false for different lengths', () => {
    expect(constantTimeCompare('abc', 'abcd')).toBe(false);
  });

  it('returns true for empty strings', () => {
    expect(constantTimeCompare('', '')).toBe(true);
  });
});
