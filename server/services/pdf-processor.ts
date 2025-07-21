import path from 'path';
import fs from 'fs/promises';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

export class PDFProcessor {
  private downloadsDir = path.join(process.cwd(), 'downloads');

  constructor() {
    this.ensureDownloadsDir();
  }

  private async ensureDownloadsDir() {
    try {
      await fs.access(this.downloadsDir);
    } catch {
      await fs.mkdir(this.downloadsDir, { recursive: true });
    }
  }

  async mergePDFs(files: Express.Multer.File[], options: any) {
    const mergedPdf = await PDFDocument.create();
    
    for (const file of files) {
      const pdfBytes = await fs.readFile(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    const filename = `merged-${Date.now()}.pdf`;
    const outputPath = path.join(this.downloadsDir, filename);
    
    await fs.writeFile(outputPath, pdfBytes);

    return {
      success: true,
      message: 'PDFs merged successfully',
      downloadUrl: `/api/download/${filename}`,
      filename
    };
  }

  async splitPDF(file: Express.Multer.File, options: any) {
    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();
    
    const results = [];
    const { splitType, pageRange } = options;
    
    if (splitType === 'By Pages') {
      // Split each page into separate PDFs
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(copiedPage);
        
        const newPdfBytes = await newPdf.save();
        const filename = `page-${i + 1}-${Date.now()}.pdf`;
        const outputPath = path.join(this.downloadsDir, filename);
        
        await fs.writeFile(outputPath, newPdfBytes);
        results.push({
          page: i + 1,
          filename,
          downloadUrl: `/api/download/${filename}`
        });
      }
    }

    return {
      success: true,
      message: `PDF split into ${results.length} files`,
      files: results
    };
  }

  async compressPDF(file: Express.Multer.File, options: any) {
    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Basic compression - in a real implementation, you'd use more sophisticated methods
    const compressedBytes = await pdf.save({
      useObjectStreams: true,
      addDefaultPage: false
    });

    const filename = `compressed-${Date.now()}.pdf`;
    const outputPath = path.join(this.downloadsDir, filename);
    
    await fs.writeFile(outputPath, compressedBytes);

    const originalSize = pdfBytes.length;
    const compressedSize = compressedBytes.length;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

    return {
      success: true,
      message: 'PDF compressed successfully',
      downloadUrl: `/api/download/${filename}`,
      originalSize: Math.round(originalSize / 1024),
      compressedSize: Math.round(compressedSize / 1024),
      compressionRatio: `${compressionRatio}%`
    };
  }

  async protectPDF(file: Express.Multer.File, options: any) {
    const pdfBytes = await fs.readFile(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Note: pdf-lib doesn't support password protection directly
    // In a real implementation, you'd use a library like pdf2pic + pdfkit
    // or node-qpdf for encryption
    
    const protectedBytes = await pdf.save();
    const filename = `protected-${Date.now()}.pdf`;
    const outputPath = path.join(this.downloadsDir, filename);
    
    await fs.writeFile(outputPath, protectedBytes);

    return {
      success: true,
      message: 'PDF protection applied (demo)',
      downloadUrl: `/api/download/${filename}`,
      note: 'Full password protection requires additional libraries in production'
    };
  }
}
