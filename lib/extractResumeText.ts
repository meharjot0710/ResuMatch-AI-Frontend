import mammoth from "mammoth"; // keep mammoth here

export async function extractResumeText(buffer: Buffer): Promise<string> {
  try {
    const pdfParse = (await import("pdf-parse")).default; // Lazy import here
    const pdfData = await pdfParse(buffer);
    if (pdfData.text && pdfData.text.trim().length > 0) {
      return pdfData.text;
    }
  } catch (pdfError) {
    console.warn("PDF extraction failed, trying DOCX...", pdfError);
  }

  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch (docxError) {
    console.error("DOCX extraction failed:", docxError);
    throw new Error("Unable to extract text from resume.");
  }
}
