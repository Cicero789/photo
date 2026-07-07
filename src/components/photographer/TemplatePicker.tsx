import { useState, useEffect, Suspense, useCallback } from "react";
import { TEMPLATE_REGISTRY } from "@/components/templates/types";
import { templateComponents, resolveTemplateId } from "@/components/templates";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

// ─── Color Schemes ───
export const COLOR_SCHEMES: Record<
  string,
  { name: string; key: string; bg: string; text: string; accent: string }[]
> = {
  default: [
    { name: "Light", key: "light", bg: "#ffffff", text: "#1a1a1a", accent: "#2563eb" },
    { name: "Dark", key: "dark", bg: "#0a0a0a", text: "#f5f5f5", accent: "#d4af37" },
    { name: "Warm", key: "warm", bg: "#fffbf5", text: "#44403c", accent: "#b45309" },
    { name: "Cool", key: "cool", bg: "#f0f4f8", text: "#1e293b", accent: "#0ea5e9" },
  ],
};

// ─── Font Pairings ───
export const FONT_PAIRINGS = [
  { name: "Modern", key: "modern", heading: "Inter", body: "Inter" },
  { name: "Classic", key: "classic", heading: "Playfair Display", body: "Source Sans 3" },
  { name: "Elegant", key: "elegant", heading: "Cormorant Garamond", body: "Montserrat" },
  { name: "Bold", key: "bold", heading: "Bebas Neue", body: "Roboto" },
  { name: "Warm", key: "warm", heading: "Lora", body: "Poppins" },
];

