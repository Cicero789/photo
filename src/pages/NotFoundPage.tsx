import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-neutral-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-neutral-900">Page not found</h1>
      <p className="mt-2 text-neutral-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
      >
        Back to home
      </Link>
    </div>
  );
}
