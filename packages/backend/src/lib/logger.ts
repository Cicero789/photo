// Structured JSON logger
// In production, these go to Cloudflare Logpush

interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  requestId?: string;
  actor?: string;
  action?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

export function log(entry: LogEntry): void {
  const output = {
    ...entry,
    timestamp: new Date().toISOString(),
  };
  console.log(JSON.stringify(output));
}

export function logError(err: unknown, context?: Record<string, unknown>): void {
  if (err instanceof Error) {
    log({
      level: 'error',
      message: err.message,
      metadata: {
        name: err.name,
        stack: err.stack,
        ...context,
      },
    });
  } else {
    log({
      level: 'error',
      message: String(err),
      metadata: context,
    });
  }
}
