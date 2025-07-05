import pdfParse from "pdf-parse";

export async function extractResumeText(buffer: Buffer) {
  try {
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
    
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF document.');
  }
}
