import { json } from '../../lib/response.js';
import { signupSchema, Errors, isAppError } from '@framenest/shared';
import { AuthService } from '../../services/auth-service.js';
import { UserRepo } from '../../repos/user-repo.js';
import { SpaceRepo } from '../../repos/space-repo.js';
import { serializeUser } from '../../serializers/user.js';

export async function onRequestPost(context: { request: Request; env: { DB: D1Database; JWT_SECRET: string } }): Promise<Response> {
  try {
    const body = await context.request.json();
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) return json(Errors.validation(parsed.error.issues).toJSON(), 400);

    const service = new AuthService(
      new UserRepo(context.env.DB),
      new SpaceRepo(context.env.DB),
      context.env,
    );

    const result = await service.signup(parsed.data);

    return json({
      token: result.token,
      user: serializeUser(result.user),
      space: { id: result.space.id, name: result.space.name, slug: result.space.slug },
    }, 201);
  } catch (err) {
    if (isAppError(err)) return json(err.toJSON(), err.status);
    throw err;
  }
}
