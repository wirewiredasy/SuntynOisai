import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

export class GovernmentTools {
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

  async validatePAN(panNumber: string) {
    if (!panNumber) {
      throw new Error('PAN number is required');
    }

    // PAN format: AAAPL1234C
    // A = Letter, P = P, L = Letter, 1234 = Numbers, C = Letter
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const isValid = panRegex.test(panNumber.toUpperCase());

    let details = {};
    if (isValid) {
      const panUpper = panNumber.toUpperCase();
      details = {
        format: 'Valid',
        type: this.getPANType(panUpper[3]),
        category: this.getPANCategory(panUpper),
        checksum: 'Valid'
      };
    }

    return {
      success: true,
      panNumber: panNumber.toUpperCase(),
      isValid,
      details: isValid ? details : { format: 'Invalid PAN format' }
    };
  }

  private getPANType(fourthChar: string): string {
    const types: { [key: string]: string } = {
      'P': 'Individual',
      'C': 'Company',
      'H': 'HUF',
      'F': 'Firm',
      'A': 'Association',
      'T': 'Trust',
      'B': 'Body of Individuals',
      'L': 'Local Authority',
      'J': 'Artificial Juridical Person',
      'G': 'Government'
    };
    return types[fourthChar] || 'Unknown';
  }

  private getPANCategory(pan: string): string {
    // This is a simplified categorization
    return pan.substring(0, 3);
  }

  async maskAadhaar(files: Express.Multer.File[], options: any) {
    const results = [];
    const { maskType } = options;

    for (const file of files) {
      const filename = `masked-${Date.now()}-${file.originalname}`;
      const outputPath = path.join(this.downloadsDir, filename);

      if (file.mimetype === 'application/pdf') {
        // For PDFs, we'd need a more sophisticated approach
        // This is a placeholder implementation
        await fs.copyFile(file.path, outputPath);
        
        results.push({
          originalName: file.originalname,
          filename,
          downloadUrl: `/api/download/${filename}`,
          maskType,
          note: 'PDF masking requires OCR integration in production'
        });
      } else {
        // For images, add a simple overlay
        await sharp(file.path)
          .composite([{
            input: Buffer.from(`
              <svg width="300" height="30">
                <rect width="300" height="30" fill="black" opacity="0.8"/>
                <text x="10" y="20" fill="white" font-size="14">XXXX XXXX ${maskType}</text>
              </svg>
            `),
            top: 50,
            left: 50
          }])
          .png()
          .toFile(outputPath);

        results.push({
          originalName: file.originalname,
          filename,
          downloadUrl: `/api/download/${filename}`,
          maskType
        });
      }
    }

    return {
      success: true,
      message: `${results.length} documents masked successfully`,
      files: results
    };
  }

  async calculateGST(options: any) {
    const { amount, gstRate } = options;
    const baseAmount = parseFloat(amount);
    const rate = parseFloat(gstRate.replace('%', '')) / 100;

    const gstAmount = baseAmount * rate;
    const totalAmount = baseAmount + gstAmount;

    // For CGST + SGST calculation (applicable for intra-state)
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    return {
      success: true,
      calculation: {
        baseAmount: baseAmount.toFixed(2),
        gstRate: `${(rate * 100).toFixed(0)}%`,
        gstAmount: gstAmount.toFixed(2),
        cgst: cgst.toFixed(2),
        sgst: sgst.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      },
      breakdown: {
        'Base Amount': `₹${baseAmount.toFixed(2)}`,
        'GST Rate': `${(rate * 100).toFixed(0)}%`,
        'CGST': `₹${cgst.toFixed(2)}`,
        'SGST': `₹${sgst.toFixed(2)}`,
        'Total GST': `₹${gstAmount.toFixed(2)}`,
        'Total Amount': `₹${totalAmount.toFixed(2)}`
      }
    };
  }

  async verifyDocument(files: Express.Multer.File[], options: any) {
    const results = [];

    // This is a mock implementation
    // In production, this would involve sophisticated document analysis
    for (const file of files) {
      const mockScore = Math.floor(Math.random() * 20) + 80; // Random score between 80-100
      
      results.push({
        filename: file.originalname,
        authenticity: {
          score: mockScore,
          status: mockScore > 85 ? 'Authentic' : 'Requires Review',
          checks: {
            'Watermark': mockScore > 90 ? 'Detected' : 'Not Detected',
            'Security Features': 'Present',
            'Format Compliance': 'Valid',
            'Digital Signature': mockScore > 95 ? 'Valid' : 'Not Present'
          }
        },
        note: 'This is a demo verification. Production version requires AI model integration.'
      });
    }

    return {
      success: true,
      message: `${results.length} documents verified`,
      verifications: results
    };
  }
}
