import { useState, useRef } from "react";
import { getToken } from "@/lib/api";

// Set VITE_STRIPE_PUBLISHABLE_KEY in Cloudflare Pages build vars or .env
const STRIPE_PK = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_STRIPE_PUBLISHABLE_KEY) || "";

let stripeModule: any = null;
async function getStripe() {
  if (stripeModule) return stripeModule;
  const { loadStripe } = await import("@stripe/stripe-js");
  stripeModule = await loadStripe(STRIPE_PK);
  return stripeModule;
}

export function BuyButton({ photographerId, product, amount, photoId, eventId, label }: {
  photographerId: string; product: string; amount: number; photoId?: string; eventId?: string; label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mounted = useRef(true);

  const handleBuy = async () => {
    if (!STRIPE_PK) { setError("Payments not configured"); return; }
    setLoading(true); setError("");
    try {
      const token = getToken();
      const res = await fetch("/api/stripe/checkout", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ photographerId, product, amountCents: Math.round(amount * 100), photoId, eventId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const stripe = await getStripe();
      const result = await stripe.confirmPayment({ clientSecret: data.clientSecret, confirmParams: { return_url: window.location.href } });
      if (result.error) throw new Error(result.error.message);
      if (mounted.current) window.location.reload();
    } catch (err: any) { if (mounted.current) setError(err.message); }
    finally { if (mounted.current) setLoading(false); }
  };

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <button onClick={handleBuy} disabled={loading}
        className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
        {loading ? "Processing..." : (label || `Buy — $${amount.toFixed(2)}`)}
      </button>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
}
