"use client";

import { useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi";
import { useNotes } from "@/hooks/useNotes";
import NoteCard from "./NoteCard";

function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): T {
  let timer: NodeJS.Timeout;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

export default function BoardCanvas() {
  const { notes, isLoading, deleteNote, updatePosition } = useNotes();
  const { data: session } = useSession();
  const boardRef = useRef<HTMLDivElement>(null);

  const adminGithubId = process.env.NEXT_PUBLIC_ADMIN_GITHUB_ID;
  const isAdmin =
    !!session?.user &&
    (session.user.githubId === adminGithubId ||
      session.user.id === adminGithubId);

  const debouncedUpdatePosition = useMemo(
    () =>
      debounce((id: string, x: number, y: number) => {
        updatePosition(id, x, y);
      }, 500),
    [updatePosition]
  );

  const handlePositionChange = useCallback(
    (id: string, x: number, y: number) => {
      debouncedUpdatePosition(id, x, y);
    },
    [debouncedUpdatePosition]
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm("Delete this note from the board?")) {
        deleteNote(id);
      }
    },
    [deleteNote]
  );

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-accent-coral/30 border-t-accent-coral rounded-full animate-spin" />
          <p className="text-text-muted text-sm">Loading board...</p>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl glass flex items-center justify-center">
            <HiOutlineSparkles
              size={32}
              className="text-accent-coral"
            />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-3">
            The board is empty
          </h2>
          <p className="text-text-secondary mb-8 max-w-md">
            Be the first to leave your mark! Head to the Creative Canvas to
            write a message or draw something.
          </p>
          <Link href="/canvas">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-accent-coral to-accent-cyan text-white font-medium text-sm glow-purple"
            >
              Go to Canvas
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-4 px-4 pt-20 shrink-0"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="gradient-text">Community Board</span>
        </h1>
        <p className="text-text-secondary max-w-lg mx-auto text-sm">
          Drag notes around to explore. Each one was created on the Canvas by a
          visitor.
        </p>
      </motion.div>

      {/* Board — fills remaining screen space */}
      <div className="flex-1 px-4 pb-4 overflow-hidden">
        <div
          ref={boardRef}
          className="relative w-full h-full dot-grid rounded-2xl border border-glass-border overflow-hidden"
        >
          <AnimatePresence>
            {notes.map((note, i) => (
              <NoteCard
                key={note._id}
                note={note}
                isAdmin={isAdmin}
                onPositionChange={handlePositionChange}
                onDelete={handleDelete}
                index={i}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
