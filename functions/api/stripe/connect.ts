/** Stripe Connect onboarding — POST (create/link) + GET (status) */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";
import { createConnectAccount, createAccountLink, getAccount } from "../../lib/stripe";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; STRIPE_SECRET_KEY?: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const secret = context.env.STRIPE_SECRET_KEY;
  if (!secret) return json({ error: "Stripe not configured" }, 500);

  const db = context.env.DB!;
  const user = await db.prepare("SELECT email, name FROM users WHERE id = ?").bind(a.userId).first() as any;
  if (!user) return json({ error: "User not found" }, 404);

  const photographer = await db.prepare("SELECT id, stripe_config FROM photographers WHERE email = ? AND status = 'approved'").bind(user.email).first() as any;
  if (!photographer) return json({ error: "Not an approved photographer" }, 403);

  let config: any = {};
  try { config = JSON.parse(photographer.stripe_config || "{}"); } catch {}

  const origin = new URL(context.request.url).origin;

  // Create account if needed
  if (!config.stripeAccountId) {
    const accountId = await createConnectAccount(secret, user.email, user.name);
    config.stripeAccountId = accountId;
    await db.prepare("UPDATE photographers SET stripe_config = ? WHERE id = ?").bind(JSON.stringify(config), photographer.id).run();
  }

  // Generate onboarding link
  const url = await createAccountLink(secret, config.stripeAccountId, `${origin}/dashboard?stripe=success`, `${origin}/dashboard?stripe=refresh`);

  return json({ url, accountId: config.stripeAccountId });
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; STRIPE_SECRET_KEY?: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;
  const secret = context.env.STRIPE_SECRET_KEY;
  if (!secret) return json({ connected: false });

  const db = context.env.DB!;
  const user = await db.prepare("SELECT email FROM users WHERE id = ?").bind(a.userId).first() as any;
  if (!user) return json({ connected: false });

  const photographer = await db.prepare("SELECT stripe_config FROM photographers WHERE email = ?").bind(user.email).first() as any;
  if (!photographer) return json({ connected: false });

  let config: any = {};
  try { config = JSON.parse(photographer.stripe_config || "{}"); } catch {}
  if (!config.stripeAccountId) return json({ connected: false });

  try {
    const account = await getAccount(secret, config.stripeAccountId);
    return json({ connected: true, chargesEnabled: account.charges_enabled, payoutsEnabled: account.payouts_enabled, accountId: config.stripeAccountId });
  } catch {
    return json({ connected: false, accountId: config.stripeAccountId });
  }
}
