import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Demo notes shown when no database is connected
const DEMO_NOTES = [
  {
    _id: "demo-1",
    userId: "demo",
    githubUsername: "sarah_dev",
    githubAvatar: "https://avatars.githubusercontent.com/u/1024025?v=4",
    textPreview:
      "Love this portfolio! The animations are really smooth and the dark theme looks amazing. Keep building!",
    drawingThumbnail: null,
    boardPosition: { x: 120, y: 150 },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: "demo-2",
    userId: "demo",
    githubUsername: "code_wizard",
    githubAvatar: "https://avatars.githubusercontent.com/u/583231?v=4",
    textPreview:
      "This creative canvas concept is brilliant. Drawing + text + community board = next level portfolio.",
    drawingThumbnail: null,
    boardPosition: { x: 500, y: 100 },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    _id: "demo-3",
    userId: "demo",
    githubUsername: "pixel_artist",
    githubAvatar: "https://avatars.githubusercontent.com/u/9919?v=4",
    textPreview: "Drew a little spaceship on the canvas. This is so fun!",
    drawingThumbnail: null,
    boardPosition: { x: 300, y: 400 },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    _id: "demo-4",
    userId: "demo",
    githubUsername: "react_ninja",
    githubAvatar: "https://avatars.githubusercontent.com/u/810438?v=4",
    textPreview:
      "The glassmorphism cards and purple gradients are chef's kiss. What stack is this?",
    drawingThumbnail: null,
    boardPosition: { x: 750, y: 300 },
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    _id: "demo-5",
    userId: "demo",
    githubUsername: "fullstack_fan",
    githubAvatar: "https://avatars.githubusercontent.com/u/4164277?v=4",
    textPreview:
      "The infinite skill scroll is hypnotic. And drag-and-drop on this board? Super cool interaction!",
    drawingThumbnail: null,
    boardPosition: { x: 150, y: 600 },
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    _id: "demo-6",
    userId: "demo",
    githubUsername: "ui_unicorn",
    githubAvatar: "https://avatars.githubusercontent.com/u/6128107?v=4",
    textPreview:
      "Hired! Just kidding, but seriously this is one of the best dev portfolios I've seen. The attention to detail is incredible.",
    drawingThumbnail: null,
    boardPosition: { x: 550, y: 520 },
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export async function GET() {
  try {
    // If MongoDB is configured, fetch real notes
    if (process.env.MONGODB_URI) {
      const dbConnect = (await import("@/lib/mongodb")).default;
      const Note = (await import("@/models/Note")).default;
      await dbConnect();

      const notes = await Note.find({})
        .select("-drawingSnapshot -textContent")
        .sort({ createdAt: -1 })
        .limit(100)
        .lean();

      return NextResponse.json({ notes });
    }

    // Otherwise return demo notes
    return NextResponse.json({ notes: DEMO_NOTES });
  } catch {
    // Fallback to demo notes on any error
    return NextResponse.json({ notes: DEMO_NOTES });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { textContent, textPreview, drawingSnapshot, drawingThumbnail } =
      body;

    if (!textContent && !drawingSnapshot) {
      return NextResponse.json(
        { error: "Please add some text or a drawing" },
        { status: 400 }
      );
    }

    // If MongoDB is configured, save to DB
    if (process.env.MONGODB_URI) {
      const dbConnect = (await import("@/lib/mongodb")).default;
      const Note = (await import("@/models/Note")).default;
      await dbConnect();

      const note = await Note.create({
        userId: session.user.id,
        githubUsername:
          session.user.username || session.user.name || "anonymous",
        githubAvatar: session.user.image || "",
        textContent: textContent || {},
        textPreview: (textPreview || "").slice(0, 150),
        drawingSnapshot: drawingSnapshot || null,
        drawingThumbnail: drawingThumbnail || null,
      });

      return NextResponse.json(note, { status: 201 });
    }

    // Demo mode — return a fake created note
    return NextResponse.json(
      {
        _id: `demo-${Date.now()}`,
        userId: session.user.id,
        githubUsername: session.user.username || "anonymous",
        githubAvatar: session.user.image || "",
        textPreview: (textPreview || "").slice(0, 150),
        drawingThumbnail: drawingThumbnail || null,
        boardPosition: {
          x: Math.floor(Math.random() * 800 + 100),
          y: Math.floor(Math.random() * 500 + 100),
        },
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
