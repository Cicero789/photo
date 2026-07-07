// Password hashing — PBKDF2 with 100k iterations, SHA-256
// Constant-time comparison for all operations

const ITERATIONS = 100_000;
const HASH_ALGORITHM = 'SHA-256';
const SALT_LENGTH = 16;

function bufferToHex(data: Uint8Array | ArrayBuffer): string {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)!;
  }
  return bytes;
}

async function pbkdf2(password: string, salt: Uint8Array, iterations: number, keyLength: number): Promise<ArrayBuffer> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'],
  );
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt.buffer as ArrayBuffer, iterations, hash: HASH_ALGORITHM },
    keyMaterial,
    keyLength * 8,
  );
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const hashBuffer = await pbkdf2(password, salt, ITERATIONS, 32);
  return `${ITERATIONS}:${bufferToHex(salt)}:${bufferToHex(hashBuffer)}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const parts = storedHash.split(':');
    if (parts.length !== 3) return false;

    const iterations = parseInt(parts[0]!, 10);
    const salt = hexToBuffer(parts[1]!);
    const expectedHash = hexToBuffer(parts[2]!);

    const computedHash = await pbkdf2(password, salt, iterations, 32);

    // Constant-time comparison
    const expectedBytes = new Uint8Array(expectedHash);
    const computedBytes = new Uint8Array(computedHash);
    if (expectedBytes.length !== computedBytes.length) return false;

    let diff = 0;
    for (let i = 0; i < expectedBytes.length; i++) {
      diff |= expectedBytes[i]! ^ computedBytes[i]!;
    }
    return diff === 0;
  } catch {
    return false;
  }
}

export function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
