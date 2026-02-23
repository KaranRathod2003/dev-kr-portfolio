"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiOutlineTrash } from "react-icons/hi";

interface NoteCardProps {
  note: {
    _id: string;
    githubUsername: string;
    githubAvatar: string;
    textPreview: string;
    drawingThumbnail: string | null;
    boardPosition: { x: number; y: number };
    createdAt: string;
  };
  isAdmin: boolean;
  onPositionChange: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
  index: number;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function NoteCard({
  note,
  isAdmin,
  onPositionChange,
  onDelete,
  index,
}: NoteCardProps) {
  const posRef = useRef({ x: note.boardPosition.x, y: note.boardPosition.y });

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number; y: number } }) => {
      const newX = posRef.current.x + info.offset.x;
      const newY = posRef.current.y + info.offset.y;
      posRef.current = { x: newX, y: newY };
      onPositionChange(note._id, newX, newY);
    },
    [note._id, onPositionChange]
  );

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      initial={{
        x: note.boardPosition.x,
        y: note.boardPosition.y,
        opacity: 0,
        scale: 0.8,
        rotate: -2 + Math.random() * 4,
      }}
      animate={{
        x: note.boardPosition.x,
        y: note.boardPosition.y,
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.05,
      }}
      whileDrag={{
        scale: 1.08,
        zIndex: 50,
        boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
      }}
      className="absolute w-72 cursor-grab active:cursor-grabbing group"
      style={{ position: "absolute" }}
    >
      <div className="relative glass glass-hover rounded-2xl p-4 border border-glass-border hover:border-accent-coral/20 transition-all">
        {/* Author info */}
        <div className="flex items-center gap-2 mb-3">
          {note.githubAvatar && (
            <Image
              src={note.githubAvatar}
              alt={note.githubUsername}
              width={24}
              height={24}
              className="rounded-full border border-glass-border"
            />
          )}
          <span className="text-xs text-text-secondary font-medium">
            @{note.githubUsername}
          </span>
          <span className="text-[10px] text-text-muted ml-auto">
            {timeAgo(note.createdAt)}
          </span>
        </div>

        {/* Drawing thumbnail */}
        {note.drawingThumbnail && (
          <div className="w-full h-36 rounded-lg overflow-hidden bg-bg-tertiary mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={note.drawingThumbnail}
              alt="Drawing"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}

        {/* Text preview */}
        {note.textPreview && (
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {note.textPreview}
          </p>
        )}

        {/* Admin delete */}
        {isAdmin && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note._id);
            }}
            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <HiOutlineTrash size={14} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
