// Prefixed, sortable entity IDs
// Every entity gets a type prefix so IDs are self-documenting

const PREFIXES = {
  user: 'usr',
  space: 'spc',
  event: 'evt',
  photo: 'pho',
  video: 'vid',
  album: 'alb',
  professional: 'pro',
  client: 'cli',
  blogPost: 'blg',
  gallery: 'gal',
  inspiration: 'ins',
  order: 'ord',
  review: 'rev',
  connection: 'con',
  message: 'msg',
  activity: 'act',
  ad: 'adt',
  booking: 'bok',
  rateLimit: 'rtl',
  passwordReset: 'pwr',
  migration: 'mig',
} as const;

export type EntityType = keyof typeof PREFIXES;

export function generateId(type: EntityType): string {
  const prefix = PREFIXES[type];
  const timestamp = Date.now().toString(36);
  const random = crypto.randomUUID().split('-')[0]!;
  return `${prefix}_${timestamp}${random}`;
}

export function parseId(id: string): { type: EntityType; timestamp: number } | null {
  const idx = id.indexOf('_');
  if (idx === -1) return null;

  const prefix = id.slice(0, idx);
  const data = id.slice(idx + 1);

  const entry = Object.entries(PREFIXES).find(([, p]) => p === prefix);
  if (!entry) return null;

  const ts = parseInt(data.slice(0, 8), 36);
  return { type: entry[0] as EntityType, timestamp: isNaN(ts) ? 0 : ts };
}

export function getEntityType(id: string): EntityType | null {
  return parseId(id)?.type ?? null;
}
