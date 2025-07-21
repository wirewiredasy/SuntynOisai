import { useRoute, useLocation } from "wouter";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AnimatedLogo from "@/components/animated-logo";
import { ALL_TOOLS } from "@/lib/tools-data";
import { ArrowLeft, Upload, Download, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function ToolPage() {
  const [, params] = useRoute("/tool/:slug");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [files, setFiles] = useState<FileList | null>(null);
  const [options, setOptions] = useState<Record<string, any>>({});
  const [result, setResult] = useState<any>(null);

  const tool = ALL_TOOLS.find(t => t.slug === params?.slug);

  const processTool = useMutation({
    mutationFn: async ({ files, options }: { files: FileList; options: Record<string, any> }) => {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
      formData.append('options', JSON.stringify(options));
      
      const response = await apiRequest('POST', `/api/tools/${tool?.slug}/process`, formData);
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      toast({
        title: "Processing Complete!",
        description: "Your files have been processed successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Processing Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
          <Link href="/tools">
            <Button>Back to Tools</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
    setResult(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to process.",
        variant: "destructive",
      });
      return;
    }
    processTool.mutate({ files, options });
  };

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <AnimatedLogo size={48} />
              <div>
                <h1 className="text-2xl font-bold gradient-text">SuntynAI</h1>
                <p className="text-xs text-slate-400 font-medium">NEURAL INTELLIGENCE</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/tools">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Tool Header */}
          <div className="text-center mb-12">
            <div className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center ${tool.gradient} mb-6`}>
              <span className="text-4xl">{tool.icon}</span>
            </div>
            <h1 className="text-4xl font-black gradient-text mb-4">{tool.name}</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
              {tool.description}
            </p>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center text-sm text-slate-400">
                <span className={`inline-block w-2 h-2 rounded-full ${tool.category === 'pdf' ? 'bg-red-400' : tool.category === 'image' ? 'bg-blue-400' : tool.category === 'audio' ? 'bg-green-400' : 'bg-yellow-400'} mr-2`}></span>
                {tool.category.toUpperCase()} Tool
              </div>
              <div className="flex items-center text-sm text-green-400 font-semibold">
                <CheckCircle className="w-4 h-4 mr-1" />
                {tool.processingTime}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tool Interface */}
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Process Files
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* File Upload */}
                    <div>
                      <Label htmlFor="files" className="text-base font-semibold">
                        Select Files
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="files"
                          type="file"
                          multiple={tool.allowMultiple}
                          accept={tool.acceptedFormats?.join(',')}
                          onChange={handleFileChange}
                          className="file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4"
                        />
                        {tool.acceptedFormats && (
                          <p className="text-sm text-slate-400 mt-2">
                            Supported formats: {tool.acceptedFormats.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tool-specific Options */}
                    {tool.options && tool.options.length > 0 && (
                      <div className="space-y-4">
                        <Label className="text-base font-semibold">Options</Label>
                        {tool.options.map((option) => (
                          <div key={option.key}>
                            <Label htmlFor={option.key} className="text-sm">
                              {option.label}
                            </Label>
                            {option.type === 'text' && (
                              <Input
                                id={option.key}
                                type="text"
                                placeholder={option.placeholder}
                                value={options[option.key] || ''}
                                onChange={(e) => setOptions({...options, [option.key]: e.target.value})}
                              />
                            )}
                            {option.type === 'number' && (
                              <Input
                                id={option.key}
                                type="number"
                                min={option.min}
                                max={option.max}
                                value={options[option.key] || ''}
                                onChange={(e) => setOptions({...options, [option.key]: parseInt(e.target.value)})}
                              />
                            )}
                            {option.type === 'select' && (
                              <select
                                id={option.key}
                                className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
                                value={options[option.key] || ''}
                                onChange={(e) => setOptions({...options, [option.key]: e.target.value})}
                              >
                                <option value="">Select an option</option>
                                {option.options?.map((opt) => (
                                  <option key={opt} value={opt}>{opt}</option>
                                ))}
                              </select>
                            )}
                            {option.type === 'textarea' && (
                              <Textarea
                                id={option.key}
                                placeholder={option.placeholder}
                                value={options[option.key] || ''}
                                onChange={(e) => setOptions({...options, [option.key]: e.target.value})}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600"
                      disabled={processTool.isPending}
                    >
                      {processTool.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Process Files
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Results */}
                  {result && (
                    <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center mb-4">
                        <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                        <h3 className="text-lg font-semibold text-white">Processing Complete</h3>
                      </div>
                      {result.downloadUrl && (
                        <div className="flex items-center justify-between">
                          <p className="text-slate-300">Your processed file is ready for download.</p>
                          <Button asChild>
                            <a href={result.downloadUrl} download>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      )}
                      {result.data && (
                        <div className="mt-4">
                          <Label className="text-sm font-semibold">Result:</Label>
                          <pre className="mt-2 p-3 bg-slate-800 rounded text-sm overflow-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tool Info */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Tool Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-semibold">Category</Label>
                    <p className="text-slate-300 capitalize">{tool.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Processing Time</Label>
                    <p className="text-slate-300">{tool.processingTime}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-semibold">Security</Label>
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">Secure & Private</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tool.features?.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Help */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-400 mb-4">
                    Having trouble with this tool? Check our help center or contact support.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View Guide
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
