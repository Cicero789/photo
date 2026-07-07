import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.js';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-200">404</h1>
        <p className="mt-4 text-lg text-neutral-600">Page not found</p>
        <div className="mt-6">
          <Link to="/"><Button variant="secondary">Go Home</Button></Link>
        </div>
      </div>
    </div>
  );
}
