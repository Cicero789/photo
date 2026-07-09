import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import type { ContentBlock, BlockType, HeroBlock, TextBlock, GalleryBlock, ButtonBlock, ServicesBlock, PricingBlock } from "./types";

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  galleries?: { id: string; name: string; photoCount: number }[];
}

const BLOCK_TYPES: { type: BlockType; label: string; icon: string }[] = [
  { type: "hero", label: "Hero", icon: "🖼" },
  { type: "text", label: "Text", icon: "📝" },
  { type: "image", label: "Image", icon: "📷" },
  { type: "gallery", label: "Gallery", icon: "🖼️" },
  { type: "button", label: "Button", icon: "🔘" },
  { type: "services", label: "Services", icon: "📋" },
  { type: "pricing", label: "Pricing", icon: "💲" },
  { type: "divider", label: "Divider", icon: "⏤" },
  { type: "columns", label: "Columns", icon: "▦" },
];

function makeBlock(type: BlockType): ContentBlock {
  const id = crypto.randomUUID();
  switch (type) {
    case "hero": return { id, type, data: { heading: "Welcome", subheading: "", imageUrl: "" } } as HeroBlock;
    case "text": return { id, type, data: { html: "<p>Write your content here...</p>" } } as TextBlock;
    case "image": return { id, type, data: { url: "", alt: "", caption: "" } } as ContentBlock;
    case "gallery": return { id, type, data: { galleryId: "", layout: "grid", columns: 3 } } as GalleryBlock;
    case "button": return { id, type, data: { label: "Learn More", url: "", style: "primary" } } as ButtonBlock;
    case "services": return { id, type, data: { items: [{ name: "Service 1", description: "", price: "" }] } } as ServicesBlock;
    case "pricing": return { id, type, data: { heading: "Pricing", items: [{ name: "Basic", price: "$99", features: [] }] } } as PricingBlock;
    case "divider": return { id, type, data: {} } as ContentBlock;
    case "columns": return { id, type, data: { columns: 2, blocks: [[], []] } } as ContentBlock;
  }
}

