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
      // PDF Tools
      { name: "PDF Merger", slug: "pdf-merger", category: "pdf", description: "Merge multiple PDF files into one", icon: "file-plus", isActive: true, metadata: {} },
      { name: "PDF Splitter", slug: "pdf-splitter", category: "pdf", description: "Split PDF into separate pages", icon: "scissors", isActive: true, metadata: {} },
      { name: "PDF Compressor", slug: "pdf-compressor", category: "pdf", description: "Reduce PDF file size", icon: "archive", isActive: true, metadata: {} },
      { name: "PDF Protector", slug: "pdf-protector", category: "pdf", description: "Add password protection to PDF", icon: "lock", isActive: true, metadata: {} },
      
      // Image Tools
      { name: "Image Resizer", slug: "image-resizer", category: "image", description: "Resize images to specific dimensions", icon: "maximize", isActive: true, metadata: {} },
      { name: "Image Compressor", slug: "image-compressor", category: "image", description: "Compress images without quality loss", icon: "minimize", isActive: true, metadata: {} },
      { name: "Background Remover", slug: "background-remover", category: "image", description: "Remove background from images", icon: "eraser", isActive: true, metadata: {} },
      { name: "Color Filters", slug: "color-filters", category: "image", description: "Apply color filters to images", icon: "palette", isActive: true, metadata: {} },
      
      // Audio Tools
      { name: "Audio Converter", slug: "audio-converter", category: "audio", description: "Convert audio between formats", icon: "music", isActive: true, metadata: {} },
      { name: "Video Converter", slug: "video-converter", category: "audio", description: "Convert video formats", icon: "video", isActive: true, metadata: {} },
      { name: "Audio Extractor", slug: "audio-extractor", category: "audio", description: "Extract audio from video files", icon: "volume-2", isActive: true, metadata: {} },
      { name: "Media Trimmer", slug: "media-trimmer", category: "audio", description: "Trim audio and video files", icon: "scissors", isActive: true, metadata: {} },
      
      // Government Tools
      { name: "PAN Validator", slug: "pan-validator", category: "government", description: "Validate PAN card format", icon: "check-circle", isActive: true, metadata: {} },
      { name: "Aadhaar Masking", slug: "aadhaar-masking", category: "government", description: "Mask Aadhaar number for privacy", icon: "eye-off", isActive: true, metadata: {} },
      { name: "GST Calculator", slug: "gst-calculator", category: "government", description: "Calculate GST for invoices", icon: "calculator", isActive: true, metadata: {} },
      { name: "Document Verifier", slug: "document-verifier", category: "government", description: "Verify government documents", icon: "shield-check", isActive: true, metadata: {} },
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

  async getToolBySlug(slug: string): Promise<Tool | null> {
    const tool = Array.from(this.tools.values()).find(t => t.slug === slug);
    return tool || null;
  }

  async getToolById(id: number): Promise<Tool | null> {
    return this.tools.get(id) || null;
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const id = this.currentToolId++;
    const tool: Tool = {
      ...insertTool,
      id
    };
    this.tools.set(id, tool);
    return tool;
  }

  async logToolUsage(insertUsage: InsertToolUsage): Promise<ToolUsage> {
    const id = this.currentUsageId++;
    const usage: ToolUsage = {
      ...insertUsage,
      id,
      timestamp: new Date()
    };
    this.toolUsages.set(id, usage);
    return usage;
  }
}

export const storage = new MemStorage();
