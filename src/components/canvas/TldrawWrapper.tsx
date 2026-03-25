"use client";

import {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Tldraw, getSnapshot, Editor } from "tldraw";
import "tldraw/tldraw.css";

export interface TldrawWrapperRef {
  getDrawingSnapshot: () => Record<string, unknown> | null;
  getThumbnail: () => Promise<string | null>;
  hasContent: () => boolean;
}

function CanvasErrorFallback({ error }: { error: unknown }) {
  const message =
    error instanceof Error
      ? error.message
      : "The drawing canvas hit an unexpected error.";

  return (
    <div className="flex h-full w-full items-center justify-center bg-bg-secondary px-6 text-center">
      <div className="max-w-md rounded-2xl border border-red-500/20 bg-bg-tertiary/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <p className="text-sm font-semibold text-text-primary">
          Canvas failed to load
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          {message}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg border border-glass-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-glass-border-hover hover:bg-white/5"
        >
          Refresh page
        </button>
      </div>
    </div>
  );
}

const TldrawWrapper = forwardRef<TldrawWrapperRef>(function TldrawWrapper(
  _props,
  ref
) {
  const editorRef = useRef<Editor | null>(null);
  const components = useMemo(
    () => ({ ErrorFallback: CanvasErrorFallback }),
    []
  );

  const handleMount = useCallback((editor: Editor) => {
    editorRef.current = editor;
    editor.updateViewportScreenBounds(editor.getContainer());
    requestAnimationFrame(() => {
      editor.updateViewportScreenBounds(editor.getContainer());
    });

    return () => {
      if (editorRef.current === editor) {
        editorRef.current = null;
      }
    };
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
    <div className="tldraw__editor isolate relative h-full w-full [&_.tl-background]:!bg-bg-secondary">
      <Tldraw
        className="h-full w-full"
        components={components}
        onMount={handleMount}
      />
    </div>
  );
});

export default TldrawWrapper;
