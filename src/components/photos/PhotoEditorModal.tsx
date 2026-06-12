import { useState } from "react";
import FilerobotImageEditor, { TABS, TOOLS } from "react-filerobot-image-editor";

interface PhotoEditorModalProps {
  open: boolean;
  imageUrl: string;
  filename: string;
  onClose: () => void;
  onSave: (editedBlob: Blob, filename: string) => Promise<void>;
}

export default function PhotoEditorModal({ open, imageUrl, filename, onClose, onSave }: PhotoEditorModalProps) {
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSave = async (editedImageObject: { imageBase64?: string; imageCanvas?: HTMLCanvasElement }, _designState: unknown) => {
    setSaving(true);
    try {
      // Convert base64 to Blob
      let blob: Blob;
      if (editedImageObject.imageBase64) {
        const res = await fetch(editedImageObject.imageBase64);
        blob = await res.blob();
      } else if (editedImageObject.imageCanvas) {
        blob = await new Promise<Blob>((resolve) =>
          editedImageObject.imageCanvas!.toBlob((b) => resolve(b!), "image/jpeg", 0.9)
        );
      } else {
        throw new Error("No image data returned from editor");
      }

      const editedFilename = filename.replace(/\.[^.]+$/, "") + "-edited.jpg";
      await onSave(blob, editedFilename);
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save edited photo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {saving && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="rounded-xl bg-white px-6 py-4 shadow-xl text-center">
            <div className="mb-2 h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
            <p className="text-sm font-medium text-neutral-700">Saving edited photo...</p>
          </div>
        </div>
      )}
      <FilerobotImageEditor
        source={imageUrl}
        onSave={handleSave}
        onClose={onClose}
        savingPixelRatio={0}
        previewPixelRatio={0}
        annotationsCommon={{ fill: "#2563eb" }}
        Text={{ text: "Add caption..." }}
        Rotate={{ angle: 45, componentType: "slider" }}
        Crop={{
          presetsItems: [
            { titleKey: "original", descriptionKey: "Original", ratio: "original" },
            { titleKey: "square", descriptionKey: "Square", ratio: 1 },
            { titleKey: "4:3", descriptionKey: "4:3", ratio: 4 / 3 },
            { titleKey: "16:9", descriptionKey: "16:9", ratio: 16 / 9 },
          ],
          autoResize: false,
        }}
        tabsIds={[TABS.ADJUST, TABS.FINETUNE, TABS.FILTERS, TABS.WATERMARK, TABS.ANNOTATE, TABS.RESIZE]}
        defaultTabId={TABS.ADJUST}
        defaultToolId={TOOLS.CROP}
      />
    </div>
  );
}
