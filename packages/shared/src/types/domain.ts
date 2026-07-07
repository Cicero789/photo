// Domain enums and union types — shared by frontend and backend

export const ROLES = ['viewer', 'staff', 'page_admin', 'platform_owner'] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LEVELS: Record<Role, number> = {
  viewer: 1,
  staff: 2,
  page_admin: 3,
  platform_owner: 4,
};

export const EVENT_CATEGORIES = [
  'wedding',
  'birthday',
  'graduation',
  'vacation',
  'holiday',
  'sports',
  'concert',
  'conference',
  'family',
  'other',
] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export const VISIBILITY_LEVELS = ['private', 'gate', 'public'] as const;
export type Visibility = (typeof VISIBILITY_LEVELS)[number];

export const INDUSTRIES = [
  'photography',
  'teaching',
  'coaching',
  'medical',
  'legal',
  'beauty',
  'fitness',
  'creative',
  'marketing',
  'influencer',
  'real-estate',
  'home-services',
  'restaurant',
  'retail',
  'events',
  'childcare',
  'pet',
  'travel',
  'tech',
  'offices',
  'specialty',
] as const;
export type Industry = (typeof INDUSTRIES)[number];

export const PHOTOGRAPHER_STATUSES = ['pending', 'approved', 'rejected'] as const;
export type PhotographerStatus = (typeof PHOTOGRAPHER_STATUSES)[number];

export const ORDER_STATUSES = ['pending', 'paid', 'fulfilled', 'refunded', 'failed'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const CONNECTION_TYPES = ['family', 'friend'] as const;
export type ConnectionType = (typeof CONNECTION_TYPES)[number];

export const CONNECTION_STATUSES = ['pending', 'accepted', 'rejected'] as const;
export type ConnectionStatus = (typeof CONNECTION_STATUSES)[number];

export const ACCOUNT_TYPES = ['personal', 'pro'] as const;
export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const SUBSCRIPTION_STATUSES = ['none', 'active', 'past_due', 'canceled'] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export const PAYMENT_MODELS = ['prepaid', 'unlock'] as const;
export type PaymentModel = (typeof PAYMENT_MODELS)[number];

export const BOOKING_STATUSES = ['pending', 'approved', 'rejected', 'completed'] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
