import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

interface FeedItem { id: string; title: string; category: string; eventDate: string; coverPhotoUrl?: string; photoCount: number; fromName: string; connectionType: string; spaceSlug: string; favoriteCount: number; }

export function CommunityFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/feed").then((d: any) => setItems(d.feed || [])).catch(()=>{}).finally(()=>setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-3 border-primary-200 border-t-primary-600" /></div>;
  if (items.length === 0) return <div className="text-center py-12 text-neutral-400">No community activity yet. Invite family or friends to see their shared events here.</div>;

  const family = items.filter(i => i.connectionType === "family");
  const friends = items.filter(i => i.connectionType === "friend");

  return <div className="space-y-6">
    {family.length > 0 && <Section label="👨‍👩‍👧‍👦 Family" color="border-l-blue-500" items={family} />}
    {friends.length > 0 && <Section label="🤝 Friends" color="border-l-emerald-500" items={friends} />}
  </div>;
}

function Section({ label, color, items }: { label: string; color: string; items: FeedItem[] }) {
  return <div>
    <h3 className="text-sm font-semibold text-neutral-700 mb-3">{label} ({items.length})</h3>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(item => (
        <Link key={item.id} to={`/s/${item.spaceSlug}/e/${item.id}`} className={`rounded-xl border-l-4 ${color} border border-border bg-white p-4 hover:shadow-md transition-shadow`}>
          <p className="text-sm font-medium truncate">{item.title}</p>
          <p className="text-xs text-neutral-400 mt-1">by {item.fromName} · {item.photoCount} photos</p>
          {item.favoriteCount > 0 && <p className="text-xs text-yellow-600 mt-1">⭐ {item.favoriteCount} favorites</p>}
        </Link>
      ))}
    </div>
  </div>;
}
