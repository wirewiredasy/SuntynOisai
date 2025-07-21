export const TOOL_CATEGORIES = [
  {
    id: "pdf",
    name: "PDF Tools",
    description: "Professional PDF processing tools for merging, splitting, compressing, and securing your documents.",
    icon: "📄",
    toolCount: 25,
    gradient: "bg-gradient-to-r from-red-500 to-red-400",
    tools: [
      "PDF Merger",
      "PDF Splitter", 
      "PDF Compressor",
      "PDF Protector",
      "PDF to Images",
      "Images to PDF",
      "PDF Text Extractor",
      "PDF Page Remover"
    ]
  },
  {
    id: "image", 
    name: "Image Tools",
    description: "Advanced image editing and processing tools with AI-powered features for all your creative needs.",
    icon: "🖼️",
    toolCount: 20,
    gradient: "bg-gradient-to-r from-blue-500 to-blue-400",
    tools: [
      "Image Resizer",
      "Image Compressor",
      "Background Remover", 
      "Color Filters",
      "Image Cropper",
      "Format Converter",
      "Watermark Remover",
      "Image Enhancer"
    ]
  },
  {
    id: "audio",
    name: "Audio/Video",
    description: "Complete media processing suite for converting, editing, and optimizing audio and video files.",
    icon: "🎵",
    toolCount: 20,
    gradient: "bg-gradient-to-r from-green-500 to-green-400",
    tools: [
      "Audio Converter",
      "Video Converter",
      "Audio Extractor",
      "Media Trimmer",
      "Video Compressor",
      "Audio Merger",
      "Volume Adjuster",
      "Speed Controller"
    ]
  },
  {
    id: "government",
    name: "Government Tools", 
    description: "Official document processing and validation tools for government-related paperwork and compliance.",
    icon: "🏛️",
    toolCount: 15,
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    tools: [
      "PAN Validator",
      "Aadhaar Masking",
      "GST Calculator",
      "Document Verifier",
      "Tax Calculator",
      "Form Filler",
      "QR Generator",
      "Barcode Scanner"
    ]
  }
];

