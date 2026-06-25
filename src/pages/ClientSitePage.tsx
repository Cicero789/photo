import { Suspense, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { templateComponents } from "@/components/templates";
import { COLOR_SCHEMES, FONT_PAIRINGS } from "@/components/photographer/TemplatePicker";
import { PhotographerProfilePage } from "./PhotographerProfilePage";

// ─── Types ───
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: string;
  featuredImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ClientGallery {
  id: string;
  name: string;
  photoCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ContentSection {
  type: string;
  heading?: string;
  body?: string;
  url?: string;
  [key: string]: any;
}

interface ClientSiteData {
  id: string;
  name: string;
  slug: string;
  industryId: string;
  customDomain: string;
  published: boolean;
  content: { hero?: { heading?: string; subheading?: string; backgroundImage?: string }; sections?: ContentSection[]; [key: string]: any };
  galleryConfig: any;
  setupFeeCents: number;
  monthlyFeeCents: number;
  createdAt: string;
  updatedAt: string;
  blogs: BlogPost[];
  galleries: ClientGallery[];
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" />
    </div>
  );
}

// ─── Client Site Page ───
export function ClientSitePage() {
  const { slug } = useParams<{ slug: string }>();
  const [site, setSite] = useState<ClientSiteData | null | undefined>(undefined);
  const [lightbox, setLightbox] = useState<{ galleryIndex: number; photoIndex: number } | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<{ id: string; url: string; filename: string }[]>([]);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/clients/public/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: ClientSiteData | null) => setSite(d))
      .catch(() => setSite(null));
  }, [slug]);

  if (site === undefined) return <LoadingSpinner />;

  // If not a client site, delegate to photographer profile
  if (site === null) return <PhotographerProfilePage />;

  // Parse gallery config — handle both string and object forms
  let config: any = {};
  if (typeof site.galleryConfig === "string") {
    try { config = JSON.parse(site.galleryConfig || "{}"); } catch {}
  } else if (site.galleryConfig && typeof site.galleryConfig === "object") {
    config = site.galleryConfig;
  }

  const templateId = config.template || "1-clean";
  const TemplateComp = templateComponents[templateId];

  const schemeKey = config.colorScheme || "light";
  const fontKey = config.fontPairing || "modern";
  const schemes = COLOR_SCHEMES.default!;
  const scheme = schemes.find((s: any) => s.key === schemeKey) ?? schemes[0]!;
  const font = FONT_PAIRINGS.find((f: any) => f.key === fontKey) ?? FONT_PAIRINGS[0]!;

  // Build portfolio from hero photos in content
  const heroPhotos: string[] = site.content?.heroPhotos || [];
  const portfolio = heroPhotos.map((url: string, i: number) => ({
    id: `hero-${i}`,
    url,
    filename: `Photo ${i + 1}`,
  }));

  const tagline = site.content?.hero?.subheading || site.industryId || "";
  const specialties = site.industryId ? [site.industryId] : [];
  // Public renderer reads the actual content model the editor saves: { bio, services, pricing }
  const bio = site.content?.bio || "";

  return (
    <div>
      {TemplateComp ? (
        <Suspense fallback={<LoadingSpinner />}>
          <div
            style={{
              "--theme-bg": scheme.bg,
              "--theme-text": scheme.text,
              "--theme-accent": scheme.accent,
              "--theme-heading-font": `"${font.heading}", sans-serif`,
              "--theme-body-font": `"${font.body}", sans-serif`,
            } as React.CSSProperties}
          >
            <TemplateComp
              name={site.name}
              tagline={tagline}
              specialties={specialties}
              bio={bio}
              website={site.customDomain ? `https://${site.customDomain}` : ""}
              serviceArea=""
              verified={false}
              pricing={{}}
              portfolio={portfolio}
              onHire={() => {}}
              onPhotoClick={(i: number) => setLightbox({ galleryIndex: -1, photoIndex: i })}
              colorScheme={{ bg: scheme.bg, text: scheme.text, accent: scheme.accent }}
              fontPairing={{ heading: font.heading, body: font.body }}
            />
          </div>
        </Suspense>
      ) : (
        /* Fallback when template not found */
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-display text-3xl font-bold text-neutral-900">{site.name}</h1>
            {tagline && <p className="mt-2 text-neutral-500">{tagline}</p>}
          </div>
        </section>
      )}

      {/* Blog Section */}
      {site.blogs && site.blogs.length > 0 && (
        <BlogSection blogs={site.blogs} siteSlug={slug!} />
      )}

      {/* Gallery Section */}
      {site.galleries && site.galleries.length > 0 && (
        <GallerySection
          galleries={site.galleries}
          onGalleryClick={async (gallery: ClientGallery) => {
            try {
              const res = await fetch(`/api/clients/public/${slug}/galleries/${gallery.id}`);
              if (res.ok) {
                const data = await res.json();
                const photos: { id: string; url: string; filename: string }[] = data.photos || [];
                setGalleryPhotos(photos);
                if (photos.length > 0) {
                  setLightbox({ galleryIndex: 0, photoIndex: 0 });
                }
              }
            } catch { /* ignore */ }
          }}
        />
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          photos={
            lightbox.galleryIndex === -1
              ? portfolio
              : galleryPhotos
          }
          currentIndex={lightbox.photoIndex}
          onClose={() => setLightbox(null)}
          onPrev={(i: number) => setLightbox((prev) => prev ? { ...prev, photoIndex: i } : null)}
          onNext={(i: number) => setLightbox((prev) => prev ? { ...prev, photoIndex: i } : null)}
        />
      )}
    </div>
  );
}

