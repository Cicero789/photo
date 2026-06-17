import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";

interface HireButtonProps { photographerName: string; photographerId?: string; eventTitle?: string; locationName?: string; className?: string }

export function HireButton({ photographerName, photographerId, eventTitle, locationName, className }: HireButtonProps) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const template = `Hi ${photographerName},\n\nI found your photos${eventTitle ? ` from "${eventTitle}"` : ""}${locationName ? ` at ${locationName}` : ""} and I'd love to hire you!\n\nI'm looking for a photographer for my upcoming event.\n\n📅 Date: [tell them when]\n📍 Location: [tell them where]\n\nWould love to hear about your availability and pricing!`;

  const handleSend = async () => {
    if (!user) { navigate("/signup"); return; }
    setSending(true);
    try {
      await api.post("/bookings/inquire", { photographerId, message: message || template, eventTitle, locationName });
      setDone(true);
    } catch (err: any) { alert(err.message || "Failed to send"); }
    finally { setSending(false); }
  };

  return <>
    <button onClick={() => setShowModal(true)} className={className || "rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700"}>
      📸 Hire {photographerName.split(" ")[0]}
    </button>
    {showModal && <div className="fixed inset-0 z-50 flex items-center justify-center"><div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
      <div className="relative mx-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        {done ? <div className="text-center py-8"><span className="text-4xl">📧</span><h2 className="mt-4 text-lg font-bold">Inquiry sent!</h2><p className="mt-2 text-sm text-neutral-500">{photographerName} will respond shortly.</p><button onClick={() => setShowModal(false)} className="mt-4 rounded-xl bg-primary-600 px-6 py-2 text-sm font-semibold text-white">Done</button></div> : <>
        <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold">Hire {photographerName}</h2><button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-neutral-600">✕</button></div>
        {!user && <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">You'll create a free account when you send this inquiry.</div>}
        <textarea value={message || template} onChange={e => setMessage(e.target.value)} rows={8} className="w-full rounded-lg border p-3 text-sm" placeholder="Write your message..." />
        <div className="flex gap-3 mt-4">
          <button onClick={() => setShowModal(false)} className="flex-1 rounded-xl border px-4 py-2 text-sm font-medium">Cancel</button>
          <button onClick={handleSend} disabled={sending} className="flex-1 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">{sending ? "Sending..." : user ? "Send inquiry" : "Create account & send"}</button>
        </div></>}
      </div>
    </div>}
  </>;
}