// ─── Placeholder photos when photographer has no portfolio ───
const PLACEHOLDER_PHOTOS = [
  { id: "ph-1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600", filename: "wedding.jpg" },
  { id: "ph-2", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600", filename: "portrait.jpg" },
  { id: "ph-3", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", filename: "landscape.jpg" },
  { id: "ph-4", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600", filename: "ceremony.jpg" },
  { id: "ph-5", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600", filename: "headshot.jpg" },
  { id: "ph-6", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600", filename: "nature.jpg" },
];

// ─── Props ───
interface TemplatePickerProps {
  currentTemplate: string;
  currentColorScheme?: string;
  currentFontPairing?: string;
  slug?: string;
  onSave: (templateId: string, colorScheme?: string, fontPairing?: string) => void | Promise<void>;
}

// ─── Profile data shape for template preview ───
interface PreviewProfileData {
  name: string;
  tagline: string;
  specialties: string[];
  bio: string;
  website: string;
  serviceArea: string;
  verified: boolean;
  pricing: { downloads?: { single?: number; full?: number } };
  portfolio: { id: string; url: string; filename: string }[];
}


const CATEGORY_BADGE_COLORS: Record<string, string> = {
  base: "bg-neutral-100 text-neutral-600",
  sports: "bg-green-100 text-green-700",
  engagement: "bg-pink-100 text-pink-700",
  family: "bg-amber-100 text-amber-700",
  corporate: "bg-blue-100 text-blue-700",
  "holiday-season": "bg-red-100 text-red-700",
  holiday: "bg-yellow-100 text-yellow-700",
  winter: "bg-sky-100 text-sky-700",
  summer: "bg-orange-100 text-orange-700",
  spring: "bg-emerald-100 text-emerald-700",
  fall: "bg-amber-100 text-amber-800",
  portraits: "bg-purple-100 text-purple-700",
  street: "bg-neutral-200 text-neutral-700",
  beauty: "bg-rose-100 text-rose-700",
  childcare: "bg-cyan-100 text-cyan-700",
  coaching: "bg-indigo-100 text-indigo-700",
  creative: "bg-violet-100 text-violet-700",
  events: "bg-fuchsia-100 text-fuchsia-700",
  fitness: "bg-lime-100 text-lime-700",
  "home-services": "bg-teal-100 text-teal-700",
  influencer: "bg-pink-100 text-pink-600",
  legal: "bg-slate-200 text-slate-700",
  marketing: "bg-orange-100 text-orange-600",
  medical: "bg-red-100 text-red-600",
  offices: "bg-gray-100 text-gray-600",
  "pet-services": "bg-amber-100 text-amber-600",
  "real-estate": "bg-blue-100 text-blue-600",
  restaurant: "bg-yellow-100 text-yellow-600",
  retail: "bg-emerald-100 text-emerald-600",
  specialty: "bg-purple-100 text-purple-600",
  teaching: "bg-sky-100 text-sky-600",
  tech: "bg-zinc-200 text-zinc-700",
  travel: "bg-cyan-100 text-cyan-600",
};

const CATEGORY_GROUPS = [
  { label: "Base Templates", categories: ["base"] },
  { label: "Seasonal", categories: ["spring", "summer", "fall", "winter"] },
  { label: "Events & Occasions", categories: ["engagement", "family", "corporate", "holiday-season", "holiday", "events"] },
  { label: "Health & Wellness", categories: ["medical", "fitness", "beauty"] },
  { label: "Professional Services", categories: ["legal", "coaching", "creative", "marketing", "tech", "specialty"] },
  { label: "Home & Property", categories: ["real-estate", "home-services", "offices"] },
  { label: "Food & Retail", categories: ["restaurant", "retail"] },
  { label: "Care & Community", categories: ["childcare", "pet-services", "teaching", "travel"] },
  { label: "Media & Influence", categories: ["influencer"] },
  { label: "Photography", categories: ["sports", "portraits", "street"] },
];

// ─── Mini-mockup thumbnails for each template ───

// ─── Main Component ───
export function TemplatePicker({
  currentTemplate,
  currentColorScheme,
  currentFontPairing,
  slug,
  onSave,
}: TemplatePickerProps) {
  const [selected, setSelected] = useState(resolveTemplateId(currentTemplate));
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Preview modal state
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<PreviewProfileData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Color scheme & font pairing state
  const [colorScheme, setColorScheme] = useState(currentColorScheme || "light");
  const [fontPairing, setFontPairing] = useState(currentFontPairing || "modern");

  // Preview modal color/font state (initialized from current selections)
  const [previewColor, setPreviewColor] = useState<string>(currentColorScheme || "light");
  const [previewFont, setPreviewFont] = useState<string>(currentFontPairing || "modern");

  // ─── Fetch photographer profile data for preview ───
  const fetchProfileData = useCallback(async () => {
    setPreviewLoading(true);
    try {
      const [configRes, portfolioRes] = await Promise.all([
        api.get<{
          slug: string;
          tagline: string;
          specialties: string;
          pricing: string;
          design: string;
        }>("/photographers/config"),
        api.get<{ photos: { id: string; url: string; filename: string }[] }>(
          "/photographers/portfolio"
        ),
      ]);

      let pricing = {};
      try {
        pricing = JSON.parse(configRes.pricing || "{}");
      } catch {}

      const photos =
        portfolioRes.photos && portfolioRes.photos.length > 0
          ? portfolioRes.photos
          : PLACEHOLDER_PHOTOS;

      const specialties = configRes.specialties
        ? configRes.specialties
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : ["Photography"];

      setProfileData({
        name: configRes.slug
          ? configRes.slug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          : "Your Name",
        tagline: configRes.tagline || "Capturing moments that matter",
        specialties,
        bio: "Professional photographer with a passion for capturing life's most meaningful moments. Every photo tells a story, and I'm here to tell yours.",
        website: "",
        serviceArea: "",
        verified: false,
        pricing: pricing as PreviewProfileData["pricing"],
        portfolio: photos,
      });
    } catch {
      // Use full placeholder data if API fails
      setProfileData({
        name: "Your Name",
        tagline: "Capturing moments that matter",
        specialties: ["Photography", "Portraits", "Events"],
        bio: "Professional photographer with a passion for capturing life's most meaningful moments.",
        website: "",
        serviceArea: "",
        verified: false,
        pricing: {},
        portfolio: PLACEHOLDER_PHOTOS,
      });
    } finally {
      setPreviewLoading(false);
    }
  }, []);

  // Fetch profile data when preview modal opens
  useEffect(() => {
    if (previewId && !profileData) {
      fetchProfileData();
    }
  }, [previewId, profileData, fetchProfileData]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (previewId) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [previewId]);

  // ─── Handle save with color scheme and font pairing ───
  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg(false);
    try {
      await onSave(selected, colorScheme, fontPairing);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch {
      // parent handles errors
    } finally {
      setSaving(false);
    }
  };

  // ─── Handle "Use This Template" from preview modal ───
  const handleUseTemplate = () => {
    if (previewId) {
      setSelected(previewId);
      setColorScheme(previewColor);
      setFontPairing(previewFont);
      setPreviewId(null);
    }
  };

  // Get available color schemes
  const schemes = COLOR_SCHEMES.default!;

  // Get preview color scheme and font pairing objects
  const previewScheme = schemes.find((s) => s.key === previewColor) ?? schemes[0]!;
  const previewFontObj =
    FONT_PAIRINGS.find((f) => f.key === previewFont) ?? FONT_PAIRINGS[0]!;

  // Find the template info for preview
  const previewTemplate = previewId
    ? TEMPLATE_REGISTRY.find((t) => t.id === previewId)
    : null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-neutral-900">Template</h3>
      <p className="mt-1 text-sm text-neutral-500">
        Choose a layout template for your public photographer profile page.
      </p>

      {/* Template grid - grouped by category */}
      {CATEGORY_GROUPS.map((group) => {
        const groupTemplates = TEMPLATE_REGISTRY.filter((t) =>
          group.categories.includes(t.category)
        );
        if (groupTemplates.length === 0) return null;
        return (
          <div key={group.label} className="mt-8 first:mt-5">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>
            {/* Cards */}
            <div className="flex flex-wrap gap-4">
              {groupTemplates.map((t) => {
                const isSelected = selected === t.id;
                return (
                  <div
                    key={t.id}
                    className={cn(
                      "group relative overflow-hidden transition-all bg-white",
                      isSelected
                        ? "ring-2 ring-primary-600 shadow-md"
                        : "ring-1 ring-neutral-200 hover:shadow-md"
                    )}
                    style={{ width: 220, borderRadius: 10 }}
                  >
                    <button
                      onClick={() => setSelected(t.id)}
                      className="w-full text-left"
                    >
                      <img
                        src={`/thumbnails/${t.id}.jpg`}
                        alt={t.name}
                        loading="lazy"
                        className="w-full h-[160px] object-cover object-top"
                        style={{ borderRadius: "10px 10px 0 0" }}
                      />
                      <div className="px-3 pt-2.5 pb-3">
                        <p className="text-[13px] font-semibold text-neutral-900 leading-tight">
                          {t.name}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-neutral-500 line-clamp-2">
                          {t.description}
                        </p>
                      </div>
                    </button>
                    {/* Preview button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewId(t.id);
                        setPreviewColor(colorScheme);
                        setPreviewFont(fontPairing);
                      }}
                      className="absolute bottom-3 right-3 text-[11px] font-medium text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-neutral-800"
                    >
                      Preview &#8599;
                    </button>
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-white text-xs">
                        &#10003;
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ─── Customization Section (visible when a template is selected) ─── */}
      {selected && (
        <div className="mt-8 rounded-xl border border-border bg-white p-6">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-400">
            Customization
          </div>
          <p className="text-sm font-semibold text-neutral-900">
            Selected:{" "}
            {TEMPLATE_REGISTRY.find((t) => t.id === selected)?.name ||
              selected}
          </p>

          {/* Color Scheme */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-neutral-700">
              Color Scheme
            </label>
            <div className="mt-2 flex flex-wrap gap-3">
              {schemes.map((scheme) => {
                const active = colorScheme === scheme.key;
                return (
                  <button
                    key={scheme.key}
                    onClick={() => setColorScheme(scheme.key)}
                    className="flex items-center gap-2 group/swatch"
                    title={scheme.name}
                  >
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full border-2 transition-all",
                        active
                          ? "border-primary-600 ring-2 ring-primary-200 scale-110"
                          : "border-neutral-300 hover:border-neutral-400"
                      )}
                      style={{ backgroundColor: scheme.bg }}
                    >
                      {/* Inner accent dot */}
                      <div
                        className="mx-auto mt-1.5 h-2 w-2 rounded-full"
                        style={{ backgroundColor: scheme.accent }}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        active ? "text-neutral-900" : "text-neutral-500"
                      )}
                    >
                      {scheme.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Pairing */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-neutral-700">
              Font Pairing
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {FONT_PAIRINGS.map((fp) => {
                const active = fontPairing === fp.key;
                return (
                  <button
                    key={fp.key}
                    onClick={() => setFontPairing(fp.key)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                      active
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                  >
                    {fp.name}{" "}
                    <span className="text-neutral-400">({fp.heading})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Save button and success message */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={
            saving ||
            (selected === currentTemplate &&
              colorScheme === (currentColorScheme || "light") &&
              fontPairing === (currentFontPairing || "modern"))
          }
          className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Template"}
        </button>
        {successMsg && (
          <span className="text-sm font-medium text-emerald-600">
            Template saved successfully.
          </span>
        )}
      </div>

      {/* ─── Preview Modal ─── */}
      {previewId && (
        <div className="fixed inset-0 z-50 flex flex-col">
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPreviewId(null)}
          />

          {/* Modal content */}
          <div className="relative z-10 flex h-full flex-col">
            {/* Fixed header */}
            <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-neutral-900">
                  {previewTemplate?.name || "Template Preview"}
                </h2>
                {previewTemplate && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      CATEGORY_BADGE_COLORS[previewTemplate.category] ||
                        "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    {previewTemplate.category}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleUseTemplate}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Use This Template
                </button>
                {slug && (
                  <a
                    href={`/${slug}?preview=${previewId}&color=${previewColor}&font=${previewFont}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: "8px 16px", border: "1px solid #ddd", borderRadius: 6, fontSize: 12, color: "#666", textDecoration: "none", display: "inline-flex", alignItems: "center" }}
                  >
                    Open Full Page ↗
                  </a>
                )}
                <button
                  onClick={() => setPreviewId(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Close preview"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable template render area */}
            <div className="flex-1 overflow-y-auto bg-neutral-100">
              {previewLoading || !profileData ? (
                <div className="flex items-center justify-center py-32">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
                    <p className="text-sm text-neutral-500">
                      Loading preview...
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Color/font controls INSIDE the preview */}
                  <div className="flex items-center gap-4 px-4 py-2 bg-neutral-800 text-white text-xs rounded-t-lg sticky top-0 z-10">
                    <span className="text-neutral-400">Color:</span>
                    {schemes.map(s => (
                      <button
                        key={s.key}
                        onClick={() => setPreviewColor(s.key)}
                        className={`w-5 h-5 rounded-full border-2 transition-all ${previewColor === s.key ? 'border-white scale-125' : 'border-transparent'}`}
                        style={{ background: s.bg }}
                        title={s.name}
                      />
                    ))}
                    <span className="ml-4 text-neutral-400">Font:</span>
                    {FONT_PAIRINGS.map(f => (
                      <button
                        key={f.key}
                        onClick={() => setPreviewFont(f.key)}
                        className={`px-2 py-0.5 rounded text-[10px] transition-all ${previewFont === f.key ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                  <div
                    style={
                      {
                        "--theme-bg": previewScheme.bg,
                        "--theme-text": previewScheme.text,
                        "--theme-accent": previewScheme.accent,
                        "--theme-heading-font": `"${previewFontObj.heading}", sans-serif`,
                        "--theme-body-font": `"${previewFontObj.body}", sans-serif`,
                      } as React.CSSProperties
                    }
                  >
                    <Suspense
                      fallback={
                        <div className="flex items-center justify-center py-32">
                          <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
                            <p className="text-sm text-neutral-500">
                              Loading template...
                            </p>
                          </div>
                        </div>
                      }
                    >
                      <PreviewRenderer
                        templateId={previewId}
                        profileData={profileData}
                        colorScheme={previewScheme}
                        fontPairing={previewFontObj}
                      />
                    </Suspense>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Preview Renderer (separate component for Suspense boundary) ───
function PreviewRenderer({
  templateId,
  profileData,
  colorScheme,
  fontPairing,
}: {
  templateId: string;
  profileData: PreviewProfileData;
  colorScheme?: { bg: string; text: string; accent: string };
  fontPairing?: { heading: string; body: string };
}) {
  const TemplateComponent = templateComponents[templateId];

  if (!TemplateComponent) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm text-neutral-500">
          Template "{templateId}" not found.
        </p>
      </div>
    );
  }

  return (
    <TemplateComponent
      name={profileData.name}
      tagline={profileData.tagline}
      specialties={profileData.specialties}
      bio={profileData.bio}
      website={profileData.website}
      serviceArea={profileData.serviceArea}
      verified={profileData.verified}
      pricing={profileData.pricing}
      portfolio={profileData.portfolio}
      onHire={() => {}}
      onPhotoClick={() => {}}
      colorScheme={colorScheme}
      fontPairing={fontPairing}
    />
  );
}
