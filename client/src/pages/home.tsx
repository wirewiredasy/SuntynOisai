import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import AnimatedLogo from "@/components/animated-logo";
import CategoryCard from "@/components/category-card";
import ToolCard from "@/components/tool-card";
import { TOOL_CATEGORIES, ALL_80_TOOLS } from "@/lib/comprehensive-tools";
import { Play } from "lucide-react";

const FEATURED_TOOLS = ALL_80_TOOLS.slice(0, 8);

export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Counter animation
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-count') || '0');
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target.toString() + (target === 100 ? '%' : target === 24 ? '/7' : '+');
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current).toString() + (target === 100 ? '%' : target === 24 ? '/7' : '+');
              }
            }, 40);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* World-Class Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
        
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Main Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Hero Headlines */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <AnimatedLogo size={120} showRays={false} className="mx-auto drop-shadow-2xl" />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              SuntynAI
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-bold text-slate-200 mb-6 max-w-4xl mx-auto leading-relaxed">
              85+ Professional AI Tools in One Platform
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform documents, images, audio, and videos with enterprise-grade AI processing. No registration, completely free, privacy-first.
            </p>
          </div>

          {/* Advanced Interactive Demo Showcase */}
          <div className="relative mb-16 max-w-6xl mx-auto">
            
            {/* Demo Navigation Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-2 border border-purple-500/20">
                <div className="flex gap-2">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300">
                    PDF Tools
                  </button>
                  <button className="px-6 py-3 text-slate-300 hover:text-white transition-colors duration-300">
                    Image AI
                  </button>
                  <button className="px-6 py-3 text-slate-300 hover:text-white transition-colors duration-300">
                    Audio/Video
                  </button>
                  <button className="px-6 py-3 text-slate-300 hover:text-white transition-colors duration-300">
                    Gov Tools
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Demo Canvas */}
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-3xl border border-purple-500/20 overflow-hidden backdrop-blur-sm">
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
              </div>
              
              {/* Demo Workflow Visualization */}
              <div className="relative p-12">
                
                {/* Step 1: File Upload */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-6 animate-glow-pulse">
                      <span className="text-2xl">📄</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Upload Files</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Drag & drop or click to upload your documents, images, audio, or video files. 
                      Support for 50+ formats with instant preview.
                    </p>
                  </div>
                  
                  {/* Animated Arrow */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[12px] border-l-cyan-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                      <div className="absolute -top-2 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  
                  {/* Step 2: AI Processing */}
                  <div className="text-center lg:text-right">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl mb-6 animate-glow-pulse delay-500">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">AI Processing</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Advanced AI algorithms process your files with enterprise-grade security. 
                      Real-time progress tracking and instant results.
                    </p>
                  </div>
                </div>
                
                {/* Visual Processing Animation */}
                <div className="my-12 flex justify-center">
                  <div className="relative">
                    <div className="flex space-x-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-bounce`}
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-lg animate-pulse"></div>
                  </div>
                </div>
                
                {/* Step 3: Results */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  
                  <div className="text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-6 animate-glow-pulse delay-1000">
                      <span className="text-2xl">✨</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Instant Results</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Download processed files instantly or preview before download. 
                      Share results directly or save to your preferred cloud storage.
                    </p>
                  </div>
                  
                  {/* Interactive Tool Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: "📄", name: "PDF Merge", color: "from-red-500 to-red-600" },
                      { icon: "🖼️", name: "Image AI", color: "from-blue-500 to-blue-600" },
                      { icon: "🎵", name: "Audio Edit", color: "from-green-500 to-green-600" },
                      { icon: "🏛️", name: "Gov Tools", color: "from-orange-500 to-orange-600" }
                    ].map((tool, index) => (
                      <div
                        key={index}
                        className="group relative p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 cursor-pointer hover:scale-105"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-lg">{tool.icon}</span>
                        </div>
                        <h4 className="text-white font-semibold text-sm">{tool.name}</h4>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Action Elements */}
              <div className="absolute top-8 right-8">
                <div className="flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Demo Active</span>
                </div>
              </div>
            </div>
            
            {/* Demo Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {[
                { number: "85+", label: "AI Tools", icon: "🚀" },
                { number: "50+", label: "File Formats", icon: "📁" },
                { number: "<5s", label: "Processing Time", icon: "⚡" },
                { number: "100%", label: "Privacy Safe", icon: "🔒" }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-slate-800/30 rounded-2xl border border-slate-700/30 hover:border-purple-500/20 transition-all duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-2" data-count={stat.number.replace(/[^0-9]/g, '')}>
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/tools-dashboard">
              <Button className="relative group px-10 py-6 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 min-w-[280px] overflow-hidden">
                <span className="relative z-10">Start Using Tools Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>
            
            <button className="px-10 py-6 border-2 border-purple-400/40 text-purple-200 rounded-xl font-bold text-lg hover:bg-purple-400/10 hover:border-purple-400/60 transition-all duration-300 hover:scale-105 min-w-[280px] backdrop-blur-sm">
              Watch Demo Video
            </button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-purple-200 font-semibold">Instant Processing</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-2xl flex items-center justify-center border border-cyan-500/30">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="text-cyan-200 font-semibold">Privacy First</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center border border-green-500/30">
                <span className="text-2xl">🆓</span>
              </div>
              <div className="text-green-200 font-semibold">Always Free</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <span className="text-2xl">🚀</span>
              </div>
              <div className="text-orange-200 font-semibold">85+ AI Tools</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories Section */}
      <section id="categories" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Tool Categories
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Enterprise-grade AI tools organized by category for maximum productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TOOL_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Tools
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Most popular and powerful tools across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FEATURED_TOOLS.map((tool, index) => (
              <ToolCard key={index} tool={{
                id: index,
                name: tool.name,
                slug: tool.id,
                description: tool.description,
                icon: tool.icon.toLowerCase(),
                category: "featured",
                isActive: true
              }} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/tools-dashboard">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 px-8 py-4 text-lg font-bold">
                View All 85+ Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose SuntynAI?
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Experience the next generation of AI-powered productivity tools designed for professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Experience blazing-fast processing with our optimized infrastructure. Most tools complete in under 5 seconds."
              },
              {
                icon: "🛡️",
                title: "100% Secure",
                description: "Your files are processed securely and automatically deleted after completion. No data is stored or shared."
              },
              {
                icon: "📱",
                title: "Mobile Optimized",
                description: "All tools work perfectly on mobile devices with touch-friendly interfaces and responsive design."
              },
              {
                icon: "❤️",
                title: "Always Free",
                description: "All 85+ tools are completely free to use. No hidden fees, subscriptions, or registration required."
              },
              {
                icon: "🌟",
                title: "Premium Quality",
                description: "Built with cutting-edge technology and best practices to deliver exceptional performance and reliability."
              },
              {
                icon: "🚀",
                title: "Regular Updates",
                description: "New tools and features added regularly based on user feedback and emerging needs."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-800/70">
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Professional Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6">
          
          {/* Main Footer Content */}
          <div className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <AnimatedLogo size={60} showRays={false} />
                  <h3 className="text-2xl font-bold gradient-text mt-4">SuntynAI</h3>
                  <p className="text-slate-400 text-sm mt-2">Neural Intelligence Platform</p>
                </div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Transform your workflow with 85+ professional AI tools. Process documents, images, audio, and videos with enterprise-grade security.
                </p>
                
                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-slate-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-slate-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-slate-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-slate-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-slate-300 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.76 3.76a.75.75 0 0 0-1.5.02l-.5 18.5c-.02.75.58 1.38 1.33 1.36l18.5-.5a.75.75 0 0 0-.02-1.5l-18.5.5c-.75.02-1.38-.58-1.36-1.33l.5-18.5a.75.75 0 0 0-.75-.75z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Products & Tools */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">AI Tools</h4>
                <ul className="space-y-3">
                  <li><Link to="/tools/pdf-tools" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">PDF Processing</Link></li>
                  <li><Link to="/tools/image-tools" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Image Enhancement</Link></li>
                  <li><Link to="/tools/audio-tools" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Audio & Video</Link></li>
                  <li><Link to="/tools/government-tools" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Government Tools</Link></li>
                  <li><Link to="/tools" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">All 85+ Tools</Link></li>
                  <li><Link to="/api-access" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">API Access</Link></li>
                </ul>
              </div>
              
              {/* Company */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Company</h4>
                <ul className="space-y-3">
                  <li><Link to="/about" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">About Us</Link></li>
                  <li><Link to="/blog" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Blog & Updates</Link></li>
                  <li><Link to="/careers" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Careers</Link></li>
                  <li><Link to="/press" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Press Kit</Link></li>
                  <li><Link to="/partnerships" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Partnerships</Link></li>
                  <li><Link to="/investors" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Investors</Link></li>
                </ul>
              </div>
              
              {/* Support & Legal */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6">Support & Legal</h4>
                <ul className="space-y-3">
                  <li><Link to="/help-center" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Help Center</Link></li>
                  <li><Link to="/documentation" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Documentation</Link></li>
                  <li><Link to="/contact" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Contact Support</Link></li>
                  <li><Link to="/privacy-policy" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Privacy Policy</Link></li>
                  <li><Link to="/terms-of-service" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Terms of Service</Link></li>
                  <li><Link to="/security" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">Security & Compliance</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom Copyright Section */}
          <div className="border-t border-slate-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <p className="text-slate-400 text-sm">
                  © 2025 SuntynAI Technologies Pvt. Ltd. All rights reserved.
                </p>
                <div className="flex items-center space-x-2 text-slate-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs">All Systems Operational</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-slate-400">
                <Link to="/sitemap" className="hover:text-purple-400 transition-colors duration-300">Sitemap</Link>
                <Link to="/status" className="hover:text-purple-400 transition-colors duration-300">System Status</Link>
                <div className="flex items-center space-x-2">
                  <span>⚡</span>
                  <span>Powered by AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}