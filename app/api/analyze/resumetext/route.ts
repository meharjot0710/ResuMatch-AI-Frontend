import pdfParse from "pdf-parse";

export async function extractResumeText(buffer: Buffer) {
  const data = await pdfParse(buffer);
  return data.text;
}
