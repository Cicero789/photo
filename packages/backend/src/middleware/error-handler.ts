// Global error handler — catches all unhandled errors
import { AppError } from '@framenest/shared';
import { logError } from '../lib/logger.js';

export function handleError(err: unknown, requestId?: string): Response {
  if (err instanceof AppError) {
    const body = err.toJSON();
    if (requestId) body.requestId = requestId;
    return new Response(JSON.stringify(body), {
      status: err.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Unknown error — log and return 500
  logError(err, { requestId });

  const errorId = requestId || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'unknown');

  return new Response(JSON.stringify({
    error: 'Internal server error',
    code: 'INTERNAL',
    requestId: errorId,
  }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
