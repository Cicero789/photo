import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { HireButton } from "@/components/photographer/HireButton";

interface ProfileData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  specialties: string[];
  bio: string;
  website: string;
  portfolioUrl: string;
  serviceArea: string;
  pricing: { downloads?: { single?: number; full?: number } };
  heroPhotos: string[];
  portfolio: { id: string; url: string; filename: string }[];
  reviewStats: { count: number; average: number };
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewerName: string;
  createdAt: string;
}

export function PhotographerProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMsg, setReviewMsg] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/photographers/profile/${slug}`)
      .then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); })
      .then(d => setProfile(d))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  // Fetch reviews
  useEffect(() => {
    if (!slug) return;
    fetch(`/api/photographers/reviews/${slug}`)
      .then(r => r.ok ? r.json() : { reviews: [] })
      .then(d => setReviews(d.reviews || []))
      .catch(() => {});
  }, [slug]);

  const submitReview = async () => {
    if (!slug || !user) return;
    setSubmittingReview(true);
    setReviewMsg("");
    try {
      const res = await fetch(`/api/photographers/reviews/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify(reviewForm),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Failed");
      setReviewMsg("Review submitted!");
      setReviewForm({ rating: 5, comment: "" });
      // Refresh reviews
      const r2 = await fetch(`/api/photographers/reviews/${slug}`);
      const d2 = await r2.json();
      setReviews(d2.reviews || []);
    } catch (err) {
      setReviewMsg(err instanceof Error ? err.message : "Failed to submit");
    }
    setSubmittingReview(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="text-5xl">📷</p>
          <h1 className="mt-4 font-display text-xl font-bold text-neutral-900">Photographer not found</h1>
          <p className="mt-2 text-sm text-neutral-500">This profile may not exist or isn't published yet.</p>
          <Link to="/photographers" className="mt-6 inline-block text-sm font-medium text-neutral-600 hover:text-neutral-900">
            ← Browse photographers
          </Link>
        </div>
      </div>
    );
  }

  const hasPortfolio = profile.portfolio.length > 0;
  const hasPricing = profile.pricing?.downloads?.single || profile.pricing?.downloads?.full;

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left sm:gap-8">
            {/* Avatar */}
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-4xl font-bold text-neutral-400">
              {profile.name.charAt(0)}
            </div>
            <div className="mt-4 sm:mt-0">
              <h1 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">{profile.name}</h1>
              {profile.tagline && (
                <p className="mt-2 text-lg text-neutral-500">{profile.tagline}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                {profile.serviceArea && (
                  <span className="inline-flex items-center gap-1 text-sm text-neutral-500">
                    📍 {profile.serviceArea}
                  </span>
                )}
                {profile.reviewStats.count > 0 && (
                  <span className="inline-flex items-center gap-1 text-sm text-neutral-500">
                    {"★".repeat(Math.round(profile.reviewStats.average))}{"☆".repeat(5 - Math.round(profile.reviewStats.average))}
                    {" "}{profile.reviewStats.average} ({profile.reviewStats.count})
                  </span>
                )}
                {profile.specialties.map(s => (
                  <span key={s} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <HireButton photographerName={profile.name} />
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer"
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-50">
                    Website ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      {hasPortfolio && (
        <section className="bg-neutral-50 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center font-display text-xl font-bold text-neutral-900 sm:text-2xl">Portfolio</h2>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {profile.portfolio.map((photo, i) => (
                <div key={photo.id}
                  onClick={() => setLightbox(i)}
                  className="group relative cursor-pointer overflow-hidden rounded-lg bg-neutral-200 aspect-square">
                  <img src={photo.url} alt={photo.filename || `Portfolio ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About */}
      {profile.bio && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="font-display text-xl font-bold text-neutral-900">About</h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-600 whitespace-pre-line">{profile.bio}</p>
          </div>
        </section>
      )}

      {/* Pricing */}
      {hasPricing && (
        <section className="border-t border-border bg-neutral-50 py-12 sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <h2 className="font-display text-xl font-bold text-neutral-900">Pricing</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {profile.pricing.downloads?.single && (
                <div className="rounded-xl border border-border bg-white p-6">
                  <p className="text-sm font-medium text-neutral-500">Single Download</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">${profile.pricing.downloads.single}</p>
                </div>
              )}
              {profile.pricing.downloads?.full && (
                <div className="rounded-xl border border-border bg-white p-6">
                  <p className="text-sm font-medium text-neutral-500">Full Gallery</p>
                  <p className="mt-1 text-2xl font-bold text-neutral-900">${profile.pricing.downloads.full}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="border-t border-border bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="font-display text-xl font-bold text-neutral-900">
            Reviews {profile.reviewStats.count > 0 && <span className="text-neutral-400 font-normal text-base">({profile.reviewStats.count})</span>}
          </h2>

          {reviews.length > 0 ? (
            <div className="mt-6 space-y-4">
              {reviews.map(r => (
                <div key={r.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-900">{r.reviewerName}</p>
                    <span className="text-sm text-amber-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  </div>
                  {r.comment && <p className="mt-2 text-sm text-neutral-600">{r.comment}</p>}
                  <p className="mt-2 text-xs text-neutral-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-neutral-400">No reviews yet.</p>
          )}

          {/* Submit review */}
          {user && (
            <div className="mt-8 rounded-xl border border-border bg-neutral-50 p-4">
              <p className="text-sm font-medium text-neutral-700">Leave a review</p>
              <div className="mt-3 flex items-center gap-1">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" onClick={() => setReviewForm(f => ({...f, rating: n}))}
                    className={`text-xl ${n <= reviewForm.rating ? "text-amber-400" : "text-neutral-300"}`}>★</button>
                ))}
              </div>
              <textarea value={reviewForm.comment} onChange={e => setReviewForm(f => ({...f, comment: e.target.value}))}
                placeholder="Tell others about your experience…"
                rows={2}
                className="mt-3 w-full rounded-lg border border-border px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none" />
              {reviewMsg && <p className="mt-2 text-xs text-neutral-500">{reviewMsg}</p>}
              <button onClick={submitReview} disabled={submittingReview}
                className="mt-3 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-white hover:bg-neutral-800 disabled:opacity-50">
                {submittingReview ? "Submitting…" : "Submit Review"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-border bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-xl font-bold text-neutral-900">Work with {profile.name.split(" ")[0]}</h2>
          <p className="mt-2 text-sm text-neutral-500">
            {profile.serviceArea ? `Based in ${profile.serviceArea}. ` : ""}Send a message to discuss your project.
          </p>
          <div className="mt-6">
            <HireButton photographerName={profile.name} />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && profile.portfolio[lightbox] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 text-lg">✕</button>
          {lightbox > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl">‹</button>
          )}
          {lightbox < profile.portfolio.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 text-xl">›</button>
          )}
          <img src={profile.portfolio[lightbox].url} alt=""
            onClick={e => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {lightbox + 1} / {profile.portfolio.length}
          </span>
        </div>
      )}
    </div>
  );
}
