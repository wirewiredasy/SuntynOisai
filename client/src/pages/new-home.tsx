import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Play, 
  FileText, 
  Image, 
  Music, 
  Building, 
  Zap, 
  Shield, 
  Star,
  Plus,
  Scissors,
  Layers
} from "lucide-react";
import AnimatedLogo from "@/components/animated-logo";

export default function NewHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const heroWords = ["PDF Tools", "Image AI", "Audio Editor", "Gov Services", "Free Tools"];
  const slides = [
    {
      title: "PDF Processing",
      description: "Merge, split, compress, and convert PDF documents",
      icon: <FileText className="h-8 w-8" />,
      color: "from-red-500 to-red-600",
      tools: ["PDF Merge", "PDF Split", "PDF Compress", "PDF to Word"]
    },
    {
      title: "Image AI Tools", 
      description: "Resize, compress, enhance, and edit images with AI",
      icon: <Image className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
      tools: ["Image Resize", "Background Remove", "Image Enhance", "Format Convert"]
    },
    {
      title: "Audio & Video",
      description: "Convert, edit, and optimize audio and video files",
      icon: <Music className="h-8 w-8" />,
      color: "from-green-500 to-green-600",
      tools: ["Audio Convert", "Video Compress", "Audio Trim", "Video Extract"]
    },
    {
      title: "Government Tools",
      description: "Indian government document tools and utilities",
      icon: <Building className="h-8 w-8" />,
      color: "from-orange-500 to-orange-600",
      tools: ["PAN Validation", "Aadhaar Mask", "GST Calculator", "IFSC Finder"]
    }
  ];

  // Typing animation effect
  useEffect(() => {
    const currentWord = heroWords[currentWordIndex];
    let charIndex = 0;

    const typeTimer = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeTimer);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [currentWordIndex]);

  // Auto-advance slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30 pt-20 pb-16 transition-colors duration-300">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60' stroke='%23000' stroke-width='1'/%3e%3cpath d='m 0 60 l 60 0' stroke='%23000' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Logo */}
            <div className="mb-8">
              <AnimatedLogo size={80} showRays={true} className="mx-auto" />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              <span className="text-gray-900 dark:text-white">Professional </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              80 free AI-powered tools for PDF processing, image editing, audio/video conversion, and government services. No registration required.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/tools">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 min-w-[200px]">
                  <Zap className="h-5 w-5 mr-2" />
                  Start Using Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 min-w-[200px]">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">80+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Free</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">&lt;5s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Processing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">Privacy</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Secured</div>
              </div>
            </div>
          </div>

          {/* Interactive Slides Showcase - Mobile Optimized Square Layout */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="relative h-96 md:h-[500px]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentSlide 
                      ? "opacity-100 translate-x-0 scale-100" 
                      : "opacity-0 translate-x-full scale-95"
                  }`}
                >
                  <div className={`h-full bg-gradient-to-br ${slide.color} p-4 md:p-8 text-white`}>
                    {/* Mobile-First Square Layout */}
                    <div className="h-full flex flex-col md:flex-row items-center justify-center">
                      
                      {/* Content Section */}
                      <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                        <div className="flex items-center justify-center md:justify-start space-x-3 md:space-x-4 mb-4 md:mb-6">
                          <div className="p-2 md:p-3 bg-white/25 rounded-xl md:rounded-2xl backdrop-blur-sm shadow-lg">
                            {slide.icon}
                          </div>
                          <h3 className="text-xl md:text-3xl font-black tracking-tight">{slide.title}</h3>
                        </div>
                        
                        <p className="text-sm md:text-lg opacity-95 mb-4 md:mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
                          {slide.description}
                        </p>
                        
                        {/* Tools Grid - Square Layout for Mobile */}
                        <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-sm mx-auto md:mx-0">
                          {slide.tools.map((tool, toolIndex) => (
                            <div 
                              key={toolIndex} 
                              className="bg-white/25 backdrop-blur-sm rounded-lg p-2 md:p-3 text-xs md:text-sm font-semibold shadow-sm hover:bg-white/35 transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                              {tool}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Visual Section - Square Design */}
                      <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="relative">
                          {/* Main Square */}
                          <div className="w-32 h-32 md:w-64 md:h-64 bg-white/25 rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl transform hover:rotate-3 transition-all duration-500">
                            <div className="text-3xl md:text-6xl opacity-80 transform hover:scale-110 transition-transform duration-300">
                              {slide.icon}
                            </div>
                          </div>
                          
                          {/* Floating Elements for Mobile */}
                          <div className="absolute -top-2 -right-2 w-8 h-8 md:w-12 md:h-12 bg-white/20 rounded-lg backdrop-blur-sm animate-bounce delay-300">
                            <div className="w-full h-full flex items-center justify-center text-lg md:text-2xl opacity-70">✨</div>
                          </div>
                          <div className="absolute -bottom-2 -left-2 w-6 h-6 md:w-10 md:h-10 bg-white/20 rounded-lg backdrop-blur-sm animate-bounce delay-700">
                            <div className="w-full h-full flex items-center justify-center text-sm md:text-xl opacity-70">⚡</div>
                          </div>
                          
                          {/* Glow Effect */}
                          <div className="absolute -inset-2 md:-inset-4 bg-white/10 rounded-2xl md:rounded-3xl blur-xl animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="absolute bottom-16 md:bottom-20 left-4 right-4 md:left-8 md:right-8">
                      <div className="w-full bg-white/20 rounded-full h-1">
                        <div 
                          className="bg-white rounded-full h-1 transition-all duration-300"
                          style={{ width: `${((index + 1) / slides.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide 
                      ? "w-8 h-3 bg-white shadow-lg" 
                      : "w-3 h-3 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows - Hidden on Mobile */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 rounded-full items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 rounded-full items-center justify-center text-white transition-all duration-300 backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Choose Your Tool Category - Exact Match to Image */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Tool Category
            </h2>
            <p className="text-gray-400 text-lg">
              Professional tools for all your needs
            </p>
          </div>

          {/* Tool Category Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* PDF Tools */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">PDF Tools</h3>
                    <p className="text-gray-400 text-sm">25 professional tools</p>
                  </div>
                </div>
                <Link href="/tools">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                    View Tools
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/tools/pdf-merge" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">PDF Merger</span>
                  </div>
                </Link>
                <Link href="/tools/pdf-split" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Scissors className="h-4 w-4" />
                    <span className="text-sm">PDF Splitter</span>
                  </div>
                </Link>
                <Link href="/tools/pdf-compress" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Layers className="h-4 w-4" />
                    <span className="text-sm">PDF Compressor</span>
                  </div>
                </Link>
                <Link href="/tools/pdf-to-word" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">PDF to Word</span>
                  </div>
                </Link>
                <Link href="/tools/pdf-to-excel" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">PDF to Excel</span>
                  </div>
                </Link>
                <Link href="/tools/pdf-to-powerpoint" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">PDF to PowerPoint</span>
                  </div>
                </Link>
              </div>
              <div className="mt-4 text-center">
                <span className="text-gray-500 text-xs">+19 more tools</span>
              </div>
            </div>

            {/* Image Tools */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Image className="h-6 w-6 text-white group-hover:animate-bounce" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">Image Tools</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300">20 professional tools</p>
                  </div>
                </div>
                <Link href="/tools">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300">
                    View Tools
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/tools/image-resize" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">Image Resizer</span>
                  </div>
                </Link>
                <Link href="/tools/image-compress" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Layers className="h-4 w-4" />
                    <span className="text-sm">Image Compressor</span>
                  </div>
                </Link>
                <Link href="/tools/image-to-webp" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-sm">Convert to WebP</span>
                  </div>
                </Link>
                <Link href="/tools/image-to-jpg" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-sm">Convert to JPG</span>
                  </div>
                </Link>
                <Link href="/tools/image-to-png" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-sm">Convert to PNG</span>
                  </div>
                </Link>
                <Link href="/tools/image-to-pdf" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Image to PDF</span>
                  </div>
                </Link>
              </div>
              <div className="mt-4 text-center">
                <span className="text-gray-500 text-xs">+19 more tools</span>
              </div>
            </div>

            {/* Audio & Video Tools */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Music className="h-6 w-6 text-white group-hover:animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">Audio & Video Tools</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300">15 professional tools</p>
                  </div>
                </div>
                <Link href="/tools">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300">
                    View Tools
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/tools/audio-converter" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                    <span className="text-sm">Audio Converter</span>
                  </div>
                </Link>
                <Link href="/tools/audio-cutter" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Scissors className="h-4 w-4" />
                    <span className="text-sm">Audio Cutter</span>
                  </div>
                </Link>
                <Link href="/tools/audio-joiner" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">Audio Joiner</span>
                  </div>
                </Link>
                <Link href="/tools/volume-booster" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Music className="h-4 w-4" />
                    <span className="text-sm">Volume Booster</span>
                  </div>
                </Link>
                <Link href="/tools/audio-normalizer" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Layers className="h-4 w-4" />
                    <span className="text-sm">Audio Normalizer</span>
                  </div>
                </Link>
                <Link href="/tools/audio-extractor" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Music className="h-4 w-4" />
                    <span className="text-sm">Audio Extractor</span>
                  </div>
                </Link>
              </div>
              <div className="mt-4 text-center">
                <span className="text-gray-500 text-xs">+14 more tools</span>
              </div>
            </div>

            {/* Government Tools */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                    <Building className="h-6 w-6 text-white group-hover:animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">Government Tools</h3>
                    <p className="text-gray-400 text-sm group-hover:text-gray-300">15 professional tools</p>
                  </div>
                </div>
                <Link href="/tools">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 transition-all duration-300">
                    View Tools
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/tools/pan-validator" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">PAN Validator</span>
                  </div>
                </Link>
                <Link href="/tools/aadhaar-masker" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">Aadhaar Masker</span>
                  </div>
                </Link>
                <Link href="/tools/voter-id-extractor" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Voter ID Extractor</span>
                  </div>
                </Link>
                <Link href="/tools/income-certificate" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Income Certificate</span>
                  </div>
                </Link>
                <Link href="/tools/caste-certificate" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">Caste Certificate</span>
                  </div>
                </Link>
                <Link href="/tools/ration-card-status" className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors group">
                  <div className="flex items-center space-x-2 text-gray-300 group-hover:text-white">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">Ration Card Status</span>
                  </div>
                </Link>
              </div>
              <div className="mt-4 text-center">
                <span className="text-gray-500 text-xs">+9 more tools</span>
              </div>
            </div>
          </div>

          {/* Popular Tools Section */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Popular Tools
            </h3>
            <p className="text-gray-400 mb-6">
              Most used tools across all categories
            </p>
            <Link href="/tools">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                View All Tools
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose SuntynAI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional-grade tools with enterprise security, completely free for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Lightning Fast",
                description: "Process files in under 5 seconds with our optimized AI algorithms",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Privacy First",
                description: "Your files are processed locally and deleted automatically after use",
                color: "from-green-500 to-blue-500"
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: "Always Free",
                description: "All 80+ tools are completely free with no hidden costs or limits",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white dark:bg-gray-700 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three simple steps to process your files with professional AI tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {[
              {
                step: "1",
                title: "Upload File",
                description: "Drag & drop or click to upload your file. We support 50+ formats.",
                icon: "📁"
              },
              {
                step: "2", 
                title: "AI Process",
                description: "Our AI algorithms process your file with enterprise-grade security.",
                icon: "⚡"
              },
              {
                step: "3",
                title: "Download Result",
                description: "Get your processed file instantly. Files are auto-deleted for privacy.",
                icon: "📥"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                    {step.step}
                  </div>
                  <div className="text-4xl mb-4">{step.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">{step.description}</p>

                {/* Arrow for desktop */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/tools">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                Try It Now - It's Free!
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}