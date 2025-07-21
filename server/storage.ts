import { users, tools, toolUsage, type User, type InsertUser, type Tool, type InsertTool, type ToolUsage, type InsertToolUsage } from "@shared/schema";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tool management
  getAllTools(): Promise<Tool[]>;
  getToolBySlug(slug: string): Promise<Tool | null>;
  getToolById(id: number): Promise<Tool | null>;
  createTool(tool: InsertTool): Promise<Tool>;
  
  // Tool usage logging
  logToolUsage(usage: InsertToolUsage): Promise<ToolUsage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tools: Map<number, Tool>;
  private toolUsages: Map<number, ToolUsage>;
  private currentUserId: number;
  private currentToolId: number;
  private currentUsageId: number;

  constructor() {
    this.users = new Map();
    this.tools = new Map();
    this.toolUsages = new Map();
    this.currentUserId = 1;
    this.currentToolId = 1;
    this.currentUsageId = 1;
    
    // Initialize with sample tools
    this.initializeTools();
  }

  private async initializeTools() {
    const sampleTools: InsertTool[] = [
      // PDF Tools (20 tools)
      { name: "PDF Merger", slug: "pdf-merger", category: "pdf", description: "Merge multiple PDF files into one", icon: "file-plus", isActive: true, metadata: {} },
      { name: "PDF Splitter", slug: "pdf-splitter", category: "pdf", description: "Split PDF into separate pages", icon: "scissors", isActive: true, metadata: {} },
      { name: "PDF Compressor", slug: "pdf-compressor", category: "pdf", description: "Reduce PDF file size", icon: "archive", isActive: true, metadata: {} },
      { name: "PDF Protector", slug: "pdf-protector", category: "pdf", description: "Add password protection to PDF", icon: "lock", isActive: true, metadata: {} },
      { name: "PDF Unlocker", slug: "pdf-unlocker", category: "pdf", description: "Remove password from PDF files", icon: "unlock", isActive: true, metadata: {} },
      { name: "PDF to Word", slug: "pdf-to-word", category: "pdf", description: "Convert PDF to Word document", icon: "file-text", isActive: true, metadata: {} },
      { name: "PDF OCR", slug: "pdf-ocr", category: "pdf", description: "Extract text from scanned PDFs", icon: "scan", isActive: true, metadata: {} },
      { name: "PDF Watermark", slug: "pdf-watermark", category: "pdf", description: "Add watermark to PDF files", icon: "droplets", isActive: true, metadata: {} },
      { name: "PDF to Excel", slug: "pdf-to-excel", category: "pdf", description: "Convert PDF to Excel spreadsheet", icon: "table", isActive: true, metadata: {} },
      { name: "PDF to PowerPoint", slug: "pdf-to-powerpoint", category: "pdf", description: "Convert PDF to PowerPoint presentation", icon: "presentation", isActive: true, metadata: {} },
      { name: "PDF to Image", slug: "pdf-to-image", category: "pdf", description: "Convert PDF pages to images", icon: "image", isActive: true, metadata: {} },
      { name: "Word to PDF", slug: "word-to-pdf", category: "pdf", description: "Convert Word documents to PDF", icon: "file-text", isActive: true, metadata: {} },
      { name: "Excel to PDF", slug: "excel-to-pdf", category: "pdf", description: "Convert Excel files to PDF", icon: "table", isActive: true, metadata: {} },
      { name: "PowerPoint to PDF", slug: "powerpoint-to-pdf", category: "pdf", description: "Convert presentations to PDF", icon: "presentation", isActive: true, metadata: {} },
      { name: "PDF Page Rotator", slug: "pdf-page-rotator", category: "pdf", description: "Rotate PDF pages", icon: "rotate-cw", isActive: true, metadata: {} },
      { name: "PDF Page Remover", slug: "pdf-page-remover", category: "pdf", description: "Remove specific pages from PDF", icon: "trash", isActive: true, metadata: {} },
      { name: "PDF Form Filler", slug: "pdf-form-filler", category: "pdf", description: "Fill PDF forms automatically", icon: "edit-3", isActive: true, metadata: {} },
      { name: "PDF Metadata Editor", slug: "pdf-metadata-editor", category: "pdf", description: "Edit PDF metadata and properties", icon: "info", isActive: true, metadata: {} },
      { name: "PDF Black & White", slug: "pdf-black-white", category: "pdf", description: "Convert PDF to black and white", icon: "circle", isActive: true, metadata: {} },
      { name: "PDF Repair", slug: "pdf-repair", category: "pdf", description: "Repair corrupted PDF files", icon: "tool", isActive: true, metadata: {} },
      
      // Image Tools (25 tools)
      { name: "Image Resizer", slug: "image-resizer", category: "image", description: "Resize images to specific dimensions", icon: "maximize", isActive: true, metadata: {} },
      { name: "Image Compressor", slug: "image-compressor", category: "image", description: "Compress images without quality loss", icon: "minimize", isActive: true, metadata: {} },
      { name: "Background Remover", slug: "background-remover", category: "image", description: "Remove background from images", icon: "eraser", isActive: true, metadata: {} },
      { name: "Color Filters", slug: "color-filters", category: "image", description: "Apply color filters to images", icon: "palette", isActive: true, metadata: {} },
      { name: "Image Cropper", slug: "image-cropper", category: "image", description: "Crop images to custom dimensions", icon: "crop", isActive: true, metadata: {} },
      { name: "Image Converter", slug: "image-converter", category: "image", description: "Convert between image formats", icon: "refresh-cw", isActive: true, metadata: {} },
      { name: "Image Enhancer", slug: "image-enhancer", category: "image", description: "Enhance image quality using AI", icon: "sparkles", isActive: true, metadata: {} },
      { name: "Watermark Tool", slug: "watermark-tool", category: "image", description: "Add watermarks to images", icon: "shield", isActive: true, metadata: {} },
      { name: "Photo Editor", slug: "photo-editor", category: "image", description: "Advanced photo editing tools", icon: "edit", isActive: true, metadata: {} },
      { name: "Collage Maker", slug: "collage-maker", category: "image", description: "Create photo collages", icon: "grid", isActive: true, metadata: {} },
      { name: "Image Rotator", slug: "image-rotator", category: "image", description: "Rotate images at any angle", icon: "rotate-cw", isActive: true, metadata: {} },
      { name: "Image Flipper", slug: "image-flipper", category: "image", description: "Flip images horizontally or vertically", icon: "flip-horizontal", isActive: true, metadata: {} },
      { name: "Color Changer", slug: "color-changer", category: "image", description: "Change specific colors in images", icon: "palette", isActive: true, metadata: {} },
      { name: "Brightness Adjuster", slug: "brightness-adjuster", category: "image", description: "Adjust image brightness and contrast", icon: "sun", isActive: true, metadata: {} },
      { name: "Image Blur", slug: "image-blur", category: "image", description: "Apply blur effects to images", icon: "circle", isActive: true, metadata: {} },
      { name: "Image Sharpener", slug: "image-sharpener", category: "image", description: "Sharpen blurry images", icon: "zap", isActive: true, metadata: {} },
      { name: "Noise Remover", slug: "noise-remover", category: "image", description: "Remove noise from images", icon: "shield", isActive: true, metadata: {} },
      { name: "Image Merger", slug: "image-merger", category: "image", description: "Merge multiple images", icon: "layers", isActive: true, metadata: {} },
      { name: "Border Tool", slug: "border-tool", category: "image", description: "Add borders to images", icon: "square", isActive: true, metadata: {} },
      { name: "Sepia Filter", slug: "sepia-filter", category: "image", description: "Apply vintage sepia effect", icon: "coffee", isActive: true, metadata: {} },
      { name: "Black & White", slug: "black-white", category: "image", description: "Convert images to black and white", icon: "circle", isActive: true, metadata: {} },
      { name: "Image Text Extractor", slug: "image-text-extractor", category: "image", description: "Extract text from images using OCR", icon: "type", isActive: true, metadata: {} },
      { name: "Meme Generator", slug: "meme-generator", category: "image", description: "Create memes with text overlays", icon: "smile", isActive: true, metadata: {} },
      { name: "QR Code Generator", slug: "qr-code-generator", category: "image", description: "Generate QR codes", icon: "qr-code", isActive: true, metadata: {} },
      { name: "Barcode Generator", slug: "barcode-generator", category: "image", description: "Generate various barcode formats", icon: "barcode", isActive: true, metadata: {} },
      
      // Audio/Video Tools (20 tools)
      { name: "Audio Converter", slug: "audio-converter", category: "audio", description: "Convert audio between formats", icon: "music", isActive: true, metadata: {} },
      { name: "Video Converter", slug: "video-converter", category: "audio", description: "Convert video formats", icon: "video", isActive: true, metadata: {} },
      { name: "Audio Extractor", slug: "audio-extractor", category: "audio", description: "Extract audio from video files", icon: "volume-2", isActive: true, metadata: {} },
      { name: "Media Trimmer", slug: "media-trimmer", category: "audio", description: "Trim audio and video files", icon: "scissors", isActive: true, metadata: {} },
      { name: "Audio Merger", slug: "audio-merger", category: "audio", description: "Merge multiple audio files", icon: "layers", isActive: true, metadata: {} },
      { name: "Volume Booster", slug: "volume-booster", category: "audio", description: "Boost audio volume", icon: "volume-x", isActive: true, metadata: {} },
      { name: "Audio Compressor", slug: "audio-compressor", category: "audio", description: "Compress audio files", icon: "download", isActive: true, metadata: {} },
      { name: "Video Compressor", slug: "video-compressor", category: "audio", description: "Reduce video file size", icon: "minimize-2", isActive: true, metadata: {} },
      { name: "Audio Speed Changer", slug: "audio-speed-changer", category: "audio", description: "Change audio playback speed", icon: "fast-forward", isActive: true, metadata: {} },
      { name: "Video Speed Changer", slug: "video-speed-changer", category: "audio", description: "Change video playback speed", icon: "fast-forward", isActive: true, metadata: {} },
      { name: "Audio Reverser", slug: "audio-reverser", category: "audio", description: "Reverse audio files", icon: "rewind", isActive: true, metadata: {} },
      { name: "Video Reverser", slug: "video-reverser", category: "audio", description: "Reverse video files", icon: "rewind", isActive: true, metadata: {} },
      { name: "Audio Equalizer", slug: "audio-equalizer", category: "audio", description: "Adjust audio frequencies", icon: "sliders", isActive: true, metadata: {} },
      { name: "Video Stabilizer", slug: "video-stabilizer", category: "audio", description: "Stabilize shaky video footage", icon: "anchor", isActive: true, metadata: {} },
      { name: "Audio Noise Remover", slug: "audio-noise-remover", category: "audio", description: "Remove background noise from audio", icon: "shield", isActive: true, metadata: {} },
      { name: "Video Frame Extractor", slug: "video-frame-extractor", category: "audio", description: "Extract frames from video", icon: "camera", isActive: true, metadata: {} },
      { name: "Audio Pitch Changer", slug: "audio-pitch-changer", category: "audio", description: "Change audio pitch", icon: "music", isActive: true, metadata: {} },
      { name: "Video Watermark", slug: "video-watermark", category: "audio", description: "Add watermarks to videos", icon: "droplets", isActive: true, metadata: {} },
      { name: "Audio Looper", slug: "audio-looper", category: "audio", description: "Create audio loops", icon: "repeat", isActive: true, metadata: {} },
      { name: "Subtitle Extractor", slug: "subtitle-extractor", category: "audio", description: "Extract subtitles from videos", icon: "type", isActive: true, metadata: {} },
      
      // Government Tools (15 tools)
      { name: "PAN Validator", slug: "pan-validator", category: "government", description: "Validate PAN card format", icon: "check-circle", isActive: true, metadata: {} },
      { name: "Aadhaar Masking", slug: "aadhaar-masking", category: "government", description: "Mask Aadhaar number for privacy", icon: "eye-off", isActive: true, metadata: {} },
      { name: "GST Calculator", slug: "gst-calculator", category: "government", description: "Calculate GST for invoices", icon: "calculator", isActive: true, metadata: {} },
      { name: "Document Verifier", slug: "document-verifier", category: "government", description: "Verify government documents", icon: "shield-check", isActive: true, metadata: {} },
      { name: "Passport Photo", slug: "passport-photo", category: "government", description: "Create passport-size photos", icon: "camera", isActive: true, metadata: {} },
      { name: "Digital Signature", slug: "digital-signature", category: "government", description: "Add digital signatures to documents", icon: "pen-tool", isActive: true, metadata: {} },
      { name: "Voter ID Validator", slug: "voter-id-validator", category: "government", description: "Validate Voter ID format", icon: "vote", isActive: true, metadata: {} },
      { name: "Driving License Checker", slug: "driving-license-checker", category: "government", description: "Validate driving license format", icon: "car", isActive: true, metadata: {} },
      { name: "Income Tax Calculator", slug: "income-tax-calculator", category: "government", description: "Calculate income tax", icon: "calculator", isActive: true, metadata: {} },
      { name: "EMI Calculator", slug: "emi-calculator", category: "government", description: "Calculate loan EMI", icon: "credit-card", isActive: true, metadata: {} },
      { name: "SIP Calculator", slug: "sip-calculator", category: "government", description: "Calculate SIP returns", icon: "trending-up", isActive: true, metadata: {} },
      { name: "PPF Calculator", slug: "ppf-calculator", category: "government", description: "Calculate PPF maturity", icon: "piggy-bank", isActive: true, metadata: {} },
      { name: "EPF Calculator", slug: "epf-calculator", category: "government", description: "Calculate EPF balance", icon: "briefcase", isActive: true, metadata: {} },
      { name: "TDS Calculator", slug: "tds-calculator", category: "government", description: "Calculate TDS deductions", icon: "minus-circle", isActive: true, metadata: {} },
      { name: "Bank IFSC Finder", slug: "bank-ifsc-finder", category: "government", description: "Find bank IFSC codes", icon: "search", isActive: true, metadata: {} },
    ];

    for (const tool of sampleTools) {
      await this.createTool(tool);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getAllTools(): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(tool => tool.isActive);
  }

  async getToolById(id: number): Promise<Tool | null> {
    return this.tools.get(id) || null;
  }

  async getToolBySlug(slug: string): Promise<Tool | null> {
    const tool = Array.from(this.tools.values()).find(t => t.slug === slug);
    return tool || null;
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentToolId++;
    const tool: Tool = {
      ...insertTool,
      id,
      isActive: insertTool.isActive ?? true,
      metadata: insertTool.metadata ?? {}
    };
    this.tools.set(id, tool);
    return tool;
  }

  async logToolUsage(insertUsage: InsertToolUsage): Promise<ToolUsage> {
    const id = this.currentUsageId++;
    const usage: ToolUsage = {
      ...insertUsage,
      id,
      userId: insertUsage.userId ?? null,
      sessionId: insertUsage.sessionId ?? null,
      processingTime: insertUsage.processingTime ?? null,
      success: insertUsage.success ?? true,
      timestamp: new Date()
    };
    this.toolUsages.set(id, usage);
    return usage;
  }
}

export const storage = new MemStorage();
