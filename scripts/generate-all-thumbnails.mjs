// Generate thumbnails by finding each section's bounding box and clipping precisely
// Run: node scripts/generate-all-thumbnails.mjs

import puppeteer from "puppeteer";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const MOCKUPS = [
  { file: "mockups-teaching.html", count: 13, category: "teaching" },
  { file: "mockups-coaching.html", count: 10, category: "coaching" },
  { file: "mockups-medical.html", count: 17, category: "medical" },
  { file: "mockups-legal-financial.html", count: 14, category: "legal" },
  { file: "mockups-beauty.html", count: 12, category: "beauty" },
  { file: "mockups-fitness.html", count: 8, category: "fitness" },
  { file: "mockups-creative.html", count: 14, category: "creative" },
  { file: "mockups-marketing.html", count: 11, category: "marketing" },
  { file: "mockups-influencer.html", count: 12, category: "influencer" },
  { file: "mockups-realestate.html", count: 8, category: "real-estate" },
  { file: "mockups-home-services.html", count: 15, category: "home-services" },
  { file: "mockups-restaurant.html", count: 13, category: "restaurant" },
  { file: "mockups-retail.html", count: 12, category: "retail" },
  { file: "mockups-events.html", count: 12, category: "events" },
  { file: "mockups-childcare.html", count: 10, category: "childcare" },
  { file: "mockups-pet-services.html", count: 9, category: "pet-services" },
  { file: "mockups-travel.html", count: 8, category: "travel" },
  { file: "mockups-tech.html", count: 10, category: "tech" },
  { file: "mockups-offices.html", count: 11, category: "offices" },
  { file: "mockups-specialty.html", count: 10, category: "specialty" },
];

const outDir = resolve("public/thumbnails");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

async function run() {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox","--disable-setuid-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  for (const mockup of MOCKUPS) {
    const filePath = resolve(`public/${mockup.file}`);
    if (!existsSync(filePath)) { console.log(`SKIP: ${mockup.file}`); continue; }

    console.log(`${mockup.file} (${mockup.count})...`);
    await page.goto(`file://${filePath}`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    // Find ALL block-level elements that could be template containers
    // The mockup HTML uses various selectors — search broadly
    const containers = await page.evaluate(() => {
      const results = [];
      // Try multiple selectors: sections, template divs, dividers
      const dividers = document.querySelectorAll("section, .template, .divider, [class*='section'], hr, h2");
      // Each template section is typically between dividers
      // Collect all major block elements with significant content
      const allBlocks = document.querySelectorAll("section, div[class*='template'], .photographer-section");
      for (const el of allBlocks) {
        if (el.offsetHeight > 100) { // Skip small elements
          const rect = el.getBoundingClientRect();
          results.push({ x: rect.x, y: rect.y, w: Math.min(rect.width, 1400), h: Math.min(rect.height, 800) });
        }
      }
      return results;
    });

    // If containers found, screenshot each
    if (containers.length >= mockup.count) {
      for (let i = 0; i < mockup.count; i++) {
        const c = containers[i];
        const outFile = `${outDir}/${mockup.category}-${i}.jpg`;
        try {
          await page.screenshot({
            path: outFile,
            type: "jpeg",
            quality: 68,
            clip: { x: Math.max(0, c.x), y: Math.max(0, c.y), width: Math.min(c.w, 1400), height: Math.min(c.h, 800) },
          });
        } catch (e) {
          console.log(`  Section ${i} clip failed: ${e.message}`);
        }
      }
    } else {
      // Fallback: scroll into view and screenshot full page area
      console.log(`  Only ${containers.length} containers found, using scroll+clip...`);
      for (let i = 0; i < mockup.count; i++) {
        // Scroll to approximate position
        const yOffset = 100 + i * 650;
        await page.evaluate((y) => window.scrollTo(0, y), yOffset);
        await new Promise(r => setTimeout(r, 300));

        const outFile = `${outDir}/${mockup.category}-${i}.jpg`;
        try {
          await page.screenshot({
            path: outFile,
            type: "jpeg",
            quality: 68,
            clip: { x: 0, y: 0, width: 1400, height: 650 },
          });
        } catch (e) {
          console.log(`  Fallback ${i} failed: ${e.message}`);
        }
      }
    }
    console.log(`  ✓ ${mockup.count} done`);
  }

  await browser.close();
  console.log(`\nDone.`);
}

run().catch(err => { console.error(err.message); process.exit(1); });
