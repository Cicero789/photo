import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { TemplatePicker } from "@/components/photographer/TemplatePicker";
import { normalizeTemplateId } from "@/lib/templateIds";

export function StudioTemplatesPage() {
  const [defaultTemplate, setDefaultTemplate] = useState("1-clean");
  const [sites, setSites] = useState<{ id: string; name: string; template: string }[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get<{ design?: string }>("/photographers/config").then(d => {
      const design = typeof d.design === "string" ? JSON.parse(d.design || "{}") : (d.design || {});
      if (design.defaultTemplate) setDefaultTemplate(normalizeTemplateId(design.defaultTemplate));
    }).catch(() => {});
    api.get<{ clients: any[] }>("/clients").then(d => {
      setSites((d.clients || []).map((c: any) => ({
        id: c.id, name: c.name,
        template: (() => { try { return JSON.parse(c.galleryConfig || "{}").template || "1-clean"; } catch { return "1-clean"; } })(),
      })));
    }).catch(() => {});
  }, []);

  const saveDefault = async (templateId: string) => {
    const existing = await api.get<{ design?: string }>("/photographers/config").then(d => {
      return typeof d.design === "string" ? JSON.parse(d.design || "{}") : (d.design || {});
    }).catch(() => ({}));
    existing.defaultTemplate = templateId;
    await api.put("/photographers/config", { design: JSON.stringify(existing) });
    setDefaultTemplate(templateId);
    setMsg("Default template saved! New sites will use this by default.");
    setTimeout(() => setMsg(""), 3000);
  };

  const applyToAll = async (templateId: string) => {
    await Promise.all(sites.map(s => api.put(`/clients/${s.id}`, { galleryConfig: JSON.stringify({ template: templateId }) })));
    setSites(prev => prev.map(s => ({ ...s, template: templateId })));
    setMsg(`Applied to all ${sites.length} sites!`);
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-neutral-900">Templates</h1>
      <p className="mt-1 text-sm text-neutral-500">Set defaults and manage templates across all client sites.</p>

      {msg && <div className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700">{msg}</div>}

      <section className="mt-8 rounded-xl border border-border bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Default Template</h2>
        <p className="mb-4 text-sm text-neutral-500">New client sites will start with this template. You can change it per site later.</p>
        <TemplatePicker currentTemplate={defaultTemplate} onSave={saveDefault} />
      </section>

      {sites.length > 0 && (
        <section className="mt-8 rounded-xl border border-border bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">Apply to Existing Sites</h2>
          <p className="mb-4 text-sm text-neutral-500">Pick a template and apply it to all client sites at once.</p>
          <div className="space-y-3">
            {["1-clean","2-cinematic","3-editorial","4-instagram","5-masonry","6-split","7-vertical","8-carousel","9-story-cards","10-brutalist"].map(id => (
              <button key={id} onClick={() => applyToAll(id)}
                className="mr-2 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:border-primary-300 hover:text-primary-600">
                Apply "{id}" to all {sites.length} sites
              </button>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-neutral-700">Current sites:</h3>
            <ul className="mt-2 space-y-1">
              {sites.map(s => (
                <li key={s.id} className="text-sm text-neutral-500">{s.name} → {s.template}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
