import { useState, useEffect, Suspense, useCallback } from "react";
import { TEMPLATE_REGISTRY } from "@/components/templates/types";
import { templateComponents } from "@/components/templates";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

// ─── Color Schemes ───
export const COLOR_SCHEMES: Record<
  string,
  { name: string; key: string; bg: string; text: string; accent: string }[]
> = {
  default: [
    { name: "Light", key: "light", bg: "#ffffff", text: "#1a1a1a", accent: "#2563eb" },
    { name: "Dark", key: "dark", bg: "#0a0a0a", text: "#f5f5f5", accent: "#d4af37" },
    { name: "Warm", key: "warm", bg: "#fffbf5", text: "#44403c", accent: "#b45309" },
    { name: "Cool", key: "cool", bg: "#f0f4f8", text: "#1e293b", accent: "#0ea5e9" },
  ],
};

// ─── Font Pairings ───
export const FONT_PAIRINGS = [
  { name: "Modern", key: "modern", heading: "Inter", body: "Inter" },
  { name: "Classic", key: "classic", heading: "Playfair Display", body: "Source Sans 3" },
  { name: "Elegant", key: "elegant", heading: "Cormorant Garamond", body: "Montserrat" },
  { name: "Bold", key: "bold", heading: "Bebas Neue", body: "Roboto" },
  { name: "Warm", key: "warm", heading: "Lora", body: "Poppins" },
];

