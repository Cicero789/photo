import { useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
  onInvited: () => void;
}

export function InviteModal({ open, onClose, onInvited }: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"family" | "friend">("family");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      await api.post("/connections", { email: email.trim(), connectionType: type, message });
      setDone(true);
      onInvited();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send invitation");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl text-center">
          <span className="text-4xl">📧</span>
          <h2 className="mt-4 text-lg font-bold text-neutral-900">Invitation sent!</h2>
          <p className="mt-2 text-sm text-neutral-500">
            We let <strong>{email}</strong> know you saved a space for them.
          </p>
          <button onClick={onClose} className="mt-6 rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-900">Invite someone</h2>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600 text-lg">✕</button>
        </div>

        {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              placeholder="mom@gmail.com" className="mt-1 block w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Connection type</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setType("family")}
                className={cn("flex-1 rounded-lg border-2 px-3 py-3 text-sm font-semibold transition-all",
                  type === "family" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-border hover:border-neutral-300 text-neutral-500")}>
                👨‍👩‍👧‍👦 Family
              </button>
              <button type="button" onClick={() => setType("friend")}
                className={cn("flex-1 rounded-lg border-2 px-3 py-3 text-sm font-semibold transition-all",
                  type === "friend" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-border hover:border-neutral-300 text-neutral-500")}>
                🤝 Friend
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Personal message <span className="text-neutral-400 font-normal">(optional)</span></label>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Hey! Check out our photos..." className="mt-1 block w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50">Cancel</button>
            <button type="submit" disabled={sending} className="flex-1 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">{sending ? "Sending..." : "Send invitation"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
