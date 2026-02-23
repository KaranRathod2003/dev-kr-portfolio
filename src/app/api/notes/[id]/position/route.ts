import { NextResponse } from "next/server";
import { positionSchema } from "@/lib/validators";
import { flattenError } from "zod";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();

    const parsed = positionSchema.safeParse(body);
    if (!parsed.success) {
      const flat = flattenError(parsed.error);
      return NextResponse.json(
        { error: flat.formErrors[0] || "Invalid position" },
        { status: 400 }
      );
    }

    const { id } = await params;

    // If MongoDB is configured, persist to DB
    if (process.env.MONGODB_URI) {
      const dbConnect = (await import("@/lib/mongodb")).default;
      const Note = (await import("@/models/Note")).default;
      await dbConnect();

      const updated = await Note.findByIdAndUpdate(
        id,
        { $set: { boardPosition: { x: parsed.data.x, y: parsed.data.y } } },
        { new: true }
      );

      if (!updated) {
        return NextResponse.json(
          { error: "Note not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update position" },
      { status: 500 }
    );
  }
}