// ─── Placeholder photos when photographer has no portfolio ───
const PLACEHOLDER_PHOTOS = [
  { id: "ph-1", url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600", filename: "wedding.jpg" },
  { id: "ph-2", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600", filename: "portrait.jpg" },
  { id: "ph-3", url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", filename: "landscape.jpg" },
  { id: "ph-4", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600", filename: "ceremony.jpg" },
  { id: "ph-5", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600", filename: "headshot.jpg" },
  { id: "ph-6", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600", filename: "nature.jpg" },
];

// ─── Props ───
interface TemplatePickerProps {
  currentTemplate: string;
  currentColorScheme?: string;
  currentFontPairing?: string;
  onSave: (templateId: string, colorScheme?: string, fontPairing?: string) => void | Promise<void>;
}

// ─── Profile data shape for template preview ───
interface PreviewProfileData {
  name: string;
  tagline: string;
  specialties: string[];
  bio: string;
  website: string;
  serviceArea: string;
  verified: boolean;
  pricing: { downloads?: { single?: number; full?: number } };
  portfolio: { id: string; url: string; filename: string }[];
}


const CATEGORY_BADGE_COLORS: Record<string, string> = {
  base: "bg-neutral-100 text-neutral-600",
  sports: "bg-green-100 text-green-700",
  engagement: "bg-pink-100 text-pink-700",
  family: "bg-amber-100 text-amber-700",
  corporate: "bg-blue-100 text-blue-700",
  "holiday-season": "bg-red-100 text-red-700",
  holiday: "bg-yellow-100 text-yellow-700",
  winter: "bg-sky-100 text-sky-700",
  summer: "bg-orange-100 text-orange-700",
  spring: "bg-emerald-100 text-emerald-700",
  fall: "bg-amber-100 text-amber-800",
  portraits: "bg-purple-100 text-purple-700",
  street: "bg-neutral-200 text-neutral-700",
};

const CATEGORY_GROUPS = [
  { label: "Base Templates", categories: ["base"] },
  { label: "Seasonal", categories: ["spring", "summer", "fall", "winter"] },
  { label: "Events & Occasions", categories: ["engagement", "family", "corporate", "holiday-season", "holiday"] },
  { label: "Specialty", categories: ["sports", "portraits", "street"] },
];

// ─── Mini-mockup thumbnails for each template ───
function renderMiniMockup(id: string): React.ReactElement {
  const s: React.CSSProperties = { width: "100%", height: 160, overflow: "hidden", borderRadius: "10px 10px 0 0" };

  switch (id) {
    case "clean-minimal":
      return <div style={{...s, background:"#fff", padding:10, display:"flex", flexDirection:"column", alignItems:"center"}}>
        <div style={{width:24,height:24,borderRadius:"50%",background:"#eee",marginBottom:6}}/>
        <div style={{width:70,height:5,background:"#222",borderRadius:2,marginBottom:3}}/>
        <div style={{width:50,height:3,background:"#ccc",borderRadius:2,marginBottom:10}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:3,width:"100%",flex:1}}>
          {[0,1,2,3,4,5,6,7].map(i=><div key={i} style={{background:"#f0f0f0",borderRadius:2}}/>)}
        </div>
      </div>;

    case "cinematic-dark":
      return <div style={{...s, background:"#0a0a0a",display:"flex",flexDirection:"column"}}>
        <div style={{flex:1,background:"linear-gradient(180deg,rgba(255,255,255,0.08),transparent)",position:"relative",display:"flex",alignItems:"flex-end",padding:10}}>
          <div><div style={{width:80,height:6,background:"#d4af37",borderRadius:1,marginBottom:3}}/><div style={{width:50,height:3,background:"rgba(212,175,55,0.5)",borderRadius:1}}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,padding:8}}>
          {[0,1,2].map(i=><div key={i} style={{height:35,background:"rgba(255,255,255,0.06)",borderRadius:2}}/>)}
        </div>
      </div>;

    case "editorial-magazine":
      return <div style={{...s, background:"#fafaf9",padding:10}}>
        <div style={{borderTop:"1px solid #999",borderBottom:"1px solid #999",padding:"4px 0",marginBottom:8,textAlign:"center"}}>
          <div style={{width:80,height:6,background:"#1c1917",borderRadius:1,margin:"0 auto"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:4,height:90}}>
          <div style={{background:"#e8e6e3",borderRadius:2}}/>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            <div style={{flex:1,background:"#e8e6e3",borderRadius:2}}/>
            <div style={{flex:1,background:"#e8e6e3",borderRadius:2}}/>
          </div>
        </div>
      </div>;

    case "instagram-grid":
      return <div style={{...s, background:"#fff",padding:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(45deg,#f9ce34,#ee2a7b,#6228d7)"}}/>
          <div><div style={{width:50,height:4,background:"#262626",borderRadius:1,marginBottom:3}}/><div style={{width:70,height:3,background:"#ccc",borderRadius:1}}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:2}}>
          {[0,1,2,3,4,5].map(i=><div key={i} style={{aspectRatio:"1",background:"#f0f0f0"}}/>)}
        </div>
      </div>;

    case "masonry-wall":
      return <div style={{...s, background:"#f5f5f5",padding:8}}>
        <div style={{background:"#fff",borderRadius:4,padding:6,marginBottom:6,boxShadow:"0 1px 3px rgba(0,0,0,0.08)",display:"inline-block"}}>
          <div style={{width:60,height:4,background:"#171717",borderRadius:1,marginBottom:2}}/><div style={{width:40,height:3,background:"#aaa",borderRadius:1}}/>
        </div>
        <div style={{columns:3,columnGap:4}}>
          {[55,35,45,30,50,40].map((h,i)=><div key={i} style={{height:h,background:"#e0e0e0",borderRadius:4,marginBottom:4,boxShadow:"0 1px 2px rgba(0,0,0,0.06)"}}/>)}
        </div>
      </div>;

    case "split-hero":
      return <div style={{...s, display:"grid",gridTemplateColumns:"1fr 1fr"}}>
        <div style={{background:"linear-gradient(135deg,#d4c5b0,#b8a590)"}}/>
        <div style={{background:"#fffbf5",padding:12,display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:"#b45309",marginBottom:6,opacity:0.3}}/>
          <div style={{width:50,height:5,background:"#292524",borderRadius:1,marginBottom:3}}/>
          <div style={{width:35,height:3,background:"#a8a29e",borderRadius:1,marginBottom:8}}/>
          <div style={{width:40,height:12,background:"#292524",borderRadius:2}}/>
        </div>
      </div>;

    case "vertical-scroll":
      return <div style={{...s, background:"#fff",padding:10,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{width:70,height:4,background:"#1a1a1a",borderRadius:1,marginBottom:8}}/>
        <div style={{width:"100%",height:50,background:"#eee",borderRadius:3,marginBottom:4}}/>
        <div style={{width:60,height:3,background:"#999",borderRadius:1,marginBottom:8,fontStyle:"italic"}}/>
        <div style={{width:"100%",height:50,background:"#eee",borderRadius:3,marginBottom:4}}/>
        <div style={{width:50,height:3,background:"#999",borderRadius:1}}/>
      </div>;

    case "carousel-spotlight":
      return <div style={{...s, background:"#fafafa",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
        <div style={{width:60,height:4,background:"#1a1a1a",borderRadius:1,marginBottom:10}}/>
        <div style={{position:"relative",width:"85%",height:75,background:"#e8e8e8",borderRadius:6,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          <div style={{position:"absolute",left:-8,top:"50%",transform:"translateY(-50%)",width:16,height:16,borderRadius:"50%",background:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8}}>{"‹"}</div>
          <div style={{position:"absolute",right:-8,top:"50%",transform:"translateY(-50%)",width:16,height:16,borderRadius:"50%",background:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8}}>{"›"}</div>
        </div>
        <div style={{display:"flex",gap:3,marginTop:8}}>{[0,1,2,3].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:i===0?"#1a1a1a":"#ccc"}}/>)}</div>
      </div>;

    case "story-cards":
      return <div style={{...s, background:"#fffbf5",padding:10}}>
        <div style={{width:60,height:5,background:"#292524",borderRadius:1,marginBottom:8}}/>
        <div style={{height:55,background:"linear-gradient(180deg,rgba(200,180,150,0.3),rgba(0,0,0,0.4))",borderRadius:6,marginBottom:6,position:"relative"}}>
          <div style={{position:"absolute",bottom:6,left:8}}><div style={{width:50,height:4,background:"#fff",borderRadius:1,marginBottom:2}}/><div style={{width:35,height:3,background:"rgba(255,255,255,0.6)",borderRadius:1}}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[0,1].map(i=><div key={i} style={{height:40,background:"linear-gradient(180deg,rgba(200,180,150,0.2),rgba(0,0,0,0.3))",borderRadius:5}}/>)}
        </div>
      </div>;

    case "brutalist-bold":
      return <div style={{...s, background:"#fff",padding:10,borderBottom:"3px solid #000"}}>
        <div style={{fontFamily:"Oswald,sans-serif",fontSize:28,fontWeight:900,lineHeight:0.85,color:"#000",textTransform:"uppercase" as const,marginBottom:6}}>EV</div>
        <div style={{width:80,height:2,background:"#000",marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:3,height:70}}>
          <div style={{background:"#e0e0e0",filter:"grayscale(1)"}}/>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <div style={{flex:1,background:"#e0e0e0",filter:"grayscale(1)"}}/>
            <div style={{flex:1,background:"#e0e0e0",filter:"grayscale(1)"}}/>
          </div>
        </div>
      </div>;

    // SPORTS
    case "sports-action":
      return <div style={{...s, background:"#111",padding:10}}>
        <div style={{width:70,height:6,background:"#00ff88",borderRadius:1,marginBottom:4}}/>
        <div style={{width:45,height:3,background:"rgba(0,255,136,0.3)",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,transform:"skewY(-2deg)"}}>
          {[0,1,2,3].map(i=><div key={i} style={{height:35,background:"rgba(0,255,136,0.08)",borderRadius:2,border:"1px solid rgba(0,255,136,0.15)"}}/>)}
        </div>
      </div>;

    case "sports-editorial":
      return <div style={{...s, background:"#fff",padding:10}}>
        <div style={{height:60,background:"#f0f0f0",borderRadius:4,marginBottom:6,position:"relative"}}>
          <div style={{position:"absolute",bottom:4,left:6}}><div style={{width:50,height:5,background:"#1a1a1a",borderRadius:1}}/></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:3}}>
          {[0,1,2].map(i=><div key={i} style={{height:30,background:"#f5f5f5",borderRadius:3}}/>)}
        </div>
      </div>;

    // ENGAGEMENT
    case "engagement-blush":
      return <div style={{...s, background:"#fff1f2",padding:10,textAlign:"center"}}>
        <div style={{width:60,height:5,background:"#e11d48",borderRadius:1,margin:"0 auto 4px",opacity:0.7}}/>
        <div style={{width:40,height:3,background:"#fda4af",borderRadius:1,margin:"0 auto 10px"}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,height:80}}>
          {[0,1].map(i=><div key={i} style={{background:"rgba(225,29,72,0.08)",borderRadius:8,border:"1px solid rgba(225,29,72,0.1)"}}/>)}
        </div>
      </div>;

    case "engagement-elegant":
      return <div style={{...s, background:"#fffbf5",padding:10}}>
        <div style={{textAlign:"center",marginBottom:8}}><div style={{width:60,height:5,background:"#44403c",borderRadius:1,margin:"0 auto 3px"}}/><div style={{width:40,height:3,background:"#b45309",borderRadius:1,margin:"0 auto",opacity:0.5}}/></div>
        <div style={{height:70,background:"rgba(180,83,9,0.06)",borderRadius:6,border:"1px solid rgba(180,83,9,0.1)"}}/>
      </div>;

    // FAMILY
    case "family-warm":
      return <div style={{...s, background:"#fdf6e3",padding:10}}>
        <div style={{width:60,height:5,background:"#3d3229",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
          {[0,1,2,3,4,5].map(i=><div key={i} style={{height:30,background:"rgba(194,65,12,0.08)",borderRadius:6,border:"1px solid rgba(194,65,12,0.12)"}}/>)}
        </div>
      </div>;

    case "family-modern":
      return <div style={{...s, background:"#fff",padding:10}}>
        <div style={{display:"flex",gap:6,marginBottom:8}}><div style={{width:20,height:20,borderRadius:"50%",background:"#e0e7ff"}}/><div style={{flex:1}}><div style={{width:50,height:4,background:"#1a1a1a",borderRadius:1,marginBottom:3}}/><div style={{width:70,height:3,background:"#ccc",borderRadius:1}}/></div></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[0,1,2,3].map(i=><div key={i} style={{height:35,background:"#f5f7ff",borderRadius:6}}/>)}
        </div>
      </div>;

    // CORPORATE
    case "corporate-suite":
      return <div style={{...s, background:"#0f172a",padding:10}}>
        <div style={{width:60,height:5,background:"#94a3b8",borderRadius:1,marginBottom:3}}/>
        <div style={{width:40,height:3,background:"rgba(148,163,184,0.3)",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[0,1,2,3].map(i=><div key={i} style={{height:35,background:"rgba(148,163,184,0.08)",borderRadius:3,border:"1px solid rgba(148,163,184,0.1)"}}/>)}
        </div>
      </div>;

    case "corporate-pro":
      return <div style={{...s, background:"#f8fafc",padding:10}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><div style={{width:50,height:5,background:"#1e293b",borderRadius:1}}/><div style={{width:30,height:12,background:"#2563eb",borderRadius:3}}/></div>
        <div style={{height:30,background:"#e2e8f0",borderRadius:4,marginBottom:4}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:3}}>
          {[0,1,2].map(i=><div key={i} style={{height:30,background:"#eef2ff",borderRadius:4}}/>)}
        </div>
      </div>;

    // HOLIDAY SEASON
    case "holiday-hearth":
      return <div style={{...s, background:"#7f1d1d",padding:10}}>
        <div style={{border:"1px solid #d4af37",borderRadius:4,padding:8,marginBottom:6}}>
          <div style={{width:60,height:5,background:"#d4af37",borderRadius:1,marginBottom:3}}/><div style={{width:40,height:3,background:"rgba(212,175,55,0.4)",borderRadius:1}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:3}}>
          {[0,1,2].map(i=><div key={i} style={{height:30,background:"rgba(212,175,55,0.1)",borderRadius:3,border:"1px solid rgba(212,175,55,0.2)"}}/>)}
        </div>
      </div>;

    case "golden-feast":
      return <div style={{...s, background:"#fffbeb",padding:10}}>
        <div style={{width:60,height:5,background:"#92400e",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
          {[0,1,2].map(i=><div key={i} style={{height:40,background:"rgba(146,64,14,0.06)",borderRadius:4,border:"1px solid rgba(146,64,14,0.1)",boxShadow:"2px 2px 0 rgba(146,64,14,0.05)"}}/>)}
        </div>
      </div>;

    // HOLIDAY
    case "holiday-festive":
      return <div style={{...s, background:"#fff",padding:10,position:"relative",overflow:"hidden"}}>
        <div style={{width:80,height:7,background:"linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#3b82f6)",borderRadius:2,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[0,1,2,3].map(i=><div key={i} style={{height:30,background:["#fef2f2","#fffbeb","#f0fdf4","#eff6ff"][i],borderRadius:6,border:`1px solid ${["#fca5a5","#fcd34d","#86efac","#93c5fd"][i]}`}}/>)}
        </div>
      </div>;

    case "holiday-elegant":
      return <div style={{...s, background:"#fef3c7",padding:10}}>
        <div style={{textAlign:"center",marginBottom:8}}><div style={{width:50,height:5,background:"#92400e",borderRadius:1,margin:"0 auto 3px"}}/></div>
        <div style={{height:60,background:"linear-gradient(180deg,rgba(146,64,14,0.05),rgba(146,64,14,0.15))",borderRadius:6,border:"1px solid rgba(212,175,55,0.3)"}}/>
      </div>;

    // WINTER
    case "winter-frozen":
      return <div style={{...s, background:"#f0f9ff",padding:10}}>
        <div style={{background:"rgba(255,255,255,0.7)",backdropFilter:"blur(4px)",borderRadius:6,padding:8,marginBottom:6,border:"1px solid rgba(14,165,233,0.15)"}}>
          <div style={{width:60,height:5,background:"#0c4a6e",borderRadius:1,marginBottom:2}}/><div style={{width:40,height:3,background:"#0ea5e9",borderRadius:1,opacity:0.5}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[0,1].map(i=><div key={i} style={{height:40,background:"rgba(14,165,233,0.06)",borderRadius:6,border:"1px solid rgba(14,165,233,0.1)"}}/>)}
        </div>
      </div>;

    case "winter-cozy":
      return <div style={{...s, background:"#1c1917",padding:10}}>
        <div style={{width:60,height:5,background:"#f59e0b",borderRadius:1,marginBottom:3}}/><div style={{width:40,height:3,background:"rgba(245,158,11,0.3)",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[0,1,2,3].map(i=><div key={i} style={{height:30,background:"rgba(245,158,11,0.06)",borderRadius:3,border:"1px solid rgba(245,158,11,0.1)"}}/>)}
        </div>
      </div>;

    // SUMMER
    case "summer-beach":
      return <div style={{...s, background:"#fef7ed",padding:10}}>
        <div style={{width:60,height:5,background:"#0d9488",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
          {[0,1,2,3,4,5].map(i=><div key={i} style={{height:28,background:"rgba(13,148,136,0.06)",borderRadius:12,border:"1px solid rgba(13,148,136,0.12)"}}/>)}
        </div>
        <div style={{height:3,background:"linear-gradient(90deg,#0d9488,transparent)",borderRadius:2,marginTop:8,opacity:0.3}}/>
      </div>;

    case "summer-golden":
      return <div style={{...s, background:"linear-gradient(180deg,#fcd34d,#f97316,#ec4899)",padding:10}}>
        <div style={{width:60,height:5,background:"rgba(255,255,255,0.9)",borderRadius:1,marginBottom:3}}/><div style={{width:40,height:3,background:"rgba(255,255,255,0.5)",borderRadius:1,marginBottom:8}}/>
        <div style={{height:60,background:"rgba(255,255,255,0.15)",borderRadius:8,boxShadow:"0 0 20px rgba(249,115,22,0.3)"}}/>
      </div>;

    // SPRING
    case "spring-blossom":
      return <div style={{...s, background:"#fdf2f8",padding:10}}>
        <div style={{width:60,height:5,background:"#e11d48",borderRadius:1,opacity:0.6,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
          {[0,1,2,3,4,5].map(i=><div key={i} style={{height:28,background:"rgba(225,29,72,0.04)",borderRadius:"50%/40%",border:"1px solid rgba(225,29,72,0.08)"}}/>)}
        </div>
      </div>;

    case "spring-fresh":
      return <div style={{...s, background:"#f0fdf4",padding:10}}>
        <div style={{width:60,height:6,background:"#059669",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:3}}>
          {[0,1,2,3,4,5].map(i=><div key={i} style={{height:30,background:"rgba(5,150,105,0.06)",borderRadius:4,border:"1px solid rgba(5,150,105,0.1)"}}/>)}
        </div>
      </div>;

    // FALL
    case "fall-warmth":
      return <div style={{...s, background:"#451a03",padding:10}}>
        <div style={{width:60,height:5,background:"#fef3c7",borderRadius:1,marginBottom:3}}/><div style={{width:40,height:3,background:"#c2410c",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[0,1,2,3].map(i=><div key={i} style={{height:35,background:"rgba(254,243,199,0.06)",borderRadius:3,border:"1px solid rgba(194,65,12,0.15)"}}/>)}
        </div>
      </div>;

    case "fall-palette":
      return <div style={{...s, background:"#fffbeb",padding:10}}>
        <div style={{height:4,background:"linear-gradient(90deg,#ea580c,#dc2626,#d4af37)",borderRadius:2,marginBottom:8}}/>
        <div style={{width:60,height:5,background:"#292524",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"flex",gap:3,overflowX:"hidden"}}>
          {[0,1,2,3,4].map(i=><div key={i} style={{minWidth:50,height:60,background:"rgba(234,88,12,0.05)",borderRadius:4,border:"1px solid rgba(234,88,12,0.1)"}}/>)}
        </div>
      </div>;

    // PORTRAITS
    case "portrait-studio":
      return <div style={{...s, background:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:10}}>
        <div style={{width:50,height:60,background:"#f5f5f5",borderRadius:4,boxShadow:"0 0 20px rgba(0,0,0,0.08), 0 0 40px rgba(0,0,0,0.04)",marginBottom:8}}/>
        <div style={{width:60,height:4,background:"#1a1a1a",borderRadius:1,marginBottom:3}}/><div style={{width:40,height:3,background:"#ccc",borderRadius:1}}/>
      </div>;

    case "portrait-headshot":
      return <div style={{...s, background:"#f1f3f6",padding:10}}>
        <div style={{width:50,height:5,background:"#1e293b",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginBottom:6}}>
          {[0,1,2,3].map(i=><div key={i} style={{height:30,background:"#e2e8f0",borderRadius:4}}/>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:3}}>
          {[0,1,2].map(i=><div key={i} style={{height:20,background:i===1?"#2563eb":"#e2e8f0",borderRadius:4,opacity:i===1?0.15:1}}/>)}
        </div>
      </div>;

    // STREET
    case "street-gritty":
      return <div style={{...s, background:"#1a1a1a",padding:10}}>
        <div style={{width:80,height:8,background:"#fff",borderRadius:1,marginBottom:3}}/><div style={{width:50,height:3,background:"rgba(255,255,255,0.2)",borderRadius:1,marginBottom:8}}/>
        <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:3,height:70}}>
          <div style={{background:"rgba(255,255,255,0.05)",borderRadius:2}}/>
          <div style={{display:"flex",flexDirection:"column",gap:3}}><div style={{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:2}}/><div style={{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:2}}/></div>
        </div>
      </div>;

    case "street-neon":
      return <div style={{...s, background:"#0a0a0a",padding:10}}>
        <div style={{width:60,height:6,background:"#22d3ee",borderRadius:1,marginBottom:3,boxShadow:"0 0 8px rgba(34,211,238,0.4)"}}/><div style={{width:40,height:3,background:"#f472b6",borderRadius:1,marginBottom:8,boxShadow:"0 0 6px rgba(244,114,182,0.3)"}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {[0,1,2,3].map(i=><div key={i} style={{height:30,background:"rgba(34,211,238,0.04)",borderRadius:3,border:`1px solid ${i%2===0?"rgba(34,211,238,0.2)":"rgba(244,114,182,0.2)"}`}}/>)}
        </div>
      </div>;

    default:
      return <div style={{...s, background:"#f5f5f5",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#999",fontSize:11}}>Preview</span></div>;
  }
}

// ─── Main Component ───
export function TemplatePicker({
  currentTemplate,
  currentColorScheme,
  currentFontPairing,
  onSave,
}: TemplatePickerProps) {
  const [selected, setSelected] = useState(currentTemplate);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Preview modal state
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<PreviewProfileData | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Color scheme & font pairing state
  const [colorScheme, setColorScheme] = useState(currentColorScheme || "light");
  const [fontPairing, setFontPairing] = useState(currentFontPairing || "modern");

  // ─── Fetch photographer profile data for preview ───
  const fetchProfileData = useCallback(async () => {
    setPreviewLoading(true);
    try {
      const [configRes, portfolioRes] = await Promise.all([
        api.get<{
          slug: string;
          tagline: string;
          specialties: string;
          pricing: string;
          design: string;
        }>("/photographers/config"),
        api.get<{ photos: { id: string; url: string; filename: string }[] }>(
          "/photographers/portfolio"
        ),
      ]);

      let pricing = {};
      try {
        pricing = JSON.parse(configRes.pricing || "{}");
      } catch {}

      const photos =
        portfolioRes.photos && portfolioRes.photos.length > 0
          ? portfolioRes.photos
          : PLACEHOLDER_PHOTOS;

      const specialties = configRes.specialties
        ? configRes.specialties
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : ["Photography"];

      setProfileData({
        name: configRes.slug
          ? configRes.slug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" ")
          : "Your Name",
        tagline: configRes.tagline || "Capturing moments that matter",
        specialties,
        bio: "Professional photographer with a passion for capturing life's most meaningful moments. Every photo tells a story, and I'm here to tell yours.",
        website: "",
        serviceArea: "",
        verified: false,
        pricing: pricing as PreviewProfileData["pricing"],
        portfolio: photos,
      });
    } catch {
      // Use full placeholder data if API fails
      setProfileData({
        name: "Your Name",
        tagline: "Capturing moments that matter",
        specialties: ["Photography", "Portraits", "Events"],
        bio: "Professional photographer with a passion for capturing life's most meaningful moments.",
        website: "",
        serviceArea: "",
        verified: false,
        pricing: {},
        portfolio: PLACEHOLDER_PHOTOS,
      });
    } finally {
      setPreviewLoading(false);
    }
  }, []);

  // Fetch profile data when preview modal opens
  useEffect(() => {
    if (previewId && !profileData) {
      fetchProfileData();
    }
  }, [previewId, profileData, fetchProfileData]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (previewId) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [previewId]);

  // ─── Handle save with color scheme and font pairing ───
  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg(false);
    try {
      await onSave(selected, colorScheme, fontPairing);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch {
      // parent handles errors
    } finally {
      setSaving(false);
    }
  };

  // ─── Handle "Use This Template" from preview modal ───
  const handleUseTemplate = () => {
    if (previewId) {
      setSelected(previewId);
      setPreviewId(null);
    }
  };

  // Get current color scheme and font pairing objects
  const schemes = COLOR_SCHEMES.default!;
  const currentScheme = schemes.find((s) => s.key === colorScheme) ?? schemes[0]!;
  const currentFont =
    FONT_PAIRINGS.find((f) => f.key === fontPairing) ?? FONT_PAIRINGS[0]!;

  // Find the template info for preview
  const previewTemplate = previewId
    ? TEMPLATE_REGISTRY.find((t) => t.id === previewId)
    : null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-neutral-900">Template</h3>
      <p className="mt-1 text-sm text-neutral-500">
        Choose a layout template for your public photographer profile page.
      </p>

      {/* Template grid - grouped by category */}
      {CATEGORY_GROUPS.map((group) => {
        const groupTemplates = TEMPLATE_REGISTRY.filter((t) =>
          group.categories.includes(t.category)
        );
        if (groupTemplates.length === 0) return null;
        return (
          <div key={group.label} className="mt-8 first:mt-5">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>
            {/* Cards */}
            <div className="flex flex-wrap gap-4">
              {groupTemplates.map((t) => {
                const isSelected = selected === t.id;
                return (
                  <div
                    key={t.id}
                    className={cn(
                      "group relative overflow-hidden transition-all bg-white",
                      isSelected
                        ? "ring-2 ring-primary-600 shadow-md"
                        : "ring-1 ring-neutral-200 hover:shadow-md"
                    )}
                    style={{ width: 220, borderRadius: 10 }}
                  >
                    <button
                      onClick={() => setSelected(t.id)}
                      className="w-full text-left"
                    >
                      {renderMiniMockup(t.id)}
                      <div className="px-3 pt-2.5 pb-3">
                        <p className="text-[13px] font-semibold text-neutral-900 leading-tight">
                          {t.name}
                        </p>
                        <p className="mt-1 text-[11px] leading-snug text-neutral-500 line-clamp-2">
                          {t.description}
                        </p>
                      </div>
                    </button>
                    {/* Preview button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewId(t.id);
                      }}
                      className="absolute bottom-3 right-3 text-[11px] font-medium text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-neutral-800"
                    >
                      Preview &#8599;
                    </button>
                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-white text-xs">
                        &#10003;
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ─── Customization Section (visible when a template is selected) ─── */}
      {selected && (
        <div className="mt-8 rounded-xl border border-border bg-white p-6">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-400">
            Customization
          </div>
          <p className="text-sm font-semibold text-neutral-900">
            Selected:{" "}
            {TEMPLATE_REGISTRY.find((t) => t.id === selected)?.name ||
              selected}
          </p>

          {/* Color Scheme */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-neutral-700">
              Color Scheme
            </label>
            <div className="mt-2 flex flex-wrap gap-3">
              {schemes.map((scheme) => {
                const active = colorScheme === scheme.key;
                return (
                  <button
                    key={scheme.key}
                    onClick={() => setColorScheme(scheme.key)}
                    className="flex items-center gap-2 group/swatch"
                    title={scheme.name}
                  >
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full border-2 transition-all",
                        active
                          ? "border-primary-600 ring-2 ring-primary-200 scale-110"
                          : "border-neutral-300 hover:border-neutral-400"
                      )}
                      style={{ backgroundColor: scheme.bg }}
                    >
                      {/* Inner accent dot */}
                      <div
                        className="mx-auto mt-1.5 h-2 w-2 rounded-full"
                        style={{ backgroundColor: scheme.accent }}
                      />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        active ? "text-neutral-900" : "text-neutral-500"
                      )}
                    >
                      {scheme.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Pairing */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-neutral-700">
              Font Pairing
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {FONT_PAIRINGS.map((fp) => {
                const active = fontPairing === fp.key;
                return (
                  <button
                    key={fp.key}
                    onClick={() => setFontPairing(fp.key)}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                      active
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
                    )}
                  >
                    {fp.name}{" "}
                    <span className="text-neutral-400">({fp.heading})</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Save button and success message */}
      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={
            saving ||
            (selected === currentTemplate &&
              colorScheme === (currentColorScheme || "light") &&
              fontPairing === (currentFontPairing || "modern"))
          }
          className="rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Template"}
        </button>
        {successMsg && (
          <span className="text-sm font-medium text-emerald-600">
            Template saved successfully.
          </span>
        )}
      </div>

      {/* ─── Preview Modal ─── */}
      {previewId && (
        <div className="fixed inset-0 z-50 flex flex-col">
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPreviewId(null)}
          />

          {/* Modal content */}
          <div className="relative z-10 flex h-full flex-col">
            {/* Fixed header */}
            <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-neutral-900">
                  {previewTemplate?.name || "Template Preview"}
                </h2>
                {previewTemplate && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      CATEGORY_BADGE_COLORS[previewTemplate.category] ||
                        "bg-neutral-100 text-neutral-600"
                    )}
                  >
                    {previewTemplate.category}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleUseTemplate}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Use This Template
                </button>
                <button
                  onClick={() => setPreviewId(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                  aria-label="Close preview"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable template render area */}
            <div className="flex-1 overflow-y-auto bg-neutral-100">
              {previewLoading || !profileData ? (
                <div className="flex items-center justify-center py-32">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
                    <p className="text-sm text-neutral-500">
                      Loading preview...
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  style={
                    {
                      "--theme-bg": currentScheme.bg,
                      "--theme-text": currentScheme.text,
                      "--theme-accent": currentScheme.accent,
                      "--theme-heading-font": currentFont.heading,
                      "--theme-body-font": currentFont.body,
                    } as React.CSSProperties
                  }
                >
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center py-32">
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
                          <p className="text-sm text-neutral-500">
                            Loading template...
                          </p>
                        </div>
                      </div>
                    }
                  >
                    <PreviewRenderer
                      templateId={previewId}
                      profileData={profileData}
                    />
                  </Suspense>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Preview Renderer (separate component for Suspense boundary) ───
function PreviewRenderer({
  templateId,
  profileData,
}: {
  templateId: string;
  profileData: PreviewProfileData;
}) {
  const TemplateComponent = templateComponents[templateId];

  if (!TemplateComponent) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm text-neutral-500">
          Template "{templateId}" not found.
        </p>
      </div>
    );
  }

  return (
    <TemplateComponent
      name={profileData.name}
      tagline={profileData.tagline}
      specialties={profileData.specialties}
      bio={profileData.bio}
      website={profileData.website}
      serviceArea={profileData.serviceArea}
      verified={profileData.verified}
      pricing={profileData.pricing}
      portfolio={profileData.portfolio}
      onHire={() => {}}
      onPhotoClick={() => {}}
    />
  );
}
