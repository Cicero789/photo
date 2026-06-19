import { describe, it, expect } from "vitest";
import { signMediaUrl, verifyMediaSignature } from "../functions/lib/signed-url";

const SECRET = "test-secret-key-for-signing";

describe("signMediaUrl", () => {
  it("generates a URL with expires and sig params", async () => {
    const url = await signMediaUrl("photos/abc.jpg", SECRET, 3600);
    expect(url).toContain("/api/media/photos/");
    expect(url).toContain("expires=");
    expect(url).toContain("sig=");
  });

  it("expires in the future", async () => {
    const url = await signMediaUrl("photos/abc.jpg", SECRET, 3600);
    const match = url.match(/expires=(\d+)/);
    expect(match).toBeTruthy();
    const expires = parseInt(match![1], 10);
    expect(expires).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });
});

describe("verifyMediaSignature", () => {
  it("verifies a valid signature", async () => {
    const url = await signMediaUrl("photos/test.jpg", SECRET, 3600);
    const params = new URLSearchParams(url.split("?")[1]);
    const valid = await verifyMediaSignature("photos/test.jpg", params.get("sig")!, params.get("expires")!, SECRET);
    expect(valid).toBe(true);
  });

  it("rejects a tampered signature", async () => {
    const url = await signMediaUrl("photos/test.jpg", SECRET, 3600);
    const params = new URLSearchParams(url.split("?")[1]);
    const valid = await verifyMediaSignature("photos/TAMPERED.jpg", params.get("sig")!, params.get("expires")!, SECRET);
    expect(valid).toBe(false);
  });

  it("rejects an expired URL", async () => {
    const valid = await verifyMediaSignature("photos/test.jpg", "abc123", "1000000000", SECRET);
    expect(valid).toBe(false);
  });

  it("rejects wrong secret", async () => {
    const url = await signMediaUrl("photos/test.jpg", SECRET, 3600);
    const params = new URLSearchParams(url.split("?")[1]);
    const valid = await verifyMediaSignature("photos/test.jpg", params.get("sig")!, params.get("expires")!, "wrong-secret");
    expect(valid).toBe(false);
  });
});
