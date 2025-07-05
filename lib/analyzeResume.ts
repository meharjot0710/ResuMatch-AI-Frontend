import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const customizeResume = async (resumeText, jobDescription) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are a professional resume expert. Analyze the following resume against the given job description and return ONLY a valid JSON object.

Resume: ${resumeText}

Job Description: ${jobDescription}

IMPORTANT: Return ONLY a valid JSON object with no additional text, explanations, or markdown formatting. The JSON must contain exactly these keys:

{
  "match_score": 85,
  "match_quality": "Excellent Match",
  "matching_keywords": ["keyword1", "keyword2"],
  "missing_keywords": ["keyword3", "keyword4"],
  "improvement_suggestions": ["suggestion1", "suggestion2"],
  "tailored_resume": "optimized resume text for this job"
}

Rules:
- match_score must be a number between 0-100
- match_quality must be one of: "Excellent Match", "Good Match", "Fair Match", "Poor Match"
- matching_keywords and missing_keywords must be arrays of strings
- improvement_suggestions must be an array of strings
- tailored_resume must be a string
- Do not include any text before or after the JSON
- Do not use markdown code blocks
- Ensure the JSON is properly formatted and valid`,
  });
  return response.text.trim();
};