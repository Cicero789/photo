/** Stripe Subscription — POST to create $10/month verified subscription */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";
import { stripeRequest } from "../../lib/stripe";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; STRIPE_SECRET_KEY?: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const secret = context.env.STRIPE_SECRET_KEY;
  if (!secret) return json({ error: "Stripe not configured" }, 500);

  const db = context.env.DB!;
  const user = await db.prepare("SELECT email, name FROM users WHERE id = ?").bind(a.userId).first() as any;
  if (!user) return json({ error: "User not found" }, 404);

  const photographer = await db.prepare("SELECT id, verified, subscription_id FROM photographers WHERE email = ? AND status = 'approved'").bind(user.email).first() as any;
  if (!photographer) return json({ error: "Switch to Pro mode first" }, 400);
  if (photographer.subscription_id) return json({ error: "Already subscribed" }, 400);

  const origin = new URL(context.request.url).origin;

  // Create Checkout Session in subscription mode
  const session = await stripeRequest("/checkout/sessions", secret, {
    mode: "subscription",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": "1000",
    "line_items[0][price_data][recurring][interval]": "month",
    "line_items[0][price_data][product_data][name]": "FrameNest Verified",
    "line_items[0][price_data][product_data][description]": "Verified badge, professional video streaming, map pin, priority directory listing",
    "line_items[0][quantity]": "1",
    customer_email: user.email,
    "metadata[photographer_id]": photographer.id,
    success_url: `${origin}/dashboard?subscription=success`,
    cancel_url: `${origin}/dashboard?subscription=cancelled`,
  });

  return json({ url: session.url });
}
