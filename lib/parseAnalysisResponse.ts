export function parseAnalysisResponse(response: string): any {
  try {
    // First, try to extract JSON from markdown code blocks
    const jsonBlockMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonBlockMatch && jsonBlockMatch[1]) {
      const jsonString = jsonBlockMatch[1].trim();
      return JSON.parse(jsonString);
    }

    // Try to extract JSON from code blocks without language specification
    const codeBlockMatch = response.match(/```\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      const jsonString = codeBlockMatch[1].trim();
      return JSON.parse(jsonString);
    }

    // Try to find JSON object in the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonString = jsonMatch[0].trim();
      return JSON.parse(jsonString);
    }

    // If no JSON found, try parsing the entire response
    return JSON.parse(response);
  } catch (error) {
    console.error("Failed to parse AI analysis response:", error);
    console.error("Raw response:", response);
    
    // Return a fallback object
    return {
      match_score: 0,
      match_quality: "Error",
      matching_keywords: [],
      missing_keywords: [],
      improvement_suggestions: ["Unable to analyze resume due to parsing error"],
      tailored_resume: "Analysis failed. Please try again."
    };
  }
} 