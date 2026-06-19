/** Reviews API — GET (list for photographer) + POST (submit review) */
import { json } from "../../../lib/response";
import { requireAuth } from "../../../lib/auth";

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database }; params: { slug: string } }): Promise<Response> {
  const { slug } = context.params;
  const photographer = await context.env.DB!.prepare("SELECT id FROM photographers WHERE slug = ? AND status = 'approved'").bind(slug).first() as any;
  if (!photographer) return json({ error: "Not found" }, 404);

  const result = await context.env.DB!.prepare(
    "SELECT r.id, r.rating, r.comment, r.created_at, u.name as reviewer_name FROM reviews r JOIN users u ON r.reviewer_id = u.id WHERE r.photographer_id = ? ORDER BY r.created_at DESC LIMIT 50"
  ).bind(photographer.id).all();

  const reviews = (result.results || []).map((r: any) => ({
    id: r.id, rating: r.rating, comment: r.comment, reviewerName: r.reviewer_name, createdAt: r.created_at,
  }));

  // Aggregate stats
  const stats = await context.env.DB!.prepare(
    "SELECT COUNT(*) as count, AVG(rating) as avg FROM reviews WHERE photographer_id = ?"
  ).bind(photographer.id).first() as any;

  return json({ reviews, stats: { count: stats?.count || 0, average: Math.round((stats?.avg || 0) * 10) / 10 } });
}

export async function onRequestPost(context: { request: Request; env: { DB?: D1Database }; params: { slug: string } }): Promise<Response> {
  const a = await requireAuth(context.request, context.env);
  if (a instanceof Response) return a;

  const { slug } = context.params;
  const photographer = await context.env.DB!.prepare("SELECT id FROM photographers WHERE slug = ? AND status = 'approved'").bind(slug).first() as any;
  if (!photographer) return json({ error: "Not found" }, 404);

  const body = await context.request.json() as { rating: number; comment?: string };
  if (!body.rating || body.rating < 1 || body.rating > 5) return json({ error: "Rating must be 1-5" }, 400);

  // Check for existing review
  // NOTE: race condition — the SELECT + INSERT is not atomic. A UNIQUE(photographer_id, reviewer_id)
  // constraint on the reviews table would be the proper DB-level guard against duplicate reviews.
  const existing = await context.env.DB!.prepare("SELECT id FROM reviews WHERE photographer_id = ? AND reviewer_id = ?").bind(photographer.id, a.userId).first();
  if (existing) return json({ error: "You already reviewed this photographer" }, 409);

  // Require proof of interaction (paid order or booking inquiry)
  const hasRelationship = await context.env.DB!.prepare(
    "SELECT 1 FROM orders WHERE photographer_id = ? AND buyer_user_id = ? AND status = 'paid' UNION SELECT 1 FROM booking_inquiries WHERE photographer_id = ? AND client_user_id = ?"
  ).bind(photographer.id, a.userId, photographer.id, a.userId).first();
  if (!hasRelationship) return json({ error: "You must have booked or purchased from this photographer to leave a review" }, 403);

  const id = crypto.randomUUID();
  await context.env.DB!.prepare(
    "INSERT INTO reviews (id, photographer_id, reviewer_id, rating, comment, created_at) VALUES (?,?,?,?,?,datetime('now'))"
  ).bind(id, photographer.id, a.userId, Math.round(body.rating), body.comment || "").run();

  return json({ id }, 201);
}
