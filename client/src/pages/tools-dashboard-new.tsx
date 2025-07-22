import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Grid, List, Filter, Star, Zap, FileText, Image, Music, Building, Calculator, Lock, Globe, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// All 80 tools organized by category
const ALL_TOOLS = [
  // PDF Tools (20)
  { id: 1, name: "PDF Merge", description: "Combine multiple PDF files into one", icon: FileText, category: "pdf", popular: true, slug: "pdf-merge", route: "/tools/pdf-merge" },
  { id: 2, name: "PDF Split", description: "Split PDF into separate pages", icon: FileText, category: "pdf", popular: true, slug: "pdf-split", route: "/tools/pdf-split" },
  { id: 3, name: "PDF Compress", description: "Reduce PDF file size", icon: FileText, category: "pdf", popular: false, slug: "pdf-compress" },
  { id: 4, name: "PDF to Word", description: "Convert PDF to Word document", icon: FileText, category: "pdf", popular: true, slug: "pdf-to-word" },
  { id: 5, name: "PDF to Excel", description: "Convert PDF to Excel spreadsheet", icon: FileText, category: "pdf", popular: false, slug: "pdf-to-excel" },
  { id: 6, name: "PDF to PowerPoint", description: "Convert PDF to PowerPoint", icon: FileText, category: "pdf", popular: false, slug: "pdf-to-powerpoint" },
  { id: 7, name: "PDF Password Protect", description: "Add password protection to PDF", icon: Lock, category: "pdf", popular: false, slug: "pdf-password-protect" },
  { id: 8, name: "PDF Password Remove", description: "Remove password from PDF", icon: Lock, category: "pdf", popular: false, slug: "pdf-password-remove" },
  { id: 9, name: "PDF Watermark", description: "Add watermark to PDF pages", icon: FileText, category: "pdf", popular: false, slug: "pdf-watermark" },
  { id: 10, name: "PDF Page Delete", description: "Delete specific pages from PDF", icon: FileText, category: "pdf", popular: false, slug: "pdf-page-delete" },
  { id: 11, name: "PDF Page Rotate", description: "Rotate PDF pages", icon: FileText, category: "pdf", popular: false, slug: "pdf-page-rotate" },
  { id: 12, name: "PDF OCR", description: "Extract text from scanned PDF", icon: FileText, category: "pdf", popular: true, slug: "pdf-ocr" },
  { id: 13, name: "PDF Form Fill", description: "Fill PDF forms electronically", icon: Edit, category: "pdf", popular: false, slug: "pdf-form-fill" },
  { id: 14, name: "PDF Metadata Edit", description: "Edit PDF properties and metadata", icon: FileText, category: "pdf", popular: false, slug: "pdf-metadata-edit" },
  { id: 15, name: "PDF Bookmark Add", description: "Add bookmarks to PDF", icon: FileText, category: "pdf", popular: false, slug: "pdf-bookmark-add" },
  { id: 16, name: "PDF Page Numbers", description: "Add page numbers to PDF", icon: FileText, category: "pdf", popular: false, slug: "pdf-page-numbers" },
  { id: 17, name: "PDF Background Remove", description: "Remove background from PDF", icon: FileText, category: "pdf", popular: false, slug: "pdf-background-remove", route: "/tools/pdf-background-remove" },
  { id: 18, name: "PDF Signature Add", description: "Add digital signature to PDF", icon: FileText, category: "pdf", popular: false, slug: "pdf-signature-add" },
  { id: 19, name: "PDF Header Footer", description: "Add header and footer to PDF", icon: FileText, category: "pdf", popular: false, slug: "pdf-header-footer" },
  { id: 20, name: "PDF Black White", description: "Convert PDF to black and white", icon: FileText, category: "pdf", popular: false, slug: "pdf-black-white" },

  // Image Tools (20) - Working
  { id: 21, name: "Image Resize", description: "Resize images to custom dimensions", icon: Image, category: "image", popular: true, slug: "image-resize", route: "/tools/image-resize" },
  { id: 22, name: "Image Compress", description: "Reduce image file size", icon: Image, category: "image", popular: true, slug: "image-compress" },
  { id: 23, name: "Background Remove", description: "Remove background from images", icon: Image, category: "image", popular: true, slug: "background-remove" },
  { id: 24, name: "Image Crop", description: "Crop images to specific dimensions", icon: Image, category: "image", popular: true, slug: "image-crop" },
  { id: 25, name: "Image Format Convert", description: "Convert between image formats", icon: Image, category: "image", popular: true, slug: "image-format-convert" },
  { id: 26, name: "Image Enhance", description: "AI-powered image enhancement", icon: Image, category: "image", popular: false, slug: "image-enhance" },
  { id: 27, name: "Image Upscale", description: "Increase image resolution with AI", icon: Image, category: "image", popular: false, slug: "image-upscale" },
  { id: 28, name: "Image Filters", description: "Apply artistic filters to images", icon: Image, category: "image", popular: false, slug: "image-filters" },
  { id: 29, name: "Image Watermark", description: "Add watermark to images", icon: Image, category: "image", popular: false, slug: "image-watermark" },
  { id: 30, name: "QR Code Generator", description: "Generate QR codes", icon: Image, category: "image", popular: true, slug: "qr-code-generator" },
  { id: 31, name: "Barcode Generator", description: "Generate various barcodes", icon: Image, category: "image", popular: false, slug: "barcode-generator" },
  { id: 32, name: "Image Collage", description: "Create photo collages", icon: Image, category: "image", popular: false, slug: "image-collage" },
  { id: 33, name: "Meme Generator", description: "Create memes with text", icon: Image, category: "image", popular: false, slug: "meme-generator" },
  { id: 34, name: "Image Border", description: "Add borders to images", icon: Image, category: "image", popular: false, slug: "image-border" },
  { id: 35, name: "Image Rotate", description: "Rotate images by any angle", icon: Image, category: "image", popular: false, slug: "image-rotate" },
  { id: 36, name: "Image Flip", description: "Flip images horizontally/vertically", icon: Image, category: "image", popular: false, slug: "image-flip" },
  { id: 37, name: "Image Grayscale", description: "Convert images to grayscale", icon: Image, category: "image", popular: false, slug: "image-grayscale" },
  { id: 38, name: "Image Sepia", description: "Apply sepia effect to images", icon: Image, category: "image", popular: false, slug: "image-sepia" },
  { id: 39, name: "Image Blur", description: "Apply blur effect to images", icon: Image, category: "image", popular: false, slug: "image-blur" },
  { id: 40, name: "Image Sharpen", description: "Sharpen blurry images", icon: Image, category: "image", popular: false, slug: "image-sharpen" },

  // Audio/Video Tools (20)
  { id: 41, name: "Audio Convert", description: "Convert between audio formats", icon: Music, category: "audio", popular: true, slug: "audio-convert" },
  { id: 42, name: "Video Convert", description: "Convert between video formats", icon: Music, category: "audio", popular: true, slug: "video-convert" },
  { id: 43, name: "Audio Trim", description: "Cut and trim audio files", icon: Music, category: "audio", popular: true, slug: "audio-trim" },
  { id: 44, name: "Video Trim", description: "Cut and trim video files", icon: Music, category: "audio", popular: true, slug: "video-trim" },
  { id: 45, name: "Audio Merge", description: "Combine multiple audio files", icon: Music, category: "audio", popular: false, slug: "audio-merge" },
  { id: 46, name: "Video Merge", description: "Combine multiple video files", icon: Music, category: "audio", popular: false, slug: "video-merge" },
  { id: 47, name: "Audio Extract", description: "Extract audio from video", icon: Music, category: "audio", popular: true, slug: "audio-extract" },
  { id: 48, name: "Video Compress", description: "Reduce video file size", icon: Music, category: "audio", popular: true, slug: "video-compress" },
  { id: 49, name: "Audio Compress", description: "Reduce audio file size", icon: Music, category: "audio", popular: false, slug: "audio-compress" },
  { id: 50, name: "Volume Boost", description: "Increase audio volume", icon: Music, category: "audio", popular: false, slug: "volume-boost" },
  { id: 51, name: "Audio Normalize", description: "Normalize audio levels", icon: Music, category: "audio", popular: false, slug: "audio-normalize" },
  { id: 52, name: "Video Speed Change", description: "Change video playback speed", icon: Music, category: "audio", popular: false, slug: "video-speed-change" },
  { id: 53, name: "Audio Speed Change", description: "Change audio playback speed", icon: Music, category: "audio", popular: false, slug: "audio-speed-change" },
  { id: 54, name: "Video Stabilize", description: "Stabilize shaky videos", icon: Music, category: "audio", popular: false, slug: "video-stabilize" },
  { id: 55, name: "Noise Removal", description: "Remove background noise", icon: Music, category: "audio", popular: false, slug: "noise-removal" },
  { id: 56, name: "Video Reverse", description: "Reverse video playback", icon: Music, category: "audio", popular: false, slug: "video-reverse" },
  { id: 57, name: "Audio Reverse", description: "Reverse audio playback", icon: Music, category: "audio", popular: false, slug: "audio-reverse" },
  { id: 58, name: "Video Resize", description: "Change video dimensions", icon: Music, category: "audio", popular: false, slug: "video-resize" },
  { id: 59, name: "Video Rotate", description: "Rotate video orientation", icon: Music, category: "audio", popular: false, slug: "video-rotate" },
  { id: 60, name: "GIF Maker", description: "Create GIF from video", icon: Music, category: "audio", popular: true, slug: "gif-maker" },

  // Government Tools (20)
  { id: 61, name: "PAN Validation", description: "Validate PAN card numbers", icon: Building, category: "government", popular: true, slug: "pan-validation" },
  { id: 62, name: "Aadhaar Mask", description: "Mask Aadhaar card numbers", icon: Building, category: "government", popular: true, slug: "aadhaar-mask" },
  { id: 63, name: "GST Calculator", description: "Calculate GST amounts", icon: Calculator, category: "government", popular: true, slug: "gst-calculator", route: "/tools/gst-calculator" },
  { id: 64, name: "IFSC Code Finder", description: "Find bank IFSC codes", icon: Building, category: "government", popular: true, slug: "ifsc-code-finder" },
  { id: 65, name: "Passport Photo", description: "Create passport size photos", icon: Building, category: "government", popular: true, slug: "passport-photo" },
  { id: 66, name: "Income Tax Calculator", description: "Calculate income tax", icon: Calculator, category: "government", popular: false, slug: "income-tax-calculator" },
  { id: 67, name: "EPF Calculator", description: "Calculate EPF amounts", icon: Calculator, category: "government", popular: false, slug: "epf-calculator" },
  { id: 68, name: "PPF Calculator", description: "Calculate PPF returns", icon: Calculator, category: "government", popular: false, slug: "ppf-calculator" },
  { id: 69, name: "EMI Calculator", description: "Calculate loan EMIs", icon: Calculator, category: "government", popular: false, slug: "emi-calculator" },
  { id: 70, name: "SIP Calculator", description: "Calculate SIP returns", icon: Calculator, category: "government", popular: false, slug: "sip-calculator" },
  { id: 71, name: "Digital Signature", description: "Create digital signatures", icon: Building, category: "government", popular: false, slug: "digital-signature" },
  { id: 72, name: "Voter ID Verification", description: "Verify voter ID details", icon: Building, category: "government", popular: false, slug: "voter-id-verification" },
  { id: 73, name: "Driving License Check", description: "Check driving license status", icon: Building, category: "government", popular: false, slug: "driving-license-check" },
  { id: 74, name: "Vehicle Registration", description: "Check vehicle details", icon: Building, category: "government", popular: false, slug: "vehicle-registration" },
  { id: 75, name: "Property Tax Calculator", description: "Calculate property tax", icon: Calculator, category: "government", popular: false, slug: "property-tax-calculator" },
  { id: 76, name: "Stamp Duty Calculator", description: "Calculate stamp duty", icon: Calculator, category: "government", popular: false, slug: "stamp-duty-calculator" },
  { id: 77, name: "TDS Calculator", description: "Calculate TDS amounts", icon: Calculator, category: "government", popular: false, slug: "tds-calculator" },
  { id: 78, name: "Provident Fund", description: "PF account management tools", icon: Building, category: "government", popular: false, slug: "provident-fund" },
  { id: 79, name: "Gratuity Calculator", description: "Calculate gratuity amount", icon: Calculator, category: "government", popular: false, slug: "gratuity-calculator" },
  { id: 80, name: "HRA Calculator", description: "Calculate HRA exemption", icon: Calculator, category: "government", popular: false, slug: "hra-calculator" }
];

