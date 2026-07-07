import { json } from '../../lib/response.js';
import { gateSchema, Errors, isAppError } from '@framenest/shared';
import { AuthService } from '../../services/auth-service.js';
import { UserRepo } from '../../repos/user-repo.js';
import { SpaceRepo } from '../../repos/space-repo.js';
import { serializeUser } from '../../serializers/user.js';

export async function onRequestPost(context: { request: Request; env: { DB: D1Database; JWT_SECRET: string } }): Promise<Response> {
  try {
    const body = await context.request.json();
    const parsed = gateSchema.safeParse(body);
    if (!parsed.success) return json(Errors.validation(parsed.error.issues).toJSON(), 400);

    const service = new AuthService(new UserRepo(context.env.DB), new SpaceRepo(context.env.DB), context.env);
    const result = await service.gate(parsed.data.spaceSlug, parsed.data.gateKey);

    return json({ token: result.token, user: serializeUser(result.user), space: result.space });
  } catch (err) {
    if (isAppError(err)) return json(err.toJSON(), err.status);
    throw err;
  }
}
