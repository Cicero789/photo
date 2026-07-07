import { json } from '../../lib/response.js';
import { resetPasswordSchema, Errors, isAppError } from '@framenest/shared';
export async function onRequestPost(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const body = await context.request.json();
    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) return json(Errors.validation(parsed.error.issues).toJSON(), 400);
    return json({ message: 'Password has been reset.' });
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}
