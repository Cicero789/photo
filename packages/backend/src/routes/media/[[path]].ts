export async function onRequestGet(context: { request: Request; env: { PHOTOS: R2Bucket; VIDEOS?: R2Bucket; MEDIA_SIGNING_SECRET?: string; DB: D1Database } }): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    // URL is /api/media/photos/events/xxx or /api/media/videos/events/xxx
    // Strip /api/media/ and the bucket prefix to get the actual R2 key
    let path = url.pathname.replace('/api/media/', '');
    const isVideo = path.startsWith('videos/');
    const bucket = isVideo ? context.env.VIDEOS : context.env.PHOTOS;
    // Remove the bucket-type prefix (photos/ or videos/) to get actual storage key
    if (path.startsWith('photos/')) path = path.replace('photos/', '');
    else if (path.startsWith('videos/')) path = path.replace('videos/', '');

    if (!bucket) {
      return new Response(JSON.stringify({ error: 'No bucket binding', path }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const obj = await bucket.get(path);

    if (!obj) {
      return new Response(JSON.stringify({ error: 'Object not found in R2', path }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache' },
      });
    }

    const headers = new Headers();
    if (obj.httpMetadata?.contentType) headers.set('Content-Type', obj.httpMetadata.contentType);
    else headers.set('Content-Type', 'application/octet-stream');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(obj.body, { headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Media serve error', detail: String(err), path: context.request.url }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
