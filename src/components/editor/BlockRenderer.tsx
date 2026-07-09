import type { ContentBlock, HeroBlock, TextBlock, ImageBlock, GalleryBlock, ButtonBlock, ServicesBlock, PricingBlock, ColumnsBlock } from "./types";

interface BlockRendererProps {
  blocks: ContentBlock[];
  galleries?: Array<{ id: string; name: string; photos?: Array<{ url: string; filename: string }> }>;
  editable?: boolean;
  onEditBlock?: (index: number, block: ContentBlock) => void;
}

export function BlockRenderer({ blocks, galleries = [], editable, onEditBlock }: BlockRendererProps) {
  if (!blocks?.length) return null;

  return (
    <div className="block-content">
      {blocks.map((block, i) => (
        <div key={block.id} className={editable ? "group relative hover:ring-2 hover:ring-primary-300 hover:ring-offset-2 rounded-lg transition-all" : ""}
          onClick={editable && onEditBlock ? () => onEditBlock(i, block) : undefined}>
          {editable && (
            <div className="absolute -top-3 -right-3 z-10 rounded-full bg-primary-600 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {block.type}
            </div>
          )}

          {block.type === "hero" && <HeroBlockView block={block as HeroBlock} />}
          {block.type === "text" && <TextBlockView block={block as TextBlock} />}
          {block.type === "image" && <ImageBlockView block={block as ImageBlock} />}
          {block.type === "gallery" && <GalleryBlockView block={block as GalleryBlock} galleries={galleries} />}
          {block.type === "button" && <ButtonBlockView block={block as ButtonBlock} />}
          {block.type === "services" && <ServicesBlockView block={block as ServicesBlock} />}
          {block.type === "pricing" && <PricingBlockView block={block as PricingBlock} />}
          {block.type === "divider" && <hr className="my-12 border-neutral-200" />}
          {block.type === "columns" && <ColumnsBlockView block={block as ColumnsBlock} />}
        </div>
      ))}
    </div>
  );
}

function HeroBlockView({ block }: { block: HeroBlock }) {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center bg-neutral-900 text-center text-white"
      style={block.data.imageUrl ? { backgroundImage: `url(${block.data.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
      {block.data.imageUrl && <div className="absolute inset-0 bg-black/50" />}
      <div className="relative z-10 max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl font-bold sm:text-6xl">{block.data.heading || "Welcome"}</h1>
        {block.data.subheading && <p className="mt-4 text-xl text-white/80">{block.data.subheading}</p>}
      </div>
    </section>
  );
}

function TextBlockView({ block }: { block: TextBlock }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: block.data.html }} />
      </div>
    </section>
  );
}

function ImageBlockView({ block }: { block: ImageBlock }) {
  return (
    <section className={block.data.fullWidth ? "" : "py-8"}>
      <div className={block.data.fullWidth ? "" : "mx-auto max-w-5xl px-4 sm:px-6"}>
        <figure>
          <img src={block.data.url} alt={block.data.alt || ""} className="w-full rounded-xl object-cover" />
          {block.data.caption && <figcaption className="mt-2 text-center text-sm text-neutral-500">{block.data.caption}</figcaption>}
        </figure>
      </div>
    </section>
  );
}

function GalleryBlockView({ block, galleries }: { block: GalleryBlock; galleries: BlockRendererProps["galleries"] }) {
  const gallery = galleries?.find(g => g.id === block.data.galleryId);
  if (!gallery?.photos?.length) return null;
  const cols = block.data.columns || 3;
  return (
    <section className="py-12 sm:py-16 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {gallery.name && <h2 className="mb-6 font-display text-2xl font-bold text-neutral-900">{gallery.name}</h2>}
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {gallery.photos.map((p, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg bg-neutral-200">
              <img src={p.url} alt={p.filename || ""} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ButtonBlockView({ block }: { block: ButtonBlock }) {
  return (
    <section className="py-8 text-center">
      <a href={block.data.url || "#"} target="_blank" rel="noopener noreferrer"
        className="inline-block rounded-lg bg-primary-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-primary-700">
        {block.data.label || "Learn More"}
      </a>
    </section>
  );
}

function ServicesBlockView({ block }: { block: ServicesBlock }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {block.data.items.map((item, i) => (
            <div key={i} className="rounded-xl border border-border bg-white p-6 text-center">
              <h3 className="font-semibold text-neutral-900">{item.name}</h3>
              {item.description && <p className="mt-2 text-sm text-neutral-500">{item.description}</p>}
              {item.price && <p className="mt-3 text-lg font-bold text-primary-600">{item.price}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingBlockView({ block }: { block: PricingBlock }) {
  return (
    <section className="py-12 sm:py-16 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {block.data.heading && <h2 className="mb-8 text-center font-display text-3xl font-bold text-neutral-900">{block.data.heading}</h2>}
        <div className="grid gap-6 sm:grid-cols-3">
          {block.data.items.map((item, i) => (
            <div key={i} className="rounded-xl border border-border bg-white p-8 text-center">
              <h3 className="text-lg font-semibold text-neutral-900">{item.name}</h3>
              <p className="mt-4 text-4xl font-bold text-primary-600">{item.price}</p>
              {item.features && item.features.length > 0 && (
                <ul className="mt-6 space-y-2 text-sm text-neutral-500">
                  {item.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ColumnsBlockView({ block }: { block: ColumnsBlock }) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${block.data.columns}, 1fr)` }}>
          {block.data.blocks.map((colBlocks, ci) => (
            <div key={ci}>
              <BlockRenderer blocks={colBlocks} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
