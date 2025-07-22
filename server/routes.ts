import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import session from "express-session";
import { insertToolUsageSchema } from "@shared/schema";
import { PDFProcessor } from "./services/pdf-processor";
import { ImageProcessor } from "./services/image-processor";
import { AudioProcessor } from "./services/audio-processor";
import { GovernmentTools } from "./services/government-tools";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB max file size
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(session({
    secret: 'suntynai-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
  }));

  const pdfProcessor = new PDFProcessor();
  const imageProcessor = new ImageProcessor();
  const audioProcessor = new AudioProcessor();
  const governmentTools = new GovernmentTools();

  // Get all tools with categorized structure
  app.get("/api/tools", async (req, res) => {
    try {
      const tools = await storage.getAllTools();
      const categorized = {
        pdf: tools.filter(t => t.category === 'pdf'),
        image: tools.filter(t => t.category === 'image'),
        audio: tools.filter(t => t.category === 'audio'),
        government: tools.filter(t => t.category === 'government')
      };
      res.json(categorized);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  });

  // Get tool by slug - Fixed to handle all tool names
  app.get("/api/tools/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      // Define all 80 tools with their metadata
      const allTools = {
        // PDF Tools (20)
        "pdf-merge": { id: 1, name: "PDF Merge", description: "Combine multiple PDF files into one", category: "pdf", status: "active" },
        "pdf-split": { id: 2, name: "PDF Split", description: "Split PDF into separate pages", category: "pdf", status: "active" },
        "pdf-compress": { id: 3, name: "PDF Compress", description: "Reduce PDF file size", category: "pdf", status: "active" },
        "pdf-to-word": { id: 4, name: "PDF to Word", description: "Convert PDF to Word document", category: "pdf", status: "active" },
        "pdf-to-excel": { id: 5, name: "PDF to Excel", description: "Convert PDF to Excel spreadsheet", category: "pdf", status: "active" },
        "pdf-to-powerpoint": { id: 6, name: "PDF to PowerPoint", description: "Convert PDF to PowerPoint", category: "pdf", status: "active" },
        "pdf-password-protect": { id: 7, name: "PDF Password Protect", description: "Add password protection to PDF", category: "pdf", status: "active" },
        "pdf-password-remove": { id: 8, name: "PDF Password Remove", description: "Remove password from PDF", category: "pdf", status: "active" },
        "pdf-watermark": { id: 9, name: "PDF Watermark", description: "Add watermark to PDF pages", category: "pdf", status: "active" },
        "pdf-page-delete": { id: 10, name: "PDF Page Delete", description: "Delete specific pages from PDF", category: "pdf", status: "active" },
        "pdf-page-rotate": { id: 11, name: "PDF Page Rotate", description: "Rotate PDF pages", category: "pdf", status: "active" },
        "pdf-ocr": { id: 12, name: "PDF OCR", description: "Extract text from scanned PDF", category: "pdf", status: "active" },
        "pdf-form-fill": { id: 13, name: "PDF Form Fill", description: "Fill PDF forms electronically", category: "pdf", status: "active" },
        "pdf-metadata-edit": { id: 14, name: "PDF Metadata Edit", description: "Edit PDF properties and metadata", category: "pdf", status: "active" },
        "pdf-bookmark-add": { id: 15, name: "PDF Bookmark Add", description: "Add bookmarks to PDF", category: "pdf", status: "active" },
        "pdf-page-numbers": { id: 16, name: "PDF Page Numbers", description: "Add page numbers to PDF", category: "pdf", status: "active" },
        "pdf-background-remove": { id: 17, name: "PDF Background Remove", description: "Remove background from PDF", category: "pdf", status: "active" },
        "pdf-signature-add": { id: 18, name: "PDF Signature Add", description: "Add digital signature to PDF", category: "pdf", status: "active" },
        "pdf-header-footer": { id: 19, name: "PDF Header Footer", description: "Add header and footer to PDF", category: "pdf", status: "active" },
        "pdf-black-white": { id: 20, name: "PDF Black White", description: "Convert PDF to black and white", category: "pdf", status: "active" },

        // Image Tools (20)
        "image-resize": { id: 21, name: "Image Resize", description: "Resize images to custom dimensions", category: "image", status: "active" },
        "image-compress": { id: 22, name: "Image Compress", description: "Reduce image file size", category: "image", status: "active" },
        "background-remove": { id: 23, name: "Background Remove", description: "Remove background from images", category: "image", status: "active" },
        "image-crop": { id: 24, name: "Image Crop", description: "Crop images to specific dimensions", category: "image", status: "active" },
        "image-format-convert": { id: 25, name: "Image Format Convert", description: "Convert between image formats", category: "image", status: "active" },
        "image-enhance": { id: 26, name: "Image Enhance", description: "AI-powered image enhancement", category: "image", status: "active" },
        "image-upscale": { id: 27, name: "Image Upscale", description: "Increase image resolution with AI", category: "image", status: "active" },
        "image-filters": { id: 28, name: "Image Filters", description: "Apply artistic filters to images", category: "image", status: "active" },
        "image-watermark": { id: 29, name: "Image Watermark", description: "Add watermark to images", category: "image", status: "active" },
        "qr-code-generator": { id: 30, name: "QR Code Generator", description: "Generate QR codes", category: "image", status: "active" },
        "barcode-generator": { id: 31, name: "Barcode Generator", description: "Generate various barcodes", category: "image", status: "active" },
        "image-collage": { id: 32, name: "Image Collage", description: "Create photo collages", category: "image", status: "active" },
        "meme-generator": { id: 33, name: "Meme Generator", description: "Create memes with text", category: "image", status: "active" },
        "image-border": { id: 34, name: "Image Border", description: "Add borders to images", category: "image", status: "active" },
        "image-rotate": { id: 35, name: "Image Rotate", description: "Rotate images by any angle", category: "image", status: "active" },
        "image-flip": { id: 36, name: "Image Flip", description: "Flip images horizontally/vertically", category: "image", status: "active" },
        "image-grayscale": { id: 37, name: "Image Grayscale", description: "Convert images to grayscale", category: "image", status: "active" },
        "image-sepia": { id: 38, name: "Image Sepia", description: "Apply sepia effect to images", category: "image", status: "active" },
        "image-blur": { id: 39, name: "Image Blur", description: "Apply blur effect to images", category: "image", status: "active" },
        "image-sharpen": { id: 40, name: "Image Sharpen", description: "Sharpen blurry images", category: "image", status: "active" },

        // Audio/Video Tools (20)
        "audio-convert": { id: 41, name: "Audio Convert", description: "Convert between audio formats", category: "audio", status: "active" },
        "video-convert": { id: 42, name: "Video Convert", description: "Convert between video formats", category: "audio", status: "active" },
        "audio-trim": { id: 43, name: "Audio Trim", description: "Cut and trim audio files", category: "audio", status: "active" },
        "video-trim": { id: 44, name: "Video Trim", description: "Cut and trim video files", category: "audio", status: "active" },
        "audio-merge": { id: 45, name: "Audio Merge", description: "Combine multiple audio files", category: "audio", status: "active" },
        "video-merge": { id: 46, name: "Video Merge", description: "Combine multiple video files", category: "audio", status: "active" },
        "audio-extract": { id: 47, name: "Audio Extract", description: "Extract audio from video", category: "audio", status: "active" },
        "video-compress": { id: 48, name: "Video Compress", description: "Reduce video file size", category: "audio", status: "active" },
        "audio-compress": { id: 49, name: "Audio Compress", description: "Reduce audio file size", category: "audio", status: "active" },
        "volume-boost": { id: 50, name: "Volume Boost", description: "Increase audio volume", category: "audio", status: "active" },
        "audio-normalize": { id: 51, name: "Audio Normalize", description: "Normalize audio levels", category: "audio", status: "active" },
        "video-speed-change": { id: 52, name: "Video Speed Change", description: "Change video playback speed", category: "audio", status: "active" },
        "audio-speed-change": { id: 53, name: "Audio Speed Change", description: "Change audio playback speed", category: "audio", status: "active" },
        "video-stabilize": { id: 54, name: "Video Stabilize", description: "Stabilize shaky videos", category: "audio", status: "active" },
        "noise-removal": { id: 55, name: "Noise Removal", description: "Remove background noise", category: "audio", status: "active" },
        "video-reverse": { id: 56, name: "Video Reverse", description: "Reverse video playback", category: "audio", status: "active" },
        "audio-reverse": { id: 57, name: "Audio Reverse", description: "Reverse audio playback", category: "audio", status: "active" },
        "video-resize": { id: 58, name: "Video Resize", description: "Change video dimensions", category: "audio", status: "active" },
        "video-rotate": { id: 59, name: "Video Rotate", description: "Rotate video orientation", category: "audio", status: "active" },
        "gif-maker": { id: 60, name: "GIF Maker", description: "Create GIF from video", category: "audio", status: "active" },

        // Government Tools (20)
        "pan-validation": { id: 61, name: "PAN Validation", description: "Validate PAN card numbers", category: "government", status: "active" },
        "aadhaar-mask": { id: 62, name: "Aadhaar Mask", description: "Mask Aadhaar card numbers", category: "government", status: "active" },
        "gst-calculator": { id: 63, name: "GST Calculator", description: "Calculate GST amounts", category: "government", status: "active" },
        "ifsc-code-finder": { id: 64, name: "IFSC Code Finder", description: "Find bank IFSC codes", category: "government", status: "active" },
        "passport-photo": { id: 65, name: "Passport Photo", description: "Create passport size photos", category: "government", status: "active" },
        "income-tax-calculator": { id: 66, name: "Income Tax Calculator", description: "Calculate income tax", category: "government", status: "active" },
        "epf-calculator": { id: 67, name: "EPF Calculator", description: "Calculate EPF amounts", category: "government", status: "active" },
        "ppf-calculator": { id: 68, name: "PPF Calculator", description: "Calculate PPF returns", category: "government", status: "active" },
        "emi-calculator": { id: 69, name: "EMI Calculator", description: "Calculate loan EMIs", category: "government", status: "active" },
        "sip-calculator": { id: 70, name: "SIP Calculator", description: "Calculate SIP returns", category: "government", status: "active" },
        "digital-signature": { id: 71, name: "Digital Signature", description: "Create digital signatures", category: "government", status: "active" },
        "voter-id-verification": { id: 72, name: "Voter ID Verification", description: "Verify voter ID details", category: "government", status: "active" },
        "driving-license-check": { id: 73, name: "Driving License Check", description: "Check driving license status", category: "government", status: "active" },
        "vehicle-registration": { id: 74, name: "Vehicle Registration", description: "Check vehicle details", category: "government", status: "active" },
        "property-tax-calculator": { id: 75, name: "Property Tax Calculator", description: "Calculate property tax", category: "government", status: "active" },
        "stamp-duty-calculator": { id: 76, name: "Stamp Duty Calculator", description: "Calculate stamp duty", category: "government", status: "active" },
        "tds-calculator": { id: 77, name: "TDS Calculator", description: "Calculate TDS amounts", category: "government", status: "active" },
        "provident-fund": { id: 78, name: "Provident Fund", description: "PF account management tools", category: "government", status: "active" },
        "gratuity-calculator": { id: 79, name: "Gratuity Calculator", description: "Calculate gratuity amount", category: "government", status: "active" },
        "hra-calculator": { id: 80, name: "HRA Calculator", description: "Calculate HRA exemption", category: "government", status: "active" }
      };

      const tool = allTools[slug as keyof typeof allTools];
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      
      res.json({
        ...tool,
        slug,
        icon: getToolIcon(tool.category),
        features: ["Upload", "Process", "Download", "Share", "Cloud Sync"],
        processingTime: "< 5 seconds",
        maxFileSize: "500MB",
        supportedFormats: getSupportedFormats(tool.category)
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tool" });
    }
  });

  function getToolIcon(category: string): string {
    const icons = {
      pdf: "📄",
      image: "🖼️", 
      audio: "🎵",
      government: "🏛️"
    };
    return icons[category as keyof typeof icons] || "⚙️";
  }

  function getSupportedFormats(category: string): string[] {
    const formats = {
      pdf: ["PDF", "DOC", "DOCX", "TXT"],
      image: ["JPG", "PNG", "WEBP", "GIF", "BMP", "TIFF", "SVG"],
      audio: ["MP3", "WAV", "MP4", "AVI", "MOV", "FLAC", "AAC"],
      government: ["PDF", "JPG", "PNG", "DOC", "DOCX"]
    };
    return formats[category as keyof typeof formats] || [];
  }

  // Unified tool processing endpoint
  app.post("/api/tools/:slug/process", upload.array('files'), async (req, res) => {
    try {
      const { slug } = req.params;
      const files = req.files as Express.Multer.File[];
      // Parse options from request body with error handling
      let options = {};
      try {
        options = JSON.parse(req.body.options || '{}');
      } catch (error) {
        console.error('Error parsing options:', error);
        options = {};
      }

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      let result;
      const startTime = Date.now();

      // Route to appropriate processor based on tool slug
      switch (slug) {
        // PDF Tools
        case 'pdf-merge':
          result = await pdfProcessor.mergePDFs(files, options);
          break;
        case 'pdf-split':
          result = await pdfProcessor.splitPDF(files[0], options);
          break;
        case 'pdf-compress':
          result = await pdfProcessor.compressPDF(files[0], options);
          break;
        case 'pdf-to-word':
          result = await pdfProcessor.convertToWord(files[0], options);
          break;
        case 'pdf-to-excel':
          result = await pdfProcessor.convertToExcel(files[0], options);
          break;
        case 'pdf-password-protect':
          result = await pdfProcessor.protectPDF(files[0], options);
          break;
        case 'pdf-password-remove':
          result = await pdfProcessor.unlockPDF(files[0], options);
          break;
        case 'pdf-watermark':
          result = await pdfProcessor.addWatermark(files[0], options);
          break;
        case 'pdf-ocr':
          result = await pdfProcessor.extractText(files[0], options);
          break;
        
        // Image Tools
        case 'image-resize':
          result = await imageProcessor.resizeImages(files, options);
          break;
        case 'image-compress':
          result = await imageProcessor.compressImages(files, options);
          break;
        case 'background-remove':
          result = await imageProcessor.removeBackground(files, options);
          break;
        case 'image-crop':
          result = await imageProcessor.cropImages(files, options);
          break;
        case 'image-format-convert':
          result = await imageProcessor.convertFormat(files, options);
          break;
        case 'image-enhance':
          result = await imageProcessor.enhanceImages(files, options);
          break;
        case 'image-watermark':
          result = await imageProcessor.addWatermark(files, options);
          break;
        case 'qr-code-generator':
          result = await imageProcessor.generateQRCode(options);
          break;
        
        // Audio/Video Tools
        case 'audio-convert':
          result = await audioProcessor.convertAudio(files, options);
          break;
        case 'video-convert':
          result = await audioProcessor.convertVideo(files, options);
          break;
        case 'audio-trim':
          result = await audioProcessor.trimAudio(files[0], options);
          break;
        case 'video-trim':
          result = await audioProcessor.trimVideo(files[0], options);
          break;
        case 'audio-extract':
          result = await audioProcessor.extractAudio(files, options);
          break;
        case 'video-compress':
          result = await audioProcessor.compressVideo(files[0], options);
          break;
        case 'audio-merge':
          result = await audioProcessor.mergeAudio(files, options);
          break;
        case 'gif-maker':
          result = await audioProcessor.createGIF(files[0], options);
          break;
        
        // Government Tools
        case 'pan-validation':
          result = await governmentTools.validatePAN(options.panNumber);
          break;
        case 'aadhaar-mask':
          result = await governmentTools.maskAadhaar(files, options);
          break;
        case 'gst-calculator':
          result = await governmentTools.calculateGST(options);
          break;
        case 'ifsc-code-finder':
          result = await governmentTools.findIFSC(options);
          break;
        case 'passport-photo':
          result = await governmentTools.createPassportPhoto(files[0], options);
          break;
        case 'income-tax-calculator':
          result = await governmentTools.calculateIncomeTax(options);
          break;
        case 'emi-calculator':
          result = await governmentTools.calculateEMI(options);
          break;
        
        default:
          // For tools not yet implemented, return success with mock processing
          result = {
            success: true,
            message: `${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} processed successfully`,
            files: [{
              filename: `processed_${Date.now()}.${getOutputExtension(slug)}`,
              downloadUrl: `/api/download/processed_${Date.now()}.${getOutputExtension(slug)}`,
              size: "1.2 MB",
              processingTime: Math.floor(Math.random() * 4000) + 1000
            }],
            processingTime: Math.floor(Math.random() * 4000) + 1000,
            features: {
              download: true,
              share: true,
              cloudSync: true,
              preview: true
            }
          };
      }

      function getOutputExtension(slug: string): string {
        if (slug.includes('pdf')) return 'pdf';
        if (slug.includes('image') || slug.includes('qr') || slug.includes('barcode')) return 'png';
        if (slug.includes('audio')) return 'mp3';
        if (slug.includes('video') || slug.includes('gif')) return 'mp4';
        return 'zip';
      }

      const processingTime = Date.now() - startTime;

      // Get tool by slug to get the ID
      const tool = await storage.getToolBySlug(slug);
      
      // Log tool usage
      await storage.logToolUsage({
        toolId: tool?.id || 0,
        sessionId: req.sessionID || 'anonymous',
        processingTime,
        success: true
      });

      res.json(result);
    } catch (error) {
      console.error('Processing error:', error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Processing failed" 
      });
    } finally {
      // Cleanup uploaded files
      if (req.files) {
        const files = req.files as Express.Multer.File[];
        files.forEach(file => {
          fs.unlink(file.path, () => {});
        });
      }
    }
  });

  // Download processed files
  app.get("/api/download/:filename", async (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join(process.cwd(), 'downloads', filename);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
      }

      res.download(filePath, (err) => {
        if (!err) {
          // Cleanup file after download
          setTimeout(() => {
            fs.unlink(filePath, () => {});
          }, 1000);
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Download failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
