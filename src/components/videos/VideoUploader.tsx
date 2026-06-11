import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";
import { getToken } from "@/lib/api";
import { formatBytes, formatDuration } from "@/lib/utils";
import { MAX_VIDEO_DURATION_SEC } from "@/lib/constants";

interface PendingVideo {
  id: string;
  file: File;
  preview: string;
  duration: number;
  status: "pending" | "compressing" | "uploading" | "done" | "error";
  progress: number; // 0-100
  error?: string;
  compressedSize?: number;
}

interface UploadedVideo {
  id: string;
  eventId: string;
  originalFilename: string;
  storageKey: string;
  duration: number;
  fileSize: number;
}

interface VideoUploaderProps {
  eventId: string;
  onUploaded: (videos: UploadedVideo[]) => void;
  onClose?: () => void;
}

// Compression target: ~1-3 Mbps for web-friendly quality
const VIDEO_BITRATE = 2_000_000; // 2 Mbps
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export function VideoUploader({ eventId, onUploaded, onClose }: VideoUploaderProps) {
  const [pendingVideos, setPendingVideos] = useState<PendingVideo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get video duration
  const getDuration = useCallback((file: File): Promise<number> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        resolve(video.duration);
      };
      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(0);
      };
      video.src = url;
    });
  }, []);

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const videoFiles = Array.from(fileList).filter((f) => f.type.startsWith("video/"));

    if (videoFiles.length === 0) return;

    // Check size limits
    const oversized = videoFiles.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      alert(`${oversized.length} video(s) exceed the 100MB limit.`);
      return;
    }

    const newVideos: PendingVideo[] = [];
    for (const file of videoFiles) {
      const duration = await getDuration(file);
      if (duration > MAX_VIDEO_DURATION_SEC) {
        alert(`"${file.name}" is ${Math.round(duration)}s. Videos must be under ${MAX_VIDEO_DURATION_SEC} seconds.`);
        continue;
      }
      newVideos.push({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        duration,
        status: "pending",
        progress: 0,
      });
    }

    if (newVideos.length > 0) {
      setPendingVideos((prev) => [...prev, ...newVideos]);
    }
  }, [getDuration]);

  const removeVideo = useCallback((id: string) => {
    setPendingVideos((prev) => {
      const vid = prev.find((v) => v.id === id);
      if (vid) URL.revokeObjectURL(vid.preview);
      return prev.filter((v) => v.id !== id);
    });
  }, []);

  // ─── Client-side compression using Canvas + MediaRecorder ───
  const compressVideo = useCallback((pv: PendingVideo): Promise<{ blob: Blob; size: number }> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = pv.preview;
      video.muted = true;
      video.playsInline = true;

      video.onloadedmetadata = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = Math.min(video.videoWidth, 1280); // Max 720p-ish
        canvas.height = Math.min(video.videoHeight, 720);
        const ctx = canvas.getContext("2d")!;

        // Try to use MediaRecorder with canvas capture
        try {
          const stream = canvas.captureStream(30); // 30fps
          const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
            ? "video/webm;codecs=vp9"
            : MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
            ? "video/webm;codecs=vp8"
            : "video/webm";

          const recorder = new MediaRecorder(stream, {
            mimeType,
            videoBitsPerSecond: VIDEO_BITRATE,
          });

          const chunks: Blob[] = [];
          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
          };

          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType });
            resolve({ blob, size: blob.size });
          };

          recorder.onerror = () => {
            // Fallback: use original file
            resolve({ blob: pv.file, size: pv.file.size });
          };

          // Start recording
          recorder.start();

          // Draw frames while playing
          const drawFrame = () => {
            if (video.ended || video.paused) return;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
          };

          video.play();
          drawFrame();

          // Stop recording when video ends or at max duration
          video.onended = () => {
            recorder.stop();
            video.pause();
          };

          // Safety timeout — stop at video duration + 2s
          setTimeout(() => {
            if (recorder.state !== "inactive") {
              recorder.stop();
            }
            video.pause();
          }, (pv.duration + 2) * 1000);
        } catch {
          // Canvas capture not supported — use original
          resolve({ blob: pv.file, size: pv.file.size });
        }
      };

      video.onerror = () => reject(new Error("Failed to load video for compression"));
    });
  }, []);

  // ─── Upload all ───
  const handleUpload = async () => {
    if (pendingVideos.length === 0 || uploading) return;
    setUploading(true);

    try {
      const compressedFiles: File[] = [];
      const metadata: Array<{ filename: string; duration: number }> = [];

      for (let i = 0; i < pendingVideos.length; i++) {
        const pv = pendingVideos[i]!;
        setPendingVideos((prev) =>
          prev.map((v) => (v.id === pv.id ? { ...v, status: "compressing" as const, progress: 0 } : v)),
        );

        // Compress
        const { blob, size } = await compressVideo(pv);
        const compressedFile = new File([blob], pv.file.name.replace(/\.[^.]+$/, ".webm"), {
          type: blob.type || "video/webm",
        });

        setPendingVideos((prev) =>
          prev.map((v) =>
            v.id === pv.id
              ? { ...v, status: "uploading" as const, compressedSize: size, progress: 0 }
              : v,
          ),
        );

        compressedFiles.push(compressedFile);
        metadata.push({
          filename: pv.file.name,
          duration: Math.round(pv.duration),
        });
      }

      // Upload
      const formData = new FormData();
      formData.append("eventId", eventId);
      formData.append("metadata", JSON.stringify(metadata));
      compressedFiles.forEach((f) => formData.append("files", f));

      const token = getToken();
      const res = await fetch("/api/videos/upload", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Upload failed");
      }

      const data = (await res.json()) as { videos: UploadedVideo[] };

      setPendingVideos((prev) => prev.map((v) => ({ ...v, status: "done" as const, progress: 100 })));
      onUploaded(data.videos);

      // Clean up previews
      setTimeout(() => {
        setPendingVideos((prev) => {
          prev.forEach((v) => URL.revokeObjectURL(v.preview));
          return [];
        });
      }, 1500);
    } catch (err) {
      setPendingVideos((prev) =>
        prev.map((v) =>
          v.status !== "done"
            ? { ...v, status: "error" as const, error: err instanceof Error ? err.message : "Failed" }
            : v,
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

  const readyCount = pendingVideos.filter((v) => v.status === "pending").length;
  const doneCount = pendingVideos.filter((v) => v.status === "done").length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">Upload videos</h3>
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
          dragOver ? "border-accent-400 bg-accent-50" : "border-border hover:border-neutral-400"
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="text-3xl">🎬</span>
        <p className="mt-3 text-sm font-medium text-neutral-700">
          Drop videos here or click to browse
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          Max {MAX_VIDEO_DURATION_SEC} seconds • Auto-compressed to web quality (~2 Mbps) • Output: WebM
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="video/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Pending videos */}
      {pendingVideos.length > 0 && (
        <div className="space-y-2">
          {pendingVideos.map((pv) => (
            <div
              key={pv.id}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                pv.status === "error" ? "border-red-200 bg-red-50" :
                pv.status === "done" ? "border-emerald-200 bg-emerald-50" :
                "border-border bg-white"
              }`}
            >
              <video
                src={pv.preview}
                className="h-14 w-24 rounded-lg object-cover bg-neutral-900"
                muted
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-700 truncate">{pv.file.name}</p>
                <p className="text-xs text-neutral-400">
                  {formatDuration(pv.duration)} &middot; {formatBytes(pv.file.size)}
                  {pv.compressedSize && ` → ${formatBytes(pv.compressedSize)}`}
                  {" "}
                  {pv.status === "compressing" && "(compressing...)"}
                  {pv.status === "uploading" && "(uploading...)"}
                  {pv.status === "done" && "✓ Done"}
                  {pv.status === "error" && (pv.error ?? "Error")}
                </p>
              </div>
              {(pv.status === "pending" || pv.status === "error") && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeVideo(pv.id); }}
                  className="rounded-lg p-1 text-neutral-400 hover:text-red-500"
                >
                  ✕
                </button>
              )}
              {(pv.status === "compressing" || pv.status === "uploading") && (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent-200 border-t-accent-600" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {pendingVideos.length > 0 && (
        <div className="flex gap-3">
          <button
            onClick={handleUpload}
            disabled={uploading || readyCount === 0}
            className="flex-1 rounded-xl bg-accent-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
          >
            {uploading
              ? `Processing ${doneCount}/${pendingVideos.length}...`
              : `Upload ${readyCount} video${readyCount !== 1 ? "s" : ""}`}
          </button>
        </div>
      )}
    </div>
  );
}
