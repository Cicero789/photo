/** Signed media URL utilities — HMAC-SHA256 based */

export async function signMediaUrl(storageKey: string, secret: string, ttlSeconds = 3600): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
  const data = `${storageKey}:${expires}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return `/api/media/photos/${encodeURIComponent(storageKey)}?expires=${expires}&sig=${hex}`;
}

export async function verifyMediaSignature(storageKey: string, signature: string, expires: string, secret: string): Promise<boolean> {
  const exp = parseInt(expires, 10);
  if (isNaN(exp) || exp < Math.floor(Date.now() / 1000)) return false; // expired

  const data = `${storageKey}:${exp}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return expected === signature;
}

/** Generate a signed URL for a storage key — call from API handlers */
export function generateSignedMediaUrl(storageKey: string, secret: string, ttlSeconds = 3600): Promise<string> {
  return signMediaUrl(storageKey, secret, ttlSeconds);
}
