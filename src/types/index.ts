// ─── User Roles ───
export type Role = "platform_owner" | "page_admin" | "staff" | "viewer";

// ─── User ───
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  spaceId: string; // which space they belong to
  avatarUrl?: string;
  createdAt: string;
}

// ─── Space (a family or business site) ───
export interface Space {
  id: string;
  name: string;
  slug: string; // unique URL slug, e.g. "johnson-family"
  passwordHash: string; // "gate key" for viewers
  customDomain?: string;
  logoUrl?: string;
  themeColor?: string;
  ownerId: string; // the page_admin who created it
  createdAt: string;
  updatedAt: string;
}

// ─── Event ───
export type EventCategory =
  | "holiday"
  | "birthday"
  | "graduation"
  | "wedding"
  | "celebration"
  | "sports"
  | "school"
  | "travel"
  | "vacation"
  | "work"
  | "restaurant"
  | "party"
  | "family"
  | "kids"
  | "parents"
  | "other";

export interface EventItem {
  id: string;
  spaceId: string;
  title: string;
  category: EventCategory;
  eventDate: string; // ISO date
  description: string;
  aiSummary?: string; // DeepSeek-generated
  coverPhotoId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Photo ───
export interface Photo {
  id: string;
  eventId: string;
  spaceId: string;
  originalFilename: string;
  storageKey: string; // R2 key
  url: string; // /api/media/photos/<storageKey>
  thumbnailKey?: string;
  width: number;
  height: number;
  fileSize: number; // bytes (compressed)
  latitude?: number;
  longitude?: number;
  takenAt?: string; // EXIF date
  uploadedBy: string;
  createdAt: string;
}

// ─── Video ───
export interface Video {
  id: string;
  eventId: string;
  spaceId: string;
  originalFilename: string;
  storageKey: string; // R2 key
  url: string; // /api/media/videos/<storageKey>
  thumbnailKey?: string;
  duration: number; // seconds
  fileSize: number; // bytes (compressed)
  uploadedBy: string;
  createdAt: string;
}

// ─── Ad Tile (platform owner's messages) ───
export interface AdTile {
  id: string;
  imageUrl?: string;
  linkUrl?: string;
  message?: string;
  position: number; // which 9th slot this fills
  active: boolean;
  createdAt: string;
}

// ─── Photographer ───
export interface Photographer {
  id: string;
  name: string;
  email: string;
  website?: string;
  portfolioUrl?: string;
  serviceArea?: string;
  bio?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
