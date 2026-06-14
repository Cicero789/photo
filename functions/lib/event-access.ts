import { json } from "./response";

interface Actor { userId: string; spaceId: string; role: string }
interface EventAccess { id: string; space_id: string; visibility: string }

/** Returns event if actor can read it, or 404 Response. */
export async function requireReadableEvent(
  db: D1Database, eventId: string, actor: Actor | null,
): Promise<EventAccess | Response> {
  const event = await db.prepare("SELECT id, space_id, visibility FROM events WHERE id = ?").bind(eventId).first<EventAccess>();
  if (!event) return json({ error: "Event not found" }, 404);

  // Owner or platform_owner can always read
  if (actor && (event.space_id === actor.spaceId || actor.role === "platform_owner")) return event;
  // Public events are readable by anyone
  if (event.visibility === "public") return event;
  // Gate-token viewers can read gate events in their space
  if (actor && event.visibility === "gate" && event.space_id === actor.spaceId) return event;
  // Private: only owner
  return json({ error: "Event not found" }, 404);
}

/** Returns event if actor can modify it, or 403/404 Response. */
export async function requireManageableEvent(
  db: D1Database, eventId: string, actor: Actor,
): Promise<EventAccess | Response> {
  const event = await db.prepare("SELECT id, space_id, visibility FROM events WHERE id = ?").bind(eventId).first<EventAccess>();
  if (!event) return json({ error: "Event not found" }, 404);
  if (event.space_id !== actor.spaceId && actor.role !== "platform_owner") return json({ error: "Access denied" }, 403);
  return event;
}
