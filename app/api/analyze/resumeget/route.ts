import { NextRequest, NextResponse } from "next/server";
import { verifyTok } from "../../verifytok";
import User from "@/models/User";
import { connectToDb } from "@/lib/mongodb";
import { getresume } from "@/lib/s3get";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const result = verifyTok(authHeader);

  if (!result.success) {
    return NextResponse.json({ error: result.message }, { status: 401 });
  }

  await connectToDb();

  const userId = result.decoded.userId;

  try {
    const user = await User.findById(userId);
    if (!user || !user.resumeLink) {
      return NextResponse.json({ error: "Resume not found." }, { status: 404 });
    }

    const resumeBuffer = await getresume(user.resumeLink);
    if (!resumeBuffer) {
      return NextResponse.json({ error: "Failed to fetch resume." }, { status: 500 });
    }

    return new NextResponse(resumeBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Error fetching resume link:", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
