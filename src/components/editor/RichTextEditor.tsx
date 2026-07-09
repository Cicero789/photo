import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export function RichTextEditor({ content, onChange, placeholder = "Start writing...", minHeight = "200px", className }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className={cn("overflow-hidden rounded-lg border border-neutral-300 bg-white", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-neutral-200 bg-neutral-50 px-2 py-1.5">
        {[
          { label: "B", action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), title: "Bold" },
          { label: "I", action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), title: "Italic" },
          { label: "U", action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive("strike"), title: "Strikethrough" },
        ].map(btn => (
          <button key={btn.title} type="button" onClick={btn.action} title={btn.title}
            className={cn("rounded px-2 py-1 text-xs font-medium transition-colors",
              btn.active ? "bg-neutral-300 text-neutral-900" : "text-neutral-600 hover:bg-neutral-200")}>
            {btn.label}
          </button>
        ))}
        <span className="mx-1 text-neutral-300">|</span>
        {[
          { label: "H1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }) },
          { label: "H2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
          { label: "H3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
        ].map(btn => (
          <button key={btn.label} type="button" onClick={btn.action}
            className={cn("rounded px-2 py-1 text-xs font-medium transition-colors",
              btn.active ? "bg-neutral-300 text-neutral-900" : "text-neutral-600 hover:bg-neutral-200")}>
            {btn.label}
          </button>
        ))}
        <span className="mx-1 text-neutral-300">|</span>
        {[
          { label: "•", action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
          { label: "1.", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
          { label: "⏤", action: () => editor.chain().focus().setHorizontalRule().run(), active: false },
        ].map(btn => (
          <button key={btn.label} type="button" onClick={btn.action}
            className={cn("rounded px-2 py-1 text-xs transition-colors",
              btn.active ? "bg-neutral-300 text-neutral-900" : "text-neutral-600 hover:bg-neutral-200")}>
            {btn.label}
          </button>
        ))}
        <span className="mx-1 text-neutral-300">|</span>
        <button type="button" onClick={() => { const url = prompt("Link URL:"); if (url) editor.chain().focus().setLink({ href: url }).run(); }}
          className={cn("rounded px-2 py-1 text-xs transition-colors", editor.isActive("link") ? "bg-neutral-300 text-neutral-900" : "text-neutral-600 hover:bg-neutral-200")}>
          🔗
        </button>
      </div>
      {/* Content */}
      <EditorContent editor={editor} className="prose prose-sm max-w-none" style={{ minHeight }}>
        <style>{`.tiptap { padding: 12px 16px; outline: none; min-height: ${minHeight}; } .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #9ca3af; float: left; height: 0; pointer-events: none; } .tiptap h1 { font-size: 1.5rem; font-weight: 700; } .tiptap h2 { font-size: 1.25rem; font-weight: 600; } .tiptap h3 { font-size: 1.1rem; font-weight: 600; } .tiptap ul { list-style: disc; padding-left: 1.5rem; } .tiptap ol { list-style: decimal; padding-left: 1.5rem; } .tiptap a { color: #2563eb; text-decoration: underline; } .tiptap hr { border: none; border-top: 2px solid #e5e7eb; margin: 1rem 0; } .tiptap img { max-width: 100%; border-radius: 8px; }`}</style>
      </EditorContent>
    </div>
  );
}
