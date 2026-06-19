/** Stripe REST API helper for Cloudflare Workers (no SDK needed) */

const STRIPE_API = "https://api.stripe.com/v1";

function encodeForm(params: Record<string, string>): string {
  return Object.entries(params).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
}

export async function stripeRequest(path: string, secret: string, params?: Record<string, string>, method = "POST"): Promise<any> {
  const res = await fetch(`${STRIPE_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params ? encodeForm(params) : undefined,
  });
  const data: any = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `Stripe error ${res.status}`);
  return data;
}

/** Create a Stripe Connect Express account for a photographer */
export async function createConnectAccount(secret: string, email: string, name: string): Promise<string> {
  const account = await stripeRequest("/accounts", secret, {
    type: "express",
    email,
    "business_profile[name]": name,
    "capabilities[transfers][requested]": "true",
    "capabilities[card_payments][requested]": "true",
  });
  return account.id;
}

/** Generate an Account Link for onboarding */
export async function createAccountLink(secret: string, accountId: string, returnUrl: string, refreshUrl: string): Promise<string> {
  const link = await stripeRequest("/account_links", secret, {
    account: accountId,
    type: "account_onboarding",
    return_url: returnUrl,
    refresh_url: refreshUrl,
  });
  return link.url;
}

/** Create a Checkout Session with connected account as destination */
export async function createCheckoutSession(
  secret: string,
  opts: { photographerStripeId: string; amountCents: number; productName: string; successUrl: string; cancelUrl: string; orderId: string; platformFeeCents?: number }
): Promise<{ id: string; url: string }> {
  const params: Record<string, string> = {
    mode: "payment",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": opts.amountCents.toString(),
    "line_items[0][price_data][product_data][name]": opts.productName,
    "line_items[0][quantity]": "1",
    success_url: opts.successUrl,
    cancel_url: opts.cancelUrl,
    "metadata[order_id]": opts.orderId,
    "payment_intent_data[transfer_data][destination]": opts.photographerStripeId,
  };
  if (opts.platformFeeCents) {
    params["payment_intent_data[application_fee_amount]"] = opts.platformFeeCents.toString();
  }
  const session = await stripeRequest("/checkout/sessions", secret, params);
  return { id: session.id, url: session.url };
}

/** Retrieve a Stripe account to check onboarding status */
export async function getAccount(secret: string, accountId: string): Promise<any> {
  return stripeRequest(`/accounts/${accountId}`, secret, undefined, "GET");
}
