import type { UserRow } from '@framenest/shared';
import type { UserResponse } from '@framenest/shared';

export function serializeUser(row: UserRow): UserResponse {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    spaceId: row.space_id,
    avatarUrl: row.avatar_url ?? null,
    accountType: row.account_type,
    createdAt: row.created_at,
  };
}
