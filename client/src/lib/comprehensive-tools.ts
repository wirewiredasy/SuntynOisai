export const COMPREHENSIVE_TOOLS = {
  "PDF Tools": [
    // Document Processing (16 tools)
    { id: "pdf-merger", name: "PDF Merger", description: "Merge multiple PDF files into one document", icon: "Plus", route: "/tools/pdf-merger" },
    { id: "pdf-splitter", name: "PDF Splitter", description: "Split PDF into separate pages or ranges", icon: "Scissors", route: "/tools/pdf-splitter" },
    { id: "pdf-compressor", name: "PDF Compressor", description: "Compress PDF files to reduce size", icon: "Archive", route: "/tools/pdf-compressor" },
    { id: "pdf-unlock", name: "PDF Unlock", description: "Remove password protection from PDF", icon: "Unlock", route: "/tools/pdf-unlock" },
    { id: "pdf-protect", name: "PDF Protect", description: "Add password protection to PDF", icon: "Lock", route: "/tools/pdf-protect" },
    { id: "pdf-rotate", name: "PDF Rotate", description: "Rotate PDF pages", icon: "RotateCw", route: "/tools/pdf-rotate" },
    { id: "pdf-watermark", name: "PDF Watermark", description: "Add watermark to PDF pages", icon: "Stamp", route: "/tools/pdf-watermark" },
    { id: "pdf-page-delete", name: "Page Deleter", description: "Remove specific pages from PDF", icon: "Trash", route: "/tools/pdf-page-delete" },
    { id: "pdf-page-extract", name: "Page Extractor", description: "Extract specific pages from PDF", icon: "FileText", route: "/tools/pdf-page-extract" },
    { id: "pdf-page-reorder", name: "Page Reorder", description: "Reorder PDF pages", icon: "ArrowUpDown", route: "/tools/pdf-page-reorder" },
    { id: "pdf-ocr", name: "PDF OCR", description: "Extract text from scanned PDFs", icon: "ScanText", route: "/tools/pdf-ocr" },
    { id: "pdf-to-text", name: "PDF to Text", description: "Extract all text from PDF", icon: "FileType", route: "/tools/pdf-to-text" },
    { id: "pdf-form-filler", name: "Form Filler", description: "Fill PDF forms automatically", icon: "Edit", route: "/tools/pdf-form-filler" },
    { id: "pdf-metadata", name: "Metadata Editor", description: "Edit PDF metadata", icon: "Info", route: "/tools/pdf-metadata" },
    { id: "pdf-repair", name: "PDF Repair", description: "Repair corrupted PDF files", icon: "Wrench", route: "/tools/pdf-repair" },
    { id: "pdf-optimize", name: "PDF Optimizer", description: "Optimize PDF for web/print", icon: "Zap", route: "/tools/pdf-optimize" },
  ],
  
  "PDF Conversion": [
    // Format Conversion (8 tools) 
    { id: "pdf-to-word", name: "PDF to Word", description: "Convert PDF to DOCX format", icon: "FileType", route: "/tools/pdf-to-word" },
    { id: "pdf-to-excel", name: "PDF to Excel", description: "Extract tables to Excel", icon: "Table", route: "/tools/pdf-to-excel" },
    { id: "pdf-to-powerpoint", name: "PDF to PowerPoint", description: "Convert PDF to PPT", icon: "Presentation", route: "/tools/pdf-to-powerpoint" },
    { id: "pdf-to-images", name: "PDF to Images", description: "Convert PDF pages to images", icon: "Image", route: "/tools/pdf-to-images" },
    { id: "word-to-pdf", name: "Word to PDF", description: "Convert Word documents to PDF", icon: "FileInput", route: "/tools/word-to-pdf" },
    { id: "excel-to-pdf", name: "Excel to PDF", description: "Convert Excel to PDF", icon: "FileSpreadsheet", route: "/tools/excel-to-pdf" },
    { id: "powerpoint-to-pdf", name: "PowerPoint to PDF", description: "Convert PPT to PDF", icon: "FileImage", route: "/tools/powerpoint-to-pdf" },
    { id: "images-to-pdf", name: "Images to PDF", description: "Combine images into PDF", icon: "Images", route: "/tools/images-to-pdf" },
  ],

  "Image Processing": [
    // Basic Image Tools (12 tools)
    { id: "image-resizer", name: "Image Resizer", description: "Resize images to any dimension", icon: "Maximize", route: "/tools/image-resizer" },
    { id: "image-compressor", name: "Image Compressor", description: "Compress images without quality loss", icon: "Archive", route: "/tools/image-compressor" },
    { id: "image-cropper", name: "Image Cropper", description: "Crop images to specific area", icon: "Crop", route: "/tools/image-cropper" },
    { id: "image-rotator", name: "Image Rotator", description: "Rotate images by any angle", icon: "RotateCw", route: "/tools/image-rotator" },
    { id: "image-flipper", name: "Image Flipper", description: "Flip images horizontally/vertically", icon: "Flip", route: "/tools/image-flipper" },
    { id: "format-converter", name: "Format Converter", description: "Convert between image formats", icon: "RefreshCw", route: "/tools/format-converter" },
    { id: "image-splitter", name: "Image Splitter", description: "Split images into parts", icon: "Grid", route: "/tools/image-splitter" },
    { id: "image-merger", name: "Image Merger", description: "Merge multiple images", icon: "Combine", route: "/tools/image-merger" },
    { id: "batch-resizer", name: "Batch Resizer", description: "Resize multiple images at once", icon: "Layers", route: "/tools/batch-resizer" },
    { id: "watermark-adder", name: "Watermark Adder", description: "Add text/image watermarks", icon: "Stamp", route: "/tools/watermark-adder" },
    { id: "border-adder", name: "Border Adder", description: "Add borders to images", icon: "Square", route: "/tools/border-adder" },
    { id: "image-metadata", name: "Metadata Viewer", description: "View/edit image metadata", icon: "Info", route: "/tools/image-metadata" },
  ],

  "Image Enhancement": [
    // Advanced Image Tools (12 tools)
    { id: "bg-remover", name: "Background Remover", description: "AI-powered background removal", icon: "Target", route: "/tools/bg-remover" },
    { id: "image-enhancer", name: "AI Image Enhancer", description: "Enhance image quality with AI", icon: "Sparkles", route: "/tools/image-enhancer" },
    { id: "color-adjuster", name: "Color Adjuster", description: "Adjust brightness, contrast, saturation", icon: "Palette", route: "/tools/color-adjuster" },
    { id: "filter-applier", name: "Filter Applier", description: "Apply artistic filters", icon: "Filter", route: "/tools/filter-applier" },
    { id: "noise-reducer", name: "Noise Reducer", description: "Remove noise from images", icon: "Volume", route: "/tools/noise-reducer" },
    { id: "blur-applier", name: "Blur Effect", description: "Apply blur effects", icon: "Minus", route: "/tools/blur-applier" },
    { id: "sharpen-tool", name: "Sharpen Tool", description: "Sharpen blurry images", icon: "Focus", route: "/tools/sharpen-tool" },
    { id: "red-eye-remover", name: "Red Eye Remover", description: "Remove red eye from photos", icon: "Eye", route: "/tools/red-eye-remover" },
    { id: "shadow-adder", name: "Shadow Effects", description: "Add shadow effects", icon: "Moon", route: "/tools/shadow-adder" },
    { id: "vintage-filter", name: "Vintage Filter", description: "Apply vintage effects", icon: "Camera", route: "/tools/vintage-filter" },
    { id: "cartoon-converter", name: "Cartoon Converter", description: "Convert photos to cartoons", icon: "Smile", route: "/tools/cartoon-converter" },
    { id: "face-detector", name: "Face Detector", description: "Detect and highlight faces", icon: "User", route: "/tools/face-detector" },
  ],

  "Audio Tools": [
    // Audio Processing (8 tools)
    { id: "audio-converter", name: "Audio Converter", description: "Convert between audio formats", icon: "RefreshCw", route: "/tools/audio-converter" },
    { id: "audio-trimmer", name: "Audio Trimmer", description: "Cut and trim audio files", icon: "Scissors", route: "/tools/audio-trimmer" },
    { id: "audio-merger", name: "Audio Merger", description: "Merge multiple audio files", icon: "Plus", route: "/tools/audio-merger" },
    { id: "audio-splitter", name: "Audio Splitter", description: "Split audio into segments", icon: "Split", route: "/tools/audio-splitter" },
    { id: "volume-adjuster", name: "Volume Adjuster", description: "Adjust audio volume levels", icon: "Volume2", route: "/tools/volume-adjuster" },
    { id: "audio-compressor", name: "Audio Compressor", description: "Compress audio file size", icon: "Archive", route: "/tools/audio-compressor" },
    { id: "noise-remover", name: "Noise Remover", description: "Remove background noise", icon: "VolumeX", route: "/tools/noise-remover" },
    { id: "speed-changer", name: "Speed Changer", description: "Change audio playback speed", icon: "FastForward", route: "/tools/speed-changer" },
  ],

  "Video Tools": [
    // Video Processing (8 tools)
    { id: "video-converter", name: "Video Converter", description: "Convert between video formats", icon: "Video", route: "/tools/video-converter" },
    { id: "video-trimmer", name: "Video Trimmer", description: "Cut and trim video files", icon: "Scissors", route: "/tools/video-trimmer" },
    { id: "video-compressor", name: "Video Compressor", description: "Compress video file size", icon: "Archive", route: "/tools/video-compressor" },
    { id: "audio-extractor", name: "Audio Extractor", description: "Extract audio from videos", icon: "Music", route: "/tools/audio-extractor" },
    { id: "video-merger", name: "Video Merger", description: "Merge multiple video files", icon: "Plus", route: "/tools/video-merger" },
    { id: "frame-extractor", name: "Frame Extractor", description: "Extract frames as images", icon: "Camera", route: "/tools/frame-extractor" },
    { id: "subtitle-adder", name: "Subtitle Adder", description: "Add subtitles to videos", icon: "Type", route: "/tools/subtitle-adder" },
    { id: "video-resizer", name: "Video Resizer", description: "Resize video dimensions", icon: "Maximize", route: "/tools/video-resizer" },
  ],

  "Government Tools": [
    // Document Validation & Processing (20 tools)
    { id: "pan-validator", name: "PAN Validator", description: "Validate PAN card format", icon: "CheckCircle", route: "/tools/pan-validator" },
    { id: "aadhaar-masker", name: "Aadhaar Masker", description: "Mask Aadhaar numbers safely", icon: "Eye", route: "/tools/aadhaar-masker" },
    { id: "passport-photo", name: "Passport Photo Maker", description: "Create passport-sized photos", icon: "Camera", route: "/tools/passport-photo" },
    { id: "voter-id-validator", name: "Voter ID Validator", description: "Validate Voter ID format", icon: "Vote", route: "/tools/voter-id-validator" },
    { id: "driving-license-validator", name: "License Validator", description: "Validate driving license", icon: "Car", route: "/tools/driving-license-validator" },
    { id: "gst-calculator", name: "GST Calculator", description: "Calculate GST amounts", icon: "Calculator", route: "/tools/gst-calculator" },
    { id: "income-tax-calculator", name: "Tax Calculator", description: "Calculate income tax", icon: "Receipt", route: "/tools/income-tax-calculator" },
    { id: "emi-calculator", name: "EMI Calculator", description: "Calculate loan EMIs", icon: "CreditCard", route: "/tools/emi-calculator" },
    { id: "rent-agreement", name: "Rent Agreement", description: "Generate rent agreements", icon: "FileText", route: "/tools/rent-agreement" },
    { id: "income-certificate", name: "Income Certificate", description: "Generate income certificates", icon: "Award", route: "/tools/income-certificate" },
    { id: "affidavit-generator", name: "Affidavit Generator", description: "Create legal affidavits", icon: "Scale", route: "/tools/affidavit-generator" },
    { id: "form-16-processor", name: "Form 16 Processor", description: "Process Form 16 documents", icon: "FileSpreadsheet", route: "/tools/form-16-processor" },
    { id: "bank-statement-analyzer", name: "Bank Statement Analyzer", description: "Analyze bank statements", icon: "BarChart", route: "/tools/bank-statement-analyzer" },
    { id: "qr-generator", name: "QR Code Generator", description: "Generate QR codes", icon: "QrCode", route: "/tools/qr-generator" },
    { id: "barcode-generator", name: "Barcode Generator", description: "Generate barcodes", icon: "Scan", route: "/tools/barcode-generator" },
    { id: "digital-signature", name: "Digital Signature", description: "Add digital signatures", icon: "PenTool", route: "/tools/digital-signature" },
    { id: "stamp-paper-generator", name: "Stamp Paper Generator", description: "Generate legal stamp papers", icon: "Stamp", route: "/tools/stamp-paper-generator" },
    { id: "notarization-helper", name: "Notarization Helper", description: "Prepare documents for notarization", icon: "Gavel", route: "/tools/notarization-helper" },
    { id: "property-valuation", name: "Property Valuation", description: "Calculate property registration fees", icon: "Home", route: "/tools/property-valuation" },
    { id: "legal-notice-generator", name: "Legal Notice Generator", description: "Generate legal notices", icon: "AlertTriangle", route: "/tools/legal-notice-generator" },
  ],

  "AI & Business Tools": [
    // Additional 16 tools to reach 80 total
    { id: "text-summarizer", name: "AI Text Summarizer", description: "Summarize long documents with AI", icon: "FileText", route: "/tools/text-summarizer" },
    { id: "content-generator", name: "Content Generator", description: "Generate content with AI", icon: "PenTool", route: "/tools/content-generator" },
    { id: "language-translator", name: "Language Translator", description: "Translate text to any language", icon: "Globe", route: "/tools/language-translator" },
    { id: "plagiarism-checker", name: "Plagiarism Checker", description: "Check content for plagiarism", icon: "Search", route: "/tools/plagiarism-checker" },
    { id: "keyword-extractor", name: "Keyword Extractor", description: "Extract keywords from text", icon: "Tag", route: "/tools/keyword-extractor" },
    { id: "readability-analyzer", name: "Readability Analyzer", description: "Analyze text readability score", icon: "BookOpen", route: "/tools/readability-analyzer" },
    { id: "grammar-checker", name: "Grammar Checker", description: "Check and fix grammar errors", icon: "CheckCircle", route: "/tools/grammar-checker" },
    { id: "word-counter", name: "Word Counter", description: "Count words, characters, paragraphs", icon: "Hash", route: "/tools/word-counter" },
    { id: "url-shortener", name: "URL Shortener", description: "Create short URLs", icon: "Link", route: "/tools/url-shortener" },
    { id: "password-generator", name: "Password Generator", description: "Generate secure passwords", icon: "Key", route: "/tools/password-generator" },
    { id: "unit-converter", name: "Unit Converter", description: "Convert between different units", icon: "ArrowRightLeft", route: "/tools/unit-converter" },
    { id: "color-palette", name: "Color Palette Generator", description: "Generate color schemes", icon: "Palette", route: "/tools/color-palette" },
    { id: "json-formatter", name: "JSON Formatter", description: "Format and validate JSON", icon: "Braces", route: "/tools/json-formatter" },
    { id: "base64-encoder", name: "Base64 Encoder/Decoder", description: "Encode/decode Base64 strings", icon: "Code", route: "/tools/base64-encoder" },
    { id: "markdown-converter", name: "Markdown Converter", description: "Convert Markdown to HTML", icon: "FileType", route: "/tools/markdown-converter" },
    { id: "csv-processor", name: "CSV Processor", description: "Process and convert CSV files", icon: "Table", route: "/tools/csv-processor" },
  ]
};

