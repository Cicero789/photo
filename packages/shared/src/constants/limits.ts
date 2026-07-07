// Rate limits, file size limits, and other constraints

export const MAX_PHOTO_BYTES = 50 * 1024 * 1024; // 50MB
export const MAX_VIDEO_BYTES = 95 * 1024 * 1024; // 95MB
export const MAX_ALBUM_PHOTO_BYTES = 15 * 1024 * 1024; // 15MB
export const MAX_ALBUM_PHOTO_COUNT = 20;
export const MAX_PORTFOLIO_PHOTO_BYTES = 50 * 1024 * 1024; // 50MB
export const MAX_CLIENT_PHOTO_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_PHOTOS_PER_EVENT = 500;

// Validation limits
export const MAX_NAME = 100;
export const MAX_EMAIL = 254;
export const MAX_TITLE = 200;
export const MAX_DESCRIPTION = 5000;
export const MAX_MESSAGE = 2000;
export const MAX_URL = 2048;
export const MAX_BIO = 2000;
export const MAX_SERVICE_AREA = 500;
export const MAX_SLUG = 100;
export const MIN_PASSWORD = 8;
export const MAX_PASSWORD = 128;

// Rate limits (per IP)
export const RATE_LIMIT_PER_MINUTE = 10;
export const RATE_LIMIT_PER_HOUR = 30;

// Auth
export const JWT_EXPIRY_SECONDS = 24 * 60 * 60; // 24 hours
export const PASSWORD_RESET_EXPIRY_MINUTES = 60;
export const MAGIC_LINK_EXPIRY_DAYS = 7;
export const SIGNED_URL_EXPIRY_SECONDS = 3600; // 1 hour

// Inspiration map
export const MAX_INSPIRATION_ITEMS = 100;
export const MAX_INSPIRATION_PER_PAGE = 100;

// Feed
export const MAX_FEED_ITEMS = 50;

// Notifications
export const MAX_NOTIFICATIONS = 30;

// Photos list
export const MAX_PHOTOS_PER_QUERY = 500;
