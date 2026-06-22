import { useState, useEffect, Suspense } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { HireButton } from "@/components/photographer/HireButton";
import { templateComponents } from "@/components/templates";
import { TEMPLATE_REGISTRY } from "@/components/templates/types";
import { COLOR_SCHEMES, FONT_PAIRINGS } from "@/components/photographer/TemplatePicker";

interface ProfileData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  specialties: string[];
  bio: string;
  website: string;
  portfolioUrl: string;
  serviceArea: string;
  verified: boolean;
  pricing: { downloads?: { single?: number; full?: number } };
  heroPhotos: string[];
  portfolio: { id: string; url: string; filename: string }[];
  galleryConfig?: { template?: string; colorScheme?: string; fontPairing?: string };
}

export function PhotographerProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const previewTemplate = searchParams.get("preview");
  const previewColor = searchParams.get("color");
  const previewFont = searchParams.get("font");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showHireModal, setShowHireModal] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/photographers/profile/${slug}`)
      .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })
      .then(d => setProfile(d))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-5xl">📷</p>
          <h1 className="mt-4 font-display text-xl font-bold text-neutral-900">Photographer not found</h1>
          <p className="mt-2 text-sm text-neutral-500">This profile may not exist or isn't published yet.</p>
          <Link to="/photographers" className="mt-6 inline-block text-sm font-medium text-neutral-600 hover:text-neutral-900">
            ← Browse photographers
          </Link>
        </div>
      </div>
    );
  }

  const hasPortfolio = profile.portfolio.length > 0;
  const hasPricing = profile.pricing?.downloads?.single || profile.pricing?.downloads?.full;

  // --- Template System ---
  const templateId = previewTemplate || profile.galleryConfig?.template || "clean-minimal";
  const TemplateComponent = templateComponents[templateId];

  // Resolve color scheme and font pairing from config or preview params
  const schemeKey = previewColor || profile.galleryConfig?.colorScheme || "light";
  const fontKey = previewFont || profile.galleryConfig?.fontPairing || "modern";
  const schemes = COLOR_SCHEMES.default!;
  const scheme = schemes.find(s => s.key === schemeKey) ?? schemes[0]!;
  const font = FONT_PAIRINGS.find(f => f.key === fontKey) ?? FONT_PAIRINGS[0]!;

  if (TemplateComponent) {
    return (
      <div>
        {previewTemplate && (
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            background: "#1a1a1a", color: "white", padding: "10px 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)", fontFamily: "Inter, sans-serif"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#999" }}>Previewing:</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {TEMPLATE_REGISTRY.find(t => t.id === previewTemplate)?.name || previewTemplate}
              </span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={async () => {
                try {
                  const resp = await fetch("/api/photographers/config", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("photo_token")}` },
                    body: JSON.stringify({ design: JSON.stringify({ template: previewTemplate, colorScheme: previewColor || "light", fontPairing: previewFont || "modern" }) }),
                  });
                  if (!resp.ok) {
                    console.error("Failed to save template config:", resp.status);
                    return;
                  }
                  window.location.href = `/${slug}`;
                } catch (e) { console.error("Save template error:", e); }
              }} style={{
                padding: "8px 20px", background: "#22c55e", color: "white", border: "none",
                borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer"
              }}>
                Use This Template
              </button>
              <button onClick={() => window.history.back()} style={{
                padding: "8px 20px", background: "transparent", color: "#999", border: "1px solid #444",
                borderRadius: 6, fontSize: 13, cursor: "pointer"
              }}>
                Back
              </button>
            </div>
          </div>
        )}
        <div style={{ paddingTop: previewTemplate ? 52 : 0 }}>
        <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" /></div>}>
          <div style={{
            '--theme-bg': scheme.bg,
            '--theme-text': scheme.text,
            '--theme-accent': scheme.accent,
            '--theme-heading-font': `"${font.heading}", sans-serif`,
            '--theme-body-font': `"${font.body}", sans-serif`,
          } as React.CSSProperties}>
          <TemplateComponent
            name={profile.name}
            tagline={profile.tagline}
            specialties={profile.specialties}
            bio={profile.bio}
            website={profile.website}
            serviceArea={profile.serviceArea}
            verified={profile.verified}
            pricing={profile.pricing}
            portfolio={profile.portfolio}
            onHire={() => setShowHireModal(true)}
            onPhotoClick={(i: number) => setLightbox(i)}
            colorScheme={{ bg: scheme.bg, text: scheme.text, accent: scheme.accent }}
            fontPairing={{ heading: font.heading, body: font.body }}
          />
          </div>
        </Suspense>
        </div>

        {/* Hire modal triggered by template onHire */}
        {showHireModal && (
          <HireButton
            photographerName={profile.name}
            autoOpen
            onDismiss={() => setShowHireModal(false)}
          />
        )}

        {/* Lightbox */}
        {lightbox !== null && profile.portfolio[lightbox] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 text-lg">&#10005;</button>
            {lightbox > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl">&#8249;</button>
            )}
            {lightbox < profile.portfolio.length - 1 && (
              <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl">&#8250;</button>
            )}
            <img src={profile.portfolio[lightbox].url} alt=""
              onClick={e => e.stopPropagation()}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
              {lightbox + 1} / {profile.portfolio.length}
            </span>
          </div>
        )}
      </div>
    );
  }

  // --- Fallback: hardcoded layout for unknown templates ---
  return (
    <div>
      {previewTemplate && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "#1a1a1a", color: "white", padding: "10px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)", fontFamily: "Inter, sans-serif"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#999" }}>Previewing:</span>
            <span style={{ fontSize: 14, fontWeight: 600 }}>
              {TEMPLATE_REGISTRY.find(t => t.id === previewTemplate)?.name || previewTemplate}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={async () => {
              try {
                const resp = await fetch("/api/photographers/config", {
                  method: "PUT",
                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("photo_token")}` },
                  body: JSON.stringify({ design: JSON.stringify({ template: previewTemplate, colorScheme: previewColor || "light", fontPairing: previewFont || "modern" }) }),
                });
                if (!resp.ok) {
                  console.error("Failed to save template config:", resp.status);
                  return;
                }
                window.location.href = `/${slug}`;
              } catch (e) { console.error("Save template error:", e); }
            }} style={{
              padding: "8px 20px", background: "#22c55e", color: "white", border: "none",
              borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer"
            }}>
              Use This Template
            </button>
            <button onClick={() => window.history.back()} style={{
              padding: "8px 20px", background: "transparent", color: "#999", border: "1px solid #444",
              borderRadius: 6, fontSize: 13, cursor: "pointer"
            }}>
              Back
            </button>
          </div>
        </div>
      )}
      <div style={{ paddingTop: previewTemplate ? 52 : 0 }}>
      {/* Header */}
      <section className="border-b border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-8">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-4xl font-bold text-neutral-400">
              {profile.name.charAt(0)}
            </div>
            <div className="mt-4 sm:mt-0">
              <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
                {profile.name}
                {profile.verified && <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-600" title="Verified photographer">✓</span>}
              </h1>
              {profile.tagline && (
                <p className="mt-2 text-lg text-neutral-500">{profile.tagline}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                {profile.serviceArea && (
                  <span className="inline-flex items-center gap-1 text-sm text-neutral-500">
                    📍 {profile.serviceArea}
                  </span>
                )}
                {profile.specialties.map(s => (
                  <span key={s} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <HireButton photographerName={profile.name} />
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer"
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50">
                    Website ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      {hasPortfolio && (
        <section className="bg-neutral-50 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center font-display text-xl font-bold text-neutral-900 sm:text-2xl">Portfolio</h2>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {profile.portfolio.map((photo, i) => (
                <div key={photo.id}
                  onClick={() => setLightbox(i)}
                  className="group relative cursor-pointer overflow-hidden rounded-lg bg-neutral-200 aspect-square">
                  <img src={photo.url} alt={photo.filename || `Portfolio ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About */}
      {profile.bio && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="font-display text-xl font-bold text-neutral-900">About</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 whitespace-pre-line">{profile.bio}</p>
          </div>
        </section>
      )}

      {/* Pricing */}
      {hasPricing && (
        <section className="border-t border-border bg-neutral-50 py-12 sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="font-display text-xl font-bold text-neutral-900">Pricing</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {profile.pricing.downloads?.single && (
                <div className="rounded-xl border border-border bg-white p-6">
                  <p className="text-sm font-medium text-neutral-500">Single Download</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">${profile.pricing.downloads.single}</p>
                </div>
              )}
              {profile.pricing.downloads?.full && (
                <div className="rounded-xl border border-border bg-white p-6">
                  <p className="text-sm font-medium text-neutral-500">Full Gallery</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">${profile.pricing.downloads.full}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="border-t border-border bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-xl font-bold text-neutral-900">Work with {profile.name.split(" ")[0]}</h2>
          <p className="mt-2 text-sm text-neutral-500">
            {profile.serviceArea ? `Based in ${profile.serviceArea}. ` : ""}Send a message to discuss your project.
          </p>
          <div className="mt-6">
            <HireButton photographerName={profile.name} />
          </div>
        </div>
      </section>
      </div>

      {/* Lightbox */}
      {lightbox !== null && profile.portfolio[lightbox] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 text-lg">✕</button>
          {lightbox > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl">‹</button>
          )}
          {lightbox < profile.portfolio.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl">›</button>
          )}
          <img src={profile.portfolio[lightbox].url} alt=""
            onClick={e => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {lightbox + 1} / {profile.portfolio.length}
          </span>
        </div>
      )}
    </div>
  );
}
