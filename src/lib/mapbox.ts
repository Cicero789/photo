// Single source of truth for Mapbox token — change once, updates everywhere
export const MAPBOX_TOKEN = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_MAPBOX_TOKEN)
  || "pk.eyJ1IjoiY2ljZXJvNzg5IiwiYSI6ImNtcThtanB1NTA3bGYycXB2c2R0bHk2bmgifQ.fEmRx2lBgLW6v4bNQdjn5w";
