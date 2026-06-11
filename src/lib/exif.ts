/**
 * Lightweight EXIF GPS extraction from JPEG files.
 * Reads GPS coordinates and date taken from JPEG binary data.
 */

export interface ExifData {
  latitude: number | null;
  longitude: number | null;
  takenAt: string | null;
}

/** Extract GPS and date from a JPEG file's EXIF data. */
export function extractExif(file: File): Promise<ExifData> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result: ExifData = { latitude: null, longitude: null, takenAt: null };
      try {
        const view = new DataView(reader.result as ArrayBuffer);

        // Check JPEG SOI marker
        if (view.getUint16(0, false) !== 0xffd8) {
          resolve(result);
          return;
        }

        let offset = 2;
        while (offset < view.byteLength) {
          if (view.getUint16(offset, false) !== 0xffe1) {
            offset += 2 + view.getUint16(offset + 2, false);
            continue;
          }

          // Found EXIF (APP1 marker)
          const exifStart = offset + 4;
          const tiffHeader = view.getUint16(exifStart, false);

          // Check byte order
          const littleEndian = tiffHeader === 0x4949; // "II"
          const bigEndian = tiffHeader === 0x4d4d; // "MM"
          if (!littleEndian && !bigEndian) break;
          const le = littleEndian;

          const ifd0Offset = exifStart + view.getUint32(exifStart + 4, le);
          if (ifd0Offset >= view.byteLength) break;

          // Read IFD0 entries for date
          const entries0 = view.getUint16(ifd0Offset, le);
          for (let i = 0; i < entries0; i++) {
            const entryOffset = ifd0Offset + 2 + i * 12;
            const tag = view.getUint16(entryOffset, le);
            if (tag === 0x9003) {
              // DateTimeOriginal
              const valueOffset = exifStart + view.getUint32(entryOffset + 8, le);
              const dateStr = readString(view, valueOffset, 19);
              if (dateStr) {
                result.takenAt = dateStr.replace(/^(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3");
              }
            }
            if (tag === 0x8769) {
              // ExifIFD pointer → GPS IFD
              const exifIfdOffset = exifStart + view.getUint32(entryOffset + 8, le);
              const gpsEntries = view.getUint16(exifIfdOffset, le);
              let gpsIfdOffset = 0;
              for (let j = 0; j < gpsEntries; j++) {
                const gpsEntry = exifIfdOffset + 2 + j * 12;
                if (view.getUint16(gpsEntry, le) === 0x8825) {
                  gpsIfdOffset = exifStart + view.getUint32(gpsEntry + 8, le);
                  break;
                }
              }
              if (gpsIfdOffset > 0) {
                const gpsData = readGPS(view, gpsIfdOffset, exifStart, le);
                result.latitude = gpsData.latitude;
                result.longitude = gpsData.longitude;
              }
            }
          }
          break;
        }
      } catch {
        // Silently fail — EXIF parsing is best-effort
      }
      resolve(result);
    };
    reader.onerror = () => resolve({ latitude: null, longitude: null, takenAt: null });
    reader.readAsArrayBuffer(file.slice(0, 65536)); // First 64KB is enough for EXIF
  });
}

function readString(view: DataView, offset: number, maxLen: number): string | null {
  let str = "";
  for (let i = 0; i < maxLen; i++) {
    const char = view.getUint8(offset + i);
    if (char === 0) break;
    str += String.fromCharCode(char);
  }
  return str || null;
}

function readGPS(
  view: DataView,
  gpsIfdOffset: number,
  exifStart: number,
  le: boolean,
): { latitude: number | null; longitude: number | null } {
  let latitude: number | null = null;
  let longitude: number | null = null;
  let latRef = "N";
  let lonRef = "E";

  const entries = view.getUint16(gpsIfdOffset, le);
  for (let i = 0; i < entries; i++) {
    const entryOffset = gpsIfdOffset + 2 + i * 12;
    const tag = view.getUint16(entryOffset, le);
    const valueOffset = exifStart + view.getUint32(entryOffset + 8, le);

    if (tag === 0x0001) {
      latRef = String.fromCharCode(view.getUint8(valueOffset));
    }
    if (tag === 0x0003) {
      lonRef = String.fromCharCode(view.getUint8(valueOffset));
    }
    if (tag === 0x0002) {
      latitude = readRational(view, valueOffset, le);
      if (latitude !== null && latRef === "S") latitude = -latitude;
    }
    if (tag === 0x0004) {
      longitude = readRational(view, valueOffset, le);
      if (longitude !== null && lonRef === "W") longitude = -longitude;
    }
  }

  return { latitude, longitude };
}

function readRational(view: DataView, offset: number, le: boolean): number | null {
  const num = [
    view.getUint32(offset, le),
    view.getUint32(offset + 8, le),
    view.getUint32(offset + 16, le),
  ];
  const den = [
    view.getUint32(offset + 4, le),
    view.getUint32(offset + 12, le),
    view.getUint32(offset + 20, le),
  ];
  if (!den[0] || !den[1] || !den[2]) return null;
  return num[0]! / den[0]! + num[1]! / den[1]! / 60 + num[2]! / den[2]! / 3600;
}
