// Database row types — mirrors the canonical schema.sql
// snake_case column names match the database exactly

export interface UserRow {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  role: string;
  space_id: string;
  avatar_url: string | null;
  account_type: string;
  token_version: number;
  created_at: string;
}

export interface PasswordResetRow {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

export interface SpaceRow {
  id: string;
  name: string;
  slug: string;
  password_hash: string;
  custom_domain: string | null;
  logo_url: string | null;
  theme_color: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  hero_enabled: number;
  hero_source: string;
  hero_style: string;
}

export interface SpaceMemberRow {
  id: string;
  space_id: string;
  user_id: string;
  role: string;
}

export interface EventRow {
  id: string;
  space_id: string;
  title: string;
  category: string;
  event_date: string;
  description: string;
  ai_summary: string | null;
  cover_photo_id: string | null;
  created_at: string;
  updated_at: string;
  address: string;
  address_locked: number;
  latitude: number | null;
  longitude: number | null;
  payment_model: string;
  visibility: string;
  deleted_at: string | null;
}

export interface PhotoRow {
  id: string;
  event_id: string;
  space_id: string;
  original_filename: string;
  storage_key: string;
  thumbnail_key: string | null;
  width: number;
  height: number;
  file_size: number;
  latitude: number | null;
  longitude: number | null;
  taken_at: string | null;
  uploaded_by: string;
  created_at: string;
  favorite: number;
  license: string;
  deleted_at: string | null;
}

export interface VideoRow {
  id: string;
  event_id: string;
  space_id: string;
  original_filename: string;
  storage_key: string;
  thumbnail_key: string | null;
  duration: number;
  file_size: number;
  uploaded_by: string;
  stream_id: string | null;
  created_at: string;
  deleted_at: string | null;
}

export interface EventMessageRow {
  id: string;
  event_id: string;
  user_id: string;
  message: string;
  created_at: string;
}

// Renamed from photographers → professionals
export interface ProfessionalRow {
  id: string;
  name: string;
  email: string;
  website: string | null;
  portfolio_url: string | null;
  service_area: string | null;
  bio: string | null;
  status: string;
  hero_photos: string;
  stripe_config: string;
  pricing_config: string;
  template_config: string; // was gallery_config
  slug: string | null;
  specialties: string;
  tagline: string;
  verified: number;
  verified_at: string | null;
  subscription_id: string | null;
  subscription_status: string;
  profile_views: number;
  featured: number;
  created_at: string;
}

export interface ProfessionalPortfolioRow {
  id: string;
  professional_id: string; // was photographer_id
  storage_key: string;
  filename: string;
  sort_order: number;
  created_at: string;
}

export interface ReviewRow {
  id: string;
  professional_id: string; // was photographer_id
  reviewer_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface BookingInquiryRow {
  id: string;
  professional_id: string | null; // was photographer_id
  client_user_id: string;
  message: string;
  event_title: string;
  location_name: string;
  status: string;
  created_at: string;
}

export interface AlbumRow {
  id: string;
  user_id: string;
  name: string;
  share_token: string;
  password: string | null;
  allow_downloads: number; // was downloads
  expires_at: string | null;
  view_count: number;
  created_at: string;
  deleted_at: string | null;
}

export interface AlbumPhotoRow {
  album_id: string;
  storage_key: string;
  filename: string;
  sort_order: number;
  created_at: string;
}

export interface InspirationRow {
  id: string;
  user_id: string;
  photo_url: string | null;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
  season: string;
  tips: string;
  best_time: string;
  permission_info: string;
  love_count: number; // was loves
  source: string;
  score: number;
  author: string;
  license_url: string;
  thumbnail_url: string;
  created_at: string;
}

export interface InspirationLoveRow {
  inspiration_id: string;
  user_id: string;
}

export interface ConnectionRow {
  id: string;
  from_user: string;
  to_email: string;
  to_user: string | null;
  connection_type: string;
  status: string;
  message: string;
  magic_token: string | null;
  created_at: string;
}

export interface ActivityLogRow {
  id: string;
  user_id: string;
  type: string;
  message: string;
  link: string | null;
  read: number;
  created_at: string;
}

export interface OrderRow {
  id: string;
  buyer_user_id: string;
  professional_id: string; // was photographer_id
  photo_id: string | null;
  event_id: string | null;
  product: string;
  amount_cents: number;
  stripe_id: string | null;
  status: string;
  created_at: string;
}

export interface AdTileRow {
  id: string;
  image_url: string | null;
  link_url: string | null;
  message: string | null;
  position: number;
  active: number;
  created_at: string;
}

export interface RateLimitRow {
  key: string;
  count: number;
  window_start: number;
  updated_at: string;
}

export interface ClientSiteRow {
  id: string;
  professional_id: string; // was photographer_id
  name: string;
  slug: string;
  industry_id: string | null;
  custom_domain: string | null;
  content: string;
  template_config: string; // was gallery_config
  setup_fee_cents: number;
  monthly_fee_cents: number;
  published: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface BlogPostRow {
  id: string;
  client_site_id: string;
  title: string;
  slug: string;
  body: string;
  featured_image: string | null;
  published: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ClientGalleryRow {
  id: string;
  client_site_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ClientGalleryPhotoRow {
  id: string;
  gallery_id: string;
  storage_key: string;
  filename: string;
  width: number;
  height: number;
  file_size: number;
  sort_order: number;
  created_at: string;
  deleted_at: string | null;
}

export interface MigrationRow {
  id: number;
  name: string;
  applied_at: string;
}
