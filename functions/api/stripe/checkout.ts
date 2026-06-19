/** Stripe Checkout — POST to create a checkout session */
import { json } from "../../lib/response";
import { requireAuth } from "../../lib/auth";
import { createCheckoutSession } from "../../lib/stripe";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; STRIPE_SECRET_KEY?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env);
    if (a instanceof Response) return a;
    const secret = context.env.STRIPE_SECRET_KEY;
    if (!secret) return json({ error: "Stripe not configured" }, 500);

    const body = await context.request.json() as {
      photographerId: string;
      product: string;
      photoId?: string;
      eventId?: string;
    };
    if (!body.photographerId || !body.product) return json({ error: "photographerId and product required" }, 400);

    const db = context.env.DB!;
    const photographer = await db.prepare(
      "SELECT id, name, stripe_config, pricing_config FROM photographers WHERE id = ? AND status = 'approved'"
    ).bind(body.photographerId).first() as any;
    if (!photographer) return json({ error: "Photographer not found" }, 404);

    let stripeConfig: any = {};
    let pricing: any = {};
    try { stripeConfig = JSON.parse(photographer.stripe_config || "{}"); } catch {}
    try { pricing = JSON.parse(photographer.pricing_config || "{}"); } catch {}

    const stripeAccountId = stripeConfig.stripeAccountId || stripeConfig.stripeAccount;
    if (!stripeAccountId) return json({ error: "Photographer has not connected Stripe" }, 400);

    // Determine price from photographer's config
    let amountCents = 0;
    let productName = "";
    if (body.product === "single_download" || body.product === "download") {
      amountCents = Math.round((pricing.downloads?.single || 4.99) * 100);
      productName = `Single Photo Download — ${photographer.name}`;
    } else if (body.product === "full_gallery" || body.product === "full-gallery") {
      amountCents = Math.round((pricing.downloads?.full || 49) * 100);
      productName = `Full Gallery Download — ${photographer.name}`;
    } else if (body.product.startsWith("print-")) {
      const size = body.product.replace("print-", "");
      amountCents = Math.round(((pricing.prints || {})[size] || 9.99) * 100);
      productName = `Print ${size} — ${photographer.name}`;
    } else {
      return json({ error: "Invalid product type" }, 400);
    }

    // Create order
    const orderId = crypto.randomUUID();
    await db.prepare(
      "INSERT INTO orders (id, buyer_user_id, photographer_id, photo_id, event_id, product, amount_cents, status, created_at) VALUES (?,?,?,?,?,?,?,'pending',datetime('now'))"
    ).bind(orderId, a.userId, photographer.id, body.photoId || null, body.eventId || null, body.product, amountCents).run();

    // Create Stripe Checkout Session
    const origin = new URL(context.request.url).origin;
    const session = await createCheckoutSession(secret, {
      photographerStripeId: stripeAccountId,
      amountCents,
      productName,
      successUrl: `${origin}/dashboard?payment=success&order=${orderId}`,
      cancelUrl: `${origin}/dashboard?payment=cancelled`,
      orderId,
      platformFeeCents: Math.round(amountCents * 0.05),
    });

    await db.prepare("UPDATE orders SET stripe_id = ? WHERE id = ?").bind(session.id, orderId).run();

    return json({ url: session.url, orderId });
  } catch (err: any) {
    return json({ error: err.message || "Checkout failed" }, 500);
  }
}
