export async function extractResumeText(buffer: Buffer) {
  try {
    // ✅ Dynamic import
    const pdfParse = (await import("pdf-parse")).default;

    // ✅ Only parse actual buffer, no dummy init
    const data = await pdfParse(buffer);

    if (!data?.text?.trim()) {
      throw new Error("No text found in PDF");
    }

    return data.text.trim();

  } catch (err) {
    console.error("Fallback to plain text extraction:", err.message);

    const fallback = buffer.toString("utf8");
    if (fallback?.trim()) return fallback.trim();

    throw new Error("Failed to extract text from resume.");
  }
}
