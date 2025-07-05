// Enhanced text extraction method with better PDF parsing
async function extractTextWithPdfParse(buffer: Buffer): Promise<string> {
  try {
    const pdfParseModule = await import("pdf-parse");
    const pdfParse = pdfParseModule.default || pdfParseModule;
    
    // Use more robust parsing options for better accuracy
    const options = {
      // Normalize whitespace
      normalizeWhitespace: true,
      // Disable line breaks to get continuous text
      disableCombineTextItems: false,
      // Try to preserve formatting
      preserveFormatting: true
    };

    const data = await pdfParse(buffer, options);
    
    if (!data || typeof data !== 'object') {
      throw new Error("Invalid PDF parsing result");
    }

    if (!data.text || typeof data.text !== 'string') {
      throw new Error("No text content found in PDF");
    }

    let extractedText = data.text.trim();
    
    if (!extractedText) {
      throw new Error("Extracted text is empty");
    }

    // Clean up the extracted text for better analysis
    extractedText = extractedText
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove common PDF artifacts
      .replace(/[^\w\s.,!?@#$%&*()_+\-=\[\]{};':"\\|<>\/\n]/g, ' ')
      // Clean up multiple spaces
      .replace(/\s+/g, ' ')
      .trim();

    console.log(`PDF-parse extracted ${extractedText.length} characters`);
    return extractedText;

  } catch (error) {
    console.error("PDF-parse extraction failed:", error);
    throw error;
  }
}

// Alternative PDF parsing using pdfjs-dist (more reliable in serverless)
async function extractTextWithPdfJs(buffer: Buffer): Promise<string> {
  try {
    // Import the serverless-compatible version
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.js");
    
    // Disable worker to avoid canvas dependency issues in serverless
    pdfjsLib.GlobalWorkerOptions.workerSrc = false;

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ 
      data: buffer,
      // Disable features that require canvas
      disableFontFace: true,
      disableRange: true,
      disableStream: true
    });
    
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + ' ';
    }
    
    if (!fullText.trim()) {
      throw new Error("No text content found in PDF");
    }

    // Clean up the extracted text
    const cleanedText = fullText
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?@#$%&*()_+\-=\[\]{};':"\\|<>\/\n]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    console.log(`PDF.js extracted ${cleanedText.length} characters from ${pdf.numPages} pages`);
    return cleanedText;

  } catch (error) {
    console.error("PDF.js extraction failed:", error);
    throw error;
  }
}

// Alternative text extraction method that doesn't rely on pdf-parse
async function extractTextFallback(buffer: Buffer): Promise<string> {
  try {
    const text = buffer.toString('utf8');
    
    // Look for common PDF text markers with better regex
    const textMatches = text.match(/\/Text\s*\[([^\]]*)\]/g);
    if (textMatches && textMatches.length > 0) {
      const extractedText = textMatches
        .map(match => match.replace(/\/Text\s*\[([^\]]*)\]/, '$1'))
        .join(' ')
        .replace(/[^\w\s.,!?@#$%&*()_+\-=\[\]{};':"\\|<>\/]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (extractedText.length > 20) {
        console.log(`Enhanced fallback extracted ${extractedText.length} characters`);
        return extractedText;
      }
    }
    
    // Try to extract text from PDF stream objects
    const streamMatches = text.match(/stream\s*([\s\S]*?)\s*endstream/g);
    if (streamMatches && streamMatches.length > 0) {
      const streamText = streamMatches
        .map(match => match.replace(/stream\s*([\s\S]*?)\s*endstream/, '$1'))
        .join(' ')
        .replace(/[^\w\s.,!?@#$%&*()_+\-=\[\]{};':"\\|<>\/]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (streamText.length > 20) {
        console.log(`Stream fallback extracted ${streamText.length} characters`);
        return streamText;
      }
    }
    
    // If no structured text found, try to clean up the raw buffer
    const cleanedText = text
      .replace(/[^\w\s.,!?@#$%&*()_+\-=\[\]{};':"\\|<>\/\n]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanedText.length > 10) {
      console.log(`Basic fallback extracted ${cleanedText.length} characters`);
      return cleanedText;
    }
    
    throw new Error("No readable text found in fallback extraction");
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

    // First attempt: Try pdf-parse with enhanced options
    try {
      console.log("Attempting PDF-parse extraction...");
      const extractedText = await extractTextWithPdfParse(buffer);
      
      if (extractedText && extractedText.length > 0) {
        console.log(`PDF-parse extraction successful: ${extractedText.length} characters`);
        return extractedText;
      }
    } catch (pdfError) {
      console.error("PDF-parse extraction failed:", pdfError);
      // Continue to next method
    }

    // Second attempt: Try PDF.js (more reliable in serverless)
    try {
      console.log("Attempting PDF.js extraction...");
      const extractedText = await extractTextWithPdfJs(buffer);
      
      if (extractedText && extractedText.length > 0) {
        console.log(`PDF.js extraction successful: ${extractedText.length} characters`);
        return extractedText;
      }
    } catch (pdfJsError) {
      console.error("PDF.js extraction failed:", pdfJsError);
      // Continue to fallback methods
    }

    // Third attempt: Try enhanced fallback method
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

    // Fourth attempt: Try basic fallback text extraction
    try {
      console.log("Attempting basic fallback text extraction...");
      const fallback = buffer.toString("utf8");
      
      if (fallback && fallback.trim()) {
        const cleanedFallback = fallback
          .replace(/[^\w\s.,!?@#$%&*()_+\-=\[\]{};':"\\|<>\/\n]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        if (cleanedFallback.length > 0) {
          console.log(`Basic fallback extraction successful: ${cleanedFallback.length} characters`);
          return cleanedFallback;
        }
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
