import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, Grid, List, Filter, Star, Zap, FileText, Image, Music, Building, Calculator, Lock, Globe, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// All 80 tools organized by category
const ALL_TOOLS = [
  // PDF Tools (20)
  { id: 1, name: "PDF Merge", description: "Combine multiple PDF files into one", icon: FileText, category: "pdf", popular: true },
  { id: 2, name: "PDF Split", description: "Split PDF into separate pages", icon: FileText, category: "pdf", popular: true },
  { id: 3, name: "PDF Compress", description: "Reduce PDF file size", icon: FileText, category: "pdf", popular: false },
  { id: 4, name: "PDF to Word", description: "Convert PDF to Word document", icon: FileText, category: "pdf", popular: true },
  { id: 5, name: "PDF to Excel", description: "Convert PDF to Excel spreadsheet", icon: FileText, category: "pdf", popular: false },
  { id: 6, name: "PDF to PowerPoint", description: "Convert PDF to PowerPoint", icon: FileText, category: "pdf", popular: false },
  { id: 7, name: "PDF Password Protect", description: "Add password protection to PDF", icon: Lock, category: "pdf", popular: false },
  { id: 8, name: "PDF Password Remove", description: "Remove password from PDF", icon: Lock, category: "pdf", popular: false },
  { id: 9, name: "PDF Watermark", description: "Add watermark to PDF pages", icon: FileText, category: "pdf", popular: false },
  { id: 10, name: "PDF Page Delete", description: "Delete specific pages from PDF", icon: FileText, category: "pdf", popular: false },
  { id: 11, name: "PDF Page Rotate", description: "Rotate PDF pages", icon: FileText, category: "pdf", popular: false },
  { id: 12, name: "PDF OCR", description: "Extract text from scanned PDF", icon: FileText, category: "pdf", popular: true },
  { id: 13, name: "PDF Form Fill", description: "Fill PDF forms electronically", icon: Edit, category: "pdf", popular: false },
  { id: 14, name: "PDF Metadata Edit", description: "Edit PDF properties and metadata", icon: FileText, category: "pdf", popular: false },
  { id: 15, name: "PDF Bookmark Add", description: "Add bookmarks to PDF", icon: FileText, category: "pdf", popular: false },
  { id: 16, name: "PDF Page Numbers", description: "Add page numbers to PDF", icon: FileText, category: "pdf", popular: false },
  { id: 17, name: "PDF Background Remove", description: "Remove background from PDF", icon: FileText, category: "pdf", popular: false },
  { id: 18, name: "PDF Signature Add", description: "Add digital signature to PDF", icon: FileText, category: "pdf", popular: false },
  { id: 19, name: "PDF Header Footer", description: "Add header and footer to PDF", icon: FileText, category: "pdf", popular: false },
  { id: 20, name: "PDF Black White", description: "Convert PDF to black and white", icon: FileText, category: "pdf", popular: false },

  // Image Tools (20)
  { id: 21, name: "Image Resize", description: "Resize images to custom dimensions", icon: Image, category: "image", popular: true },
  { id: 22, name: "Image Compress", description: "Reduce image file size", icon: Image, category: "image", popular: true },
  { id: 23, name: "Background Remove", description: "Remove background from images", icon: Image, category: "image", popular: true },
  { id: 24, name: "Image Crop", description: "Crop images to specific dimensions", icon: Image, category: "image", popular: true },
  { id: 25, name: "Image Format Convert", description: "Convert between image formats", icon: Image, category: "image", popular: true },
  { id: 26, name: "Image Enhance", description: "AI-powered image enhancement", icon: Image, category: "image", popular: false },
  { id: 27, name: "Image Upscale", description: "Increase image resolution with AI", icon: Image, category: "image", popular: false },
  { id: 28, name: "Image Filters", description: "Apply artistic filters to images", icon: Image, category: "image", popular: false },
  { id: 29, name: "Image Watermark", description: "Add watermark to images", icon: Image, category: "image", popular: false },
  { id: 30, name: "QR Code Generator", description: "Generate QR codes", icon: Image, category: "image", popular: true },
  { id: 31, name: "Barcode Generator", description: "Generate various barcodes", icon: Image, category: "image", popular: false },
  { id: 32, name: "Image Collage", description: "Create photo collages", icon: Image, category: "image", popular: false },
  { id: 33, name: "Meme Generator", description: "Create memes with text", icon: Image, category: "image", popular: false },
  { id: 34, name: "Image Border", description: "Add borders to images", icon: Image, category: "image", popular: false },
  { id: 35, name: "Image Rotate", description: "Rotate images by any angle", icon: Image, category: "image", popular: false },
  { id: 36, name: "Image Flip", description: "Flip images horizontally/vertically", icon: Image, category: "image", popular: false },
  { id: 37, name: "Image Grayscale", description: "Convert images to grayscale", icon: Image, category: "image", popular: false },
  { id: 38, name: "Image Sepia", description: "Apply sepia effect to images", icon: Image, category: "image", popular: false },
  { id: 39, name: "Image Blur", description: "Apply blur effect to images", icon: Image, category: "image", popular: false },
  { id: 40, name: "Image Sharpen", description: "Sharpen blurry images", icon: Image, category: "image", popular: false },

  // Audio/Video Tools (20)
  { id: 41, name: "Audio Convert", description: "Convert between audio formats", icon: Music, category: "audio", popular: true },
  { id: 42, name: "Video Convert", description: "Convert between video formats", icon: Music, category: "audio", popular: true },
  { id: 43, name: "Audio Trim", description: "Cut and trim audio files", icon: Music, category: "audio", popular: true },
  { id: 44, name: "Video Trim", description: "Cut and trim video files", icon: Music, category: "audio", popular: true },
  { id: 45, name: "Audio Merge", description: "Combine multiple audio files", icon: Music, category: "audio", popular: false },
  { id: 46, name: "Video Merge", description: "Combine multiple video files", icon: Music, category: "audio", popular: false },
  { id: 47, name: "Audio Extract", description: "Extract audio from video", icon: Music, category: "audio", popular: true },
  { id: 48, name: "Video Compress", description: "Reduce video file size", icon: Music, category: "audio", popular: true },
  { id: 49, name: "Audio Compress", description: "Reduce audio file size", icon: Music, category: "audio", popular: false },
  { id: 50, name: "Volume Boost", description: "Increase audio volume", icon: Music, category: "audio", popular: false },
  { id: 51, name: "Audio Normalize", description: "Normalize audio levels", icon: Music, category: "audio", popular: false },
  { id: 52, name: "Video Speed Change", description: "Change video playback speed", icon: Music, category: "audio", popular: false },
  { id: 53, name: "Audio Speed Change", description: "Change audio playback speed", icon: Music, category: "audio", popular: false },
  { id: 54, name: "Video Stabilize", description: "Stabilize shaky videos", icon: Music, category: "audio", popular: false },
  { id: 55, name: "Noise Removal", description: "Remove background noise", icon: Music, category: "audio", popular: false },
  { id: 56, name: "Video Reverse", description: "Reverse video playback", icon: Music, category: "audio", popular: false },
  { id: 57, name: "Audio Reverse", description: "Reverse audio playback", icon: Music, category: "audio", popular: false },
  { id: 58, name: "Video Resize", description: "Change video dimensions", icon: Music, category: "audio", popular: false },
  { id: 59, name: "Video Rotate", description: "Rotate video orientation", icon: Music, category: "audio", popular: false },
  { id: 60, name: "GIF Maker", description: "Create GIF from video", icon: Music, category: "audio", popular: true },

  // Government Tools (20)
  { id: 61, name: "PAN Validation", description: "Validate PAN card numbers", icon: Building, category: "government", popular: true },
  { id: 62, name: "Aadhaar Mask", description: "Mask Aadhaar card numbers", icon: Building, category: "government", popular: true },
  { id: 63, name: "GST Calculator", description: "Calculate GST amounts", icon: Calculator, category: "government", popular: true },
  { id: 64, name: "IFSC Code Finder", description: "Find bank IFSC codes", icon: Building, category: "government", popular: true },
  { id: 65, name: "Passport Photo", description: "Create passport size photos", icon: Building, category: "government", popular: true },
  { id: 66, name: "Income Tax Calculator", description: "Calculate income tax", icon: Calculator, category: "government", popular: false },
  { id: 67, name: "EPF Calculator", description: "Calculate EPF amounts", icon: Calculator, category: "government", popular: false },
  { id: 68, name: "PPF Calculator", description: "Calculate PPF returns", icon: Calculator, category: "government", popular: false },
  { id: 69, name: "EMI Calculator", description: "Calculate loan EMIs", icon: Calculator, category: "government", popular: false },
  { id: 70, name: "SIP Calculator", description: "Calculate SIP returns", icon: Calculator, category: "government", popular: false },
  { id: 71, name: "Digital Signature", description: "Create digital signatures", icon: Building, category: "government", popular: false },
  { id: 72, name: "Voter ID Verification", description: "Verify voter ID details", icon: Building, category: "government", popular: false },
  { id: 73, name: "Driving License Check", description: "Check driving license status", icon: Building, category: "government", popular: false },
  { id: 74, name: "Vehicle Registration", description: "Check vehicle details", icon: Building, category: "government", popular: false },
  { id: 75, name: "Property Tax Calculator", description: "Calculate property tax", icon: Calculator, category: "government", popular: false },
  { id: 76, name: "Stamp Duty Calculator", description: "Calculate stamp duty", icon: Calculator, category: "government", popular: false },
  { id: 77, name: "TDS Calculator", description: "Calculate TDS amounts", icon: Calculator, category: "government", popular: false },
  { id: 78, name: "Provident Fund", description: "PF account management tools", icon: Building, category: "government", popular: false },
  { id: 79, name: "Gratuity Calculator", description: "Calculate gratuity amount", icon: Calculator, category: "government", popular: false },
  { id: 80, name: "HRA Calculator", description: "Calculate HRA exemption", icon: Calculator, category: "government", popular: false }
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Professional AI Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              80 powerful tools for PDF processing, image editing, audio/video conversion, and government services
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-base border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <Button
                  variant={showOnlyPopular ? "default" : "outline"}
                  onClick={() => setShowOnlyPopular(!showOnlyPopular)}
                  className="rounded-xl"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Popular
                </Button>

                <div className="flex rounded-xl border border-gray-300 overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="h-5 w-5" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className={category.color}>
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Popular Tools Section */}
            {selectedCategory === "all" && !searchQuery && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Popular Tools</h2>
                  <Button variant="outline" className="rounded-xl">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {popularTools.map((tool) => (
                    <Link key={tool.id} href={`/tool/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                            <tool.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All Tools Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === "all" ? "All Tools" : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  <span className="text-lg font-normal text-gray-500 ml-2">
                    ({filteredTools.length} tools)
                  </span>
                </h2>
              </div>

              {/* Tools Grid/List */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTools.map((tool) => (
                    <Link key={tool.id} href={`/tool/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-200">
                            <tool.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                          </div>
                          {tool.popular && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1" />
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {tool.description}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {CATEGORIES.find(c => c.id === tool.category)?.name}
                          </Badge>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Zap className="h-4 w-4 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {filteredTools.map((tool, index) => (
                    <Link key={tool.id} href={`/tool/${tool.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className={`group flex items-center p-6 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                        index !== filteredTools.length - 1 ? "border-b border-gray-100" : ""
                      }`}>
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-200">
                            <tool.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                {tool.name}
                              </h3>
                              {tool.popular && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  <Star className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {tool.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="text-xs">
                              {CATEGORIES.find(c => c.id === tool.category)?.name}
                            </Badge>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Zap className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {filteredTools.length === 0 && (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No tools found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search query or filters to find what you're looking for.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}