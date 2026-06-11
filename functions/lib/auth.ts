import { verifyToken, getJwtSecret } from "./jwt"; import { json } from "./response";

type Role = "platform_owner" | "page_admin" | "staff" | "viewer";
interface AuthPayload { userId: string; spaceId: string; role: Role; jti: string; }
interface AuthEnv { JWT_SECRET?: string; ENVIRONMENT?: string; }

export async function requireAuth(request: Request, env?: AuthEnv): Promise<AuthPayload | Response> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Authentication required" }, 401);
  try {
    const secret = getJwtSecret(env);
    const payload = await verifyToken(authHeader.slice(7), secret);
    if (!payload) return json({ error: "Invalid or expired token" }, 401);
    return { userId: payload.userId, spaceId: payload.spaceId, role: payload.role as Role, jti: payload.jti };
  } catch (err) {
    console.error("Auth error:", err);
    return json({ error: "Server configuration error" }, 500);
  }
}

export function requireRole(payload: AuthPayload, minRole: Role): Response | null {
  const ROLES: Record<Role, number> = { platform_owner: 4, page_admin: 3, staff: 2, viewer: 1 };
  if (ROLES[payload.role] < ROLES[minRole]) return json({ error: "You don't have permission to perform this action." }, 403);
  return null;
}

export function requireSpaceOwnership(payload: AuthPayload, resourceSpaceId: string): Response | null {
  if (payload.spaceId !== resourceSpaceId && payload.role !== "platform_owner") return json({ error: "Access denied — you don't own this resource." }, 403);
  return null;
}
