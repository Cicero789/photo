/** Stripe Identity verification — POST to start verification session */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";
import { stripeRequest } from "../../lib/stripe";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; STRIPE_SECRET_KEY?: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const secret = context.env.STRIPE_SECRET_KEY;
  if (!secret) return json({ error: "Stripe not configured" }, 500);

  const db = context.env.DB!;
  const user = await db.prepare("SELECT email FROM users WHERE id = ?").bind(a.userId).first() as any;
  if (!user) return json({ error: "User not found" }, 404);

  const photographer = await db.prepare("SELECT id, verified FROM photographers WHERE email = ?").bind(user.email).first() as any;
  if (!photographer) return json({ error: "Switch to Pro mode first" }, 400);
  if (photographer.verified) return json({ error: "Already verified" }, 400);

  const origin = new URL(context.request.url).origin;
  const session = await stripeRequest("/identity/verification_sessions", secret, {
    type: "document",
    "metadata[photographer_id]": photographer.id,
    "metadata[user_id]": a.userId,
    return_url: `${origin}/dashboard?verified=complete`,
  });

  return json({ url: session.url, sessionId: session.id });
}
