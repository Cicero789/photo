import { describe, it, expect } from "vitest";

// Test utility functions that don't need D1
describe("API validation patterns", () => {
  it("validates email format", () => {
    const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    expect(isEmail("test@example.com")).toBe(true);
    expect(isEmail("user@domain.co")).toBe(true);
    expect(isEmail("not-an-email")).toBe(false);
    expect(isEmail("@missing.com")).toBe(false);
    expect(isEmail("no@")).toBe(false);
  });

  it("validates slug format", () => {
    const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").slice(0, 60);
    expect(toSlug("Jane Doe Photography")).toBe("jane-doe-photography");
    expect(toSlug("café-123")).toBe("caf-123");
    expect(toSlug("UPPER CASE")).toBe("upper-case");
    expect(toSlug("a".repeat(100)).length).toBeLessThanOrEqual(60);
  });

  it("validates rating range", () => {
    const isValidRating = (r: number) => Number.isInteger(r) && r >= 1 && r <= 5;
    expect(isValidRating(1)).toBe(true);
    expect(isValidRating(5)).toBe(true);
    expect(isValidRating(3)).toBe(true);
    expect(isValidRating(0)).toBe(false);
    expect(isValidRating(6)).toBe(false);
    expect(isValidRating(3.5)).toBe(false);
  });

  it("generates share tokens with correct charset", () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    const generateToken = (len = 8) => {
      let s = "";
      const arr = new Uint8Array(len);
      crypto.getRandomValues(arr);
      for (const b of arr) s += chars[b % chars.length];
      return s;
    };
    const token = generateToken();
    expect(token.length).toBe(8);
    // No ambiguous chars (0, O, 1, l, I)
    expect(token).not.toMatch(/[0OlI1]/);
  });

  it("parses coordinates correctly", () => {
    const isValidCoord = (lat: number, lng: number) =>
      typeof lat === "number" && typeof lng === "number" &&
      lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    expect(isValidCoord(37.8279, -122.4821)).toBe(true); // Golden Gate
    expect(isValidCoord(-33.8568, 151.2153)).toBe(true); // Sydney
    expect(isValidCoord(0, 0)).toBe(true); // Null Island
    expect(isValidCoord(91, 0)).toBe(false);
    expect(isValidCoord(0, 181)).toBe(false);
  });

  it("sanitizes photo categories", () => {
    const CATEGORIES = ["general","wedding","nature","urban","golden_hour","night","portrait","event"];
    const sanitize = (c: string) => CATEGORIES.includes(c) ? c : "general";
    expect(sanitize("wedding")).toBe("wedding");
    expect(sanitize("invalid")).toBe("general");
    expect(sanitize("")).toBe("general");
  });
});
