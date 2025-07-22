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
                icon: "🇮🇳",
                title: "Made in India",
                description: "Proudly built in India with a focus on solving real problems for Indian users and businesses."
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

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="mb-8">
              <AnimatedLogo size={80} showRays={false} />
            </div>
            <div className="text-slate-400 mb-6">
              <p className="text-lg mb-4">SuntynAI - Empowering Digital India with AI Tools</p>
              <p className="text-sm">Built with ❤️ for creators, students, and professionals</p>
            </div>
            <div className="flex justify-center items-center gap-8 text-slate-500 text-sm">
              <span>© 2025 SuntynAI</span>
              <span>•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}