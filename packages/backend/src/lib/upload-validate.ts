// Upload validation — magic byte checking, MIME validation, size limits
import { PHOTO_MIME_TYPES, VIDEO_MIME_TYPES } from '@framenest/shared';

const MAGIC_BYTES: Record<string, number[]> = {
  'image/jpeg': [0xFF, 0xD8, 0xFF],
  'image/png': [0x89, 0x50, 0x4E, 0x47],
  'image/webp': [0x52, 0x49, 0x46, 0x46],
  'image/avif': [0x00, 0x00, 0x00, 0x1C], // ftypavif
  'video/mp4': [0x00, 0x00, 0x00, 0x1C], // ftyp
  'video/webm': [0x1A, 0x45, 0xDF, 0xA3],
  'video/quicktime': [0x00, 0x00, 0x00, 0x14], // ftypqt
};

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export async function validateUploadContent(file: File): Promise<ValidationResult> {
  // Check magic bytes
  const expectedBytes = MAGIC_BYTES[file.type];
  if (!expectedBytes) {
    return { valid: false, reason: `Unsupported file type: ${file.type}` };
  }

  try {
    const buffer = new Uint8Array(await file.slice(0, expectedBytes.length).arrayBuffer());
    for (let i = 0; i < expectedBytes.length; i++) {
      if (buffer[i] !== expectedBytes[i]) {
        return { valid: false, reason: 'File content does not match declared type' };
      }
    }
  } catch {
    return { valid: false, reason: 'Could not read file content' };
  }

  // Reject HTML/SVG/script disguised as images
  const textStart = new Uint8Array(await file.slice(0, 256).arrayBuffer());
  const asText = new TextDecoder().decode(textStart).toLowerCase();
  if (asText.includes('<!doctype') || asText.includes('<html') || asText.includes('<svg') || asText.includes('<script')) {
    return { valid: false, reason: 'File appears to be HTML/SVG/script, not a valid media file' };
  }

  return { valid: true };
}

export function isValidPhotoMime(type: string): boolean {
  return PHOTO_MIME_TYPES.has(type);
}

export function isValidVideoMime(type: string): boolean {
  return VIDEO_MIME_TYPES.has(type);
}

export function rejectOversizedRequest(request: Request, maxBytes: number): Response | null {
  const contentLength = request.headers.get('content-length');
  if (contentLength) {
    const size = parseInt(contentLength, 10);
    if (!isNaN(size) && size > maxBytes) {
      return new Response(JSON.stringify({
        error: `Request body exceeds maximum size of ${formatBytes(maxBytes)}`,
        code: 'TOO_LARGE',
      }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  return null;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
