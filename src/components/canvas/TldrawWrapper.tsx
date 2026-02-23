"use client";

import { forwardRef, useImperativeHandle, useCallback, useRef } from "react";
import { Tldraw, getSnapshot, Editor } from "tldraw";
import "tldraw/tldraw.css";

export interface TldrawWrapperRef {
  getDrawingSnapshot: () => Record<string, unknown> | null;
  getThumbnail: () => Promise<string | null>;
  hasContent: () => boolean;
}

const TldrawWrapper = forwardRef<TldrawWrapperRef>(function TldrawWrapper(
  _props,
  ref
) {
  const editorRef = useRef<Editor | null>(null);

  const handleMount = useCallback((editor: Editor) => {
    editorRef.current = editor;
  }, []);

  useImperativeHandle(ref, () => ({
    getDrawingSnapshot: () => {
      if (!editorRef.current) return null;
      const snapshot = getSnapshot(editorRef.current.store);
      return snapshot.document as unknown as Record<string, unknown>;
    },
    getThumbnail: async () => {
      const editor = editorRef.current;
      if (!editor) return null;

      const shapeIds = editor.getCurrentPageShapeIds();
      if (shapeIds.size === 0) return null;

      try {
        const result = await editor.toImage([...shapeIds], {
          format: "png",
          background: true,
          scale: 0.5,
          padding: 16,
        });

        return new Promise<string | null>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(result.blob);
        });
      } catch {
        return null;
      }
    },
    hasContent: () => {
      if (!editorRef.current) return false;
      return editorRef.current.getCurrentPageShapeIds().size > 0;
    },
  }));

  return (
    <div className="w-full h-full [&_.tl-background]:!bg-bg-secondary">
      <Tldraw onMount={handleMount} />
    </div>
  );
});

export default TldrawWrapper;
