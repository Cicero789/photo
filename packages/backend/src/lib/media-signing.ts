// Media URL signing — HMAC-SHA256 with expiry
import { SIGNED_URL_EXPIRY_SECONDS } from '@framenest/shared';

async function hmacSign(input: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(input));
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function signMediaUrl(
  storageKey: string,
  secret: string,
  ttlSeconds: number = SIGNED_URL_EXPIRY_SECONDS,
): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
  const input = `${storageKey}:${expires}`;
  const signature = await hmacSign(input, secret);
  return `/api/media/${storageKey}?sig=${signature}&exp=${expires}`;
}

export async function verifyMediaSignature(
  storageKey: string,
  signature: string,
  expires: string,
  secret: string,
): Promise<boolean> {
  try {
    const exp = parseInt(expires, 10);
    if (isNaN(exp) || Date.now() / 1000 > exp) return false;

    const input = `${storageKey}:${exp}`;
    const expectedSig = await hmacSign(input, secret);

    // Constant-time comparison
    if (signature.length !== expectedSig.length) return false;
    let diff = 0;
    for (let i = 0; i < signature.length; i++) {
      diff |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}
