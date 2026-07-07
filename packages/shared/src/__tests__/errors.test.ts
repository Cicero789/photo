import { describe, it, expect } from 'vitest';
import { AppError, Errors, isAppError } from '../errors.js';

describe('AppError', () => {
  it('creates an error with code, status, and message', () => {
    const err = new AppError('NOT_FOUND', 404, 'User not found');
    expect(err.code).toBe('NOT_FOUND');
    expect(err.status).toBe(404);
    expect(err.message).toBe('User not found');
    expect(err.requestId).toBeTruthy();
    expect(err.name).toBe('AppError');
  });

  it('serializes to JSON with requestId', () => {
    const err = Errors.notFound('Event', 'evt_123');
    const json = err.toJSON();
    expect(json.error).toBe("Event 'evt_123' not found");
    expect(json.code).toBe('NOT_FOUND');
    expect(json.requestId).toBeTruthy();
  });

  it('includes details in JSON when present', () => {
    const err = Errors.validation([{ code: 'custom', path: ['email'], message: 'Invalid email' }]);
    const json = err.toJSON();
    expect(json.details).toEqual([{ path: 'email', message: 'Invalid email' }]);
  });
});

describe('Error factories', () => {
  it('notFound includes resource name', () => {
    const err = Errors.notFound('Space', 'spc_abc');
    expect(err.status).toBe(404);
    expect(err.message).toContain('Space');
    expect(err.message).toContain('spc_abc');
  });

  it('forbidden has 403 status', () => {
    expect(Errors.forbidden('Nope').status).toBe(403);
  });

  it('unauthorized has 401 status', () => {
    expect(Errors.unauthorized().status).toBe(401);
  });

  it('conflict has 409 status', () => {
    expect(Errors.conflict('User', 'email').status).toBe(409);
  });

  it('rateLimited includes retryAfter in details', () => {
    const err = Errors.rateLimited(30);
    expect(err.status).toBe(429);
    expect(err.details).toEqual({ retryAfterSeconds: 30 });
  });

  it('tooLarge formats bytes in message', () => {
    const err = Errors.tooLarge(5 * 1024 * 1024);
    expect(err.status).toBe(413);
    expect(err.message).toContain('5.0MB');
  });

  it('validation wraps Zod issues', () => {
    const err = Errors.validation([
      { code: 'too_small', minimum: 1, type: 'string', inclusive: true, exact: false, message: 'Required', path: ['title'] },
    ]);
    expect(err.status).toBe(400);
    expect(err.details).toEqual([{ path: 'title', message: 'Required' }]);
  });

  it('internal has 500 status', () => {
    expect(Errors.internal().status).toBe(500);
  });
});

describe('isAppError', () => {
  it('returns true for AppError instances', () => {
    expect(isAppError(Errors.notFound('Test'))).toBe(true);
  });

  it('returns false for regular errors', () => {
    expect(isAppError(new Error('test'))).toBe(false);
  });

  it('returns false for strings', () => {
    expect(isAppError('error')).toBe(false);
  });
});
