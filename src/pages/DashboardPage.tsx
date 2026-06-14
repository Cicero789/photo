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

type Tab = "feed" | "events" | "members" | "connections" | "settings";

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

  const heroPhotos = events.filter(e => e.coverPhotoUrl).map(e => e.coverPhotoUrl!).slice(0, 5);
  const heroEnabled = ((spaceInfo as any)?.hero_enabled as number) === 1;
  const heroName = space?.name || spaceInfo?.name || "Dashboard";

  return (
    <div>
      {heroEnabled && heroPhotos.length > 0 && (
        <PhotographerHero photos={heroPhotos} name={heroName} interval={5000} />
      )}
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
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
        <StatCard label="Events" value={String(events.length)} color="blue" />
        <StatCard label="Photos" value={String(totalPhotos)} color="purple" />
        <StatCard label="Members" value={String(members.length || 1)} color="green" />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-muted p-1 w-fit">
        {TABS.map((tab) => (
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
      {activeTab === "events" && (
        <EventsTabContent
          events={events}
          loading={eventsLoading}
          ads={ads}
          onCreateClick={() => setShowCreateEvent(true)}
          onEventsRefresh={setEvents}
        />
      )}
      {activeTab === "members" && (
        <MembersTab members={members} onUpdate={fetchMembers} />
      )}
      {activeTab === "connections" && (
        <ConnectionsTab />
      )}
      {activeTab === "settings" && (
        <SettingsTab space={spaceInfo} onUpdate={fetchSpace} />
      )}

      {/* Create Event Modal */}
      <CreateEventModal
        open={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onSubmit={handleCreateEvent}
      />
    </div>
    </div>
  );
}

// ─── Tabs config ───
const TABS = [
  { key: "feed", label: "Feed" },
  { key: "events", label: "Events" },
  { key: "members", label: "Members" },
  { key: "connections", label: "Connections" },
  { key: "settings", label: "Settings" },
];

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
  onCreateClick,
  onEventsRefresh,
}: {
  events: GridEvent[];
  loading: boolean;
  ads: AdTileData[];
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
            {events.length > 0 ? `${events.length} event${events.length !== 1 ? "s" : ""}` : ""}
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
        <button onClick={onCreateClick} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 active:bg-primary-800">+ New Event</button>
      </div>

      {viewMode === "tile" ? (
        <EventGrid events={events} ads={ads} emptyMessage="No events yet. Create your first event to start building your photo collection!" />
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
  const [form, setForm] = useState({ name: "", gateKey: "", themeColor: "#3b82f6", customDomain: "", slug: "", heroEnabled: false });
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
        heroEnabled: ((space as any).hero_enabled as number) === 1,
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
      if ((form as any).heroEnabled !== (((space as any).hero_enabled as number) === 1)) body.heroEnabled = (form as any).heroEnabled ? "1" : "0";

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
        <div>
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">🖼️ Live rotating photo background</span>
            <button type="button" onClick={() => setForm(f => ({ ...f, heroEnabled: !f.heroEnabled }))}
              className={`relative h-6 w-11 rounded-full transition-colors ${(form as any).heroEnabled ? "bg-primary-600" : "bg-neutral-300"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${(form as any).heroEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </label>
          <p className="mt-1 text-xs text-neutral-400">Show event cover photos as a rotating background on your space page.</p>
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
        <div>
          <label className="block text-sm font-medium text-neutral-700">Custom domain</label>
          <input type="text" value={form.customDomain}
            onChange={(e) => setForm((f) => ({ ...f, customDomain: e.target.value }))}
            placeholder="photos.yourfamily.com (optional)"
            className="mt-1 block w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100" />
          <p className="mt-1 text-xs text-neutral-400">Point your domain to our servers and enter it here.</p>
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
