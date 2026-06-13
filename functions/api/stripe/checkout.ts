import { json } from "../../lib/response"; import { requireAuth } from "../../lib/auth";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; STRIPE_SECRET_KEY?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
    const body = await context.request.json() as { photographerId: string; product: string; amountCents: number; eventId?: string; photoId?: string };

    if (!body.photographerId || !body.product || !body.amountCents) return json({ error: "Missing fields" }, 400);

    const db = context.env.DB!;
    const photog = await db.prepare("SELECT pricing_config, stripe_config FROM photographers WHERE id = ?").bind(body.photographerId).first<{pricing_config:string;stripe_config:string}>();
    if (!photog) return json({ error: "Photographer not found" }, 404);

    const sc = JSON.parse(photog.stripe_config || "{}");
    if (!sc.stripeAccount) return json({ error: "Photographer hasn't set up payments" }, 400);

    // Server-side price validation from photographer's stored pricing
    const pricing = JSON.parse(photog.pricing_config || "{}");
    let validPrice = 0;
    if (body.product === "download" && pricing.downloads) validPrice = Math.round((pricing.downloads.single || 4.99) * 100);
    else if (body.product === "full-gallery" && pricing.downloads) validPrice = Math.round((pricing.downloads.full || 49) * 100);
    else if (body.product.startsWith("print-")) {
      const size = body.product.replace("print-", "");
      validPrice = Math.round(((pricing.prints || {})[size] || 9.99) * 100);
    }
    if (validPrice === 0) return json({ error: "Invalid product" }, 400);
    if (Math.abs(body.amountCents - validPrice) > 1) return json({ error: "Price mismatch" }, 400);

    const sk = context.env.STRIPE_SECRET_KEY;
    if (!sk) return json({ error: "Payment not configured" }, 500);

    const fee = Math.round(body.amountCents * 0.10);
    const idempotencyKey = `order-${a.userId}-${body.photographerId}-${body.product}-${body.photoId || "none"}`;

    const res = await fetch("https://api.stripe.com/v1/payment_intents", {
      method: "POST", headers: { Authorization: `Bearer ${sk}`, "Content-Type": "application/x-www-form-urlencoded", "Idempotency-Key": idempotencyKey },
      body: new URLSearchParams({
        amount: String(body.amountCents), currency: "usd", application_fee_amount: String(fee),
        "transfer_data[destination]": sc.stripeAccount,
        "metadata[photographerId]": body.photographerId, "metadata[buyerId]": a.userId, "metadata[product]": body.product,
      }).toString(),
    });

    const pi = await res.json() as any;
    if (pi.error) return json({ error: pi.error.message }, 400);

    await db.prepare("INSERT INTO orders (id, buyer_user_id, photographer_id, photo_id, event_id, product, amount_cents, stripe_id, status, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)").bind(crypto.randomUUID(), a.userId, body.photographerId, body.photoId || null, body.eventId || null, body.product, body.amountCents, pi.id, "pending", new Date().toISOString()).run();

    return json({ clientSecret: pi.client_secret });
  } catch (err: any) { return json({ error: err.message || "Checkout failed" }, 500); }
}
