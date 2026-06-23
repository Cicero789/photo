// Generate thumbnails for ALL 20 industry mockup files by screenshotting sections
// Run: node scripts/generate-all-thumbnails.mjs

import puppeteer from "puppeteer";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

// Mockup files and how many template sections each contains
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
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  let generated = 0;

  for (const mockup of MOCKUPS) {
    const filePath = resolve(`public/${mockup.file}`);
    if (!existsSync(filePath)) { console.log(`SKIP: ${mockup.file} not found`); continue; }

    console.log(`Processing ${mockup.file} (${mockup.count} sections)...`);
    await page.goto(`file://${filePath}`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));

    // Screenshot each section by scrolling through them
    for (let i = 0; i < mockup.count; i++) {
      const sectionHeight = 700;
      const y = i * sectionHeight + 100; // offset for headers
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await new Promise(r => setTimeout(r, 300));

      const outFile = `${outDir}/${mockup.category}-${i}.jpg`;
      try {
        await page.screenshot({
          path: outFile,
          type: "jpeg",
          quality: 70,
          clip: { x: 0, y: 0, width: 1200, height: 680 },
        });
        generated++;
      } catch (e) {
        console.log(`  Failed section ${i}: ${e.message}`);
      }
    }
    console.log(`  ✓ ${mockup.count} screenshots for ${mockup.file}`);
  }

  await browser.close();
  console.log(`\nGenerated ${generated} thumbnails in ${outDir}`);
}

run().catch(err => { console.error("Failed:", err.message); process.exit(1); });
