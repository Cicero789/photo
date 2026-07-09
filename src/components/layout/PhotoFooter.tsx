/** Minimal footer for photographer profile and client site pages */
export function PhotoFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-6">
            <a href="/photographers" className="hover:text-neutral-700 transition-colors">
              Photographer Directory
            </a>
            <span>·</span>
            <a href="#" className="hover:text-neutral-700 transition-colors">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="#" className="hover:text-neutral-700 transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="text-neutral-400">
            &copy; {new Date().getFullYear()} FrameNest. Photos stored securely with Cloudflare R2.
          </p>
        </div>
      </div>
    </footer>
  );
}
