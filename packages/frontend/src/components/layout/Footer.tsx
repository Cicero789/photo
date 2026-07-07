import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} FrameNest. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/photographers" className="text-sm text-neutral-500 hover:text-neutral-700">
              For Photographers
            </Link>
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-700">
              Privacy
            </a>
            <a href="#" className="text-sm text-neutral-500 hover:text-neutral-700">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
