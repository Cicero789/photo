import { json } from "./lib/response";
import { checkRateLimit, getClientIP } from "./lib/rate-limit";
import { verifyToken, getJwtSecret } from "./lib/jwt";

// ── CORS ──────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  "https://fotods.no",
  "https://www.fotods.no",
];

function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get("Origin");
  if (!origin) return "";
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  // In dev, allow localhost origins.
  if (origin.startsWith("http://localhost")) return origin;
  if (origin === "null") return ""; // opaque origin
  return "";
}

function addCorsHeaders(response: Response, origin: string): Response {
  const headers = new Headers(response.headers);
  // No ACAO header for origins outside the allowlist — falling back to "*"
  // would defeat the allowlist entirely.
  if (origin) headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Max-Age", "86400");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// ── Rate limiting ─────────────────────────────────────────────────
const RATE_LIMITED_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const RATE_LIMITED_PREFIXES = ["/api/auth/login", "/api/auth/gate"];

function isRateLimited(request: Request): boolean {
  if (!RATE_LIMITED_METHODS.has(request.method)) return false;
  const url = new URL(request.url);
  return RATE_LIMITED_PREFIXES.some((prefix) => url.pathname === prefix);
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
];

function requiresAuth(request: Request): boolean {
  const url = new URL(request.url);
  const path = url.pathname;
  // GET /api/spaces/:slug is public — the gate page must show the space
  // before the viewer has a token. /api/spaces/members stays protected.
  if (request.method === "GET" && /^\/api\/spaces\/[^/]+$/.test(path) && path !== "/api/spaces/members") {
    return false;
  }
  return PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix));
}

// ── Middleware entry ──────────────────────────────────────────────

export async function onRequest(
  context: { request: Request; env: { DB?: D1Database; JWT_SECRET?: string; ENVIRONMENT?: string }; next: () => Promise<Response> },
): Promise<Response> {
  const { request, env, next } = context;

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
