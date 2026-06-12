/**
 * Lightweight EXIF GPS + capture-date extraction from JPEG files.
 *
 * Parses the APP1/TIFF structure by hand (no dependencies):
 *   JPEG markers -> APP1 "Exif\0\0" -> TIFF header -> IFD0
 *   IFD0 holds pointers to the Exif sub-IFD (0x8769) and GPS IFD (0x8825).
 *   GPS IFD holds latitude/longitude (+ N/S, E/W refs);
 *   Exif sub-IFD holds DateTimeOriginal (0x9003).
 */

export interface ExifData {
  latitude: number | null;
  longitude: number | null;
  takenAt: string | null;
}

const EMPTY: ExifData = { latitude: null, longitude: null, takenAt: null };

// TIFF field type -> bytes per component.
const TYPE_SIZE: Record<number, number> = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 7: 1, 9: 4, 10: 8 };

/** Extract GPS + date from a JPEG File (reads only the header bytes). */
export function extractExif(file: File): Promise<ExifData> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        resolve(parseExif(new DataView(reader.result as ArrayBuffer)));
      } catch {
        resolve(EMPTY); // best-effort: never throw
      }
    };
    reader.onerror = () => resolve(EMPTY);
    // GPS/date live in IFD0 at the very start of APP1; 256KB is ample even
    // with large MakerNote/thumbnail blocks following.
    reader.readAsArrayBuffer(file.slice(0, 256 * 1024));
  });
}

/** Pure parser over a DataView of the JPEG's leading bytes. Exported for tests. */
export function parseExif(view: DataView): ExifData {
  const result: ExifData = { latitude: null, longitude: null, takenAt: null };

  // JPEG must start with SOI.
  if (view.byteLength < 4 || view.getUint16(0, false) !== 0xffd8) return result;

  // Walk JPEG segments to find APP1 (0xFFE1) carrying "Exif\0\0".
  let offset = 2;
  while (offset + 4 <= view.byteLength) {
    const marker = view.getUint16(offset, false);
    if ((marker & 0xff00) !== 0xff00) break; // not a marker — bail
    const size = view.getUint16(offset + 2, false);
    if (marker === 0xffe1 && view.getUint32(offset + 4, false) === 0x45786966) {
      // "Exif" matched; TIFF header starts after "Exif\0\0" (6 bytes).
      parseTiff(view, offset + 10, result);
      return result;
    }
    if (size < 2) break;
    offset += 2 + size;
  }
  return result;
}

function parseTiff(view: DataView, tiff: number, result: ExifData): void {
  if (tiff + 8 > view.byteLength) return;
  const order = view.getUint16(tiff, false);
  let le: boolean;
  if (order === 0x4949) le = true; // "II"
  else if (order === 0x4d4d) le = false; // "MM"
  else return;

  const ifd0 = tiff + view.getUint32(tiff + 4, le);
  let gpsPtr = 0;
  let exifPtr = 0;

  forEachEntry(view, ifd0, le, (tag, entry) => {
    if (tag === 0x8825) gpsPtr = tiff + view.getUint32(entry + 8, le); // GPS IFD pointer
    if (tag === 0x8769) exifPtr = tiff + view.getUint32(entry + 8, le); // Exif sub-IFD pointer
  });

  if (gpsPtr > 0) readGps(view, gpsPtr, tiff, le, result);
  if (exifPtr > 0) {
    forEachEntry(view, exifPtr, le, (tag, entry) => {
      if (tag === 0x9003) {
        const o = valueOffset(view, entry, tiff, le);
        const s = readAscii(view, o, 19);
        if (s) result.takenAt = s.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3");
      }
    });
  }
}

function forEachEntry(
  view: DataView,
  ifd: number,
  le: boolean,
  fn: (tag: number, entryOffset: number) => void,
): void {
  if (ifd <= 0 || ifd + 2 > view.byteLength) return;
  const count = view.getUint16(ifd, le);
  for (let i = 0; i < count; i++) {
    const entry = ifd + 2 + i * 12;
    if (entry + 12 > view.byteLength) return;
    fn(view.getUint16(entry, le), entry);
  }
}

/** Absolute offset of an entry's value: inline when <=4 bytes, else a pointer. */
function valueOffset(view: DataView, entry: number, tiff: number, le: boolean): number {
  const type = view.getUint16(entry + 2, le);
  const count = view.getUint32(entry + 4, le);
  const bytes = (TYPE_SIZE[type] ?? 1) * count;
  return bytes <= 4 ? entry + 8 : tiff + view.getUint32(entry + 8, le);
}

function readGps(view: DataView, gps: number, tiff: number, le: boolean, result: ExifData): void {
  let lat: number | null = null;
  let lon: number | null = null;
  let latRef = "N";
  let lonRef = "E";

  forEachEntry(view, gps, le, (tag, entry) => {
    switch (tag) {
      case 0x0001: // GPSLatitudeRef (inline ASCII)
        latRef = String.fromCharCode(view.getUint8(entry + 8)) || "N";
        break;
      case 0x0003: // GPSLongitudeRef
        lonRef = String.fromCharCode(view.getUint8(entry + 8)) || "E";
        break;
      case 0x0002: // GPSLatitude (3 rationals: deg, min, sec)
        lat = readDMS(view, valueOffset(view, entry, tiff, le), le);
        break;
      case 0x0004: // GPSLongitude
        lon = readDMS(view, valueOffset(view, entry, tiff, le), le);
        break;
    }
  });

  if (lat !== null) result.latitude = latRef === "S" ? -lat : lat;
  if (lon !== null) result.longitude = lonRef === "W" ? -lon : lon;
}

function readDMS(view: DataView, o: number, le: boolean): number | null {
  if (o + 24 > view.byteLength) return null;
  const deg = rational(view, o, le);
  const min = rational(view, o + 8, le);
  const sec = rational(view, o + 16, le);
  if (deg === null || min === null || sec === null) return null;
  return deg + min / 60 + sec / 3600;
}

function rational(view: DataView, o: number, le: boolean): number | null {
  const den = view.getUint32(o + 4, le);
  if (den === 0) return null;
  return view.getUint32(o, le) / den;
}

function readAscii(view: DataView, o: number, maxLen: number): string | null {
  let s = "";
  for (let i = 0; i < maxLen && o + i < view.byteLength; i++) {
    const c = view.getUint8(o + i);
    if (c === 0) break;
    s += String.fromCharCode(c);
  }
  return s || null;
}
