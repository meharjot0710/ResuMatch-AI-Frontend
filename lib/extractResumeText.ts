import pdfParse from "pdf-parse";
import mammoth from "mammoth"; // for DOCX

export async function extractResumeText(buffer: Buffer): Promise<string> {
  // Try PDF first
  try {
    const pdfData = await pdfParse(buffer);
    if (pdfData.text && pdfData.text.trim().length > 0) {
      return pdfData.text;
    }
  } catch (pdfError) {
    console.warn("PDF extraction failed, trying DOCX...", pdfError);
  }

  // Try DOCX fallback
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (docxError) {
    console.error("DOCX extraction failed:", docxError);
    throw new Error("Unable to extract text from resume.");
  }
}
