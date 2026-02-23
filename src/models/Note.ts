import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  userId: string;
  githubUsername: string;
  githubAvatar: string;
  textContent: Record<string, unknown>;
  textPreview: string;
  drawingSnapshot: Record<string, unknown> | null;
  drawingThumbnail: string | null;
  boardPosition: { x: number; y: number };
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    userId: { type: String, required: true, index: true },
    githubUsername: { type: String, required: true },
    githubAvatar: { type: String, required: true },
    textContent: { type: Schema.Types.Mixed, required: true },
    textPreview: { type: String, default: "" },
    drawingSnapshot: { type: Schema.Types.Mixed, default: null },
    drawingThumbnail: { type: String, default: null },
    boardPosition: {
      x: { type: Number, default: () => Math.floor(Math.random() * 800 + 100) },
      y: { type: Number, default: () => Math.floor(Math.random() * 500 + 100) },
    },
  },
  { timestamps: true }
);

NoteSchema.index({ createdAt: -1 });

export default mongoose.models.Note ||
  mongoose.model<INote>("Note", NoteSchema);
