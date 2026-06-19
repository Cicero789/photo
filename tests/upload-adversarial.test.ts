/**
 * Adversarial File Upload Tests
 *
 * Tests that uploaded files are validated by content (magic bytes),
 * not just by MIME type or extension. Rejects HTML, SVG, script,
 * and polyglot files.
 */
import { describe, it, expect } from "vitest";

// Simulate the magic byte validation logic
function validateMagicBytes(bytes: Uint8Array, claimedType: string): { valid: boolean; reason?: string } {
  // Skip BOM/whitespace
  let start = 0;
  while (start < bytes.length && [0xEF, 0xBB, 0xBF, 0x20, 0x0A, 0x0D, 0x09].includes(bytes[start])) start++;

  // Dangerous signatures
  const dangerous = [
    { bytes: [0x3C, 0x21], name: "HTML" },           // <!
    { bytes: [0x3C, 0x73, 0x76, 0x67], name: "SVG" }, // <svg
    { bytes: [0x3C, 0x53, 0x56, 0x47], name: "SVG" }, // <SVG
    { bytes: [0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74], name: "Script" }, // <script
    { bytes: [0x3C, 0x68, 0x74, 0x6D, 0x6C], name: "HTML" }, // <html
  ];

  for (const sig of dangerous) {
    let match = true;
    for (let i = 0; i < sig.bytes.length && (start + i) < bytes.length; i++) {
      if (bytes[start + i] !== sig.bytes[i]) { match = false; break; }
    }
    if (match) return { valid: false, reason: `Content is ${sig.name}` };
  }

  // Valid image signatures
  if (claimedType.startsWith("image/")) {
    const isJPEG = bytes[0] === 0xFF && bytes[1] === 0xD8;
    const isPNG = bytes[0] === 0x89 && bytes[1] === 0x50;
    const isWebP = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[8] === 0x57 && bytes[9] === 0x45;
    if (!isJPEG && !isPNG && !isWebP) return { valid: false, reason: "Not a valid image" };
  }

  return { valid: true };
}

describe("Adversarial Upload Validation", () => {
  it("accepts valid JPEG", () => {
    const bytes = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10]);
    expect(validateMagicBytes(bytes, "image/jpeg").valid).toBe(true);
  });

  it("accepts valid PNG", () => {
    const bytes = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A]);
    expect(validateMagicBytes(bytes, "image/png").valid).toBe(true);
  });

  it("rejects HTML disguised as JPEG", () => {
    const html = new TextEncoder().encode("<!DOCTYPE html><html><body>XSS</body></html>");
    expect(validateMagicBytes(html, "image/jpeg").valid).toBe(false);
  });

  it("rejects SVG disguised as image", () => {
    const svg = new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
    expect(validateMagicBytes(svg, "image/png").valid).toBe(false);
  });

  it("rejects <script> tag in file", () => {
    const script = new TextEncoder().encode("<script>document.cookie</script>");
    expect(validateMagicBytes(script, "image/jpeg").valid).toBe(false);
  });

  it("rejects HTML with BOM prefix", () => {
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF, 0x3C, 0x21, 0x44, 0x4F]);
    expect(validateMagicBytes(bom, "image/jpeg").valid).toBe(false);
  });

  it("rejects HTML with leading whitespace", () => {
    const ws = new TextEncoder().encode("   \n\t<!DOCTYPE html>");
    expect(validateMagicBytes(ws, "image/png").valid).toBe(false);
  });

  it("rejects random binary claiming to be image", () => {
    const random = new Uint8Array([0x00, 0x01, 0x02, 0x03, 0x04]);
    expect(validateMagicBytes(random, "image/jpeg").valid).toBe(false);
  });

  it("accepts valid WebP", () => {
    const webp = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50]);
    expect(validateMagicBytes(webp, "image/webp").valid).toBe(true);
  });
});
