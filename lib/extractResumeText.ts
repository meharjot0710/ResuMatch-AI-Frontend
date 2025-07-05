import pdfParse from "pdf-parse";

// Create a minimal PDF buffer that pdf-parse can use internally
const createMinimalPDFBuffer = () => {
  const minimalPDF = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Test PDF) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000256 00000 n 
0000000344 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
404
%%EOF`;
  
  return Buffer.from(minimalPDF, 'utf8');
};

export async function extractResumeText(buffer: Buffer) {
  try {
    // First, try to initialize pdf-parse with a minimal PDF to avoid the test file issue
    try {
      const minimalPDFBuffer = createMinimalPDFBuffer();
      await pdfParse(minimalPDFBuffer);
    } catch (initError) {
      console.log('PDF-parse initialization warning (this is normal):', initError.message);
    }

    // Now try to parse the actual PDF
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
