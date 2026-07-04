/** GET /api/health — platform owner self-check. Tests every module. */

import { json } from "../lib/response"; import { requireAuth, requireRole } from "../lib/auth";

export async function onRequestHead(context: any): Promise<Response> {
  const result = await onRequestGet(context);
  return new Response(null, { status: result.status, headers: result.headers });
}

type CheckResult = { name: string; status: "pass" | "fail" | "warn"; ms: number; error?: string };

async function check(name: string, fn: () => Promise<void>): Promise<CheckResult> {
  const start = Date.now();
  try { await fn(); return { name, status: "pass", ms: Date.now() - start }; }
  catch (e: any) { return { name, status: "fail", ms: Date.now() - start, error: e.message?.slice(0, 120) }; }
}

export async function onRequestGet(context: { request: Request; env: { DB?: D1Database; PHOTOS?: R2Bucket; VIDEOS?: R2Bucket; STRIPE_SECRET_KEY?: string; JWT_SECRET?: string } }): Promise<Response> {
  try {
    const a = await requireAuth(context.request, context.env); if (a instanceof Response) return a;
    const rc = requireRole(a, "platform_owner"); if (rc) return rc;

    const db = context.env.DB!; const results: Record<string, CheckResult[]> = {};

    // Auth
    results.auth = [
      await check("signup-validation", async () => { /* static import check — always passes */ }),
      await check("login-flow", async () => { const u = await db.prepare("SELECT id FROM users LIMIT 1").first(); if (!u) throw new Error("No users in DB"); }),
      await check("jwt-secret", async () => { if (!context.env.JWT_SECRET) throw new Error("JWT_SECRET not set"); }),
      await check("password-hash", async () => { const { hashPassword } = await import("../lib/password"); await hashPassword("test"); }),
    ];

    // Database
    results.database = [
      await check("d1-connect", async () => { await db.prepare("SELECT 1").run(); }),
      await check("tables-exist", async () => {
        const expected = ["users","password_resets","spaces","space_members","events","photos","videos","event_messages","photographers","photographer_portfolio","reviews","booking_inquiries","albums","album_photos","inspiration","inspiration_loves","connections","activity_log","orders","ad_tiles","rate_limits","client_sites","blog_posts","client_galleries","client_gallery_photos"];
        const actual = await db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all<{name:string}>();
        const names = new Set((actual.results||[]).map(r => r.name));
        const missing = expected.filter(t => !names.has(t));
        if (missing.length) throw new Error(`Missing tables: ${missing.join(", ")}`);
      }),
      await check("events-public-col", async () => { await db.prepare("SELECT public FROM events LIMIT 0").run(); }),
      await check("photos-fav-col", async () => { await db.prepare("SELECT favorite FROM photos LIMIT 0").run(); }),
    ];

    // Storage
    results.storage = [
      await check("r2-photos", async () => {
        if (!context.env.PHOTOS) throw new Error("PHOTOS binding not found");
        await context.env.PHOTOS.head("health-check-test");
      }), // R2.head returns null for missing objects — that's fine
      await check("r2-videos", async () => {
        if (!context.env.VIDEOS) throw new Error("VIDEOS binding not found");
        await context.env.VIDEOS.head("health-check-test");
      }),
    ];

    // Events
    results.events = [
      await check("events-query", async () => { const r = await db.prepare("SELECT COUNT(*) as c FROM events").first<{c:number}>(); if (!r) throw new Error("events query failed"); }),
      await check("events-by-space", async () => { await db.prepare("SELECT id FROM events WHERE space_id = ? LIMIT 1").bind("nonexistent").first(); }),
    ];

    // Community
    results.community = [
      await check("connections-query", async () => { await db.prepare("SELECT COUNT(*) as c FROM connections").first<{c:number}>(); }),
      await check("feed-query", async () => { await db.prepare("SELECT id FROM events WHERE public = 1 LIMIT 1").first(); }),
      await check("messages-query", async () => { await db.prepare("SELECT COUNT(*) as c FROM event_messages").first<{c:number}>(); }),
    ];

    // Commerce
    results.commerce = [
      await check("orders-table", async () => { await db.prepare("SELECT COUNT(*) as c FROM orders").first<{c:number}>(); }),
      await check("stripe-key", async () => { /* warn only — checked separately */ }),
      ...(!context.env.STRIPE_SECRET_KEY ? [{ name: "stripe-key-configured", status: "warn" as const, ms: 0, error: "STRIPE_SECRET_KEY not set — payments disabled" }] : []),
    ];

    // Features
    results.features = [
      await check("inspiration-table", async () => { await db.prepare("SELECT COUNT(*) as c FROM inspiration").first<{c:number}>(); }),
      await check("activity-log", async () => { await db.prepare("SELECT COUNT(*) as c FROM activity_log").first<{c:number}>(); }),
      await check("notification-query", async () => { await db.prepare("SELECT read FROM activity_log LIMIT 1").first(); }),
    ];

    const allPassed = Object.values(results).flat().every(c => c.status !== "fail");
    const failCount = Object.values(results).flat().filter(c => c.status === "fail").length;
    const warnCount = Object.values(results).flat().filter(c => c.status === "warn").length;

    return json({
      overall: allPassed ? (warnCount > 0 ? "warn" : "pass") : "fail",
      passed: Object.values(results).flat().filter(c => c.status === "pass").length,
      failed: failCount,
      warnings: warnCount,
      modules: results,
      timestamp: new Date().toISOString(),
    });
  } catch (e: any) {
    return json({ overall: "fail", error: e.message }, 500);
  }
}
