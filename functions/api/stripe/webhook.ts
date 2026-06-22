import { json } from "../../lib/response";

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database; STRIPE_WEBHOOK_SECRET?: string } }): Promise<Response> {
  try {
    const sig = context.request.headers.get("stripe-signature");
    const body = await context.request.text();
    const secret = context.env.STRIPE_WEBHOOK_SECRET;

    if (!secret) return json({ error: "Webhook not configured" }, 500);
    if (!sig) return json({ error: "Unauthorized" }, 401);

    // Verify Stripe signature per Stripe's v1 scheme:
    // HMAC-SHA256(whsec_... raw key bytes, "${timestamp}.${rawBody}") compared constant-time via crypto.subtle.verify
    const parts: Record<string, string> = {};
    sig.split(",").forEach(p => { const [k, ...v] = p.split("="); if (k) parts[k.trim()] = v.join("="); });
    const timestamp = parts.t;
    const v1 = parts.v1;
    if (!timestamp || !v1) return json({ error: "Invalid signature format" }, 401);

    // Reject old events (tolerance: 5 minutes)
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - parseInt(timestamp)) > 300) return json({ error: "Timestamp too old" }, 401);

    // Compute expected signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const signedPayload = encoder.encode(`${timestamp}.${body}`);
    const expectedSig = hexToBytes(v1);

    const valid = await crypto.subtle.verify("HMAC", key, expectedSig, signedPayload);
    if (!valid) return json({ error: "Invalid signature" }, 401);

    // Process event
    const event = JSON.parse(body) as { type: string; data: { object: any } };
    const obj = event.data.object;

    if (event.type === "checkout.session.completed") {
      const orderId = obj.metadata?.order_id;
      const photographerId = obj.metadata?.photographer_id;

      if (obj.mode === "subscription" && photographerId) {
        // Subscription activated — do NOT set verified (that requires identity verification)
        await context.env.DB!.prepare(
          "UPDATE photographers SET subscription_id = ?, subscription_status = 'active' WHERE id = ?"
        ).bind(obj.subscription, photographerId).run();
      } else if (orderId) {
        // One-time payment order
        await context.env.DB!.prepare("UPDATE orders SET status = 'paid', stripe_id = ? WHERE id = ? AND status = 'pending'").bind(obj.payment_intent || obj.id, orderId).run();
      } else {
        await context.env.DB!.prepare("UPDATE orders SET status = 'paid' WHERE stripe_id = ? AND status = 'pending'").bind(obj.id).run();
      }
    } else if (event.type === "customer.subscription.deleted") {
      // Subscription cancelled — only update subscription status, not verified badge
      await context.env.DB!.prepare(
        "UPDATE photographers SET subscription_status = 'cancelled' WHERE subscription_id = ?"
      ).bind(obj.id).run();
    } else if (event.type === "invoice.payment_failed") {
      await context.env.DB!.prepare(
        "UPDATE photographers SET subscription_status = 'past_due' WHERE subscription_id = ?"
      ).bind(obj.subscription).run();
    } else if (event.type === "identity.verification_session.verified") {
      // ID verification passed — this is the ONLY path that sets verified=1
      const photographerId = obj.metadata?.photographer_id;
      if (photographerId) {
        await context.env.DB!.prepare("UPDATE photographers SET verified = 1, verified_at = datetime('now') WHERE id = ?").bind(photographerId).run();
      }
    } else if (event.type === "payment_intent.succeeded") {
      await context.env.DB!.prepare("UPDATE orders SET status = 'paid' WHERE stripe_id = ? AND status = 'pending'").bind(obj.id).run();
    } else if (event.type === "payment_intent.payment_failed") {
      await context.env.DB!.prepare("UPDATE orders SET status = 'failed' WHERE stripe_id = ? AND status = 'pending'").bind(obj.id).run();
    }
    return json({ received: true });
  } catch (err) { console.error("Webhook error:", err); return json({ error: "Failed" }, 500); }
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  return bytes;
}
