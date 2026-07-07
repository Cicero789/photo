import { ROLE_LEVELS, type Role } from '../types/domain.js';

export { ROLE_LEVELS };
export type { Role };

// Permission matrix: which roles can perform which actions
export const PERMISSIONS = {
  // Space management
  'space:manage': ['page_admin', 'platform_owner'] satisfies Role[],
  'space:members': ['page_admin', 'platform_owner'] satisfies Role[],

  // Event management
  'event:create': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],
  'event:edit': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],
  'event:delete': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],

  // Photo management
  'photo:upload': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],
  'photo:delete': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],

  // Album management
  'album:create': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],
  'album:delete': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],

  // Client site management
  'client:manage': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],

  // Professional management
  'professional:manage': ['page_admin', 'platform_owner'] satisfies Role[],

  // Inspiration
  'inspiration:create': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],
  'inspiration:love': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],

  // Admin — platform_owner only
  'admin:access': ['platform_owner'] satisfies Role[],

  // Connections
  'connection:manage': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],

  // Messages
  'message:create': ['staff', 'page_admin', 'platform_owner'] satisfies Role[],
} as const;

export type Permission = keyof typeof PERMISSIONS;

export function hasPermission(role: Role, permission: Permission): boolean {
  const allowed = PERMISSIONS[permission] as readonly Role[];
  return allowed.includes(role);
}

export function requireMinimumRole(userRole: Role, minimumRole: Role): boolean {
  return ROLE_LEVELS[userRole] >= ROLE_LEVELS[minimumRole];
}
