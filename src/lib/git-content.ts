/**
 * Git-backed content layer — stores client site content as JSON files in content/.
 * Provides version history via git log, and auto-commits on every save.
 * This is a lightweight TinaCMS alternative: zero dependencies, git-native.
 */

import type { ContentBlock } from "@/components/editor/types";

export interface SiteContent {
  slug: string;
  name: string;
  template?: string;
  blocks: ContentBlock[];
  updatedAt: string;
  updatedBy?: string;
}

interface ContentVersion {
  hash: string;
  date: string;
  message: string;
  author: string;
}

const CONTENT_API = "/api/content";

/** Fetch a site's content from the git-backed API */
export async function fetchSiteContent(slug: string): Promise<SiteContent | null> {
  try {
    const res = await fetch(`${CONTENT_API}/${slug}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/** Save a site's content — auto-commits to git via the API */
export async function saveSiteContent(
  slug: string,
  name: string,
  blocks: ContentBlock[],
  template?: string,
): Promise<{ success: boolean; version?: string }> {
  const res = await fetch(`${CONTENT_API}/${slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, blocks, template }),
  });
  if (!res.ok) throw new Error("Failed to save content");
  return res.json();
}

/** Get version history for a site */
export async function getContentVersions(slug: string): Promise<ContentVersion[]> {
  try {
    const res = await fetch(`${CONTENT_API}/${slug}/versions`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.versions || [];
  } catch {
    return [];
  }
}

/** Restore a previous version */
export async function restoreContentVersion(slug: string, hash: string): Promise<SiteContent | null> {
  const res = await fetch(`${CONTENT_API}/${slug}/versions?restore=${hash}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data;
}

/** List all sites with git-backed content */
export async function listContentSites(): Promise<Array<{ slug: string; name: string; updatedAt: string }>> {
  try {
    const res = await fetch(`${CONTENT_API}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.sites || [];
  } catch {
    return [];
  }
}
