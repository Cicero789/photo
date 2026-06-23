// Generate thumbnails by screenshotting each template section individually
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
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  for (const mockup of MOCKUPS) {
    const filePath = resolve(`public/${mockup.file}`);
    if (!existsSync(filePath)) { console.log(`SKIP: ${mockup.file}`); continue; }

    console.log(`${mockup.file} (${mockup.count} templates)...`);
    await page.goto(`file://${filePath}`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise(r => setTimeout(r, 1500));

    // Find all template sections — they use <section> or .template class elements
    // Each section should have unique content
    const sections = await page.$$("section, .template, .photographer-section, [class*='template-']");
    const found = sections.length;

    if (found >= mockup.count) {
      for (let i = 0; i < mockup.count; i++) {
        const outFile = `${outDir}/${mockup.category}-${i}.jpg`;
        try {
          await sections[i].screenshot({ path: outFile, type: "jpeg", quality: 65 });
        } catch (e) {
          console.log(`  Section ${i} failed: ${e.message}`);
        }
      }
    } else {
      // Fallback: scroll to each section and capture the full viewport at that position
      console.log(`  Only ${found} sections found, using scroll fallback for ${mockup.count}...`);
      for (let i = 0; i < mockup.count; i++) {
        // Scroll to show different parts of the page
        await page.evaluate((idx) => {
          const secs = document.querySelectorAll("section, .template, [class*='template-']");
          if (secs[idx]) secs[idx].scrollIntoView({ block: "start" });
        }, i);
        await new Promise(r => setTimeout(r, 200));

        const outFile = `${outDir}/${mockup.category}-${i}.jpg`;
        try {
          await page.screenshot({ path: outFile, type: "jpeg", quality: 65, fullPage: false });
        } catch (e) {
          console.log(`  Fallback ${i} failed: ${e.message}`);
        }
      }
    }
    console.log(`  ✓ ${mockup.count} screenshots`);
  }

  await browser.close();
  console.log(`\nDone. Files in ${outDir}`);
}

run().catch(err => { console.error(err.message); process.exit(1); });
