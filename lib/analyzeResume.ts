import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const customizeResume = async (resumeText, jobDescription) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a professional resume expert. Modify and enhance the following resume to match the given job description.
              Resume:${resumeText}

              Job Description:${jobDescription}

              Return a tailored version of the resume, optimized for this job in json format and also I want the match score for this job and resume(in percentage).
              `,
  });
  return response.text.trim();
};