import { readFileSync, copyFileSync, existsSync } from "fs";
import { resolve } from "path";

const srcDir = "C:/Users/shant/Downloads/mockup-template-screenshots/mockup-template-screenshots";
const outDir = resolve("public/thumbnails");

// Direct category mapping from manifest names to registry slugs
const CATEGORY_MAP = {
  "Teaching & Tutoring": "teaching",
  "Coaching & Personal Development": "coaching",
  "Medical / Health Clinic": "medical",
  "Legal / Financial / Professional": "legal",
  "Beauty / Wellness": "beauty",
  "Fitness / Movement": "fitness",
  "Creative Portfolio": "creative",
  "Marketing / Digital Services": "marketing",
  "Influencer / Personal Brand": "influencer",
  "Real Estate": "real-estate",
  "Home & Local Services": "home-services",
  "Restaurant / Food Business": "restaurant",
  "Retail / Boutique": "retail",
  "Event / Wedding Services": "events",
  "Childcare / Family / Senior": "childcare",
  "Pet Services": "pet-services",
  "Travel / Hospitality": "travel",
  "Tech / IT / Software": "tech",
  "Offices, Studios & Rentals": "offices",
  "Specialty Independents": "specialty",
};

// Read registry
const typesContent = readFileSync("src/components/templates/types.ts", "utf8");
const entries = [];
const regex = /\{\s*id:\s*"([^"]+)",\s*name:\s*"[^"]+",\s*category:\s*"([^"]+)"/g;
let m;
while ((m = regex.exec(typesContent)) !== null) entries.push({ id: m[1], category: m[2] });

// Read manifest
const manifest = readFileSync(`${srcDir}/manifest.csv`, "utf8");
const lines = manifest.trim().split("\n").slice(1);

let copied = 0;
let mapping = {};
let prevCategory = "";
let idx = 0;

for (const line of lines) {
  const parts = line.split(",");
  const manifestCategory = parts[0];
  const screenshotFile = parts[parts.length - 1]; // last field is path

  if (manifestCategory !== prevCategory) { idx = 0; prevCategory = manifestCategory; }
  
  const registrySlug = CATEGORY_MAP[manifestCategory];
  if (!registrySlug) continue;

  const srcFile = `${srcDir}/${screenshotFile}`;
  if (!existsSync(srcFile)) continue;

  const catEntries = entries.filter(e => e.category === registrySlug);
  if (idx >= catEntries.length) continue;

  const templateId = catEntries[idx].id;
  const dstFile = `${outDir}/${templateId}.jpg`;
  copyFileSync(srcFile, dstFile);
  copied++;
  idx++;
}

console.log(`Copied: ${copied} screenshots`);
console.log(`Registry entries: ${entries.length}`);
