import { useState } from "react";
import { TEMPLATE_REGISTRY } from "@/components/templates/types";
import { cn } from "@/lib/utils";

interface TemplatePickerProps {
  currentTemplate: string;
  onSave: (templateId: string) => void;
}

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

export function TemplatePicker({ currentTemplate, onSave }: TemplatePickerProps) {
  const [selected, setSelected] = useState(currentTemplate);
  const [filter, setFilter] = useState("all");
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const filtered =
    filter === "all"
      ? TEMPLATE_REGISTRY
      : TEMPLATE_REGISTRY.filter((t) => t.category === filter);

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg(false);
    try {
      await onSave(selected);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch {
      // parent handles errors
    } finally {
      setSaving(false);
    }
  };

  const isLight = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 200;
  };

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
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={cn(
                "group relative rounded-lg border-2 text-left transition-all overflow-hidden",
                isSelected
                  ? "border-primary-600 ring-2 ring-primary-200"
                  : "border-border hover:border-neutral-300"
              )}
            >
              {/* Color swatch bar */}
              <div
                className={cn("h-8 w-full", light && "border-b border-neutral-200")}
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
                    CATEGORY_BADGE_COLORS[t.category] || "bg-neutral-100 text-neutral-600"
                  )}
                >
                  {t.category}
                </span>
                <p className="mt-1 text-[11px] leading-snug text-neutral-400">
                  {t.description}
                </p>
              </div>

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-white text-xs">
                  &#10003;
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Save button and success message */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || selected === currentTemplate}
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
    </div>
  );
}
