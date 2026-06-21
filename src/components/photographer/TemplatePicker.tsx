import { useState, useEffect, Suspense, useCallback } from "react";
import { TEMPLATE_REGISTRY } from "@/components/templates/types";
import { templateComponents } from "@/components/templates";
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

// ─── Swatch colors per template ───
const SWATCH_COLORS: Record<string, string> = {
  "clean-minimal": "#ffffff",
  "cinematic-dark": "#0a0a0a",
  "editorial-magazine": "#fafaf9",
  "instagram-grid": "#0095f6",
  "masonry-wall": "#6366f1",
  "split-hero": "#fffbf5",
  "vertical-scroll": "#ffffff",
  "carousel-spotlight": "#f9fafb",
  "story-cards": "#fffbf5",
  "brutalist-bold": "#000000",
  "sports-action": "#00ff88",
  "sports-editorial": "#ffffff",
  "engagement-blush": "#fff1f2",
  "engagement-elegant": "#fffbf5",
  "family-warm": "#fdf6e3",
  "family-modern": "#ffffff",
  "corporate-suite": "#0f172a",
  "corporate-pro": "#2563eb",
  "holiday-hearth": "#7f1d1d",
  "golden-feast": "#92400e",
  "holiday-festive": "#ffffff",
  "holiday-elegant": "#fef3c7",
  "winter-frozen": "#f0f9ff",
  "winter-cozy": "#1c1917",
  "summer-beach": "#fef7ed",
  "summer-golden": "#f97316",
  "spring-blossom": "#fdf2f8",
  "spring-fresh": "#f0fdf4",
  "fall-warmth": "#451a03",
  "fall-palette": "#fffbeb",
  "portrait-studio": "#ffffff",
  "portrait-headshot": "#f1f3f6",
  "street-gritty": "#1a1a1a",
  "street-neon": "#18181b",
};

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
};

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "base", label: "Base" },
  { key: "sports", label: "Sports" },
  { key: "engagement", label: "Engagement" },
  { key: "family", label: "Family" },
  { key: "corporate", label: "Corporate" },
  { key: "holiday", label: "Holiday" },
  { key: "holiday-season", label: "Holiday Season" },
  { key: "winter", label: "Winter" },
  { key: "summer", label: "Summer" },
  { key: "spring", label: "Spring" },
  { key: "fall", label: "Fall" },
  { key: "portraits", label: "Portraits" },
  { key: "street", label: "Street" },
];

// ─── Main Component ───
export function TemplatePicker({
  currentTemplate,
  currentColorScheme,
  currentFontPairing,
  onSave,
}: TemplatePickerProps) {
  const [selected, setSelected] = useState(currentTemplate);
  const [filter, setFilter] = useState("all");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Preview modal state
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<PreviewProfileData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Color scheme & font pairing state
  const [colorScheme, setColorScheme] = useState(currentColorScheme || "light");
  const [fontPairing, setFontPairing] = useState(currentFontPairing || "modern");

  const filtered =
    filter === "all"
      ? TEMPLATE_REGISTRY
      : TEMPLATE_REGISTRY.filter((t) => t.category === filter);

  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 200;
  };

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
      setPreviewId(null);
    }
  };

  // Get current color scheme and font pairing objects
  const schemes = COLOR_SCHEMES.default!;
  const currentScheme = schemes.find((s) => s.key === colorScheme) ?? schemes[0]!;
  const currentFont =
    FONT_PAIRINGS.find((f) => f.key === fontPairing) ?? FONT_PAIRINGS[0]!;

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

      {/* Category filter tabs */}
      <div className="mt-4 flex flex-wrap gap-1">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-colors",
              filter === tab.key
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((t) => {
          const color = SWATCH_COLORS[t.id] || "#e5e7eb";
          const light = isLight(color);
          const isSelected = selected === t.id;

          return (
            <div
              key={t.id}
              className={cn(
                "group relative rounded-lg border-2 text-left transition-all overflow-hidden",
                isSelected
                  ? "border-primary-600 ring-2 ring-primary-200"
                  : "border-border hover:border-neutral-300"
              )}
            >
              {/* Clickable area to select */}
              <button
                onClick={() => setSelected(t.id)}
                className="w-full text-left"
              >
                {/* Color swatch bar */}
                <div
                  className={cn(
                    "h-8 w-full",
                    light && "border-b border-neutral-200"
                  )}
                  style={{ backgroundColor: color }}
                />

                {/* Card content */}
                <div className="p-2.5">
                  <p className="text-sm font-semibold text-neutral-900 leading-tight">
                    {t.name}
                  </p>
                  <span
                    className={cn(
                      "mt-1 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none",
                      CATEGORY_BADGE_COLORS[t.category] ||
                        "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    {t.category}
                  </span>
                  <p className="mt-1 text-[11px] leading-snug text-neutral-400">
                    {t.description}
                  </p>
                </div>
              </button>

              {/* Preview button — shown on hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewId(t.id);
                }}
                className="absolute bottom-2 right-2 rounded-md bg-neutral-900/80 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-neutral-900"
              >
                Preview
              </button>

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-white text-xs">
                  &#10003;
                </div>
              )}
            </div>
          );
        })}
      </div>

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
                <div
                  style={
                    {
                      "--theme-bg": currentScheme.bg,
                      "--theme-text": currentScheme.text,
                      "--theme-accent": currentScheme.accent,
                      "--theme-heading-font": currentFont.heading,
                      "--theme-body-font": currentFont.body,
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
                    />
                  </Suspense>
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
}: {
  templateId: string;
  profileData: PreviewProfileData;
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
    />
  );
}
