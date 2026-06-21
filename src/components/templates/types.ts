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
  // Base templates
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
  // Sports
  { id: "sports-action", name: "Sports Action", category: "sports", description: "High-energy, dark bg, neon accent" },
  { id: "sports-editorial", name: "Sports Editorial", category: "sports", description: "Magazine-style, white, serif" },
  // Engagement
  { id: "engagement-blush", name: "Romantic Blush", category: "engagement", description: "Soft pink, script font, dreamy" },
  { id: "engagement-elegant", name: "Elegant Proposal", category: "engagement", description: "Cream, serif, luxury" },
  // Family
  { id: "family-warm", name: "Warm Gathering", category: "family", description: "Earth tones, playful, scrapbook" },
  { id: "family-modern", name: "Modern Family", category: "family", description: "Clean white, geometric, cheerful" },
  // Corporate
  { id: "corporate-suite", name: "Executive Suite", category: "corporate", description: "Dark navy, silver, authority" },
  { id: "corporate-pro", name: "Conference Pro", category: "corporate", description: "Light gray, blue, professional" },
  // Thanksgiving & Christmas
  { id: "holiday-hearth", name: "Holiday Hearth", category: "holiday-season", description: "Cranberry, gold, festive" },
  { id: "golden-feast", name: "Golden Feast", category: "holiday-season", description: "Cream, amber, autumn harvest" },
  // Holiday (General)
  { id: "holiday-festive", name: "Festive Pop", category: "holiday", description: "Bright, colorful, confetti" },
  { id: "holiday-elegant", name: "Elegant Celebration", category: "holiday", description: "Champagne, gold sparkle" },
  // Winter
  { id: "winter-frozen", name: "Frozen Elegance", category: "winter", description: "Cool blue, frosted glass" },
  { id: "winter-cozy", name: "Cozy Winter", category: "winter", description: "Warm dark, amber, cabin feel" },
  // Summer
  { id: "summer-beach", name: "Beach Vibes", category: "summer", description: "Sandy, turquoise, waves" },
  { id: "summer-golden", name: "Golden Hour", category: "summer", description: "Sunset gradient, warm glow" },
  // Spring
  { id: "spring-blossom", name: "Blossom", category: "spring", description: "Soft pink, rose, delicate" },
  { id: "spring-fresh", name: "Fresh Growth", category: "spring", description: "Light green, emerald, vibrant" },
  // Fall
  { id: "fall-warmth", name: "Autumn Warmth", category: "fall", description: "Deep amber, cream, warm serif" },
  { id: "fall-palette", name: "Fall Palette", category: "fall", description: "Cream, autumn gradient strip" },
  // Portraits
  { id: "portrait-studio", name: "Studio Light", category: "portraits", description: "White, dramatic shadows, centered" },
  { id: "portrait-headshot", name: "Headshot Pro", category: "portraits", description: "Gray, 2-col, pricing packages" },
  // Street Photography
  { id: "street-gritty", name: "Gritty Urban", category: "street", description: "Dark, B&W, film grain" },
  { id: "street-neon", name: "Neon Nights", category: "street", description: "Black, neon cyan/pink, cyberpunk" },
];
