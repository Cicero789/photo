import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";
import { EventGrid } from "@/components/events/EventGrid";
import { CreateEventModal } from "@/components/events/CreateEventModal";
import { SpaceEventMap } from "@/components/map/SpaceEventMap";
import { ConnectionsTab } from "@/components/community/ConnectionsTab";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import { PhotographerHero } from "@/components/photographer/PhotographerHero";
import { TemplatePicker } from "@/components/photographer/TemplatePicker";
import { ClientsPage } from "@/pages/ClientsPage";
import type { EventCategory, Photo } from "@/types";

// ─── Types ───
interface Member {
  id: string;
  userId: string;
  spaceId: string;
  role: string;
  name: string;
  email: string;
  joinedAt: string;
}

interface SpaceInfo {
  id: string;
  name: string;
  slug: string;
  customDomain: string | null;
  logoUrl: string | null;
  themeColor: string;
}

interface GridEvent {
  id: string;
  title: string;
  category: EventCategory;
  eventDate: string;
  description: string;
  aiSummary?: string | null;
  coverPhotoUrl?: string | null;
  photoCount: number;
  latitude?: number | null;
  longitude?: number | null;
}

interface AdTileData {
  id: string;
  imageUrl: string | null;
  linkUrl: string | null;
  message: string | null;
  position: number;
}

type Tab = "feed" | "events" | "clients" | "stats" | "members" | "connections" | "settings";

