export const PHOTO_MIME_TYPES = new Set(["image/jpeg","image/png","image/webp","image/avif","image/heic"]);
export const VIDEO_MIME_TYPES = new Set(["video/mp4","video/webm","video/quicktime"]);
export const MAX_ALBUM_PHOTO_BYTES = 15 * 1024 * 1024;
export const MAX_ALBUM_PHOTO_COUNT = 20;

export function rejectOversizedRequest(request: Request, maxBytes: number): Response | null {
  const cl = request.headers.get("content-length");
  if (!cl) return null;
  const n = Number(cl);
  if (!Number.isFinite(n) || n < 0) return new Response(JSON.stringify({error:"Invalid Content-Length"}),{status:400,headers:{"Content-Type":"application/json"}});
  if (n > maxBytes) return new Response(JSON.stringify({error:"Upload too large"}),{status:413,headers:{"Content-Type":"application/json"}});
  return null;
}
