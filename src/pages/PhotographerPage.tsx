import { useState, useEffect, type FormEvent } from "react";
import { api } from "@/lib/api";

interface Photographer {
  id: string;
  name: string;
  email: string;
  website: string | null;
  portfolioUrl: string | null;
  serviceArea: string | null;
  bio: string | null;
}

export function PhotographerPage() {
  // ─── Application form state ───
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    serviceArea: "",
    bio: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ─── Public listing ───
  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  useEffect(() => {
    api
      .get<{ photographers: Photographer[] }>("/photographers/public")
      .then((data) => setPhotographers(data.photographers))
      .catch(() => { /* listing is non-critical */ });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    try {
      await api.post("/photographers", form);
      setForm({ name: "", email: "", website: "", serviceArea: "", bio: "" });
      setMessage({ type: "success", text: "Application submitted! We'll be in touch soon." });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to submit" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-50 via-white to-primary-50 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, #d946ef 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-accent-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-700">
              For photographers
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Finally, a home for
              <br />
              <span className="bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent">
                every photo you take
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Your clients deserve more than a zip file or a generic cloud link. Give them a
              beautiful, organized, password-protected space where every event has its own story
              — complete with AI summaries, location maps, and a viewing experience that
              finally matches the moments you capture.
            </p>
          </div>
        </div>
      </section>

      {/* Why Photo */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
            Why photographers love Photo
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent-50 text-2xl">
                  {b.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-neutral-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign-up form */}
      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-neutral-900">Join as a photographer</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Fill out the form below and we&apos;ll get you set up.
            </p>

            {message && (
              <div
                className={`mt-4 rounded-lg border px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                  Business name
                </label>
                <input id="name" type="text" required value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Doe Photography"
                  className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <input id="email" type="email" required value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="jane@janedoe.photo"
                  className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-neutral-700">
                  Portfolio / Website
                </label>
                <input id="website" type="url" value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  placeholder="https://yourportfolio.com"
                  className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="serviceArea" className="block text-sm font-medium text-neutral-700">
                  Service area
                </label>
                <input id="serviceArea" type="text" value={form.serviceArea}
                  onChange={(e) => setForm((f) => ({ ...f, serviceArea: e.target.value }))}
                  placeholder="Austin, TX / Remote"
                  className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-neutral-700">
                  About you
                </label>
                <textarea id="bio" rows={3} value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  placeholder="Tell us a bit about your work and style..."
                  className="mt-1.5 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full rounded-xl bg-accent-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 active:bg-accent-800 disabled:opacity-50">
                {saving ? "Submitting..." : "Apply to join"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Public listing */}
      {photographers.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-center font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
              Photographers on Photo
            </h2>
            <p className="mt-3 text-center text-neutral-500">
              Find a photographer for your next event.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photographers.map((p) => (
                <div key={p.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-100 text-lg font-bold text-accent-700">
                    {p.name.charAt(0)}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900">{p.name}</h3>
                  {p.serviceArea && (
                    <p className="mt-1 text-xs font-medium text-accent-600">📍 {p.serviceArea}</p>
                  )}
                  {p.bio && (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-500 line-clamp-3">{p.bio}</p>
                  )}
                  {p.website && (
                    <a href={p.website} target="_blank" rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-700">
                      Visit portfolio →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-accent-600 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to give your clients something better?
          </h2>
          <p className="mt-4 text-lg text-accent-100">
            Join Photo and offer every client their own beautiful, private photo space.
          </p>
          <a href="#apply"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-accent-700 shadow-lg transition-all hover:bg-accent-50 active:scale-[0.98]">
            Apply now — it&apos;s free
          </a>
        </div>
      </section>

      {/* Anchor for CTA */}
      <div id="apply" />
    </div>
  );
}

const BENEFITS = [
  {
    icon: "🔐",
    title: "Private by default",
    desc: "Each client gets a password-protected space. Only the people they invite can see their photos.",
  },
  {
    icon: "🤖",
    title: "AI-powered organization",
    desc: "Every event gets an AI-generated summary. Photos are mapped by location. Everything tells a story.",
  },
  {
    icon: "📱",
    title: "Beautiful on any device",
    desc: "Your clients view their photos on a stunning, fast, responsive site — not a clunky folder share.",
  },
];
