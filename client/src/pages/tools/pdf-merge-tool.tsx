import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, FileText, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PDFMergeTool() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const pdfFiles = Array.from(files).filter(file => 
        file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
      );
      setSelectedFiles(prev => [...prev, ...pdfFiles]);
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
    if (selectedFiles.length < 2) {
      toast({
        title: "Error",
        description: "Please select at least 2 PDF files to merge",
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
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch('/api/pdf/merge', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to merge PDFs');
      }

      const result = await response.json();
      setResult(result);
      setProgress(100);
      
      toast({
        title: "Success!",
        description: "PDFs merged successfully",
      });

    } catch (error) {
      console.error('Processing error:', error);
      toast({
        title: "Error",
        description: "Failed to merge PDFs. Please try again.",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
            <Plus className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-2">PDF Merger</h1>
          <p className="text-slate-400">Combine multiple PDF files into one document</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload PDF Files
            </h2>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-slate-600 hover:border-slate-500'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <FileText className="w-12 h-12 mx-auto mb-4 text-slate-400" />
              <p className="mb-2">Drop PDF files here or click to browse</p>
              <p className="text-sm text-slate-400 mb-4">Support for multiple PDF files</p>
              <input
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="cursor-pointer">
                  Choose Files
                </Button>
              </label>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Selected Files ({selectedFiles.length})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-2">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-red-400" />
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process Button */}
            <div className="mt-6">
              <Button
                onClick={processFiles}
                disabled={selectedFiles.length < 2 || isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? 'Merging...' : `Merge ${selectedFiles.length} PDFs`}
              </Button>
            </div>
          </Card>

          {/* Processing & Results */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Processing & Download
            </h2>

            {isProcessing && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Merging PDFs...</span>
                  <span className="text-sm">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <FileText className="w-5 h-5 mr-2 text-green-400" />
                    <span className="font-semibold text-green-400">Merge Complete!</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{result.message}</p>
                  <Button
                    onClick={downloadFile}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Merged PDF
                  </Button>
                </div>
              </div>
            )}

            {!isProcessing && !result && (
              <div className="text-center py-8 text-slate-400">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select PDF files to begin merging</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}