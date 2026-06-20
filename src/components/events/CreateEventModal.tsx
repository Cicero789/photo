import { useState, type FormEvent } from "react";
import { EVENT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { EventCategory } from "@/types";

interface CreateEventForm {
  title: string;
  category: EventCategory;
  eventDate: string;
  description: string;
  address?: string;
  visibility?: string;
}

interface CreateEventModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEventForm) => Promise<void>;
  accountMode?: "personal" | "pro";
}

export function CreateEventModal({ open, onClose, onSubmit, accountMode = "personal" }: CreateEventModalProps) {
  const [form, setForm] = useState<CreateEventForm>({
    title: "",
    category: "other",
    eventDate: new Date().toISOString().slice(0, 10),
    description: "",
    address: "",
    visibility: "private",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit(form);
      setForm({
        title: "",
        category: "other",
        eventDate: new Date().toISOString().slice(0, 10),
        description: "",
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : (accountMode === "pro" ? "Failed to create event" : "Failed to create memory"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">{accountMode === "pro" ? "Create event" : "Create memory"}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              {accountMode === "pro" ? "Event title" : "Memory title"}
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Summer vacation in Italy"
              className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Category Picker */}
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Category
            </label>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {EVENT_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, category: cat.value }))}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition-all",
                    form.category === cat.value
                      ? "border-primary-500 bg-primary-50 shadow-sm"
                      : "border-border bg-white hover:border-neutral-300",
                  )}
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-[10px] font-medium text-neutral-600 leading-tight">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              {accountMode === "pro" ? "Event date" : "Date"}
            </label>
            <input
              type="date"
              required
              value={form.eventDate}
              onChange={(e) => setForm((f) => ({ ...f, eventDate: e.target.value }))}
              className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              Description
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder={accountMode === "pro" ? "Tell the story of this event. What happened? Who was there? What made it special?" : "Tell the story of this memory. What happened? Who was there? What made it special?"}
              className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-neutral-700">
              📍 Location / Address
            </label>
            <input
              type="text"
              value={form.address || ""}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="123 Main St, Austin, TX — or leave blank"
              className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
          </div>

          {/* Visibility toggle */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-white px-4 py-3">
            <div>
              <p className="text-sm font-medium text-neutral-700">
                {form.visibility === "public" ? "🌐 Public" : form.visibility === "gate" ? "🔐 Gate" : "🔒 Private"}
              </p>
              <p className="text-xs text-neutral-400">
                {form.visibility === "public" ? "Anyone can view" : form.visibility === "gate" ? "Gate key required" : "Only you and your team"}
              </p>
            </div>
            <select value={form.visibility || "private"} onChange={e => setForm(f => ({ ...f, visibility: e.target.value }))}
              className="rounded-lg border px-3 py-1.5 text-sm">
              <option value="private">🔒 Private</option>
              <option value="gate">🔐 Gate</option>
              <option value="public">🌐 Public</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
            >
              {saving ? "Creating..." : (accountMode === "pro" ? "Create event" : "Create memory")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
