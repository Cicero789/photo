// Generate 10 photographer template mockups using GPT-5.5
// Run: node scripts/generate-mockups.mjs

import { readFileSync, writeFileSync } from "fs";

const envFile = readFileSync("../.env", "utf8");
const apiKey = envFile.match(/OPENAI_API_KEY=(.+)/)?.[1]?.trim();
if (!apiKey) { console.error("No OPENAI_API_KEY in .env"); process.exit(1); }

const prompt = `You are a world-class photographer website designer. Generate a SINGLE self-contained HTML file with 10 photographer portfolio template sections. Each is a full-width section with a clear divider.

Sample data: Name "Elena Vasquez Photography", Tagline "Timeless moments, artfully captured", Location "Austin, TX", Specialties "Weddings, Portraits, Editorial". Photos:
- https://images.unsplash.com/photo-1519741497674-611481863552?w=600
- https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600
- https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600
- https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600
- https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600
- https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600

Templates: 1.Clean Minimal(white,Inter,4-col grid) 2.Cinematic Dark(black bg,gold #d4af37,hero overlay) 3.Editorial Magazine(off-white,serif,asymmetric) 4.Instagram Grid(white,3-col tight,square) 5.Masonry Wall(gray,varied heights) 6.Split Hero(left photo right text,cream) 7.Vertical Scroll(full-width stacked,captions) 8.Carousel Spotlight(one large photo,arrows) 9.Story Cards(warm bg,cards with titles) 10.Brutalist Bold(huge uppercase,stark BW,monospace)

All CSS in a style tag. Load Google Fonts: Inter, Playfair Display, Cormorant Garamond, Bebas Neue, Lora. Each section ~500px min-height. Add a Hire Me button. Label each section. Title: "FrameNest Templates - GPT-5.5". Output ONLY the HTML code.`;

console.log("Calling GPT-5.5...");
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "gpt-5.5",
    messages: [{ role: "user", content: prompt }],
    max_completion_tokens: 16000,
  }),
});

const data = await res.json();
if (data.error) { console.error("API Error:", data.error.message); process.exit(1); }

let html = data.choices[0].message.content;
html = html.replace(/^```html\s*/s, "").replace(/\s*```\s*$/s, "");
writeFileSync("public/mockups-gpt.html", html, "utf8");
console.log(`Saved: ${html.length} chars | Model: ${data.model} | Tokens: in=${data.usage.prompt_tokens} out=${data.usage.completion_tokens} | Finish: ${data.choices[0].finish_reason}`);
