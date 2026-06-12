import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { InviteModal } from "./InviteModal";

interface Connection {
  id: string;
  fromUser: string;
  toEmail: string;
  toUser: string | null;
  connectionType: string;
  status: string;
  message: string;
  fromName: string;
  fromEmail: string;
  toName: string | null;
  createdAt: string;
}

export function ConnectionsTab() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInvite, setShowInvite] = useState(false);

  const fetchConnections = useCallback(async () => {
    try {
      const data = await api.get<{ connections: Connection[] }>("/connections");
      setConnections(data.connections);
    } catch {} finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchConnections(); }, [fetchConnections]);

  const handleAction = async (id: string, status: string) => {
    try { await api.put("/connections", { id, status }); fetchConnections(); }
    catch (err) { alert(err instanceof Error ? err.message : "Failed"); }
  };

  const pending = connections.filter(c => c.status === "pending");
  const accepted = connections.filter(c => c.status === "accepted");

  return (
    <div className="space-y-6">
      {/* Pending invitations you received */}
      {pending.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
          <h3 className="font-semibold text-amber-800">You have {pending.length} pending invitation{pending.length !== 1 ? "s" : ""}</h3>
          <div className="mt-4 space-y-3">
            {pending.map(c => (
              <div key={c.id} className="flex items-center justify-between rounded-xl bg-white border border-amber-200 p-4">
                <div>
                  <p className="font-medium text-neutral-900">{c.fromName || c.fromEmail}</p>
                  <p className="text-sm text-neutral-500">
                    wants to connect as <span className={cn("font-semibold", c.connectionType === "family" ? "text-blue-600" : "text-emerald-600")}>{c.connectionType === "family" ? "👨‍👩‍👧‍👦 family" : "🤝 friend"}</span>
                  </p>
                  {c.message && <p className="text-sm text-neutral-400 italic mt-1">"{c.message}"</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleAction(c.id, "accepted")} className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">Accept</button>
                  <button onClick={() => handleAction(c.id, "rejected")} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connections list */}
      <div className="rounded-2xl border border-border bg-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-neutral-900">Your connections ({accepted.length})</h3>
          <button onClick={() => setShowInvite(true)} className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">+ Invite</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8"><div className="h-6 w-6 animate-spin rounded-full border-3 border-primary-200 border-t-primary-600" /></div>
        ) : accepted.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-3xl">👥</span>
            <p className="mt-3 text-sm text-neutral-500">No connections yet. Invite family or friends to share events.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {accepted.map(c => (
              <div key={c.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                    c.connectionType === "family" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700")}>
                    {((c.toName ?? c.fromName ?? c.toEmail ?? "?")[0] ?? "?").toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-neutral-900 text-sm">{c.toName || c.fromName || c.toEmail}</p>
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold",
                        c.connectionType === "family" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700")}>
                        {c.connectionType === "family" ? "👨‍👩‍👧‍👦 Family" : "🤝 Friend"}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">{c.toEmail || c.fromEmail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <InviteModal open={showInvite} onClose={() => setShowInvite(false)} onInvited={fetchConnections} />
    </div>
  );
}
