/** Signed media URL utilities — HMAC-SHA256 based */

export async function signMediaUrl(storageKey: string, secret: string, ttlSeconds = 3600, kind: "photos" | "videos" = "photos"): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds;
  const data = `${storageKey}:${expires}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const hex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  // Encode each path segment individually, keeping slashes as literal "/"
  // so the media handler's segments.join("/") reconstructs the exact R2 key
  const encodedKey = storageKey.split("/").map(encodeURIComponent).join("/");
  return `/api/media/${kind}/${encodedKey}?expires=${expires}&sig=${hex}`;
}

export async function verifyMediaSignature(storageKey: string, signature: string, expires: string, secret: string): Promise<boolean> {
  const exp = parseInt(expires, 10);
  if (isNaN(exp) || exp < Math.floor(Date.now() / 1000)) return false; // expired

  // Require valid hex format (prevents timing oracle)
  if (!/^[0-9a-f]{64}$/i.test(signature)) return false;

  const data = `${storageKey}:${exp}`;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  const sigBytes = new Uint8Array(signature.match(/.{2}/g)!.map(h => parseInt(h, 16)));
  return crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(data));
}

/** Generate a signed URL for a storage key — call from API handlers */
export function generateSignedMediaUrl(storageKey: string, secret: string, ttlSeconds = 3600, kind: "photos" | "videos" = "photos"): Promise<string> {
  return signMediaUrl(storageKey, secret, ttlSeconds, kind);
}