export function BlockEditor({ blocks, onChange, galleries = [] }: BlockEditorProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const addBlock = (type: BlockType, index: number) => {
    const block = makeBlock(type);
    const next = [...blocks];
    next.splice(index + 1, 0, block);
    onChange(next);
  };

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const updateBlock = (index: number, data: Record<string, unknown>) => {
    const next = [...blocks];
    next[index] = { ...next[index]!, data: { ...next[index]!.data, ...data } };
    onChange(next);
  };

  const moveBlock = (from: number, to: number) => {
    if (to < 0 || to >= blocks.length) return;
    const next = [...blocks];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved!);
    onChange(next);
    setDragIdx(null);
  };

  return (
    <div className="space-y-3">
      {blocks.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-neutral-300 p-12 text-center">
          <p className="text-3xl mb-3">🏗</p>
          <p className="text-sm font-medium text-neutral-700">Start building your page</p>
          <p className="mt-1 text-xs text-neutral-400">Click any block type below to add it</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {BLOCK_TYPES.map(bt => (
              <button key={bt.type} onClick={() => addBlock(bt.type, -1)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-600 hover:border-primary-300 hover:text-primary-600 transition-colors">
                {bt.icon} {bt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {blocks.map((block, i) => (
        <div key={block.id} className="group relative rounded-xl border border-neutral-200 bg-white">
          {/* Block controls */}
          <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50 px-3 py-1.5">
            <div className="flex items-center gap-2">
              <button onClick={() => { setDragIdx(i); }}
                className="cursor-grab text-xs text-neutral-400 hover:text-neutral-600" title="Drag to reorder">⋮⋮</button>
              <span className="text-xs font-medium text-neutral-500">{BLOCK_TYPES.find(bt => bt.type === block.type)?.icon} {block.type}</span>
            </div>
            <button onClick={() => removeBlock(i)} className="text-xs text-neutral-400 hover:text-red-500">✕</button>
          </div>

          {/* Drag reorder UI */}
          {dragIdx !== null && dragIdx !== i && (
            <button onClick={() => moveBlock(dragIdx!, i)}
              className="w-full border-b border-dashed border-primary-300 bg-primary-50 py-1.5 text-center text-xs text-primary-600">
              Drop here
            </button>
          )}

          {/* Block content */}
          <div className="p-4">
            {block.type === "hero" && (
              <div className="space-y-3">
                <input value={(block.data as HeroBlock["data"]).heading || ""} placeholder="Heading"
                  onChange={e => updateBlock(i, { heading: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-lg font-bold" />
                <input value={(block.data as HeroBlock["data"]).subheading || ""} placeholder="Subheading (optional)"
                  onChange={e => updateBlock(i, { subheading: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </div>
            )}

            {block.type === "text" && (
              <RichTextEditor content={(block.data as TextBlock["data"]).html || ""}
                onChange={html => updateBlock(i, { html })} placeholder="Write your content..." minHeight="150px" />
            )}

            {block.type === "gallery" && (
              <div>
                <select value={(block.data as GalleryBlock["data"]).galleryId || ""}
                  onChange={e => updateBlock(i, { galleryId: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm">
                  <option value="">Select a gallery...</option>
                  {galleries.map(g => <option key={g.id} value={g.id}>{g.name} ({g.photoCount} photos)</option>)}
                </select>
              </div>
            )}

            {block.type === "button" && (
              <div className="flex gap-2">
                <input value={(block.data as ButtonBlock["data"]).label || ""} placeholder="Button text"
                  onChange={e => updateBlock(i, { label: e.target.value })}
                  className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
                <input value={(block.data as ButtonBlock["data"]).url || ""} placeholder="URL"
                  onChange={e => updateBlock(i, { url: e.target.value })}
                  className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </div>
            )}

            {block.type === "services" && (
              <div className="space-y-2">
                {(block.data as ServicesBlock["data"]).items.map((item, si) => (
                  <div key={si} className="flex gap-2">
                    <input value={item.name} placeholder="Service name"
                      onChange={e => { const items = [...((block.data as ServicesBlock["data"]).items)]; items[si] = { ...items[si]!, name: e.target.value }; updateBlock(i, { items }); }}
                      className="flex-1 rounded border border-neutral-200 px-2 py-1 text-sm" />
                    <input value={item.price || ""} placeholder="Price"
                      onChange={e => { const items = [...((block.data as ServicesBlock["data"]).items)]; items[si] = { ...items[si]!, price: e.target.value }; updateBlock(i, { items }); }}
                      className="w-24 rounded border border-neutral-200 px-2 py-1 text-sm" />
                    <button onClick={() => { const items = ((block.data as ServicesBlock["data"]).items).filter((_, j) => j !== si); updateBlock(i, { items }); }}
                      className="text-xs text-red-400">✕</button>
                  </div>
                ))}
                <button onClick={() => { const items = [...((block.data as ServicesBlock["data"]).items), { name: "", description: "", price: "" }]; updateBlock(i, { items }); }}
                  className="text-xs text-primary-600 hover:underline">+ Add service</button>
              </div>
            )}

            {block.type === "pricing" && (
              <div className="space-y-2">
                <input value={(block.data as PricingBlock["data"]).heading || ""} placeholder="Pricing heading"
                  onChange={e => updateBlock(i, { heading: e.target.value })}
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-lg font-bold" />
                {(block.data as PricingBlock["data"]).items.map((item, si) => (
                  <div key={si} className="flex gap-2">
                    <input value={item.name} placeholder="Plan name"
                      onChange={e => { const items = [...((block.data as PricingBlock["data"]).items)]; items[si] = { ...items[si]!, name: e.target.value }; updateBlock(i, { items }); }}
                      className="flex-1 rounded border border-neutral-200 px-2 py-1 text-sm" />
                    <input value={item.price} placeholder="$99"
                      onChange={e => { const items = [...((block.data as PricingBlock["data"]).items)]; items[si] = { ...items[si]!, price: e.target.value }; updateBlock(i, { items }); }}
                      className="w-24 rounded border border-neutral-200 px-2 py-1 text-sm" />
                    <button onClick={() => { const items = ((block.data as PricingBlock["data"]).items).filter((_, j) => j !== si); updateBlock(i, { items }); }}
                      className="text-xs text-red-400">✕</button>
                  </div>
                ))}
                <button onClick={() => { const items = [...((block.data as PricingBlock["data"]).items), { name: "", price: "", features: [] }]; updateBlock(i, { items }); }}
                  className="text-xs text-primary-600 hover:underline">+ Add plan</button>
              </div>
            )}

            {block.type === "divider" && (
              <div className="py-2"><hr className="border-neutral-200" /></div>
            )}
          </div>

          {/* Add block button below each block */}
          <div className="border-t border-neutral-100 px-2 py-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex flex-wrap gap-1">
              {BLOCK_TYPES.map(bt => (
                <button key={bt.type} onClick={() => addBlock(bt.type, i)}
                  className="rounded px-2 py-0.5 text-xs text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors">
                  + {bt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
