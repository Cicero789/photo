// Template system types — data-driven, not code-driven

export type SectionType = 'hero' | 'about' | 'gallery' | 'services' | 'pricing' | 'testimonials' | 'contact' | 'blog' | 'cta';

export interface SectionDefinition {
  type: SectionType;
  config: Record<string, unknown>;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface FontPairing {
  heading: string;
  body: string;
}

export interface LayoutConfig {
  maxWidth: 'narrow' | 'medium' | 'wide' | 'full';
  headerStyle: 'centered' | 'split' | 'minimal';
  navStyle: 'top' | 'sticky' | 'hidden';
}

export interface TemplateDefinition {
  id: string;
  name: string;
  industry: string;
  professionTypes: string[];
  sections: SectionDefinition[];
  colors: ColorScheme;
  fonts: FontPairing;
  layout: LayoutConfig;
}

export interface TemplateProps {
  name: string;
  tagline: string;
  specialties: string[];
  bio: string;
  website: string | null;
  serviceArea: string | null;
  verified: boolean;
  pricing: Record<string, unknown> | null;
  portfolio: Array<{ storageKey: string; url: string; filename: string }>;
  heroPhotos?: string[];
  colorScheme?: keyof typeof import('../constants/index.js');
  fontPairing?: string;
  onHire?: () => void;
  onPhotoClick?: (index: number) => void;
}
