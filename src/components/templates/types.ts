/** Shared types for all photographer profile templates */

export interface TemplateProps {
  name: string;
  tagline: string;
  specialties: string[];
  bio: string;
  website: string;
  serviceArea: string;
  verified: boolean;
  pricing: { downloads?: { single?: number; full?: number } };
  portfolio: { id: string; url: string; filename: string }[];
  onHire: () => void;
  onPhotoClick: (index: number) => void;
}

export interface TemplateInfo {
  id: string;
  name: string;
  category: string;
  description: string;
}

/** All available templates — add new ones here */
export const TEMPLATE_REGISTRY: TemplateInfo[] = [
  { id: "clean-minimal", name: "Clean Minimal", category: "base", description: "White, grid, simple" },
  { id: "cinematic-dark", name: "Cinematic Dark", category: "base", description: "Black + gold, hero overlay" },
  { id: "editorial-magazine", name: "Editorial Magazine", category: "base", description: "Off-white, serif, asymmetric" },
  { id: "instagram-grid", name: "Instagram Grid", category: "base", description: "Social-style, tight 3-col" },
  { id: "masonry-wall", name: "Masonry Wall", category: "base", description: "Pinterest-style, varied heights" },
  { id: "split-hero", name: "Split Hero", category: "base", description: "Half photo, half text" },
  { id: "vertical-scroll", name: "Vertical Scroll", category: "base", description: "Full-width stacked photos" },
  { id: "carousel-spotlight", name: "Carousel Spotlight", category: "base", description: "One large photo + arrows" },
  { id: "story-cards", name: "Story Cards", category: "base", description: "Warm cards with titles" },
  { id: "brutalist-bold", name: "Brutalist Bold", category: "base", description: "Huge text, stark B&W" },
  // Add category-specific templates below this line:
  // { id: "sports-action", name: "Sports Action", category: "sports", description: "Dynamic, high-energy" },
];
