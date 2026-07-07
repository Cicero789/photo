/**
 * Parity guard: template registry ↔ lazy components ↔ thumbnail files.
 * Catches renamed/missing thumbnails and broken legacy-ID resolution
 * before they ship.
 */
import { describe, it, expect } from "vitest";
import { readdirSync } from "node:fs";
import { TEMPLATE_REGISTRY } from "../src/components/templates/types";
import {
  templateComponents,
  LEGACY_TEMPLATE_ALIASES,
  resolveTemplateId,
} from "../src/components/templates";

const thumbs = new Set(
  readdirSync("public/thumbnails")
    .filter((f) => f.endsWith(".jpg"))
    .map((f) => f.replace(/\.jpg$/, "")),
);

describe("template registry / thumbnail parity", () => {
  it("every registry entry has a lazy component", () => {
    for (const t of TEMPLATE_REGISTRY) {
      expect(templateComponents[t.id], `component for ${t.id}`).toBeDefined();
    }
  });

  it("every component key is in the registry", () => {
    const ids = new Set(TEMPLATE_REGISTRY.map((t) => t.id));
    for (const key of Object.keys(templateComponents)) {
      expect(ids.has(key), `registry entry for ${key}`).toBe(true);
    }
  });

  it("every registry entry has a thumbnail at /thumbnails/<id>.jpg", () => {
    for (const t of TEMPLATE_REGISTRY) {
      expect(thumbs.has(t.id), `thumbnail for ${t.id}`).toBe(true);
    }
  });

  it("has no orphan thumbnail files", () => {
    const ids = new Set(TEMPLATE_REGISTRY.map((t) => t.id));
    const orphans = [...thumbs].filter((name) => !ids.has(name));
    expect(orphans).toEqual([]);
  });
});

describe("legacy template id resolution", () => {
  it("every legacy alias points at a real registry id", () => {
    for (const [legacy, canonical] of Object.entries(LEGACY_TEMPLATE_ALIASES)) {
      expect(templateComponents[canonical], `alias target ${canonical} (from ${legacy})`).toBeDefined();
      expect(resolveTemplateId(legacy)).toBe(canonical);
    }
  });

  it("passes canonical ids through and falls back to 1-clean otherwise", () => {
    expect(resolveTemplateId("2-cinematic")).toBe("2-cinematic");
    expect(resolveTemplateId(undefined)).toBe("1-clean");
    expect(resolveTemplateId(null)).toBe("1-clean");
    expect(resolveTemplateId("no-such-template")).toBe("1-clean");
  });
});
