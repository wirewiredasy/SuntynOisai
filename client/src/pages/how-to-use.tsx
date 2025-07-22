
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Image, 
  Music, 
  Building, 
  Upload, 
  Download, 
  Settings, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
}

interface ToolGuide {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  steps: Step[];
  tips: string[];
}

export default function HowToUse() {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const toolGuides: ToolGuide[] = [
    {
      id: 'pdf-tools',
      category: 'PDF Tools',
      title: 'PDF Processing',
      description: 'Learn how to merge, split, and manipulate PDF documents',
      icon: <FileText className="h-8 w-8 text-red-500" />,
      badge: 'Most Popular',
      steps: [
        {
          id: 1,
          title: 'Upload Your Files',
          description: 'Select or drag & drop your PDF files',
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          details: 'Click the upload area or drag multiple PDF files. Supported formats: PDF up to 50MB each.'
        },
        {
          id: 2,
          title: 'Choose Operation',
          description: 'Select merge, split, or other PDF operations',
          icon: <Settings className="h-6 w-6 text-purple-500" />,
          details: 'Pick from merge, split by pages, compress, or convert to images. Preview options available.'
        },
        {
          id: 3,
          title: 'Process Files',
          description: 'AI processes your documents securely',
          icon: <RotateCcw className="h-6 w-6 text-orange-500 animate-spin" />,
          details: 'Our AI engine processes files with enterprise-grade security. Processing time: 10-30 seconds.'
        },
        {
          id: 4,
          title: 'Download Result',
          description: 'Get your processed PDF instantly',
          icon: <Download className="h-6 w-6 text-green-500" />,
          details: 'Download processed files immediately. Files auto-delete after 1 hour for security.'
        }
      ],
      tips: [
        'For best results, use high-quality PDF files',
        'Large files may take longer to process',
        'All files are automatically deleted after 1 hour',
        'No registration required - completely free'
      ]
    },
    {
      id: 'image-tools',
      category: 'Image Tools',
      title: 'Image Processing',
      description: 'Resize, compress, and enhance your images',
      icon: <Image className="h-8 w-8 text-green-500" />,
      badge: 'Fast Processing',
      steps: [
        {
          id: 1,
          title: 'Upload Images',
          description: 'Select images in any format',
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          details: 'Supports JPG, PNG, GIF, WebP, SVG. Maximum size: 25MB per image.'
        },
        {
          id: 2,
          title: 'Set Parameters',
          description: 'Choose size, quality, and format',
          icon: <Settings className="h-6 w-6 text-purple-500" />,
          details: 'Adjust dimensions, quality percentage, or convert between formats. Real-time preview available.'
        },
        {
          id: 3,
          title: 'AI Enhancement',
          description: 'Automatic optimization and processing',
          icon: <RotateCcw className="h-6 w-6 text-orange-500 animate-spin" />,
          details: 'AI-powered compression and enhancement. Maintains quality while reducing file size.'
        },
        {
          id: 4,
          title: 'Save Results',
          description: 'Download optimized images',
          icon: <Download className="h-6 w-6 text-green-500" />,
          details: 'Get processed images in your chosen format. Batch download available for multiple files.'
        }
      ],
      tips: [
        'Use PNG for images with transparency',
        'JPG is best for photos and complex images',
        'WebP format offers better compression',
        'Batch processing saves time for multiple images'
      ]
    },
    {
      id: 'audio-video-tools',
      category: 'Audio & Video',
      title: 'Media Processing',
      description: 'Convert and enhance audio/video files',
      icon: <Music className="h-8 w-8 text-purple-500" />,
      badge: 'Pro Quality',
      steps: [
        {
          id: 1,
          title: 'Upload Media',
          description: 'Select audio or video files',
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          details: 'Supports MP3, MP4, AVI, MOV, WAV, and more. Maximum size: 100MB per file.'
        },
        {
          id: 2,
          title: 'Choose Format',
          description: 'Select output format and quality',
          icon: <Settings className="h-6 w-6 text-purple-500" />,
          details: 'Convert between formats, adjust bitrate, sample rate, and video resolution.'
        },
        {
          id: 3,
          title: 'Process Media',
          description: 'AI-powered conversion and enhancement',
          icon: <RotateCcw className="h-6 w-6 text-orange-500 animate-spin" />,
          details: 'Advanced algorithms ensure high-quality output. Noise reduction and enhancement available.'
        },
        {
          id: 4,
          title: 'Download Files',
          description: 'Get your converted media',
          icon: <Download className="h-6 w-6 text-green-500" />,
          details: 'Download converted files in your chosen format. Quality preserved during conversion.'
        }
      ],
      tips: [
        'Higher bitrates mean better quality but larger files',
        'MP4 is the most compatible video format',
        'WAV provides highest audio quality',
        'Consider file size vs quality trade-offs'
      ]
    },
    {
      id: 'government-tools',
      category: 'Government Tools',
      title: 'Document Services',
      description: 'Official document processing and validation',
      icon: <Building className="h-8 w-8 text-yellow-500" />,
      badge: 'Secure & Verified',
      steps: [
        {
          id: 1,
          title: 'Select Service',
          description: 'Choose government document type',
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          details: 'Available services: PAN validation, Aadhaar masking, GST calculator, tax forms, and more.'
        },
        {
          id: 2,
          title: 'Enter Details',
          description: 'Provide required information',
          icon: <Settings className="h-6 w-6 text-purple-500" />,
          details: 'Fill in necessary details. All data is encrypted and never stored on our servers.'
        },
        {
          id: 3,
          title: 'Validate & Process',
          description: 'Secure processing with government APIs',
          icon: <RotateCcw className="h-6 w-6 text-orange-500 animate-spin" />,
          details: 'Real-time validation using official government databases. Enterprise-grade security.'
        },
        {
          id: 4,
          title: 'Get Results',
          description: 'Download official documents',
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          details: 'Receive validated documents or certificates. All documents are legally compliant.'
        }
      ],
      tips: [
        'Keep your personal information secure',
        'Double-check all details before processing',
        'Documents are auto-deleted for privacy',
        'All processing is legally compliant'
      ]
    }
  ];

  const handleGuideToggle = (guideId: string) => {
    if (activeGuide === guideId) {
      setActiveGuide(null);
      setIsPlaying(false);
    } else {
      setActiveGuide(guideId);
      setActiveStep(0);
      setIsPlaying(false);
    }
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setActiveStep(0);
    
    const guide = toolGuides.find(g => g.id === activeGuide);
    if (!guide) return;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= guide.steps.length) {
        setIsPlaying(false);
        clearInterval(interval);
        return;
      }
      setActiveStep(currentStep);
    }, 2000);
  };

  const resetAnimation = () => {
    setActiveStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            How to Use SuntynAI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Step-by-step guides to help you master our AI-powered tools. Each tool is designed to be intuitive and powerful.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              🚀 85+ Free Tools
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              🔒 100% Secure
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              ⚡ Instant Processing
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              📱 Mobile Friendly
            </Badge>
          </div>
        </motion.div>

        {/* Tool Guides Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {toolGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleGuideToggle(guide.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                        {guide.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <CardTitle className="text-xl font-bold">{guide.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {guide.badge}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeGuide === guide.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    </motion.div>
                  </div>
                </CardHeader>

                <AnimatePresence>
                  {activeGuide === guide.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <CardContent className="pt-0">
                        {/* Animation Controls */}
                        <div className="flex items-center justify-center space-x-4 mb-8">
                          <Button
                            onClick={startAnimation}
                            disabled={isPlaying}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                          >
                            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                            {isPlaying ? 'Playing...' : 'Start Demo'}
                          </Button>
                          <Button
                            onClick={resetAnimation}
                            variant="outline"
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                        </div>

                        {/* Steps */}
                        <div className="space-y-4 mb-8">
                          {guide.steps.map((step, stepIndex) => (
                            <motion.div
                              key={step.id}
                              initial={{ opacity: 0.5, scale: 0.95 }}
                              animate={{ 
                                opacity: activeStep >= stepIndex ? 1 : 0.5,
                                scale: activeStep === stepIndex ? 1.02 : 0.95,
                                backgroundColor: activeStep === stepIndex ? '#f0f9ff' : 'transparent'
                              }}
                              transition={{ duration: 0.3 }}
                              className="flex items-start space-x-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300"
                            >
                              <div className="relative">
                                <motion.div
                                  animate={{
                                    scale: activeStep === stepIndex ? 1.1 : 1,
                                    rotate: activeStep === stepIndex && isPlaying ? 360 : 0
                                  }}
                                  transition={{ duration: 0.5 }}
                                  className={`p-3 rounded-full ${
                                    activeStep >= stepIndex 
                                      ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' 
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                                  }`}
                                >
                                  {activeStep >= stepIndex ? (
                                    <CheckCircle className="h-6 w-6" />
                                  ) : (
                                    step.icon
                                  )}
                                </motion.div>
                                {stepIndex < guide.steps.length - 1 && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ 
                                      height: 40,
                                      backgroundColor: activeStep > stepIndex ? '#10b981' : '#e5e7eb'
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-1/2 top-full w-0.5 -translate-x-1/2 mt-2"
                                  />
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                  {step.description}
                                </p>
                                <AnimatePresence>
                                  {activeStep === stepIndex && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg"
                                    >
                                      {step.details}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Tips Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                          <h4 className="font-semibold text-lg mb-4 text-blue-800 dark:text-blue-200">
                            💡 Pro Tips
                          </h4>
                          <ul className="space-y-2">
                            {guide.tips.map((tip, tipIndex) => (
                              <motion.li
                                key={tipIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: tipIndex * 0.1 }}
                                className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                                <span>{tip}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Try any of our 85+ free AI tools. No registration required, completely secure, and always free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Explore All Tools
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
