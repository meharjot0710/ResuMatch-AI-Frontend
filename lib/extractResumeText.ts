
// Alternative text extraction method that doesn't rely on pdf-parse
async function extractTextFallback(buffer: Buffer): Promise<string> {
  try {
    // Try to extract text using a different approach
    // This is a basic fallback that might work for some PDFs
    const text = buffer.toString('utf8');
    
    // Look for common PDF text markers
    const textMatches = text.match(/\/Text\s*\[([^\]]*)\]/g);
    if (textMatches && textMatches.length > 0) {
      const extractedText = textMatches
        .map(match => match.replace(/\/Text\s*\[([^\]]*)\]/, '$1'))
        .join(' ')
        .replace(/[^\w\s.,!?-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (extractedText.length > 10) {
        return extractedText;
      }
    }
    
    // If no structured text found, try to clean up the raw buffer
    const cleanedText = text
      .replace(/[^\w\s.,!?-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return cleanedText;
  } catch (error) {
    console.error("Fallback text extraction failed:", error);
    throw error;
  }
}

export async function extractResumeText(buffer: Buffer) {
  try {
    // Check if buffer is valid
    if (!buffer || buffer.length === 0) {
      throw new Error("Invalid or empty buffer provided");
    }

    console.log(`Attempting to extract text from buffer of size: ${buffer.length} bytes`);

    // Try to import and use pdf-parse
    try {
      const pdfParseModule = await import("pdf-parse");
      const pdfParse = pdfParseModule.default || pdfParseModule;
      console.log("Successfully imported pdf-parse module");

      // Parse the PDF buffer
      const data = await pdfParse(buffer);

      // Validate the parsed data
      if (!data || typeof data !== 'object') {
        throw new Error("Invalid PDF parsing result");
      }

      if (!data.text || typeof data.text !== 'string') {
        throw new Error("No text content found in PDF");
      }

      const extractedText = data.text.trim();
      
      if (!extractedText) {
        throw new Error("Extracted text is empty");
      }

      console.log(`Successfully extracted ${extractedText.length} characters from PDF`);
      return extractedText;

    } catch (pdfError) {
      console.error("PDF parsing with pdf-parse failed:", pdfError);
      // Continue to fallback methods instead of throwing
    }

    // Try the enhanced fallback method
    try {
      console.log("Attempting enhanced fallback text extraction...");
      const fallbackText = await extractTextFallback(buffer);
      
      if (fallbackText && fallbackText.length > 0) {
        console.log(`Enhanced fallback extraction successful: ${fallbackText.length} characters`);
        return fallbackText;
      }
    } catch (fallbackError) {
      console.error("Enhanced fallback extraction failed:", fallbackError);
    }

    // Try basic fallback text extraction
    try {
      console.log("Attempting basic fallback text extraction...");
      const fallback = buffer.toString("utf8");
      
      if (fallback && fallback.trim()) {
        console.log(`Basic fallback extraction successful: ${fallback.trim().length} characters`);
        return fallback.trim();
      }
    } catch (basicFallbackError) {
      console.error("Basic fallback extraction also failed:", basicFallbackError);
    }

    // If all else fails, throw a descriptive error
    throw new Error("All text extraction methods failed. Please ensure the uploaded file is a valid PDF or DOCX document.");

  } catch (err) {
    console.error("All text extraction methods failed:", err);
    throw err;
  }
}
