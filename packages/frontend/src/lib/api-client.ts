// API client — fetch wrapper with auto-retry, error normalization, JWT injection
import { AppError, isAppError } from '@framenest/shared';
import type { ErrorCode } from '@framenest/shared';

const API_BASE = '/api';
const MAX_RETRIES = 2;
const RETRYABLE_CODES: ErrorCode[] = ['RATE_LIMITED', 'INTERNAL'];

function getToken(): string | null {
  return localStorage.getItem('framenest:auth:token');
}

export function setToken(token: string | null): void {
  if (token) {
    localStorage.setItem('framenest:auth:token', token);
  } else {
    localStorage.removeItem('framenest:auth:token');
  }
}

async function request<T>(method: string, path: string, body?: unknown, retryCount = 0): Promise<T> {
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let bodyStr: string | undefined;
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    bodyStr = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, { method, headers, body: bodyStr });

  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    throw new AppError('INTERNAL', res.status, `Unexpected response (${res.status})`);
  }

  const data = await res.json();

  if (!res.ok) {
    const error = new AppError(
      (data.code as ErrorCode) || 'INTERNAL',
      res.status,
      data.error || `Request failed (${res.status})`,
      data.details,
    );

    if (retryCount < MAX_RETRIES && RETRYABLE_CODES.includes(error.code)) {
      const delay = error.code === 'RATE_LIMITED'
        ? ((data.details?.retryAfterSeconds as number) ?? 5) * 1000
        : Math.pow(2, retryCount) * 1000;
      await new Promise(r => setTimeout(r, delay));
      return request<T>(method, path, body, retryCount + 1);
    }

    if (res.status === 401) {
      setToken(null);
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }

    throw error;
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
  patch: <T>(path: string, body?: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
