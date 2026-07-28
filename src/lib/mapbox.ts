// Public Mapbox token (pk.*) — domain-restricted in Mapbox dashboard, safe for frontend
// Override with VITE_MAPBOX_TOKEN build var if needed
export const MAPBOX_TOKEN = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_MAPBOX_TOKEN)
  || "pk.eyJ1IjoiY2ljZXJvNzg5IiwiYSI6ImNtcThtanB1NTA3bGYycXB2c2R0bHk2bmgifQ.fEmRx2lBgLW6v4bNQdjn5w";
export function hasMapboxToken(): boolean { return MAPBOX_TOKEN.length > 0; }
