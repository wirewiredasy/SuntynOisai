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

  // Get tool by slug
  app.get("/api/tools/:slug", async (req, res) => {
    try {
      const tool = await storage.getToolBySlug(req.params.slug);
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      res.json(tool);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tool" });
    }
  });

  // Unified tool processing endpoint
  app.post("/api/tools/:slug/process", upload.array('files'), async (req, res) => {
    try {
      const { slug } = req.params;
      const files = req.files as Express.Multer.File[];
      const options = JSON.parse(req.body.options || '{}');

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
      }

      let result;
      const startTime = Date.now();

      // Route to appropriate processor based on tool slug
      switch (slug) {
        case 'pdf-merger':
          result = await pdfProcessor.mergePDFs(files, options);
          break;
        case 'pdf-splitter':
          result = await pdfProcessor.splitPDF(files[0], options);
          break;
        case 'pdf-compressor':
          result = await pdfProcessor.compressPDF(files[0], options);
          break;
        case 'pdf-protector':
          result = await pdfProcessor.protectPDF(files[0], options);
          break;
        case 'image-resizer':
          result = await imageProcessor.resizeImages(files, options);
          break;
        case 'image-compressor':
          result = await imageProcessor.compressImages(files, options);
          break;
        case 'background-remover':
          result = await imageProcessor.removeBackground(files, options);
          break;
        case 'color-filters':
          result = await imageProcessor.applyColorFilters(files, options);
          break;
        case 'audio-converter':
          result = await audioProcessor.convertAudio(files, options);
          break;
        case 'video-converter':
          result = await audioProcessor.convertVideo(files, options);
          break;
        case 'audio-extractor':
          result = await audioProcessor.extractAudio(files, options);
          break;
        case 'media-trimmer':
          result = await audioProcessor.trimMedia(files[0], options);
          break;
        case 'pan-validator':
          result = await governmentTools.validatePAN(options.panNumber);
          break;
        case 'aadhaar-masking':
          result = await governmentTools.maskAadhaar(files, options);
          break;
        case 'gst-calculator':
          result = await governmentTools.calculateGST(options);
          break;
        case 'document-verifier':
          result = await governmentTools.verifyDocument(files, options);
          break;
        default:
          return res.status(404).json({ error: "Tool not found" });
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
