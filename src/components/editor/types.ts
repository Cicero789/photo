// Block-based content system — types shared by editor and renderer

export type BlockType = "hero" | "text" | "image" | "gallery" | "button" | "divider" | "columns" | "services" | "pricing";

export interface ContentBlock {
  id: string;
  type: BlockType;
  data: Record<string, unknown>;
}

// Hero block
export interface HeroBlock extends ContentBlock {
  type: "hero";
  data: { heading: string; subheading?: string; imageUrl?: string; overlay?: boolean };
}

// Text block (TipTap HTML)
export interface TextBlock extends ContentBlock {
  type: "text";
  data: { html: string };
}

// Image block
export interface ImageBlock extends ContentBlock {
  type: "image";
  data: { url: string; alt?: string; caption?: string; fullWidth?: boolean };
}

// Gallery block — references a client_gallery by ID
export interface GalleryBlock extends ContentBlock {
  type: "gallery";
  data: { galleryId: string; layout?: "grid" | "carousel"; columns?: number };
}

// Button/CTA block
export interface ButtonBlock extends ContentBlock {
  type: "button";
  data: { label: string; url: string; style?: "primary" | "secondary" | "outline" };
}

// Services block
export interface ServicesBlock extends ContentBlock {
  type: "services";
  data: { items: Array<{ name: string; description?: string; price?: string }> };
}

// Pricing block
export interface PricingBlock extends ContentBlock {
  type: "pricing";
  data: { heading?: string; items: Array<{ name: string; price: string; features?: string[] }> };
}

// Divider block
export interface DividerBlock extends ContentBlock {
  type: "divider";
  data: Record<string, never>;
}

// Columns block (contains sub-blocks)
export interface ColumnsBlock extends ContentBlock {
  type: "columns";
  data: { columns: number; blocks: ContentBlock[][] };
}
