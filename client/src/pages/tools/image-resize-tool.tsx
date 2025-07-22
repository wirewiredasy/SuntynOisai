import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, Image as ImageIcon, Maximize } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ImageResizeTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setResult(null);
      } else {
        toast({
          title: "Error",
          description: "Please select a valid image file",
          variant: "destructive"
        });
      }
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

  const processImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 20;
      });
    }, 150);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('width', width.toString());
      formData.append('height', height.toString());

      const response = await fetch('/api/image/resize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to resize image');
      }

      const result = await response.json();
      setResult(result);
      setProgress(100);
      
      toast({
        title: "Success!",
        description: `Image resized to ${width}x${height}`,
      });

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Error",
        description: "Failed to resize image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      clearInterval(progressInterval);
    }
  };

  const downloadFile = () => {
    if (result?.download_url) {
      window.open(result.download_url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-xl mb-4">
            <Maximize className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Resizer</h1>
          <p className="text-gray-600">Resize images to any custom dimensions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload & Settings */}
          <Card className="bg-white border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-gray-700" />
              Upload & Configure
            </h2>

            {/* File Upload */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
                dragActive 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-2 text-gray-700">Drop an image here or click to browse</p>
              <p className="text-sm text-gray-500 mb-4">Supports JPG, PNG, BMP, TIFF</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose Image
                </Button>
              </label>
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Resize Settings */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900">Resize Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width" className="text-gray-700">Width (px)</Label>
                  <Input
                    id="width"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min="1"
                    max="5000"
                    className="bg-white border-gray-300"
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-gray-700">Height (px)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min="1"
                    max="5000"
                    className="bg-white border-gray-300"
                  />
                </div>
              </div>
              
              {/* Preset Sizes */}
              <div>
                <Label className="mb-2 block text-gray-700">Quick Presets</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "HD", w: 1920, h: 1080 },
                    { label: "Square", w: 1000, h: 1000 },
                    { label: "Instagram", w: 1080, h: 1080 },
                    { label: "Twitter", w: 1200, h: 675 },
                  ].map((preset) => (
                    <Button
                      key={preset.label}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setWidth(preset.w);
                        setHeight(preset.h);
                      }}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Button */}
            <Button
              onClick={processImage}
              disabled={!selectedFile || isProcessing}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isProcessing ? 'Resizing...' : `Resize to ${width}×${height}`}
            </Button>
          </Card>

          {/* Processing & Results */}
          <Card className="bg-white border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2 text-gray-700" />
              Processing & Download
            </h2>

            {isProcessing && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Resizing image...</span>
                  <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <ImageIcon className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-semibold text-green-800">Resize Complete!</span>
                  </div>
                  <p className="text-sm text-green-700 mb-4">{result.message}</p>
                  <Button
                    onClick={downloadFile}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resized Image
                  </Button>
                </div>
              </div>
            )}

            {!isProcessing && !result && (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Upload an image to begin resizing</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}