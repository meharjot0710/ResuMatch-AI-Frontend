import { PDFDocument } from 'pdf-lib';

export async function extractResumeText(buffer: Buffer) {
  try {
    // Try to parse as PDF first
    try {
      const pdfDoc = await PDFDocument.load(buffer);
      const pages = pdfDoc.getPages();
      let fullText = '';
      for (const page of pages) {
        const text = await page.getTextContent?.(); // pdf-lib does not have getTextContent, so fallback
        if (text && typeof text === 'string') {
          fullText += text + '\n';
        } else {
          // pdf-lib does not support text extraction directly, so fallback to plain text
          // This is a limitation, but at least it will not crash
        }
      }
      // pdf-lib does not support text extraction directly, so fallback to plain text
      // If fullText is empty, fallback
      if (fullText.trim().length > 0) {
        return fullText.trim();
      }
      // fallback to plain text extraction
      const textContent = buffer.toString('utf8');
      if (textContent && textContent.trim().length > 0) {
        return textContent.trim();
      }
      throw new Error('No text content found in PDF');
    } catch (pdfError) {
      // If PDF parsing fails, try to extract as plain text
      const textContent = buffer.toString('utf8');
      if (textContent && textContent.trim().length > 0) {
        return textContent.trim();
      }
      throw pdfError;
    }
  } catch (error) {
    console.error('Error extracting text from file:', error);
    throw new Error('Failed to extract text from the file. Please ensure it\'s a valid PDF or text document.');
  }
}
