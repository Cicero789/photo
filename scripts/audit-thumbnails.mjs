import { createHash } from "crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import sharp from "sharp";

const REGISTRY_PATH = "src/components/templates/types.ts";
const GENERATOR_PATH = "scripts/generate-all-thumbnails.mjs";
const RENAMER_PATH = "scripts/rename-thumbnails.mjs";
const THUMBNAILS_DIR = "public/thumbnails";
const MIN_BYTES = 10_000;
const MIN_WIDTH = 200;
const MIN_HEIGHT = 120;

function readTemplateRegistry() {
  const content = readFileSync(REGISTRY_PATH, "utf8");
  return [...content.matchAll(/\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g)].map(
    (match) => ({ id: match[1], name: match[2], category: match[3] }),
  );
}

function readGeneratorCategories() {
  const content = readFileSync(GENERATOR_PATH, "utf8");
  return new Map(
    [...content.matchAll(/\{ file: "([^"]+)", count: (\d+), category: "([^"]+)" \}/g)].map((match) => [
      match[3],
      { file: match[1], count: Number(match[2]) },
    ]),
  );
}

function readRenameOrders() {
  const content = readFileSync(RENAMER_PATH, "utf8");
  const objectStart = content.indexOf("const THUMBNAIL_ORDER = {");
  const objectEnd = content.indexOf("};", objectStart);
  const orderBlock = content.slice(objectStart, objectEnd);

  return new Map(
    [...orderBlock.matchAll(/^\s*"?([a-z0-9-]+)"?:\s*\[([\s\S]*?)\n\s*\]/gm)].map((match) => [
      match[1],
      [...match[2].matchAll(/"([^"]+)"/g)].map((idMatch) => idMatch[1]),
    ]),
  );
}

async function readImageInfo(file) {
  const meta = await sharp(file).metadata();
  return {
    bytes: statSync(file).size,
    format: meta.format || "unknown",
    width: meta.width || 0,
    height: meta.height || 0,
  };
}

function addIssue(issues, message) {
  issues.push(message);
  console.error(message);
}

async function main() {
  const issues = [];
  const templates = readTemplateRegistry();
  const templateIds = new Set(templates.map((template) => template.id));
  const categoryCounts = new Map();
  for (const template of templates) {
    categoryCounts.set(template.category, (categoryCounts.get(template.category) || 0) + 1);
  }

  const generatorCategories = readGeneratorCategories();
  const renameOrders = readRenameOrders();
  const seenRenameIds = new Map();

  for (const [category, expectedCount] of categoryCounts) {
    const generator = generatorCategories.get(category);
    if (!generator) {
      addIssue(issues, `Missing generator category: ${category}`);
    } else if (generator.count !== expectedCount) {
      addIssue(issues, `Generator count mismatch for ${category}: ${generator.count} vs ${expectedCount}`);
    }

    const order = renameOrders.get(category);
    if (!order) {
      addIssue(issues, `Missing rename order category: ${category}`);
    } else if (order.length !== expectedCount) {
      addIssue(issues, `Rename order count mismatch for ${category}: ${order.length} vs ${expectedCount}`);
    }
  }

  for (const [category, ids] of renameOrders) {
    for (const id of ids) {
      if (!templateIds.has(id)) addIssue(issues, `Rename order references unknown template id: ${category}/${id}`);
      if (seenRenameIds.has(id)) addIssue(issues, `Template id appears in two rename orders: ${seenRenameIds.get(id)} and ${category}/${id}`);
      seenRenameIds.set(id, `${category}/${id}`);
    }
  }

  for (const template of templates) {
    if (!seenRenameIds.has(template.id)) addIssue(issues, `Template id is missing from rename order: ${template.category}/${template.id}`);

    const file = join(THUMBNAILS_DIR, `${template.id}.jpg`);
    if (!existsSync(file)) {
      addIssue(issues, `Missing canonical thumbnail: ${file}`);
      continue;
    }

    const info = await readImageInfo(file);
    if (info.format !== "jpeg" || info.bytes < MIN_BYTES || info.width < MIN_WIDTH || info.height < MIN_HEIGHT) {
      addIssue(issues, `Bad canonical thumbnail: ${file} ${info.bytes} bytes ${info.width}x${info.height} ${info.format}`);
    }
  }

  const canonicalHashes = new Map();
  for (const template of templates) {
    const file = join(THUMBNAILS_DIR, `${template.id}.jpg`);
    if (!existsSync(file)) continue;

    const hash = createHash("sha256").update(readFileSync(file)).digest("hex");
    const matches = canonicalHashes.get(hash) || [];
    matches.push(template.id);
    canonicalHashes.set(hash, matches);
  }
  for (const matches of canonicalHashes.values()) {
    if (matches.length > 1) addIssue(issues, `Duplicate canonical thumbnail image: ${matches.join(", ")}`);
  }

  const allJpegs = readdirSync(THUMBNAILS_DIR).filter((name) => name.endsWith(".jpg"));
  for (const name of allJpegs) {
    const file = join(THUMBNAILS_DIR, name);
    const info = await readImageInfo(file);
    if (info.format !== "jpeg" || info.bytes < MIN_BYTES || info.width < MIN_WIDTH || info.height < MIN_HEIGHT) {
      addIssue(issues, `Bad thumbnail JPEG: ${file} ${info.bytes} bytes ${info.width}x${info.height} ${info.format}`);
    }
  }

  console.log(`Audited ${templates.length} registered templates.`);
  console.log(`Audited ${allJpegs.length} thumbnail JPEGs.`);

  if (issues.length > 0) {
    console.error(`Thumbnail audit failed with ${issues.length} issue(s).`);
    process.exit(1);
  }

  console.log("Thumbnail audit passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
