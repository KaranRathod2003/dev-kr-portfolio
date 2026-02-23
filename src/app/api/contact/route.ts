import { NextResponse } from "next/server";
import { flattenError } from "zod";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const flat = flattenError(parsed.error);
      const firstIssue =
        flat.fieldErrors.name?.[0] ||
        flat.fieldErrors.email?.[0] ||
        flat.fieldErrors.message?.[0] ||
        "Invalid input";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    // If MongoDB is configured, save to DB
    if (process.env.MONGODB_URI) {
      const dbConnect = (await import("@/lib/mongodb")).default;
      const Contact = (await import("@/models/Contact")).default;
      await dbConnect();
      await Contact.create(parsed.data);
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
