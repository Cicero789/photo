// Auth token management with namespaced localStorage

const TOKEN_KEY = 'framenest:auth:token';
const USER_KEY = 'framenest:auth:user';

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  role: string;
  spaceId: string;
  avatarUrl: string | null;
  accountType: string;
  createdAt: string;
}

export function getToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

export function setToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch { /* noop */ }
}

export function getStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) as StoredUser : null;
  } catch { return null; }
}

export function setStoredUser(user: StoredUser | null): void {
  try {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  } catch { /* noop */ }
}

export function clearAuth(): void {
  setToken(null);
  setStoredUser(null);
}

export function parseJwtPayload(token: string): { userId: string; spaceId: string; role: string; exp: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]!));
    return {
      userId: payload.userId as string,
      spaceId: payload.spaceId as string,
      role: payload.role as string,
      exp: payload.exp as number,
    };
  } catch { return null; }
}

export function isTokenExpired(token: string): boolean {
  const payload = parseJwtPayload(token);
  if (!payload) return true;
  return Date.now() / 1000 > payload.exp;
}
