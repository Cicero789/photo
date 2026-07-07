import { json } from '../lib/response.js';
import { createInspirationSchema, Errors, isAppError, generateId } from '@framenest/shared';
import { requireAuth } from '../middleware/auth.js';

export async function onRequestGet(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const category = url.searchParams.get('category') || '';
    const sort = url.searchParams.get('sort') || 'newest';
    let query = 'SELECT i.*, u.name as user_name FROM inspiration i JOIN users u ON i.user_id = u.id WHERE 1=1';
    const params: string[] = [];
    if (category) { query += ' AND i.category = ?'; params.push(category); }
    query += sort === 'love_count' ? ' ORDER BY i.score DESC, i.love_count DESC' : ' ORDER BY i.score DESC, i.created_at DESC';
    query += ' LIMIT 100';
    const result = await context.env.DB.prepare(query).bind(...params).all();
    const items = (result.results || []).map((r: any) => ({ id: r.id, userId: r.user_id, userName: r.user_name, photoUrl: r.photo_url, address: r.address, latitude: r.latitude, longitude: r.longitude, category: r.category, season: r.season, loveCount: r.love_count, tips: r.tips || '', bestTime: r.best_time || '', permissionInfo: r.permission_info || '', source: r.source || 'framenest', score: r.score || 0, author: r.author || '', licenseUrl: r.license_url || '', thumbnailUrl: r.thumbnail_url || '', createdAt: r.created_at }));
    return json({ items });
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}

export async function onRequestPost(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const auth = await requireAuth(context.request, context.env);
    if (auth instanceof Response) return auth;
    if (auth.actor.role === 'viewer') return json({ error: 'Sign in to interact' }, 403);
    const body = await context.request.json();
    const parsed = createInspirationSchema.safeParse(body);
    if (!parsed.success) return json(Errors.validation(parsed.error.issues).toJSON(), 400);
    const id = generateId('inspiration');
    await context.env.DB.prepare('INSERT INTO inspiration (id, user_id, photo_url, address, latitude, longitude, category, season, tips, best_time, permission_info, source, score, love_count, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,0,?)').bind(id, auth.actor.userId, parsed.data.photoUrl || null, parsed.data.address, parsed.data.latitude, parsed.data.longitude, parsed.data.category, parsed.data.season, parsed.data.tips, parsed.data.bestTime, parsed.data.permissionInfo, 'framenest', 100, new Date().toISOString()).run();
    return json({ id, loveCount: 0 }, 201);
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}
