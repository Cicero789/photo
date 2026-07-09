// Single source of truth for Mapbox token — set VITE_MAPBOX_TOKEN in Cloudflare Pages build vars
export const MAPBOX_TOKEN = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_MAPBOX_TOKEN) || "";
export function hasMapboxToken(): boolean { return MAPBOX_TOKEN.length > 0; }
