import { useParams } from 'react-router-dom';
export function ClientSitePage() {
  const { slug } = useParams();
  return <div className="min-h-screen"><h1 className="text-center p-8 text-2xl font-bold">Site: {slug}</h1></div>;
}
