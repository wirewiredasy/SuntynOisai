import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Download, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequestFile, downloadFile } from "@/lib/queryClient";

interface ToolProcessorProps {
  tool: {
    id: string;
    name: string;
    description: string;
    route: string;
  };
}

export function ToolProcessor({ tool }: ToolProcessorProps) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [options, setOptions] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);

  const processMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequestFile(`/api/tools/${tool.id}/process`, formData);
      return response;
    },
    onSuccess: async (response) => {
      try {
        // Check if response is a file or JSON
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
          // Handle JSON response (for validation tools like PAN validator)
          const result = await response.json();
          console.log('Processing result:', result);
          setProgress(100);
        } else {
          // Handle file download
          const blob = await response.blob();
          const contentDisposition = response.headers.get('content-disposition');
          const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || `processed_${tool.id}.pdf`;
          
          await downloadFile(blob, filename);
          setProgress(100);
        }
      } catch (error) {
        console.error('Error processing response:', error);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleProcess = async () => {
    if (!files) return;

    setProgress(10);
    const formData = new FormData();
    
    Array.from(files).forEach((file) => {
      formData.append('files', file);
    });
    
    formData.append('options', JSON.stringify(options));
    
    setProgress(30);
    processMutation.mutate(formData);
  };

  const renderToolSpecificOptions = () => {
    switch (tool.id) {
      case 'pdf_split':
        return (
          <>
            <div>
              <Label htmlFor="start_page">Start Page</Label>
              <Input
                id="start_page"
                type="number"
                value={options.start_page || 1}
                onChange={(e) => setOptions(prev => ({ ...prev, start_page: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="end_page">End Page (optional)</Label>
              <Input
                id="end_page"
                type="number"
                value={options.end_page || ''}
                onChange={(e) => setOptions(prev => ({ ...prev, end_page: e.target.value ? parseInt(e.target.value) : undefined }))}
              />
            </div>
          </>
        );
      case 'image_resize':
        return (
          <>
            <div>
              <Label htmlFor="width">Width (px)</Label>
              <Input
                id="width"
                type="number"
                value={options.width || 800}
                onChange={(e) => setOptions(prev => ({ ...prev, width: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (px)</Label>
              <Input
                id="height"
                type="number"
                value={options.height || 600}
                onChange={(e) => setOptions(prev => ({ ...prev, height: parseInt(e.target.value) }))}
              />
            </div>
          </>
        );
      case 'audio_trim':
        return (
          <>
            <div>
              <Label htmlFor="start_time">Start Time (seconds)</Label>
              <Input
                id="start_time"
                type="number"
                step="0.1"
                value={options.start_time || 0}
                onChange={(e) => setOptions(prev => ({ ...prev, start_time: parseFloat(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="end_time">End Time (seconds)</Label>
              <Input
                id="end_time"
                type="number"
                step="0.1"
                value={options.end_time || 10}
                onChange={(e) => setOptions(prev => ({ ...prev, end_time: parseFloat(e.target.value) }))}
              />
            </div>
          </>
        );
      case 'pan_validate':
        return (
          <div>
            <Label htmlFor="pan_number">PAN Number</Label>
            <Input
              id="pan_number"
              placeholder="AAAAA9999A"
              value={options.pan_number || ''}
              onChange={(e) => setOptions(prev => ({ ...prev, pan_number: e.target.value.toUpperCase() }))}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {tool.name}
        </CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* File Upload */}
        <div>
          <Label htmlFor="file-upload">Select Files</Label>
          <Input
            id="file-upload"
            type="file"
            multiple={tool.id.includes('merge')}
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
          />
          {files && (
            <p className="text-sm text-muted-foreground mt-2">
              Selected: {Array.from(files).map(f => f.name).join(', ')}
            </p>
          )}
        </div>

        {/* Tool-specific options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderToolSpecificOptions()}
        </div>

        {/* Progress Bar */}
        {processMutation.isPending && (
          <div>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">Processing...</p>
          </div>
        )}

        {/* Error Display */}
        {processMutation.error && (
          <Alert variant="destructive">
            <AlertDescription>
              {processMutation.error.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Success Display */}
        {processMutation.isSuccess && (
          <Alert>
            <Download className="h-4 w-4" />
            <AlertDescription>
              File processed successfully and downloaded!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleProcess}
          disabled={!files || processMutation.isPending}
          className="w-full"
        >
          {processMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Process Files
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}