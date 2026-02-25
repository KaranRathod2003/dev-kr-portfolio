"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import {
  HiOutlinePencil,
  HiOutlineColorSwatch,
  HiOutlineSave,
  HiOutlineTrash,
} from "react-icons/hi";
import TextEditor, { TextEditorRef } from "./TextEditor";
import type { TldrawWrapperRef } from "./TldrawWrapper";

const TldrawWrapper = dynamic(() => import("./TldrawWrapper"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-bg-secondary rounded-xl">
      <div className="flex flex-col items-center gap-3 text-text-muted">
        <div className="w-8 h-8 border-2 border-accent-coral/30 border-t-accent-coral rounded-full animate-spin" />
        <span className="text-sm">Loading canvas...</span>
      </div>
    </div>
  ),
});

type Tab = "write" | "draw";

export default function NoteComposer() {
  const { data: session } = useSession();
  const router = useRouter();
  const textEditorRef = useRef<TextEditorRef>(null);
  const tldrawRef = useRef<TldrawWrapperRef>(null);
  const [activeTab, setActiveTab] = useState<Tab>("write");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);

  const handleSave = async () => {
    if (!session?.user) {
      signIn("github");
      return;
    }

    const textJson = textEditorRef.current?.getJSON();
    const textPreview = textEditorRef.current?.getText()?.slice(0, 150) || "";
    const hasText = textEditorRef.current?.hasContent() || false;
    const hasDrawing = tldrawRef.current?.hasContent() || false;

    if (!hasText && !hasDrawing) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 2000);
      return;
    }

    setIsSaving(true);
    try {
      const drawingSnapshot = hasDrawing
        ? tldrawRef.current?.getDrawingSnapshot()
        : null;
      const drawingThumbnail = hasDrawing
        ? await tldrawRef.current?.getThumbnail()
        : null;

      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textContent: textJson,
          textPreview,
          drawingSnapshot,
          drawingThumbnail,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setSaveStatus("success");
      setTimeout(() => {
        router.push("/board");
      }, 1500);
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="gradient-text">Creative Canvas</span>
          </h1>
          <p className="text-text-secondary max-w-lg mx-auto">
            Write a message, draw something creative, and share it on the
            community board.
          </p>
        </motion.div>

        {/* Auth prompt */}
        {!session?.user && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn("github")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg glass glass-hover text-text-primary font-medium"
            >
              <FaGithub size={20} />
              Sign in with GitHub to save your creation
            </motion.button>
          </motion.div>
        )}

        {/* Tab Switcher */}
        <div className="flex justify-center mb-6">
          <div className="flex glass rounded-lg p-1 gap-1">
            {[
              { id: "write" as Tab, label: "Write", icon: HiOutlinePencil },
              { id: "draw" as Tab, label: "Draw", icon: HiOutlineColorSwatch },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-accent-coral/20 text-accent-coral border border-accent-coral/30"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="relative">
          {/* Write tab */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: activeTab === "write" ? 1 : 0,
              x: activeTab === "write" ? 0 : -20,
            }}
            transition={{ duration: 0.2 }}
            className={`max-w-3xl mx-auto ${
              activeTab !== "write" ? "hidden" : ""
            }`}
          >
            <TextEditor ref={textEditorRef} />
          </motion.div>

          {/* Draw tab - always mounted, hidden when inactive */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: activeTab === "draw" ? 1 : 0,
              x: activeTab === "draw" ? 0 : 20,
            }}
            transition={{ duration: 0.2 }}
            className={`relative ${
              activeTab !== "draw" ? "hidden" : ""
            }`}
            onMouseEnter={() => setIsCanvasHovered(true)}
            onMouseLeave={() => setIsCanvasHovered(false)}
          >
            <div
              className={`h-[500px] md:h-[600px] rounded-xl overflow-hidden border transition-all duration-300 ${
                isCanvasHovered
                  ? "border-accent-coral/60 shadow-[0_0_40px_rgba(255,107,107,0.25),0_0_80px_rgba(255,107,107,0.1)]"
                  : "border-glass-border"
              }`}
            >
              <TldrawWrapper ref={tldrawRef} />
            </div>
            <AnimatePresence>
              {isCanvasHovered && (
                <motion.p
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-text-muted whitespace-nowrap"
                >
                  Move cursor outside canvas to scroll
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-5 py-3 rounded-lg border border-glass-border-hover text-text-secondary hover:text-text-primary text-sm font-medium hover:bg-white/5 transition-all"
          >
            <HiOutlineTrash size={16} />
            Clear All
          </motion.button>

          <motion.button
            whileHover={{ scale: isSaving ? 1 : 1.05 }}
            whileTap={{ scale: isSaving ? 1 : 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-medium transition-all ${
              saveStatus === "success"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : saveStatus === "error"
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-gradient-to-r from-accent-coral to-accent-cyan text-white glow-purple"
            } disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            <HiOutlineSave size={16} />
            {isSaving
              ? "Saving..."
              : saveStatus === "success"
              ? "Saved! Redirecting..."
              : saveStatus === "error"
              ? "Please add content first"
              : "Save & Post to Board"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
