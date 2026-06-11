const ENCODER = new TextEncoder();
const SALT_LENGTH = 16; const ITERATIONS = 100_000; const KEY_LENGTH = 32; const DIGEST = "SHA-256";

function generateSalt(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt();
  const key = await crypto.subtle.importKey("raw", ENCODER.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: ENCODER.encode(salt), iterations: ITERATIONS, hash: DIGEST }, key, KEY_LENGTH * 8);
  const hash = Array.from(new Uint8Array(derived)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${ITERATIONS}:${salt}:${hash}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [iterations, salt, originalHash] = stored.split(":");
  if (!iterations || !salt || !originalHash) return false;
  const key = await crypto.subtle.importKey("raw", ENCODER.encode(password), { name: "PBKDF2" }, false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: ENCODER.encode(salt), iterations: parseInt(iterations, 10), hash: DIGEST }, key, KEY_LENGTH * 8);
  const hash = Array.from(new Uint8Array(derived)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return hash === originalHash;
}