export const ALL_80_TOOLS = Object.values(COMPREHENSIVE_TOOLS).flat();

export const TOOL_CATEGORIES = [
  {
    id: "pdf",
    name: "PDF Tools", 
    description: "Complete PDF processing suite",
    icon: "📄",
    toolCount: 24,
    gradient: "bg-gradient-to-r from-red-500 to-red-400",
    subcategories: ["PDF Tools", "PDF Conversion"]
  },
  {
    id: "image",
    name: "Image Tools",
    description: "Advanced image processing & AI enhancement", 
    icon: "🖼️",
    toolCount: 24,
    gradient: "bg-gradient-to-r from-blue-500 to-blue-400",
    subcategories: ["Image Processing", "Image Enhancement"]
  },
  {
    id: "media",
    name: "Audio/Video",
    description: "Complete media processing suite",
    icon: "🎵", 
    toolCount: 16,
    gradient: "bg-gradient-to-r from-green-500 to-green-400",
    subcategories: ["Audio Tools", "Video Tools"]
  },
  {
    id: "government", 
    name: "Government Tools",
    description: "Official document processing & validation",
    icon: "🏛️",
    toolCount: 20,
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    subcategories: ["Government Tools"]
  },
  {
    id: "business", 
    name: "AI & Business Tools",
    description: "AI-powered productivity and business tools",
    icon: "🤖",
    toolCount: 16,
    gradient: "bg-gradient-to-r from-purple-500 to-purple-400",
    subcategories: ["AI & Business Tools"]
  }
];

export const getToolsByCategory = (categoryId: string) => {
  const category = TOOL_CATEGORIES.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return category.subcategories.reduce((tools: any[], subcategory) => {
    return tools.concat(COMPREHENSIVE_TOOLS[subcategory] || []);
  }, []);
};