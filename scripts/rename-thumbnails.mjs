import { readFileSync, copyFileSync, readdirSync } from "fs";

const content = readFileSync("src/components/templates/types.ts", "utf8");
const TEMPLATE_REGISTRY = [];
const regex = /\{\s*id:\s*"([^"]+)",\s*name:\s*"[^"]+",\s*category:\s*"([^"]+)"/g;
let m;
while ((m = regex.exec(content)) !== null) {
  TEMPLATE_REGISTRY.push({ id: m[1], category: m[2] });
}

const byCategory = {};
for (const t of TEMPLATE_REGISTRY) {
  if (!byCategory[t.category]) byCategory[t.category] = [];
  byCategory[t.category].push(t.id);
}

let renamed = 0;
for (const [cat, ids] of Object.entries(byCategory)) {
  ids.forEach((id, i) => {
    const src = `public/thumbnails/${cat}-${i}.jpg`;
    const dst = `public/thumbnails/${id}.jpg`;
    try {
      copyFileSync(src, dst);
      renamed++;
    } catch {}
  });
}

console.log(`Categories: ${Object.keys(byCategory).length}`);
console.log(`Templates in registry: ${TEMPLATE_REGISTRY.length}`);
console.log(`Renamed/copied: ${renamed}`);
console.log(`Total files: ${readdirSync("public/thumbnails").length}`);
