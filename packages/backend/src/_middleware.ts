// Global middleware — runs before every API route
import { corsHeaders, handlePreflight } from './middleware/cors.js';
import { securityHeaders } from './middleware/security-headers.js';
import { checkRateLimit, getClientIP } from './middleware/rate-limit.js';
import { verifyToken } from './lib/jwt.js';
import { handleError } from './middleware/error-handler.js';
import { log } from './lib/logger.js';

const PROTECTED_PREFIXES = [
  '/api/spaces',
  '/api/photos',
  '/api/videos',
  '/api/events',
  '/api/admin',
  '/api/auth/me',
  '/api/clients',
  '/api/albums',
  '/api/bookings',
  '/api/professionals/config',
  '/api/professionals/portfolio',
  '/api/professionals/stats',
  '/api/notifications',
  '/api/connections',
  '/api/users/mode',
  '/api/inspiration',
  '/api/stripe',
];

const RATE_LIMITED_PATHS = [
  '/api/auth/login',
  '/api/auth/gate',
  '/api/auth/signup',
  '/api/auth/magic-login',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/photographers',
  '/api/photos/upload',
  '/api/videos/upload',
  '/api/albums',
  '/api/connections',
  '/api/bookings',
  '/api/events',
  '/api/clients',
];

const PUBLIC_GET_PREFIXES = [
  '/api/photographers/public',
  '/api/photographers/profile',
  '/api/photographers/reviews',
  '/api/inspiration',
  '/api/clients/public',
  '/api/blog',
  '/api/albums/view',
  '/api/ads',
  '/api/health',
  '/api/spaces/by-domain',
];

interface MiddlewareContext {
  request: Request;
  env: { DB?: D1Database; JWT_SECRET?: string };
  next: () => Promise<Response>;
}

export async function onRequest(context: MiddlewareContext): Promise<Response> {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const requestId = crypto.randomUUID();
  const start = Date.now();

  // 1. CORS preflight
  const preflight = handlePreflight(request);
  if (preflight) return preflight;

  try {
    // 2. Rate limiting for write-heavy paths
    if (RATE_LIMITED_PATHS.some(p => path.startsWith(p)) && env.DB) {
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
        const endpoint = RATE_LIMITED_PATHS.find(p => path.startsWith(p)) ?? path;
        const result = await checkRateLimit(env.DB, request, endpoint);
        if (result && !result.allowed) {
          const retryAfter = result.retryAfter ?? 60;
          return new Response(JSON.stringify({
            error: 'Too many requests',
            code: 'RATE_LIMITED',
            details: { retryAfterSeconds: retryAfter },
            requestId,
          }), {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(retryAfter),
              ...corsHeaders(request),
              ...securityHeaders(),
            },
          });
        }
      }
    }

    // 3. Auth gatekeeper for protected paths
    const isProtected = PROTECTED_PREFIXES.some(p => path.startsWith(p));
    const isPublicGet = PUBLIC_GET_PREFIXES.some(p => path.startsWith(p)) && request.method === 'GET';
    const isPublicSpace = path.startsWith('/api/spaces/') && request.method === 'GET';

    if (isProtected && !isPublicGet && !isPublicSpace) {
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return new Response(JSON.stringify({ error: 'Authentication required', code: 'UNAUTHORIZED', requestId }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(request), ...securityHeaders() },
        });
      }
      const payload = await verifyToken(token, env);
      if (!payload) {
        return new Response(JSON.stringify({ error: 'Invalid or expired token', code: 'UNAUTHORIZED', requestId }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders(request), ...securityHeaders() },
        });
      }
    }

    // 4. Execute the route handler
    const response = await next();

    // 5. Add security + CORS headers to response
    const newHeaders = new Headers(response.headers);
    const cors = corsHeaders(request);
    const security = securityHeaders();
    for (const [k, v] of Object.entries({ ...cors, ...security })) {
      if (!newHeaders.has(k)) newHeaders.set(k, v);
    }
    newHeaders.set('X-Request-Id', requestId);

    const duration = Date.now() - start;
    if (duration > 1000) {
      log({ level: 'warn', message: 'Slow request', requestId, duration, metadata: { path, method: request.method } });
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });

  } catch (err) {
    log({ level: 'error', message: 'Unhandled error in middleware', requestId, metadata: { path, error: String(err) } });
    const errorResponse = handleError(err, requestId);
    const newHeaders = new Headers(errorResponse.headers);
    const cors = corsHeaders(request);
    const security = securityHeaders();
    for (const [k, v] of Object.entries({ ...cors, ...security })) {
      if (!newHeaders.has(k)) newHeaders.set(k, v);
    }
    return new Response(errorResponse.body, { status: errorResponse.status, headers: newHeaders });
  }
}
