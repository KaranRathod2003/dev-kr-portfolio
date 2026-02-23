import { Metadata } from "next";
import BoardCanvas from "@/components/board/BoardCanvas";

export const metadata: Metadata = {
  title: "Community Board | Developer Portfolio",
  description: "See what the community has created — messages, drawings, and creative notes.",
};

export default function BoardPage() {
  return (
    <div className="h-screen overflow-hidden bg-bg-primary">
      <BoardCanvas />
    </div>
  );
}
