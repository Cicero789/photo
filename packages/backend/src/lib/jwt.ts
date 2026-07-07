// JWT signing and verification — HMAC-SHA256, 24h expiry
import { JWT_EXPIRY_SECONDS } from '@framenest/shared';
import type { Role } from '@framenest/shared';

export interface JWTPayload {
  userId: string;
  spaceId: string;
  role: Role;
  tokenVersion: number;
  jti: string;
  iat: number;
  exp: number;
}

function base64urlEncode(data: ArrayBuffer | Uint8Array): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  return btoa(String.fromCharCode(...bytes))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64urlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export async function signToken(payload: Omit<JWTPayload, 'iat' | 'exp' | 'jti'>, env?: { JWT_SECRET?: string }): Promise<string> {
  const secret = getJwtSecret(env);
  const now = Math.floor(Date.now() / 1000);

  const fullPayload: JWTPayload = {
    ...payload,
    jti: crypto.randomUUID(),
    iat: now,
    exp: now + JWT_EXPIRY_SECONDS,
  };

  const header = { alg: 'HS256', typ: 'JWT' };
  const enc = new TextEncoder();
  const headerB64 = base64urlEncode(enc.encode(JSON.stringify(header)));
  const payloadB64 = base64urlEncode(enc.encode(JSON.stringify(fullPayload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  const key = await getKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(signingInput));
  const sigB64 = base64urlEncode(signature);

  return `${signingInput}.${sigB64}`;
}

export async function verifyToken(token: string, env?: { JWT_SECRET?: string }): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, sigB64] = parts as [string, string, string];
    const secret = getJwtSecret(env);
    const enc = new TextEncoder();
    const key = await getKey(secret);

    const signingInput = `${headerB64}.${payloadB64}`;
    const signature = base64urlDecode(sigB64);

    const valid = await crypto.subtle.verify('HMAC', key, signature, enc.encode(signingInput));
    if (!valid) return null;

    const payloadJson = new TextDecoder().decode(base64urlDecode(payloadB64));
    const payload = JSON.parse(payloadJson) as JWTPayload;

    // Check expiry
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}

export function getJwtSecret(env?: { JWT_SECRET?: string }): string {
  const secret = env?.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }
  return secret;
}
