// AppError — structured error class used by both frontend and backend
// Every error that leaves the API is an AppError

import type { ZodIssue } from 'zod';

export type ErrorCode =
  | 'NOT_FOUND'
  | 'FORBIDDEN'
  | 'UNAUTHORIZED'
  | 'VALIDATION'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'TOO_LARGE'
  | 'UNSUPPORTED_TYPE'
  | 'PAYMENT_REQUIRED'
  | 'MAINTENANCE'
  | 'EXTERNAL_SERVICE'
  | 'INTERNAL';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly status: number;
  public readonly details?: unknown;
  public readonly requestId: string;

  constructor(code: ErrorCode, status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.status = status;
    this.details = details;
    this.requestId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
  }

  toJSON(): Record<string, unknown> {
    const result: Record<string, unknown> = {
      error: this.message,
      code: this.code,
      requestId: this.requestId,
    };
    if (this.details !== undefined) {
      result.details = this.details;
    }
    return result;
  }
}

// Error factory — use these instead of raw AppError construction
export const Errors = {
  notFound: (resource: string, id?: string) =>
    new AppError('NOT_FOUND', 404, id ? `${resource} '${id}' not found` : `${resource} not found`),

  forbidden: (reason: string = 'Access denied') =>
    new AppError('FORBIDDEN', 403, reason),

  unauthorized: (reason: string = 'Authentication required') =>
    new AppError('UNAUTHORIZED', 401, reason),

  validation: (issues: ZodIssue[]) =>
    new AppError('VALIDATION', 400, 'Validation failed', issues.map(i => ({
      path: i.path.join('.'),
      message: i.message,
    }))),

  conflict: (resource: string, field: string) =>
    new AppError('CONFLICT', 409, `${resource} with this ${field} already exists`),

  rateLimited: (retryAfterSeconds: number) =>
    new AppError('RATE_LIMITED', 429, `Too many requests. Retry after ${retryAfterSeconds}s`, { retryAfterSeconds }),

  tooLarge: (maxBytes: number) =>
    new AppError('TOO_LARGE', 413, `File exceeds maximum size of ${formatBytesForError(maxBytes)}`),

  unsupportedType: (type: string) =>
    new AppError('UNSUPPORTED_TYPE', 415, `Unsupported file type: ${type}`),

  paymentRequired: (message: string = 'Payment required') =>
    new AppError('PAYMENT_REQUIRED', 402, message),

  maintenance: (message: string = 'Service temporarily unavailable') =>
    new AppError('MAINTENANCE', 503, message),

  externalService: (service: string, message: string) =>
    new AppError('EXTERNAL_SERVICE', 502, `${service} error: ${message}`),

  internal: (message: string = 'Internal server error', cause?: unknown) =>
    new AppError('INTERNAL', 500, message, cause instanceof Error ? cause.message : cause),
};

function formatBytesForError(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

// Type guard
export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}
