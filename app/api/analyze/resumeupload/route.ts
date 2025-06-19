import { uploadToS3 } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";
import { verifyTok } from "../../verifytok";
import User from "@/models/User";
import { connectToDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  console.log("authHeader:", authHeader);
  const result = verifyTok(authHeader);
  
  if (!result.success) {
    return NextResponse.json({ error: result.message }, { status: 401 });
  }

  connectToDb();

  const userId=result.decoded.userId;
  
  console.log("Decoded user:", result.decoded);
  console.log("Decoded user:", userId);

  const formData = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const url = await uploadToS3(buffer, file.name, file.type);

  let user = User.findOne({ userId });
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { resumeLink: url },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found." });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error updating resume link:", err);
    return  NextResponse.json({ success: false, message: "Failed to update user." });
  }
}
