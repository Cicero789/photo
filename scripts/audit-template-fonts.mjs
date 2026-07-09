import fs from "node:fs";
import path from "node:path";

const templateDir = path.resolve("src/components/templates");
const files = fs
  .readdirSync(templateDir)
  .filter((file) => /^Template.*\.tsx$/.test(file))
  .sort();

const registrySource = fs.readFileSync(
  path.join(templateDir, "types.ts"),
  "utf8"
);
const registryEntries = [
  ...registrySource.matchAll(
    /\{ id: "([^"]+)", name: "([^"]+)", category: "([^"]+)"/g
  ),
].map((match) => ({
  id: match[1],
  name: match[2],
  category: match[3],
}));

const imports = new Map();
const familyUsage = new Map();
const rows = [];

function normalizeImport(urlPart) {
  return decodeURIComponent(urlPart)
    .split("&display=")[0]
    .replace(/family=/g, "")
    .replace(/:[^&]*/g, "")
    .replace(/&/g, " + ");
}

for (const file of files) {
  const source = fs.readFileSync(path.join(templateDir, file), "utf8");
  const googleImports = [
    ...source.matchAll(/fonts\.googleapis\.com\/css2\?([^'"`\s]+)/g),
  ].map((match) => normalizeImport(match[1]));
  for (const fontImport of googleImports) {
    imports.set(fontImport, (imports.get(fontImport) || 0) + 1);
  }

  const families = [
    ...source.matchAll(
      /font(?:-family|Family)\s*[:=]\s*["'`]([^"'`\n;}]*)/g
    ),
  ]
    .map((match) => match[1])
    .filter((value) => value && !value.includes("inherit"));

  for (const family of families) {
    familyUsage.set(family, (familyUsage.get(family) || 0) + 1);
  }

  rows.push({
    file,
    imports: [...new Set(googleImports)],
    families: [...new Set(families)].slice(0, 10),
  });
}

const categoryCounts = registryEntries.reduce((acc, entry) => {
  acc[entry.category] = (acc[entry.category] || 0) + 1;
  return acc;
}, {});

console.log("Template files:", files.length);
console.log("Registered templates:", registryEntries.length);
console.log("\nCategories:");
for (const [category, count] of Object.entries(categoryCounts).sort()) {
  console.log(`${category}\t${count}`);
}

console.log("\nGoogle font import groups:");
for (const [fontImport, count] of [...imports.entries()].sort(
  (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
)) {
  console.log(`${count}\t${fontImport}`);
}

console.log("\nTop explicit family declarations:");
for (const [family, count] of [...familyUsage.entries()].sort(
  (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
)) {
  console.log(`${count}\t${family}`);
}

console.log("\nPer-file summary JSON:");
console.log(JSON.stringify(rows, null, 2));
