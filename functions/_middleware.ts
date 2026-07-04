import { json } from "./lib/response";
import { checkRateLimit, getClientIP } from "./lib/rate-limit";
import { verifyToken, getJwtSecret } from "./lib/jwt";

// ── CORS ──────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://fotods.no",
  "https://www.fotods.no",
  "https://framenest.photos",
  "https://www.framenest.photos",
  "https://photo-ll2.pages.dev",
];

function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get("Origin");
  if (!origin) return "";
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  // In dev, allow localhost origins.
  try {
    const parsed = new URL(origin);
    if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") return origin;
  } catch {}
  if (origin === "null") return ""; // opaque origin
  return "";
}

function addSecurityHeaders(headers: Headers): void {
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' https://api.mapbox.com https://js.stripe.com; style-src 'self' 'unsafe-inline' https://api.mapbox.com; img-src 'self' data: blob: https://images.unsplash.com https://*.mapbox.com; connect-src 'self' https://api.mapbox.com https://*.stripe.com; frame-src https://js.stripe.com https://connect.stripe.com; font-src 'self'; worker-src 'self' blob:");
}

function addCorsHeaders(response: Response, origin: string): Response {
  const headers = new Headers(response.headers);
  // No ACAO header for origins outside the allowlist — falling back to "*"
  // would defeat the allowlist entirely.
  if (origin) headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Album-Password");
  headers.set("Access-Control-Max-Age", "86400");
  addSecurityHeaders(headers);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// ── Rate limiting ─────────────────────────────────────────────────
const RATE_LIMITED_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const RATE_LIMITED_PREFIXES = [
  "/api/auth/login", "/api/auth/gate", "/api/auth/signup",
  "/api/auth/magic-login", "/api/auth/forgot-password", "/api/auth/reset-password", "/api/photographers",
  "/api/photos/upload", "/api/videos/upload", "/api/albums",
  "/api/albums/view", "/api/connections", "/api/bookings",
  "/api/events", "/api/spaces/members", "/api/clients",
];

function isRateLimited(request: Request): boolean {
  if (!RATE_LIMITED_METHODS.has(request.method)) return false;
  const url = new URL(request.url);
  return RATE_LIMITED_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
}

// ── Protected routes ──────────────────────────────────────────────
// Routes that require a valid token. The middleware acts as a gatekeeper —
// it rejects unauthenticated requests early. Handlers call requireAuth()
// themselves for the parsed payload and fine-grained role checks.
const PROTECTED_PREFIXES = [
  "/api/spaces",
  "/api/photos",
  "/api/videos",
  "/api/events",
  "/api/admin",
  "/api/auth/me",
  "/api/clients",
  "/api/albums",
];

function requiresAuth(request: Request): boolean {
  const url = new URL(request.url);
  const path = url.pathname;
  // Public GET endpoints — needed before viewer has a token:
  // GET /api/spaces/:slug — gate page must show the space
  // GET /api/events — demo and public space browsing
  // GET /api/events/:id — public event detail pages
  // GET /api/clients/public/:slug — public client site
  // GET /api/clients/public/:slug/galleries/:gid — public gallery photos
  // GET /api/blog/:siteSlug/:postSlug — public blog posts
  if (request.method === "GET") {
    if (/^\/api\/spaces\/[^/]+$/.test(path) && path !== "/api/spaces/members") return false;
    if (/^\/api\/events(\/[^/]+)?$/.test(path)) return false;
    if (/^\/api\/clients\/public\//.test(path)) return false;
    if (/^\/api\/blog\//.test(path)) return false;
    if (/^\/api\/albums\/view\//.test(path)) return false;
  }
  return PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix));
}

// ── Middleware entry ──────────────────────────────────────────────

export async function onRequest(
  context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; next: () => Promise<Response> },
): Promise<Response> {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const host = url.hostname;

  // 0. Custom domain detection: if host is a custom domain, add header for the frontend
  if (host !== "framenest.photos" && host !== "localhost" && !host.endsWith(".photo-ll2.pages.dev") && env.DB && request.method === "GET") {
    try {
      const space = await env.DB.prepare("SELECT slug FROM spaces WHERE custom_domain = ?").bind(host).first<{slug:string}>();
      if (space) {
        const response = await next();
        const newResponse = new Response(response.body, response);
        newResponse.headers.set("X-FrameNest-Space", space.slug);
        addSecurityHeaders(newResponse.headers);
        return newResponse;
      }
    } catch (err) { console.error("Custom domain detection error:", err); }
  }

  // 1. Handle CORS preflight.
  const origin = getAllowedOrigin(request);
  if (request.method === "OPTIONS") {
    const res = new Response(null, { status: 204 });
    return addCorsHeaders(res, origin);
  }

  // 2. Rate limit write operations on auth endpoints.
  if (isRateLimited(request) && env.DB) {
    const ip = getClientIP(request);
    const url = new URL(request.url);
    const endpoint = url.pathname.replace(/^\/api\//, "");
    const limit = await checkRateLimit(env.DB, ip, endpoint);
    if (!limit.allowed) {
      const res = json(
        { error: `Too many requests. Please try again in ${limit.retryAfter} seconds.` },
        429,
      );
      return addCorsHeaders(res, origin);
    }
  }

  // 3. Verify auth for protected routes (gatekeeper — early reject).
  //    Handlers still call requireAuth() themselves for the parsed payload;
  //    the middleware check prevents unauthenticated requests from reaching
  //    handler logic (DB queries, etc.).
  if (requiresAuth(request)) {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      const res = json({ error: "Authentication required." }, 401);
      return addCorsHeaders(res, origin);
    }
    const payload = await verifyToken(authHeader.slice(7), getJwtSecret(env));
    if (!payload) {
      const res = json({ error: "Invalid or expired token." }, 401);
      return addCorsHeaders(res, origin);
    }
  }

  // 4. Pass through to the route handler.
  try {
    const response = await next();
    return addCorsHeaders(response, origin);
  } catch (err) {
    console.error("Middleware error:", err);
    const res = json({ error: "Internal server error." }, 500);
    return addCorsHeaders(res, origin);
  }
}
