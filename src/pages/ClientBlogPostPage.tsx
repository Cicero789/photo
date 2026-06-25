import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export function ClientBlogPostPage() {
  const { siteSlug, postSlug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${siteSlug}/${postSlug}`)
      .then(r => r.ok ? r.json() : null)
      .then(d => setPost(d?.post))
      .finally(() => setLoading(false));
  }, [siteSlug, postSlug]);

  if (loading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-600" /></div>;
  if (!post) return <div className="text-center py-20"><h1 className="text-2xl font-bold">Post not found</h1><Link to="/" className="text-primary-600">← Home</Link></div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link to={`/site/${siteSlug}`} className="text-sm text-neutral-500 hover:text-neutral-700">← Back to {siteSlug}</Link>
      {post.coverImageUrl && <img src={post.coverImageUrl} alt="" className="w-full rounded-xl mt-6 aspect-video object-cover" />}
      <h1 className="font-display text-3xl font-bold mt-6">{post.title}</h1>
      {post.publishedAt && <p className="text-sm text-neutral-400 mt-2">{new Date(post.publishedAt).toLocaleDateString()}</p>}
      <div className="mt-8 prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
