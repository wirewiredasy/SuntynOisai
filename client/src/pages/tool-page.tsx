import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, Share2, Cloud, Play, FileText, Settings, Star, Clock, Shield } from "lucide-react";

interface ToolData {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
  features: string[];
  processingTime: string;
  maxFileSize: string;
  supportedFormats: string[];
}

export default function ToolPage() {
  const [, params] = useRoute("/tool/:slug");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);

  const { data: tool, isLoading } = useQuery({
    queryKey: [`/api/tools/${params?.slug}`],
    enabled: !!params?.slug,
  });

  const processFilesMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/tools/${params?.slug}/process`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Processing failed');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setResults(data);
      setIsProcessing(false);
      setProgress(100);
    },
    onError: (error) => {
      console.error('Processing error:', error);
      setIsProcessing(false);
      setProgress(0);
    }
  });

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      setSelectedFiles(Array.from(files));
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

  const processFiles = async () => {
    if (selectedFiles.length === 0) return;

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

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });
    formData.append('options', JSON.stringify({}));

    processFilesMutation.mutate(formData);
  };

  const downloadFile = (filename: string) => {
    window.open(`/api/download/${filename}`, '_blank');
  };

  const shareFile = (filename: string) => {
    const shareUrl = `${window.location.origin}/api/download/${filename}`;
    navigator.clipboard.writeText(shareUrl);
    // Show toast notification
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tool...</p>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
          <p className="text-gray-600">The requested tool could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tool Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{tool.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
                <p className="text-lg text-gray-600 mt-1">{tool.description}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {tool.category.toUpperCase()}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {tool.processingTime}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Shield className="h-4 w-4 mr-1" />
                    Max {tool.maxFileSize}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Processing Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload Area */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Files</h2>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : selectedFiles.length > 0
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                
                {selectedFiles.length === 0 ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Drag & drop files here
                    </h3>
                    <p className="text-gray-600 mb-4">
                      or click to browse from your computer
                    </p>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button as="span" className="cursor-pointer">
                        Choose Files
                      </Button>
                    </label>
                  </>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium text-green-800 mb-2">
                      {selectedFiles.length} file(s) selected
                    </h3>
                    <div className="space-y-2 mb-4">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <Button onClick={processFiles} disabled={isProcessing} className="flex-1">
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Process Files
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedFiles([])}
                        disabled={isProcessing}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Supported Formats */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Supported formats:</p>
                <div className="flex flex-wrap gap-2">
                  {tool.supportedFormats?.map((format: string) => (
                    <Badge key={format} variant="outline" className="text-xs">
                      {format}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Processing Progress */}
            {isProcessing && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Files</h3>
                <Progress value={progress} className="mb-2" />
                <p className="text-sm text-gray-600">
                  {progress < 30 ? "Uploading files..." : 
                   progress < 70 ? "Processing with AI..." : 
                   progress < 90 ? "Finalizing results..." : "Almost done..."}
                </p>
              </Card>
            )}

            {/* Results */}
            {results && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
                <div className="space-y-3">
                  {results.files?.map((file: any, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">{file.filename}</p>
                          <p className="text-sm text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => downloadFile(file.filename)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => shareFile(file.filename)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Cloud className="h-4 w-4 mr-1" />
                          Save to Cloud
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tool Features */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
              <div className="space-y-3">
                {tool.features?.map((feature: string) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tool Options */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <Settings className="h-5 w-5 inline mr-2" />
                Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quality
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>High (Recommended)</option>
                    <option>Medium</option>
                    <option>Low (Faster)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Output Format
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Auto (Best)</option>
                    {tool.supportedFormats?.slice(0, 3).map((format: string) => (
                      <option key={format}>{format}</option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>

            {/* Tool Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{tool.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max file size:</span>
                  <span className="font-medium">{tool.maxFileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing time:</span>
                  <span className="font-medium">{tool.processingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Privacy:</span>
                  <span className="font-medium text-green-600">Secure</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}