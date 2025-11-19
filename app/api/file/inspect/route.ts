import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type - support PDF and DOCX
    const isPDF = file.type === "application/pdf" || file.name.endsWith(".pdf");
    const isDOCX =
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx");

    if (!isPDF && !isDOCX) {
      return NextResponse.json(
        { error: "File must be a PDF or DOCX document" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let pageCount = 1;
    let wordCount = 0;

    if (isPDF) {
      // Parse PDF using pdf-lib
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      pageCount = pdfDoc.getPageCount();

      console.log(`PDF Analysis: ${pageCount} pages detected`);
    } else if (isDOCX) {
      // Parse DOCX
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value || "";

      // Count words
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      wordCount = words.length;

      // Estimate page count based on word count
      // Average ~250-300 words per page
      const wordsPerPage = 275;
      pageCount = Math.max(1, Math.ceil(wordCount / wordsPerPage));

      console.log(`DOCX Analysis: Estimated ${pageCount} pages, ${wordCount} words detected`);
    }

    return NextResponse.json({
      pageCount,
      wordCount,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error: any) {
    console.error("File inspection error:", error);
    return NextResponse.json(
      { error: "Unable to read file. Please enter the page count manually." },
      { status: 500 }
    );
  }
}
