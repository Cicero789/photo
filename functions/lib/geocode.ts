/**
 * Geocode an address string to lat/lng using Mapbox Geocoding API.
 * Uses the public Mapbox token (geocoding is included in free tier).
 */

const MAPBOX_TOKEN = "pk.eyJ1IjoiY2ljZXJvNzg5IiwiYSI6ImNtcThtanB1NTA3bGYycXB2c2R0bHk2bmgifQ.fEmRx2lBgLW6v4bNQdjn5w";

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  if (!address || address.trim().length < 3) return null;

  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address.trim())}.json?access_token=${MAPBOX_TOKEN}&limit=1&types=address,place,poi`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json() as { features?: Array<{ center: [number, number] }> };
    const feature = data.features?.[0];
    if (!feature?.center) return null;

    return { lng: feature.center[0], lat: feature.center[1] };
  } catch {
    return null;
  }
}
