import { json } from '../../lib/response.js';
import { isAppError, Errors } from '@framenest/shared';
import { requireAuth } from '../../middleware/auth.js';
import { SpaceRepo } from '../../repos/space-repo.js';
import { hashPassword } from '../../lib/password.js';

export async function onRequestGet(context: { request: Request; env: { DB: D1Database }; params: { slug: string } }): Promise<Response> {
  try {
    const repo = new SpaceRepo(context.env.DB);
    const space = await repo.getBySlug(context.params.slug);
    if (!space) return json({ error: 'Space not found', code: 'NOT_FOUND' }, 404);
    return json({ id: space.id, name: space.name, slug: space.slug, themeColor: space.theme_color, logoUrl: space.logo_url, heroEnabled: space.hero_enabled === 1, heroSource: space.hero_source, heroStyle: space.hero_style });
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}

export async function onRequestPut(context: { request: Request; env: { DB: D1Database }; params: { slug: string } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return auth;

    const repo = new SpaceRepo(context.env.DB);
    const space = await repo.getBySlug(context.params.slug);
    if (!space) return json({ error: 'Space not found', code: 'NOT_FOUND' }, 404);
    if (space.owner_id !== auth.actor.userId && auth.actor.role !== 'platform_owner') {
      return json({ error: 'Not authorized', code: 'FORBIDDEN' }, 403);
    }

    const body = await context.request.json() as { name?: string; slug?: string; gateKey?: string; themeColor?: string; heroSource?: string; heroStyle?: string };
    const updates: Record<string, unknown> = {};

    if (body.name) updates.name = body.name;
    if (body.slug) {
      if (body.slug !== context.params.slug) {
        const existing = await repo.getBySlug(body.slug);
        if (existing) return json(Errors.conflict('Space', 'slug').toJSON(), 409);
      }
      updates.slug = body.slug;
    }
    if (body.themeColor) updates.theme_color = body.themeColor;
    if (body.heroSource !== undefined) updates.hero_source = body.heroSource;
    if (body.heroStyle !== undefined) updates.hero_style = body.heroStyle;

    await repo.update(space.id, updates);

    if (body.gateKey) {
      const gateHash = await hashPassword(body.gateKey);
      await repo.updatePassword(space.id, gateHash);
    }

    const updated = await repo.getById(space.id);
    return json({ id: updated!.id, name: updated!.name, slug: updated!.slug, themeColor: updated!.theme_color });
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}
