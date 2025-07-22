import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, FileText, Image, Music, Building, Calculator, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

import { ALL_80_TOOLS } from "@/lib/comprehensive-tools";

interface ToolPageData {
  id: string;
  name: string;
  description: string;
  category: string;
  processingTime: string;
  acceptedFormats?: string[];
  options?: any[];
  features?: string[];
}
const ALL_TOOLS = [
  // PDF Tools (20)
  { id: 1, name: "PDF Merge", description: "Combine multiple PDF files into one", icon: "FileText", category: "pdf", popular: true, slug: "pdf-merge", route: "/tools/pdf-merge", apiEndpoint: "/api/pdf/merge", acceptedFormats: [".pdf"], maxFiles: 10 },
  { id: 2, name: "PDF Split", description: "Split PDF into separate pages", icon: "FileText", category: "pdf", popular: true, slug: "pdf-split", apiEndpoint: "/api/pdf/split", acceptedFormats: [".pdf"], maxFiles: 1 },
  { id: 3, name: "PDF Compress", description: "Reduce PDF file size", icon: "FileText", category: "pdf", popular: false, slug: "pdf-compress", apiEndpoint: "/api/pdf/compress", acceptedFormats: [".pdf"], maxFiles: 1 },
  { id: 4, name: "PDF to Word", description: "Convert PDF to Word document", icon: "FileText", category: "pdf", popular: true, slug: "pdf-to-word", apiEndpoint: "/api/pdf/to-word", acceptedFormats: [".pdf"], maxFiles: 1 },
  { id: 5, name: "PDF to Excel", description: "Convert PDF to Excel spreadsheet", icon: "FileText", category: "pdf", popular: false, slug: "pdf-to-excel", apiEndpoint: "/api/pdf/to-excel", acceptedFormats: [".pdf"], maxFiles: 1 },
  
  // Image Tools (20)
  { id: 21, name: "Image Resize", description: "Resize images to custom dimensions", icon: "Image", category: "image", popular: true, slug: "image-resize", route: "/tools/image-resize", apiEndpoint: "/api/image/resize", acceptedFormats: [".jpg", ".jpeg", ".png", ".gif", ".bmp"], maxFiles: 5 },
  { id: 22, name: "Image Compress", description: "Reduce image file size", icon: "Image", category: "image", popular: true, slug: "image-compress", apiEndpoint: "/api/image/compress", acceptedFormats: [".jpg", ".jpeg", ".png"], maxFiles: 5 },
  { id: 23, name: "Background Remove", description: "Remove background from images", icon: "Image", category: "image", popular: true, slug: "background-remove", apiEndpoint: "/api/image/bg-remove", acceptedFormats: [".jpg", ".jpeg", ".png"], maxFiles: 1 },
  
  // Government Tools (20)
  { id: 61, name: "PAN Validation", description: "Validate PAN card numbers", icon: "Building", category: "government", popular: true, slug: "pan-validation", apiEndpoint: "/api/government/pan-validate", acceptedFormats: [], maxFiles: 0 },
  { id: 62, name: "Aadhaar Mask", description: "Mask Aadhaar card numbers", icon: "Building", category: "government", popular: true, slug: "aadhaar-mask", apiEndpoint: "/api/government/aadhaar-mask", acceptedFormats: [], maxFiles: 0 },
  { id: 63, name: "GST Calculator", description: "Calculate GST amounts", icon: "Calculator", category: "government", popular: true, slug: "gst-calculator", route: "/tools/gst-calculator", apiEndpoint: "/api/government/gst-calculate", acceptedFormats: [], maxFiles: 0 },
  
  // Audio/Video Tools (20)
  { id: 41, name: "Audio Convert", description: "Convert between audio formats", icon: "Music", category: "audio", popular: true, slug: "audio-convert", apiEndpoint: "/api/audio/convert", acceptedFormats: [".mp3", ".wav", ".flac", ".aac"], maxFiles: 1 },
  { id: 42, name: "Video Convert", description: "Convert between video formats", icon: "Music", category: "audio", popular: true, slug: "video-convert", apiEndpoint: "/api/audio/video-convert", acceptedFormats: [".mp4", ".avi", ".mov", ".wmv"], maxFiles: 1 },
];

const getIconComponent = (iconName: string) => {
  const icons = {
    FileText,
    Image,
    Music,
    Building,
    Calculator
  };
  return icons[iconName] || FileText;
};

