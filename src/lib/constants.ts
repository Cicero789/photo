import type { EventCategory } from "@/types";

export const APP_NAME = "Photo";
export const APP_URL = "https://photo.app";

export const MAX_PHOTO_SIZE_MB = 100;
export const MAX_VIDEO_DURATION_SEC = 60;
export const AD_TILE_INTERVAL = 9; // every 9th tile is an ad

export const EVENT_CATEGORIES: { value: EventCategory; label: string; emoji: string; color: string }[] = [
  { value: "holiday", label: "Holiday", emoji: "🎄", color: "#dc2626" },
  { value: "birthday", label: "Birthday", emoji: "🎂", color: "#f59e0b" },
  { value: "graduation", label: "Graduation", emoji: "🎓", color: "#2563eb" },
  { value: "wedding", label: "Wedding", emoji: "💒", color: "#d946ef" },
  { value: "celebration", label: "Celebration", emoji: "🎉", color: "#ec4899" },
  { value: "sports", label: "Sports", emoji: "⚽", color: "#16a34a" },
  { value: "school", label: "School", emoji: "📚", color: "#6366f1" },
  { value: "travel", label: "Travel", emoji: "✈️", color: "#0891b2" },
  { value: "vacation", label: "Vacation", emoji: "🏖️", color: "#0d9488" },
  { value: "work", label: "Work", emoji: "💼", color: "#64748b" },
  { value: "restaurant", label: "Restaurant", emoji: "🍽️", color: "#ea580c" },
  { value: "party", label: "Party", emoji: "🥳", color: "#be185d" },
  { value: "family", label: "Family", emoji: "👨‍👩‍👧‍👦", color: "#7c3aed" },
  { value: "kids", label: "Kids", emoji: "👶", color: "#f43f5e" },
  { value: "parents", label: "Parents", emoji: "👴👵", color: "#8b5cf6" },
  { value: "other", label: "Other", emoji: "📸", color: "#6b7280" },
];

export function getCategoryInfo(category: EventCategory) {
  return EVENT_CATEGORIES.find((c) => c.value === category) ?? EVENT_CATEGORIES[15]!;
}
