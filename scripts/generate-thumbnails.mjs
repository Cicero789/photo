// Generate template thumbnails by screenshotting the mockup HTML files
// Run: node scripts/generate-thumbnails.mjs

import puppeteer from "puppeteer";
import { readFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const TEMPLATES = [
  { id: "clean-minimal", file: "mockups-gpt.html", section: 0 },
  { id: "cinematic-dark", file: "mockups-gpt.html", section: 1 },
  { id: "editorial-magazine", file: "mockups-gpt.html", section: 2 },
  { id: "instagram-grid", file: "mockups-gpt.html", section: 3 },
  { id: "masonry-wall", file: "mockups-gpt.html", section: 4 },
  { id: "split-hero", file: "mockups-gpt.html", section: 5 },
  { id: "vertical-scroll", file: "mockups-gpt.html", section: 6 },
  { id: "carousel-spotlight", file: "mockups-gpt.html", section: 7 },
  { id: "story-cards", file: "mockups-gpt.html", section: 8 },
  { id: "brutalist-bold", file: "mockups-gpt.html", section: 9 },
  { id: "sports-action", file: "mockups-sports.html", section: 0 },
  { id: "sports-editorial", file: "mockups-sports.html", section: 1 },
  { id: "engagement-blush", file: "mockups-engagement.html", section: 0 },
  { id: "engagement-elegant", file: "mockups-engagement.html", section: 1 },
  { id: "family-warm", file: "mockups-family.html", section: 0 },
  { id: "family-modern", file: "mockups-family.html", section: 1 },
  { id: "corporate-suite", file: "mockups-corporate.html", section: 0 },
  { id: "corporate-pro", file: "mockups-corporate.html", section: 1 },
  { id: "holiday-hearth", file: "mockups-thanksgiving-christmas.html", section: 0 },
  { id: "golden-feast", file: "mockups-thanksgiving-christmas.html", section: 1 },
  { id: "holiday-festive", file: "mockups-holiday.html", section: 0 },
  { id: "holiday-elegant", file: "mockups-holiday.html", section: 1 },
  { id: "winter-frozen", file: "mockups-winter.html", section: 0 },
  { id: "winter-cozy", file: "mockups-winter.html", section: 1 },
  { id: "summer-beach", file: "mockups-summer.html", section: 0 },
  { id: "summer-golden", file: "mockups-summer.html", section: 1 },
  { id: "spring-blossom", file: "mockups-spring.html", section: 0 },
  { id: "spring-fresh", file: "mockups-spring.html", section: 1 },
  { id: "fall-warmth", file: "mockups-fall.html", section: 0 },
  { id: "fall-palette", file: "mockups-fall.html", section: 1 },
  { id: "portrait-studio", file: "mockups-portraits.html", section: 0 },
  { id: "portrait-headshot", file: "mockups-portraits.html", section: 1 },
  { id: "street-gritty", file: "mockups-street.html", section: 0 },
  { id: "street-neon", file: "mockups-street.html", section: 1 },
];

const outDir = resolve("public/thumbnails");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

async function run() {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  let lastFile = "";
  for (const t of TEMPLATES) {
    const filePath = resolve(`public/${t.file}`);
    if (!existsSync(filePath)) { console.log(`SKIP: ${t.file} not found`); continue; }

    if (lastFile !== t.file) {
      await page.goto(`file://${filePath}`, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise(r => setTimeout(r, 2000)); // wait for fonts + images
      lastFile = t.file;
    }

    // Find all template sections (they use .template class or section tags)
    const sections = await page.$$("section, .template");
    const target = sections[t.section];

    if (target) {
      const outPath = `${outDir}/${t.id}.png`;
      await target.screenshot({ path: outPath, type: "png" });
      console.log(`✓ ${t.id} → ${outPath}`);
    } else {
      // Fallback: screenshot by scrolling to approximate position
      const sectionHeight = 700;
      const y = t.section * sectionHeight;
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await new Promise(r => setTimeout(r, 500));
      const outPath = `${outDir}/${t.id}.png`;
      await page.screenshot({ path: outPath, type: "png", clip: { x: 0, y: 0, width: 1200, height: 700 } });
      console.log(`⚡ ${t.id} → ${outPath} (fallback scroll)`);
    }
  }

  await browser.close();
  console.log(`\nDone! ${TEMPLATES.length} thumbnails in ${outDir}`);
}

run().catch(err => { console.error("Failed:", err.message); process.exit(1); });
