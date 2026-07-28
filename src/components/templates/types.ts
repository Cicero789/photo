export interface TemplateProps {
  name: string; tagline: string; specialties: string[]; bio: string; website: string;
  serviceArea: string; verified: boolean; pricing: any; portfolio: any[];
  onHire: () => void; onPhotoClick: (i: number) => void;
  colorScheme?: any; fontPairing?: any;
}
export interface TemplateInfo { id: string; name: string; category: string; description: string; }
export const TEMPLATE_REGISTRY: TemplateInfo[] = [];
