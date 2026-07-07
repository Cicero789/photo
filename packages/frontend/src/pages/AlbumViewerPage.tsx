import { useParams } from 'react-router-dom';
export function AlbumViewerPage() {
  const { token } = useParams();
  return <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
    <h1 className="text-2xl font-bold">Album: {token}</h1>
  </div>;
}
