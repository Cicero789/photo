// Auth middleware — JWT verification, role checking, space ownership
import { ROLE_LEVELS } from '@framenest/shared';
import type { Role } from '@framenest/shared';
import { verifyToken } from '../lib/jwt.js';
import { json } from '../lib/response.js';

export interface Actor {
  userId: string;
  spaceId: string;
  role: Role;
  sessionId: string;
}

export interface AuthEnv {
  DB?: D1Database;
  JWT_SECRET?: string;
}

export async function requireAuth(request: Request, env?: AuthEnv): Promise<{ actor: Actor } | Response> {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) {
    return json({ error: 'Authentication required', code: 'UNAUTHORIZED' }, 401);
  }

  const token = header.slice(7);
  const payload = await verifyToken(token, env);

  if (!payload) {
    return json({ error: 'Invalid or expired token', code: 'UNAUTHORIZED' }, 401);
  }

  // Verify token hasn't been revoked (token_version check)
  if (env?.DB) {
    const user = await env.DB.prepare(
      'SELECT token_version FROM users WHERE id = ?'
    ).bind(payload.userId).first<{ token_version: number }>();

    if (!user || user.token_version !== payload.tokenVersion) {
      return json({ error: 'Token has been revoked', code: 'UNAUTHORIZED' }, 401);
    }
  }

  return {
    actor: {
      userId: payload.userId,
      spaceId: payload.spaceId,
      role: payload.role,
      sessionId: payload.jti,
    },
  };
}

export function requireRole(actor: Actor, minimumRole: Role): Response | null {
  if (ROLE_LEVELS[actor.role] < ROLE_LEVELS[minimumRole]) {
    return json({
      error: `This action requires ${minimumRole} role or higher`,
      code: 'FORBIDDEN',
    }, 403);
  }
  return null;
}

export function requireSpaceOwnership(actor: Actor, resourceSpaceId: string): Response | null {
  // Platform owner can access any space
  if (actor.role === 'platform_owner') return null;
  // Gate viewer is scoped to their space
  if (actor.spaceId !== resourceSpaceId) {
    // Staff/page_admin who are members of the space can access
    return json({ error: 'You do not have access to this space', code: 'FORBIDDEN' }, 403);
  }
  return null;
}
