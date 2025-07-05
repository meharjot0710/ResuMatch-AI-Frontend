// PDF text extraction with conditional import
export async function extractResumeText(buffer: Buffer) {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      throw new Error('PDF parsing is not supported in browser environment');
    }

    // Only import pdf-parse at runtime, not during build
    let pdfParse;
    try {
      const pdfParseModule = await import('pdf-parse');
      pdfParse = pdfParseModule.default || pdfParseModule;
    } catch (importError) {
      console.error('Failed to import pdf-parse:', importError);
      throw new Error('PDF parsing library is not available');
    }

    const data = await pdfParse(buffer);
    
    if (!data || !data.text) {
      throw new Error('No text content found in PDF');
    }
    
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    
    // Provide more specific error messages
    if (error.message.includes('No text content found')) {
      throw new Error('The PDF appears to be empty or contains no extractable text. Please try a different file.');
    }
    
    if (error.message.includes('browser environment')) {
      throw new Error('PDF parsing is not available in this environment.');
    }
    
    if (error.message.includes('not available')) {
      throw new Error('PDF parsing service is temporarily unavailable. Please try again later.');
    }
    
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF document.');
  }
}
