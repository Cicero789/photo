import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface Notif { id: string; type: string; message: string; link: string | null; read: boolean; createdAt: string }

export function NotificationBell() {
  const [items, setItems] = useState<Notif[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.get("/notifications").then((d: any) => { setItems(d.items || []); setUnread(d.unread || 0); }).catch(()=>{});
    const interval = setInterval(() => { api.get("/notifications").then((d: any) => setUnread(d.unread || 0)).catch(()=>{}); }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = async () => {
    if (unread > 0) { try { await api.put("/notifications"); setUnread(0); setItems(prev => prev.map(i => ({...i, read: true}))); } catch {} }
  };

  return <div ref={ref} className="relative">
    <button onClick={() => { setOpen(!open); if (!open) markRead(); }} className="relative rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
      🔔 {unread > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{unread > 9 ? "9+" : unread}</span>}
    </button>
    {open && <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-white shadow-xl z-50 max-h-96 overflow-y-auto">
      <div className="p-3 border-b border-border"><h3 className="text-sm font-semibold text-neutral-900">Notifications</h3></div>
      {items.length === 0 ? <p className="p-4 text-sm text-neutral-400 text-center">No notifications yet.</p>
      : items.map(item => (
        <div key={item.id} className={cn("px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors", !item.read && "bg-primary-50/50")}>
          <p className="text-sm text-neutral-700">{item.message}</p>
          <p className="text-[10px] text-neutral-400 mt-0.5">{new Date(item.createdAt).toLocaleDateString()}</p>
          {item.link && <Link to={item.link} onClick={() => setOpen(false)} className="text-xs text-primary-600 hover:text-primary-700 mt-1 inline-block">View →</Link>}
        </div>
      ))}
    </div>}
  </div>;
}
