import { Metadata } from "next";
import NoteComposer from "@/components/canvas/NoteComposer";

export const metadata: Metadata = {
  title: "Creative Canvas | Developer Portfolio",
  description:
    "Write a message and draw something creative for the community board.",
};

export default function CanvasPage() {
  return (
    <div className="min-h-screen bg-bg-primary dot-grid">
      <NoteComposer />
    </div>
  );
}
