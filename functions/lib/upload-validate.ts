/** Validate uploaded file by inspecting magic bytes, not just MIME type */

const DANGEROUS_SIGNATURES = [
  { bytes: [0x3C, 0x21], name: "HTML" },           // <!
  { bytes: [0x3C, 0x68, 0x74, 0x6D, 0x6C], name: "HTML" },  // <html
  { bytes: [0x3C, 0x48, 0x54, 0x4D, 0x4C], name: "HTML" },  // <HTML
  { bytes: [0x3C, 0x73, 0x76, 0x67], name: "SVG" },          // <svg
  { bytes: [0x3C, 0x53, 0x56, 0x47], name: "SVG" },          // <SVG
  { bytes: [0x3C, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74], name: "Script" },  // <script
];

export async function validateUploadContent(file: File): Promise<{ valid: boolean; reason?: string }> {
  // Read first 512 bytes to check magic bytes
  const slice = file.slice(0, 512);
  const buffer = await slice.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Check for dangerous content signatures
  for (const sig of DANGEROUS_SIGNATURES) {
    // Check if file starts with dangerous bytes (skip whitespace/BOM)
    let start = 0;
    while (start < bytes.length && (bytes[start] === 0xEF || bytes[start] === 0xBB || bytes[start] === 0xBF || bytes[start] === 0x20 || bytes[start] === 0x0A || bytes[start] === 0x0D || bytes[start] === 0x09)) start++;

    let match = true;
    for (let i = 0; i < sig.bytes.length && (start + i) < bytes.length; i++) {
      if (bytes[start + i] !== sig.bytes[i]) { match = false; break; }
    }
    if (match && sig.bytes.length > 0) {
      return { valid: false, reason: `File content appears to be ${sig.name}, not an image/video` };
    }
  }

  // Validate image magic bytes
  const isJPEG = bytes[0] === 0xFF && bytes[1] === 0xD8;
  const isPNG = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47;
  const isWebP = bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  const isHEIC = bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;
  const isMP4 = bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;
  const isWebM = bytes[0] === 0x1A && bytes[1] === 0x45 && bytes[2] === 0xDF && bytes[3] === 0xA3;
  const isMOV = bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70;

  // For photo uploads, require known image magic bytes
  if (file.type.startsWith("image/")) {
    if (!isJPEG && !isPNG && !isWebP && !isHEIC) {
      return { valid: false, reason: "File content does not match a supported image format" };
    }
  }

  // For video uploads, require known video magic bytes
  if (file.type.startsWith("video/")) {
    if (!isMP4 && !isWebM && !isMOV) {
      return { valid: false, reason: "File content does not match a supported video format" };
    }
  }

  return { valid: true };
}
