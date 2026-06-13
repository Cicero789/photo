import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface Pricing { downloads: { single: number; full: number }; prints: Record<string,number> }
const defaults: Pricing = { downloads: { single: 4.99, full: 49 }, prints: { "4×6": 2.99, "8×10": 12.99, "16×20": 49.99 } };

export function PricingPanel() {
  const [pricing, setPricing] = useState<Pricing>(defaults);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => { api.get("/photographers/config").then((d: any) => { if (d?.pricing) try { setPricing(JSON.parse(d.pricing)); } catch {} }).catch(()=>{}); }, []);

  const save = async () => { setSaving(true); try { await api.put("/photographers/config", { pricing: JSON.stringify(pricing) }); setMsg("Saved!"); } catch { setMsg("Failed"); } finally { setSaving(false); } };

  return <div className="space-y-4 p-4 rounded-xl border bg-white">
    <h3 className="font-semibold">💰 Pricing</h3>
    <div className="grid grid-cols-2 gap-3">
      <div><label className="text-xs text-neutral-500">Single Download ($)</label><input type="number" step="0.01" min="0" value={pricing.downloads.single} onChange={e => setPricing(p => ({...p, downloads: {...p.downloads, single: +e.target.value}}))} className="mt-1 w-full rounded border px-2 py-1 text-sm" /></div>
      <div><label className="text-xs text-neutral-500">Full Gallery ($)</label><input type="number" step="0.01" min="0" value={pricing.downloads.full} onChange={e => setPricing(p => ({...p, downloads: {...p.downloads, full: +e.target.value}}))} className="mt-1 w-full rounded border px-2 py-1 text-sm" /></div>
    </div>
    <div><label className="text-xs text-neutral-500">Prints</label>
      <div className="grid grid-cols-3 gap-2 mt-1">
        {Object.entries(pricing.prints).map(([size, price]) => (
          <div key={size}><span className="text-[10px] text-neutral-400">{size}</span>
            <input type="number" step="0.01" min="0" value={price} onChange={e => setPricing(p => ({...p, prints: {...p.prints, [size]: +e.target.value}}))} className="w-full rounded border px-2 py-1 text-sm" /></div>
        ))}
      </div>
    </div>
    <button onClick={save} disabled={saving} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">{saving?"Saving...":"Save pricing"}</button>
    {msg && <p className="text-xs text-neutral-500">{msg}</p>}
  </div>;
}