const CATEGORIES = [
  { id: "all", name: "All Tools", icon: Grid, count: 80, color: "bg-gray-100 text-gray-800" },
  { id: "pdf", name: "PDF Tools", icon: FileText, count: 20, color: "bg-red-100 text-red-800" },
  { id: "image", name: "Image Tools", icon: Image, count: 20, color: "bg-blue-100 text-blue-800" },
  { id: "audio", name: "Audio/Video", icon: Music, count: 20, color: "bg-green-100 text-green-800" },
  { id: "government", name: "Gov Tools", icon: Building, count: 20, color: "bg-orange-100 text-orange-800" }
];

export default function ToolsDashboardNew() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      const matchesPopular = !showOnlyPopular || tool.popular;
      
      return matchesSearch && matchesCategory && matchesPopular;
    });
  }, [searchQuery, selectedCategory, showOnlyPopular]);

  const popularTools = ALL_TOOLS.filter(tool => tool.popular).slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              80+ free AI-powered tools for PDF, image, audio/video processing, and government documents
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-lg border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
                <Badge variant="secondary" className={`ml-2 ${category.color}`}>
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={showOnlyPopular ? "default" : "outline"}
              onClick={() => setShowOnlyPopular(!showOnlyPopular)}
              className="flex items-center space-x-2"
            >
              <Star className="h-4 w-4" />
              <span>Popular Only</span>
            </Button>
            
            <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center space-x-1"
              >
                <Grid className="h-4 w-4" />
                <span>Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center space-x-1"
              >
                <List className="h-4 w-4" />
                <span>List</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Popular Tools Section */}
        {selectedCategory === "all" && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="h-6 w-6 text-yellow-500 mr-2" />
              Popular Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTools.map((tool) => (
                <Link key={tool.id} href={tool.route || `/tools/${tool.slug}`}>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <tool.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">Popular</Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Tools Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "all" ? "All Tools" : CATEGORIES.find(c => c.id === selectedCategory)?.name}
              <span className="text-gray-500 ml-2 text-lg">({filteredTools.length})</span>
            </h2>
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Filter className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {filteredTools.map((tool) => (
                <Link key={tool.id} href={tool.route || `/tools/${tool.slug}`}>
                  <div className={`bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group ${
                    viewMode === "list" ? "flex items-center p-4" : "p-6"
                  }`}>
                    <div className={`flex ${viewMode === "list" ? "items-center space-x-4 flex-1" : "flex-col"}`}>
                      <div className={`${viewMode === "list" ? "flex-shrink-0" : "mb-4"}`}>
                        <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                          <tool.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                      
                      <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {tool.name}
                          </h3>
                          {tool.popular && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">Popular</Badge>
                          )}
                        </div>
                        <p className={`text-sm text-gray-600 ${viewMode === "grid" ? "line-clamp-2" : ""}`}>
                          {tool.description}
                        </p>
                      </div>

                      {viewMode === "list" && (
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = tool.route || `/tools/${tool.slug}`}>
                            Use Tool
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}