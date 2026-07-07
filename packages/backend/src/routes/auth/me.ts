import { json } from '../../lib/response.js';
import { isAppError } from '@framenest/shared';
import { requireAuth } from '../../middleware/auth.js';
import { AuthService } from '../../services/auth-service.js';
import { UserRepo } from '../../repos/user-repo.js';
import { SpaceRepo } from '../../repos/space-repo.js';
import { serializeUser } from '../../serializers/user.js';

export async function onRequestGet(context: { request: Request; env: { DB: D1Database; JWT_SECRET: string } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return json({ user: null });

    const service = new AuthService(new UserRepo(context.env.DB), new SpaceRepo(context.env.DB), context.env);
    const { user, space } = await service.getMe(auth.actor.userId);

    return json({ user: serializeUser(user), space });
  } catch {
    return json({ user: null });
  }
}
