"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { forwardRef, useImperativeHandle } from "react";
import type { JSONContent } from "@tiptap/react";

export interface TextEditorRef {
  getJSON: () => JSONContent | null;
  getText: () => string;
  hasContent: () => boolean;
}

const TextEditor = forwardRef<TextEditorRef>(function TextEditor(_props, ref) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your message here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-6 text-text-primary focus:outline-none leading-relaxed",
      },
    },
  });

  useImperativeHandle(ref, () => ({
    getJSON: () => editor?.getJSON() ?? null,
    getText: () => editor?.getText() ?? "",
    hasContent: () => {
      if (!editor) return false;
      return !editor.isEmpty;
    },
  }));

  return (
    <div className="tiptap-editor rounded-xl glass overflow-hidden">
      {/* Toolbar */}
      {editor && (
        <div className="flex items-center gap-1 p-2 border-b border-glass-border flex-wrap">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1.5 text-xs rounded-md font-bold transition-colors ${
              editor.isActive("bold")
                ? "bg-accent-coral/20 text-accent-coral"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1.5 text-xs rounded-md italic transition-colors ${
              editor.isActive("italic")
                ? "bg-accent-coral/20 text-accent-coral"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            I
          </button>
          <div className="w-px h-5 bg-glass-border mx-1" />
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-colors ${
              editor.isActive("heading", { level: 1 })
                ? "bg-accent-coral/20 text-accent-coral"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`px-3 py-1.5 text-xs rounded-md font-semibold transition-colors ${
              editor.isActive("heading", { level: 2 })
                ? "bg-accent-coral/20 text-accent-coral"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            H2
          </button>
          <div className="w-px h-5 bg-glass-border mx-1" />
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              editor.isActive("bulletList")
                ? "bg-accent-coral/20 text-accent-coral"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              editor.isActive("blockquote")
                ? "bg-accent-coral/20 text-accent-coral"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            Quote
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`px-3 py-1.5 text-xs rounded-md font-mono transition-colors ${
              editor.isActive("codeBlock")
                ? "bg-accent-coral/20 text-accent-coral"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            Code
          </button>
        </div>
      )}

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
});

export default TextEditor;