export default function GenericToolPage() {
  const [, params] = useRoute("/tool/:slug");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const tool = ALL_TOOLS.find(t => t.slug === params?.slug);
  const IconComponent = tool ? getIconComponent(tool.icon) : FileText;

  const processFilesMutation = useMutation({
    mutationFn: async (data: FormData | Record<string, string>) => {
      if (!tool?.apiEndpoint) {
        throw new Error('Tool endpoint not configured');
      }

      let requestData;
      let headers = {};

      if (tool.maxFiles === 0) {
        // Form data only (no files)
        requestData = JSON.stringify(data);
        headers = { 'Content-Type': 'application/json' };
      } else {
        // File upload
        requestData = data as FormData;
      }

      const apiUrl = tool.apiEndpoint.startsWith('/api/') 
        ? tool.apiEndpoint 
        : `/api${tool.apiEndpoint}`;
      
      console.log('Making API request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: requestData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.detail || errorData.error || 'Processing failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data);
      setIsProcessing(false);
      setProgress(100);
      toast({
        title: "Success!",
        description: "Processing completed successfully",
      });
    },
    onError: (error: any) => {
      console.error('Processing error:', error);
      setIsProcessing(false);
      setProgress(0);
      toast({
        title: "Error",
        description: error.message || "Processing failed. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleFileSelect = (files: FileList | null) => {
    if (files && tool) {
      const validFiles = Array.from(files).filter(file => {
        if (tool.acceptedFormats.length === 0) return true;
        return tool.acceptedFormats.some(format => 
          file.name.toLowerCase().endsWith(format.toLowerCase())
        );
      });
      
      if (validFiles.length !== files.length) {
        toast({
          title: "Invalid Files",
          description: `Only ${tool.acceptedFormats.join(', ')} files are supported`,
          variant: "destructive"
        });
      }
      
      setSelectedFiles(prev => [...prev, ...validFiles].slice(0, tool.maxFiles || 10));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    if (!tool) return;

    if (tool.maxFiles > 0 && selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to process",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      let processData;
      
      if (tool.maxFiles === 0) {
        // Form data only
        processData = formData;
      } else {
        // File upload
        const data = new FormData();
        selectedFiles.forEach(file => {
          data.append('files', file);
        });
        
        // Add form data
        Object.keys(formData).forEach(key => {
          data.append(key, formData[key]);
        });
        
        processData = data;
      }

      await processFilesMutation.mutateAsync(processData);
    } finally {
      clearInterval(progressInterval);
    }
  };

  const downloadFile = () => {
    if (results?.download_url) {
      window.open(results.download_url, '_blank');
    }
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
          <p className="text-gray-600 mb-8">The requested tool could not be found.</p>
          <Link href="/tools">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Redirect to specific tool pages if they exist
  if (tool.route) {
    window.location.href = tool.route;
    return null;
  }

  const categoryColors = {
    pdf: "bg-red-600",
    image: "bg-blue-600", 
    audio: "bg-green-600",
    government: "bg-orange-600"
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/tools">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <div className={`inline-flex items-center justify-center w-16 h-16 ${categoryColors[tool.category] || 'bg-gray-600'} rounded-xl mb-4`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
          <p className="text-gray-600">{tool.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload/Input Area */}
          <Card className="bg-white border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-gray-700" />
              {tool.maxFiles > 0 ? "Upload Files" : "Enter Information"}
            </h2>

            {tool.maxFiles > 0 ? (
              // File upload interface
              <div>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <IconComponent className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="mb-2 text-gray-700">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supported formats: {tool.acceptedFormats.length > 0 ? tool.acceptedFormats.join(', ') : 'Various formats'}
                  </p>
                  <input
                    type="file"
                    multiple={tool.maxFiles > 1}
                    accept={tool.acceptedFormats.join(',')}
                    onChange={(e) => handleFileSelect(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      Select Files
                    </Button>
                  </label>
                </div>

                {/* Selected files */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Selected Files:</h3>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm text-gray-700 truncate">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Form input interface
              <div className="space-y-4">
                <p className="text-gray-600">This tool requires additional information.</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Form inputs would be configured here based on the specific tool requirements.</p>
                </div>
              </div>
            )}

            {/* Process Button */}
            <div className="mt-6">
              <Button 
                onClick={processFiles}
                disabled={isProcessing || (tool.maxFiles > 0 && selectedFiles.length === 0)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? 'Processing...' : `Process ${tool.name}`}
              </Button>
            </div>
          </Card>

          {/* Results Area */}
          <Card className="bg-white border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2 text-gray-700" />
              Results
            </h2>

            {isProcessing && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Processing...</span>
                  <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {results && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-green-800 font-medium">Processing completed successfully!</p>
                  {results.message && (
                    <p className="text-green-700 text-sm mt-1">{results.message}</p>
                  )}
                </div>

                {results.download_url && (
                  <Button onClick={downloadFile} className="w-full bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download Result
                  </Button>
                )}

                {results.data && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                      {JSON.stringify(results.data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {!isProcessing && !results && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Download className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600">Your processed files will appear here</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}