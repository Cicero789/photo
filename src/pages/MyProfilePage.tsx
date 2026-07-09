import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { TemplatePicker } from "@/components/photographer/TemplatePicker";
import { normalizeTemplateId } from "@/lib/templateIds";

export function MyProfilePage() {
  const [profile, setProfile] = useState<{
    slug: string; tagline: string; specialties: string; template: string;
    bio?: string; website?: string; serviceArea?: string;
    pricingConfig?: any; stripeAccount?: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    api.get<{ slug: string; tagline: string; specialties: string; bio?: string; website?: string; serviceArea?: string; design?: string; pricingConfig?: any; stripeAccount?: string }>("/photographers/config")
      .then(d => {
        if (d.slug) {
          const design = typeof d.design === "string" ? JSON.parse(d.design || "{}") : (d.design || {});
          setProfile({
            slug: d.slug, tagline: d.tagline || "", specialties: d.specialties || "",
            template: normalizeTemplateId(design.template),
            bio: d.bio, website: d.website, serviceArea: d.serviceArea,
            pricingConfig: d.pricingConfig, stripeAccount: d.stripeAccount,
          });
        }
      }).catch(() => {});
  }, []);

  const handleTemplateSave = async (templateId: string) => {
    const existing = profile?.template ? JSON.parse((await api.get<{ design?: string }>("/photographers/config")).design || "{}") : {};
    existing.template = templateId;
    await api.put("/photographers/config", { design: JSON.stringify(existing) });
    setProfile(p => p ? { ...p, template: templateId } : p);
    setMsg({ type: "success", text: "Template saved!" });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleProfileSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      await api.put("/photographers/config", {
        tagline: profile.tagline, specialties: profile.specialties,
        bio: profile.bio, website: profile.website, serviceArea: profile.serviceArea,
      });
      setMsg({ type: "success", text: "Profile saved!" });
      setTimeout(() => setMsg(null), 3000);
    } catch { setMsg({ type: "error", text: "Save failed" }); }
    setSaving(false);
  };

  if (!profile) return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" /></div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">My Profile</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Your public page at{" "}
            <Link to={`/${profile.slug}`} className="text-primary-600 hover:underline" target="_blank">
              framenest.photos/{profile.slug} ↗
            </Link>
          </p>
        </div>
      </div>

      {msg && (
        <div className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${msg.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {msg.text}
        </div>
      )}

      {/* Template */}
      <section className="mb-10 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Template</h2>
        <p className="mb-4 text-sm text-neutral-500">Choose how your public profile looks to visitors.</p>
        <TemplatePicker
          currentTemplate={profile.template}
          slug={profile.slug}
          onSave={handleTemplateSave}
        />
      </section>

      {/* Profile Details */}
      <section className="rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Profile Details</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Tagline</label>
            <input value={profile.tagline} onChange={e => setProfile(p => p ? { ...p, tagline: e.target.value } : p)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" placeholder="e.g. Capturing moments that matter" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Specialties (comma-separated)</label>
            <input value={profile.specialties} onChange={e => setProfile(p => p ? { ...p, specialties: e.target.value } : p)}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" placeholder="e.g. Wedding, Portrait, Landscape" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Bio</label>
            <textarea value={profile.bio || ""} onChange={e => setProfile(p => p ? { ...p, bio: e.target.value } : p)} rows={4}
              className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" placeholder="Tell visitors about yourself..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Website</label>
              <input value={profile.website || ""} onChange={e => setProfile(p => p ? { ...p, website: e.target.value } : p)}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Service Area</label>
              <input value={profile.serviceArea || ""} onChange={e => setProfile(p => p ? { ...p, serviceArea: e.target.value } : p)}
                className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm" placeholder="e.g. Orange County, CA" />
            </div>
          </div>
          <button onClick={handleProfileSave} disabled={saving}
            className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </section>
    </div>
  );
}
