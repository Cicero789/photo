// CORS middleware

const ALLOWED_ORIGINS = [
  'https://framenest.photos',
  'https://framenest-v2.pages.dev',
  'https://staging.framenest-v2.pages.dev',
  'http://localhost:3000',
  'http://localhost:8788',
];

export function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';

  if (ALLOWED_ORIGINS.includes(origin) || origin.startsWith('http://localhost')) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Album-Password',
      'Access-Control-Max-Age': '86400',
    };
  }

  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS[0]!,
  };
}

export function handlePreflight(request: Request): Response | null {
  if (request.method === 'OPTIONS') {
    const headers = corsHeaders(request);
    return new Response(null, { status: 204, headers });
  }
  return null;
}
