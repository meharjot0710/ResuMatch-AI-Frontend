import { uploadToS3 } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";
import { verifyTok } from "../../verifytok";
import User from "@/models/User";
import { connectToDb } from "@/lib/mongodb";
import { extractResumeText } from "@/lib/extractResumeText";
import { customizeResume } from "@/lib/analyzeResume";
import { updateUserMatchScore } from "@/lib/updateMatchScore";
import { parseAnalysisResponse } from "@/lib/parseAnalysisResponse";

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

  // const url = await uploadToS3(buffer, file.name, file.type);

  try {
    const extractedText = await extractResumeText(buffer);

    const rawAnalysis = await customizeResume(extractedText, jobDescription);
    
    // Parse the analysis using the robust parsing function
    const analysisData = parseAnalysisResponse(rawAnalysis);
    const matchScore = analysisData.match_score || 0;

    console.log('Resume Upload Debug - Before match score update:', {
      userId,
      matchScore,
      analysisData: analysisData
    });

    // Update user's average match score (this will also increment totalAnalysis)
    const matchScoreUpdate = await updateUserMatchScore(userId, matchScore);

    console.log('Resume Upload Debug - After match score update:', matchScoreUpdate);

    if (!matchScoreUpdate.success) {
      return NextResponse.json({ success: false, message: matchScoreUpdate.error });
    }

    // Get updated user data
    const updatedUser = await User.findById(userId);

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found after update." });
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        totalAnalysis: updatedUser.totalAnalysis,
        avgMatchScore: updatedUser.avgMatchScore
      },
      analysis: JSON.stringify(analysisData), // Send parsed JSON as string
      matchScoreUpdate: matchScoreUpdate
    }); 
  } catch (err) {
    console.error("Error while saving user:", err);
    return NextResponse.json({ success: false, message: "Server error." });
  }
}
