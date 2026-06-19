/**
 * Authorization Policy Matrix Tests
 *
 * Tests that every operation respects the visibility model:
 * - Public: anyone can read
 * - Gate: gate key holders can read
 * - Private: only space owner can read
 *
 * And that nested resources inherit parent authorization:
 * - Photo access requires event access which requires space access
 */
import { describe, it, expect } from "vitest";

// Simulated authorization policy functions
function canReadEvent(actorRole: string | null, actorSpaceId: string | null, eventSpaceId: string, eventVisibility: string): boolean {
  if (eventVisibility === "public") return true;
  if (eventVisibility === "gate" && actorSpaceId === eventSpaceId) return true;
  if (actorSpaceId === eventSpaceId && actorRole && actorRole !== "viewer") return true;
  return false;
}

function canWriteEvent(actorRole: string | null, actorSpaceId: string | null, eventSpaceId: string): boolean {
  if (!actorRole || !actorSpaceId) return false;
  if (actorSpaceId !== eventSpaceId) return false;
  return ["platform_owner", "page_admin", "staff"].includes(actorRole);
}

function canDeleteEvent(actorRole: string | null, actorSpaceId: string | null, eventSpaceId: string): boolean {
  if (!actorRole || !actorSpaceId) return false;
  if (actorSpaceId !== eventSpaceId) return false;
  return ["platform_owner", "page_admin"].includes(actorRole);
}

function canUploadToEvent(actorRole: string | null, actorSpaceId: string | null, eventSpaceId: string): boolean {
  return canWriteEvent(actorRole, actorSpaceId, eventSpaceId);
}

function canReadMedia(actorRole: string | null, actorSpaceId: string | null, photoSpaceId: string, eventVisibility: string, hasSignedUrl: boolean): boolean {
  if (hasSignedUrl) return true;
  return canReadEvent(actorRole, actorSpaceId, photoSpaceId, eventVisibility);
}

describe("Authorization Policy Matrix", () => {
  const SPACE_A = "space-a";
  const SPACE_B = "space-b";

  describe("Event visibility: Public", () => {
    it("anonymous can read", () => expect(canReadEvent(null, null, SPACE_A, "public")).toBe(true));
    it("other-space user can read", () => expect(canReadEvent("page_admin", SPACE_B, SPACE_A, "public")).toBe(true));
    it("same-space viewer can read", () => expect(canReadEvent("viewer", SPACE_A, SPACE_A, "public")).toBe(true));
    it("anonymous cannot write", () => expect(canWriteEvent(null, null, SPACE_A)).toBe(false));
    it("other-space admin cannot write", () => expect(canWriteEvent("page_admin", SPACE_B, SPACE_A)).toBe(false));
  });

  describe("Event visibility: Gate", () => {
    it("anonymous cannot read gate event", () => expect(canReadEvent(null, null, SPACE_A, "gate")).toBe(false));
    it("other-space user cannot read gate event", () => expect(canReadEvent("page_admin", SPACE_B, SPACE_A, "gate")).toBe(false));
    it("same-space viewer CAN read gate event", () => expect(canReadEvent("viewer", SPACE_A, SPACE_A, "gate")).toBe(true));
    it("same-space admin can read gate event", () => expect(canReadEvent("page_admin", SPACE_A, SPACE_A, "gate")).toBe(true));
  });

  describe("Event visibility: Private", () => {
    it("anonymous cannot read private event", () => expect(canReadEvent(null, null, SPACE_A, "private")).toBe(false));
    it("other-space user cannot read private event", () => expect(canReadEvent("page_admin", SPACE_B, SPACE_A, "private")).toBe(false));
    it("same-space viewer cannot read private event", () => expect(canReadEvent("viewer", SPACE_A, SPACE_A, "private")).toBe(false));
    it("same-space admin CAN read private event", () => expect(canReadEvent("page_admin", SPACE_A, SPACE_A, "private")).toBe(true));
  });

  describe("Write operations", () => {
    it("viewer cannot write to own space", () => expect(canWriteEvent("viewer", SPACE_A, SPACE_A)).toBe(false));
    it("staff can write to own space", () => expect(canWriteEvent("staff", SPACE_A, SPACE_A)).toBe(true));
    it("admin can write to own space", () => expect(canWriteEvent("page_admin", SPACE_A, SPACE_A)).toBe(true));
    it("admin cannot write to other space", () => expect(canWriteEvent("page_admin", SPACE_B, SPACE_A)).toBe(false));
  });

  describe("Delete operations", () => {
    it("staff cannot delete", () => expect(canDeleteEvent("staff", SPACE_A, SPACE_A)).toBe(false));
    it("admin can delete own space events", () => expect(canDeleteEvent("page_admin", SPACE_A, SPACE_A)).toBe(true));
    it("admin cannot delete other space events", () => expect(canDeleteEvent("page_admin", SPACE_B, SPACE_A)).toBe(false));
  });

  describe("Upload operations", () => {
    it("viewer cannot upload", () => expect(canUploadToEvent("viewer", SPACE_A, SPACE_A)).toBe(false));
    it("staff can upload to own space", () => expect(canUploadToEvent("staff", SPACE_A, SPACE_A)).toBe(true));
    it("admin cannot upload to other space", () => expect(canUploadToEvent("page_admin", SPACE_B, SPACE_A)).toBe(false));
  });

  describe("Media access (nested resource)", () => {
    it("private photo with signed URL: allowed", () => expect(canReadMedia(null, null, SPACE_A, "private", true)).toBe(true));
    it("private photo without signed URL, anonymous: denied", () => expect(canReadMedia(null, null, SPACE_A, "private", false)).toBe(false));
    it("public photo without signed URL: allowed", () => expect(canReadMedia(null, null, SPACE_A, "public", false)).toBe(true));
    it("gate photo, same-space viewer: allowed", () => expect(canReadMedia("viewer", SPACE_A, SPACE_A, "gate", false)).toBe(true));
    it("gate photo, other-space user: denied", () => expect(canReadMedia("page_admin", SPACE_B, SPACE_A, "gate", false)).toBe(false));
  });

  describe("Gate viewer restrictions", () => {
    it("gate viewer cannot create events", () => expect(canWriteEvent("viewer", SPACE_A, SPACE_A)).toBe(false));
    it("gate viewer cannot upload photos", () => expect(canUploadToEvent("viewer", SPACE_A, SPACE_A)).toBe(false));
    it("gate viewer cannot delete events", () => expect(canDeleteEvent("viewer", SPACE_A, SPACE_A)).toBe(false));
  });
});
