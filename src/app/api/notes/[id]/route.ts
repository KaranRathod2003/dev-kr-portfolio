import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminGithubId = process.env.ADMIN_GITHUB_ID;
    const isAdmin =
      session.user.githubId === adminGithubId ||
      session.user.id === adminGithubId;

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    // If MongoDB is configured, delete from DB
    if (process.env.MONGODB_URI) {
      const dbConnect = (await import("@/lib/mongodb")).default;
      const Note = (await import("@/models/Note")).default;
      await dbConnect();

      const deleted = await Note.findByIdAndDelete(id);
      if (!deleted) {
        return NextResponse.json(
          { error: "Note not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