export const ALL_TOOLS = [
  // PDF Tools
  {
    id: "pdf-merger",
    name: "PDF Merger",
    slug: "pdf-merger",
    description: "Combine multiple PDF files into a single document with customizable page order",
    category: "pdf",
    icon: "➕",
    gradient: "bg-gradient-to-r from-red-500 to-red-400",
    processingTime: "Instant",
    allowMultiple: true,
    acceptedFormats: [".pdf"],
    options: [
      {
        key: "order",
        label: "Page Order",
        type: "select",
        options: ["Sequential", "Reverse", "Custom"]
      }
    ],
    features: [
      "Merge unlimited PDF files",
      "Preserve document quality",
      "Custom page ordering",
      "Batch processing support"
    ]
  },
  {
    id: "pdf-splitter",
    name: "PDF Splitter", 
    slug: "pdf-splitter",
    description: "Split PDF into multiple documents by pages, bookmarks, or custom ranges",
    category: "pdf",
    icon: "✂️",
    gradient: "bg-gradient-to-r from-red-500 to-red-400",
    processingTime: "Instant",
    allowMultiple: false,
    acceptedFormats: [".pdf"],
    options: [
      {
        key: "splitType",
        label: "Split Type", 
        type: "select",
        options: ["By Pages", "By Range", "By Bookmarks"]
      },
      {
        key: "pageRange",
        label: "Page Range (e.g., 1-5, 8, 10-12)",
        type: "text",
        placeholder: "1-5, 8, 10-12"
      }
    ],
    features: [
      "Split by page ranges",
      "Extract specific pages", 
      "Preserve formatting",
      "Multiple output options"
    ]
  },
  {
    id: "pdf-compressor",
    name: "PDF Compressor",
    slug: "pdf-compressor", 
    description: "Reduce PDF file size without quality loss using advanced compression algorithms",
    category: "pdf",
    icon: "🗜️",
    gradient: "bg-gradient-to-r from-red-500 to-red-400",
    processingTime: "Fast",
    allowMultiple: true,
    acceptedFormats: [".pdf"],
    options: [
      {
        key: "quality",
        label: "Compression Quality",
        type: "select",
        options: ["Low (Smaller)", "Medium", "High (Better Quality)"]
      }
    ],
    features: [
      "Up to 80% size reduction",
      "Maintain visual quality",
      "Batch compression",
      "Smart optimization"
    ]
  },
  {
    id: "pdf-protector",
    name: "PDF Protector",
    slug: "pdf-protector",
    description: "Add password protection and security settings to your PDF documents",
    category: "pdf",
    icon: "🔒",
    gradient: "bg-gradient-to-r from-red-500 to-red-400", 
    processingTime: "Instant",
    allowMultiple: true,
    acceptedFormats: [".pdf"],
    options: [
      {
        key: "password",
        label: "Password",
        type: "text",
        placeholder: "Enter secure password"
      },
      {
        key: "permissions",
        label: "Permissions",
        type: "select",
        options: ["Read Only", "No Printing", "No Copying", "Full Protection"]
      }
    ],
    features: [
      "256-bit encryption",
      "Custom permissions",
      "Bulk protection",
      "Password strength meter"
    ]
  },

  // Image Tools
  {
    id: "image-resizer",
    name: "Image Resizer", 
    slug: "image-resizer",
    description: "Resize images while maintaining aspect ratio and quality for web or print",
    category: "image",
    icon: "📏",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-400",
    processingTime: "Instant",
    allowMultiple: true,
    acceptedFormats: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    options: [
      {
        key: "width",
        label: "Width (pixels)",
        type: "number",
        min: 10,
        max: 10000
      },
      {
        key: "height", 
        label: "Height (pixels)",
        type: "number",
        min: 10,
        max: 10000
      },
      {
        key: "maintainRatio",
        label: "Maintain Aspect Ratio",
        type: "select",
        options: ["Yes", "No"]
      }
    ],
    features: [
      "Batch resizing",
      "Preserve aspect ratio",
      "Multiple formats", 
      "Quality preservation"
    ]
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    description: "Reduce image file size without visible quality loss using smart compression",
    category: "image",
    icon: "📦",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-400",
    processingTime: "Instant",
    allowMultiple: true,
    acceptedFormats: [".jpg", ".jpeg", ".png", ".webp"],
    options: [
      {
        key: "quality",
        label: "Quality Level",
        type: "number",
        min: 10,
        max: 100
      }
    ],
    features: [
      "Lossless compression",
      "Batch processing",
      "Format optimization",
      "Size comparison"
    ]
  },
  {
    id: "background-remover",
    name: "Background Remover",
    slug: "background-remover",
    description: "AI-powered background removal from images with precision edge detection",
    category: "image", 
    icon: "🎯",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-400",
    processingTime: "AI Processing",
    isAIPowered: true,
    allowMultiple: true,
    acceptedFormats: [".jpg", ".jpeg", ".png"],
    features: [
      "AI-powered detection",
      "Precise edge cutting",
      "Transparent background",
      "Bulk processing"
    ]
  },
  {
    id: "color-filters",
    name: "Color Filters",
    slug: "color-filters", 
    description: "Apply professional color filters and effects to enhance your images",
    category: "image",
    icon: "🎨",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-400",
    processingTime: "Instant",
    allowMultiple: true,
    acceptedFormats: [".jpg", ".jpeg", ".png"],
    options: [
      {
        key: "filter",
        label: "Filter Type",
        type: "select", 
        options: ["Vintage", "Black & White", "Sepia", "Vibrant", "Cool", "Warm"]
      },
      {
        key: "intensity",
        label: "Filter Intensity",
        type: "number",
        min: 0,
        max: 100
      }
    ],
    features: [
      "Professional filters",
      "Adjustable intensity",
      "Real-time preview",
      "Batch processing"
    ]
  },

  // Audio/Video Tools
  {
    id: "audio-converter",
    name: "Audio Converter",
    slug: "audio-converter",
    description: "Convert between all popular audio formats with customizable quality settings",
    category: "audio",
    icon: "🔄",
    gradient: "bg-gradient-to-r from-green-500 to-green-400",
    processingTime: "Fast",
    allowMultiple: true,
    acceptedFormats: [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"],
    options: [
      {
        key: "format",
        label: "Output Format",
        type: "select",
        options: ["MP3", "WAV", "FLAC", "AAC", "OGG"]
      },
      {
        key: "bitrate",
        label: "Bitrate",
        type: "select",
        options: ["128 kbps", "192 kbps", "256 kbps", "320 kbps"]
      }
    ],
    features: [
      "20+ audio formats",
      "Lossless conversion",
      "Batch processing",
      "Quality preservation"
    ]
  },
  {
    id: "video-converter", 
    name: "Video Converter",
    slug: "video-converter",
    description: "Convert videos to different formats and quality levels for any device",
    category: "audio",
    icon: "📹",
    gradient: "bg-gradient-to-r from-green-500 to-green-400",
    processingTime: "Processing",
    allowMultiple: true,
    acceptedFormats: [".mp4", ".avi", ".mov", ".mkv", ".wmv", ".flv"],
    options: [
      {
        key: "format",
        label: "Output Format",
        type: "select", 
        options: ["MP4", "AVI", "MOV", "MKV", "WMV"]
      },
      {
        key: "quality",
        label: "Quality",
        type: "select",
        options: ["480p", "720p", "1080p", "4K"]
      }
    ],
    features: [
      "Universal compatibility",
      "Quality optimization",
      "Device presets",
      "Fast conversion"
    ]
  },
  {
    id: "audio-extractor",
    name: "Audio Extractor",
    slug: "audio-extractor",
    description: "Extract audio tracks from video files in high quality",
    category: "audio", 
    icon: "🎧",
    gradient: "bg-gradient-to-r from-green-500 to-green-400",
    processingTime: "Fast",
    allowMultiple: true,
    acceptedFormats: [".mp4", ".avi", ".mov", ".mkv", ".wmv"],
    options: [
      {
        key: "audioFormat",
        label: "Audio Format",
        type: "select",
        options: ["MP3", "WAV", "AAC", "FLAC"]
      }
    ],
    features: [
      "Lossless extraction",
      "Multiple formats",
      "Preserve quality",
      "Batch extraction"
    ]
  },
  {
    id: "media-trimmer",
    name: "Media Trimmer",
    slug: "media-trimmer",
    description: "Trim and cut audio/video files with precision timing controls", 
    category: "audio",
    icon: "✂️",
    gradient: "bg-gradient-to-r from-green-500 to-green-400",
    processingTime: "Fast",
    allowMultiple: false,
    acceptedFormats: [".mp3", ".mp4", ".wav", ".avi", ".mov"],
    options: [
      {
        key: "startTime",
        label: "Start Time (MM:SS)",
        type: "text",
        placeholder: "00:30"
      },
      {
        key: "endTime",
        label: "End Time (MM:SS)",
        type: "text",
        placeholder: "02:15"
      }
    ],
    features: [
      "Precise timing",
      "Preview before cut",
      "No quality loss",
      "Multiple segments"
    ]
  },

  // Government Tools
  {
    id: "pan-validator",
    name: "PAN Validator",
    slug: "pan-validator",
    description: "Validate PAN card format and structure for compliance verification",
    category: "government",
    icon: "🆔",
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    processingTime: "Instant",
    allowMultiple: false,
    options: [
      {
        key: "panNumber",
        label: "PAN Number",
        type: "text",
        placeholder: "ABCDE1234F"
      }
    ],
    features: [
      "Format validation",
      "Checksum verification",
      "Instant results",
      "Compliance ready"
    ]
  },
  {
    id: "aadhaar-masking",
    name: "Aadhaar Masking",
    slug: "aadhaar-masking",
    description: "Mask sensitive Aadhaar information while keeping documents valid",
    category: "government", 
    icon: "👁️",
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    processingTime: "Instant",
    allowMultiple: true,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    options: [
      {
        key: "maskType",
        label: "Masking Type", 
        type: "select",
        options: ["First 8 digits", "Last 4 digits", "Middle 4 digits"]
      }
    ],
    features: [
      "Secure masking",
      "Document validity",
      "Privacy protection", 
      "Legal compliance"
    ]
  },
  {
    id: "gst-calculator",
    name: "GST Calculator",
    slug: "gst-calculator",
    description: "Calculate GST amounts and tax rates for business transactions",
    category: "government",
    icon: "💰",
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    processingTime: "Instant",
    allowMultiple: false,
    options: [
      {
        key: "amount",
        label: "Base Amount",
        type: "number",
        min: 0
      },
      {
        key: "gstRate",
        label: "GST Rate",
        type: "select",
        options: ["5%", "12%", "18%", "28%"]
      }
    ],
    features: [
      "Multiple GST rates",
      "Inclusive/Exclusive",
      "Detailed breakdown",
      "Export calculations"
    ]
  },
  {
    id: "document-verifier",
    name: "Document Verifier",
    slug: "document-verifier", 
    description: "Verify authenticity of government documents and certificates",
    category: "government",
    icon: "✅",
    gradient: "bg-gradient-to-r from-yellow-500 to-yellow-400",
    processingTime: "AI Processing",
    isAIPowered: true,
    allowMultiple: true,
    acceptedFormats: [".pdf", ".jpg", ".jpeg", ".png"],
    features: [
      "AI verification",
      "Security features check",
      "Authenticity score",
      "Detailed report"
    ]
  }
];

export const FEATURED_TOOLS = ALL_TOOLS.slice(0, 8);
