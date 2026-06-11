const MAX_NAME = 200; const MAX_EMAIL = 254; const MAX_TITLE = 300; const MAX_DESCRIPTION = 5000; const MAX_MESSAGE = 1000; const MAX_URL = 2048; const MAX_BIO = 2000; const MAX_SERVICE_AREA = 200;

export function isValidEmail(email: string): boolean { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_EMAIL; }
export function isValidLength(value: string, max: number, min = 1): boolean { return value.length >= min && value.length <= max; }
export function sanitize(value: string, max: number): string { return value.trim().slice(0, max); }

export function validateSignup(body: { name?: string; email?: string; password?: string; spaceName?: string; spaceSlug?: string; gateKey?: string }): string | null {
  if (!body.name || !isValidLength(body.name, MAX_NAME)) return `Name must be between 1 and ${MAX_NAME} characters.`;
  if (!body.email || !isValidEmail(body.email)) return "Please enter a valid email address.";
  if (!body.password || body.password.length < 8) return "Password must be at least 8 characters.";
  if (!body.spaceName || !isValidLength(body.spaceName, MAX_NAME)) return `Space name must be between 1 and ${MAX_NAME} characters.`;
  if (!body.spaceSlug || !isValidLength(body.spaceSlug, 50)) return "Link must be between 1 and 50 characters.";
  if (!body.gateKey || body.gateKey.length < 6) return "Gate key must be at least 6 characters.";
  return null;
}

export function validateMember(body: { name?: string; email?: string; password?: string; role?: string }): string | null {
  if (!body.name || !isValidLength(body.name, MAX_NAME)) return `Name must be between 1 and ${MAX_NAME} characters.`;
  if (!body.email || !isValidEmail(body.email)) return "Please enter a valid email address.";
  if (!body.password || body.password.length < 8) return "Password must be at least 8 characters.";
  if (!body.role || !["staff", "viewer"].includes(body.role)) return "Role must be staff or viewer.";
  return null;
}

export { MAX_NAME, MAX_EMAIL, MAX_TITLE, MAX_DESCRIPTION, MAX_MESSAGE, MAX_URL, MAX_BIO, MAX_SERVICE_AREA };
