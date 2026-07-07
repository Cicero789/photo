import { json } from '../../lib/response.js';
import { forgotPasswordSchema, Errors, isAppError } from '@framenest/shared';
export async function onRequestPost(context: { request: Request; env: { DB: D1Database } }): Promise<Response> {
  try {
    const body = await context.request.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) return json(Errors.validation(parsed.error.issues).toJSON(), 400);
    return json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) { if (isAppError(err)) return json(err.toJSON(), err.status); throw err; }
}
