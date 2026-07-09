/**
 * TinaCMS Integration — local dev tool for visual content editing.
 *
 * TinaCMS v2 runs as a separate dev server alongside FrameNest.
 * Start it with: npx tinacms dev -c "npm run dev"
 * The Tina admin UI loads at /admin/index.html
 *
 * For production (Cloudflare Pages), content is managed via:
 * - Our built-in block editor (ClientEditorPage → Content tab)
 * - Git-backed version history (content_versions table)
 * - GitHub auto-commit on save (GITHUB_API_KEY secret)
 */

interface TinaSidebarProps { children: React.ReactNode; }

export function TinaSidebar({ children }: TinaSidebarProps) {
  // TinaCMS v2 runs as a separate dev server — not an inline component.
  // In production, our block editor handles content.
  // The Tina admin is available at /admin/index.html in dev mode.
  return <>{children}</>;
}

export function useTinaEditing() {
  return { editing: false, toggle: () => {} };
}
