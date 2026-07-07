/**
 * Bundle backend route handlers into functions/api/ for Cloudflare Pages.
 * Each route becomes a self-contained .js file with all imports resolved.
 */
import * as esbuild from 'esbuild';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, 'packages', 'backend', 'src');
const OUT = join(ROOT, 'functions');

// Maps source files to output paths (Cloudflare Pages file-based routing)
const ROUTES: Array<{ src: string; out: string }> = [
  // Auth
  { src: 'routes/auth/signup.ts', out: 'api/auth/signup.js' },
  { src: 'routes/auth/login.ts', out: 'api/auth/login.js' },
  { src: 'routes/auth/gate.ts', out: 'api/auth/gate.js' },
  { src: 'routes/auth/me.ts', out: 'api/auth/me.js' },
  { src: 'routes/auth/logout.ts', out: 'api/auth/logout.js' },
  { src: 'routes/auth/forgot-password.ts', out: 'api/auth/forgot-password.js' },
  { src: 'routes/auth/reset-password.ts', out: 'api/auth/reset-password.js' },
  // Events
  { src: 'routes/events/index.ts', out: 'api/events/index.js' },
  { src: 'routes/events/[id].ts', out: 'api/events/[id].js' },
  // Albums
  { src: 'routes/albums/index.ts', out: 'api/albums/index.js' },
  { src: 'routes/albums/index.ts', out: 'api/albums/[id].js' },
  // Spaces
  { src: 'routes/spaces/[slug].ts', out: 'api/spaces/[slug].js' },
  // Inspiration
  { src: 'routes/inspiration.ts', out: 'api/inspiration.js' },
  // Professionals
  { src: 'routes/professionals/public.ts', out: 'api/professionals/public.js' },
  // Health
  { src: 'routes/health.ts', out: 'api/health.js' },
  // Photo upload
  { src: 'routes/photos/upload.ts', out: 'api/photos/upload.js' },
  // Media serving
  { src: 'routes/media/[[path]].ts', out: 'api/media/[[path]].js' },
];

async function buildRoute(srcRel: string, outRel: string) {
  const entry = join(SRC, srcRel);
  const outFile = join(OUT, outRel);

  mkdirSync(join(OUT, outRel.replace(/\/[^/]+\.js$/, '')), { recursive: true });

  await esbuild.build({
    entryPoints: [entry],
    outfile: outFile,
    bundle: true,
    platform: 'neutral',
    target: 'es2022',
    format: 'esm',
    external: ['cloudflare:*'],
    alias: {
      '@framenest/shared': join(ROOT, 'packages', 'shared', 'src', 'index.ts'),
    },
  });
}

async function main() {
  if (existsSync(OUT)) rmSync(OUT, { recursive: true });
  mkdirSync(OUT, { recursive: true });

  console.log(`Bundling ${ROUTES.length} function files...\n`);

  for (const { src, out } of ROUTES) {
    try {
      await buildRoute(src, out);
      console.log(`  ✓ ${out}`);
    } catch (err) {
      console.log(`  ✗ ${out}: ${(err as Error).message}`);
    }
  }

  console.log(`\nDone! ${ROUTES.length} functions in functions/`);
}

main().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
