import { beforeEach, describe, expect, it, vi } from "vitest";
import { requestSchema } from "../shared/studio";
import { onRequestPost } from "../functions/api/studio/requests";
import { onRequestPut } from "../functions/api/studio/index";
import { requireAuth } from "../functions/lib/auth";
import { verifyPassword } from "../functions/lib/password";
vi.mock("../functions/lib/auth", async importOriginal => ({ ...await importOriginal<object>(), requireAuth: vi.fn() }));
vi.mock("../functions/lib/password", () => ({ verifyPassword: vi.fn() }));
vi.mock("../functions/lib/rate-limit", () => ({ checkRateLimit: vi.fn(async () => ({ allowed: true })), getClientIP: () => "test" }));
const selection = { kind: "selection", name: "Test Customer", email: "test@example.com", token: "test-token", items: [{ key: "albums/test/photo.jpg", product: "5 × 7 print", quantity: 1 }] };
function database(album: unknown, photos: unknown[] = []) {
  const run = vi.fn(async () => ({ success: true }));
  const prepare = vi.fn((sql: string) => ({ bind: vi.fn(() => ({ first: async () => album, all: async () => ({ results: photos }), run })), all: async () => ({ results: [] }), first: async () => null }));
  return { db: { prepare } as unknown as D1Database, run, prepare };
}
function request(body: unknown) { return new Request("https://example.com/api/studio/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); }
beforeEach(() => vi.clearAllMocks());
describe("Studio customer selection security", () => {
  it("rejects an invalid or missing gallery key", async () => { const d = database(null); expect((await onRequestPost({ request: request(selection), env: { DB: d.db } })).status).toBe(403); expect(d.run).not.toHaveBeenCalled(); });
  it("rejects expired galleries", async () => { const d = database({ id: "a", expires_at: "2000-01-01" }); expect((await onRequestPost({ request: request(selection), env: { DB: d.db } })).status).toBe(403); expect(d.run).not.toHaveBeenCalled(); });
  it("rejects a wrong gallery password", async () => { vi.mocked(verifyPassword).mockResolvedValue(false); const d = database({ id: "a", password: "hash" }); expect((await onRequestPost({ request: request(selection), env: { DB: d.db } })).status).toBe(403); expect(d.run).not.toHaveBeenCalled(); });
  it("rejects photos from another customer's album", async () => { const d = database({ id: "a", user_id: "owner" }, [{ storage_key: "another-photo", filename: "private.jpg" }]); expect((await onRequestPost({ request: request(selection), env: { DB: d.db } })).status).toBe(400); expect(d.run).not.toHaveBeenCalled(); });
  it("persists valid selections with album ownership", async () => { const d = database({ id: "a", user_id: "owner" }, [{ storage_key: selection.items[0].key, filename: "family.jpg" }]); expect((await onRequestPost({ request: request(selection), env: { DB: d.db } })).status).toBe(201); expect(d.run).toHaveBeenCalledOnce(); const stmt = d.prepare.mock.results.at(-1)?.value; expect(stmt.bind).toHaveBeenCalledWith(expect.any(String), "selection", "Test Customer", "test@example.com", "", "a", "owner", expect.stringContaining("family.jpg")); });
  it("rejects unsupported products, zero quantities, and empty selections", () => { for (const items of [[], [{ ...selection.items[0], product: "arbitrary product" }], [{ ...selection.items[0], quantity: 0 }]]) expect(requestSchema.safeParse({ ...selection, items }).success).toBe(false); });
});
describe("Studio editing permissions", () => {
  it("requires authentication", async () => { vi.mocked(requireAuth).mockResolvedValue(new Response("Denied", { status: 401 })); const d = database(null); expect((await onRequestPut({ request: request({}), env: { DB: d.db } })).status).toBe(401); expect(d.prepare).not.toHaveBeenCalled(); });
  it("prevents another page admin from editing the studio", async () => { vi.mocked(requireAuth).mockResolvedValue({ userId: "other", spaceId: "other", role: "page_admin", jti: "test" }); const d = database(null); expect((await onRequestPut({ request: request({}), env: { DB: d.db } })).status).toBe(403); expect(d.prepare).not.toHaveBeenCalled(); });
});
