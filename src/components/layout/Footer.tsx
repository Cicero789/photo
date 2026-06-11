import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Photo &mdash; A home for your life&apos;s moments.
          </p>
          <div className="flex gap-6 text-sm text-neutral-500">
            <Link to="/photographers" className="hover:text-neutral-700 transition-colors">
              Photographers
            </Link>
            <span className="hover:text-neutral-700 transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-neutral-700 transition-colors cursor-pointer">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
