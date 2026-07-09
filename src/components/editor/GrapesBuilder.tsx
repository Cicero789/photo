/**
 * GrapesJS Visual Builder — drag-and-drop website builder for client sites.
 * Saves project JSON/HTML/CSS to D1. Supports R2 image upload.
 */
import { useEffect, useRef, useState } from "react";
import "grapesjs/dist/css/grapes.min.css";

interface GrapesBuilderProps {
  clientId: string;
  pageSlug?: string;
  onSave?: () => void;
}

const STARTER_HTML = (name: string) => `
<section style="padding:100px 20px;text-align:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff">
  <h1 style="font-size:3.5rem;font-weight:800;margin-bottom:16px;letter-spacing:-0.02em">${name || "Welcome"}</h1>
  <p style="font-size:1.3rem;opacity:0.9;max-width:600px;margin:0 auto 40px;line-height:1.6">Professional service you can trust. We deliver exceptional quality with every project.</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <a href="#" style="display:inline-block;padding:14px 36px;background:#fff;color:#667eea;border-radius:10px;text-decoration:none;font-weight:700;font-size:1.05rem">Get Started</a>
    <a href="#" style="display:inline-block;padding:14px 36px;border:2px solid rgba(255,255,255,0.5);color:#fff;border-radius:10px;text-decoration:none;font-weight:600;font-size:1.05rem">Learn More</a>
  </div>
</section>
<section style="padding:80px 20px;max-width:1200px;margin:0 auto">
  <div style="text-align:center;margin-bottom:60px">
    <p style="text-transform:uppercase;letter-spacing:0.15em;font-size:0.85rem;color:#667eea;font-weight:600;margin-bottom:8px">What We Do</p>
    <h2 style="font-size:2.5rem;font-weight:700;color:#1a1a1a">Our Services</h2>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:30px">
    <div style="padding:40px 28px;background:#fff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.06);text-align:center">
      <div style="width:64px;height:64px;background:#667eea15;border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px">🎯</div>
      <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;color:#1a1a1a">Service One</h3>
      <p style="color:#666;line-height:1.6;font-size:0.95rem">Professional service description highlighting key benefits and value for clients.</p>
    </div>
    <div style="padding:40px 28px;background:#fff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.06);text-align:center">
      <div style="width:64px;height:64px;background:#667eea15;border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px">⚡</div>
      <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;color:#1a1a1a">Service Two</h3>
      <p style="color:#666;line-height:1.6;font-size:0.95rem">Fast turnaround with uncompromising attention to detail and quality standards.</p>
    </div>
    <div style="padding:40px 28px;background:#fff;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.06);text-align:center">
      <div style="width:64px;height:64px;background:#667eea15;border-radius:16px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px">💎</div>
      <h3 style="font-size:1.2rem;font-weight:700;margin-bottom:8px;color:#1a1a1a">Service Three</h3>
      <p style="color:#666;line-height:1.6;font-size:0.95rem">Premium results backed by years of industry experience and happy clients.</p>
    </div>
  </div>
</section>
<section style="padding:80px 20px;background:#f8f9fa;text-align:center">
  <h2 style="font-size:2rem;font-weight:700;margin-bottom:16px;color:#1a1a1a">Ready to Get Started?</h2>
  <p style="color:#666;font-size:1.1rem;max-width:500px;margin:0 auto 32px">Contact us today for a free consultation.</p>
  <a href="#" style="display:inline-block;padding:14px 40px;background:#667eea;color:#fff;border-radius:10px;text-decoration:none;font-weight:700;font-size:1.05rem">Contact Us</a>
</section>
<footer style="padding:40px 20px;background:#1a1a2e;color:#a0a0b0;text-align:center;font-size:0.9rem">
  <p>&copy; 2026 ${name || "Your Business"}. All rights reserved.</p>
</footer>`;

export function GrapesBuilder({ clientId, pageSlug = "home", onSave }: GrapesBuilderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [siteName, setSiteName] = useState("Your Business");

  // Load site name + existing page data
  useEffect(() => {
    if (!clientId) return;
    const token = localStorage.getItem("photo_token");
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    // Get site name
    fetch(`/api/clients/${clientId}`, { headers }).then(r => r.json()).then(d => {
      if (d.client?.name) setSiteName(d.client.name);
    }).catch(() => {});

    // Load page data
    fetch(`/api/clients/${clientId}/pages/${pageSlug}`, { headers })
      .then(r => r.json()).then(d => {
        const data = d.page;
        initBuilder(data?.builder_json ? JSON.parse(data.builder_json) : null);
      }).catch(() => initBuilder(null));
  }, [clientId, pageSlug]);

  async function initBuilder(storedData: unknown) {
    if (!containerRef.current || editorRef.current) return;
    const grapesjs = (await import("grapesjs")).default;
    const presetWebpage = (await import("grapesjs-preset-webpage")).default;

    const editor = grapesjs.init({
      container: containerRef.current!,
      fromElement: false, height: "100%", width: "auto",
      storageManager: false,
      plugins: [presetWebpage],
      pluginsOpts: { "grapesjs-preset-webpage": {} },
      canvas: {
        styles: ["https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"],
      },
      // Custom R2 image upload
      assetManager: {
        uploadFile: async (e: any) => {
          const files = e.dataTransfer ? e.dataTransfer.files : e.target?.files;
          if (!files?.length) return;
          const form = new FormData();
          for (const f of files) form.append("photos", f);
          const token = localStorage.getItem("photo_token");
          const res = await fetch(`/api/clients/${clientId}/photos`, {
            method: "POST",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            body: form,
          });
          if (res.ok) {
            const data = await res.json();
            if (data.photos?.length) {
              editor.AssetManager.add(data.photos.map((p: any) => p.url));
            }
          }
        },
      },
    });

    if (storedData) {
      editor.loadProjectData(storedData as any);
    } else {
      editor.setComponents(STARTER_HTML(siteName));
    }

    editorRef.current = editor;
    setLoaded(true);
  }

  const handleSave = async () => {
    if (!editorRef.current) return;
    setSaving(true); setMessage("");
    try {
      const projectData = editorRef.current.getProjectData();
      const html = editorRef.current.getHtml();
      const css = editorRef.current.getCss();
      const token = localStorage.getItem("photo_token");
      const res = await fetch(`/api/clients/${clientId}/pages/${pageSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ builderJson: JSON.stringify(projectData), html, css, title: pageSlug }),
      });
      if (res.ok) {
        setMessage("✅ Saved! Live at /site/" + pageSlug);
        onSave?.();
      } else {
        const err = await res.json().catch(() => ({}));
        setMessage("❌ " + (err.error || "Save failed"));
      }
    } catch (err: any) { setMessage("❌ " + (err.message || "Error")); }
    setSaving(false);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-neutral-700">📐 Design Builder</h3>
          <span className="hidden sm:inline text-xs text-neutral-400">
            Drag blocks from the right panel. Images auto-upload to your library.
          </span>
        </div>
        <div className="flex items-center gap-3">
          {message && <span className={`text-xs font-medium ${message.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>{message}</span>}
          <button onClick={handleSave} disabled={saving || !loaded}
            className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 transition-colors">
            {saving ? "Saving..." : "Save Page"}
          </button>
        </div>
      </div>
      <div ref={containerRef} className="flex-1" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-600" />
            <p className="text-sm text-neutral-500">Loading visual builder...</p>
          </div>
        </div>
      )}
    </div>
  );
}