// ─── Dashboard ───
export function DashboardPage() {
  const { user, space } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("events");
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<GridEvent[]>([]);
  const [ads, setAds] = useState<AdTileData[]>([]);
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo | null>(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [accountMode, setAccountMode] = useState<"personal" | "pro">("personal");

  useEffect(() => {
    api.get<{ mode: string }>("/users/mode").then(d => setAccountMode(d.mode === "pro" ? "pro" : "personal")).catch(() => {});
  }, []);

  const fetchMembers = useCallback(async () => {
    try {
      const data = await api.get<{ members: Member[] }>("/spaces/members");
      setMembers(data.members);
    } catch { /* ignore */ }
  }, []);

  const fetchEvents = useCallback(async () => {
    setEventsLoading(true);
    try {
      const data = await api.get<{ events: GridEvent[] }>("/events");
      setEvents(data.events);
    } catch { /* ignore */ }
    finally { setEventsLoading(false); }
  }, []);

  const fetchAds = useCallback(async () => {
    try {
      const data = await api.get<{ ads: AdTileData[] }>("/ads");
      setAds(data.ads);
    } catch { /* ignore */ }
  }, []);

  const fetchSpace = useCallback(async () => {
    if (!space?.slug) return;
    try {
      const data = await api.get<{ space: SpaceInfo }>(`/spaces/${space.slug}`);
      setSpaceInfo(data.space);
    } catch { /* ignore */ }
  }, [space?.slug]);

  useEffect(() => {
    if (activeTab === "members") fetchMembers();
    if (activeTab === "events") { fetchEvents(); fetchAds(); }
    if (activeTab === "settings") fetchSpace();
  }, [activeTab, fetchMembers, fetchEvents, fetchAds, fetchSpace]);

  const handleCreateEvent = async (data: { title: string; category: EventCategory; eventDate: string; description: string }) => {
    await api.post("/events", data);
    await fetchEvents();
  };

  if (!user) return null;

  const totalPhotos = events.reduce((acc, e) => acc + e.photoCount, 0);

  // Build hero photos based on source setting
  const heroSource = (spaceInfo as any)?.hero_source || "off";
  const heroStyle = (spaceInfo as any)?.hero_style || "banner";
  const heroName = space?.name || spaceInfo?.name || "Dashboard";
  let heroPhotos: string[] = [];
  if (heroSource === "covers") {
    heroPhotos = events.filter(e => e.coverPhotoUrl).map(e => e.coverPhotoUrl!).slice(0, 8);
  } else if (heroSource === "random") {
    // Collect all event photos, shuffle, take first 8
    const allPhotos = events.flatMap(e => (e as any).photos || []).filter((p: any) => p?.url);
    heroPhotos = allPhotos.sort(() => Math.random() - 0.5).slice(0, 8).map((p: any) => p.url);
  } else if (heroSource === "favorites") {
    const favs = events.flatMap(e => (e as any).photos || []).filter((p: any) => p?.favorite);
    heroPhotos = favs.slice(0, 8).map((p: any) => p.url);
  }

  return (
    <div className={heroSource !== "off" && heroStyle === "full" && heroPhotos.length > 0 ? "relative" : ""}>
      {heroSource !== "off" && heroStyle === "full" && heroPhotos.length > 0 && (
        <div className="fixed inset-0 -z-10">
          <PhotographerHero photos={heroPhotos} name="" interval={6000} />
        </div>
      )}
      {heroSource !== "off" && heroStyle !== "full" && heroPhotos.length > 0 && (
        <PhotographerHero photos={heroPhotos} name={heroName} interval={5000} />
      )}
    <div className={heroSource !== "off" && heroStyle === "full" && heroPhotos.length > 0 ? "relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 bg-neutral-50/70 backdrop-blur-sm rounded-2xl mt-8" : "mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12"}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-neutral-900">
          {space?.name ?? "Dashboard"}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {space?.slug ? `framenest.photos/s/${space.slug}` : ""}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label={accountMode === "pro" ? "Events" : "Memories"} value={String(events.length)} color="blue" />
        <StatCard label="Photos" value={String(totalPhotos)} color="purple" />
        <StatCard label="Members" value={String(members.length || 1)} color="green" />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-muted p-1 w-fit">
        {(accountMode === "pro"
          ? [{ key: "events", label: "Events" }, { key: "clients", label: "My Clients" }, { key: "stats", label: "Stats" }, { key: "members", label: "Members" }, { key: "connections", label: "Connections" }, { key: "settings", label: "Settings" }]
          : [{ key: "events", label: "Memories" }, { key: "members", label: "Members" }, { key: "connections", label: "Connections" }, { key: "settings", label: "Settings" }]
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as Tab)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              activeTab === tab.key
                ? "bg-white text-neutral-900 shadow-sm"
                : "text-neutral-500 hover:text-neutral-700",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "feed" && (
        <div className="rounded-2xl border border-border bg-white p-6">
          <CommunityFeed />
        </div>
      )}
      {activeTab === "clients" && <ClientsPage />}
      {activeTab === "events" && (
        <EventsTabContent
          events={events}
          loading={eventsLoading}
          ads={ads}
          accountMode={accountMode}
          onCreateClick={() => setShowCreateEvent(true)}
          onEventsRefresh={setEvents}
        />
      )}
      {activeTab === "stats" && <StatsTab />}
      {activeTab === "members" && (
        <MembersTab members={members} onUpdate={fetchMembers} />
      )}
      {activeTab === "connections" && (
        <ConnectionsTab />
      )}
      {activeTab === "settings" && (
        <>
          <SettingsTab space={spaceInfo} onUpdate={fetchSpace} />
          <ModeToggleCard mode={accountMode} onSwitch={setAccountMode} />
          {accountMode === "pro" && <PhotographerProfileCard />}
          {accountMode === "pro" && <VerifiedCard />}
        </>
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        open={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onSubmit={handleCreateEvent}
        accountMode={accountMode}
      />
    </div>
    </div>
  );
}

// ─── Tabs are rendered inline based on accountMode ───

// ─── Stat Card ───
function StatCard({ label, value, color }: { label: string; value: string; color: "blue" | "purple" | "green" }) {
  const borders = {
    blue: "border-l-primary-500 bg-primary-50/30",
    purple: "border-l-accent-500 bg-accent-50/30",
    green: "border-l-emerald-500 bg-emerald-50/30",
  };
  return (
    <div className={cn("rounded-xl border border-border bg-white p-5 border-l-4", borders[color])}>
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-neutral-900">{value}</p>
    </div>
  );
}

// ─── Events Tab Content ───
function EventsTabContent({
  events,
  loading,
  ads,
  accountMode,
  onCreateClick,
  onEventsRefresh,
}: {
  events: GridEvent[];
  loading: boolean;
  ads: AdTileData[];
  accountMode: "personal" | "pro";
  onCreateClick: () => void;
  onEventsRefresh?: (events: GridEvent[]) => void;
}) {
  const [viewMode, setViewMode] = useState<"tile" | "map">("tile");
  const [mapPhotos, setMapPhotos] = useState<Photo[]>([]);
  const [mapLoading, setMapLoading] = useState(false);

  const fetchMapData = async () => {
    setMapLoading(true);
    try {
      const [photoData, eventData] = await Promise.all([
        api.get<{ photos: Photo[] }>("/photos?hasLocation=true"),
        api.get<{ events: GridEvent[] }>("/events"),
      ]);
      setMapPhotos(photoData.photos);
      // Update parent events with fresh data (includes lat/lng)
      // We use a callback ref to update parent
      onEventsRefresh?.(eventData.events);
    } catch { /* ignore */ }
    finally { setMapLoading(false); }
  };

  useEffect(() => {
    if (viewMode === "map") fetchMapData();
  }, [viewMode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-neutral-900">
            {events.length > 0 ? `${events.length} ${accountMode === "pro" ? `event${events.length !== 1 ? "s" : ""}` : `memor${events.length !== 1 ? "ies" : "y"}`}` : ""}
          </h2>
          {/* View toggle */}
          <div className="flex items-center gap-2 rounded-lg border-2 border-primary-200 bg-primary-50/50 px-1 py-1">
            <span className="ml-1 text-[10px] font-semibold text-primary-600 uppercase tracking-wider">View:</span>
            <div className="flex gap-0.5 rounded-md bg-white p-0.5 shadow-sm">
              <button onClick={() => setViewMode("tile")} className={cn("rounded px-3 py-1.5 text-xs font-semibold transition-all", viewMode === "tile" ? "bg-primary-600 text-white shadow-md" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100")}>🎨 Tiles</button>
              <button onClick={() => setViewMode("map")} className={cn("rounded px-3 py-1.5 text-xs font-semibold transition-all", viewMode === "map" ? "bg-primary-600 text-white shadow-md" : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100")}>🗺️ Map</button>
            </div>
          </div>
        </div>
        <button onClick={onCreateClick} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800">{accountMode === "pro" ? "+ New Event" : "+ New Memory"}</button>
      </div>

      {viewMode === "tile" ? (
        <EventGrid events={events} ads={ads} emptyMessage={accountMode === "pro" ? "No events yet. Create your first event to start building your photo collection!" : "No memories yet. Create your first memory to start building your photo collection!"} />
      ) : mapLoading ? (
        <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" /></div>
      ) : (
        <SpaceEventMap photos={mapPhotos} events={events.map(e => ({ id: e.id, title: e.title, latitude: e.latitude ?? null, longitude: e.longitude ?? null, photoCount: e.photoCount, coverPhotoUrl: e.coverPhotoUrl }))} emptyMessage="No locations yet." />
      )}
    </div>
  );
}

// ─── Members Tab ───
function MembersTab({ members, onUpdate }: { members: Member[]; onUpdate: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "staff", password: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.post("/spaces/members", form);
      setForm({ name: "", email: "", role: "staff", password: "" });
      setShowForm(false);
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add member");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (memberId: string) => {
    if (!confirm("Remove this member? This cannot be undone.")) return;
    try {
      await api.delete(`/spaces/members?id=${memberId}`);
      onUpdate();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to remove member");
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">
          Members ({members.length})
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
        >
          {showForm ? "Cancel" : "+ Add Member"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mt-6 rounded-xl border border-border bg-muted/50 p-6">
          <h3 className="text-sm font-semibold text-neutral-700">Add a family member or staff</h3>
          {error && (
            <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Name</label>
              <input type="text" required value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Sarah Johnson"
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Email</label>
              <input type="email" required value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="sarah@example.com"
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Role</label>
              <select value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100">
                <option value="staff">Staff — can upload & manage</option>
                <option value="viewer">Viewer — view only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Password</label>
              <input type="password" required value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Min 6 characters"
                className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="mt-4 rounded-lg bg-primary-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50">
            {saving ? "Adding..." : "Add member"}
          </button>
        </form>
      )}

      <div className="mt-6 divide-y divide-border">
        {members.length === 0 && !showForm && (
          <p className="py-8 text-center text-sm text-neutral-400">
            No members yet. Add family or staff to help manage your space.
          </p>
        )}
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                m.role === "page_admin" ? "bg-primary-100 text-primary-700" :
                m.role === "staff" ? "bg-accent-100 text-accent-700" :
                "bg-neutral-100 text-neutral-600",
              )}>
                {m.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  {m.name}
                  {m.role === "page_admin" && (
                    <span className="ml-2 rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-semibold text-primary-700">Owner</span>
                  )}
                </p>
                <p className="text-xs text-neutral-500">{m.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                m.role === "staff" ? "bg-accent-50 text-accent-700" : "bg-neutral-100 text-neutral-600",
              )}>
                {m.role}
              </span>
              {m.role !== "page_admin" && (
                <button onClick={() => handleRemove(m.id)}
                  className="text-xs font-medium text-red-500 transition-colors hover:text-red-700">
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Tab ───
function SettingsTab({ space, onUpdate }: { space: SpaceInfo | null; onUpdate: () => void }) {
  const [form, setForm] = useState({ name: "", gateKey: "", themeColor: "#3b82f6", customDomain: "", slug: "", heroSource: "off", heroStyle: "banner" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (space) {
      setForm({
        name: space.name,
        slug: (space as any).slug || "",
        gateKey: "",
        themeColor: space.themeColor ?? "#3b82f6",
        customDomain: space.customDomain ?? "",
        heroSource: (space as any).hero_source || "off",
        heroStyle: (space as any).hero_style || "banner",
      });
    }
  }, [space]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!space?.slug) return;
    setSaving(true);
    setMessage(null);
    try {
      const body: Record<string, string> = {};
      if (form.name !== space.name) body.name = form.name;
      if (form.gateKey) body.gateKey = form.gateKey;
      if (form.slug && form.slug !== space.slug) body.slug = form.slug;
      if (form.themeColor !== space.themeColor) body.themeColor = form.themeColor;
      if (form.customDomain !== (space.customDomain ?? "")) body.customDomain = form.customDomain;
      if ((form as any).heroSource !== ((space as any).hero_source || "off")) body.heroSource = (form as any).heroSource;
      if ((form as any).heroStyle !== ((space as any).hero_style || "banner")) body.heroStyle = (form as any).heroStyle;

      if (Object.keys(body).length === 0) {
        setMessage({ type: "success", text: "No changes to save." });
        return;
      }

      await api.put(`/spaces/${space.slug}`, body);
      setMessage({ type: "success", text: "Settings saved!" });
      setForm((f) => ({ ...f, gateKey: "" }));
      onUpdate();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to save" });
    } finally {
      setSaving(false);
    }
  };

  if (!space) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8">
        <p className="text-sm text-neutral-400">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-8">
      <h2 className="text-lg font-semibold text-neutral-900">Space settings</h2>
      <p className="mt-1 text-sm text-neutral-500">Customize how your space looks and works.</p>

      {message && (
        <div className={cn(
          "mt-4 rounded-lg border px-4 py-3 text-sm",
          message.type === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-red-200 bg-red-50 text-red-700",
        )}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="mt-6 max-w-lg space-y-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Space name</label>
          <input type="text" value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Your link</label>
          <div className="mt-1 rounded-lg border border-border bg-muted px-3 py-2.5">
            <span className="text-sm whitespace-nowrap text-neutral-500">framenest.photos/s/<span className="font-medium text-neutral-700">{space.slug}</span></span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Custom domain</label>
          <input type="text" value={form.customDomain || ""}
            onChange={(e) => setForm((f) => ({ ...f, customDomain: e.target.value }))}
            placeholder="photos.yourfamily.com"
            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
          <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 space-y-1">
            <p className="font-semibold">📋 Setup instructions:</p>
            <p>1. In your DNS provider, add a <strong>CNAME</strong> record pointing to <code className="bg-amber-100 px-1 rounded">photo-ll2.pages.dev</code></p>
            <p>2. In Cloudflare Dashboard → Workers &amp; Pages → photo → Custom Domains → Add <strong>{form.customDomain || "yourdomain.com"}</strong></p>
            <p>3. Wait 1-2 minutes for SSL to provision. Your space will appear at your domain.</p>
          </div>
        </div>
        {/* Live Background */}
        <div className="rounded-xl border bg-white p-4">
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 text-lg">🖼️</div>
            <div className="flex-1 space-y-3">
              <div>
                <label className="text-sm font-semibold text-neutral-900">Live background</label>
                <p className="text-xs text-neutral-500">Photos as background on your space and dashboard pages.</p>
              </div>
              <div className="flex gap-3">
                <select value={(form as any).heroSource || "off"} onChange={e => setForm(f => ({ ...f, heroSource: e.target.value }))}
                  className="flex-1 rounded-lg border px-3 py-2 text-sm">
                  <option value="off">🔲 Off</option>
                  <option value="covers">🎨 Event covers</option>
                  <option value="favorites">⭐ Favorites</option>
                  <option value="random">🎲 Random</option>
                </select>
                {(form as any).heroSource && (form as any).heroSource !== "off" && (
                  <select value={(form as any).heroStyle || "banner"} onChange={e => setForm(f => ({ ...f, heroStyle: e.target.value }))}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm">
                    <option value="banner">📱 Hero banner</option>
                    <option value="full">🖥️ Full background</option>
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Change gate key</label>
          <input type="password" value={form.gateKey}
            onChange={(e) => setForm((f) => ({ ...f, gateKey: e.target.value }))}
            placeholder="Leave blank to keep current"
            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
          <p className="mt-1 text-xs text-neutral-400">This is the password guests need to view your space.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Theme color</label>
          <div className="mt-1 flex items-center gap-3">
            <input type="color" value={form.themeColor}
              onChange={(e) => setForm((f) => ({ ...f, themeColor: e.target.value }))}
              className="h-10 w-16 cursor-pointer rounded border border-border" />
            <span className="text-sm text-neutral-500">{form.themeColor}</span>
            {COLOR_PRESETS.map((c) => (
              <button key={c} type="button"
                onClick={() => setForm((f) => ({ ...f, themeColor: c }))}
                className={cn("h-7 w-7 rounded-full border-2 transition-all",
                  form.themeColor === c ? "border-neutral-900 scale-110" : "border-transparent")}
                style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
        <button type="submit" disabled={saving}
          className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50">
          {saving ? "Saving..." : "Save settings"}
        </button>
      </form>
    </div>
  );
}

const COLOR_PRESETS = ["#3b82f6", "#d946ef", "#16a34a", "#f59e0b", "#dc2626", "#6366f1", "#0d9488", "#64748b"];

// ─── Photographer Profile Card ───
function PhotographerProfileCard() {
  const [profile, setProfile] = useState<{ slug: string; tagline: string; specialties: string; template: string; colorScheme: string; fontPairing: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    api.get<{ slug: string; tagline: string; specialties: string; design?: string }>("/photographers/config")
      .then(d => {
        if (d.slug !== undefined) {
          const design = JSON.parse(d.design || "{}");
          setProfile({ slug: d.slug || "", tagline: d.tagline || "", specialties: d.specialties || "", template: design.template || "clean-minimal", colorScheme: design.colorScheme || "light", fontPairing: design.fontPairing || "modern" });
        }
      })
      .catch(() => {});
  }, []);

  if (!profile) return null; // not a photographer

  const handleSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      await api.put("/photographers/config", profile);
      setMsg({ type: "success", text: "Profile saved!" });
    } catch (err) {
      setMsg({ type: "error", text: err instanceof Error ? err.message : "Failed to save" });
    }
    setSaving(false);
  };

  return (
    <div className="mt-6 rounded-2xl border border-border bg-white p-8">
      <h2 className="text-lg font-semibold text-neutral-900">Photographer profile</h2>
      <p className="mt-1 text-sm text-neutral-500">
        Your public profile at{" "}
        {profile.slug ? (
          <a href={`/${profile.slug}`} className="text-primary-600 hover:underline">framenest.photos/{profile.slug}</a>
        ) : (
          <span className="text-neutral-400">framenest.photos/your-slug</span>
        )}
      </p>

      {msg && (
        <div className={cn("mt-4 rounded-lg border px-4 py-3 text-sm",
          msg.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"
        )}>{msg.text}</div>
      )}

      <div className="mt-6 max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Profile URL slug</label>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-neutral-400">framenest.photos/</span>
            <input type="text" value={profile.slug}
              onChange={e => setProfile(p => p ? { ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") } : p)}
              placeholder="jane-doe"
              className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Tagline</label>
          <input type="text" value={profile.tagline}
            onChange={e => setProfile(p => p ? { ...p, tagline: e.target.value } : p)}
            placeholder="Capturing moments that matter"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Specialties</label>
          <input type="text" value={profile.specialties}
            onChange={e => setProfile(p => p ? { ...p, specialties: e.target.value } : p)}
            placeholder="Weddings, Portraits, Events"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
          <p className="mt-1 text-xs text-neutral-400">Comma-separated list</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50">
          {saving ? "Saving..." : "Save profile"}
        </button>
      </div>

      <div className="mt-8 border-t border-border pt-8">
        <TemplatePicker
          currentTemplate={profile.template || "clean-minimal"}
          currentColorScheme={profile.colorScheme || "light"}
          currentFontPairing={profile.fontPairing || "modern"}
          slug={profile.slug}
          onSave={async (templateId, colorScheme, fontPairing) => {
            const designObj: Record<string, string> = { template: templateId };
            if (colorScheme) designObj.colorScheme = colorScheme;
            if (fontPairing) designObj.fontPairing = fontPairing;
            await api.put("/photographers/config", { design: JSON.stringify(designObj) });
            setProfile(p => p ? { ...p, template: templateId, colorScheme: colorScheme || "light", fontPairing: fontPairing || "modern" } : p);
            setMsg({ type: "success", text: "Template saved!" });
          }}
        />
      </div>
    </div>
  );
}

// ─── Mode Toggle Card ───
function ModeToggleCard({ mode, onSwitch }: { mode: "personal" | "pro"; onSwitch: (m: "personal" | "pro") => void }) {
  const [switching, setSwitching] = useState(false);

  const toggle = async () => {
    const newMode = mode === "personal" ? "pro" : "personal";
    setSwitching(true);
    try {
      await api.put("/users/mode", { mode: newMode });
      onSwitch(newMode);
    } catch {}
    setSwitching(false);
  };

  return (
    <div className="mt-6 rounded-2xl border border-border bg-white p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">Account mode</h2>
          <p className="mt-1 text-sm text-neutral-500">
            {mode === "personal"
              ? "Personal mode — share memories with family and friends."
              : "Pro mode — showcase your work, deliver to clients, accept payments."}
          </p>
        </div>
        <button onClick={toggle} disabled={switching}
          className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            mode === "pro"
              ? "bg-neutral-900 text-white hover:bg-neutral-800"
              : "border border-border text-neutral-600 hover:bg-neutral-50"
          )}>
          {switching ? "Switching…" : mode === "personal" ? "Switch to Pro" : "Switch to Personal"}
        </button>
      </div>
    </div>
  );
}

// ─── Verified Card ───
function VerifiedCard() {
  const [status, setStatus] = useState<{ verified: boolean; subscriptionStatus: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<{ slug: string; tagline: string; specialties: string }>("/photographers/config")
      .then(() => {
        // Check verification status via connect endpoint
        api.get<any>("/stripe/connect").then(d => {
          setStatus({ verified: d.chargesEnabled || false, subscriptionStatus: "unknown" });
        }).catch(() => setStatus({ verified: false, subscriptionStatus: "none" }));
      })
      .catch(() => setStatus(null))
      .finally(() => setLoading(false));
  }, []);

  const startSubscription = async () => {
    try {
      const d = await api.post<{ url: string }>("/stripe/subscribe", {});
      window.location.href = d.url;
    } catch {}
  };

  if (loading || !status) return null;

  return (
    <div className="mt-6 rounded-2xl border border-border bg-white p-8">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold",
          status.verified ? "bg-emerald-100 text-emerald-600" : "bg-neutral-100 text-neutral-400"
        )}>
          {status.verified ? "✓" : "?"}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-neutral-900">
            {status.verified ? "Verified ✓" : "Get Verified"}
          </h2>
          <p className="text-sm text-neutral-500">
            {status.verified
              ? "Your verified badge is active. Thank you for being a trusted photographer."
              : "$10/month — verified badge, professional video streaming, map pin, priority listing."}
          </p>
        </div>
      </div>
      {!status.verified && (
        <button onClick={startSubscription}
          className="mt-4 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
          Get Verified — $10/month
        </button>
      )}
    </div>
  );
}

// ─── Stats Tab ───
function StatsTab() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/photographers/stats")
      .then(d => setStats(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" /></div>;
  if (!stats) return <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-neutral-400">Stats not available. Switch to Pro mode and get approved as a photographer.</div>;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs font-medium text-neutral-500">Profile Views</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{stats.profileViews}</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs font-medium text-neutral-500">Inquiries</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{stats.inquiries}</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs font-medium text-neutral-500">Revenue</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">${(stats.revenueCents / 100).toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-xs font-medium text-neutral-500">Album Views</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{stats.albumViews}</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-white p-6">
          <h3 className="text-sm font-semibold text-neutral-900">Albums</h3>
          <p className="mt-2 text-sm text-neutral-500">{stats.albums} albums · {stats.albumViews} total views</p>
        </div>
        <div className="rounded-xl border border-border bg-white p-6">
          <h3 className="text-sm font-semibold text-neutral-900">Map Pins</h3>
          <p className="mt-2 text-sm text-neutral-500">{stats.mapPins} locations · {stats.mapLoves} total ❤️</p>
        </div>
      </div>

      {!stats.verified && (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center">
          <p className="text-sm text-neutral-600">Get Verified ($10/mo) for detailed trends, per-album breakdowns, and area comparisons.</p>
        </div>
      )}
    </div>
  );
}
