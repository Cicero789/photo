import { useState, useEffect, type FormEvent } from "react";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";

interface Photographer {
  id: string;
  name: string;
  slug: string | null;
  tagline: string | null;
  specialties: string | null;
  website: string | null;
  portfolioUrl: string | null;
  serviceArea: string | null;
  bio: string | null;
  verified: boolean;
}

export function PhotographerPage() {
  const [form, setForm] = useState({ name: "", email: "", website: "", serviceArea: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get<{ photographers: Photographer[] }>("/photographers/public")
      .then((data) => setPhotographers(data.photographers))
      .catch(() => {});
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
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-24 sm:py-32">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-block rounded-full bg-accent-600/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-300">
            Built for photographers
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your photos deserve
            <br />
            <span className="bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
              more than a zip file
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Store your portfolio. Share albums with clients. Get discovered by new customers.
            FrameNest is the platform that turns your work into your business.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <a href="#apply" className="rounded-xl bg-accent-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-accent-500 active:scale-[0.98]">
              Apply to Join — Free
            </a>
            <a href="#features" className="rounded-xl border border-neutral-600 px-8 py-4 text-lg font-semibold text-neutral-300 transition-all hover:border-neutral-400 hover:text-white">
              See what you get ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <div id="features">

        {/* Feature 1 — Store & Share Photos */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-2xl">📸</div>
                <h2 className="mt-5 font-display text-3xl font-bold text-neutral-900">
                  Store &amp; share your photos
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  Upload your best work to your personal portfolio. Deliver client galleries in a beautiful,
                  password-protected space — no more WeTransfer links or Google Drive chaos.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Unlimited portfolio uploads to your profile", "Client-ready galleries with download options", "R2-powered CDN — photos load instantly worldwide"].map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 text-emerald-500">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 p-8 sm:p-12">
                <div className="grid grid-cols-3 gap-3">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="aspect-square rounded-xl bg-white/80 shadow-sm flex items-center justify-center text-2xl text-neutral-300">
                      {["🏔️","🌅","💒","🌸","🏖️","🌆"][i-1]}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-neutral-400">Your portfolio, beautifully organized</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2 — Share Folders */}
        <section className="bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1 rounded-2xl bg-white p-8 shadow-sm border border-border">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="h-8 w-8 rounded-lg bg-accent-100 flex items-center justify-center text-sm">📁</div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">Johnson Wedding — Selects</p>
                    <p className="text-[10px] text-neutral-400">48 photos · Shared via link</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {Array.from({length: 8}).map((_, i) => (
                    <div key={i} className="aspect-square rounded-lg bg-neutral-100" />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-neutral-50 px-3 py-2 text-[10px] text-neutral-400 font-mono truncate">
                    framenest.photos/album/xK9mQ2
                  </div>
                  <button className="rounded-lg bg-accent-600 px-3 py-2 text-[10px] font-semibold text-white">Copy</button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-2xl">📁</div>
                <h2 className="mt-5 font-display text-3xl font-bold text-neutral-900">
                  Share folders with one link
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  Create albums for each client or shoot. Send them a single link — they can browse,
                  favorite, and download without creating an account.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Create unlimited shareable albums", "Clients view and download — no login required", "Optional password protection for privacy"].map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 text-emerald-500">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3 — Share Locations */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">📍</div>
                <h2 className="mt-5 font-display text-3xl font-bold text-neutral-900">
                  Pin your favorite locations
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  Drop pins on our Inspiration Map for your go-to shoot spots. Share photographer tips,
                  best times, and permission info. Your pins link back to your profile.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Add locations to the global Inspiration Map", "Include tips, best time, and access info", "Your pins show as blue 📸 with link to your profile"].map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 text-emerald-500">✓</span> {t}
                    </li>
                  ))}
                </ul>
                <a href="/inspiration" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700">
                  Explore the Inspiration Map →
                </a>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-primary-50 p-6">
                <div className="rounded-xl bg-white shadow-sm border border-border p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">📸</span>
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">Golden Gate Overlook</p>
                      <p className="text-[10px] text-neutral-400">Battery Spencer, Marin Headlands</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[10px] text-neutral-500">💡 Arrive 30 min before sunset. Best with 24-70mm lens. Free parking on Conzelman Rd.</p>
                  <p className="mt-1 text-[10px] text-neutral-400">🕐 Best: Golden hour, fog season (Jun-Aug)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4 — Get New Clients */}
        <section className="bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1 rounded-2xl bg-white p-6 shadow-sm border border-border">
                <div className="border-b border-border pb-4">
                  <p className="text-xs font-semibold text-neutral-900">New inquiry from Sarah M.</p>
                  <p className="text-[10px] text-neutral-400">2 minutes ago</p>
                </div>
                <div className="mt-4 rounded-lg bg-primary-50 p-4">
                  <p className="text-xs text-neutral-700 italic">
                    "Hi! I saw your work on FrameNest and love your style. We're getting married in October
                    at Muir Woods. Would you be available for a 6-hour shoot?"
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg bg-accent-600 py-2 text-xs font-semibold text-white">Reply</button>
                  <button className="rounded-lg border border-border px-4 py-2 text-xs text-neutral-600">Archive</button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl">🤝</div>
                <h2 className="mt-5 font-display text-3xl font-bold text-neutral-900">
                  Get new clients
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  When someone loves a location on the map, they can hire YOU. Your profile appears
                  in search results. Clients send inquiries directly — Direct client payments with a small 5% platform fee.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Appear in photographer search results", "Receive hire inquiries with context", "Low 5% platform fee — more money in your pocket"].map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 text-emerald-500">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 5 — Meet New Customers */}
        <section className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-2xl">🌟</div>
                <h2 className="mt-5 font-display text-3xl font-bold text-neutral-900">
                  Meet new customers
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  Your profile is listed in our photographer directory. Couples, families, and event planners
                  browse by location and specialty to find exactly what they need.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Listed in the public photographer directory", "Filterable by location and specialty", "Featured photographers get homepage visibility"].map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 text-emerald-500">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 p-6">
                <div className="space-y-3">
                  {["Jane Doe Photography", "Alex Rivera Studio", "Kai Chen Photo"].map((name, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-border">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-sm font-bold text-accent-700">
                        {name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-900">{name}</p>
                        <p className="text-[10px] text-neutral-400">{["Austin, TX · Weddings", "LA · Portraits & Events", "NYC · Editorial & Fashion"][i]}</p>
                      </div>
                      <span className="text-[10px] font-medium text-accent-600">View →</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 6 — Showcase Your Ability */}
        <section className="bg-muted/30 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-lg border border-border">
                <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-accent-100 flex items-center justify-center text-2xl font-bold text-accent-700">J</div>
                  <p className="mt-3 font-display text-lg font-bold text-white">Jane Doe Photography</p>
                  <p className="text-xs text-neutral-400">Austin, TX · Weddings & Portraits</p>
                </div>
                <div className="bg-white p-4">
                  <div className="grid grid-cols-3 gap-1.5">
                    {Array.from({length: 6}).map((_, i) => (
                      <div key={i} className="aspect-square rounded-lg bg-neutral-100" />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <p className="text-[10px] text-neutral-400">Starting at $299</p>
                    <button className="rounded-lg bg-accent-600 px-4 py-1.5 text-[10px] font-semibold text-white">Hire Me</button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl">✨</div>
                <h2 className="mt-5 font-display text-3xl font-bold text-neutral-900">
                  Showcase your ability
                </h2>
                <p className="mt-4 text-base leading-relaxed text-neutral-600">
                  Get a beautiful, dedicated profile page with your hero gallery, portfolio grid,
                  pricing, and a one-click hire button. Your work speaks for itself — we just make
                  it look stunning.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Your own profile page at framenest.photos/you", "Hero gallery with crossfade transitions", "Portfolio grid, pricing display, and hire button"].map(t => (
                    <li key={t} className="flex items-start gap-3 text-sm text-neutral-600">
                      <span className="mt-0.5 text-emerald-500">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ── Apply Form ── */}
      <section id="apply" className="bg-neutral-900 py-16 sm:py-24">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-white">Ready to grow your business?</h2>
            <p className="mt-3 text-neutral-400">Apply in 60 seconds. We'll review and get you set up.</p>
          </div>

          <div className="rounded-2xl border border-neutral-700 bg-neutral-800 p-8">
            {message && (
              <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
                message.type === "success" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400" : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}>{message.text}</div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Business name *</label>
                <input id="name" type="text" required value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Jane Doe Photography"
                  className="mt-1.5 block w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email *</label>
                <input id="email" type="email" required value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@janedoe.photo"
                  className="mt-1.5 block w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-neutral-300">Portfolio / Website</label>
                <input id="website" type="url" value={form.website}
                  onChange={(e) => setForm(f => ({ ...f, website: e.target.value }))}
                  placeholder="https://yourportfolio.com"
                  className="mt-1.5 block w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
              <div>
                <label htmlFor="serviceArea" className="block text-sm font-medium text-neutral-300">Service area</label>
                <input id="serviceArea" type="text" value={form.serviceArea}
                  onChange={(e) => setForm(f => ({ ...f, serviceArea: e.target.value }))}
                  placeholder="Austin, TX / Remote"
                  className="mt-1.5 block w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-neutral-300">About you</label>
                <textarea id="bio" rows={3} value={form.bio}
                  onChange={(e) => setForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Tell us about your style, experience, and what you shoot..."
                  className="mt-1.5 block w-full rounded-lg border border-neutral-600 bg-neutral-700 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full rounded-xl bg-accent-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-accent-500 active:scale-[0.98] disabled:opacity-50">
                {saving ? "Submitting..." : "Apply to Join — It's Free"}
              </button>
              <p className="text-center text-[10px] text-neutral-500">We review applications within 24 hours.</p>
            </form>
          </div>
        </div>
      </section>

      {/* ── Approved Photographers ── */}
      {photographers.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-center font-display text-2xl font-bold text-neutral-900 sm:text-3xl">
              Photographers on FrameNest
            </h2>
            <p className="mt-3 text-center text-neutral-500">
              Find a photographer by name, location, or specialty.
            </p>
            <div className="mx-auto mt-6 max-w-md">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, location, or specialty…"
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photographers.filter(p => {
                if (!search.trim()) return true;
                const q = search.toLowerCase();
                return [p.name, p.serviceArea, p.specialties, p.bio, p.tagline].some(f => f?.toLowerCase().includes(q));
              }).map((p) => {
                const Card = (
                  <div className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-lg font-bold text-neutral-500">
                      {p.name.charAt(0)}
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-neutral-900">
                      {p.name}
                      {p.verified && <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[9px] text-emerald-600">✓</span>}
                    </h3>
                    {p.tagline && <p className="mt-1 text-sm text-neutral-500">{p.tagline}</p>}
                    {p.serviceArea && <p className="mt-2 text-xs font-medium text-neutral-500">📍 {p.serviceArea}</p>}
                    {p.specialties && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {p.specialties.split(",").map(s => s.trim()).filter(Boolean).map(s => (
                          <span key={s} className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">{s}</span>
                        ))}
                      </div>
                    )}
                    {p.bio && <p className="mt-3 text-sm leading-relaxed text-neutral-500 line-clamp-2">{p.bio}</p>}
                    {p.slug ? (
                      <span className="mt-4 inline-flex text-sm font-medium text-neutral-600 hover:text-neutral-900">View profile →</span>
                    ) : p.website ? (
                      <span className="mt-4 inline-flex text-sm font-medium text-neutral-500">Visit portfolio →</span>
                    ) : null}
                  </div>
                );
                return p.slug ? (
                  <Link key={p.id} to={`/${p.slug}`}>{Card}</Link>
                ) : p.website ? (
                  <a key={p.id} href={p.website} target="_blank" rel="noopener noreferrer">{Card}</a>
                ) : (
                  <div key={p.id}>{Card}</div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Final CTA ── */}
      <section className="bg-gradient-to-r from-accent-600 to-primary-600 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Stop sending zip files.
            <br />
            Start building your brand.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Your portfolio. Your clients. Your locations. All in one place.
          </p>
          <a href="#apply"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-accent-700 shadow-lg transition-all hover:bg-accent-50 active:scale-[0.98]">
            Apply Now — It's Free
          </a>
        </div>
      </section>
    </div>
  );
}
