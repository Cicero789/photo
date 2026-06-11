import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { getToken } from "@/lib/api";
import { extractExif } from "@/lib/exif";
import { formatBytes } from "@/lib/utils";
import { MAX_PHOTO_SIZE_MB } from "@/lib/constants";

interface PendingFile {
  id: string;
  file: File;
  preview: string;
  width: number;
  height: number;
  status: "pending" | "resizing" | "uploading" | "done" | "error";
  error?: string;
}

interface UploadedPhoto {
  id: string;
  eventId: string;
  originalFilename: string;
  storageKey: string;
  width: number;
  height: number;
  fileSize: number;
  latitude: number | null;
  longitude: number | null;
  takenAt: string | null;
}

interface PhotoUploaderProps {
  eventId: string;
  onUploaded: (photos: UploadedPhoto[]) => void;
  onClose?: () => void;
}

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const JPEG_QUALITY = 0.82;

export function PhotoUploader({ eventId, onUploaded, onClose }: PhotoUploaderProps) {
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList | File[]) => {
    const newFiles: PendingFile[] = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        preview: URL.createObjectURL(f),
        width: 0,
        height: 0,
        status: "pending" as const,
      }));

    if (newFiles.length === 0) return;

    // Check size limits
    const oversized = newFiles.filter((f) => f.file.size > MAX_PHOTO_SIZE_MB * 1024 * 1024);
    if (oversized.length > 0) {
      alert(`${oversized.length} file(s) exceed the ${MAX_PHOTO_SIZE_MB}MB limit.`);
      return;
    }

    setPendingFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setPendingFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  }, []);

  // ─── Client-side resize using Canvas ───
  const resizeImage = useCallback((file: PendingFile): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width <= MAX_WIDTH && height <= MAX_HEIGHT && file.file.size < 2 * 1024 * 1024) {
          // Already small enough — use original
          resolve(file.file);
          return;
        }

        // Scale down
        if (width > MAX_WIDTH) { height = (height * MAX_WIDTH) / width; width = MAX_WIDTH; }
        if (height > MAX_HEIGHT) { width = (width * MAX_HEIGHT) / height; height = MAX_HEIGHT; }

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file.file); // fallback to original
            }
          },
          "image/jpeg",
          JPEG_QUALITY,
        );
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = file.preview;
    });
  }, []);

  // ─── Upload all ───
  const handleUpload = async () => {
    if (pendingFiles.length === 0 || uploading) return;
    setUploading(true);

    try {
      const resizedFiles: File[] = [];
      const metadata: Array<{
        filename: string;
        width: number;
        height: number;
        latitude: number | null;
        longitude: number | null;
        takenAt: string | null;
      }> = [];

      for (let i = 0; i < pendingFiles.length; i++) {
        const pf = pendingFiles[i]!;
        setPendingFiles((prev) => prev.map((f) => (f.id === pf.id ? { ...f, status: "resizing" } : f)));

        // Extract EXIF
        const exif = await extractExif(pf.file);

        // Resize
        const blob = await resizeImage(pf);
        const resizedFile = new File([blob], pf.file.name, { type: "image/jpeg" });

        setPendingFiles((prev) => prev.map((f) => (f.id === pf.id ? { ...f, status: "uploading" } : f)));

        resizedFiles.push(resizedFile);
        metadata.push({
          filename: pf.file.name,
          width: pf.width || 0,
          height: pf.height || 0,
          latitude: exif.latitude,
          longitude: exif.longitude,
          takenAt: exif.takenAt,
        });
      }

      // Upload all in one request
      const formData = new FormData();
      formData.append("eventId", eventId);
      formData.append("metadata", JSON.stringify(metadata));
      resizedFiles.forEach((f) => formData.append("files", f));

      const token = getToken();
      const res = await fetch("/api/photos/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Upload failed");
      }

      const data = await res.json() as { photos: UploadedPhoto[] };

      // Update image dimensions from resized blob
      for (let i = 0; i < data.photos.length; i++) {
        const photo = data.photos[i]!;
        const rf = resizedFiles[i];
        if (rf && photo.width === 0) {
          // We'll get dimensions from the canvas — for now keep as-is
        }
      }

      setPendingFiles((prev) => prev.map((f) => ({ ...f, status: "done" as const })));
      onUploaded(data.photos);

      // Clean up previews after short delay
      setTimeout(() => {
        setPendingFiles((prev) => {
          prev.forEach((f) => URL.revokeObjectURL(f.preview));
          return [];
        });
      }, 1500);
    } catch (err) {
      setPendingFiles((prev) =>
        prev.map((f) =>
          f.status !== "done"
            ? { ...f, status: "error" as const, error: err instanceof Error ? err.message : "Failed" }
            : f,
        ),
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = (e: DragEvent) => { e.preventDefault(); setDragOver(false); };
  const handleDrop = (e: DragEvent) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); };
  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const readyCount = pendingFiles.filter((f) => f.status === "pending").length;
  const doneCount = pendingFiles.filter((f) => f.status === "done").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">Upload photos</h3>
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
            ✕
          </button>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
          dragOver ? "border-primary-400 bg-primary-50" : "border-border hover:border-neutral-400"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="text-3xl">📁</span>
        <p className="mt-3 text-sm font-medium text-neutral-700">
          Drop photos here or click to browse
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          JPEG, PNG, HEIC • Max {MAX_PHOTO_SIZE_MB}MB each • Auto-resized to ~1-2MB
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Pending files */}
      {pendingFiles.length > 0 && (
        <div className="space-y-2">
          {pendingFiles.map((pf) => (
            <div
              key={pf.id}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                pf.status === "error" ? "border-red-200 bg-red-50" :
                pf.status === "done" ? "border-emerald-200 bg-emerald-50" :
                "border-border bg-white"
              }`}
            >
              <img src={pf.preview} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-700 truncate">{pf.file.name}</p>
                <p className="text-xs text-neutral-400">
                  {pf.status === "pending" && formatBytes(pf.file.size)}
                  {pf.status === "resizing" && "Resizing..."}
                  {pf.status === "uploading" && "Uploading..."}
                  {pf.status === "done" && "✓ Uploaded"}
                  {pf.status === "error" && (pf.error ?? "Error")}
                </p>
              </div>
              {(pf.status === "pending" || pf.status === "error") && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(pf.id); }}
                  className="rounded-lg p-1 text-neutral-400 hover:text-red-500"
                >
                  ✕
                </button>
              )}
              {(pf.status === "resizing" || pf.status === "uploading") && (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {pendingFiles.length > 0 && (
        <div className="flex gap-3">
          <button
            onClick={handleUpload}
            disabled={uploading || readyCount === 0}
            className="flex-1 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50"
          >
            {uploading
              ? `Uploading ${doneCount}/${pendingFiles.length}...`
              : `Upload ${readyCount} photo${readyCount !== 1 ? "s" : ""}`}
          </button>
        </div>
      )}
    </div>
  );
}
