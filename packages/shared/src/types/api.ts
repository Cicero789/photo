// API request/response DTOs — camelCase (JSON convention)
// These are what the frontend receives and the backend serializes

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  spaceId: string;
  avatarUrl: string | null;
  accountType: string;
  createdAt: string;
}

export interface SpaceResponse {
  id: string;
  name: string;
  slug: string;
  customDomain: string | null;
  logoUrl: string | null;
  themeColor: string;
  ownerId: string;
  createdAt: string;
  heroEnabled: boolean;
  heroSource: string;
  heroStyle: string;
}

export interface EventResponse {
  id: string;
  spaceId: string;
  title: string;
  category: string;
  eventDate: string;
  description: string;
  aiSummary: string | null;
  coverPhotoId: string | null;
  coverPhotoUrl: string | null;
  photoCount: number;
  createdAt: string;
  updatedAt: string;
  address: string;
  addressLocked: boolean;
  latitude: number | null;
  longitude: number | null;
  visibility: string;
}

export interface PhotoResponse {
  id: string;
  eventId: string;
  spaceId: string;
  originalFilename: string;
  storageKey: string;
  url: string;
  thumbnailUrl: string | null;
  width: number;
  height: number;
  fileSize: number;
  latitude: number | null;
  longitude: number | null;
  takenAt: string | null;
  uploadedBy: string;
  favorite: boolean;
  license: string;
  createdAt: string;
}

export interface VideoResponse {
  id: string;
  eventId: string;
  spaceId: string;
  originalFilename: string;
  storageKey: string;
  url: string;
  thumbnailUrl: string | null;
  duration: number;
  fileSize: number;
  uploadedBy: string;
  createdAt: string;
}

export interface AlbumResponse {
  id: string;
  userId: string;
  name: string;
  shareToken: string;
  hasPassword: boolean;
  allowDownloads: boolean;
  expiresAt: string | null;
  viewCount: number;
  photoCount: number;
  createdAt: string;
}

export interface ProfessionalResponse {
  id: string;
  name: string;
  email: string;
  website: string | null;
  serviceArea: string | null;
  bio: string | null;
  status: string;
  slug: string | null;
  specialties: string[];
  tagline: string;
  verified: boolean;
  verifiedAt: string | null;
  featured: boolean;
  profileViews: number;
  heroPhotos: string[];
  stripeConfig: Record<string, unknown>;
  pricingConfig: Record<string, unknown>;
  templateConfig: Record<string, unknown>;
  subscriptionStatus: string;
  createdAt: string;
}

export interface PortfolioPhotoResponse {
  id: string;
  professionalId: string;
  storageKey: string;
  url: string;
  filename: string;
  sortOrder: number;
  createdAt: string;
}

export interface ReviewResponse {
  id: string;
  professionalId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewStats {
  count: number;
  average: number;
}

export interface BookingInquiryResponse {
  id: string;
  professionalId: string | null;
  clientUserId: string;
  message: string;
  eventTitle: string;
  locationName: string;
  status: string;
  createdAt: string;
}

export interface ClientSiteResponse {
  id: string;
  professionalId: string;
  name: string;
  slug: string;
  industryId: string | null;
  customDomain: string | null;
  content: Record<string, unknown>;
  templateConfig: Record<string, unknown>;
  setupFeeCents: number;
  monthlyFeeCents: number;
  published: boolean;
  blogCount: number;
  galleryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostResponse {
  id: string;
  clientSiteId: string;
  title: string;
  slug: string;
  body: string;
  featuredImage: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientGalleryResponse {
  id: string;
  clientSiteId: string;
  name: string;
  photoCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface InspirationResponse {
  id: string;
  userId: string;
  userName: string;
  photoUrl: string | null;
  thumbnailUrl: string | null;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  season: string;
  tips: string;
  bestTime: string;
  permissionInfo: string;
  loveCount: number;
  source: string;
  score: number;
  author: string;
  licenseUrl: string;
  createdAt: string;
}

export interface ConnectionResponse {
  id: string;
  fromUser: string;
  toEmail: string;
  toUser: string | null;
  connectionType: string;
  status: string;
  message: string;
  createdAt: string;
}

export interface ActivityLogResponse {
  id: string;
  userId: string;
  type: string;
  message: string;
  link: string | null;
  read: boolean;
  createdAt: string;
}

export interface OrderResponse {
  id: string;
  buyerUserId: string;
  professionalId: string;
  photoId: string | null;
  eventId: string | null;
  product: string;
  amountCents: number;
  stripeId: string | null;
  status: string;
  createdAt: string;
}

export interface AdTileResponse {
  id: string;
  imageUrl: string | null;
  linkUrl: string | null;
  message: string | null;
  position: number;
  active: boolean;
  createdAt: string;
}

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'down';
  modules: Record<string, { status: string; message?: string }>;
  timestamp: string;
}

export interface AdminStatsResponse {
  users: number;
  spaces: number;
  events: number;
  photos: number;
  photosBytes: number;
  videos: number;
  albums: number;
  professionals: { total: number; pending: number; verified: number };
  orders: { total: number; revenue: number };
  pins: number;
  inquiries: number;
}

// Pagination
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}
