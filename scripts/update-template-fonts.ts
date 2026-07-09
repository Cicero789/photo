/** Cleanup: remove pre-existing font variables that duplicate BASE_TEMPLATE_FONT_IMPORT */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const TEMPLATES_DIR = resolve(import.meta.dirname ?? __dirname, "..", "src", "components", "templates");
const files = readdirSync(TEMPLATES_DIR).filter(f => f.startsWith("Template") && f.endsWith(".tsx"));

for (const file of files) {
  const path = resolve(TEMPLATES_DIR, file);
  let src = readFileSync(path, "utf-8");

  // Remove `const fonts = \`@import url('https://fonts.googleapis.com/...');\`;` lines
  src = src.replace(/^const fonts = `@import url\('https:\/\/fonts\.googleapis\.com\/[^']+'\);`;\s*\n/gm, "");

  // Replace references to the removed variable
  src = src.replace(/<style>\{fonts\}<\/style>/g, "<style></style>");
  src = src.replace(/<style>\{\s*fonts\s*\}<\/style>/g, "<style></style>");

  // Also remove the fonts string from inline style blocks that now use BASE_TEMPLATE_FONT_IMPORT
  // (keep BASE_TEMPLATE_FONT_IMPORT, just remove the old variable)

  writeFileSync(path, src);
}
console.log("Cleanup done!");
