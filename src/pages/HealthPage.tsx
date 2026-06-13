import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface CheckResult { name: string; status: "pass" | "fail" | "warn"; ms: number; error?: string }
interface HealthData { overall: string; passed: number; failed: number; warnings: number; modules: Record<string, CheckResult[]>; timestamp: string }

export function HealthPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetch = async () => { setLoading(true); setError(""); try { const d: any = await api.get("/health"); setData(d); } catch (e: any) { setError(e.message); } finally { setLoading(false); } };
  useEffect(() => { fetch(); }, []);

  const statusColor = (s: string) => s === "pass" ? "bg-emerald-500" : s === "fail" ? "bg-red-500" : "bg-amber-500";
  const statusBg = (s: string) => s === "pass" ? "bg-emerald-50 border-emerald-200" : s === "fail" ? "bg-red-50 border-red-200" : "bg-amber-50 border-amber-200";

  return <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
    <div className="flex items-center justify-between mb-6">
      <div><h1 className="font-display text-2xl font-bold text-neutral-900">System Health</h1><p className="text-sm text-neutral-500">Module self-check — green = OK, red = broken, amber = warning</p></div>
      <button onClick={fetch} disabled={loading} className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-neutral-50 disabled:opacity-50">{loading ? "Checking..." : "🔄 Refresh"}</button>
    </div>

    {error && <div className="mb-4 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

    {loading && !data ? <div className="flex justify-center py-20"><div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" /></div> : data && <>
      {/* Overall status */}
      <div className={cn("mb-6 rounded-xl border-2 p-6 text-center", statusBg(data.overall))}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className={cn("h-4 w-4 rounded-full", statusColor(data.overall))} />
          <span className="text-xl font-bold">{data.overall === "pass" ? "✅ All Systems Go" : data.overall === "warn" ? "⚠️ Running with Warnings" : "❌ Issues Detected"}</span>
        </div>
        <div className="flex justify-center gap-6 text-sm">
          <span className="text-emerald-700 font-semibold">{data.passed} passed</span>
          {data.failed > 0 && <span className="text-red-700 font-semibold">{data.failed} failed</span>}
          {data.warnings > 0 && <span className="text-amber-700 font-semibold">{data.warnings} warnings</span>}
        </div>
        <p className="text-xs text-neutral-400 mt-2">{new Date(data.timestamp).toLocaleString()}</p>
      </div>

      {/* Module grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {Object.entries(data.modules).map(([module, checks]) => {
          const modStatus = checks.some(c => c.status === "fail") ? "fail" : checks.some(c => c.status === "warn") ? "warn" : "pass";
          return <div key={module} className={cn("rounded-xl border p-5", statusBg(modStatus))}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold capitalize text-neutral-900">{module}</h3>
              <span className={cn("h-3 w-3 rounded-full", statusColor(modStatus))} />
            </div>
            <div className="space-y-1.5">
              {checks.map(c => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="text-neutral-600 truncate flex-1 mr-2">{c.name}</span>
                  <span className={cn("font-semibold", c.status === "pass" ? "text-emerald-600" : c.status === "fail" ? "text-red-600" : "text-amber-600")}>
                    {c.status === "pass" ? `${c.ms}ms` : c.status === "fail" ? "❌" : "⚠️"}
                  </span>
                </div>
              ))}
            </div>
            {checks.filter(c => c.error).map(c => <p key={c.name} className="mt-1 text-[10px] text-red-500 truncate">{c.error}</p>)}
          </div>;
        })}
      </div>
    </>}
  </div>;
}
