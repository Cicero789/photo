const ENCODER = new TextEncoder(); const DECODER = new TextDecoder();
const DEV_SECRET = "photo-jwt-dev-secret-change-in-production";

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", ENCODER.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

interface JWTPayload { userId: string; spaceId: string; role: string; email?: string; jti: string; iat: number; exp: number; }

function base64urlEncode(data: ArrayBuffer | Uint8Array): string {
  const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64urlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

export async function signToken(payload: Omit<JWTPayload, "iat" | "exp" | "jti">, secret?: string): Promise<string> {
  const key = await getKey(secret || DEV_SECRET);
  const header = base64urlEncode(ENCODER.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = { ...payload, jti: crypto.randomUUID(), iat: now, exp: now + 60 * 60 * 24 };
  const payloadB64 = base64urlEncode(ENCODER.encode(JSON.stringify(fullPayload)));
  const signingInput = `${header}.${payloadB64}`;
  const signature = await crypto.subtle.sign("HMAC", key, ENCODER.encode(signingInput));
  return `${signingInput}.${base64urlEncode(signature)}`;
}

export async function verifyToken(token: string, secret?: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split("."); if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signatureB64] = parts;
    if (!headerB64 || !payloadB64 || !signatureB64) return null;
    const key = await getKey(secret || DEV_SECRET);
    const signingInput = `${headerB64}.${payloadB64}`;
    const signature = base64urlDecode(signatureB64!);
    const valid = await crypto.subtle.verify("HMAC", key, signature, ENCODER.encode(signingInput));
    if (!valid) return null;
    const payload = JSON.parse(DECODER.decode(base64urlDecode(payloadB64!))) as JWTPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch { return null; }
}

export function getJwtSecret(env?: { JWT_SECRET?: string; ENVIRONMENT?: string }): string {
  const secret = env?.JWT_SECRET;
  if (secret && secret.length >= 32) return secret;
  if (env?.ENVIRONMENT === "production") {
    throw new Error("JWT_SECRET is not set or is too short in production. Set via: wrangler pages secret put JWT_SECRET");
  }
  return DEV_SECRET;
}
