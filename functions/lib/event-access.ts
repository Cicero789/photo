import { json } from "./response";

interface Actor { userId: string; spaceId: string; role: string }
interface EventAccess { id: string; space_id: string; visibility: string }

/** Gate token? (accessType not yet in JWT — detect by role+userId pattern for now) */
function isGateSession(a: Actor): boolean { return a.role === "viewer" && a.userId === "viewer"; }

/** Pure policy: can actor read this event? */
function canReadEvent(actor: Actor | null, event: EventAccess): boolean {
  if (event.visibility === "public") return true;
  if (!actor) return false;
  if (actor.role === "platform_owner") return true;
  if (actor.spaceId !== event.space_id) return false;
  if (event.visibility === "gate") return true; // any same-space actor can read gate
  // Private: only real users with staff+ role
  if (isGateSession(actor)) return false;
  const roleRank: Record<string,number> = { viewer:1, staff:2, page_admin:3, platform_owner:4 };
  return (roleRank[actor.role] || 0) >= 2; // staff+
}

/** Pure policy: can actor manage this event? */
function canManageEvent(actor: Actor, event: EventAccess): boolean {
  if (actor.role === "platform_owner") return true;
  if (isGateSession(actor)) return false;
  return actor.spaceId === event.space_id && (actor.role === "staff" || actor.role === "page_admin");
}

/** Returns event if readable, or 404 Response. */
export async function requireReadableEvent(
  db: D1Database, eventId: string, actor: Actor | null,
): Promise<EventAccess | Response> {
  const event = await db.prepare("SELECT id, space_id, visibility FROM events WHERE id = ?").bind(eventId).first<EventAccess>();
  if (!event || !canReadEvent(actor, event)) return json({ error: "Event not found" }, 404);
  return event;
}

/** Returns event if manageable, or 403/404 Response. */
export async function requireManageableEvent(
  db: D1Database, eventId: string, actor: Actor,
): Promise<EventAccess | Response> {
  const event = await db.prepare("SELECT id, space_id, visibility FROM events WHERE id = ?").bind(eventId).first<EventAccess>();
  if (!event || !canManageEvent(actor, event)) return json({ error: "Event not found or access denied" }, 404);
  return event;
}
