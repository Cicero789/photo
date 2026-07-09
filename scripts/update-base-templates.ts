import { readFileSync, writeFileSync } from "node:fs";

const CFG: Record<number, { bg: string; text: string; accent: string; accent2?: string; heading: string; body: string; headingWt: string }> = {
  3: { bg:"#fafaf9",text:"#1a1a1a",accent:"#991b1b",accent2:"#444",heading:"Playfair Display",body:"Source Serif 4",headingWt:"400;600"},
  4: { bg:"#fff",text:"#111",accent:"#e1306c",heading:"Inter",body:"Inter",headingWt:"500;700"},
  5: { bg:"#fff",text:"#111",accent:"#e85d04",heading:"Inter",body:"Inter",headingWt:"500;700"},
  6: { bg:"#fff",text:"#111",accent:"#2563eb",heading:"Inter",body:"Inter",headingWt:"500;700"},
  7: { bg:"#fff",text:"#111",accent:"#059669",heading:"Inter",body:"Inter",headingWt:"500;700"},
  8: { bg:"#fff",text:"#111",accent:"#7c3aed",heading:"Inter",body:"Inter",headingWt:"500;700"},
  9: { bg:"#fef9f0",text:"#3e2723",accent:"#d4a853",heading:"Georgia",body:"Inter",headingWt:"400;700"},
  10:{ bg:"#f0f0f0",text:"#000",accent:"#ff0000",heading:"Inter",body:"Inter",headingWt:"700;900"},
};

const NM: Record<number,string> = {3:"Editorial",4:"Instagram",5:"Masonry",6:"Split",7:"Vertical",8:"Carousel",9:"StoryCards",10:"Brutalist"};

for (const n of [3,4,5,6,7,8,9,10]) {
  const d = CFG[n]!;
  const path = `src/components/templates/Template${n}${NM[n]}.tsx`;
  let src = readFileSync(path, "utf-8");

  // 1. Destructure
  src = src.replace(
    "const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick } = props;",
    `const { name, tagline, specialties, bio, serviceArea, verified, pricing, portfolio, onHire, onPhotoClick, colorScheme, fontPairing } = props;
  const bg = colorScheme?.bg || "${d.bg}";
  const text = colorScheme?.text || "${d.text}";
  const accent = colorScheme?.accent || "${d.accent}";
  const headingFont = fontPairing?.heading || "${d.heading}";
  const bodyFont = fontPairing?.body || "${d.body}";`
  );

  // 2. Font loading
  src = src.replace(
    /link\.href = "https:\/\/fonts\.googleapis\.com\/css2\?[^"]+"/,
    `link.href = \`https://fonts.googleapis.com/css2?family=$\{headingFont.replace(/ /g, "+")}:wght@${d.headingWt}&family=$\{bodyFont.replace(/ /g, "+")}:wght@300;400;700&display=swap\``
  );

  // 3. Replace colors in the STYLE BLOCK only (after the <style>{` marker)
  const styleStart = src.indexOf("<style>{`");
  const styleEnd = src.indexOf("`}</style>", styleStart);
  if (styleStart > 0 && styleEnd > 0) {
    const before = src.slice(0, styleStart);
    let style = src.slice(styleStart, styleEnd);
    const after = src.slice(styleEnd);

    const esc = (s:string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    style = style.replace(new RegExp(esc(d.bg), "g"), "${bg}");
    style = style.replace(new RegExp(esc(d.text), "g"), "${text}");
    style = style.replace(new RegExp(esc(d.accent), "g"), "${accent}");
    if (d.accent2) style = style.replace(new RegExp(esc(d.accent2), "g"), "${accent}");
    style = style.replace(new RegExp(`"${esc(d.heading)}"`, "g"), '"${headingFont}"');
    style = style.replace(new RegExp(esc(d.body), "g"), "${bodyFont}");

    src = before + style + after;
  }

  writeFileSync(path, src);
  console.log(`  ✓ Template${n} ${NM[n]}`);
}
console.log("Done!");
