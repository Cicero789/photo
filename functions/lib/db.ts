function getDB(env: { DB?: D1Database }): D1Database { if (!env.DB) throw new Error("D1 binding not found"); return env.DB; }

export async function createUser(env: { DB?: D1Database }, user: Record<string, unknown>): Promise<unknown> {
  const db = getDB(env);
  await db.prepare("INSERT INTO users (id, email, name, password_hash, role, space_id, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(user.id, user.email, user.name, user.password_hash, user.role, user.space_id, user.avatar_url ?? null).run();
  return { ...user, created_at: new Date().toISOString() };
}
export async function getUserByEmail(env: { DB?: D1Database }, email: string): Promise<unknown | null> {
  return (await getDB(env).prepare("SELECT * FROM users WHERE email = ?").bind(email).first()) ?? null;
}
export async function getUserById(env: { DB?: D1Database }, id: string): Promise<unknown | null> {
  return (await getDB(env).prepare("SELECT * FROM users WHERE id = ?").bind(id).first()) ?? null;
}
export async function createSpace(env: { DB?: D1Database }, space: Record<string, unknown>): Promise<unknown> {
  const db = getDB(env); const now = new Date().toISOString();
  await db.prepare("INSERT INTO spaces (id, name, slug, password_hash, custom_domain, logo_url, theme_color, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(space.id, space.name, space.slug, space.password_hash, space.custom_domain ?? null, space.logo_url ?? null, space.theme_color, space.owner_id).run();
  return { ...space, created_at: now, updated_at: now };
}
export async function getSpaceBySlug(env: { DB?: D1Database }, slug: string): Promise<unknown | null> {
  return (await getDB(env).prepare("SELECT * FROM spaces WHERE slug = ?").bind(slug).first()) ?? null;
}
export async function getSpaceById(env: { DB?: D1Database }, id: string): Promise<unknown | null> {
  return (await getDB(env).prepare("SELECT * FROM spaces WHERE id = ?").bind(id).first()) ?? null;
}
export async function addSpaceMember(env: { DB?: D1Database }, member: { id: string; space_id: string; user_id: string; role: string }): Promise<void> {
  await getDB(env).prepare("INSERT INTO space_members (id, space_id, user_id, role) VALUES (?, ?, ?, ?)").bind(member.id, member.space_id, member.user_id, member.role).run();
}
