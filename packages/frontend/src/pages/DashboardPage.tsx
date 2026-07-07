import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../data/queries/useAuth.js';
import { api } from '../lib/api-client.js';
import { Button } from '../components/ui/Button.js';
import { formatDate } from '../lib/utils.js';
import type { EventResponse, AlbumResponse, SpaceResponse } from '@framenest/shared';

type Tab = 'events' | 'albums' | 'settings';

export function DashboardPage() {
  const { user, space } = useAuth();
  const [tab, setTab] = useState<Tab>('events');
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [albums, setAlbums] = useState<AlbumResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (tab === 'events') {
        const data = await api.get<{ events: EventResponse[] }>(`/events?spaceId=${user?.spaceId}`);
        setEvents(data.events || []);
      } else if (tab === 'albums') {
        const data = await api.get<{ albums: AlbumResponse[] }>('/albums');
        setAlbums(data.albums || []);
      }
    } catch (err) {
      console.error('Failed to load:', err);
    }
    setLoading(false);
  }, [tab, user?.spaceId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">{space?.name || user?.name}'s Dashboard</h1>

      {/* Tab bar */}
      <div className="mt-6 flex gap-1 border-b border-neutral-200">
        {(['events', 'albums', 'settings'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors capitalize
              ${tab === t ? 'bg-white border border-neutral-200 border-b-white -mb-px text-primary-600' : 'text-neutral-500 hover:text-neutral-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {tab === 'events' && <EventsTab events={events} loading={loading} onRefresh={fetchData} spaceId={user?.spaceId || ''} />}
        {tab === 'albums' && <AlbumsTab albums={albums} loading={loading} onRefresh={fetchData} />}
        {tab === 'settings' && <SettingsTab space={space} user={user} />}
      </div>
    </div>
  );
}

// ═══ EVENTS TAB ═════════════════════════════════════════════════════════════

function EventsTab({ events, loading, onRefresh, spaceId }: { events: EventResponse[]; loading: boolean; onRefresh: () => void; spaceId: string }) {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Memories ({events.length})</h2>
        <Button size="sm" onClick={() => setShowCreate(true)}>+ New Memory</Button>
      </div>

      {showCreate && <CreateEventModal spaceId={spaceId} onDone={() => { setShowCreate(false); onRefresh(); }} onCancel={() => setShowCreate(false)} />}

      {loading ? (
        <div className="text-center py-12 text-neutral-400">Loading...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-xl">
          <p className="text-neutral-500">No memories yet</p>
          <p className="text-sm text-neutral-400 mt-1">Create your first memory to start sharing photos</p>
          <div className="mt-4"><Button variant="secondary" size="sm" onClick={() => setShowCreate(true)}>+ New Memory</Button></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(event => (
            <Link key={event.id} to={`/dashboard/events/${event.id}`}
              className="p-4 rounded-lg border border-neutral-200 bg-white hover:shadow-sm transition-shadow block">
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-primary-50 text-primary-700 capitalize">{event.category}</span>
                  <h3 className="mt-2 font-semibold text-neutral-900">{event.title}</h3>
                  {event.eventDate && <p className="text-sm text-neutral-500 mt-1">{formatDate(event.eventDate)}</p>}
                  <div className="flex items-center gap-3 mt-2 text-xs text-neutral-400">
                    <span>{event.photoCount} photos</span>
                    <span className={`capitalize ${event.visibility === 'public' ? 'text-green-600' : event.visibility === 'gate' ? 'text-amber-600' : 'text-neutral-500'}`}>{event.visibility}</span>
                  </div>
                </div>
                <div onClick={e => e.preventDefault()}><DeleteEventButton eventId={event.id} eventTitle={event.title} onDone={onRefresh} /></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══ CREATE EVENT MODAL ═════════════════════════════════════════════════════

const CATEGORIES = [
  { value: 'wedding', label: '💒 Wedding' }, { value: 'birthday', label: '🎂 Birthday' },
  { value: 'graduation', label: '🎓 Graduation' }, { value: 'vacation', label: '🏖 Vacation' },
  { value: 'holiday', label: '🎄 Holiday' }, { value: 'sports', label: '⚽ Sports' },
  { value: 'concert', label: '🎵 Concert' }, { value: 'conference', label: '💼 Conference' },
  { value: 'family', label: '👨‍👩‍👧‍👦 Family' }, { value: 'other', label: '📌 Other' },
];

function CreateEventModal({ spaceId, onDone, onCancel }: { spaceId: string; onDone: () => void; onCancel: () => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('family');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]!);
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/events', { title, category, eventDate, description, visibility, spaceId });
      onDone();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create event');
    }
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-4">New Memory</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Title" required value={title} onChange={e => setTitle(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm">
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
          <textarea placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} rows={2}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm resize-none" />
          <select value={visibility} onChange={e => setVisibility(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm">
            <option value="private">🔒 Private — only you</option>
            <option value="gate">🔑 Gate — family with gate key</option>
            <option value="public">🌐 Public — anyone can view</option>
          </select>
          <div className="flex gap-2 pt-2">
            <Button type="submit" loading={submitting} className="flex-1">Create</Button>
            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ═══ DELETE EVENT ═══════════════════════════════════════════════════════════

function DeleteEventButton({ eventId, eventTitle, onDone }: { eventId: string; eventTitle: string; onDone: () => void }) {
  const [confirm, setConfirm] = useState(false);
  if (!confirm) return <button onClick={() => setConfirm(true)} className="text-xs text-red-400 hover:text-red-600">Delete</button>;
  return (
    <span className="text-xs flex items-center gap-1">
      <button onClick={async () => { try { await api.delete(`/events/${eventId}`); onDone(); } catch { alert('Failed to delete'); } }}
        className="text-red-600 font-semibold">Confirm</button>
      <button onClick={() => setConfirm(false)} className="text-neutral-400">Cancel</button>
    </span>
  );
}

// ═══ ALBUMS TAB ═════════════════════════════════════════════════════════════

function AlbumsTab({ albums, loading, onRefresh }: { albums: AlbumResponse[]; loading: boolean; onRefresh: () => void }) {
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/albums', { name: newName, password: newPassword || undefined });
      setNewName(''); setNewPassword(''); setShowCreate(false);
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create album');
    }
    setSubmitting(false);
  };

  const copyShareLink = (token: string) => {
    const link = `${window.location.origin}/album/${token}`;
    navigator.clipboard.writeText(link).then(() => alert('Link copied!')).catch(() => prompt('Share link:', link));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Albums ({albums.length})</h2>
        <Button size="sm" onClick={() => setShowCreate(!showCreate)}>+ New Album</Button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="mb-6 p-4 rounded-lg border border-neutral-200 bg-neutral-50 space-y-3">
          <input type="text" placeholder="Album name" required value={newName} onChange={e => setNewName(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
          <input type="text" placeholder="Password (optional)" value={newPassword} onChange={e => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
          <div className="flex gap-2">
            <Button type="submit" size="sm" loading={submitting}>Create</Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12 text-neutral-400">Loading...</div>
      ) : albums.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-200 rounded-xl">
          <p className="text-neutral-500">No albums yet</p>
          <p className="text-sm text-neutral-400 mt-1">Create shareable photo collections</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map(album => (
            <div key={album.id} className="p-4 rounded-lg border border-neutral-200 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{album.name}</h3>
                  <p className="text-sm text-neutral-500 mt-1">
                    {album.photoCount} photos · {album.viewCount} views
                    {album.hasPassword ? ' · 🔒' : ''}
                  </p>
                  {album.expiresAt && <p className="text-xs text-amber-600 mt-1">Expires: {formatDate(album.expiresAt)}</p>}
                </div>
              </div>
              <button onClick={() => copyShareLink(album.shareToken)}
                className="mt-3 text-xs text-primary-600 hover:underline">📋 Copy Share Link</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══ SETTINGS TAB ═══════════════════════════════════════════════════════════

function SettingsTab({ space, user }: { space: SpaceResponse | null; user: { id: string; name: string; email: string; role: string; accountType: string } | null }) {
  const [name, setName] = useState(space?.name || '');
  const [slug, setSlug] = useState(space?.slug || '');
  const [gateKey, setGateKey] = useState('');
  const [themeColor, setThemeColor] = useState(space?.themeColor || '#3b82f6');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setMsg('');
    try {
      await api.put(`/spaces/${space?.slug}`, {
        name, slug, gateKey: gateKey || undefined, themeColor,
      });
      setMsg('✅ Settings saved!');
      setGateKey('');
    } catch (err) {
      setMsg('❌ ' + (err instanceof Error ? err.message : 'Failed to save'));
    }
    setSaving(false);
  };

  return (
    <div className="max-w-lg">
      <h2 className="text-lg font-semibold mb-4">Space Settings</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700">Space Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Space URL</label>
          <div className="mt-1 flex items-center rounded-lg border border-neutral-300 overflow-hidden">
            <span className="bg-neutral-50 px-3 py-2 text-sm text-neutral-500">framenest.photos/s/</span>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)}
              className="flex-1 px-0 py-2 text-sm focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">New Gate Key (leave blank to keep current)</label>
          <input type="password" value={gateKey} onChange={e => setGateKey(e.target.value)}
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" placeholder="New gate key" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700">Theme Color</label>
          <div className="mt-1 flex items-center gap-2">
            <input type="color" value={themeColor} onChange={e => setThemeColor(e.target.value)} className="h-8 w-12 rounded border cursor-pointer" />
            <input type="text" value={themeColor} onChange={e => setThemeColor(e.target.value)}
              className="w-28 rounded-lg border border-neutral-300 px-3 py-2 text-sm" />
          </div>
        </div>
        {msg && <p className={`text-sm ${msg.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{msg}</p>}
        <Button type="submit" loading={saving}>Save Settings</Button>
      </form>

      {user && (
        <div className="mt-8 p-4 rounded-lg border border-neutral-200 bg-neutral-50">
          <h3 className="font-semibold text-sm text-neutral-700">Account</h3>
          <p className="text-sm text-neutral-500 mt-1">{user.name} · {user.email}</p>
          <p className="text-xs text-neutral-400 mt-1">Role: {user.role.replace('_', ' ')} · Mode: {user.accountType}</p>
        </div>
      )}
    </div>
  );
}
