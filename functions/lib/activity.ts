/** Log an activity event for a user (best-effort, non-blocking). */
export function logActivity(db: D1Database, userId: string, type: string, message: string, link?: string): void {
  db.prepare("INSERT INTO activity_log (id, user_id, type, message, link, read, created_at) VALUES (?,?,?,?,?,0,?)")
    .bind(crypto.randomUUID(), userId, type, message, link || null, new Date().toISOString())
    .run().catch((err) => { console.error("Activity log error:", err); }); // fire-and-forget — never block the main response
}
