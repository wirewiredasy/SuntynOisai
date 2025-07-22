
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, FileText, Eraser } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PDFBackgroundRemoveTool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Error",
          description: "Please select a PDF file",
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

  const processFile = async () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

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
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('http://0.0.0.0:8000/pdf/remove-background', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to remove background from PDF');
      }

      // For background removal, we get the file directly
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      
      setResult({
        download_url: downloadUrl,
        filename: `bg_removed_${selectedFile.name}`
      });
      setProgress(100);
      
      toast({
        title: "Success!",
        description: "Background removed successfully",
      });

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Error",
        description: "Failed to remove background. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      clearInterval(progressInterval);
    }
  };

  const downloadFile = () => {
    if (result?.download_url) {
      const a = document.createElement('a');
      a.href = result.download_url;
      a.download = result.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-xl mb-4">
            <Eraser className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Background Remover</h1>
          <p className="text-gray-600">Remove background from your PDF document</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="bg-white border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-gray-700" />
              Upload PDF File
            </h2>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-2 text-gray-700">Drop PDF file here or click to browse</p>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose File
                </Button>
              </label>
            </div>

            {/* Selected File */}
            {selectedFile && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Selected File</h3>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedFile(null)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            {/* Process Button */}
            <div className="mt-6">
              <Button
                onClick={processFile}
                disabled={!selectedFile || isProcessing}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isProcessing ? 'Removing Background...' : 'Remove Background'}
              </Button>
            </div>
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
                  <span className="text-sm text-gray-600">Removing background...</span>
                  <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FileText className="w-5 h-5 mr-2 text-green-600" />
                    <span className="font-semibold text-green-800">Background Removed!</span>
                  </div>
                  <p className="text-sm text-green-700 mb-4">PDF background removed successfully</p>
                  <Button
                    onClick={downloadFile}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Processed PDF
                  </Button>
                </div>
              </div>
            )}

            {!isProcessing && !result && (
              <div className="text-center py-8 text-gray-500">
                <Eraser className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a PDF file to remove background</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
