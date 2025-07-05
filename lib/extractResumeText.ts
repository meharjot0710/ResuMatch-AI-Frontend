import pdfParse from "pdf-parse";

export async function extractResumeText(buffer: Buffer) {
  try {
    // Try to parse as PDF first
    try {
      const data = await pdfParse(buffer);
      
      if (!data || !data.text) {
        throw new Error('No text content found in PDF');
      }
      
      const extractedText = data.text.trim();
      
      if (extractedText.length === 0) {
        throw new Error('PDF appears to be empty or contains no extractable text');
      }
      
      return extractedText;
    } catch (pdfError) {
      // If PDF parsing fails, try to extract as plain text
      console.log('PDF parsing failed, trying plain text extraction:', pdfError.message);
      
      const textContent = buffer.toString('utf8');
      
      if (textContent && textContent.trim().length > 0) {
        return textContent.trim();
      }
      
      // If both PDF and text extraction fail, throw the original PDF error
      throw pdfError;
    }
    
  } catch (error) {
    console.error('Error extracting text from file:', error);
    
    // Provide specific error messages based on the error type
    if (error.message.includes('No text content found') || error.message.includes('PDF appears to be empty')) {
      throw new Error('The file appears to be empty or contains no extractable text. Please try a different file.');
    }
    
    if (error.message.includes('Invalid PDF')) {
      throw new Error('The file is not a valid PDF document. Please check your file and try again.');
    }
    
    if (error.message.includes('Password')) {
      throw new Error('This PDF is password protected. Please provide an unprotected PDF file.');
    }
    
    // Generic error for other cases
    throw new Error('Failed to extract text from the file. Please ensure it\'s a valid PDF or text document.');
  }
}
