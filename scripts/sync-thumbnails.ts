/**
 * Build a thumbnail mapping from old numeric names to new descriptive template IDs.
 * Thumbnails are named {category}-{index}.jpg and were generated in registry order.
 * This script produces a mapping file the TemplatePicker uses to find real thumbnails.
 */
import { readdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = resolve(__dirname, "..", "src", "components", "templates", "types.ts");
const THUMBS_DIR = resolve(__dirname, "..", "public", "thumbnails");
const OUTPUT_PATH = resolve(__dirname, "..", "src", "lib", "thumbnail-map.ts");

// Parse the registry file to extract ordered template IDs per category
const registrySrc = await import(`file://${REGISTRY_PATH.replace(/\\/g, "/")}`);
const registry: Array<{ id: string; category: string }> = registrySrc.TEMPLATE_REGISTRY;

// Build: category -> ordered list of template IDs
const byCategory: Record<string, string[]> = {};
for (const t of registry) {
  if (!byCategory[t.category]) byCategory[t.category] = [];
  byCategory[t.category]!.push(t.id);
}

// Build: template ID -> thumbnail filename that exists
const existingFiles = new Set(readdirSync(THUMBS_DIR));
const map: Record<string, string> = {};

for (const [cat, ids] of Object.entries(byCategory)) {
  ids.forEach((id, idx) => {
    // Try numbered thumbnail first (category-0.jpg, category-1.jpg, etc.)
    const numbered = `${cat}-${idx}.jpg`;
    if (existingFiles.has(numbered)) {
      map[id] = numbered;
      return;
    }
    // Try exact match (id.jpg)
    const exact = `${id}.jpg`;
    if (existingFiles.has(exact)) {
      map[id] = exact;
      return;
    }
    // Not found — will use placeholder
  });
}

const count = Object.keys(map).length;
const total = registry.length;
const lines = [
  `// Auto-generated thumbnail mapping — ${count}/${total} templates have real thumbnails`,
  `// Regenerate: npx tsx scripts/sync-thumbnails.ts`,
  `export const THUMBNAIL_MAP: Record<string, string> = ${JSON.stringify(map, null, 2)};`,
  ``,
  `export function getThumbnailFile(templateId: string): string | null {`,
  `  return THUMBNAIL_MAP[templateId] ?? null;`,
  `}`,
];

writeFileSync(OUTPUT_PATH, lines.join("\n"));
console.log(`Wrote ${OUTPUT_PATH}`);
console.log(`${count}/${total} templates mapped to real thumbnails`);
console.log(`${total - count} templates still need thumbnails`);
