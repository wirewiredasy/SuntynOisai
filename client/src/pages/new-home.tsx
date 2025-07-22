import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, FileText, Image, Music, Building, Zap, Shield, Star } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-20 pb-16">
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
              <span className="text-gray-900">Professional </span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
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
                <div className="text-2xl font-bold text-gray-900">80+</div>
                <div className="text-sm text-gray-600">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Free</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">&lt;5s</div>
                <div className="text-sm text-gray-600">Processing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">Privacy</div>
                <div className="text-sm text-gray-600">Secured</div>
              </div>
            </div>
          </div>

          {/* Interactive Slides Showcase */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="relative h-96">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className={`h-full bg-gradient-to-br ${slide.color} p-8 text-white flex items-center`}>
                    <div className="w-1/2">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          {slide.icon}
                        </div>
                        <h3 className="text-3xl font-bold">{slide.title}</h3>
                      </div>
                      <p className="text-lg opacity-90 mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {slide.tools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-sm font-medium">
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-1/2 flex justify-center items-center">
                      <div className="relative">
                        <div className="w-64 h-64 bg-white/20 rounded-3xl backdrop-blur-sm border border-white/30 flex items-center justify-center">
                          <div className="text-6xl opacity-50">
                            {slide.icon}
                          </div>
                        </div>
                        <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose SuntynAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <div key={index} className="group relative bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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