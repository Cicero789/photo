import { useParams } from 'react-router-dom';
export function ClientEditorPage() {
  const { id } = useParams();
  return <div className="max-w-7xl mx-auto px-4 py-8"><h1 className="text-3xl font-bold">Edit Client: {id}</h1></div>;
}