// ─── Blog Section ───
function BlogSection({ blogs, siteSlug }: { blogs: BlogPost[]; siteSlug: string }) {
  return (
    <section className="border-t border-border bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-xl font-bold text-neutral-900">Blog</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${siteSlug}/${post.slug}`}
              className="group rounded-xl border border-border bg-white overflow-hidden transition-all hover:shadow-md"
            >
              {post.featuredImage ? (
                <div className="aspect-video overflow-hidden bg-neutral-100">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-neutral-100">
                  <span className="text-3xl text-neutral-300">📝</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 group-hover:text-neutral-700 line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                  {post.body?.replace(/<[^>]*>/g, "").slice(0, 150) || ""}
                </p>
                <p className="mt-2 text-xs text-neutral-400">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ───
function GallerySection({
  galleries,
  onGalleryClick,
}: {
  galleries: ClientGallery[];
  onGalleryClick: (gallery: ClientGallery) => void;
}) {
  return (
    <section className="border-t border-border bg-neutral-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-xl font-bold text-neutral-900">Galleries</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleries.map((gallery) => (
            <button
              key={gallery.id}
              onClick={() => onGalleryClick(gallery)}
              className="group text-left rounded-xl border border-border bg-white overflow-hidden transition-all hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden bg-neutral-100">
                <div className="flex h-full w-full items-center justify-center text-3xl text-neutral-300">
                  🖼️
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900">{gallery.name}</h3>
                <p className="mt-2 text-xs text-neutral-400">
                  {gallery.photoCount} photo{gallery.photoCount !== 1 ? "s" : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Lightbox ───
function Lightbox({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  photos: { id: string; url: string; filename: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: (i: number) => void;
  onNext: (i: number) => void;
}) {
  if (!photos.length || !photos[currentIndex]) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 text-lg"
      >
        &#10005;
      </button>
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev(currentIndex - 1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl"
        >
          &#8249;
        </button>
      )}
      {currentIndex < photos.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext(currentIndex + 1);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl"
        >
          &#8250;
        </button>
      )}
      <img
        src={photos[currentIndex].url}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
      />
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
        {currentIndex + 1} / {photos.length}
      </span>
    </div>
  );
}
