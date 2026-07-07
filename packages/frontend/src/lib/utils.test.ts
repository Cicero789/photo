import { describe, it, expect } from 'vitest';
import { cn, formatBytes, formatDuration, formatDate } from './utils.js';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('handles falsy values', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });
});

describe('formatBytes', () => {
  it('formats bytes', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(500)).toBe('500 B');
  });

  it('formats KB', () => {
    expect(formatBytes(1024)).toBe('1 KB');
  });

  it('formats MB', () => {
    expect(formatBytes(5 * 1024 * 1024)).toBe('5 MB');
  });
});

describe('formatDuration', () => {
  it('formats seconds to m:ss', () => {
    expect(formatDuration(0)).toBe('0:00');
    expect(formatDuration(65)).toBe('1:05');
    expect(formatDuration(3661)).toBe('61:01');
  });
});

describe('formatDate', () => {
  it('formats ISO date string', () => {
    const formatted = formatDate('2026-07-04');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('July');
  });

  it('returns original on invalid input', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});
