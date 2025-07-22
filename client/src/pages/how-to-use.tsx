
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
  RotateCcw,
  Star,
  Clock,
  Shield,
  Zap,
  Users,
  Award,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  TrendingUp,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
  time: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

interface ToolGuide {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  color: string;
  steps: Step[];
  tips: string[];
  features: string[];
  usageStats: {
    users: string;
    success: string;
    rating: number;
  };
}

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  tool: string;
}

export default function HowToUse() {
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const controls = useAnimation();

  const toolGuides: ToolGuide[] = [
    {
      id: 'pdf-tools',
      category: 'PDF Tools',
      title: 'PDF Processing',
      description: 'Advanced PDF manipulation with AI-powered features',
      icon: <FileText className="h-8 w-8 text-red-500" />,
      badge: 'Most Popular',
      color: 'from-red-500 to-pink-500',
      features: ['Batch Processing', 'OCR Recognition', 'Password Protection', 'Compression'],
      usageStats: {
        users: '2.5M+',
        success: '99.7%',
        rating: 4.9
      },
      steps: [
        {
          id: 1,
          title: 'Upload Your Files',
          description: 'Select or drag & drop your PDF files',
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          details: 'Support for multiple formats: PDF, DOC, DOCX, PPT, PPTX up to 100MB each. Advanced file validation and preview.',
          time: '5 sec',
          difficulty: 'Easy'
        },
        {
          id: 2,
          title: 'AI Configuration',
          description: 'Smart settings with AI recommendations',
          icon: <Settings className="h-6 w-6 text-purple-500" />,
          details: 'AI analyzes your documents and suggests optimal settings. Custom templates and batch processing options.',
          time: '10 sec',
          difficulty: 'Medium'
        },
        {
          id: 3,
          title: 'Processing Engine',
          description: 'Enterprise-grade processing with real-time updates',
          icon: <Zap className="h-6 w-6 text-yellow-500" />,
          details: 'Multi-threaded processing with progress tracking. Advanced error handling and recovery systems.',
          time: '15-30 sec',
          difficulty: 'Advanced'
        },
        {
          id: 4,
          title: 'Smart Download',
          description: 'Intelligent file delivery and management',
          icon: <Download className="h-6 w-6 text-green-500" />,
          details: 'Automatic file organization, cloud sync options, and secure download links with expiration.',
          time: '2 sec',
          difficulty: 'Easy'
        }
      ],
      tips: [
        'Use batch mode for processing multiple files efficiently',
        'Enable OCR for scanned documents to make them searchable',
        'Password protect sensitive documents during processing',
        'Use compression for large files to reduce download time'
      ]
    },
    {
      id: 'image-tools',
      category: 'Image Tools',
      title: 'Image Enhancement',
      description: 'Professional image processing with AI enhancement',
      icon: <Image className="h-8 w-8 text-green-500" />,
      badge: 'AI Enhanced',
      color: 'from-green-500 to-emerald-500',
      features: ['AI Upscaling', 'Background Removal', 'Smart Cropping', 'Format Conversion'],
      usageStats: {
        users: '1.8M+',
        success: '98.9%',
        rating: 4.8
      },
      steps: [
        {
          id: 1,
          title: 'Image Upload',
          description: 'Support for all major image formats',
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          details: 'JPG, PNG, GIF, WebP, SVG, TIFF, BMP support. Smart format detection and preview.',
          time: '3 sec',
          difficulty: 'Easy'
        },
        {
          id: 2,
          title: 'AI Analysis',
          description: 'Intelligent image recognition and enhancement',
          icon: <Star className="h-6 w-6 text-purple-500" />,
          details: 'Advanced AI algorithms analyze image quality, lighting, and composition for optimal enhancement.',
          time: '8 sec',
          difficulty: 'Medium'
        },
        {
          id: 3,
          title: 'Enhancement Engine',
          description: 'Professional-grade image processing',
          icon: <Zap className="h-6 w-6 text-yellow-500" />,
          details: 'GPU-accelerated processing with real-time preview. Multiple enhancement algorithms running in parallel.',
          time: '10-20 sec',
          difficulty: 'Advanced'
        },
        {
          id: 4,
          title: 'Export & Share',
          description: 'Multiple output formats and sharing options',
          icon: <Download className="h-6 w-6 text-green-500" />,
          details: 'Export in multiple formats and resolutions. Direct social sharing and cloud storage integration.',
          time: '3 sec',
          difficulty: 'Easy'
        }
      ],
      tips: [
        'Use AI upscaling for photos to increase resolution without quality loss',
        'Try background removal for product photos and portraits',
        'Batch process similar images with saved presets',
        'Use WebP format for web images to reduce file size'
      ]
    },
    {
      id: 'audio-video-tools',
      category: 'Audio & Video',
      title: 'Media Processing',
      description: 'Professional audio/video editing and conversion',
      icon: <Music className="h-8 w-8 text-purple-500" />,
      badge: 'Pro Studio',
      color: 'from-purple-500 to-indigo-500',
      features: ['AI Noise Removal', 'Format Conversion', 'Quality Enhancement', 'Auto Transcription'],
      usageStats: {
        users: '950K+',
        success: '97.8%',
        rating: 4.7
      },
      steps: [
        {
          id: 1,
          title: 'Media Upload',
          description: 'Support for 50+ audio/video formats',
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          details: 'MP3, MP4, AVI, MOV, WAV, FLAC, and more. Up to 500MB per file with progress tracking.',
          time: '10 sec',
          difficulty: 'Easy'
        },
        {
          id: 2,
          title: 'AI Processing',
          description: 'Intelligent audio/video enhancement',
          icon: <Star className="h-6 w-6 text-purple-500" />,
          details: 'AI-powered noise reduction, auto-leveling, and quality enhancement with real-time analysis.',
          time: '15 sec',
          difficulty: 'Medium'
        },
        {
          id: 3,
          title: 'Conversion Engine',
          description: 'High-performance media conversion',
          icon: <Zap className="h-6 w-6 text-yellow-500" />,
          details: 'GPU-accelerated conversion with multiple codec support. Batch processing and custom presets.',
          time: '30-60 sec',
          difficulty: 'Advanced'
        },
        {
          id: 4,
          title: 'Quality Delivery',
          description: 'Optimized output with multiple options',
          icon: <Download className="h-6 w-6 text-green-500" />,
          details: 'Multiple quality options, streaming-ready formats, and direct cloud upload capabilities.',
          time: '5 sec',
          difficulty: 'Easy'
        }
      ],
      tips: [
        'Use AI noise removal for better audio quality in recordings',
        'Convert to MP4 H.264 for best compatibility across devices',
        'Enable auto-transcription for video accessibility',
        'Use batch conversion for processing multiple files efficiently'
      ]
    },
    {
      id: 'government-tools',
      category: 'Government Tools',
      title: 'Official Documents',
      description: 'Secure government document processing and validation',
      icon: <Building className="h-8 w-8 text-blue-600" />,
      badge: 'Verified & Secure',
      color: 'from-blue-600 to-cyan-600',
      features: ['Real-time Validation', 'Secure Processing', 'Official Compliance', 'Digital Signatures'],
      usageStats: {
        users: '650K+',
        success: '99.9%',
        rating: 4.9
      },
      steps: [
        {
          id: 1,
          title: 'Document Selection',
          description: 'Choose from 25+ government services',
          icon: <Upload className="h-6 w-6 text-blue-500" />,
          details: 'PAN, Aadhaar, GST, Tax forms, and more. Secure document templates and form validation.',
          time: '3 sec',
          difficulty: 'Easy'
        },
        {
          id: 2,
          title: 'Secure Input',
          description: 'Encrypted data entry and validation',
          icon: <Shield className="h-6 w-6 text-purple-500" />,
          details: 'End-to-end encryption for all sensitive data. Real-time validation against government databases.',
          time: '30 sec',
          difficulty: 'Medium'
        },
        {
          id: 3,
          title: 'Government API',
          description: 'Direct integration with official systems',
          icon: <Globe className="h-6 w-6 text-yellow-500" />,
          details: 'Real-time verification through official government APIs. Compliance with all security standards.',
          time: '10-15 sec',
          difficulty: 'Advanced'
        },
        {
          id: 4,
          title: 'Certified Output',
          description: 'Official documents with digital signatures',
          icon: <Award className="h-6 w-6 text-green-500" />,
          details: 'Legally compliant documents with digital signatures and verification codes.',
          time: '5 sec',
          difficulty: 'Easy'
        }
      ],
      tips: [
        'Keep your personal documents updated for faster processing',
        'Use digital signatures for legal compliance',
        'All data is encrypted and auto-deleted after processing',
        'Download verification receipts for your records'
      ]
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "👩‍💼",
      content: "SuntynAI has revolutionized our document workflow. The PDF tools save us hours every week!",
      rating: 5,
      tool: "PDF Tools"
    },
    {
      name: "Mike Chen",
      role: "Graphic Designer",
      avatar: "👨‍🎨",
      content: "The AI image enhancement is incredible. It's like having a professional photo editor built-in.",
      rating: 5,
      tool: "Image Tools"
    },
    {
      name: "Priya Sharma",
      role: "Content Creator",
      avatar: "👩‍💻",
      content: "Video conversion has never been this easy. The quality is always perfect!",
      rating: 5,
      tool: "Media Tools"
    }
  ];

  const statsCards = [
    {
      title: "Active Users",
      value: "5M+",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      change: "+25% this month",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Files Processed",
      value: "50M+",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      change: "+1M daily",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Success Rate",
      value: "99.8%",
      icon: <Target className="h-6 w-6 text-green-500" />,
      change: "Industry leading",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Response Time",
      value: "<5sec",
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      change: "Average processing",
      color: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPlaying && activeGuide) {
      const guide = toolGuides.find(g => g.id === activeGuide);
      if (!guide) return;

      let currentStep = 0;
      setProgress(0);
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + (100 / (guide.steps.length * 20));
        });
      }, 100);

      const stepInterval = setInterval(() => {
        currentStep++;
        if (currentStep >= guide.steps.length) {
          setIsPlaying(false);
          clearInterval(stepInterval);
          clearInterval(progressInterval);
          setProgress(100);
          return;
        }
        setActiveStep(currentStep);
      }, 2500);

      return () => {
        clearInterval(stepInterval);
        clearInterval(progressInterval);
      };
    }
  }, [isPlaying, activeGuide]);

  const handleGuideToggle = (guideId: string) => {
    if (activeGuide === guideId) {
      setActiveGuide(null);
      setIsPlaying(false);
    } else {
      setActiveGuide(guideId);
      setActiveStep(0);
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setActiveStep(0);
    setProgress(0);
  };

  const resetAnimation = () => {
    setActiveStep(0);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Master SuntynAI
            </h1>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse opacity-60"></div>
          </div>
          
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Professional tutorials and step-by-step guides to unlock the full potential of our 
            <span className="font-bold text-blue-600"> AI-powered toolkit</span>
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.title}</div>
                <div className="text-xs text-green-600 mt-2 font-medium">{stat.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { icon: "🚀", text: "85+ Premium Tools", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" },
              { icon: "🛡️", text: "Enterprise Security", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" },
              { icon: "⚡", text: "Lightning Fast", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" },
              { icon: "🌍", text: "Global CDN", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" },
              { icon: "❤️", text: "Always Free", color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300" }
            ].map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${badge.color} px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                <span className="mr-2">{badge.icon}</span>
                {badge.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Tool Guides Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 max-w-7xl mx-auto mb-20">
          {toolGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg transform hover:-translate-y-2">
                <CardHeader 
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300"
                  onClick={() => handleGuideToggle(guide.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${guide.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {guide.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <CardTitle className="text-2xl font-bold">{guide.title}</CardTitle>
                          <Badge variant="outline" className={`text-xs font-medium bg-gradient-to-r ${guide.color} text-white border-0`}>
                            {guide.badge}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {guide.description}
                        </p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {guide.features.map((feature, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Usage Stats */}
                        <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{guide.usageStats.users} users</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{guide.usageStats.success} success</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{guide.usageStats.rating}/5</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: activeGuide === guide.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4"
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
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <CardContent className="pt-0 pb-8">
                        {/* Enhanced Animation Controls */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Interactive Demo</h4>
                            <div className="flex items-center space-x-4">
                              <Button
                                onClick={startAnimation}
                                disabled={isPlaying}
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                              >
                                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                {isPlaying ? 'Playing...' : 'Start Demo'}
                              </Button>
                              <Button
                                onClick={resetAnimation}
                                variant="outline"
                                size="sm"
                                className="border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                              >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset
                              </Button>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          {isPlaying && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mb-4"
                            >
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                                <span>Demo Progress</span>
                                <span>{Math.round(progress)}%</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </motion.div>
                          )}
                        </div>

                        {/* Enhanced Steps */}
                        <div className="space-y-6 mb-8">
                          {guide.steps.map((step, stepIndex) => (
                            <motion.div
                              key={step.id}
                              initial={{ opacity: 0.6, scale: 0.98 }}
                              animate={{ 
                                opacity: activeStep >= stepIndex ? 1 : 0.6,
                                scale: activeStep === stepIndex ? 1.02 : 0.98,
                                backgroundColor: activeStep === stepIndex ? 'rgba(59, 130, 246, 0.05)' : 'transparent'
                              }}
                              transition={{ duration: 0.4 }}
                              className="relative flex items-start space-x-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 bg-white/50 dark:bg-gray-800/50"
                            >
                              <div className="relative flex-shrink-0">
                                <motion.div
                                  animate={{
                                    scale: activeStep === stepIndex ? 1.2 : 1,
                                    rotate: activeStep === stepIndex && isPlaying ? [0, 360] : 0
                                  }}
                                  transition={{ duration: activeStep === stepIndex && isPlaying ? 1 : 0.3 }}
                                  className={`p-4 rounded-full ${
                                    activeStep >= stepIndex 
                                      ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg' 
                                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                                  }`}
                                >
                                  {activeStep >= stepIndex ? (
                                    <CheckCircle className="h-6 w-6" />
                                  ) : (
                                    step.icon
                                  )}
                                </motion.div>
                                
                                {/* Enhanced Progress Line */}
                                {stepIndex < guide.steps.length - 1 && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ 
                                      height: 50,
                                      background: activeStep > stepIndex ? 
                                        'linear-gradient(to bottom, #10b981, #059669)' : 
                                        'linear-gradient(to bottom, #e5e7eb, #d1d5db)'
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute left-1/2 top-full w-1 -translate-x-1/2 mt-4 rounded-full"
                                  />
                                )}

                                {/* Step Number Badge */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                  {step.id}
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{step.title}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-lg">
                                      {step.description}
                                    </p>
                                  </div>
                                  
                                  {/* Time and Difficulty Badges */}
                                  <div className="flex flex-col space-y-2 ml-4">
                                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {step.time}
                                    </Badge>
                                    <Badge 
                                      variant={step.difficulty === 'Easy' ? 'default' : step.difficulty === 'Medium' ? 'secondary' : 'destructive'}
                                      className="text-xs whitespace-nowrap"
                                    >
                                      {step.difficulty}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <AnimatePresence>
                                  {activeStep === stepIndex && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0, y: -10 }}
                                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                                      exit={{ opacity: 0, height: 0, y: -10 }}
                                      transition={{ duration: 0.4 }}
                                      className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-5 rounded-xl border border-blue-200/50 dark:border-blue-700/50"
                                    >
                                      <div className="flex items-start space-x-3">
                                        <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                                          {step.details}
                                        </p>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Enhanced Tips Section */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-8 rounded-2xl border border-yellow-200/50 dark:border-yellow-700/50">
                          <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                              <Lightbulb className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="font-bold text-xl text-yellow-800 dark:text-yellow-200">
                              Professional Tips
                            </h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {guide.tips.map((tip, tipIndex) => (
                              <motion.div
                                key={tipIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: tipIndex * 0.1 }}
                                className="flex items-start space-x-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
                              >
                                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">{tip}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Join millions of satisfied users worldwide</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-4xl">{testimonials[currentTestimonial].avatar}</div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      {testimonials[currentTestimonial].tool}
                    </Badge>
                  </div>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-12 text-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h3>
              <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Join over 5 million professionals who trust SuntynAI for their daily productivity needs. 
                Start with any of our 85+ free tools today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Explore All Tools
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-bold text-lg px-8 py-4 rounded-xl border-2 transition-all duration-300 hover:scale-105"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  View Documentation
                </Button>
              </div>
              
              <div className="flex justify-center items-center space-x-8 mt-10 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Always Free</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
