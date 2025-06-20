import { uploadToS3 } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";
import { verifyTok } from "../../verifytok";
import User from "@/models/User";
import { connectToDb } from "@/lib/mongodb";
import { extractResumeText } from "@/lib/extractResumeText";
import { customizeResume } from "@/lib/analyzeResume";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  const result = verifyTok(authHeader);
  if (!result.success) {
    return NextResponse.json({ error: result.message }, { status: 401 });
  }

  await connectToDb();

  if (
    !result.decoded ||
    typeof result.decoded === "string" ||
    !("userId" in result.decoded)
  ) {
    return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
  }
  const userId = (result.decoded as { userId: string }).userId;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const jobDescription = formData.get("jobDescription") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const url = await uploadToS3(buffer, file.name, file.type);

  try {
   const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { resumeLink: url },
        $inc: { totalAnalysis: 1 }
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found." });
    }

    const extractedText = await extractResumeText(buffer);

    console.log("JobDesc",jobDescription)

    const analysis= await customizeResume(extractedText,jobDescription);
    console.log("analysis", analysis);

    return NextResponse.json({
      success: true,
      user: updatedUser,
      extractedText,
    }); 
  } catch (err) {
    console.error("Error while saving user:", err);
    return NextResponse.json({ success: false, message: "Server error." });
  }
}
