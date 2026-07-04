import { verifyToken, getJwtSecret } from "./jwt"; import { json } from "./response";

type Role = "platform_owner" | "page_admin" | "staff" | "viewer";
interface AuthPayload { userId: string; spaceId: string; role: Role; jti: string; }
interface AuthEnv { JWT_SECRET?: string; ENVIRONMENT?: string; [key: string]: unknown; }

export async function requireAuth(request: Request, env?: AuthEnv): Promise<AuthPayload | Response> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return json({ error: "Authentication required" }, 401);
  try {
    const secret = getJwtSecret(env);
    const payload = await verifyToken(authHeader.slice(7), secret);
    if (!payload) return json({ error: "Invalid or expired token" }, 401);

    // Check token_version for revocation
    if (env?.DB) {
      const db = env.DB as any;
      const user = await db.prepare("SELECT token_version FROM users WHERE id = ?").bind(payload.userId).first();
      if (!user || (payload.tokenVersion ?? 0) !== (user.token_version ?? 0)) {
        return json({ error: "Session expired" }, 401);
      }
    }

    return { userId: payload.userId, spaceId: payload.spaceId, role: payload.role as Role, jti: payload.jti };
  } catch (err) {
    console.error("Auth error:", err);
    return json({ error: "Server configuration error" }, 500);
  }
}

export function requireRole(payload: AuthPayload, minRole: Role): Response | null {
  const ROLES: Record<Role, number> = { platform_owner: 4, page_admin: 3, staff: 2, viewer: 1 };
  // Unknown/missing roles rank 0 so they are denied rather than slipping past the comparison.
  if ((ROLES[payload.role] ?? 0) < ROLES[minRole]) return json({ error: "You don't have permission to perform this action." }, 403);
  return null;
}

export function requireSpaceOwnership(payload: AuthPayload, resourceSpaceId: string): Response | null {
  if (payload.spaceId !== resourceSpaceId && payload.role !== "platform_owner") return json({ error: "Access denied — you don't own this resource." }, 403);
  return null;
}
