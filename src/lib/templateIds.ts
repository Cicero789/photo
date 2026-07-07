// Central template ID resolution — prevents broken images from stale IDs
import { TEMPLATE_REGISTRY } from "../components/templates/types";

export const DEFAULT_TEMPLATE_ID = "1-clean";

const TEMPLATE_ID_ALIASES: Record<string, string> = {
  "clean-minimal": "1-clean",
  "cinematic-dark": "2-cinematic",
  "editorial-magazine": "3-editorial",
  "instagram-grid": "4-instagram",
  "masonry-wall": "5-masonry",
  "split-hero": "6-split",
  "vertical-scroll": "7-vertical",
  "carousel-spotlight": "8-carousel",
  "story-cards": "9-story-cards",
  "brutalist-bold": "10-brutalist",
};

const TEMPLATE_IDS = new Set(TEMPLATE_REGISTRY.map((t) => t.id));

export function normalizeTemplateId(value?: string | null): string {
  if (!value) return DEFAULT_TEMPLATE_ID;
  const resolved = TEMPLATE_ID_ALIASES[value] ?? value;
  return TEMPLATE_IDS.has(resolved) ? resolved : DEFAULT_TEMPLATE_ID;
}
