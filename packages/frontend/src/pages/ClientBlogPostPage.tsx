import { useParams } from 'react-router-dom';
export function ClientBlogPostPage() {
  const { siteSlug, postSlug } = useParams();
  return <div className="min-h-screen"><h1 className="text-center p-8 text-2xl font-bold">Blog: {siteSlug}/{postSlug}</h1></div>;
}
